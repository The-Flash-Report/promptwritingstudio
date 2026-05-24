"""Cost tracker — warn, hard cap, refund, reconcile, monthly rotate."""
from __future__ import annotations

import asyncio
import json
from pathlib import Path

import pytest

from _lib.cost_tracker import CostTracker
from _lib.errors import CostCapAbort


def _run(coro):
    return asyncio.get_event_loop().run_until_complete(coro) if False else asyncio.run(coro)


def test_warn_threshold_tripped(tmp_path: Path):
    tracker = CostTracker.load(
        tmp_path / "cost-log.json",
        run_id="2026-05-31",
        warn_threshold_usd=1.0,
        hard_threshold_usd=10.0,
    )

    async def go():
        await tracker.check_and_debit(0.5)
        await tracker.reconcile_actual(0.5, 0.5)
        assert not tracker.state().warn_tripped
        await tracker.check_and_debit(0.6)
        await tracker.reconcile_actual(0.6, 0.6)
        assert tracker.state().warn_tripped

    _run(go())


def test_hard_cap_aborts_and_disables(tmp_path: Path):
    path = tmp_path / "cost-log.json"
    tracker = CostTracker.load(
        path,
        run_id="2026-05-31",
        warn_threshold_usd=1.0,
        hard_threshold_usd=2.0,
    )

    async def go():
        await tracker.check_and_debit(1.5)
        await tracker.reconcile_actual(1.5, 1.5)
        with pytest.raises(CostCapAbort):
            await tracker.check_and_debit(0.6)
        # disabled_at written
        data = json.loads(path.read_text())
        assert data["disabled_at"] is not None
        # Reload after disable → new tracker should also refuse to debit
        tracker2 = CostTracker.load(path, run_id="2026-05-31")
        with pytest.raises(CostCapAbort):
            await tracker2.check_and_debit(0.01)

    _run(go())


def test_hard_cap_writes_disable_flag(tmp_path: Path):
    """Contract §8: when hard cap trips, sibling `cost-disable.flag` must be written
    so the next scheduled run's pre-flight refuses to start even if the month rolls
    over and clears `disabled_at` in the cost log."""
    path = tmp_path / "cost-log.json"
    flag = tmp_path / "cost-disable.flag"
    tracker = CostTracker.load(
        path,
        run_id="2026-05-31",
        warn_threshold_usd=1.0,
        hard_threshold_usd=2.0,
    )

    async def go():
        await tracker.check_and_debit(1.5)
        await tracker.reconcile_actual(1.5, 1.5)
        assert not flag.exists()
        with pytest.raises(CostCapAbort):
            await tracker.check_and_debit(0.6)
        assert flag.exists(), "cost-disable.flag must be written on hard-cap abort"
        body = json.loads(flag.read_text())
        assert "disabled_at" in body and "reason" in body
        # Already-tripped path also writes the flag (idempotent — no error)
        flag.unlink()
        tracker2 = CostTracker.load(path, run_id="2026-05-31")
        with pytest.raises(CostCapAbort):
            await tracker2.check_and_debit(0.01)
        assert flag.exists(), "already-tripped path must also write the flag"

    _run(go())


def test_refund_returns_reservation(tmp_path: Path):
    tracker = CostTracker.load(
        tmp_path / "cost-log.json",
        run_id="2026-05-31",
        warn_threshold_usd=10.0,
        hard_threshold_usd=20.0,
    )

    async def go():
        await tracker.check_and_debit(1.0)
        assert tracker.state().spent_usd_this_month == pytest.approx(1.0)
        await tracker.refund(1.0)
        assert tracker.state().spent_usd_this_month == pytest.approx(0.0)

    _run(go())


def test_reconcile_replaces_estimate_with_actual(tmp_path: Path):
    tracker = CostTracker.load(
        tmp_path / "cost-log.json",
        run_id="2026-05-31",
        warn_threshold_usd=10.0,
        hard_threshold_usd=20.0,
    )

    async def go():
        await tracker.check_and_debit(2.0)
        await tracker.reconcile_actual(2.0, 0.5)  # actual < estimate
        assert tracker.state().spent_usd_this_month == pytest.approx(0.5)

    _run(go())


def test_finalize_run_appends_ledger(tmp_path: Path):
    path = tmp_path / "cost-log.json"
    tracker = CostTracker.load(
        path,
        run_id="2026-05-31",
        warn_threshold_usd=10.0,
        hard_threshold_usd=20.0,
    )

    async def go():
        await tracker.check_and_debit(0.05)
        await tracker.reconcile_actual(0.05, 0.05)
        tracker.finalize_run()
        data = json.loads(path.read_text())
        assert any(r["run_id"] == "2026-05-31" for r in data["runs"])
        assert data["runs"][0]["cost_usd"] == pytest.approx(0.05)

    _run(go())


def test_concurrent_debits_do_not_breach_cap(tmp_path: Path):
    """Race: 8 parallel callers each trying to debit $0.50 against a $2 hard cap.
    Only 4 should succeed; the rest must raise CostCapAbort."""
    tracker = CostTracker.load(
        tmp_path / "cost-log.json",
        run_id="2026-05-31",
        warn_threshold_usd=10.0,
        hard_threshold_usd=2.0,
    )

    async def attempt():
        try:
            await tracker.check_and_debit(0.5)
            return True
        except CostCapAbort:
            return False

    async def go():
        results = await asyncio.gather(*[attempt() for _ in range(8)], return_exceptions=False)
        succeeded = sum(1 for r in results if r)
        # ≤4 calls of $0.50 fit under $2; 5th would push to $2.50 > cap.
        assert succeeded == 4
        assert tracker.state().spent_usd_this_month <= 2.0

    _run(go())
