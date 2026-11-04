import type { CSSProperties } from 'react'
import { useSearchParams } from 'react-router'
import { useLang } from '../i18n/LanguageContext'
import { getRegistrationTournaments } from '../data/registrationTournaments'
import RegistrationModal from '../components/registration/RegistrationModal'
import type { RegistrationTournament } from '../types/registration'

export default function RegisterPage() {
  const tr = useLang()
  const [searchParams, setSearchParams] = useSearchParams()
  const tournaments = getRegistrationTournaments(tr)
  const requestedGame = searchParams.get('game')
  const selectedTournament = tournaments.find(game => game.id === (requestedGame === 'val' ? 'valorant' : requestedGame))
  function openRegistration(tournament: RegistrationTournament) {
    const next = new URLSearchParams(searchParams)
    next.set('game', tournament.id)
    setSearchParams(next)
  }
  function closeRegistration() {
    const next = new URLSearchParams(searchParams)
    next.delete('game')
    setSearchParams(next, { replace: true })
  }
  return (
    <section className="register-page">
      <div className="register-wrap">
        <header className="register-hero">
          <span className="register-kicker">MIDI LAN PARTY / 2027</span>
          <h1>{tr.registerHeading}</h1>
          <p>{tr.registerSubtext}</p>
        </header>

        <div className="register-grid">
          {tournaments.map((tournament, index) => (
            <button
              type="button"
              className="register-card"
              key={tournament.id}
              onClick={() => openRegistration(tournament)}
              style={{ '--register-card-bg': tournament.background } as CSSProperties}
              aria-label={`${tr.registerBtn}: ${tournament.name}`}
            >
              <span className="register-card-art" aria-hidden="true">
                <img className={`register-card-image ${tournament.imageClass}`} src={tournament.image} alt="" />
                <span className="register-card-shade" />
                <span className="register-card-index">{String(index + 1).padStart(2, '0')}</span>
              </span>

              <span className="register-card-content">
                <span className="register-card-short">{tournament.shortName}</span>
                <strong>{tournament.name}</strong>
                <span className="register-card-description">{tournament.description}</span>
                <span className="register-card-cta">
                  {tr.registerBtn}
                  <span aria-hidden="true">→</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>


      {selectedTournament && <RegistrationModal key={selectedTournament.id} selectedTournament={selectedTournament} closeRegistration={closeRegistration} />}
    </section>
  )
}
