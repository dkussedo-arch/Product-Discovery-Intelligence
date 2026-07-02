# Google AI Studio integration

**Prototype:** https://ai.studio/apps/7613e9c7-1cad-49f0-9a16-86f56fccd45f  
**Backend repo:** https://github.com/dkussedo-arch/Product-Discovery-Intelligence  
**Wired UI in repo:** `/studio` route + `ai-studio/` export folder

## Option A — Use `/studio` (recommended)

Deploy this repo and open `https://your-deployment.vercel.app/studio`.

- Calls `POST /api/query` and `POST /api/ingest` via `lib/pdi-api.ts`
- Includes ingest form and API base URL field for cross-origin testing

## Option B — Paste into Google AI Studio

1. Deploy the backend (Vercel) with `ANTHROPIC_API_KEY`
2. Copy `ai-studio/types.ts`, `ai-studio/pdi-api.ts`, and `ai-studio/App.tsx` into your [AI Studio app](https://ai.studio/apps/7613e9c7-1cad-49f0-9a16-86f56fccd45f)
3. Set `PDI_API_BASE` in `pdi-api.ts` to your deployment URL

See [`ai-studio/README.md`](../ai-studio/README.md) for details.

## CORS

API routes expose CORS headers for:

- `https://ai.studio`
- `https://aistudio.google.com`
- `*.ai.studio` subdomains
- `localhost:3000`

Add more origins with `ALLOWED_CORS_ORIGINS` (comma-separated).

## Environment variables

```env
ANTHROPIC_API_KEY=          # required for synthesis
NEXT_PUBLIC_PDI_API_URL=      # optional default API base for clients
ALLOWED_CORS_ORIGINS=         # optional extra CORS origins
```

## API contract

### Query organizational memory

```
POST {BASE_URL}/api/query
Content-Type: application/json

{ "query": "What do we know about enterprise onboarding churn?" }
```

### Ingest an artifact

```
POST {BASE_URL}/api/ingest
Content-Type: application/json

{
  "title": "Q1 interview synthesis",
  "content": "…",
  "source": "notion"
}
```

### List corpus

```
GET {BASE_URL}/api/ingest
```
