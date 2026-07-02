export type ArtifactSource =
  | 'notion'
  | 'dovetail'
  | 'productboard'
  | 'slack'
  | 'confluence'
  | 'manual'

export interface Citation {
  id: number
  artifactId: string
  title: string
  source: ArtifactSource
  sourceUrl?: string
  excerpt: string
  retrievalScore: number
}

export interface SynthesisClaim {
  text: string
  confidence: 'high' | 'medium' | 'low' | 'coverage_gap'
  confidenceRationale: string
  citationIds: number[]
}

export interface SynthesisResult {
  query: string
  overview: string
  claims: SynthesisClaim[]
  conflicts?: string[]
  evidenceGaps?: string[]
  nextQuestions: string[]
  citations: Citation[]
  coverageState: 'sufficient' | 'limited' | 'gap'
}

export interface IngestRequest {
  title: string
  content: string
  source?: ArtifactSource
  sourceUrl?: string
  author?: string
  tags?: string[]
}
