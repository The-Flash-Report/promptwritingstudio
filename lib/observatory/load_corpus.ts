import fs from "fs";
import path from "path";

export interface TestInput {
  id: string;
  vars: Record<string, string>;
}

export interface Rubric {
  criteria: string[];
  scoring_per_criterion: "0-3";
  pass_threshold: number;
  judge_prompt_template: string;
}

export type ModelId =
  | "claude-opus-4-7"
  | "claude-sonnet-4-6"
  | "claude-haiku-4-5"
  | "gpt-4o"
  | "gpt-4o-mini"
  | "gemini-2.5-pro"
  | "gemini-2.5-flash"
  | "llama-3.3-70b";

export type Category = "code" | "writing" | "analysis" | "sales" | "legal" | "image" | "ops";

export interface Prompt {
  id: string;
  category: Category;
  title: string;
  prompt: string;
  test_inputs: TestInput[];
  rubric: Rubric;
  models: ModelId[];
  affiliate_tool_default: string;
  needs_premium_verification?: boolean;
  added_date: string;
  schema_version: 1;
}

const VALID_CATEGORIES = new Set<string>(["code", "writing", "analysis", "sales", "legal", "image", "ops"]);
const VALID_MODELS = new Set<string>([
  "claude-opus-4-7", "claude-sonnet-4-6", "claude-haiku-4-5",
  "gpt-4o", "gpt-4o-mini", "gemini-2.5-pro", "gemini-2.5-flash", "llama-3.3-70b",
]);
const KEBAB_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE_RE = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

function validatePrompt(data: unknown, filename: string): Prompt {
  if (!data || typeof data !== "object") {
    throw new Error(`${filename}: root must be an object`);
  }
  const p = data as Record<string, unknown>;

  const required = ["id", "category", "title", "prompt", "test_inputs", "rubric", "models", "affiliate_tool_default", "added_date", "schema_version"] as const;
  for (const field of required) {
    if (!(field in p)) {
      throw new Error(`${filename}: missing required field "${field}"`);
    }
  }

  if (p.schema_version !== 1) {
    throw new Error(`${filename}: schema_version must be 1, got ${p.schema_version}`);
  }
  if (typeof p.id !== "string" || !KEBAB_RE.test(p.id)) {
    throw new Error(`${filename}: id must be kebab-case, got "${p.id}"`);
  }
  if (typeof p.category !== "string" || !VALID_CATEGORIES.has(p.category)) {
    throw new Error(`${filename}: category "${p.category}" is not in the allowed enum`);
  }
  if (typeof p.title !== "string" || p.title.length < 4) {
    throw new Error(`${filename}: title must be a string of at least 4 characters`);
  }
  if (typeof p.prompt !== "string" || p.prompt.length < 4) {
    throw new Error(`${filename}: prompt must be a string of at least 4 characters`);
  }
  if (!Array.isArray(p.test_inputs) || p.test_inputs.length < 1) {
    throw new Error(`${filename}: test_inputs must be a non-empty array`);
  }
  for (const ti of p.test_inputs as unknown[]) {
    if (!ti || typeof ti !== "object") throw new Error(`${filename}: test_inputs items must be objects`);
    const t = ti as Record<string, unknown>;
    if (typeof t.id !== "string" || !KEBAB_RE.test(t.id)) {
      throw new Error(`${filename}: test_inputs[].id must be kebab-case`);
    }
    if (!t.vars || typeof t.vars !== "object") {
      throw new Error(`${filename}: test_inputs[].vars must be an object`);
    }
  }
  if (!p.rubric || typeof p.rubric !== "object") {
    throw new Error(`${filename}: rubric must be an object`);
  }
  const r = p.rubric as Record<string, unknown>;
  if (!Array.isArray(r.criteria) || r.criteria.length < 1) {
    throw new Error(`${filename}: rubric.criteria must be a non-empty array`);
  }
  if (r.scoring_per_criterion !== "0-3") {
    throw new Error(`${filename}: rubric.scoring_per_criterion must be "0-3"`);
  }
  if (typeof r.pass_threshold !== "number" || !Number.isInteger(r.pass_threshold) || r.pass_threshold < 1) {
    throw new Error(`${filename}: rubric.pass_threshold must be a positive integer`);
  }
  if (typeof r.judge_prompt_template !== "string") {
    throw new Error(`${filename}: rubric.judge_prompt_template must be a string`);
  }
  if (!Array.isArray(p.models) || p.models.length < 1) {
    throw new Error(`${filename}: models must be a non-empty array`);
  }
  for (const m of p.models as unknown[]) {
    if (typeof m !== "string" || !VALID_MODELS.has(m)) {
      throw new Error(`${filename}: unknown model "${m}"`);
    }
  }
  if (typeof p.affiliate_tool_default !== "string" || p.affiliate_tool_default.length < 2) {
    throw new Error(`${filename}: affiliate_tool_default must be a string of at least 2 characters`);
  }
  if (typeof p.added_date !== "string" || !DATE_RE.test(p.added_date)) {
    throw new Error(`${filename}: added_date must be YYYY-MM-DD, got "${p.added_date}"`);
  }

  return p as unknown as Prompt;
}

export function loadCorpus(promptsDir?: string): Prompt[] {
  const dir = promptsDir ?? path.join(process.cwd(), "data", "observatory", "prompts");

  if (!fs.existsSync(dir)) {
    throw new Error(`Observatory prompts directory not found: ${dir}`);
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
  if (files.length === 0) {
    throw new Error(`No prompt JSON files found in ${dir}`);
  }

  const corpus: Prompt[] = [];
  const errors: string[] = [];

  for (const file of files) {
    const filepath = path.join(dir, file);
    try {
      const raw = fs.readFileSync(filepath, "utf-8");
      const data: unknown = JSON.parse(raw);
      corpus.push(validatePrompt(data, file));
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Observatory corpus validation failed:\n${errors.map((e) => `  - ${e}`).join("\n")}`
    );
  }

  return corpus;
}
