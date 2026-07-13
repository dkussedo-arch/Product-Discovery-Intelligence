# Prompt evaluation (Promptfoo)

**Stage 8 deploy rule:** do NOT deploy until pass rate is **≥ 85%**. World-class target: **95%+**.

Baseline fixtures: **tc-001** (typical good document), **tc-002** (no relevant content → NOT_FOUND).

Requires `ANTHROPIC_API_KEY` in your environment.

## Quick start

```bash
# Install Promptfoo (global CLI)
npm install -g promptfoo

# Run the document analysis eval suite (deploy gate)
npx promptfoo eval --config prompts/evaluation/promptfooconfig.yaml

# Enforce 85% minimum pass rate before deploy
pnpm eval:gate

# View results in a browser dashboard (pass rate %, failures, latency per test)
npx promptfoo view
```

## Configs

| File | Purpose |
|------|---------|
| `document-analysis-prompt.yaml` | Chat template for document analysis eval |
| `synthesis-baseline-prompt.yaml` | Baseline synthesis chat template |
| `synthesis-cot-prompt.yaml` | Chain-of-thought synthesis chat template |
| `promptfooconfig.yaml` | Stage 8 document analysis gate (tc-001 … tc-012) |
| `promptfooconfig.synthesis.yaml` | Synthesis baseline vs chain-of-thought A/B |
| `test-cases.json` | Canonical test fixtures (edit this file) |
| `test-cases.promptfoo.yaml` | Generated from JSON — run `pnpm eval:sync` |
| `assert-document-output.mjs` | Custom assertions |

## Synthesis evals

```bash
npx promptfoo eval --config prompts/evaluation/promptfooconfig.synthesis.yaml
pnpm eval:gate:synthesis
```

## Results

- Terminal: pass rate %, failed cases, per-test latency
- Dashboard: `npx promptfoo view`
- JSON output: `prompts/evaluation/latest-results.json` (after `pnpm eval:gate`)
