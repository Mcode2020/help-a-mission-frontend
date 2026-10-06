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
