/**
 * Product Discovery Intelligence — Google AI Studio UI
 *
 * Paste this file (and pdi-api.ts + types.ts) into your AI Studio app:
 * https://ai.studio/apps/7613e9c7-1cad-49f0-9a16-86f56fccd45f
 *
 * Set PDI_API_BASE in pdi-api.ts to your deployed backend URL.
 */
import React, { useEffect, useState } from 'react'

import { ingestArtifact, listArtifactCount, PDI_API_BASE, queryMemory } from './pdi-api'
import type { ArtifactSource, SynthesisResult } from './types'

const EXAMPLES = [
  'What do we know about why enterprise customers churn in the first 90 days?',
  'What assumptions are driving our Q1 roadmap?',
]

const styles = {
  page: {
    fontFamily: 'Inter, system-ui, sans-serif',
    background: '#0b0f14',
    color: '#e8edf4',
    minHeight: '100vh',
    padding: '24px',
  } as React.CSSProperties,
  card: {
    background: '#121820',
    border: '1px solid #1e2a38',
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '16px',
  } as React.CSSProperties,
  input: {
    width: '100%',
    background: '#0d1219',
    border: '1px solid #1e2a38',
    borderRadius: '12px',
    padding: '12px',
    color: '#e8edf4',
    marginBottom: '8px',
  } as React.CSSProperties,
  button: {
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 20px',
    cursor: 'pointer',
    fontWeight: 500,
  } as React.CSSProperties,
  muted: { color: '#8b9cb0', fontSize: '13px' } as React.CSSProperties,
  error: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.4)',
    borderRadius: '12px',
    padding: '12px',
    color: '#fecaca',
    marginBottom: '16px',
  } as React.CSSProperties,
}

export default function App() {
  const [apiBase, setApiBase] = useState(PDI_API_BASE)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SynthesisResult | null>(null)
  const [corpusCount, setCorpusCount] = useState<number | null>(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [source, setSource] = useState<ArtifactSource>('manual')

  useEffect(() => {
    listArtifactCount(apiBase)
      .then(setCorpusCount)
      .catch(() => setCorpusCount(null))
  }, [apiBase])

  const runQuery = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      setResult(await queryMemory(trimmed, apiBase))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Query failed')
    } finally {
      setLoading(false)
    }
  }

  const runIngest = async () => {
    if (!title.trim() || !content.trim()) return
    setError(null)
    try {
      await ingestArtifact({ title, content, source }, apiBase)
      setTitle('')
      setContent('')
      setCorpusCount(await listArtifactCount(apiBase))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ingest failed')
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>
        Product Discovery Intelligence
      </h1>
      <p style={styles.muted}>
        Wired to POST /api/query and POST /api/ingest ·{' '}
        {corpusCount !== null ? `${corpusCount} artifacts` : 'corpus unknown'}
      </p>

      <div style={styles.card}>
        <label style={styles.muted}>PDI API base URL</label>
        <input
          style={styles.input}
          value={apiBase}
          onChange={(e) => setApiBase(e.target.value)}
          placeholder="https://your-app.vercel.app"
        />
      </div>

      <div style={styles.card}>
        <input
          style={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do we know about…"
          onKeyDown={(e) => e.key === 'Enter' && void runQuery(query)}
        />
        <button
          style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}
          disabled={loading}
          onClick={() => void runQuery(query)}
        >
          {loading ? 'Synthesizing…' : 'Query memory'}
        </button>
        <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              style={{
                ...styles.button,
                background: 'transparent',
                border: '1px solid #1e2a38',
                fontSize: '12px',
                padding: '8px 12px',
              }}
              onClick={() => {
                setQuery(ex)
                void runQuery(ex)
              }}
            >
              {ex.slice(0, 48)}…
            </button>
          ))}
        </div>
      </div>

      <details style={styles.card}>
        <summary style={{ cursor: 'pointer', fontWeight: 500 }}>Ingest artifact</summary>
        <input
          style={{ ...styles.input, marginTop: '12px' }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <select
          style={styles.input}
          value={source}
          onChange={(e) => setSource(e.target.value as ArtifactSource)}
        >
          <option value="notion">Notion</option>
          <option value="dovetail">Dovetail</option>
          <option value="productboard">Productboard</option>
          <option value="slack">Slack</option>
          <option value="confluence">Confluence</option>
          <option value="manual">Manual</option>
        </select>
        <textarea
          style={{ ...styles.input, minHeight: '120px' }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Research notes or decision record…"
        />
        <button style={styles.button} onClick={() => void runIngest()}>
          POST /api/ingest
        </button>
      </details>

      {error && <div style={styles.error}>{error}</div>}

      {result && (
        <div style={styles.card}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Synthesis</h2>
          <p style={{ ...styles.muted, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
            {result.overview}
          </p>
          {result.citations.length > 0 && (
            <>
              <h3 style={{ marginTop: '16px', fontSize: '14px' }}>Sources</h3>
              <ul style={{ ...styles.muted, paddingLeft: '20px' }}>
                {result.citations.map((c) => (
                  <li key={c.id} style={{ marginBottom: '8px' }}>
                    [{c.id}] {c.title} — {c.excerpt.slice(0, 120)}…
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  )
}
