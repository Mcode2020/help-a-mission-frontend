import React, { useState } from 'react';
import { CheckCircle2, Heart } from 'lucide-react';
import donateImg from '../../assets/donate_img.jpg';

export const DonationSection: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const predefinedAmounts = [500, 1000, 2500, 5000];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section className="py-16 sm:py-24 bg-teal-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Info & Image */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-teal-600 text-xs sm:text-sm font-bold tracking-wider uppercase">
              <span className="w-8 h-[2px] bg-teal-600"></span>
              <span>MAKE A DONATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Make a Difference Today
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Every contribution helps us provide food, healthcare, and education to those in need.
            </p>

            {/* Checklist */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm font-bold text-gray-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>Tax Exemption</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>100% Direct Impact</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>Easy & Secure</span>
              </div>
            </div>

            {/* Image Below Text */}
            <div className="pt-4">
              <div className="rounded-3xl overflow-hidden shadow-md border border-gray-100 h-64 sm:h-72">
                <img
                  src={donateImg}
                  alt="Hands holding globe"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Donation Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Donation Fund</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Choose an amount or enter your own custom amount.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Amount Filter Pills */}
                <div className="grid grid-cols-5 gap-2">
                  {predefinedAmounts.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2 px-1 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                        selectedAmount === amt
                          ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-teal-400'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSelectedAmount('custom')}
                    className={`py-2 px-1 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      selectedAmount === 'custom'
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-teal-400'
                    }`}
                  >
                    Custom
                  </button>
                </div>

                {/* Custom Amount Input if Selected */}
                {selectedAmount === 'custom' && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Enter Custom Amount (₹) *
                    </label>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="e.g. 1500"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                )}

                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50/50"
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50/50"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-md shadow-teal-500/25 active:scale-98 transition-all text-sm"
                >
                  <Heart className="w-4 h-4 fill-white/20" />
                  <span>Donate Now</span>
                </button>

                {isSubmitted && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl text-center">
                    Thank you for your generous pledge! Our team will contact you directly with receipt details.
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
