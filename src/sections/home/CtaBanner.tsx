import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ctaBannerImg from '../../assets/ctaBanner.png';
import type { CmsMissionCTASectionContent } from '../../types';

interface CtaBannerProps {
  data?: CmsMissionCTASectionContent;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ data }) => {
  const eyebrow = data?.eyebrow;
  const heading = data?.heading;
  const subheading = data?.subheading;
  const ctaLabel = data?.ctaLabel;
  const ctaUrl = data?.ctaUrl || '/donate';

  const bgImg = data?.bannerMediaUrl || ctaBannerImg;

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl min-h-[320px] sm:min-h-[370px] flex items-center">
          {/* Background Image */}
          <img
            src={bgImg}
            alt={heading || 'Mission Banner'}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Content Overlay Container */}
          <div className="relative z-10 p-6 sm:p-10 md:p-14 lg:p-16 max-w-2xl text-white">
            {/* Top Eyebrow */}
            {eyebrow && (
              <div className="flex items-center gap-2.5 text-white/95 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
                <span className="w-7 h-[2px] bg-white rounded-full inline-block"></span>
                <span>{eyebrow}</span>
              </div>
            )}

            {/* Main Heading */}
            {heading && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight tracking-tight mb-3 sm:mb-4">
                {heading}
              </h2>
            )}

            {/* Description Paragraph */}
            {subheading && (
              <p className="text-white/90 text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-6 sm:mb-8 max-w-xl">
                {subheading}
              </p>
            )}

            {/* Call to Action Button */}
            {ctaLabel && (
              <div>
                <Link
                  to={ctaUrl}
                  className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-[#00A79D] hover:text-[#008980] rounded-full font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 group transform hover:-translate-y-0.5"
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
