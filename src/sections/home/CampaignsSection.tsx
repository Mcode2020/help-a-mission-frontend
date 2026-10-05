import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import campaignBlood from '../../assets/campaign_blood.jpg';
import campaignFinancial from '../../assets/campaign_financial.jpg';
import campaignEducation from '../../assets/campaign_education.jpg';
import campaignCommunity from '../../assets/campaign_community.jpg';

export const CampaignsSection: React.FC = () => {
  const campaigns = [
    {
      image: campaignBlood,
      title: 'Blood Donation Camps',
      description: 'Organizing blood donation drives to save lives and support local medical health centers.',
      link: '/campaigns',
    },
    {
      image: campaignFinancial,
      title: 'Financial Assistance Program',
      description: 'Providing direct financial aid to needy individuals and families facing medical or social hardship.',
      link: '/campaigns',
    },
    {
      image: campaignEducation,
      title: 'Educational Support Drive',
      description: 'Empowering children with books, tuition support, and essential school kits for a brighter future.',
      link: '/campaigns',
    },
    {
      image: campaignCommunity,
      title: 'Community Development',
      description: 'Distributing essential goods, winter blankets, and food rations during relief campaigns.',
      link: '/campaigns',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-teal-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="space-y-3 mb-12 text-left">
          <div className="inline-flex items-center gap-2 text-teal-600 text-xs sm:text-sm font-bold tracking-wider uppercase">
            <span className="w-8 h-[2px] bg-teal-600"></span>
            <span>OUR WORK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Creating Impact Through Meaningful Initiatives
          </h2>

          <p className="text-gray-600 text-base sm:text-lg max-w-3xl">
            We focus our efforts on creating lasting change in the community through dedicated campaigns and direct relief drives.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {campaigns.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
