import { OPTIONS, withCors } from '@/lib/api-route'
import { addArtifact, listArtifacts } from '@/lib/rag/store'
import type { ArtifactSource, IngestRequest } from '@/lib/types'

export const runtime = 'nodejs'

export { OPTIONS }

export async function GET(request: Request): Promise<Response> {
  const artifacts = listArtifacts()
  return withCors(
    request,
    Response.json({
      count: artifacts.length,
      artifacts: artifacts.map(({ id, title, source, createdAt, tags }) => ({
        id,
        title,
        source,
        createdAt,
        tags,
      })),
    })
  )
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return withCors(
      request,
      Response.json({ error: 'Request body must be valid JSON.' }, { status: 400 })
    )
  }

  const payload = body as IngestRequest
  if (!payload.title?.trim() || !payload.content?.trim()) {
    return withCors(
      request,
      Response.json({ error: 'title and content are required.' }, { status: 400 })
    )
  }

  const source: ArtifactSource = payload.source ?? 'manual'

  try {
    const artifact = addArtifact({
      title: payload.title.trim(),
      content: payload.content.trim(),
      source,
      sourceUrl: payload.sourceUrl,
      author: payload.author,
      tags: payload.tags,
    })

    return withCors(request, Response.json({ artifact }))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ingest failed.'
    console.error('[PDI] Ingest error:', message)
    return withCors(
      request,
      Response.json({ error: 'Failed to ingest artifact.' }, { status: 500 })
    )
  }
}
