#!/bin/bash
# PostToolUse(Write|Edit): flag console.log left behind in JS/JSX.
#
# The file is already written by the time this runs. Exit 2 is the only way a
# PostToolUse hook gets its stderr back in front of Claude, so a warning uses
# exit 2 as well as a block would - the edit is not reverted either way.
#
# Skips node_modules, .next, and anything under scripts/ (CLI output is meant
# to print).

FILE=$(python3 -c 'import sys,json; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))' 2>/dev/null)

[ -n "$FILE" ] || exit 0
case "$FILE" in
  *.js|*.jsx) ;;
  *) exit 0 ;;
esac
case "$FILE" in
  */node_modules/*|*/.next/*|*/scripts/*) exit 0 ;;
esac

HITS=$(grep -n 'console\.log' "$FILE" 2>/dev/null | head -5)
if [ -n "$HITS" ]; then
  echo "WARNING: console.log in $(basename "$FILE") - remove before committing:" >&2
  echo "$HITS" >&2
  exit 2
fi
exit 0
