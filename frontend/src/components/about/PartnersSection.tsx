import { useLang } from '../../i18n/LanguageContext'
import { partners } from '../../data/partners'

export default function PartnersSection() {
  const tr = useLang()
  return (
      <section id="sponsors" className="partners-section">
        <div className="partners-wrap">
          <h2 className="partners-heading">
            {tr.partnersLabel}
          </h2>
          <div className="partners-grid">
            {partners.map((s) => (
              <div className={`partner-card ${s.colorBg ? 'partner-card--color' : ''}`} key={s.alt}>
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
