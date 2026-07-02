import { corsPreflightResponse, withCors } from '@/lib/cors'

export function OPTIONS(request: Request): Response {
  return corsPreflightResponse(request)
}

export { withCors }
