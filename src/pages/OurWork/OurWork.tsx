import React, { useState } from 'react';
import {
  Heart,
  BookOpen,
  Utensils,
  Quote,
  Download,
  FileCheck,
  Building
} from 'lucide-react';
import { IMPACT_STORIES } from '../../data/ngoData';
import galleryImg1 from '../../assets/campaign_education.jpg';
import galleryImg2 from '../../assets/campaign_blood.jpg';
import galleryImg3 from '../../assets/campaign_community.jpg';
import galleryImg4 from '../../assets/campaign_financial.jpg';

export const OurWork: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  const categories = ['All', 'Education', 'Healthcare', 'Financial Support'];

  const filteredStories = selectedCategory === 'All'
    ? IMPACT_STORIES
    : IMPACT_STORIES.filter((story) => story.category === selectedCategory);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      {/* Top Banner Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full border border-teal-500/30">
              Measurable Grassroots Results
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight leading-tight">
              Our Work & Impact
            </h1>
            <p className="mt-4 text-slate-300 text-base leading-relaxed">
              Every initiative we undertake is rooted in accountability, community partnership, and long-term sustainable transformation across Jind district and neighboring regions.
            </p>
          </div>
        </div>
      </section>

      {/* Live Impact Statistics Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center transform hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-3">
              <Utensils className="w-7 h-7" />
            </div>
            <p className="text-3xl sm:text-4xl font-black text-gray-900">50,000+</p>
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mt-1">Meals Served</p>
            <p className="text-[11px] text-gray-500 mt-1">Free daily food distribution</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center transform hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-7 h-7" />
            </div>
            <p className="text-3xl sm:text-4xl font-black text-gray-900">12,000+</p>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mt-1">Children Educated</p>
            <p className="text-[11px] text-gray-500 mt-1">Shiksha Study Centers</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center transform hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Heart className="w-7 h-7" />
            </div>
            <p className="text-3xl sm:text-4xl font-black text-gray-900">8,500+</p>
            <p className="text-xs font-bold uppercase tracking-wider text-rose-700 mt-1">Patients Treated</p>
            <p className="text-[11px] text-gray-500 mt-1">Health camps & blood drives</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center transform hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <Building className="w-7 h-7" />
            </div>
            <p className="text-3xl sm:text-4xl font-black text-gray-900">45+</p>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mt-1">Villages Adopted</p>
            <p className="text-[11px] text-gray-500 mt-1">Comprehensive outreach</p>
          </div>
        </div>
      </section>

      {/* Field Project Photo Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-100/80 px-3 py-1 rounded-full">
            Field Execution
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-3">Active Field Operations & Projects</h2>
          <p className="text-gray-600 text-sm mt-2">
            Real photos capturing our teams in action across villages and study hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Rural Evening Schools', image: galleryImg1, tag: 'Education' },
            { title: 'Emergency Blood Camps', image: galleryImg2, tag: 'Healthcare' },
            { title: 'Community Anna Seva', image: galleryImg3, tag: 'Food Security' },
            { title: 'Women Tailoring Academy', image: galleryImg4, tag: 'Livelihood' }
          ].map((proj) => (
            <div key={proj.title} className="relative rounded-2xl overflow-hidden h-64 group shadow-md">
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-500 text-slate-950 px-2 py-0.5 rounded">
                  {proj.tag}
                </span>
                <h3 className="font-extrabold text-base mt-1.5">{proj.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transformation Stories (Before vs After) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-100/80 px-3 py-1 rounded-full">
              Real Lives Changed
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-3">Transformation Stories</h2>
            <p className="text-gray-600 text-sm mt-1">
              Read how your donor support creates lasting change for individuals and families.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                    {story.beneficiary}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-extrabold text-gray-900 text-lg leading-snug">{story.title}</h3>
                  <p className="text-xs font-semibold text-teal-700">{story.location}</p>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-950">
                      <span className="font-extrabold uppercase text-[10px] text-rose-700 block mb-0.5">The Challenge:</span>
                      {story.before}
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-950">
                      <span className="font-extrabold uppercase text-[10px] text-emerald-700 block mb-0.5">The Outcome:</span>
                      {story.after}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-50 mt-4">
                <div className="flex items-start gap-2 pt-4">
                  <Quote className="w-5 h-5 text-teal-500 shrink-0" />
                  <p className="text-xs italic text-gray-600 leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download Annual Impact & Audit Reports Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/20 px-3 py-1 rounded-full border border-teal-500/30">
              Audit Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              Download Annual Impact & Financial Audit Reports
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              We publish complete audited balance sheets, NITI Aayog filings, and program accomplishment metrics annually for public review.
            </p>
          </div>

          <button
            onClick={() => setShowReportModal(true)}
            className="shrink-0 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg transition-all"
          >
            <Download className="w-5 h-5" />
            <span>Download FY2025 Audit (PDF)</span>
          </button>
        </div>
      </section>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4">
              <FileCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900">FY 2024-25 Audit Report</h3>
            <p className="text-xs text-gray-500 mt-1">Help-A-Mission Welfare Society JIND</p>

            <div className="my-6 bg-slate-50 p-4 rounded-2xl border border-gray-200 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span>Total Public Funds Raised:</span>
                <span className="font-bold text-gray-900">₹24,50,000</span>
              </div>
              <div className="flex justify-between">
                <span>Field Program Expenditure:</span>
                <span className="font-bold text-teal-700">₹22,54,000 (92%)</span>
              </div>
              <div className="flex justify-between">
                <span>Audit & Administration:</span>
                <span className="font-bold text-gray-900">₹1,96,000 (8%)</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  alert('Downloading FY2025 Audited Financial Statement...');
                  setShowReportModal(false);
                }}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl text-sm"
              >
                Download PDF
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurWork;
