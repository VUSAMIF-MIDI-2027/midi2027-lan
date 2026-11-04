import { getJson } from './api.ts'
import type { TournamentDto } from '../types/tournament.ts'

export async function getTournaments(signal?: AbortSignal): Promise<TournamentDto[]> {
  const result = await getJson<unknown>('tournaments', signal)
  if (!Array.isArray(result) || !result.every(isTournament)) {
    throw new Error('The tournaments API returned an invalid response.')
  }
  return result
}

function isTournament(value: unknown): value is TournamentDto {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return typeof item.id === 'string' && typeof item.game === 'string'
    && (item.category === 'Main' || item.category === 'Side')
    && (item.date === null || (typeof item.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item.date) && !Number.isNaN(Date.parse(item.date))))
    && (item.imageUrl === null || (typeof item.imageUrl === 'string' && /^(https:\/\/|\/(?!\/))/.test(item.imageUrl)))
    && typeof item.registrationPath === 'string' && /^\/register(?:\?|$)/.test(item.registrationPath)
}
