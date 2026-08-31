#!/bin/bash
# PreToolUse(Bash): refuse `git commit --no-verify` / `-n`.
#
# Reads the tool call as JSON on stdin (Claude Code does NOT set $TOOL_INPUT).
# Exit 2 blocks the call and shows stderr to Claude; exit 0 allows it.
#
# Dormant by design: this repo currently has no git-side hooks, so there is
# nothing to skip. It exists so that the day a pre-commit hook is added, an
# agent cannot quietly route around it.

CMD=$(python3 -c 'import sys,json; print(json.load(sys.stdin).get("tool_input",{}).get("command",""))' 2>/dev/null)

case "$CMD" in
  *git*commit*--no-verify*|*git*commit*\ -n\ *|*git*commit*\ -n)
    echo "BLOCKED: do not skip git hooks with --no-verify. Fix what the hook is complaining about instead." >&2
    exit 2
    ;;
esac
exit 0
