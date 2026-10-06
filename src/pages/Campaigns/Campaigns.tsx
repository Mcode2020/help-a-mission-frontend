import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Heart,
  Clock,
  Users,
  CheckCircle2,
  X,
  AlertCircle,
  ShieldCheck,
  PieChart
} from 'lucide-react';
import { CAMPAIGNS } from '../../data/ngoData';
import type { Campaign } from '../../data/ngoData';
import campaignEducationImg from '../../assets/campaign_education.png';
import campaignBloodImg from '../../assets/campaign_blood.png';
import campaignCommunityImg from '../../assets/campaign_community.png';
import campaignFinancialImg from '../../assets/campaign_financial.png';

const imageMap: Record<string, string> = {
  '/src/assets/campaign_education.png': campaignEducationImg,
  '/src/assets/campaign_blood.png': campaignBloodImg,
  '/src/assets/campaign_community.png': campaignCommunityImg,
  '/src/assets/campaign_financial.png': campaignFinancialImg
};

export const Campaigns: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyUrgent, setOnlyUrgent] = useState<boolean>(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [donationModalCampaign, setDonationModalCampaign] = useState<Campaign | null>(null);

  // Quick Donation Drawer State
  const [customAmount, setCustomAmount] = useState<number>(1000);
  const [donorName, setDonorName] = useState<string>('');
  const [donorPan, setDonorPan] = useState<string>('');
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);

  const categories = ['All', 'Education', 'Healthcare', 'Hunger Relief', 'Women Empowerment'];

  const filteredCampaigns = useMemo(() => {
    return CAMPAIGNS.filter((camp) => {
      const matchesCategory = selectedCategory === 'All' || camp.category === selectedCategory;
      const matchesSearch = camp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesUrgent = !onlyUrgent || camp.urgent;
      return matchesCategory && matchesSearch && matchesUrgent;
    });
  }, [selectedCategory, searchQuery, onlyUrgent]);

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDonationSuccess(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full border border-teal-500/30">
              Active Relief & Educational Projects
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Support Active Campaigns
            </h1>
            <p className="mt-3 text-slate-300 text-base leading-relaxed">
              Every single rupee contributed goes directly to purchasing supplies, meals, medical kits, and funding rural teachers. Claim 50% 80G Tax Exemption on every donation.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                  : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input & Urgent Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campaigns..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button
              onClick={() => setOnlyUrgent(!onlyUrgent)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${onlyUrgent
                ? 'bg-rose-50 border-rose-300 text-rose-700'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>Urgent Only</span>
            </button>
          </div>
        </div>
      </section>

      {/* Campaign Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {filteredCampaigns.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-xs max-w-md mx-auto">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 text-lg">No campaigns found</h3>
            <p className="text-gray-500 text-xs mt-1">Try clearing your search query or switching categories.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setOnlyUrgent(false);
              }}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map((camp) => {
              const percentFunded = Math.min(100, Math.round((camp.raisedAmount / camp.targetAmount) * 100));
              const displayImage = imageMap[camp.image] || camp.image;

              return (
                <div
                  key={camp.id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Card Banner Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={displayImage}
                      alt={camp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-xs text-white">
                        {camp.category}
                      </span>
                      {camp.urgent && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white animate-pulse">
                          Urgent Needs
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-extrabold text-gray-900 text-lg leading-snug group-hover:text-teal-600 transition-colors">
                        {camp.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                        {camp.summary}
                      </p>
                    </div>

                    {/* Funding Progress Bar */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-end text-xs">
                        <div>
                          <span className="text-gray-500 font-medium">Raised: </span>
                          <span className="font-black text-teal-700">₹{camp.raisedAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <span className="font-extrabold text-gray-900">{percentFunded}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentFunded}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-gray-500 pt-1 font-medium">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-teal-600" />
                          {camp.donorsCount} Donors
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          {camp.daysLeft} Days left
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => setDonationModalCampaign(camp)}
                        className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-600/20 transition-all active:scale-98"
                      >
                        <Heart className="w-4 h-4 fill-white/20" />
                        <span>Donate Now</span>
                      </button>
                      <button
                        onClick={() => setSelectedCampaign(camp)}
                        className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-slate-50 text-xs font-bold transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative my-8 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedCampaign(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800">
              {selectedCampaign.category}
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 mt-2">{selectedCampaign.title}</h2>

            <div className="mt-4 rounded-2xl overflow-hidden h-60">
              <img
                src={imageMap[selectedCampaign.image] || selectedCampaign.image}
                alt={selectedCampaign.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="font-bold text-gray-900 text-base">Campaign Details & Need</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {selectedCampaign.fullStory}
              </p>

              {/* Budget Breakdown */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-xs uppercase tracking-wider mb-3">
                  <PieChart className="w-4 h-4 text-teal-600" />
                  <span>Itemized Fund Allocation</span>
                </div>
                <div className="space-y-2">
                  {selectedCampaign.budgetBreakdown.map((item) => (
                    <div key={item.item} className="flex justify-between text-xs text-gray-700 font-medium">
                      <span>{item.item}</span>
                      <span className="font-bold text-gray-900">₹{item.amount.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 80G Exemption Callout */}
              <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-800 font-medium">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Donations to this campaign are 50% tax-deductible under Sec 80G. Official receipt sent instantly.</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  const camp = selectedCampaign;
                  setSelectedCampaign(null);
                  setDonationModalCampaign(camp);
                }}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all"
              >
                Donate to this Cause
              </button>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Campaign Donation Drawer Modal */}
      {donationModalCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => {
                setDonationModalCampaign(null);
                setDonationSuccess(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {donationSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900">Thank You for Giving!</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your contribution of <strong className="text-teal-700">₹{customAmount.toLocaleString('en-IN')}</strong> to{' '}
                  <strong>{donationModalCampaign.title}</strong> has been registered.
                </p>
                <div className="bg-slate-50 p-3 rounded-xl text-[11px] text-gray-600 font-mono">
                  80G Tax Exemption Receipt sent to your email.
                </div>
                <button
                  onClick={() => {
                    setDonationModalCampaign(null);
                    setDonationSuccess(false);
                  }}
                  className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl text-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleDonateSubmit} className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-[10px] font-bold uppercase text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                    Direct Donation
                  </span>
                  <h3 className="font-extrabold text-gray-900 text-lg mt-1">{donationModalCampaign.title}</h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Select Donation Amount (₹)</label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {[500, 1000, 2500, 5000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setCustomAmount(amt)}
                        className={`py-2 rounded-xl text-xs font-extrabold border transition-all ${customAmount === amt
                          ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                          : 'bg-slate-50 border-gray-200 text-gray-700 hover:bg-slate-100'
                          }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(Number(e.target.value))}
                    min={100}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Enter your name for 80G receipt"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">PAN Number (Optional for 80G)</label>
                  <input
                    type="text"
                    value={donorPan}
                    onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs uppercase focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="bg-teal-50/80 p-3 rounded-xl text-[11px] text-teal-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>50% Tax Exemption Savings: <strong>₹{Math.round(customAmount * 0.5)}</strong></span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-md transition-all active:scale-98"
                >
                  Proceed to Secure Payment (₹{customAmount})
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
