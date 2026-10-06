import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroBg from '../../assets/hero_bg.png';
import { Button } from '../../components/ui';

export const HeroSection: React.FC = () => {
  return (
    <section className="w-full py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Card Container with 30px Border Radius & Dark Vignette */}
        <div className="relative w-full min-h-[540px] sm:min-h-[620px] lg:min-h-[680px] flex items-center justify-center overflow-hidden rounded-[30px] shadow-xl">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBg})` }}
          />

          {/* 50% Black Vignette Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content Container */}
          <div className="relative max-w-4xl mx-auto px-6 py-16 text-center z-10 space-y-6">

            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 text-white/90 text-xs sm:text-sm font-semibold tracking-widest uppercase">
              <span className="w-5 h-[2px] bg-white inline-block"></span>
              <span>TOGETHER FOR A BETTER TOMORROW</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white">
              Help-A Mission <br />
              <span className="text-[#08A49C]">Welfare Society</span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto font-normal leading-relaxed">
              Building a kinder, stronger and more compassionate world through service, awareness and support.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/donate" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-8 py-3.5 text-base font-semibold shadow-lg shadow-[#08A49C]/30"
                  rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}
                >
                  Donate Now
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-slate-100 text-slate-900 px-8 py-3.5 rounded-full font-semibold text-base shadow-md transition-all duration-200 active:scale-95 cursor-pointer">
                  Learn More
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
