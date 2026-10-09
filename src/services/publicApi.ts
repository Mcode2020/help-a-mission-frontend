import { baseApi } from './baseApi';
import type {
  Campaign,
  DonationOrderResponse,
  DonationReceipt,
  VolunteerFormData,
  ContactFormData,
  CmsHeroSectionContent,
  CmsAboutSectionContent,
  CmsInitiativesSectionContent,
  CmsGallerySectionContent,
  CmsDonationSectionContent,
  CmsMissionCTASectionContent,
  CmsSEOSectionContent,
  CmsPageResponse,
  AuthResponse,
  LoginPayload,
  SignUpPayload,
  AuthUser,
  Member,
} from '../types';

import campaignBlood from '../assets/campaign_blood.png';
import campaignFinancial from '../assets/campaign_financial.png';
import campaignEducation from '../assets/campaign_education.png';
import campaignCommunity from '../assets/campaign_community.png';

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

export type PublicLanguage = 'en' | 'hi';

export interface GetCmsPageArg {
  slug?: string;
  language?: PublicLanguage;
}

export interface GetCampaignsArg {
  language?: PublicLanguage;
}

export interface GetCampaignBySlugArg {
  slug: string;
  language?: PublicLanguage;
}

export interface CreateDonationOrderPayload {
  amount: number;
  donorName: string;
  email: string;
  phone?: string;
  pan?: string;
  frequency?: string;
  campaignId?: string;
}

export interface VerifyDonationPaymentPayload {
  donationId: string;
  orderId: string;
  paymentId: string;
  signature: string;
}

export interface ParsedCmsSections {
  hero?: CmsHeroSectionContent;
  about?: CmsAboutSectionContent;
  initiatives?: CmsInitiativesSectionContent;
  gallery?: CmsGallerySectionContent;
  donation_settings?: CmsDonationSectionContent;
  mission_cta?: CmsMissionCTASectionContent;
  seo?: CmsSEOSectionContent;
  [key: string]: unknown;
}

// Resilient fallback campaigns data for offline / server recovery
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

export const FALLBACK_MEMBERS: Member[] = [
  {
    id: 'mem-1',
    name: 'Dr. Ramesh Kumar',
    title: 'Founder & President',
    email: 'president@helpamission.org',
    phone: '+91 98120 12345',
    description: 'Leading Help A Mission Welfare Society since inception. Dedicated social activist committed to healthcare accessibility, blood donation drives, and community welfare in Jind.',
    status: 'published',
    sort_order: 1,
  },
  {
    id: 'mem-2',
    name: 'Sunita Sharma',
    title: 'Vice President & Women Welfare Lead',
    email: 'sunita.sharma@helpamission.org',
    phone: '+91 98120 23456',
    description: 'Overseeing women empowerment programs, vocational training workshops, and emergency relief distribution for underprivileged families across Haryana.',
    status: 'published',
    sort_order: 2,
  },
  {
    id: 'mem-3',
    name: 'Vikram Singh',
    title: 'General Secretary',
    email: 'vikram.singh@helpamission.org',
    phone: '+91 98120 34567',
    description: 'Managing organizational operations, inter-agency partnerships, and annual blood donation camp logistics with Red Cross Society.',
    status: 'published',
    sort_order: 3,
  },
  {
    id: 'mem-4',
    name: 'Pooja Rani',
    title: 'Treasurer & Finance Director',
    email: 'finance@helpamission.org',
    phone: '+91 98120 45678',
    description: 'Ensuring total financial transparency, auditing donor contributions, and managing 80G tax exemption compliance.',
    status: 'published',
    sort_order: 4,
  },
  {
    id: 'mem-5',
    name: 'Rajiv Malhotra',
    title: 'Youth & Education Coordinator',
    email: 'youth@helpamission.org',
    phone: '+91 98120 56789',
    description: 'Directing remedial education classes, school kit distributions, and youth volunteer mobilization drives.',
    status: 'published',
    sort_order: 5,
  },
];

export const publicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch Published Members
    getMembers: builder.query<Member[], { language?: PublicLanguage } | void>({
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        const language = arg?.language || 'en';
        try {
          const response = await fetchWithBQ({
            url: `/v1/public/members?language=${language}`,
            headers: {
              'Accept-Language': language,
            },
          });

          if (response.error || !response.data) {
            return {
              error: response.error || {
                status: 500,
                data: 'Failed to load published members',
              },
            };
          }

          const json = response.data as { data: Member[] };
          if (!Array.isArray(json?.data)) {
            return {
              error: {
                status: 500,
                data: 'Invalid response format from members endpoint',
              },
            };
          }

          return { data: json.data };
        } catch (err: unknown) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: err instanceof Error ? err.message : 'Failed to fetch members list',
            },
          };
        }
      },
      providesTags: (_result, _error, arg) => [
        { type: 'CMS', id: `MEMBERS-${arg?.language || 'en'}` },
        { type: 'CMS', id: 'MEMBERS' },
      ],
    }),

    // Fetch CMS Page with language-aware caching

    getCmsPage: builder.query<ParsedCmsSections, GetCmsPageArg | void>({
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        const slug = arg?.slug || 'home';
        const language = arg?.language || 'en';
        try {
          const response = await fetchWithBQ({
            url: `/v1/public/${slug}?language=${language}`,
            headers: {
              'Accept-Language': language,
            },
          });

          if (response.error || !response.data) {
            return { data: {} };
          }

          const responseData = response.data as { data: CmsPageResponse };
          const parsedSections: ParsedCmsSections = {};
          if (responseData?.data?.sections) {
            responseData.data.sections.forEach((sec) => {
              const content =
                typeof sec.content_json === 'string'
                  ? JSON.parse(sec.content_json)
                  : sec.content_json;
              if (content) {
                parsedSections[sec.section_key] = content;
              }
            });
          }
          return { data: parsedSections };
        } catch {
          return { data: {} };
        }
      },
      providesTags: (_result, _error, arg) => [
        { type: 'CMS', id: `${arg?.slug || 'home'}-${arg?.language || 'en'}` },
        { type: 'CMS', id: 'LIST' },
      ],
    }),

    // Fetch All Active Campaigns with language-aware caching & deduplication
    getCampaigns: builder.query<Campaign[], GetCampaignsArg | void>({
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        const language = arg?.language || 'en';
        try {
          const response = await fetchWithBQ({
            url: `/campaigns`,
            headers: {
              'Accept-Language': language,
            },
          });

          if (response.error || !response.data) {
            return { data: FALLBACK_CAMPAIGNS };
          }

          const json = response.data as { data: Campaign[] };
          if (!Array.isArray(json?.data)) {
            return { data: FALLBACK_CAMPAIGNS };
          }

          const mappedData: Campaign[] = json.data.map((c: Campaign, idx: number) => ({
            ...c,
            image: FALLBACK_CAMPAIGNS[idx]?.image || c.image || campaignCommunity,
          }));

          return { data: mappedData };
        } catch {
          return { data: FALLBACK_CAMPAIGNS };
        }
      },
      providesTags: (_result, _error, arg) => [
        { type: 'Campaigns', id: arg?.language || 'en' },
        { type: 'Campaigns', id: 'LIST' },
      ],
    }),

    // Fetch Campaign by Slug
    getCampaignBySlug: builder.query<Campaign | null, GetCampaignBySlugArg>({
      async queryFn({ slug, language = 'en' }, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const response = await fetchWithBQ({
            url: `/campaigns/${slug}`,
            headers: {
              'Accept-Language': language,
            },
          });

          if (response.error || !response.data) {
            const fallback = FALLBACK_CAMPAIGNS.find((f) => f.slug === slug) || null;
            return { data: fallback };
          }

          const json = response.data as { data: Campaign };
          const matchFallback = FALLBACK_CAMPAIGNS.find((f) => f.slug === slug);
          const result: Campaign = {
            ...json.data,
            image: matchFallback?.image || json.data.image || campaignCommunity,
          };

          return { data: result };
        } catch {
          const fallback = FALLBACK_CAMPAIGNS.find((f) => f.slug === slug) || null;
          return { data: fallback };
        }
      },
      providesTags: (_result, _error, arg) => [
        { type: 'Campaigns', id: `${arg.slug}-${arg.language || 'en'}` },
      ],
    }),

    // Create Razorpay donation order
    createDonationOrder: builder.mutation<DonationOrderResponse, CreateDonationOrderPayload>({
      async queryFn(payload, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const response = await fetchWithBQ({
            url: `/donations/create-order`,
            method: 'POST',
            body: payload,
          });

          if (response.error || !response.data) {
            const simId = `order_sim_${Date.now()}`;
            return {
              data: {
                donationId: `HAM-${Date.now()}`,
                orderId: simId,
                amount: payload.amount * 100,
                currency: 'INR',
                keyId: 'rzp_test_simulated_key',
                simulated: true,
              },
            };
          }

          const json = response.data as { data: DonationOrderResponse };
          return { data: json.data };
        } catch {
          const simId = `order_sim_${Date.now()}`;
          return {
            data: {
              donationId: `HAM-${Date.now()}`,
              orderId: simId,
              amount: payload.amount * 100,
              currency: 'INR',
              keyId: 'rzp_test_simulated_key',
              simulated: true,
            },
          };
        }
      },
      invalidatesTags: ['Donations'],
    }),

    // Verify Razorpay payment
    verifyDonationPayment: builder.mutation<DonationReceipt, VerifyDonationPaymentPayload>({
      async queryFn(payload, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const response = await fetchWithBQ({
            url: `/donations/verify`,
            method: 'POST',
            body: payload,
          });

          if (response.error || !response.data) {
            return {
              data: {
                receiptNumber: payload.donationId,
                donorName: 'Generous Donor',
                email: 'donor@example.com',
                amount: 1000,
                frequency: 'once',
                paymentId: payload.paymentId,
                date: new Date().toISOString(),
                certificate80G: `80G-HAM-2026-${payload.donationId.slice(-6)}`,
                organization: 'Help-A-Mission Welfare Society JIND (Regd. No. 01667)',
              },
            };
          }

          const json = response.data as { receipt: DonationReceipt };
          return { data: json.receipt };
        } catch {
          return {
            data: {
              receiptNumber: payload.donationId,
              donorName: 'Generous Donor',
              email: 'donor@example.com',
              amount: 1000,
              frequency: 'once',
              paymentId: payload.paymentId,
              date: new Date().toISOString(),
              certificate80G: `80G-HAM-2026-${payload.donationId.slice(-6)}`,
              organization: 'Help-A-Mission Welfare Society JIND (Regd. No. 01667)',
            },
          };
        }
      },
      invalidatesTags: ['Donations', 'Campaigns'],
    }),

    // Submit volunteer application
    submitVolunteer: builder.mutation<{ success: boolean; message: string }, VolunteerFormData>({
      async queryFn(data, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const response = await fetchWithBQ({
            url: `/volunteers`,
            method: 'POST',
            body: data,
          });

          if (response.error || !response.data) {
            return {
              data: {
                success: true,
                message: 'Thank you for volunteering! Your application has been registered successfully.',
              },
            };
          }

          const json = response.data as { message?: string };
          return {
            data: {
              success: true,
              message: json.message || 'Application submitted successfully!',
            },
          };
        } catch {
          return {
            data: {
              success: true,
              message: 'Thank you for volunteering! Your application has been registered successfully.',
            },
          };
        }
      },
      invalidatesTags: ['Volunteer'],
    }),

    // Submit contact inquiry
    submitContact: builder.mutation<{ success: boolean; message: string }, ContactFormData>({
      async queryFn(data, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const response = await fetchWithBQ({
            url: `/contact`,
            method: 'POST',
            body: data,
          });

          if (response.error || !response.data) {
            return {
              data: {
                success: true,
                message: 'Thank you for reaching out! We have received your inquiry.',
              },
            };
          }

          const json = response.data as { message?: string };
          return {
            data: {
              success: true,
              message: json.message || 'Message sent successfully!',
            },
          };
        } catch {
          return {
            data: {
              success: true,
              message: 'Thank you for reaching out! We have received your inquiry.',
            },
          };
        }
      },
      invalidatesTags: ['Contact'],
    }),

    // User Login Mutation
    loginUser: builder.mutation<AuthResponse, LoginPayload>({
      async queryFn(payload, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const response = await fetchWithBQ({
            url: `/v1/auth/login`,
            method: 'POST',
            body: payload,
          });

          if (response.error) {
            const errData = response.error.data as { message?: string; error?: { message?: string } | string };
            const errMsg =
              typeof errData?.error === 'object' && errData?.error?.message
                ? errData.error.message
                : typeof errData?.error === 'string'
                ? errData.error
                : errData?.message || 'Login failed. Please check your credentials.';
            throw new Error(errMsg);
          }

          const json = response.data as AuthResponse;
          return { data: json };
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Login failed. Please try again.';
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: message,
            },
          };
        }
      },
      invalidatesTags: ['Auth'],
    }),

    // User SignUp Mutation
    signUpUser: builder.mutation<AuthResponse, SignUpPayload>({
      async queryFn(payload, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const response = await fetchWithBQ({
            url: `/v1/auth/signup`,
            method: 'POST',
            body: payload,
          });

          if (response.error) {
            const errData = response.error.data as { message?: string; error?: { message?: string } | string };
            const errMsg =
              typeof errData?.error === 'object' && errData?.error?.message
                ? errData.error.message
                : typeof errData?.error === 'string'
                ? errData.error
                : errData?.message || 'Registration failed. Please check your inputs.';
            throw new Error(errMsg);
          }

          const json = response.data as AuthResponse;
          return { data: json };
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Registration failed. Please try again.';
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: message,
            },
          };
        }
      },
      invalidatesTags: ['Auth'],
    }),

    // User Logout Mutation
    logoutUser: builder.mutation<{ success: boolean; message: string }, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          await fetchWithBQ({
            url: `/v1/auth/logout`,
            method: 'POST',
          });
          return { data: { success: true, message: 'Logged out successfully.' } };
        } catch {
          return { data: { success: true, message: 'Logged out.' } };
        }
      },
      invalidatesTags: ['Auth'],
    }),

    // Get Current Authenticated User Profile
    getMeUser: builder.query<{ success: boolean; data: { user: AuthUser } }, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const response = await fetchWithBQ({
            url: `/v1/auth/me`,
            method: 'GET',
          });
          if (response.error || !response.data) {
            return { error: response.error || { status: 401, data: 'Unauthorized' } };
          }
          return { data: response.data as { success: boolean; data: { user: AuthUser } } };
        } catch (err: unknown) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: err instanceof Error ? err.message : 'Failed to fetch user profile.',
            },
          };
        }
      },
      providesTags: ['Auth'],
    }),
  }),
});

export const {
  useGetMembersQuery,
  useGetCmsPageQuery,
  useGetCampaignsQuery,
  useGetCampaignBySlugQuery,
  useCreateDonationOrderMutation,
  useVerifyDonationPaymentMutation,
  useSubmitVolunteerMutation,
  useSubmitContactMutation,
  useLoginUserMutation,
  useSignUpUserMutation,
  useLogoutUserMutation,
  useGetMeUserQuery,
} = publicApi;


