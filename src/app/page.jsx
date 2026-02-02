'use client'

import LandingHeader from '@/components/landing/LandingHeader'
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import WhyChooseSection from '@/components/landing/WhyChooseSection'
import StatsSection from '@/components/landing/StatsSection'
import SimpleTradeSection from '@/components/landing/SimpleTradeSection'
import InvestmentSection from '@/components/landing/InvestmentSection'
import HowToBuySection from '@/components/landing/HowToBuySection'
import AirdropSection from '@/components/landing/AirdropSection'
import SupportCardsSection from '@/components/landing/SupportCardsSection'
import CTASection from '@/components/landing/CTASection'
import SEOSection from '@/components/landing/SEOSection'
import LandingFooter from '@/components/landing/LandingFooter'
import ClickSpark from '@/components/ui/ClickSpark'

export default function LandingPage() {
  return (
    <ClickSpark sparkColor="#9333EA" sparkSize={8} sparkRadius={20} sparkCount={12} duration={500}>
      <div dir="rtl" className="rtl min-h-screen bg-slate-900">
        <LandingHeader />
        <main>
          <HeroSection />
          <FeaturesSection />
          <WhyChooseSection />
          <StatsSection />
          <SimpleTradeSection />
          <InvestmentSection />
          <HowToBuySection />
          <AirdropSection />
          <SupportCardsSection />
          <CTASection />
          <SEOSection />
        </main>
        <LandingFooter />
      </div>
    </ClickSpark>
  )
}
