export interface TournamentDto {
  id: string
  game: string
  category: 'Main' | 'Side'
  /** ISO 8601 calendar date; null until event dates are confirmed. */
  date: string | null
  /** Public HTTPS URL or root-relative URL, served by ASP.NET or a CDN. */
  imageUrl: string | null
  registrationPath: string
}
