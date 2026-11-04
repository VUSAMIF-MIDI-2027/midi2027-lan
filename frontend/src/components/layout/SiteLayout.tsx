import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import { LangContext } from '../../i18n/LanguageContext'
import { t, type Lang } from '../../i18n/translations'

export default function SiteLayout() {
  const { pathname } = useLocation()
  const [lang, setLang] = useState<Lang>('EN')
  useEffect(() => { document.documentElement.lang = lang.toLowerCase() }, [lang])
  useEffect(() => {
    const labels: Record<string, string> = {
      '/': t[lang].about, '/about': t[lang].about, '/gallery': t[lang].gallery,
      '/games': t[lang].games, '/register': t[lang].register,
      '/details': t[lang].details, '/contact': t[lang].contact,
      '/privacy': t[lang].privacyPolicy, '/cookies': t[lang].cookiesPolicy,
    }
    document.title = `MIDI LAN Party | ${labels[pathname] ?? t[lang].notFound}`
  }, [pathname, lang])
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  const isAbout = pathname === '/' || pathname === '/about'
  return <LangContext.Provider value={lang}>
    <div className={isAbout ? 'app-shell app-shell--home flex min-h-dvh flex-col' : 'app-shell flex min-h-dvh flex-col'}>
      <a href="#main-content" className="skip-link">{lang === 'EN' ? 'Skip to content' : 'Pereiti prie turinio'}</a>
      <SiteHeader lang={lang} setLang={setLang} />
      <main id="main-content" className="flex-1" tabIndex={-1}><Outlet /></main>
      <SiteFooter />
    </div>
  </LangContext.Provider>
}
