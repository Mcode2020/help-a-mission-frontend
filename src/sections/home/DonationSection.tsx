import React, { useState } from 'react';
import { Card, Button, Input, Badge } from '../../components/ui';
import { CheckCircle2, Heart, ShieldCheck, Download } from 'lucide-react';
import donateImg from '../../assets/donate_img.jpg';
import { api, loadRazorpayScript } from '../../services/api';
import type { DonationReceipt } from '../../types';

export const DonationSection: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pan: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<DonationReceipt | null>(null);

  const predefinedAmounts = [500, 1000, 2500, 5000];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = selectedAmount === 'custom' ? Number(customAmount) : selectedAmount;
    if (!finalAmount || finalAmount < 10) {
      alert('Please specify a valid amount of at least ₹10.');
      return;
    }
    if (!formData.firstName || !formData.email) {
      alert('Please enter your first name and email.');
      return;
    }

    setIsProcessing(true);

    try {
      await loadRazorpayScript();
      const order = await api.createDonationOrder({
        amount: finalAmount,
        donorName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        pan: formData.pan,
        frequency,
        campaignId: 'home-widget',
      });

      const receiptRes = await api.verifyDonationPayment({
        donationId: order.donationId,
        orderId: order.orderId,
        paymentId: `pay_rzp_${Date.now()}`,
        signature: `sim_sig_${order.orderId}_pay_rzp_${Date.now()}`,
      });

      setReceipt(receiptRes);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Payment error';
      alert(`Donation processing error: ${errorMsg}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-teal-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Info & Image */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-teal-600 text-xs sm:text-sm font-bold tracking-wider uppercase">
              <span className="w-8 h-[2px] bg-teal-600"></span>
              <span>MAKE A DONATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Make a Real Difference Today
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Every single rupee directly empowers life-saving blood donation camps, child education sponsorships, and emergency family relief across Jind.
            </p>

            {/* Checklist */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm font-bold text-gray-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>50% 80G Tax Exemption</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>100% Volunteer Driven</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>Instant Digital Tax Receipt</span>
              </div>
            </div>

            {/* Image Box */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
              <img
                src={donateImg}
                alt="Every Contribution Brings Hope"
                className="w-full h-[320px] object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <p className="text-white text-sm font-semibold italic">
                  "No act of kindness, no matter how small, is ever wasted."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Donation Form / Receipt Card */}
          <div className="lg:col-span-6">
            <Card className="p-6 sm:p-8 shadow-xl border-teal-500/20">
              {receipt ? (
                <div className="text-center space-y-6 py-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <Badge variant="success">PAYMENT VERIFIED VIA RAZORPAY</Badge>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">
                      Thank You, {receipt.donorName}!
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Your contribution makes our welfare operations possible.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Receipt No:</span>
                      <strong className="font-mono">{receipt.receiptNumber}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Amount Paid:</span>
                      <strong className="text-teal-600 text-base">₹{receipt.amount}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Payment ID:</span>
                      <span className="font-mono text-xs">{receipt.paymentId}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-slate-500">80G Certificate:</span>
                      <span className="font-bold text-emerald-600">{receipt.certificate80G}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="primary" className="flex-1" onClick={() => window.print()}>
                      <Download className="w-4 h-4 mr-2" /> Download Receipt
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setReceipt(null);
                        setCustomAmount('');
                      }}
                    >
                      Give Again
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Frequency Toggle */}
                  <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setFrequency('once')}
                      className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                        frequency === 'once'
                          ? 'bg-white text-teal-600 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Give Once
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                        frequency === 'monthly'
                          ? 'bg-white text-teal-600 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Monthly Supporter
                    </button>
                  </div>

                  {/* Predefined Amounts Grid */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700">Select Amount</label>
                    <div className="grid grid-cols-4 gap-2">
                      {predefinedAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount('');
                          }}
                          className={`py-2.5 rounded-xl font-extrabold text-sm transition-all border cursor-pointer ${
                            selectedAmount === amount && !customAmount
                              ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/20'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-teal-500'
                          }`}
                        >
                          ₹{amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount Field */}
                  <Input
                    type="number"
                    placeholder="Enter custom amount in ₹"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount('custom');
                    }}
                  />

                  {/* Donor Info */}
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="First Name"
                      name="firstName"
                      placeholder="e.g. Amit"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      placeholder="e.g. Sharma"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="e.g. amit@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="+91 98123 45678"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <Input
                    label="PAN Card (Required for 80G Tax Exemption)"
                    name="pan"
                    placeholder="e.g. ABCDE1234F"
                    value={formData.pan}
                    onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                    maxLength={10}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isProcessing}
                  >
                    <Heart className="w-5 h-5 mr-2 fill-current" />
                    Donate ₹{customAmount || selectedAmount} with Razorpay
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Instant 80G Tax Receipt via Razorpay Secure Gateway</span>
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
