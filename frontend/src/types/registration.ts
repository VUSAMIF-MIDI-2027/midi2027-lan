export type RegistrationGameId = 'cs2' | 'lol' | 'valorant' | 'tft'

export interface RegistrationTournament {
  id: RegistrationGameId
  name: string
  shortName: string
  description: string
  image: string
  imageClass: string
  background: string
}

export interface RegistrationRequest {
  tournamentId: RegistrationGameId
  fullName: string
  email: string
  age?: number
  phone?: string
  riotIds?: string[]
  highestRank?: string
  currentRank?: string
  challengermodeUsername?: string
  discordUsername?: string
}

export interface RegistrationResponse {
  id: string
  tournamentId: RegistrationGameId
}
