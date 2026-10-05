import React from 'react';
import { Link } from 'react-router-dom';

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 p-8 sm:p-12 lg:p-16 text-white shadow-xl">
          {/* Subtle watermark hands background motif */}
          <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none translate-x-10 translate-y-10">
            <svg className="w-96 h-96 fill-white" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-teal-100 text-xs sm:text-sm font-bold tracking-wider uppercase">
              <span className="w-8 h-[2px] bg-teal-200"></span>
              <span>BECOME A VOLUNTEER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Be a Part of Our Mission
            </h2>

            <p className="text-teal-50 text-base sm:text-lg max-w-xl font-normal">
              Join us as a volunteer, donor, or partner to build a better future together.
            </p>

            <div className="pt-2">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center bg-white hover:bg-teal-50 text-teal-700 font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Donate Now
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
