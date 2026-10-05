import React from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../../assets/hero_bg.jpg';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark Vignette Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />

      {/* Content Container */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10 space-y-6">
        
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium tracking-wider uppercase">
          <span className="w-6 h-[2px] bg-teal-400"></span>
          <span>FOR DEDICATED NGO WORK</span>
          <span className="w-6 h-[2px] bg-teal-400"></span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white">
          Help-A Mission <br className="sm:hidden" />
          <span className="text-teal-400">Welfare Society</span>
        </h1>

        {/* Subtitle Description */}
        <p className="text-base sm:text-xl text-gray-200 max-w-3xl mx-auto font-normal leading-relaxed">
          Dedicated to bringing hope, healthcare, and education to underprivileged families across Jind.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/donate"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white px-8 py-3.5 rounded-full font-bold text-base shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Donate Now
          </Link>
          <Link
            to="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-gray-100 text-gray-900 px-8 py-3.5 rounded-full font-bold text-base shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            About Us
          </Link>
        </div>

      </div>
    </section>
  );
};
