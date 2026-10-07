import React, { useEffect, useState } from 'react';
import { HeroSection } from '../../sections/home/HeroSection';
import { AboutSection } from '../../sections/home/AboutSection';
import { CampaignsSection } from '../../sections/home/CampaignsSection';
import { GallerySection } from '../../sections/home/GallerySection';
import { DonationSection } from '../../sections/home/DonationSection';
import { CtaBanner } from '../../sections/home/CtaBanner';
import { api } from '../../services/api';
import type {
  CmsHeroSectionContent,
  CmsAboutSectionContent,
  CmsInitiativesSectionContent,
  CmsGallerySectionContent,
  CmsDonationSectionContent,
  CmsMissionCTASectionContent,
  CmsSEOSectionContent,
} from '../../types';

export const Home: React.FC = () => {
  const [cmsSections, setCmsSections] = useState<{
    hero?: CmsHeroSectionContent;
    about?: CmsAboutSectionContent;
    initiatives?: CmsInitiativesSectionContent;
    gallery?: CmsGallerySectionContent;
    donation_settings?: CmsDonationSectionContent;
    mission_cta?: CmsMissionCTASectionContent;
    seo?: CmsSEOSectionContent;
  }>({});

  useEffect(() => {
    let isMounted = true;
    const fetchCmsData = async () => {
      try {
        const pageData = await api.getCmsPage('home');
        if (pageData && pageData.sections && isMounted) {
          const parsedSections: Record<string, any> = {};
          pageData.sections.forEach((sec) => {
            const content = typeof sec.content_json === 'string'
              ? JSON.parse(sec.content_json)
              : sec.content_json;
            if (content) {
              parsedSections[sec.section_key] = content;
            }
          });
          setCmsSections(parsedSections);

          // Update SEO metadata if provided
          if (parsedSections.seo) {
            const seoData = parsedSections.seo as CmsSEOSectionContent;
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
        }
      } catch (err) {
        console.error('Failed to load CMS data on public homepage:', err);
      }
    };

    fetchCmsData();
    return () => {
      isMounted = false;
    };
  }, []);
  console.log(cmsSections)
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
