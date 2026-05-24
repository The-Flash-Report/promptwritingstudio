# Observatory scripts

Scripts for the PWS Prompt Observatory pipeline. See `~/.claude/support/prompt-observatory-contract.md` for the full contract.

## validate_corpus.py

Standalone CLI validator. Reads every `*.json` in `data/observatory/prompts/` and validates each against the `$defs/prompt` subschema in `data/observatory/schema.json`.

**Requires:** `pip install jsonschema`

**Usage:**

```bash
# From repo root
python3 scripts/observatory/validate_corpus.py

# Custom paths
python3 scripts/observatory/validate_corpus.py \
  --prompts-dir data/observatory/prompts \
  --schema data/observatory/schema.json
```

**Exit codes:** `0` = all valid, `1` = one or more failures, `2` = jsonschema not installed.

Used in CI (`observatory-weekly.yml` step [1]) and as a pre-flight before any manual corpus edit.

## lib/observatory/load_corpus.ts

Build-time corpus loader for Next.js. Call `loadCorpus()` inside `getStaticProps`; it reads and validates the corpus on every build, throwing on any schema violation so bad prompts never reach production.

```ts
import { loadCorpus } from "../../lib/observatory/load_corpus";

export async function getStaticProps() {
  const corpus = loadCorpus(); // throws if any prompt is invalid
  return { props: { corpus } };
}
```
