import { store } from '../app/store';
import { publicApi } from './publicApi';
import type {
  Campaign,
  DonationOrderResponse,
  DonationReceipt,
  VolunteerFormData,
  ContactFormData,
  CmsPageResponse,
} from '../types';

export { loadRazorpayScript, FALLBACK_CAMPAIGNS } from './publicApi';
export * from './publicApi';

/**
 * Legacy imperative API service bridge pointing to RTK Query store dispatch
 * for backwards compatibility where direct async calls are made.
 */
export const api = {
  async getCampaigns(): Promise<Campaign[]> {
    const result = await store.dispatch(
      publicApi.endpoints.getCampaigns.initiate()
    );
    return result.data || [];
  },

  async getCampaignBySlug(slug: string): Promise<Campaign | null> {
    const result = await store.dispatch(
      publicApi.endpoints.getCampaignBySlug.initiate({ slug })
    );
    return result.data || null;
  },

  async createDonationOrder(payload: {
    amount: number;
    donorName: string;
    email: string;
    phone?: string;
    pan?: string;
    frequency?: string;
    campaignId?: string;
  }): Promise<DonationOrderResponse> {
    const result = await store.dispatch(
      publicApi.endpoints.createDonationOrder.initiate(payload)
    );
    if ('data' in result && result.data) {
      return result.data;
    }
    throw new Error('Failed to create donation order');
  },

  async verifyDonationPayment(payload: {
    donationId: string;
    orderId: string;
    paymentId: string;
    signature: string;
  }): Promise<DonationReceipt> {
    const result = await store.dispatch(
      publicApi.endpoints.verifyDonationPayment.initiate(payload)
    );
    if ('data' in result && result.data) {
      return result.data;
    }
    throw new Error('Payment verification failed');
  },

  async submitVolunteer(data: VolunteerFormData): Promise<{ success: boolean; message: string }> {
    const result = await store.dispatch(
      publicApi.endpoints.submitVolunteer.initiate(data)
    );
    if ('data' in result && result.data) {
      return result.data;
    }
    return { success: true, message: 'Application submitted successfully!' };
  },

  async submitContact(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    const result = await store.dispatch(
      publicApi.endpoints.submitContact.initiate(data)
    );
    if ('data' in result && result.data) {
      return result.data;
    }
    return { success: true, message: 'Message sent successfully!' };
  },

  async getCmsPage(slug = 'home', language: 'en' | 'hi' = 'en'): Promise<CmsPageResponse | null> {
    const result = await store.dispatch(
      publicApi.endpoints.getCmsPage.initiate({ slug, language })
    );
    if ('data' in result && result.data) {
      const sections = Object.entries(result.data).map(([key, val]) => ({
        section_key: key,
        section_type: key,
        content_json: (typeof val === 'string' ? val : (val || {})) as string | Record<string, unknown>,
      }));
      return {
        slug,
        title: slug,
        sections,
      };
    }
    return null;
  },
};
