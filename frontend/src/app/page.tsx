import HeroBanner from '@/components/home/HeroBanner'
import TrainingPaths from '@/components/home/TrainingPaths'
import Accomplishments from '@/components/home/Accomplishments'
import OffersSection from '@/components/home/OffersSection'
import Testimonials from '@/components/home/Testimonials'
import AboutUs from '@/components/home/AboutUs'
import LegacyBanner from '@/components/home/LegacyBanner'
import { fetchPaths, fetchTestimonials } from '@/lib/api'

export const revalidate = 60

export default async function HomePage() {
  const [paths, testimonials] = await Promise.all([
    fetchPaths(),
    fetchTestimonials(),
  ])

  return (
    <>
      <HeroBanner paths={paths} />
      <TrainingPaths paths={paths} />
      <Accomplishments />
      <OffersSection />
      <Testimonials testimonials={testimonials} />
      <AboutUs />
      <LegacyBanner />
    </>
  )
}
