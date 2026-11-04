import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import navLogo from '../../assets/images/logo-a.png'
import { t, type Lang } from '../../i18n/translations'

const NAV_KEYS: { key: keyof typeof t.EN; to: string }[] = [
  { key: 'about', to: '/' },
  { key: 'gallery', to: '/gallery' },
  { key: 'games', to: '/games' },
  { key: 'register', to: '/register' },
  { key: 'details', to: '/details' },
]


export default function SiteHeader({lang, setLang}: {lang: Lang; setLang: (lang: Lang) => void}) {
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === '/about'
  const tr = t[lang]
  const [menuOpen, setMenuOpen] = useState(false)
  return (
        <header onKeyDown={event => { if (event.key === 'Escape') setMenuOpen(false) }} style={{
          position: 'sticky', top: 0, zIndex: 10,
          background: 'rgba(10,10,12,0.80)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', height: 64,
        }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', lineHeight: 0, paddingLeft: 16, flexShrink: 0 }}>
            <img src={navLogo} alt="MIDI" style={{ height: 44, width: 'auto', mixBlendMode: 'screen' }} />
          </Link>

          <button type="button" className="mobile-menu-button" aria-label={tr.toggleMenu} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '\u2715' : '\u2630'}</button>
          <nav id="primary-navigation" aria-label={tr.primaryNavigation} className={menuOpen ? 'primary-navigation is-open' : 'primary-navigation'} style={{ marginLeft: 'auto', marginRight: 16, display: 'flex', gap: 4 }}>
            {NAV_KEYS.map(({ key, to }) => {
              const active = to === '/' ? (location.pathname === '/' || location.pathname === '/about') : location.pathname === to
              return (
                <Link
                  key={to}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                  to={to}
                  style={{
                    textDecoration: 'none',
                    padding: '8px 16px',
                    fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: active ? '#fff' : '#c8d4e8',
                    background: active ? (isHome ? 'rgba(21,94,239,0.18)' : 'rgba(96,170,255,0.12)') : 'transparent',
                    border: `1px solid ${active ? (isHome ? 'rgba(57,189,248,0.55)' : 'rgba(96,170,255,0.35)') : 'transparent'}`,
                    borderRadius: 2,
                    transition: 'color 0.15s, background 0.15s, border-color 0.15s',
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.color = '#c8d4e8'; e.currentTarget.style.background = 'transparent' } }}
                >{tr[key]}</Link>
              )
            })}
          </nav>

          {/* Language switcher */}
          <div style={{
            display: 'flex', alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 2, overflow: 'hidden',
            marginRight: 16, flexShrink: 0,
          }}>
            {(['EN', 'LT'] as const).map((l, i) => (
              <button
                key={l}
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
                style={{
                  background: lang === l ? (isHome ? 'rgba(21,94,239,0.24)' : 'rgba(96,170,255,0.18)') : 'transparent',
                  color: lang === l ? '#fff' : (isHome ? '#6f8eb8' : '#6a8099'),
                  border: 'none',
                  borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                  padding: '6px 10px',
                  fontSize: 11, fontWeight: 800, letterSpacing: '0.1em',
                  cursor: 'pointer',
                  fontFamily: '"Dosis","Arial Narrow",system-ui,sans-serif',
                  transition: 'background 0.15s, color 0.15s',
                }}
              >{l}</button>
            ))}
          </div>
        </header>
  )
}
