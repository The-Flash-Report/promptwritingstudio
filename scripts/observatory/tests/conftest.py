"""Pytest config — adds scripts/observatory to sys.path so _lib imports resolve."""
from __future__ import annotations

import sys
from pathlib import Path

OBS_DIR = Path(__file__).resolve().parents[1]
if str(OBS_DIR) not in sys.path:
    sys.path.insert(0, str(OBS_DIR))
