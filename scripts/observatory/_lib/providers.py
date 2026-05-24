"""Provider abstraction for the cron pipeline.

v1 ships a single working backend (`FakeProvider`) used in tests + dry runs.
Real provider classes are stubs that raise `NotImplementedError` — they will be
wired in a follow-up PR once Bryan has confirmed budget + API keys. Live API
calls are explicitly out of scope for the C2 ship per the task brief
("Do NOT actually run the workflow tonight (no real spend)").

Test isolation: `set_provider(model, provider)` overrides the factory per process.
`reset_providers()` clears overrides — call it in test teardown.
"""
from __future__ import annotations

import asyncio
import hashlib
import json
import os
from dataclasses import dataclass, field
from typing import Awaitable, Callable, Protocol

from .errors import AuthProviderError, TransientProviderError

ANTHROPIC_MODELS = {"claude-opus-4-7", "claude-sonnet-4-6", "claude-haiku-4-5"}
OPENAI_MODELS = {"gpt-4o", "gpt-4o-mini"}
GEMINI_MODELS = {"gemini-2.5-pro", "gemini-2.5-flash"}
GROQ_MODELS = {"llama-3.3-70b"}


# Per-provider in-flight cap. 4 total is the global semaphore in run_models.
# Per-provider caps prevent any single provider from saturating the budget.
PROVIDER_RATE_LIMIT: dict[str, int] = {
    "anthropic": 3,
    "openai":    3,
    "gemini":    3,
    "groq":      3,
    "fake":      8,
}


@dataclass
class ProviderResponse:
    text: str
    tokens_in: int
    tokens_out: int
    provider_response_id: str | None = None


class Provider(Protocol):
    name: str

    async def call(self, model: str, prompt: str, *, max_output_tokens: int = 1024) -> ProviderResponse: ...


def provider_name_for_model(model: str) -> str:
    if model in ANTHROPIC_MODELS:
        return "anthropic"
    if model in OPENAI_MODELS:
        return "openai"
    if model in GEMINI_MODELS:
        return "gemini"
    if model in GROQ_MODELS:
        return "groq"
    raise ValueError(f"unknown model: {model}")


# --- Real provider stubs ----------------------------------------------------

@dataclass
class _StubProvider:
    name: str

    async def call(self, model: str, prompt: str, *, max_output_tokens: int = 1024) -> ProviderResponse:
        raise NotImplementedError(
            f"Real {self.name} provider not wired yet — set ANTHROPIC_API_KEY etc. and implement "
            f"scripts/observatory/_lib/providers.py:{self.name.capitalize()}Provider before live runs."
        )


_REAL: dict[str, Provider] = {
    "anthropic": _StubProvider(name="anthropic"),
    "openai":    _StubProvider(name="openai"),
    "gemini":    _StubProvider(name="gemini"),
    "groq":      _StubProvider(name="groq"),
}


# --- Fake provider (tests + local dry runs) ---------------------------------

@dataclass
class FakeProvider:
    """Deterministic stub. Response keyed by (model, prompt)."""
    name: str = "fake"
    responses: dict[str, ProviderResponse] = field(default_factory=dict)
    fail_n_times: int = 0
    fail_kind: str = "transient"  # 'transient' or 'auth'
    _failures_emitted: int = 0

    @staticmethod
    def _key(model: str, prompt: str) -> str:
        return f"{model}::{hashlib.sha256(prompt.encode('utf-8')).hexdigest()[:16]}"

    def set(self, model: str, prompt: str, response: ProviderResponse) -> None:
        self.responses[self._key(model, prompt)] = response

    async def call(self, model: str, prompt: str, *, max_output_tokens: int = 1024) -> ProviderResponse:
        if self._failures_emitted < self.fail_n_times:
            self._failures_emitted += 1
            if self.fail_kind == "auth":
                raise AuthProviderError("fake auth failure")
            raise TransientProviderError("fake transient failure")
        key = self._key(model, prompt)
        if key in self.responses:
            r = self.responses[key]
            return ProviderResponse(
                text=r.text,
                tokens_in=r.tokens_in,
                tokens_out=r.tokens_out,
                provider_response_id=r.provider_response_id or f"fake_{key[:8]}",
            )
        # Default deterministic response when nothing was registered.
        deterministic_text = f"[fake:{model}] {prompt[:60]}"
        return ProviderResponse(
            text=deterministic_text,
            tokens_in=max(1, len(prompt) // 4),
            tokens_out=max(1, len(deterministic_text) // 4),
            provider_response_id=f"fake_{key[:8]}",
        )


# --- Registry ---------------------------------------------------------------

_OVERRIDES: dict[str, Provider] = {}


def get_provider(model: str) -> Provider:
    """Return the provider that should handle this model id.

    Lookup order: explicit override (set_provider) → env-forced FakeProvider
    (OBSERVATORY_USE_FAKE_PROVIDERS=1) → real provider for this model's vendor.
    """
    provider_kind = provider_name_for_model(model)
    if provider_kind in _OVERRIDES:
        return _OVERRIDES[provider_kind]
    if os.environ.get("OBSERVATORY_USE_FAKE_PROVIDERS") == "1":
        if "fake" not in _OVERRIDES:
            _OVERRIDES["fake"] = FakeProvider()
        return _OVERRIDES["fake"]
    return _REAL[provider_kind]


def set_provider(provider_kind: str, provider: Provider) -> None:
    _OVERRIDES[provider_kind] = provider


def reset_providers() -> None:
    _OVERRIDES.clear()


# --- Retry / backoff -------------------------------------------------------

RETRY_BACKOFFS_SEC: tuple[float, ...] = (5.0, 30.0)


async def call_with_retry(
    provider: Provider,
    model: str,
    prompt: str,
    *,
    max_output_tokens: int = 1024,
    sleep: Callable[[float], Awaitable[None]] = asyncio.sleep,
) -> ProviderResponse:
    """Call provider with 2× retry on transient errors, exponential backoff.

    Auth errors bubble up immediately and abort the run upstream.
    """
    last_err: Exception | None = None
    attempts = 1 + len(RETRY_BACKOFFS_SEC)
    for attempt in range(attempts):
        try:
            return await provider.call(model, prompt, max_output_tokens=max_output_tokens)
        except AuthProviderError:
            raise
        except TransientProviderError as e:
            last_err = e
            if attempt < len(RETRY_BACKOFFS_SEC):
                await sleep(RETRY_BACKOFFS_SEC[attempt])
            continue
    assert last_err is not None
    raise last_err
