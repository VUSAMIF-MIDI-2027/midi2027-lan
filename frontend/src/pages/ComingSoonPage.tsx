import { Link, useLocation } from 'react-router'
import { useLang } from '../i18n/LanguageContext'

export default function ComingSoonPage() {
  const { pathname } = useLocation()
  const tr = useLang()
  const key = pathname.slice(1)
  const titles: Record<string, string> = {
    gallery: tr.gallery, games: tr.games, register: tr.register, details: tr.details,
    contact: tr.contact, privacy: tr.privacyPolicy, cookies: tr.cookiesPolicy,
  }
  return (
    <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-start justify-center gap-6 px-6 py-24">
      <p className="text-sm font-bold uppercase tracking-[.2em] text-accent">MIDI LAN Party</p>
      <h1 className="text-5xl font-extrabold sm:text-7xl">{titles[key] ?? tr.notFound}</h1>
      <p className="text-muted">{titles[key] ? tr.comingSoon : tr.notFoundBody}</p>
      <Link to="/" className="home-button home-button--solid">{tr.backToAbout}</Link>
      {key === 'register' && <a href="https://discord.gg/hXGMH8nXjH" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">{tr.discordCta}</a>}
    </section>
  )
}
