import HeroSection from '../components/about/HeroSection'
import TournamentsSection from '../components/about/TournamentsSection'
import PartnersSection from '../components/about/PartnersSection'
import CommunitySection from '../components/about/CommunitySection'

export default function AboutPage() {
  return <div className="home-page">
    <HeroSection />
    <TournamentsSection />
    <PartnersSection />
    <CommunitySection />
  </div>
}
