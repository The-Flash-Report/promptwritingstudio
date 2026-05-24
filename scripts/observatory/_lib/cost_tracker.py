"""Monthly cost ledger with warn + hard-abort thresholds.

Source of truth: `data/observatory/cost-log.json`. Schema per contract §8.
The hard cap is atomic per call — `check_and_debit()` holds an asyncio.Lock
across read/check/write so 4 concurrent model calls cannot all sneak past
the threshold by reading before any of them write.
"""
from __future__ import annotations

import asyncio
import json
import os
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from .errors import CostCapAbort

WARN_THRESHOLD_DEFAULT = 75.0
HARD_THRESHOLD_DEFAULT = 150.0


def _current_month() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m")


@dataclass
class CostState:
    spent_usd_this_month: float
    warn_threshold_usd: float
    hard_disable_threshold_usd: float
    disabled_at: str | None = None
    warned: bool = False

    @property
    def warn_tripped(self) -> bool:
        return self.spent_usd_this_month >= self.warn_threshold_usd

    @property
    def hard_tripped(self) -> bool:
        return self.disabled_at is not None or self.spent_usd_this_month >= self.hard_disable_threshold_usd


@dataclass
class CostTracker:
    """Wraps the on-disk cost log with an in-memory state cache.

    Use as: tracker = CostTracker.load(path); await tracker.check_and_debit(...)
    """
    path: Path
    run_id: str
    warn_threshold_usd: float = WARN_THRESHOLD_DEFAULT
    hard_threshold_usd: float = HARD_THRESHOLD_DEFAULT
    _data: dict[str, Any] = field(default_factory=dict)
    _lock: asyncio.Lock = field(default_factory=asyncio.Lock)
    _run_cost_this_run: float = 0.0
    _run_calls_this_run: int = 0

    @classmethod
    def load(
        cls,
        path: Path,
        run_id: str,
        warn_threshold_usd: float | None = None,
        hard_threshold_usd: float | None = None,
    ) -> "CostTracker":
        month = _current_month()
        if path.exists():
            data = json.loads(path.read_text())
            if data.get("current_month") != month:
                _rotate(path, data)
                data = _fresh_month(month, warn_threshold_usd, hard_threshold_usd)
        else:
            data = _fresh_month(month, warn_threshold_usd, hard_threshold_usd)
        warn_t = warn_threshold_usd if warn_threshold_usd is not None else data.get("warn_threshold_usd", WARN_THRESHOLD_DEFAULT)
        hard_t = hard_threshold_usd if hard_threshold_usd is not None else data.get("hard_disable_threshold_usd", HARD_THRESHOLD_DEFAULT)
        data["warn_threshold_usd"] = warn_t
        data["hard_disable_threshold_usd"] = hard_t
        path.parent.mkdir(parents=True, exist_ok=True)
        return cls(
            path=path,
            run_id=run_id,
            warn_threshold_usd=warn_t,
            hard_threshold_usd=hard_t,
            _data=data,
        )

    def state(self) -> CostState:
        return CostState(
            spent_usd_this_month=float(self._data.get("spent_usd_this_month", 0.0)),
            warn_threshold_usd=self.warn_threshold_usd,
            hard_disable_threshold_usd=self.hard_threshold_usd,
            disabled_at=self._data.get("disabled_at"),
        )

    async def check_and_debit(self, estimate_usd: float) -> None:
        """Reserve `estimate_usd` against the monthly budget atomically.

        Raises CostCapAbort if the call would cross the hard threshold or the
        budget is already disabled. On abort, writes both `disabled_at` to the
        cost log AND the sibling `cost-disable.flag` file (contract §8) so the
        next scheduled run sees it during pre-flight and refuses to start.
        Caller MUST follow up with `reconcile_actual` once the real cost is
        known so over-estimates are returned to budget.
        """
        async with self._lock:
            state = self.state()
            if state.hard_tripped:
                self._ensure_disable_flag(
                    f"hard cap ${self.hard_threshold_usd:.2f} already reached "
                    f"(spent ${state.spent_usd_this_month:.4f})"
                )
                raise CostCapAbort(
                    f"Monthly hard cap ${self.hard_threshold_usd:.2f} already reached "
                    f"(spent ${state.spent_usd_this_month:.4f}); cron disabled."
                )
            projected = state.spent_usd_this_month + max(estimate_usd, 0.0)
            if projected > self.hard_threshold_usd:
                self._data["disabled_at"] = datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
                self._persist()
                self._ensure_disable_flag(
                    f"projected spend ${projected:.4f} would exceed hard cap "
                    f"${self.hard_threshold_usd:.2f}"
                )
                raise CostCapAbort(
                    f"Next call (~${estimate_usd:.4f}) would push monthly spend to "
                    f"${projected:.4f}, over hard cap ${self.hard_threshold_usd:.2f}. Aborting run."
                )
            self._data["spent_usd_this_month"] = projected
            self._persist()

    def _ensure_disable_flag(self, reason: str) -> None:
        """Write `cost-disable.flag` alongside the cost log if not already present."""
        flag = self.path.parent / "cost-disable.flag"
        if flag.exists():
            return
        write_disable_flag(self.path.parent, reason)

    async def reconcile_actual(self, estimate_usd: float, actual_usd: float) -> CostState:
        """Replace the estimate with the actual cost. Returns post-state."""
        async with self._lock:
            current = float(self._data.get("spent_usd_this_month", 0.0))
            adjusted = current - max(estimate_usd, 0.0) + max(actual_usd, 0.0)
            if adjusted < 0:
                adjusted = 0.0
            self._data["spent_usd_this_month"] = adjusted
            self._run_cost_this_run += max(actual_usd, 0.0)
            self._run_calls_this_run += 1
            self._persist()
            return self.state()

    async def refund(self, estimate_usd: float) -> None:
        """Return an unspent reservation (e.g., call failed before billing)."""
        async with self._lock:
            current = float(self._data.get("spent_usd_this_month", 0.0))
            adjusted = max(0.0, current - max(estimate_usd, 0.0))
            self._data["spent_usd_this_month"] = adjusted
            self._persist()

    def finalize_run(self) -> dict[str, Any]:
        """Append a runs[] entry. Idempotent: replaces an existing entry for the same run_id."""
        runs = self._data.setdefault("runs", [])
        runs = [r for r in runs if r.get("run_id") != self.run_id]
        runs.append({
            "run_id": self.run_id,
            "cost_usd": round(self._run_cost_this_run, 6),
            "calls": self._run_calls_this_run,
        })
        self._data["runs"] = runs
        self._persist()
        return self.state().__dict__


    def _persist(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.path.write_text(json.dumps(self._data, indent=2, sort_keys=True) + "\n")


def _fresh_month(month: str, warn_t: float | None, hard_t: float | None) -> dict[str, Any]:
    return {
        "current_month": month,
        "spent_usd_this_month": 0.0,
        "warn_threshold_usd": warn_t if warn_t is not None else WARN_THRESHOLD_DEFAULT,
        "hard_disable_threshold_usd": hard_t if hard_t is not None else HARD_THRESHOLD_DEFAULT,
        "disabled_at": None,
        "runs": [],
    }


def _rotate(path: Path, prev_data: dict[str, Any]) -> None:
    archive = path.parent / "cost-log-archive.json"
    history = []
    if archive.exists():
        try:
            history = json.loads(archive.read_text())
            if not isinstance(history, list):
                history = []
        except Exception:
            history = []
    history.append(prev_data)
    archive.write_text(json.dumps(history, indent=2, sort_keys=True) + "\n")


def write_disable_flag(data_dir: Path, reason: str) -> None:
    flag = data_dir / "cost-disable.flag"
    flag.write_text(
        json.dumps(
            {
                "disabled_at": datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z"),
                "reason": reason,
            },
            indent=2,
            sort_keys=True,
        )
        + "\n"
    )
