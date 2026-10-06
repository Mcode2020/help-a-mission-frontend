import React, { useState } from 'react';
import { Heart, Users, GraduationCap, ChevronDown } from 'lucide-react';
import donateImg from '../../assets/donate_img.png';
import { Button } from '../../components/ui';

export const DonationSection: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    message: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<DonationReceipt | null>(null);

  const predefinedAmounts = [
    { label: '₹500', value: 500 },
    { label: '₹1,000', value: 1000 },
    { label: '₹2,000', value: 2000 },
    { label: '₹5,000', value: 5000 },
    { label: 'Custom', value: 'custom' as const },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="relative py-16 sm:py-20 bg-[#F0F8F7] overflow-hidden">
      {/* Background Decorative Leaf/Watermark SVG */}
      {/* <div className="absolute top-0 right-0 pointer-events-none opacity-[0.07] translate-x-12 -translate-y-12 hidden md:block">
        <svg width="480" height="480" viewBox="0 0 200 200" fill="#0F9EA2">
          <path d="M40,-65.7C51.2,-58.5,59.3,-46.8,65.8,-34.1C72.3,-21.4,77.2,-7.7,76.5,5.9C75.8,19.5,69.5,33,60.5,43.8C51.5,54.6,39.8,62.7,26.8,67.8C13.8,72.9,-0.5,75,-14.8,72.6C-29.1,70.2,-43.4,63.3,-53.8,52.5C-64.2,41.7,-70.7,27,-73.2,11.5C-75.7,-4,-74.2,-20.3,-66.6,-33.5C-59,-46.7,-45.3,-56.8,-31.8,-62.7C-18.3,-68.6,-5,-70.3,7.9,-71.4C20.8,-72.5,28.8,-72.9,40,-65.7Z" transform="translate(100 100)" />
        </svg>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Mission Details & Feature Highlights & Image */}
          <div className="lg:col-span-6 space-y-6">
            {/* Tagline / Subtitle */}
            <div className="flex items-center gap-2">
              <span className="w-6 h-[2.5px] bg-[#0F9EA2] rounded-full inline-block"></span>
              <span className="text-[#0F9EA2] text-xs sm:text-sm font-bold tracking-wider uppercase">
                SUPPORT OUR MISSION
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#1B2B4A] tracking-tight leading-tight">
              Make a Difference Today
            </h2>

            {/* Description */}
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
              Your contribution helps us organize health camps, support needy individuals and create awareness in communities.
            </p>

            {/* Badges / Highlights */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 pt-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-rose-100/80 flex items-center justify-center text-rose-500 shrink-0">
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#1B2B4A]">
                  Better Healthcare
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-100/80 flex items-center justify-center text-blue-600 shrink-0">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#1B2B4A]">
                  Stronger Communities
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-100/80 flex items-center justify-center text-amber-600 shrink-0">
                  <GraduationCap className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#1B2B4A]">
                  Brighter Futures
                </span>
              </div>
            </div>

            {/* Image Card */}
            <div className="pt-2">
              <div className="rounded-[24px] overflow-hidden shadow-sm border border-slate-100 h-64 sm:h-72 lg:h-[310px] w-full">
                <img
                  src={donateImg}
                  alt="Hands holding globe"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Donation Form / Receipt Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div>
                <h3 className="text-2xl sm:text-[28px] font-bold text-[#1B2B4A]">
                  Donation Fund
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Every contribution counts. Choose an amount or enter your own.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Predefined Amounts Filter Pills */}
                <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                  {predefinedAmounts.map((amt) => {
                    const isSelected = selectedAmount === amt.value;
                    return (
                      <button
                        type="button"
                        key={amt.label}
                        onClick={() => {
                          setSelectedAmount(amt.value);
                          if (amt.value !== 'custom') setCustomAmount('');
                        }}
                        className={`py-2.5 px-1 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center cursor-pointer ${isSelected
                          ? 'bg-[#0F9EA2] text-white border-[#0F9EA2] shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-[#0F9EA2]/40 hover:bg-slate-50'
                          }`}
                      >
                        {amt.label}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Input field if 'Custom' option is active */}
                {selectedAmount === 'custom' && (
                  <div>
                    <label className="block text-xs font-bold text-[#1B2B4A] mb-1.5">
                      Enter Custom Amount (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter amount in ₹"
                      required
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-[#FAFAFA]/70 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F9EA2]/20 focus:border-[#0F9EA2] transition-all"
                    />
                  </div>

                {/* Full Name & Email Address Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-[#1B2B4A] mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-[#FAFAFA]/70 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F9EA2]/20 focus:border-[#0F9EA2] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B2B4A] mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-[#FAFAFA]/70 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F9EA2]/20 focus:border-[#0F9EA2] transition-all"
                    />
                  </div>

                {/* Phone Number Field */}
                <div>
                  <label className="block text-xs font-bold text-[#1B2B4A] mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex items-center shrink-0">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="appearance-none bg-[#FAFAFA]/70 border border-slate-200 rounded-xl px-3.5 py-3 pr-8 text-sm font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F9EA2]/20 focus:border-[#0F9EA2] cursor-pointer"
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+61">+61</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 pointer-events-none" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-[#FAFAFA]/70 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F9EA2]/20 focus:border-[#0F9EA2] transition-all"
                    />
                  </div>
                </div>

                {/* Message Field (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-[#1B2B4A] mb-1.5">
                    Message <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Anything you would like us to know?"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-[#FAFAFA]/70 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F9EA2]/20 focus:border-[#0F9EA2] transition-all"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full py-3.5 sm:py-4 px-6 bg-[#0F9EA2] hover:bg-[#0C8B8F] text-white font-bold text-base rounded-full shadow-md shadow-[#0F9EA2]/25"
                  >
                    Donate
                  </Button>
                </div>

                {isSubmitted && (
                  <div className="mt-3 p-3 bg-teal-50 border border-teal-200 text-[#0F9EA2] text-xs sm:text-sm font-semibold rounded-xl text-center">
                    Thank you for your pledge! We will get in touch with you shortly.
                  </div>
                </form>
              )}
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DonationSection;
