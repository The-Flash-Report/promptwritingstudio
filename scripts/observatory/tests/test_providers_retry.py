"""Provider retry behaviour — 2× exponential backoff, auth aborts immediately."""
from __future__ import annotations

import asyncio

import pytest

from _lib.errors import AuthProviderError, TransientProviderError
from _lib.providers import FakeProvider, ProviderResponse, call_with_retry


def _run(coro):
    return asyncio.run(coro)


async def _noop_sleep(_seconds: float) -> None:
    return None


def test_retry_succeeds_after_two_transient_failures():
    p = FakeProvider(fail_n_times=2, fail_kind="transient")
    p.set("claude-haiku-4-5", "hi", ProviderResponse(text="ok", tokens_in=1, tokens_out=1))
    resp = _run(call_with_retry(p, "claude-haiku-4-5", "hi", sleep=_noop_sleep))
    assert resp.text == "ok"
    assert p._failures_emitted == 2


def test_retry_gives_up_after_three_attempts():
    p = FakeProvider(fail_n_times=99, fail_kind="transient")
    with pytest.raises(TransientProviderError):
        _run(call_with_retry(p, "claude-haiku-4-5", "hi", sleep=_noop_sleep))
    # Initial attempt + 2 retries = 3 attempts total
    assert p._failures_emitted == 3


def test_auth_error_aborts_immediately_no_retry():
    p = FakeProvider(fail_n_times=99, fail_kind="auth")
    with pytest.raises(AuthProviderError):
        _run(call_with_retry(p, "claude-haiku-4-5", "hi", sleep=_noop_sleep))
    # Only one attempt — no retries on auth
    assert p._failures_emitted == 1
