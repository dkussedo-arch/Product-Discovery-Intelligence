import type { IngestRequest, SynthesisResult } from './types'

/** Set to your deployed PDI URL when running inside Google AI Studio. */
export const PDI_API_BASE =
  (typeof import.meta !== 'undefined' &&
    (import.meta as { env?: { VITE_PDI_API_URL?: string } }).env?.VITE_PDI_API_URL) ||
  'https://product-discovery-intelligence.vercel.app'

function apiUrl(path: string, base = PDI_API_BASE): string {
  return `${base.replace(/\/$/, '')}${path}`
}

async function parseJson<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as T & { error?: string }
  if (!response.ok) {
    throw new Error(
      payload && typeof payload === 'object' && 'error' in payload && payload.error
        ? payload.error
        : `Request failed (${response.status})`
    )
  }
  return payload
}

export async function queryMemory(
  query: string,
  apiBase = PDI_API_BASE
): Promise<SynthesisResult> {
  const response = await fetch(apiUrl('/api/query', apiBase), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  return parseJson<SynthesisResult>(response)
}

export async function ingestArtifact(
  payload: IngestRequest,
  apiBase = PDI_API_BASE
): Promise<void> {
  const response = await fetch(apiUrl('/api/ingest', apiBase), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  await parseJson(response)
}

export async function listArtifactCount(apiBase = PDI_API_BASE): Promise<number> {
  const response = await fetch(apiUrl('/api/ingest', apiBase))
  const data = await parseJson<{ count: number }>(response)
  return data.count
}
