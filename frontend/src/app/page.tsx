import HeroBanner from '@/components/home/HeroBanner'
import TrainingPaths from '@/components/home/TrainingPaths'
import Accomplishments from '@/components/home/Accomplishments'
import Testimonials from '@/components/home/Testimonials'
import AboutUs from '@/components/home/AboutUs'
import { fetchPaths, fetchTestimonials } from '@/lib/api'
import { CampaignPopup } from '@/components/home/CampaignPopup'

// New Components
import VisionMission from '@/components/home/VisionMission'
import WhoWeServe from '@/components/home/WhoWeServe'
import BespokeLearning from '@/components/home/BespokeLearning'
import ErasmusFriendly from '@/components/home/ErasmusFriendly'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import CallToAction from '@/components/home/CallToAction'
import LegacyBanner from '@/components/home/LegacyBanner'

export const revalidate = 60

export default async function HomePage() {
  const [paths, testimonials] = await Promise.all([
    fetchPaths(),
    fetchTestimonials(),
  ])

  return (
    <>
      <HeroBanner paths={paths} />
      <VisionMission />
      <WhoWeServe />
      <TrainingPaths paths={paths} />
      <LegacyBanner />
      <Accomplishments />
      <BespokeLearning />
      <ErasmusFriendly />
      <WhyChooseUs />
      <Testimonials testimonials={testimonials} />
      <AboutUs />
      <CallToAction />
      <CampaignPopup />
    </>
  )
}
