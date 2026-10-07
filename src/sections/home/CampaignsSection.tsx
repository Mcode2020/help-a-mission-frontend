import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { CmsInitiativesSectionContent } from '../../types';

interface CampaignsSectionProps {
  data?: CmsInitiativesSectionContent;
}

export const CampaignsSection: React.FC<CampaignsSectionProps> = ({ data }) => {
  const eyebrow = data?.eyebrow;
  const heading = data?.heading;
  const description = data?.description;
  const initiatives = data?.initiatives || [];

  return (
    <section className="relative py-[60px] md:py-[100px] bg-[#08A49C]/5 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-[80px]">
        {/* Section Header */}
        <div className="mb-[48px]">
          {eyebrow && (
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-[2.5px] bg-[#08A49C] rounded-full"></span>
              <span className="text-[#08A49C] text-xs sm:text-sm font-bold uppercase tracking-wider">
                {eyebrow}
              </span>
            </div>
          )}

          {heading && (
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight max-w-2xl">
              {heading}
            </h2>
          )}

          {description && (
            <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        {initiatives.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {initiatives.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-white rounded-[16px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-slate-100"
              >
                {/* Image Container */}
                {item.mediaUrl && (
                  <div className="relative h-52 sm:h-56 md:h-60 overflow-hidden bg-slate-100">
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#08A49C] transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3 font-normal">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <Link
                      to={item.linkUrl || '/campaigns'}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#08A49C] hover:text-[#068079] group/link transition-colors"
                    >
                      <span>{item.category || 'Learn More'}</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CampaignsSection;
