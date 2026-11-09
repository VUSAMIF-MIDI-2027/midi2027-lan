import { useLang } from '../i18n/LanguageContext'
import VenueAndSchedule from '../components/details/VenueAndSchedule'
import OrganiserTeam from '../components/details/OrganiserTeam'

export default function DetailsPage() {
  const tr = useLang()

  return (
    <section className="details-page pt-8 pb-24 md:pt-16">
      <h1 className="sr-only">{tr.detailsHeading}</h1>
      <VenueAndSchedule />
      <OrganiserTeam />
    </section>
  )
}
