import React from 'react';
import { Link } from 'react-router-dom';

import campaignBlood from '../../assets/campaign_blood.jpg';
import campaignFinancial from '../../assets/campaign_financial.jpg';
import campaignEducation from '../../assets/campaign_education.jpg';
import campaignCommunity from '../../assets/campaign_community.jpg';
import heroBg from '../../assets/hero_bg.jpg';
import aboutImg from '../../assets/about_img.jpg';

export const GallerySection: React.FC = () => {
  // 9 Gallery photos grid matching Figma layout
  const galleryPhotos = [
    { id: 1, img: heroBg, title: 'Team Meeting & Event Setup' },
    { id: 2, img: campaignFinancial, title: 'Financial Aid Check Distribution' },
    { id: 3, img: campaignCommunity, title: 'Community Felicitation & Support' },
    { id: 4, img: campaignEducation, title: 'Education Kit Drive' },
    { id: 5, img: campaignBlood, title: 'Blood Donation Camp Organizers' },
    { id: 6, img: aboutImg, title: 'Social Welfare & Outreach' },
    { id: 7, img: heroBg, title: 'Volunteer Orientation Drive' },
    { id: 8, img: campaignFinancial, title: 'Medical Aid Contribution' },
    { id: 9, img: campaignCommunity, title: 'Community Distribution Ceremony' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Top-Right Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-teal-600 text-xs sm:text-sm font-bold tracking-wider uppercase">
              <span className="w-8 h-[2px] bg-teal-600"></span>
              <span>OUR GALLERY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Moments That Matter
            </h2>

            <p className="text-gray-600 text-base sm:text-lg">
              A glimpse of our recent community work, relief drives, and celebrations.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/campaigns"
              className="inline-flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm px-6 py-3 rounded-full shadow-md shadow-teal-500/20 hover:shadow-lg transition-all"
            >
              View All Photos
            </Link>
          </div>
        </div>

        {/* 3x3 Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryPhotos.map((photo) => (
            <div
              key={photo.id}
              className="relative h-64 sm:h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 group transition-all duration-300"
            >
              <img
                src={photo.img}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Subtle hover overlay with title */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-sm font-bold tracking-wide">
                  {photo.title}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
