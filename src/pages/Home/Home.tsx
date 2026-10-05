import React from 'react';
import { HeroSection } from '../../sections/home/HeroSection';
import { AboutSection } from '../../sections/home/AboutSection';
import { CampaignsSection } from '../../sections/home/CampaignsSection';
import { GallerySection } from '../../sections/home/GallerySection';
import { DonationSection } from '../../sections/home/DonationSection';
import { CtaBanner } from '../../sections/home/CtaBanner';

export const Home: React.FC = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <CampaignsSection />
      <GallerySection />
      <DonationSection />
      <CtaBanner />
    </main>
  );
};

export default Home;
