import type { CSSProperties } from 'react'
import { useSearchParams } from 'react-router'
import { useLang } from '../i18n/LanguageContext'
import { t, type Translation } from '../i18n/translations'
import { registrationTournaments } from '../data/registrationTournaments'
import RegistrationModal from '../components/registration/RegistrationModal'
import type { RegistrationTournament } from '../types/registration'

const sections = [
  { id: 'main', title: 'registerMainHeading', description: 'registerMainDescription' },
  { id: 'side', title: 'registerSideHeading', description: 'registerSideDescription' },
] as const

function RegisterCopy({ as: Tag, text, otherText, className, id }: {
  as: 'h1' | 'h2' | 'p' | 'span'
  text: string
  otherText: string
  className?: string
  id?: string
}) {
  return (
    <Tag id={id} className={className ? `register-copy ${className}` : 'register-copy'}>
      <span>{text}</span>
      <span aria-hidden="true">{otherText}</span>
    </Tag>
  )
}

export default function RegisterPage() {
  const tr = useLang()
  const otherTranslation: Translation = tr === t.EN ? t.LT : t.EN
  const [searchParams, setSearchParams] = useSearchParams()
  const tournaments = registrationTournaments
  const requestedGame = searchParams.get('game')
  const selectedTournament = [...tournaments.main, ...tournaments.side]
    .find(game => game.id === (requestedGame === 'val' ? 'valorant' : requestedGame))
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
        {sections.map(({ id, title, description }) => {
          const isMain = id === 'main'
          const Heading = isMain ? 'h1' : 'h2'
          return (
            <section className="register-section" key={id} aria-labelledby={`register-${id}-heading`}>
              <header className="register-section-label">
                <span>{isMain ? '01' : '02'} / MIDI LAN PARTY</span>
                <RegisterCopy as={Heading} id={`register-${id}-heading`} text={tr[title]} otherText={otherTranslation[title]} />
                <RegisterCopy as="p" text={tr[description]} otherText={otherTranslation[description]} />
              </header>
              <div className={`register-grid register-grid--${id}`}>
                {tournaments[id].map((tournament, index) => (
                  <button
                    type="button"
                    className="register-card"
                    key={tournament.id}
                    onClick={() => openRegistration(tournament)}
                    style={{ '--register-card-bg': tournament.background } as CSSProperties}
                    aria-label={`${tr.registerBtn}: ${tournament.name}`}
                  >
                    <span className="register-card-art" aria-hidden="true">
                      {tournament.image
                        ? <img className={`register-card-image ${tournament.imageClass}`} src={tournament.image} alt="" />
                        : <span className="register-card-fallback">{tournament.shortName}</span>}
                      <span className="register-card-shade" />
                      <span className="register-card-index">{String(index + 1 + (isMain ? 0 : tournaments.main.length)).padStart(2, '0')}</span>
                    </span>

                    <span className="register-card-content">
                      <span className="register-card-short">{tournament.shortName}</span>
                      <strong>{tournament.name}</strong>
                      <RegisterCopy
                        as="span"
                        className="register-card-description"
                        text={tr[tournament.descriptionKey]}
                        otherText={otherTranslation[tournament.descriptionKey]}
                      />
                      <span className="register-card-cta">
                        {tr.registerBtn}
                        <span aria-hidden="true">→</span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {selectedTournament && <RegistrationModal key={selectedTournament.id} selectedTournament={selectedTournament} closeRegistration={closeRegistration} />}
    </section>
  )
}
