import Modal from '../ui/Modal'
import { useLang } from '../../i18n/LanguageContext'
import type { RegistrationTournament } from '../../types/registration'

export default function RegistrationModal({ selectedTournament, closeRegistration }: {
  selectedTournament: RegistrationTournament
  closeRegistration: () => void
}) {
  const tr = useLang()

  return (
    <Modal labelledBy="register-modal-title" onClose={closeRegistration}>
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
      <div className="register-modal-heading">
        <span>{selectedTournament.shortName}</span>
        <h2 id="register-modal-title">{selectedTournament.name}</h2>
        <p>{tr.registrationUnavailable}</p>
      </div>
    </Modal>
  )
}
