import { wrap, h2 } from '../styles/layout'
import { useLang } from '../i18n/LanguageContext'

export default function DetailsPage() {
  const tr = useLang()

  const rows: [string, string][] = [
    [tr.detDate, tr.detDateVal],
    [tr.detPlace, tr.detPlaceVal],
    [tr.detWho, tr.detWhoVal],
    [tr.detGames, tr.detGamesVal],
    [tr.detFormat, tr.detFormatVal],
    [tr.detDuration, tr.detDurationVal],
  ]

  return (
    <section className="details-page" style={{ padding: '80px 0 96px' }}>
      <div style={wrap}>
        <h1 style={h2}>{tr.detailsHeading}</h1>
        <dl className="details-list" style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '0 40px', margin: '48px 0 0', maxWidth: 640 }}>
          {rows.map(([dt, dd]) => (
            <div key={dt} style={{ display: 'contents' }}>
              <dt style={{ padding: '18px 0', borderBottom: '1px solid rgba(96,170,255,0.1)', color: '#5a7a99', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{dt}</dt>
              <dd style={{ padding: '18px 0', borderBottom: '1px solid rgba(96,170,255,0.1)', margin: 0, color: '#c8d4e8', fontSize: 16 }}>{dd}</dd>
            </div>
          ))}
        </dl>
        <div style={{ marginTop: 64, padding: '32px 36px', background: 'rgba(96,170,255,0.07)', border: '1px solid rgba(96,170,255,0.22)', borderRadius: 4, maxWidth: 640 }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700, color: '#e8f0ff' }}>{tr.detCalloutHeading}</h3>
          <p style={{ margin: 0, color: '#8fa8cc', lineHeight: 1.7 }}>{tr.detCalloutBody}</p>
        </div>
      </div>
    </section>
  )
}
