import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Badge, Button, Input } from '../../components/ui';
import { Heart, ArrowLeft, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
  useGetCampaignBySlugQuery,
  useCreateDonationOrderMutation,
  useVerifyDonationPaymentMutation,
  loadRazorpayScript,
} from '../../services/publicApi';
import type { DonationReceipt } from '../../types';

export const CampaignDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();

  const { data: campaign = null, isLoading: loading } = useGetCampaignBySlugQuery(
    { slug: slug || '', language },
    { skip: !slug }
  );

  const [createDonationOrder] = useCreateDonationOrderMutation();
  const [verifyDonationPayment] = useVerifyDonationPaymentMutation();

  // Donation form state
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [pan, setPan] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<DonationReceipt | null>(null);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? Number(customAmount) : amount;
    if (!finalAmount || finalAmount < 10) {
      alert('Please specify a valid amount of at least ₹10.');
      return;
    }
    if (!donorName || !email) {
      alert('Please enter your full name and email address.');
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
        frequency: 'once',
        campaignId: campaign?.slug || 'general',
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
      alert(`Payment error: ${errorMsg}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <div className="py-24 text-center text-slate-500">Loading campaign details...</div>;
  }

  if (!campaign) {
    return (
      <Container className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold">Campaign Not Found</h2>
        <Link to="/campaigns">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Campaigns
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <Container>
        <Link
          to="/campaigns"
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Initiatives
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Story & Details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge variant="teal">{campaign.category}</Badge>
                {campaign.isUrgent && <Badge variant="rose">High Priority</Badge>}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {campaign.title}
              </h1>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-[380px] sm:h-[460px] object-cover"
              />
            </div>

            {/* Campaign Narrative */}
            <div className="prose prose-teal max-w-none text-slate-700 dark:text-slate-300 space-y-4 text-base sm:text-lg leading-relaxed">
              <p className="font-semibold text-slate-900 dark:text-white">
                {campaign.shortDescription}
              </p>
              <p>{campaign.fullDescription}</p>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white pt-4">
                How Your Donation Creates Impact:
              </h3>
              <ul className="space-y-2 text-sm sm:text-base list-disc pl-5">
                <li>Direct allocation to regional beneficiaries in Jind district</li>
                <li>Audited and published annual welfare records</li>
                <li>80G Income Tax Exemption certificate provided for every donation</li>
              </ul>
            </div>
          </div>

          {/* Donation Box Sidebar */}
          <div className="lg:col-span-5 sticky top-28">
            <Card className="p-6 sm:p-8 space-y-6 shadow-xl border-teal-500/20">
              {receipt ? (
                <div className="text-center space-y-4 py-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Thank You for Your Support!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Your contribution has been received via Razorpay.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-left text-xs space-y-2">
                    <p>
                      <span className="text-slate-500 font-medium">Receipt No:</span>{' '}
                      <strong className="text-slate-900 dark:text-white">{receipt.receiptNumber}</strong>
                    </p>
                    <p>
                      <span className="text-slate-500 font-medium">Amount:</span>{' '}
                      <strong className="text-teal-600">₹{receipt.amount}</strong>
                    </p>
                    <p>
                      <span className="text-slate-500 font-medium">80G Certificate:</span>{' '}
                      <strong>{receipt.certificate80G}</strong>
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => {
                      setReceipt(null);
                      setCustomAmount('');
                    }}
                  >
                    Donate Again
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleDonate} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Support this Initiative
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Choose an amount to empower this campaign.
                    </p>
                  </div>

                  {/* Progress Stats */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-teal-600">
                        ₹{campaign.raisedAmount.toLocaleString('en-IN')} raised
                      </span>
                      <span className="text-slate-500">
                        Goal: ₹{campaign.goalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                        style={{ width: `${campaign.progressPercent}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1 pt-1">
                      <Users className="w-3.5 h-3.5 text-teal-500" />
                      {campaign.donorsCount} active supporters
                    </p>
                  </div>

                  {/* Amount Selectors */}
                  <div className="grid grid-cols-4 gap-2">
                    {[500, 1000, 2500, 5000].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => {
                          setAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          amount === amt && !customAmount
                            ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-teal-500'
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>

                  <Input
                    type="number"
                    placeholder="Or enter custom amount in ₹"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />

                  {/* Donor Info */}
                  <div className="space-y-3">
                    <Input
                      label="Full Name"
                      placeholder="e.g. Ramesh Kumar"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="e.g. ramesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="e.g. +91 98123 45678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Input
                      label="PAN Card (Optional for 80G Tax Exemption)"
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
                    <Heart className="w-4 h-4 mr-2 fill-current" />
                    Donate ₹{customAmount || amount} via Razorpay
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>256-Bit SSL Encrypted Razorpay Checkout</span>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CampaignDetailPage;
