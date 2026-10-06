import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import aboutImg from '../../assets/about_img.png';
import communityIcon from '../../assets/fi_2956777.png';
import dropletIcon from '../../assets/Droplet.png';
import heartPulseIcon from '../../assets/HeartPulse.png';
import usersIcon from '../../assets/Users.png';
import sproutIcon from '../../assets/Sprout.png';
import { Button } from '../../components/ui';

export const AboutSection: React.FC = () => {
  const featureCards = [
    {
      icon: dropletIcon,
      title: 'Blood Donation camps',
      alt: 'Blood Donation Camps Icon',
    },
    {
      icon: heartPulseIcon,
      title: 'Health Awareness Programs',
      alt: 'Health Awareness Programs Icon',
    },
    {
      icon: usersIcon,
      title: 'Support for Needy Individuals',
      alt: 'Support for Needy Individuals Icon',
    },
    {
      icon: sproutIcon,
      title: 'Community Development',
      alt: 'Community Development Icon',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid: Image + Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">

          {/* Left Visual Container */}
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
                  src={aboutImg}
                  alt="A Non-Profit Organisation Dedicated to Social Welfare"
                  className="w-full h-[360px] sm:h-[420px] object-cover"
                />
              </div>

              {/* Bottom Right Overlay Badge (Figma: 253px x 72px, radius 10px, #08A49C at 67% opacity) */}
              <div
                className="absolute bottom-4 -right-4 sm:bottom-6 sm:-right-8 w-[253px] h-[72px] text-white px-4 rounded-[10px] shadow-xl flex items-center gap-3.5 border border-white/30 backdrop-blur-md z-20"
                style={{ backgroundColor: 'rgba(8, 164, 156, 0.67)' }}
              >
                {/* PNG Community Icon */}
                <img
                  src={communityIcon}
                  alt="Serving Communities Icon"
                  className="w-8 h-8 object-contain shrink-0 brightness-0 invert"
                />
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                    Serving Communities
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                    with Humanity
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#08A49C] text-xs sm:text-sm font-bold tracking-wider uppercase">
              <span className="w-8 h-[2px] bg-[#08A49C]"></span>
              <span>ABOUT US</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              A Non-Profit Organisation Dedicated to Social Welfare
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Help-A Mission Welfare Society is committed to supporting individuals and communities through health awareness, social service, education and humanitarian aid. Our mission is to create a healthier, safer and more compassionate society for everyone.
            </p>

            <div className="pt-2">
              <Link to="/about">
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-full px-7 py-3 text-base font-semibold shadow-md shadow-[#08A49C]/25"
                  rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}
                >
                  Know more
                </Button>
              </Link>
            </div>
          </div>

        </div>

        {/* 4 Feature Cards Row (Figma: 1279px x 180px, bg-[#F2F9F9]) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featureCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#F2F9F9] rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-4 border border-[#E1F2F1] transition-shadow hover:shadow-md"
            >
              <img
                src={card.icon}
                alt={card.alt}
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0"
              />
              <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug max-w-[180px]">
                {card.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
