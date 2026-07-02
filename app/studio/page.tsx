import type { Metadata } from 'next'

import { AiStudioShell } from '@/components/ai-studio-shell'

export const metadata: Metadata = {
  title: 'PDI — AI Studio UI',
  description: 'Product Discovery Intelligence workspace wired to PDI API endpoints.',
}

export default function StudioPage() {
  return <AiStudioShell showApiConfig />
}
