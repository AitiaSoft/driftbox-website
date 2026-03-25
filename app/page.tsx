import Hero from '@/components/Hero'
import ProblemStats from '@/components/ProblemStats'
import WhoItsFor from '@/components/WhoItsFor'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import SocialProof from '@/components/SocialProof'
import Pricing from '@/components/Pricing'
import BlogPreview from '@/components/BlogPreview'
import FinalCTA from '@/components/FinalCTA'
import SectionTracker from '@/components/SectionTracker'

export default function Home() {
  return (
    <>
      <SectionTracker sectionName="hero">
        <Hero />
      </SectionTracker>
      <SectionTracker sectionName="problem-stats">
        <ProblemStats />
      </SectionTracker>
      <SectionTracker sectionName="who-its-for">
        <WhoItsFor />
      </SectionTracker>
      <SectionTracker sectionName="features">
        <Features />
      </SectionTracker>
      <SectionTracker sectionName="how-it-works">
        <HowItWorks />
      </SectionTracker>
      <SectionTracker sectionName="social-proof">
        <SocialProof />
      </SectionTracker>
      <SectionTracker sectionName="pricing">
        <Pricing />
      </SectionTracker>
      <SectionTracker sectionName="blog-preview">
        <BlogPreview />
      </SectionTracker>
      <SectionTracker sectionName="final-cta">
        <FinalCTA />
      </SectionTracker>
    </>
  )
}
