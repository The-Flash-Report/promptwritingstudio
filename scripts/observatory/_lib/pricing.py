"""USD pricing per 1M tokens for the v1 model enum.

Numbers reflect published list prices as of contract v1 lock (2026-05-23).
Used for:
  - cost_usd computation post-call
  - worst-case pre-call estimate for the hard cost cap
The cron should keep these in sync with `data/claude-models.json` (Claude rows)
and `data/ai-models.json` (non-Claude rows) when models drift;
out-of-date pricing here only affects cost accounting, not pipeline correctness.
"""
from __future__ import annotations

# (input_per_million_usd, output_per_million_usd)
PRICE_TABLE: dict[str, tuple[float, float]] = {
    "claude-opus-4-7":   ( 5.00, 25.00),
    "claude-sonnet-4-6": ( 3.00, 15.00),
    "claude-haiku-4-5":  ( 1.00,  5.00),
    "gpt-4o":            ( 2.50, 10.00),
    "gpt-4o-mini":       ( 0.15,  0.60),
    "gemini-2.5-pro":    ( 1.25, 10.00),
    "gemini-2.5-flash":  ( 0.30,  2.50),
    "llama-3.3-70b":     ( 0.59,  0.79),
}


def compute_cost_usd(model: str, tokens_in: int, tokens_out: int) -> float:
    if model not in PRICE_TABLE:
        return 0.0
    in_per_m, out_per_m = PRICE_TABLE[model]
    return round((tokens_in / 1_000_000.0) * in_per_m + (tokens_out / 1_000_000.0) * out_per_m, 6)


def estimate_max_cost_usd(model: str, prompt_tokens_est: int, max_output_tokens: int) -> float:
    return compute_cost_usd(model, prompt_tokens_est, max_output_tokens)
