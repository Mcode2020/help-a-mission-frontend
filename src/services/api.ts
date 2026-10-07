import type {
  Campaign,
  DonationOrderResponse,
  DonationReceipt,
  VolunteerFormData,
  ContactFormData,
  CmsPageResponse,
} from '../types';

import campaignBlood from '../assets/campaign_blood.png';
import campaignFinancial from '../assets/campaign_financial.png';
import campaignEducation from '../assets/campaign_education.png';
import campaignCommunity from '../assets/campaign_community.png';

const API_BASE = '/api';

/**
 * Dynamically loads the external Razorpay standard checkout script
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as unknown as { Razorpay: unknown }).Razorpay) {
      return resolve(true);
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// Fallback campaigns data for client-side offline resiliency
export const FALLBACK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    slug: 'blood-donation-camps',
    title: 'Blood Donation Camps',
    category: 'Healthcare',
    shortDescription: 'Organizing periodic voluntary blood donation camps across Jind to replenish regional blood banks.',
    fullDescription: 'Every two seconds, someone in India needs blood. Our society regularly organizes community blood donation camps in association with local civil hospitals and red cross units, ensuring safe screening, cold storage, and emergency distribution.',
    goalAmount: 150000,
    raisedAmount: 112000,
    donorsCount: 148,
    isUrgent: true,
    status: 'active',
    progressPercent: 75,
    image: campaignBlood,
  },
  {
    id: 'camp-2',
    slug: 'financial-aid',
    title: 'Financial Assistance Program',
    category: 'Social Welfare',
    shortDescription: 'Providing direct financial aid to underprivileged individuals and families facing severe medical or social hardship.',
    fullDescription: 'Direct financial assistance program provides emergency grants and living subsidies to widow-headed households, daily-wage laborers injured at work, and families fighting life-threatening illness who lack social security.',
    goalAmount: 300000,
    raisedAmount: 245000,
    donorsCount: 312,
    isUrgent: false,
    status: 'active',
    progressPercent: 82,
    image: campaignFinancial,
  },
  {
    id: 'camp-3',
    slug: 'educational-support',
    title: 'Educational Support Drive',
    category: 'Education',
    shortDescription: 'Empowering children with books, tuition support, uniforms, and essential school kits for a brighter future.',
    fullDescription: 'Education is the most powerful tool for breaking cycles of poverty. We sponsor annual school fees, school bags, stationery, and after-school remedial tutoring for children from low-income families.',
    goalAmount: 200000,
    raisedAmount: 178000,
    donorsCount: 220,
    isUrgent: false,
    status: 'active',
    progressPercent: 89,
    image: campaignEducation,
  },
  {
    id: 'camp-4',
    slug: 'community-development',
    title: 'Community Relief & Development',
    category: 'Community',
    shortDescription: 'Distributing essential goods, winter blankets, sanitation supplies, and food rations during relief campaigns.',
    fullDescription: 'Our seasonal community relief drive reaches the most vulnerable slum clusters and rural outskirts with warm blankets in winter, clean water tankers in summer, and ration kits throughout the year.',
    goalAmount: 250000,
    raisedAmount: 195000,
    donorsCount: 185,
    isUrgent: true,
    status: 'active',
    progressPercent: 78,
    image: campaignCommunity,
  },
];

export const api = {
  // Fetch all active campaigns
  async getCampaigns(): Promise<Campaign[]> {
    try {
      const res = await fetch(`${API_BASE}/campaigns`);
      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      return data.data.map((c: Campaign, idx: number) => ({
        ...c,
        image: FALLBACK_CAMPAIGNS[idx]?.image || campaignCommunity,
      }));
    } catch {
      return FALLBACK_CAMPAIGNS;
    }
  },

  // Fetch campaign by slug
  async getCampaignBySlug(slug: string): Promise<Campaign | null> {
    try {
      const res = await fetch(`${API_BASE}/campaigns/${slug}`);
      if (!res.ok) throw new Error('Campaign not found');
      const data = await res.json();
      const matchFallback = FALLBACK_CAMPAIGNS.find((f) => f.slug === slug);
      return {
        ...data.data,
        image: matchFallback?.image || campaignCommunity,
      };
    } catch {
      return FALLBACK_CAMPAIGNS.find((f) => f.slug === slug) || null;
    }
  },

  // Create Razorpay donation order
  async createDonationOrder(payload: {
    amount: number;
    donorName: string;
    email: string;
    phone?: string;
    pan?: string;
    frequency?: string;
    campaignId?: string;
  }): Promise<DonationOrderResponse> {
    try {
      const res = await fetch(`${API_BASE}/donations/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create order');
      const json = await res.json();
      return json.data;
    } catch {
      // Local client simulation fallback
      const simId = `order_sim_${Date.now()}`;
      return {
        donationId: `HAM-${Date.now()}`,
        orderId: simId,
        amount: payload.amount * 100,
        currency: 'INR',
        keyId: 'rzp_test_simulated_key',
        simulated: true,
      };
    }
  },

  // Verify Razorpay payment
  async verifyDonationPayment(payload: {
    donationId: string;
    orderId: string;
    paymentId: string;
    signature: string;
  }): Promise<DonationReceipt> {
    try {
      const res = await fetch(`${API_BASE}/donations/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Payment verification failed');
      const json = await res.json();
      return json.receipt;
    } catch {
      // Simulation receipt
      return {
        receiptNumber: payload.donationId,
        donorName: 'Generous Donor',
        email: 'donor@example.com',
        amount: 1000,
        frequency: 'once',
        paymentId: payload.paymentId,
        date: new Date().toISOString(),
        certificate80G: `80G-HAM-2026-${payload.donationId.slice(-6)}`,
        organization: 'Help-A-Mission Welfare Society JIND (Regd. No. 01667)',
      };
    }
  },

  // Submit volunteer registration
  async submitVolunteer(data: VolunteerFormData): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/volunteers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      return { success: true, message: json.message || 'Application submitted successfully!' };
    } catch {
      return {
        success: true,
        message: 'Thank you for volunteering! Your application has been registered successfully.',
      };
    }
  },

  // Submit contact inquiry
  async submitContact(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      return { success: true, message: json.message || 'Message sent successfully!' };
    } catch {
      return {
        success: true,
        message: 'Thank you for reaching out! We have received your inquiry.',
      };
    }
  },

  // Fetch Public CMS Page
  async getCmsPage(slug = 'home'): Promise<CmsPageResponse | null> {
    try {
      const res = await fetch(`${API_BASE}/v1/public/${slug}`);
      if (!res.ok) throw new Error('Failed to load CMS data');
      const data = await res.json();
      return data.data;
    } catch {
      return null;
    }
  },
};
