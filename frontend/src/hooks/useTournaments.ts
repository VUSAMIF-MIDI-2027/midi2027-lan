import { useContext, useEffect, useState } from 'react'
import { tournamentFixtures } from '../data/tournaments'
import { getTournaments } from '../services/tournaments'
import { LangContext, useLang } from '../i18n/LanguageContext'
import type { TournamentDto } from '../types/tournament'

type Card = (typeof tournamentFixtures)[number] & { registrationPath?: string }
const useApi = import.meta.env.VITE_USE_API === 'true'

export function useTournaments() {
  const [items, setItems] = useState<TournamentDto[]>([])
  const [loading, setLoading] = useState(useApi)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const lang = useContext(LangContext)
  const tr = useLang()

  useEffect(() => {
    if (!useApi) return
    const controller = new AbortController()
    setLoading(true)
    setError(false)
    getTournaments(controller.signal)
      .then(setItems)
      .catch(() => { if (!controller.signal.aborted) setError(true) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [attempt])

  const tournaments: Card[] = useApi ? items.map(item => {
    const artwork = tournamentFixtures.find(fixture => fixture.abbr.toLowerCase() === item.id)
    return {
      ...artwork,
      game: item.game, class: item.category, abbr: item.id,
      date: item.date ? new Intl.DateTimeFormat(lang === 'LT' ? 'lt-LT' : 'en-US', {
        year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
      }).format(new Date(item.date)) : tr.dateTba,
      logo: item.imageUrl ?? artwork?.logo,
      logoCover: item.imageUrl ? true : artwork?.logoCover,
      accent: '#0075b5', bg: artwork?.bg ?? '#080d16',
      registrationPath: item.registrationPath,
    }
  }) : tournamentFixtures

  return { tournaments, loading, error, retry: () => setAttempt(current => current + 1) }
}
