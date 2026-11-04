export interface ProblemDetails {
  title?: string
  detail?: string
  status?: number
  errors?: Record<string, string[]>
}

export class ApiError extends Error {
  public status: number
  public problem: ProblemDetails
  constructor(status: number, problem: ProblemDetails) {
    super(problem.detail || problem.title || `Request failed (${status})`)
    this.name = 'ApiError'
    this.status = status
    this.problem = problem
  }
}

const baseUrl = (import.meta.env?.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

/** JSON transport for ASP.NET APIs, including RFC Problem Details responses. */
export async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  return requestJson<T>(path, { signal })
}

export async function postJson<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
  return requestJson<T>(path, { method: 'POST', body: JSON.stringify(body), signal })
}

async function requestJson<T>(path: string, options: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}/${path.replace(/^\//, '')}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    },
  })
  if (!response.ok) {
    const problem: ProblemDetails = await response.json().catch(() => ({ title: response.statusText }))
    throw new ApiError(response.status, problem)
  }
  return response.json() as Promise<T>
}
