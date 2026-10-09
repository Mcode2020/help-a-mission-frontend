export interface Campaign {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  goalAmount: number;
  raisedAmount: number;
  donorsCount: number;
  isUrgent?: boolean;
  status: 'active' | 'completed';
  progressPercent: number;
  image?: string;
}

export interface DonationOrderResponse {
  donationId: string;
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  simulated: boolean;
}

export interface DonationReceipt {
  receiptNumber: string;
  donorName: string;
  email: string;
  amount: number;
  frequency: string;
  paymentId: string;
  date: string;
  certificate80G: string;
  organization: string;
}

export interface VolunteerFormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  skills: string;
  availability: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  status: string;
  lastLoginAt?: string | null;
  createdAt?: string;
}

export interface LoginPayload {
  identifier: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    token: string;
    expiresAt: string;
  };
}


export interface Member {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  title: string;
  description?: string | null;
  image_url?: string | null;
  imageUrl?: string | null;
  image?: string | null;
  status: 'published' | 'draft';
  sort_order?: number;
  created_at?: string;
}

export * from './cms';


