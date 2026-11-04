import { postJson } from './api.ts'
import type { RegistrationGameId, RegistrationRequest, RegistrationResponse } from '../types/registration.ts'

export const registrationEnabled = import.meta.env?.VITE_ENABLE_REGISTRATION === 'true'

export function buildRegistrationPayload(data: FormData, tournamentId: RegistrationGameId): RegistrationRequest {
  const text = (name: string) => String(data.get(name) ?? '').trim()
  const base = { tournamentId, fullName: text('name'), email: text('email') }
  if (tournamentId !== 'valorant') return base
  return {
    ...base,
    age: Number(text('age')),
    phone: text('phone'),
    riotIds: Array.from({ length: 5 }, (_, index) => text(`player${index + 1}RiotId`)),
    highestRank: text('highestRank'),
    currentRank: text('currentRank'),
    challengermodeUsername: text('challengermodeUsername'),
    discordUsername: text('discordUsername'),
  }
}

export async function createRegistration(payload: RegistrationRequest, signal?: AbortSignal): Promise<RegistrationResponse> {
  if (!registrationEnabled) throw new Error('Registration is not open yet.')
  const result = await postJson<RegistrationResponse>('registrations', payload, signal)
  if (!result || typeof result.id !== 'string' || !result.id.trim() || result.tournamentId !== payload.tournamentId) {
    throw new Error('The registration API did not return a valid confirmation.')
  }
  return result
}
