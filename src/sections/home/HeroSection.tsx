import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Droplet, Users, GraduationCap } from 'lucide-react';
import heroBg from '../../assets/hero_bg.jpg';
import { Button } from '../../components/ui';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[620px] lg:min-h-[680px] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image with Dark Vignette Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90 backdrop-blur-[1px]" />

      {/* Content Container */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10 space-y-8">
        
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase">
          <span className="w-5 h-[2px] bg-teal-400"></span>
          <span>HELP-A-MISSION WELFARE SOCIETY JIND (REGD. NO. 01667)</span>
          <span className="w-5 h-[2px] bg-teal-400"></span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white">
          Empowering Lives, <br />
          <span className="text-teal-400">Restoring Hope & Dignity</span>
        </h1>

        {/* Subtitle Description */}
        <p className="text-base sm:text-xl text-gray-200 max-w-3xl mx-auto font-normal leading-relaxed">
          Dedicated to emergency medical care, voluntary blood donation camps, child education sponsorship, and community relief across Jind.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/donate" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 py-3.5 shadow-xl">
              <Heart className="w-5 h-5 mr-2 fill-current" />
              <span>Donate Now</span>
            </Button>
          </Link>
          <Link to="/about" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3.5 bg-white/10 text-white border-white/30 hover:bg-white hover:text-slate-900">
              <span>Our Mission</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Impact Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/15 max-w-3xl mx-auto">
          <div className="flex items-center justify-center sm:justify-start gap-3 text-white">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
              <Droplet className="w-5 h-5 fill-current" />
            </div>
            <div className="text-left">
              <p className="text-lg font-extrabold">1,000+ Units</p>
              <p className="text-xs text-gray-300">Blood Collected</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 text-white">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-lg font-extrabold">500+ Families</p>
              <p className="text-xs text-gray-300">Direct Financial Aid</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 text-white">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-lg font-extrabold">300+ Kits</p>
              <p className="text-xs text-gray-300">Child Education</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
