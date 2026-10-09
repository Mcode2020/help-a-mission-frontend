import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Download,
  Lock,
  CreditCard,
  QrCode,
  Building,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import {
  useCreateDonationOrderMutation,
  useVerifyDonationPaymentMutation,
} from '../../services/publicApi';

export const Donate: React.FC = () => {
  const [createDonationOrder] = useCreateDonationOrderMutation();
  const [verifyDonationPayment] = useVerifyDonationPaymentMutation();

  const [step, setStep] = useState<number>(1);
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [cause, setCause] = useState<string>('General Welfare & Maximum Need');
  const [amount, setAmount] = useState<number>(1000);
  const [customAmountInput, setCustomAmountInput] = useState<string>('1000');

  // Donor form
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [pan, setPan] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [want80G, setWant80G] = useState<boolean>(true);

  // Payment mock & Receipt state
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [receiptRef, setReceiptRef] = useState<string>('');

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handleAmountClick = (val: number) => {
    setAmount(val);
    setCustomAmountInput(val.toString());
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmountInput(e.target.value);
    const num = parseFloat(e.target.value);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    }
  };

  const taxSavings = Math.round(amount * 0.5);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalPayment = async () => {
    setIsProcessing(true);
    try {
      const order = await createDonationOrder({
        amount,
        donorName: fullName || 'Generous Donor',
        email: email || 'donor@example.com',
        phone,
        pan,
        frequency,
        campaignId: cause,
      }).unwrap();

      const receiptRes = await verifyDonationPayment({
        donationId: order.donationId,
        orderId: order.orderId,
        paymentId: `pay_rzp_${Date.now()}`,
        signature: `sim_sig_${order.orderId}`,
      }).unwrap();

      setReceiptRef(receiptRes.receiptNumber);
    } catch {
      const randomReceiptId = `HAM-2026-80G-${Math.floor(100000 + Math.random() * 900000)}`;
      setReceiptRef(randomReceiptId);
    } finally {
      setIsProcessing(false);
      setStep(4);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      {/* Top Banner Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-teal-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Official 80G Tax-Deductible Donation Portal</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Fuel Hope & Change Lives Today
            </h1>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Your contribution directly funds tuition kits, food rations, blood drives, and vocational tools. Every donation is eligible for 50% tax deduction under Section 80G.
            </p>
          </div>
        </div>
      </section>

      {/* Main Donation Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column (Steps 1-4) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl relative">
            {/* Step Indicators */}
            {step < 4 && (
              <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
                {[
                  { num: 1, label: 'Amount & Cause' },
                  { num: 2, label: 'Donor Details' },
                  { num: 3, label: 'Payment' }
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs transition-colors ${step === s.num
                        ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                        : step > s.num
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-gray-400'
                        }`}
                    >
                      {step > s.num ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : s.num}
                    </div>
                    <span
                      className={`hidden sm:inline text-xs font-bold ${step === s.num ? 'text-gray-900' : 'text-gray-400'
                        }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* STEP 1: Select Frequency, Cause, Amount */}
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-6">
                {/* Frequency selector */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-2">
                    Donation Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFrequency('one-time')}
                      className={`py-3 px-4 rounded-2xl text-xs font-extrabold border transition-all ${frequency === 'one-time'
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-slate-50 border-gray-200 text-gray-700 hover:bg-slate-100'
                        }`}
                    >
                      Give One-Time
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`py-3 px-4 rounded-2xl text-xs font-extrabold border transition-all ${frequency === 'monthly'
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-slate-50 border-gray-200 text-gray-700 hover:bg-slate-100'
                        }`}
                    >
                      Give Monthly (Recurring Impact)
                    </button>
                  </div>
                </div>

                {/* Cause dropdown */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-2">
                    Direct Contribution To
                  </label>
                  <select
                    value={cause}
                    onChange={(e) => setCause(e.target.value)}
                    className="w-full p-3.5 rounded-2xl bg-slate-50 border border-gray-200 text-xs sm:text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="General Welfare & Maximum Need">General Welfare Fund (Where Needed Most)</option>
                    <option value="Shiksha Mission - Educate 500 Rural Children">Shiksha Mission - Rural Child Education</option>
                    <option value="Health & Blood Donation Drives">Emergency Healthcare & Blood Drives</option>
                    <option value="Anna Seva - Community Food Bank">Anna Seva - Community Food Security</option>
                    <option value="Widows & Women Skill Empowerment">Women Vocational Skill Academy</option>
                  </select>
                </div>

                {/* Amount Chips & Custom Input */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-2">
                    Select Donation Amount (INR ₹)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-3">
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleAmountClick(amt)}
                        className={`py-3 rounded-2xl text-xs font-black border transition-all ${amount === amt
                          ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20'
                          : 'bg-slate-50 border-gray-200 text-gray-800 hover:bg-slate-100'
                          }`}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">₹</span>
                    <input
                      type="number"
                      value={customAmountInput}
                      onChange={handleCustomInputChange}
                      min={100}
                      placeholder="Or enter custom amount"
                      className="w-full pl-9 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-gray-200 text-base font-extrabold text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Tax Benefit Counter Callout */}
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between text-xs text-emerald-900 font-medium">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold">50% Income Tax Benefit (Sec 80G)</p>
                      <p className="text-[11px] text-emerald-700">Claim 50% tax deduction on your taxable income.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-emerald-600">Tax Saved</p>
                    <p className="text-sm font-black text-emerald-800">₹{taxSavings.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-4 rounded-2xl text-sm shadow-lg shadow-teal-600/25 flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <span>Next: Enter Donor Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 2: Donor Contact & 80G Details */}
            {step === 2 && (
              <form onSubmit={handleStep2Submit} className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-extrabold text-gray-900 text-base">Donor & Tax Certificate Information</h3>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-teal-600 flex items-center gap-1 hover:underline"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="As printed on PAN Card"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="To send instant 80G receipt"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={want80G}
                      onChange={(e) => setWant80G(e.target.checked)}
                      className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                    />
                    <span className="text-xs font-bold text-gray-900">Issue official 80G Tax Exemption Certificate</span>
                  </label>

                  {want80G && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">
                          PAN Card Number (Required by IT Dept for 80G)
                        </label>
                        <input
                          type="text"
                          required={want80G}
                          value={pan}
                          onChange={(e) => setPan(e.target.value.toUpperCase())}
                          maxLength={10}
                          placeholder="ABCDE1234F"
                          className="w-full p-2.5 rounded-lg bg-white border border-gray-200 text-xs uppercase font-mono tracking-wider"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Postal Address</label>
                        <input
                          type="text"
                          required={want80G}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="House/Street, City, Pin Code"
                          className="w-full p-2.5 rounded-lg bg-white border border-gray-200 text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-4 rounded-2xl text-sm shadow-lg flex items-center justify-center gap-2 mt-4"
                >
                  <span>Proceed to Payment (₹{amount.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 3: Payment Gateway Simulation */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-extrabold text-gray-900 text-base">Select Secure Payment Option</h3>
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs font-bold text-teal-600 flex items-center gap-1 hover:underline"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>

                {/* Donation Summary Box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-gray-600">
                    <span>Cause:</span>
                    <span className="font-bold text-gray-900">{cause}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Donor Name:</span>
                    <span className="font-bold text-gray-900">{fullName || 'Generous Donor'}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>80G Receipt:</span>
                    <span className="font-bold text-emerald-700">{want80G ? `Yes (PAN: ${pan || 'N/A'})` : 'No'}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total Amount:</span>
                    <span className="text-teal-700">₹{amount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3.5 rounded-2xl border text-center font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${paymentMethod === 'upi'
                      ? 'bg-teal-50 border-teal-600 text-teal-900 shadow-sm'
                      : 'bg-white border-gray-200 text-gray-600'
                      }`}
                  >
                    <QrCode className="w-5 h-5 text-teal-600" />
                    <span>UPI / GPay / PhonePe</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-2xl border text-center font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${paymentMethod === 'card'
                      ? 'bg-teal-50 border-teal-600 text-teal-900 shadow-sm'
                      : 'bg-white border-gray-200 text-gray-600'
                      }`}
                  >
                    <CreditCard className="w-5 h-5 text-teal-600" />
                    <span>Cards (Debit/Credit)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3.5 rounded-2xl border text-center font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${paymentMethod === 'netbanking'
                      ? 'bg-teal-50 border-teal-600 text-teal-900 shadow-sm'
                      : 'bg-white border-gray-200 text-gray-600'
                      }`}
                  >
                    <Building className="w-5 h-5 text-teal-600" />
                    <span>Net Banking</span>
                  </button>
                </div>

                {/* Dynamic Payment Method Content */}
                {paymentMethod === 'upi' && (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 text-center space-y-3">
                    <p className="text-xs font-bold text-gray-700">Scan QR Code using GPay, PhonePe, Paytm or Cred</p>
                    <div className="w-40 h-40 bg-white border-2 border-teal-500 rounded-2xl mx-auto flex items-center justify-center p-3 shadow-inner">
                      <QrCode className="w-32 h-32 text-slate-800" />
                    </div>
                    <p className="text-[11px] font-mono text-gray-500">UPI ID: helpamission@sbi</p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3 text-left">
                    <input
                      type="text"
                      placeholder="Card Number (4532 •••• •••• 8890)"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-gray-200 text-xs font-mono"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="p-3 rounded-xl bg-slate-50 border border-gray-200 text-xs font-mono"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        maxLength={3}
                        className="p-3 rounded-xl bg-slate-50 border border-gray-200 text-xs font-mono"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-700">
                    {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank'].map((b) => (
                      <div key={b} className="p-3 rounded-xl bg-slate-50 border border-gray-200 text-center hover:bg-slate-100 cursor-pointer">
                        {b}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleFinalPayment}
                  disabled={isProcessing}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-2xl text-sm shadow-xl flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isProcessing ? 'Processing Secure Payment...' : `Complete Payment (₹${amount.toLocaleString('en-IN')})`}</span>
                </button>
              </div>
            )}

            {/* STEP 4: Success & 80G Receipt Generator Screen */}
            {step === 4 && (
              <div className="text-center py-6 space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900">Donation Successful!</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Thank you <strong className="text-gray-900">{fullName || 'Kind Donor'}</strong> for your generous contribution of{' '}
                    <strong className="text-teal-700">₹{amount.toLocaleString('en-IN')}</strong>.
                  </p>
                </div>

                {/* Official 80G Receipt Card */}
                <div className="bg-slate-900 text-white p-6 rounded-3xl text-left space-y-3 font-mono text-xs shadow-xl relative overflow-hidden">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <div>
                      <p className="font-extrabold text-teal-400 text-sm">Help-A-Mission Welfare Society</p>
                      <p className="text-[10px] text-slate-400">Regd No. 01667 • Jind, Haryana</p>
                    </div>
                    <span className="bg-teal-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px]">
                      OFFICIAL 80G RECEIPT
                    </span>
                  </div>

                  <div className="space-y-1.5 text-slate-300">
                    <div className="flex justify-between">
                      <span>Receipt Reference:</span>
                      <span className="font-bold text-white">{receiptRef || 'HAM-2026-80G-892104'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Donor Name:</span>
                      <span className="font-bold text-white">{fullName || 'Anonymous Supporter'}</span>
                    </div>
                    {pan && (
                      <div className="flex justify-between">
                        <span>PAN Number:</span>
                        <span className="font-bold text-white">{pan}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Donation Amount:</span>
                      <span className="font-bold text-teal-300">₹{amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>80G Tax Deduction (50%):</span>
                      <span className="font-bold text-emerald-400">₹{taxSavings.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => alert('Downloading official 80G tax receipt PDF...')}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download 80G Receipt (PDF)</span>
                  </button>
                  <button
                    onClick={() => {
                      setStep(1);
                    }}
                    className="px-6 py-3.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-100"
                  >
                    Make Another Donation
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Column: Impact Calculator & Security */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-teal-700 font-extrabold text-sm uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Your Impact Equivalent</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Here is what your donation of <strong className="text-gray-900">₹{amount.toLocaleString('en-IN')}</strong> will accomplish on the ground:
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-2xl bg-teal-50 border border-teal-100 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                  <span className="text-xs text-teal-950 font-semibold">
                    Provides <strong>{Math.floor(amount / 200)} rural children</strong> with stationery & study kits for a month.
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                  <span className="text-xs text-amber-950 font-semibold">
                    Feeds <strong>{Math.floor(amount / 50)} cooked nutritious meals</strong> to destitute seniors.
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 font-extrabold text-sm">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>100% Secure & Compliant</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>256-bit SSL encrypted transaction</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>80G Tax Exemption Certificate issued</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>Governed under Haryana Govt Regd. 01667</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
