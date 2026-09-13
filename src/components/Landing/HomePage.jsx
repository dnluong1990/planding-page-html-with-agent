import React from 'react';
import HeroSection from './HeroSection.jsx';
import FeatureSection from './FeatureSection.jsx';
import HowItWorks from './HowItWorks.jsx';
import Footer from './Footer.jsx';

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
