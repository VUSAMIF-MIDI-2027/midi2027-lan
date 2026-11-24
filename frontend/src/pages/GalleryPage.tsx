import { wrap, h2 } from '../styles/layout'
import { useLang } from '../i18n/LanguageContext'
import { galleryPhotos } from '../data/gallery'

export default function GalleryPage() {
  const tr = useLang()
  return (
    <section className="gallery-page" style={{ padding: '80px 0 96px' }}>
      <div style={wrap}>
        <h1 style={{ ...h2, fontSize: 'clamp(56px, 8vw, 88px)' }}>{tr.galleryHeading}</h1>
        <p style={{ color: '#8fa8cc', marginBottom: 48, maxWidth: 540 }}>{tr.gallerySubtext}</p>
      </div>
      <div className="gallery-grid">
        {galleryPhotos.map((photo, i) => (
          <div className="gallery-tile" key={photo.src}>
            <img
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={tr.galleryPhotoAlt.replace('{number}', String(i + 1))}
              loading={i > 2 ? 'lazy' : 'eager'}
              decoding="async"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
