import type { Campaign, TeamMember, ImpactStory } from '../data/ngoData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Generic API fetch helper with automatic error handling
 */
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      ...options
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Server request failed' }));
      throw new Error(errorData.message || `HTTP ${res.status}`);
    }

    const json = await res.json();
    return json.data ?? json;
  } catch (error) {
    console.warn(`API call to ${endpoint} failed, falling back to local state:`, error);
    return null;
  }
}

// ----------------------------------------------------
// Campaigns API
// ----------------------------------------------------
export async function getCampaignsFromApi(): Promise<Campaign[] | null> {
  return fetchApi<Campaign[]>('/campaigns');
}

export async function getCampaignByIdFromApi(id: string): Promise<Campaign | null> {
  return fetchApi<Campaign>(`/campaigns/${id}`);
}

// ----------------------------------------------------
// Donations API
// ----------------------------------------------------
export interface DonationPayload {
  donorName?: string;
  email: string;
  phone?: string;
  amount: number;
  campaignId?: string;
  panNumber?: string;
  isAnonymous?: boolean;
  paymentMethod?: string;
  requires80G?: boolean;
}

export async function submitDonationApi(payload: DonationPayload) {
  const response = await fetch(`${API_BASE_URL}/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return response.json();
}

// ----------------------------------------------------
// Contact & Inquiries API
// ----------------------------------------------------
export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export async function submitContactFormApi(payload: ContactPayload) {
  const response = await fetch(`${API_BASE_URL}/inquiries/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return response.json();
}

export interface VolunteerPayload {
  name: string;
  email: string;
  phone: string;
  age?: number;
  occupation?: string;
  skills: string[];
  motivation?: string;
  availability?: string;
}

export async function submitVolunteerFormApi(payload: VolunteerPayload) {
  const response = await fetch(`${API_BASE_URL}/inquiries/volunteer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return response.json();
}

// ----------------------------------------------------
// Team & Impact API
// ----------------------------------------------------
export async function getTeamFromApi(): Promise<TeamMember[] | null> {
  return fetchApi<TeamMember[]>('/team');
}

export async function getImpactFromApi(): Promise<{ stories: ImpactStory[] } | null> {
  return fetchApi<{ stories: ImpactStory[] }>('/impact');
}
