import type { ArtifactSource, IngestRequest, SynthesisResult } from '@/lib/types'

export interface ArtifactSummary {
  id: string
  title: string
  source: ArtifactSource
  createdAt: string
  tags?: string[]
}

export interface IngestListResponse {
  count: number
  artifacts: ArtifactSummary[]
}

function resolveApiBase(explicitBase?: string): string {
  if (explicitBase) {
    return explicitBase.replace(/\/$/, '')
  }

  if (typeof window !== 'undefined') {
    return ''
  }

  return process.env.NEXT_PUBLIC_PDI_API_URL?.replace(/\/$/, '') ?? ''
}

async function parseJson<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as T & { error?: string }
  if (!response.ok) {
    throw new Error(
      typeof payload === 'object' &&
        payload !== null &&
        'error' in payload &&
        payload.error
        ? payload.error
        : `Request failed (${response.status})`
    )
  }
  return payload
}

export async function queryMemory(
  query: string,
  apiBase?: string
): Promise<SynthesisResult> {
  const base = resolveApiBase(apiBase)
  const response = await fetch(`${base}/api/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })

  return parseJson<SynthesisResult>(response)
}

export async function ingestArtifact(
  payload: IngestRequest,
  apiBase?: string
): Promise<{ artifact: ArtifactSummary & { content?: string } }> {
  const base = resolveApiBase(apiBase)
  const response = await fetch(`${base}/api/ingest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  return parseJson(response)
}

export async function listArtifacts(
  apiBase?: string
): Promise<IngestListResponse> {
  const base = resolveApiBase(apiBase)
  const response = await fetch(`${base}/api/ingest`, { method: 'GET' })
  return parseJson(response)
}
