# Paste into Google AI Studio

**Your app:** https://ai.studio/apps/7613e9c7-1cad-49f0-9a16-86f56fccd45f

## Files to copy

Copy these three files into your AI Studio project editor:

1. `types.ts`
2. `pdi-api.ts` — **set `PDI_API_BASE` to your deployed URL**
3. `App.tsx`

## Deploy backend first

```bash
# From repo root
pnpm install
# Set ANTHROPIC_API_KEY on Vercel, then:
npx vercel deploy --prod
```

Or use the wired UI already in this repo at `/studio` (same origin — no CORS config needed).

## API endpoints used

| Action | Method | Path |
|--------|--------|------|
| Query memory | POST | `/api/query` |
| Ingest artifact | POST | `/api/ingest` |
| List corpus | GET | `/api/ingest` |

## CORS

The backend allows requests from `ai.studio`, `aistudio.google.com`, and `*.ai.studio` subdomains.

## Alternative: use `/studio` in this repo

Open `/studio` on your deployment — same UI, pre-wired to the API with an optional base URL field for cross-origin testing.
