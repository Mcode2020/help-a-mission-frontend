import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../../components/ui';

import campaignBlood from '../../assets/campaign_blood.png';
import campaignFinancial from '../../assets/campaign_financial.png';
import campaignEducation from '../../assets/campaign_education.png';
import campaignCommunity from '../../assets/campaign_community.png';

export const CampaignsSection: React.FC = () => {
  const campaigns = [
    {
      image: campaignBlood,
      title: 'Blood Donation Camps',
      description: 'Organising blood donation camps to help save lives and support hospitals.',
      category: 'Health',
      link: '/campaigns',
    },
    {
      image: campaignFinancial,
      title: 'Health Awareness Programs',
      description: 'Conducting awareness sessions on health, hygiene and wellness.',
      category: 'Wellness',
      link: '/campaigns',
    },
    {
      image: campaignEducation,
      title: 'Support for Needy Individuals',
      description: 'Helping individuals and families in need with essential support and guidance.',
      category: 'Support',
      link: '/campaigns',
    },
    {
      image: campaignCommunity,
      title: 'Community Development',
      description: 'Working towards stronger and healthier communities through social welfare.',
      category: 'Community',
      link: '/campaigns',
    },
  ];

  return (
    <section className="relative py-[60px] md:py-[100px] bg-[#08A49C]/5 overflow-hidden">
      {/* Decorative Leaf Background Illustration (Top Right - Matching Figma attachment) */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-[80px]">
        {/* Section Header */}
        <div className="mb-[48px]">
          {/* Category Pill with Horizontal Line */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-[2.5px] bg-[#08A49C] rounded-full"></span>
            <span className="text-[#08A49C] text-xs sm:text-sm font-bold uppercase tracking-wider">
              OUR WORK
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight max-w-2xl">
            Creating Impact Through Meaningful Initiatives
          </h2>

          <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            We focus on various welfare activities to support communities and build a healthier society.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {campaigns.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[16px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-slate-100"
            >
              {/* Image Container */}
              <div className="relative h-52 sm:h-56 md:h-60 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="teal">{item.category}</Badge>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#08A49C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3 font-normal">
                    {item.description}
                  </p>
                </div>

                <div>
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#08A49C] hover:text-[#068079] group/link transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

