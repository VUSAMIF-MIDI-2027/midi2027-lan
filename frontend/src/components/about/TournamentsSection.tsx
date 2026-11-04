import { Link } from 'react-router'
import { useLang } from '../../i18n/LanguageContext'
import { wrap } from '../../styles/layout'
import type { CSSProperties } from 'react'
import { useTournaments } from '../../hooks/useTournaments'

const registrationGames: Record<string, string> = { lol: 'lol', cs2: 'cs2', val: 'valorant', tft: 'tft' }

export default function TournamentsSection() {
  const tr = useLang()
  const { tournaments, loading, error, retry } = useTournaments()
  return (
      <section id="tournaments" aria-label={tr.tournaments} className="tournaments-section">
        <div style={wrap}>
          {error && <p role="alert" className="mb-6 text-sm text-red-300">{tr.apiError} <button type="button" className="underline" onClick={retry}>{tr.retry}</button></p>}
          {loading && <p role="status" className="mb-6 text-sm text-muted">{tr.loading}</p>}
          {!loading && !error && tournaments.length === 0 && <p role="status" className="mb-6 text-muted">{tr.noTournaments}</p>}
          <div className="tournaments-heading">
            <h2 className="tournaments-title">{tr.tournaments}</h2>
          </div>
        </div>

        <div className="tournaments-scroll">
          <div className="tournaments-track">
            {tournaments.map((t, index) => (
              <Link
                aria-label={`${t.game} tournament — ${t.date}`}
                className="tournament-card"
                key={t.abbr}
                style={{
                  '--tournament-accent': t.accent,
                  '--tournament-bg': t.bg,
                } as CSSProperties}
                to={t.registrationPath ?? (registrationGames[t.abbr.toLowerCase()] ? `/register?game=${registrationGames[t.abbr.toLowerCase()]}` : '/register')}
              >
                <div className="tournament-art">
                  {t.logo ? (
                    t.logoCover ? (
                      <img
                        className="tournament-image tournament-image--cover"
                        src={t.logo}
                        alt=""
                        style={{ objectPosition: t.imagePosition ?? 'center' }}
                      />
                    ) : (
                      <>
                        <div className="tournament-art-bg" />
                        <img
                          className="tournament-image tournament-image--contained"
                          src={t.logo}
                          alt=""
                          style={{ mixBlendMode: t.logoBlend ?? 'normal' }}
                        />
                      </>
                    )
                  ) : t.art}

                  <div className="tournament-image-shade" />
                  <span className={`tournament-badge ${t.class === 'Main' ? 'tournament-badge--main' : ''}`}>
                    {t.class === 'Main' ? tr.mainTournament : tr.sideTournament}
                  </span>
                  <span className="tournament-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="tournament-info">
                  <span className="tournament-date">{t.date}</span>
                  <h3 className="tournament-name">
                    {t.game}
                    <span className="tournament-arrow" aria-hidden="true">→</span>
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

  )
}
