import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, HeartPulse, Users, Sprout } from 'lucide-react';
import aboutImg from '../../assets/about_img.jpg';

export const AboutSection: React.FC = () => {
  const featureCards = [
    {
      icon: <Droplet className="w-6 h-6 text-red-500" />,
      title: 'Blood Donation Camps',
      bgColor: 'bg-red-50',
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-blue-500" />,
      title: 'Health Awareness Programs',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <Users className="w-6 h-6 text-amber-500" />,
      title: 'Financial Help to Needy Individuals',
      bgColor: 'bg-amber-50',
    },
    {
      icon: <Sprout className="w-6 h-6 text-emerald-500" />,
      title: 'Child Education Support',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Image + Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Visual Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
              <img
                src={aboutImg}
                alt="A Non-Profit Organisation Dedicated to Social Welfare"
                className="w-full h-[380px] sm:h-[420px] object-cover group-hover:scale-102 transition-transform duration-500"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-6 right-6 bg-teal-500/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-lg border border-teal-400/40 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Serve & Support</p>
                  <p className="text-xs text-teal-100 font-medium">Our Mission</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-teal-600 text-xs sm:text-sm font-bold tracking-wider uppercase">
              <span className="w-8 h-[2px] bg-teal-600"></span>
              <span>ABOUT US</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              A Non-Profit Organisation Dedicated to Social Welfare
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Help-A-Mission Welfare Society JIND (Regd. No. 01667) is dedicated to the welfare and upliftment of society, focusing on healthcare, education, and social aid. Our mission is to create a compassionate, self-reliant, and empowered society for everyone.
            </p>

            <div>
              <Link
                to="/about"
                className="inline-flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm px-7 py-3 rounded-full shadow-md shadow-teal-500/20 hover:shadow-lg transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>

        </div>

        {/* 4 Feature Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card, idx) => (
            <div
              key={idx}
              className={`${card.bgColor} rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 leading-snug">
                {card.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
