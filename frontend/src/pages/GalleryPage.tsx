import heroBg from '../assets/images/hero-bg.jpg'
import { wrap, h2 } from '../styles/layout'
import { useLang } from '../i18n/LanguageContext'

const photos = Array.from({ length: 9 }, (_, i) => i)

export default function GalleryPage() {
  const tr = useLang()
  return (
    <section className="gallery-page" style={{ padding: '80px 0 96px' }}>
      <div style={wrap}>
        <h1 style={h2}>{tr.galleryHeading}</h1>
        <p style={{ color: '#8fa8cc', marginBottom: 48, maxWidth: 540 }}>{tr.gallerySubtext}</p>
      </div>
      <div className="gallery-grid">
        {photos.map(i => (
          <div className="gallery-tile" key={i}>
            <img
              src={heroBg}
              alt={tr.galleryPhotoAlt.replace('{number}', String(i + 1))}
              loading={i > 2 ? 'lazy' : 'eager'}
              style={{ objectPosition: `${(i * 13) % 80}% center` }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
