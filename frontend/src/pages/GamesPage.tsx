import { useLang } from '../i18n/LanguageContext'

export default function GamesPage() {
  const tr = useLang()

  return (
    <section className="games-page">
      <h1>{tr.gamesComingSoon}</h1>
    </section>
  )
}
