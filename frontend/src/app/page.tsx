import HeroBanner from '@/components/home/HeroBanner'
import WhoWeAre from '@/components/home/WhoWeAre'
import WhatWeDo from '@/components/home/WhatWeDo'
import Testimonials from '@/components/home/Testimonials'
import AboutUs from '@/components/home/AboutUs'
import { fetchPaths, fetchTestimonials } from '@/lib/api'
import { CampaignPopup } from '@/components/home/CampaignPopup'

// New Components
import VisionMission from '@/components/home/VisionMission'
import WhoWeServe from '@/components/home/WhoWeServe'
import OurApproach from '@/components/home/OurApproach'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import ErasmusFriendly from '@/components/home/ErasmusFriendly'
import CallToAction from '@/components/home/CallToAction'

export const revalidate = 60

export default async function HomePage() {
  const [paths, testimonials] = await Promise.all([
    fetchPaths(),
    fetchTestimonials(),
  ])

  return (
    <>
      <HeroBanner paths={paths} />
      <WhoWeAre />
      <WhatWeDo />
      <VisionMission />
      <WhoWeServe />
      <OurApproach />
      <WhyChooseUs />
      <ErasmusFriendly />
      <Testimonials testimonials={testimonials} />
      <AboutUs />
      <CallToAction />
      <CampaignPopup />
    </>
  )
}
