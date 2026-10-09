import React, { useEffect } from 'react';
import { HeroSection } from '../../sections/home/HeroSection';
import { AboutSection } from '../../sections/home/AboutSection';
import { CampaignsSection } from '../../sections/home/CampaignsSection';
import { GallerySection } from '../../sections/home/GallerySection';
import { DonationSection } from '../../sections/home/DonationSection';
import { CtaBanner } from '../../sections/home/CtaBanner';
import { useLanguage } from '../../context/LanguageContext';
import { useGetCmsPageQuery } from '../../services/publicApi';
import type { CmsSEOSectionContent } from '../../types';

export const Home: React.FC = () => {
  const { language } = useLanguage();
  
  // RTK Query hook with automatic deduplication & language-scoped caching
  const { data: cmsSections = {} } = useGetCmsPageQuery({ slug: 'home', language });

  useEffect(() => {
    if (cmsSections.seo) {
      const seoData = cmsSections.seo as CmsSEOSectionContent;
      if (seoData.metaTitle) {
        document.title = seoData.metaTitle;
      }
      if (seoData.metaDescription) {
        let metaDesc = document.querySelector("meta[name='description']");
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.setAttribute('name', 'description');
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', seoData.metaDescription);
      }
    }
  }, [cmsSections.seo]);

  return (
    <main className="min-h-screen">
      <HeroSection data={cmsSections.hero} />
      <AboutSection data={cmsSections.about} />
      <CampaignsSection data={cmsSections.initiatives} />
      <GallerySection data={cmsSections.gallery} />
      <DonationSection data={cmsSections.donation_settings} />
      <CtaBanner data={cmsSections.mission_cta} />
    </main>
  );
};

export default Home;
