import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import HowItWorks from './HowItWorks';
import Footer from './Footer';

export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}
