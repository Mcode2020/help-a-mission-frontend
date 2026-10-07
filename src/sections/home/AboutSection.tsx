import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplet, Heart, Users, Sprout, ShieldCheck, Activity, Award, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui';
import type { CmsAboutSectionContent } from '../../types';

interface AboutSectionProps {
  data?: CmsAboutSectionContent;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  const eyebrow = data?.eyebrow;
  const heading = data?.heading;
  const description = data?.description;
  const experienceBadge = data?.experienceBadge;
  const mainImage = data?.mediaUrl;

  const renderImpactIcon = (iconName?: string, mediaUrl?: string) => {
    if (mediaUrl) {
      return (
        <img
          src={mediaUrl}
          alt={iconName || 'Impact icon'}
          className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl shrink-0"
        />
      );
    }
    const iconClass = "w-7 h-7 sm:w-8 sm:h-8 text-[#08A49C]";
    switch (iconName) {
      case 'Droplet':
        return <Droplet className={iconClass} />;
      case 'Heart':
        return <Heart className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'Sprout':
        return <Sprout className={iconClass} />;
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} />;
      case 'Activity':
        return <Activity className={iconClass} />;
      case 'Award':
        return <Award className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid: Image + Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">

          {/* Left Visual Container */}
          {mainImage && (
            <div className="lg:col-span-6 relative flex items-center justify-center p-2 sm:p-4">
              {/* Background Decorative Organic Blob Shapes */}
              <div className="absolute top-0 right-4 w-72 h-72 bg-[#DFF5F3] rounded-[60px] transform rotate-12 -z-10" />
              <div className="absolute bottom-2 left-2 w-64 h-64 bg-[#EAF9F8] rounded-[50px] transform -rotate-6 -z-10" />

              {/* Left Decorative Dot Grid Matrix */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden sm:grid grid-cols-4 gap-2.5 z-0">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#08A49C]/35" />
                ))}
              </div>

              {/* Main Visual Image Card Wrapper */}
              <div className="relative z-10 w-full max-w-lg">
                {/* Rounded 30px Image Container */}
                <div className="rounded-[30px] overflow-hidden shadow-2xl border border-gray-100/80">
                  <img
                    src={mainImage}
                    alt={heading || 'About Us'}
                    className="w-full h-[360px] sm:h-[420px] object-cover"
                  />
                </div>

                {/* Bottom Right Overlay Badge */}
                {experienceBadge && (
                  <div
                    className="absolute bottom-4 -right-4 sm:bottom-6 sm:-right-8 min-w-[220px] max-w-[270px] min-h-[72px] text-white p-4 rounded-[10px] shadow-xl flex items-center gap-3.5 border border-white/30 backdrop-blur-md z-20"
                    style={{ backgroundColor: 'rgba(8, 164, 156, 0.67)' }}
                  >
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                        {experienceBadge}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Right Text Content */}
          <div className={`${mainImage ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-6`}>
            {eyebrow && (
              <div className="inline-flex items-center gap-2 text-[#08A49C] text-xs sm:text-sm font-bold tracking-wider uppercase">
                <span className="w-8 h-[2px] bg-[#08A49C]"></span>
                <span>{eyebrow}</span>
              </div>
            )}

            {heading && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {heading}
              </h2>
            )}

            {description && (
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {description}
              </p>
            )}

            {data?.cta?.label && (
              <div className="pt-2">
                <Link to={data.cta.url || "/about"}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="rounded-full px-7 py-3 text-base font-semibold shadow-md shadow-[#08A49C]/25"
                    rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}
                  >
                    {data.cta.label}
                  </Button>
                </Link>
              </div>
            )}
          </div>

        </div>

        {/* Feature Cards Row */}
        {data?.impactCards && data.impactCards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {data.impactCards.map((card, idx) => (
              <div
                key={card.id || idx}
                className="bg-[#F2F9F9] rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-4 border border-[#E1F2F1] transition-shadow hover:shadow-md"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#08A49C]/10 flex items-center justify-center shrink-0">
                  {renderImpactIcon(card.iconName, card.mediaUrl)}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug max-w-[180px]">
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default AboutSection;
