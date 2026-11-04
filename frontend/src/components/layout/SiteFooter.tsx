import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { useLang } from '../../i18n/LanguageContext'
import { wrap } from '../../styles/layout'
import facebookPreview from '../../assets/images/social-facebook-preview.png'
import instagramPreview from '../../assets/images/social-instagram-preview.png'
import tiktokPreview from '../../assets/images/social-tiktok-preview.png'
import xPreview from '../../assets/images/social-x-preview.png'

const SOCIALS: {
  label: string
  href: string
  handle: string
  preview?: string
  icon: ReactNode
}[] = [
  {
    label: 'Instagram', href: 'https://www.instagram.com/midi.lt/', handle: '@midi.lt', preview: instagramPreview,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/></svg>,
  },
  {
    label: 'Facebook', href: 'https://www.facebook.com/midi.lt', handle: 'MIDI', preview: facebookPreview,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    label: 'X / Twitter', href: 'https://x.com/MIDI_LAN', handle: '@MIDI_LAN', preview: xPreview,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: 'TikTok', href: 'https://www.tiktok.com/@midi.lt', handle: '@midi.lt', preview: tiktokPreview,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 3v10.2a4.6 4.6 0 1 1-4-4.56v2.95a1.75 1.75 0 1 0 1.15 1.64V3h2.85Zm0 0c.37 2.16 1.65 3.46 4 3.75v2.9c-1.67-.08-3.03-.58-4-1.48V3Z"/></svg>,
  },
]


export default function SiteFooter() {
  const tr = useLang()
  const year = new Date().getFullYear()
  return (
        <footer className="site-footer">
          <div className="site-footer-inner" style={wrap}>
            <span className="site-footer-copyright">&copy; {year} MIDI. {tr.allRights}</span>

            <div className="site-footer-policies" aria-label="Legal information">
              <Link to="/cookies">{tr.cookiesPolicy}</Link>
              <Link to="/privacy">{tr.privacyPolicy}</Link>
            </div>

            <div className="site-footer-social">
              <span className="site-footer-social-label">{tr.social}</span>
              <span className="site-footer-divider" aria-hidden="true" />
              <div className="site-footer-icons">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    {s.icon}
                    <span className={`social-preview ${s.preview ? '' : 'social-preview--compact'}`} aria-hidden="true">
                      <span className="social-preview-header">
                        <span>
                          <strong>{s.label}</strong>
                          <small>{s.handle}</small>
                        </span>
                        <span className="social-preview-arrow">&#8599;</span>
                      </span>
                      {s.preview && <img src={s.preview} alt="" />}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
  )
}
