import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import FeaturedCourses from '@/components/sections/FeaturedCourses';
import PremiumBenefits from '@/components/sections/PremiumBenefits';
import Testimonials from '@/components/sections/Testimonials';
import YouTubeSection from '@/components/sections/YouTubeSection';
import RoadmapSection from '@/components/sections/RoadmapSection';
import FAQSection from '@/components/sections/FAQSection';
import NewsletterSection from '@/components/sections/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedCourses />
        <PremiumBenefits />
        <Testimonials />
        <YouTubeSection />
        <RoadmapSection />
        <FAQSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
