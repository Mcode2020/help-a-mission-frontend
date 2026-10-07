import React, { useState } from 'react';
import { Heart, Users, GraduationCap, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '../../components/ui';
import type { CmsDonationSectionContent } from '../../types';

interface DonationSectionProps {
  data?: CmsDonationSectionContent;
}

export const DonationSection: React.FC<DonationSectionProps> = ({ data }) => {
  const defaultSelected = data?.defaultAmountINR || 1000;
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(defaultSelected);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    message: '',
  });
  const [customFieldsData, setCustomFieldsData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCustomInputChange = (fieldId: string, value: string) => {
    setCustomFieldsData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const eyebrow = data?.eyebrow;
  const heading = data?.heading;
  const body = data?.body;
  const cardTitle = data?.cardTitle;
  const cardSubtitle = data?.cardSubtitle;
  const featureImage = data?.featureMediaUrl;
  const donateButtonLabel = data?.donateButtonLabel || 'Donate';

  const suggestedAmounts = data?.suggestedAmountsINR || [];

  const predefinedAmounts = [
    ...suggestedAmounts.map((amt) => ({ label: `₹${amt.toLocaleString('en-IN')}`, value: amt })),
    ...(data?.customAmountEnabled !== false ? [{ label: 'Custom', value: 'custom' as const }] : []),
  ];

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />;
      case 'Users':
        return <Users className="w-4 h-4 text-blue-600" />;
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4 text-amber-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#0F9EA2]" />;
    }
  };

  const getBadgeBg = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return 'bg-rose-100/80 text-rose-500';
      case 'Users':
        return 'bg-blue-100/80 text-blue-600';
      case 'GraduationCap':
        return 'bg-amber-100/80 text-amber-600';
      default:
        return 'bg-teal-100/80 text-[#0F9EA2]';
    }
  };

  const badges = data?.badges || [];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Mission Details & Feature Highlights & Image */}
          <div className="lg:col-span-6 space-y-6">
            {/* Tagline / Subtitle */}
            {eyebrow && (
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2.5px] bg-[#0F9EA2] rounded-full inline-block"></span>
                <span className="text-[#0F9EA2] text-xs sm:text-sm font-bold tracking-wider uppercase">
                  {eyebrow}
                </span>
              </div>
            )}

            {/* Title */}
            {heading && (
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#1B2B4A] tracking-tight leading-tight">
                {heading}
              </h2>
            )}

            {/* Description */}
            {body && (
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
                {body}
              </p>
            )}

            {/* Badges / Highlights */}
            {badges.length > 0 && (
              <div className="flex flex-wrap items-center gap-5 sm:gap-7 pt-1">
                {badges.map((b) => (
                  <div key={b.id} className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getBadgeBg(b.icon)}`}>
                      {getBadgeIcon(b.icon)}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#1B2B4A]">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Image Card */}
            {featureImage && (
              <div className="pt-2">
                <div className="rounded-[24px] overflow-hidden shadow-sm border border-slate-100 h-64 sm:h-72 lg:h-[310px] w-full">
                  <img
                    src={featureImage}
                    alt={heading || 'Donation Feature'}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Donation Form / Receipt Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
              {(cardTitle || cardSubtitle) && (
                <div>
                  {cardTitle && (
                    <h3 className="text-2xl sm:text-[28px] font-bold text-[#1B2B4A]">
                      {cardTitle}
                    </h3>
                  )}
                  {cardSubtitle && (
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {cardSubtitle}
                    </p>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Predefined Amounts Filter Pills */}
                {predefinedAmounts.length > 0 && (
                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
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
                          className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center cursor-pointer ${isSelected
                            ? 'bg-[#0F9EA2] text-white border-[#0F9EA2] shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-[#0F9EA2]/40 hover:bg-slate-50'
                            }`}
                        >
                          {amt.label}
                        </button>
                      );
                    })}
                  </div>
                )}

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
                )}

                {/* Dynamic Form Fields (Driven 100% by CMS Configured Fields) */}
                {(data?.customFields || []).map((field) => (
                  <div key={field.id}>
                    <label className="block text-xs font-bold text-[#1B2B4A] mb-1.5">
                      {field.label} {field.required ? <span className="text-red-500">*</span> : <span className="text-slate-400 font-normal">(Optional)</span>}
                    </label>
                    {field.type === 'tel' ? (
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
                          name={field.id}
                          value={customFieldsData[field.id] || (formData as any)[field.id] || ''}
                          onChange={(e) => {
                            handleInputChange(e);
                            handleCustomInputChange(field.id, e.target.value);
                          }}
                          placeholder={field.placeholder || 'Enter your phone number'}
                          required={field.required}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-[#FAFAFA]/70 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F9EA2]/20 focus:border-[#0F9EA2] transition-all"
                        />
                      </div>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        name={field.id}
                        value={customFieldsData[field.id] || (formData as any)[field.id] || ''}
                        onChange={(e) => {
                          handleInputChange(e as any);
                          handleCustomInputChange(field.id, e.target.value);
                        }}
                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                        required={field.required}
                        rows={3}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-[#FAFAFA]/70 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F9EA2]/20 focus:border-[#0F9EA2] transition-all"
                      />
                    ) : field.type === 'checkbox' ? (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          name={field.id}
                          checked={!!customFieldsData[field.id]}
                          onChange={(e) => handleCustomInputChange(field.id, e.target.checked ? 'true' : '')}
                          required={field.required}
                          className="w-4 h-4 rounded border-slate-300 text-[#0F9EA2] focus:ring-[#0F9EA2]/20 cursor-pointer"
                        />
                        <span className="text-sm text-slate-700 font-medium">{field.placeholder || field.label}</span>
                      </div>
                    ) : field.type === 'color' ? (
                      <input
                        type="color"
                        name={field.id}
                        value={customFieldsData[field.id] || '#0F9EA2'}
                        onChange={(e) => handleCustomInputChange(field.id, e.target.value)}
                        className="w-16 h-10 rounded-xl border border-slate-200 p-1 cursor-pointer bg-slate-50"
                      />
                    ) : (
                      <input
                        type={field.type || 'text'}
                        name={field.id}
                        value={customFieldsData[field.id] || (formData as any)[field.id] || ''}
                        onChange={(e) => {
                          handleInputChange(e);
                          handleCustomInputChange(field.id, e.target.value);
                        }}
                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                        required={field.required}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-[#FAFAFA]/70 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F9EA2]/20 focus:border-[#0F9EA2] transition-all"
                      />
                    )}
                  </div>
                ))}

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full py-3.5 sm:py-4 px-6 bg-[#0F9EA2] hover:bg-[#0C8B8F] text-white font-bold text-base rounded-full shadow-md shadow-[#0F9EA2]/25"
                  >
                    {donateButtonLabel}
                  </Button>
                </div>

                {isSubmitted && (
                  <div className="mt-3 p-3 bg-teal-50 border border-teal-200 text-[#0F9EA2] text-xs sm:text-sm font-semibold rounded-xl text-center">
                    Thank you for your donation pledge! We will get in touch with you shortly.
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DonationSection;
