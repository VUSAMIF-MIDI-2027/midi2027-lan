import { Link } from 'react-router'
import { useLang } from '../../i18n/LanguageContext'

export default function CommunitySection() {
  const tr = useLang()
  return (
      <section id="contact" className="contact-section">
        <div className="contact-grid">
          <article className="contact-card contact-card--discord">
            <span className="contact-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3c-.2.4-.4.9-.6 1.2a18.3 18.3 0 0 0-5.5 0A12.6 12.6 0 0 0 8.7 3a19.7 19.7 0 0 0-4.9 1.4C.7 9 .2 13.5.6 18a19.9 19.9 0 0 0 6 3c.5-.6.9-1.3 1.2-2a12.7 12.7 0 0 1-1.9-.9l.4-.3a13.9 13.9 0 0 0 11.5 0l.4.3c-.6.4-1.2.7-1.9.9.4.7.8 1.4 1.2 2a19.8 19.8 0 0 0 6-3c.5-5.2-.8-9.7-3.5-13.7ZM8.4 15.3c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Zm7.2 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Z" />
              </svg>
            </span>
            <div>
              <span className="contact-eyebrow">{tr.discordEyebrow}</span>
              <h2>{tr.discordHeading}</h2>
              <p>{tr.discordBody}</p>
            </div>
            <a className="contact-button contact-button--discord" href="https://discord.gg/HwFhKe3Brn" target="_blank" rel="noopener noreferrer">
              {tr.discordCta}
              <span aria-hidden="true">→</span>
            </a>
          </article>

          <article className="contact-card">
            <div>
              <span className="contact-eyebrow">{tr.contactEyebrow}</span>
              <h2>{tr.contactHeading}</h2>
              <p>{tr.contactSubtext}</p>
            </div>
            <Link className="contact-button" to="/contact" onClick={() => window.scrollTo(0, 0)}>
              {tr.contactCta}
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </section>
  )
}
