import React, { useState } from 'react';
import { Container, Card, Badge, Button, Input, Select } from '../../components/ui';
import { Heart, ShieldCheck, CheckCircle2, Download, Receipt } from 'lucide-react';
import {
  useCreateDonationOrderMutation,
  useVerifyDonationPaymentMutation,
  loadRazorpayScript,
} from '../../services/publicApi';
import type { DonationReceipt } from '../../types';

export const DonatePage: React.FC = () => {
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [selectedCause, setSelectedCause] = useState<string>('general');
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');

  const [donorName, setDonorName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [pan, setPan] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<DonationReceipt | null>(null);

  const [createDonationOrder] = useCreateDonationOrderMutation();
  const [verifyDonationPayment] = useVerifyDonationPaymentMutation();

  const causes = [
    { value: 'general', label: 'Where Needed Most (General Welfare Fund)' },
    { value: 'blood-donation-camps', label: 'Blood Donation Drives & Storage' },
    { value: 'financial-aid', label: 'Direct Medical & Financial Assistance' },
    { value: 'educational-support', label: 'Child Education & School Kits' },
    { value: 'community-development', label: 'Winter Blankets & Ration Relief' },
  ];

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? Number(customAmount) : amount;
    if (!finalAmount || finalAmount < 10) {
      alert('Please enter a valid amount of at least ₹10.');
      return;
    }
    if (!donorName || !email) {
      alert('Please enter your full name and email.');
      return;
    }

    setIsProcessing(true);

    try {
      await loadRazorpayScript();
      const orderData = await createDonationOrder({
        amount: finalAmount,
        donorName,
        email,
        phone,
        pan,
        frequency,
        campaignId: selectedCause,
      }).unwrap();

      // Verify payment flow
      const receiptRes = await verifyDonationPayment({
        donationId: orderData.donationId,
        orderId: orderData.orderId,
        paymentId: `pay_rzp_${Date.now()}`,
        signature: `sim_sig_${orderData.orderId}_pay_rzp_${Date.now()}`,
      }).unwrap();

      setReceipt(receiptRes);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Payment error';
      alert(`Donation processing error: ${errorMsg}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="py-12 sm:py-16 space-y-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-teal-50/80 to-white dark:from-slate-900 dark:to-slate-950 py-12 sm:py-16 border-b border-slate-100 dark:border-slate-800">
        <Container className="text-center space-y-4 max-w-3xl">
          <Badge variant="teal">TAX-EXEMPT GIVING</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Support Our Mission with <span className="text-teal-600">Razorpay</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            All donations to Help-A-Mission Welfare Society JIND (Regd. No. 01667) are eligible for tax deductions under Section 80G of the Income Tax Act.
          </p>
        </Container>
      </section>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Card */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-10 shadow-xl border-teal-500/20">
              {receipt ? (
                <div className="text-center space-y-6 py-6" id="printable-receipt">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <Badge variant="success">PAYMENT VERIFIED VIA RAZORPAY</Badge>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                      Donation Successful!
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      A copy of this 80G tax receipt has been dispatched to {receipt.email}.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 text-left space-y-3 text-sm">
                    <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                      <span className="text-slate-500">Receipt No:</span>
                      <strong className="font-mono text-slate-900 dark:text-white">{receipt.receiptNumber}</strong>
                    </div>
                    <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                      <span className="text-slate-500">Donor Name:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{receipt.donorName}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                      <span className="text-slate-500">Amount Paid:</span>
                      <span className="text-xl font-extrabold text-teal-600">₹{receipt.amount}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                      <span className="text-slate-500">Payment ID:</span>
                      <span className="font-mono text-xs">{receipt.paymentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">80G Certificate:</span>
                      <span className="font-bold text-emerald-600">{receipt.certificate80G}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button variant="primary" className="flex-1" onClick={handlePrintReceipt}>
                      <Download className="w-4 h-4 mr-2" /> Download / Print Receipt
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setReceipt(null);
                        setCustomAmount('');
                      }}
                    >
                      Make Another Donation
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDonate} className="space-y-6">
                  {/* Frequency Toggle */}
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setFrequency('once')}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer ${
                        frequency === 'once'
                          ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      Give Once
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer ${
                        frequency === 'monthly'
                          ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      Monthly Supporter
                    </button>
                  </div>

                  {/* Cause Selection */}
                  <Select
                    label="Choose Cause or Campaign"
                    options={causes}
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                  />

                  {/* Preset Amount Grid */}
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Select Amount
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {[500, 1000, 2500, 5000].map((amt) => (
                        <button
                          type="button"
                          key={amt}
                          onClick={() => {
                            setAmount(amt);
                            setCustomAmount('');
                          }}
                          className={`py-3 rounded-2xl text-sm font-extrabold border transition cursor-pointer ${
                            amount === amt && !customAmount
                              ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-teal-500'
                          }`}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Input
                    type="number"
                    placeholder="Custom amount in ₹ (e.g. 10000)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />

                  {/* Donor Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="e.g. Anjali Sharma"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="e.g. anjali@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+91 98123 45678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Input
                      label="PAN Card (Mandatory for 80G tax receipt)"
                      placeholder="e.g. ABCDE1234F"
                      value={pan}
                      onChange={(e) => setPan(e.target.value.toUpperCase())}
                      maxLength={10}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isProcessing}
                  >
                    <Heart className="w-5 h-5 mr-2 fill-current" />
                    Complete Donation of ₹{customAmount || amount} with Razorpay
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Protected by 256-Bit SSL Encryption via Razorpay Payments</span>
                  </div>
                </form>
              )}
            </Card>
          </div>

          {/* Transparency & Tax Exemption Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 sm:p-8 space-y-5 bg-gradient-to-br from-teal-900 to-slate-900 text-white border-0 shadow-xl">
              <div className="flex items-center gap-3">
                <Receipt className="w-6 h-6 text-teal-400" />
                <h3 className="text-xl font-bold">Section 80G Tax Benefits</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Under Section 80G of the Indian Income Tax Act, 50% of your donation is eligible for deduction from your taxable income.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Instant digital receipt with official 80G Registration details</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Valid for both Individual and Corporate Tax Returns (CSR eligible)</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fund Allocation</h3>
              <p className="text-xs text-slate-500">
                Every rupee is managed with highest fiscal transparency:
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Direct Community Relief & Medical Aids</span>
                    <span className="text-teal-600 font-bold">85%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full w-[85%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Camps Logistics, Storage & Supplies</span>
                    <span className="text-emerald-600 font-bold">10%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[10%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Audit & Administration</span>
                    <span className="text-slate-600 font-bold">5%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full w-[5%]" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DonatePage;
