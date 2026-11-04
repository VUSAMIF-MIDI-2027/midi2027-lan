import { useEffect, useRef, useState, type FormEvent } from 'react'
import Modal from '../ui/Modal'
import { useLang } from '../../i18n/LanguageContext'
import { ApiError } from '../../services/api'
import { buildRegistrationPayload, createRegistration, registrationEnabled } from '../../services/registrations'
import type { RegistrationTournament } from '../../types/registration'

const VALORANT_RANKS = [
  'Iron',
  'Bronze',
  'Silver',
  'Gold',
  'Platinum',
  'Diamond',
  'Ascendant',
  'Immortal',
  'Radiant',
]


export default function RegistrationModal({ selectedTournament, closeRegistration }: {
  selectedTournament: RegistrationTournament
  closeRegistration: () => void
}) {
  const tr = useLang()
  const [submitted, setSubmitted] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const requestRef = useRef<AbortController | null>(null)
  useEffect(() => () => requestRef.current?.abort(), [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!registrationEnabled || requestRef.current) return
    const controller = new AbortController()
    requestRef.current = controller
    const payload = buildRegistrationPayload(new FormData(event.currentTarget), selectedTournament.id)
    setPending(true)
    setError('')
    try {
      await createRegistration(payload, controller.signal)
      if (!controller.signal.aborted) setSubmitted(true)
    } catch (error) {
      if (!controller.signal.aborted) {
        setError(error instanceof ApiError && error.problem.errors
          ? Object.values(error.problem.errors).flat().join(' ')
          : tr.registrationRetry)
      }
    } finally {
      if (!controller.signal.aborted) { setPending(false); requestRef.current = null }
    }
  }

  return <Modal labelledBy="register-modal-title" wide={selectedTournament.id === 'valorant'} onClose={closeRegistration}>
            <button
              type="button"
              className="register-modal-close"
              onClick={closeRegistration}
              aria-label={tr.closeModal}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            {!submitted ? (
              <>
                <div className="register-modal-heading">
                  <span>{selectedTournament.shortName}</span>
                  <h2 id="register-modal-title">
                    {tr.registerModalHeading} {selectedTournament.name}
                  </h2>
                  <p>{registrationEnabled ? tr.registerModalSubtitle : tr.registrationUnavailable}</p>
                </div>

                <form
                  aria-busy={pending} className={`register-form ${selectedTournament.id === 'valorant' ? 'register-form--valorant' : ''}`}
                  onSubmit={handleSubmit}
                >
                  <fieldset className="register-form-fields" disabled={pending}>
                  <label className="register-form-field--full">
                    <span>{tr.fieldName}</span>
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={tr.fieldNamePlaceholder}
                      required
                    />
                  </label>

                  <label>
                    <span>{tr.fieldEmail}</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={tr.fieldEmailPlaceholder}
                      required
                    />
                  </label>

                  {selectedTournament.id === 'valorant' && (
                    <>
                      <label>
                        <span>{tr.fieldAge}</span>
                        <input
                          name="age"
                          type="number"
                          inputMode="numeric"
                          min="1"
                          max="120"
                          placeholder={tr.fieldAgePlaceholder}
                          required
                        />
                      </label>

                      <label>
                        <span>{tr.fieldPhone}</span>
                        <input
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder={tr.fieldPhonePlaceholder}
                          required
                        />
                      </label>
                    </>
                  )}

                  {selectedTournament.id === 'valorant' && (
                    <>
                      <fieldset className="register-player-fields">
                        <legend>{tr.valorantTeamRiotIds}</legend>
                        <div>
                          {Array.from({ length: 5 }, (_, index) => (
                            <label key={index}>
                              <span>{tr.playerRiotId.replace('{number}', String(index + 1))}</span>
                              <input
                                name={`player${index + 1}RiotId`}
                                type="text"
                                placeholder="Name#1234"
                                required
                              />
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      <label>
                        <span>{tr.highestRank}</span>
                        <select name="highestRank" defaultValue="" required>
                          <option value="" disabled>{tr.selectRank}</option>
                          {VALORANT_RANKS.map((rank) => <option value={rank} key={rank}>{rank}</option>)}
                        </select>
                      </label>

                      <label>
                        <span>{tr.currentRank}</span>
                        <select name="currentRank" defaultValue="" required>
                          <option value="" disabled>{tr.selectRank}</option>
                          {VALORANT_RANKS.map((rank) => <option value={rank} key={rank}>{rank}</option>)}
                        </select>
                      </label>

                      <fieldset className="register-captain-fields">
                        <legend>{tr.captainInfoOnly}</legend>
                        <div>
                          <label>
                            <span>{tr.cmUsername}</span>
                            <input
                              name="challengermodeUsername"
                              type="text"
                              placeholder={tr.cmUsernamePlaceholder}
                              required
                            />
                          </label>

                          <label>
                            <span>{tr.discordUsername}</span>
                            <input
                              name="discordUsername"
                              type="text"
                              placeholder={tr.discordUsernamePlaceholder}
                              required
                            />
                          </label>
                        </div>
                      </fieldset>
                    </>
                  )}

                  </fieldset>
                  {error && <div className="register-form-field--full text-sm text-red-300" role="alert"><p>{tr.registrationError}</p><p>{error}</p></div>}
                  <button type="submit" className="register-submit" disabled={pending || !registrationEnabled}>
                    {pending ? tr.registrationSending : tr.registerBtn}
                    <span aria-hidden="true">→</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="register-success" role="status">
                <span className="register-success-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </span>
                <h2 id="register-modal-title">{tr.registerSuccessHeading}</h2>
                <p>{tr.registerSuccessBody.replace('{tournament}', selectedTournament.name)}</p>
                <button type="button" className="register-submit" onClick={closeRegistration}>
                  {tr.backToTournaments}
                </button>
              </div>
            )}

  </Modal>
}
