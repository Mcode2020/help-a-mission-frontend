export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  qualification?: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Campaign {
  id: string;
  title: string;
  category: 'Education' | 'Healthcare' | 'Hunger Relief' | 'Disaster Relief' | 'Women Empowerment';
  summary: string;
  fullStory: string;
  targetAmount: number;
  raisedAmount: number;
  donorsCount: number;
  daysLeft: number;
  image: string;
  urgent?: boolean;
  featured?: boolean;
  budgetBreakdown: { item: string; amount: number }[];
}

export interface ImpactStory {
  id: string;
  title: string;
  category: 'Education' | 'Healthcare' | 'Community' | 'Financial Support';
  beneficiary: string;
  location: string;
  before: string;
  after: string;
  image: string;
  quote: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Tax Benefits' | 'Volunteering' | 'Donations';
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Sh. Rajesh Verma',
    role: 'Founder & President',
    bio: 'Dedicated social worker with over 15 years of grassroots community service in Haryana, specializing in youth education and rural upliftment.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    qualification: 'M.A. Social Work'
  },
  {
    id: '2',
    name: 'Dr. Anita Sharma',
    role: 'Vice President & Health Director',
    bio: 'Public health strategist driving rural medical camps, mobile clinic outreach, and child nutrition programs across Jind district.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    qualification: 'MBBS, MD'
  },
  {
    id: '3',
    name: 'Er. Amit Kumar',
    role: 'General Secretary',
    bio: 'Manages field operations, volunteer coordination, legal compliance, and digital transparency infrastructure for the society.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    qualification: 'B.Tech, MBA'
  },
  {
    id: '4',
    name: 'Sunita Rani',
    role: 'Women Empowerment Lead',
    bio: 'Pioneer of self-help vocational centers providing sewing, computer literacy, and financial independence training to rural women.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    qualification: 'B.Ed'
  }
];

export const MILESTONES: Milestone[] = [
  {
    year: '2018',
    title: 'Society Foundation',
    description: 'Registered under Society Registration Act (Regd No. 01667) with 15 passionate founding volunteers.',
    iconName: 'Building'
  },
  {
    year: '2020',
    title: 'COVID-19 Relief Mobilization',
    description: 'Distributed 50,000+ cooked meal packets and 10,000 hygiene kits to migrant workers and daily wagers.',
    iconName: 'ShieldAlert'
  },
  {
    year: '2022',
    title: 'Shiksha Mission Schools',
    description: 'Launched 5 after-school learning support centers for underprivileged children in rural Jind villages.',
    iconName: 'GraduationCap'
  },
  {
    year: '2024',
    title: '80G Tax Exemption & Mobile Health Unit',
    description: 'Granted 80G tax benefit status; deployed mobile healthcare vans equipped with basic diagnostic labs.',
    iconName: 'HeartPulse'
  },
  {
    year: '2026',
    title: 'Digital Empowerment & Expansion',
    description: 'Expanding reach across Haryana with automated donation tracking, transparent audits, and skill academies.',
    iconName: 'Globe'
  }
];

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Educate 500 Rural Children in Haryana',
    category: 'Education',
    summary: 'Providing tuition, textbooks, digital tabs, and nutritious mid-day snacks to children in remote villages.',
    fullStory: 'Thousands of children in rural Jind lack access to quality supplementary education and learning tools. Our Shiksha Mission establishes evening study centers equipped with qualified tutors, digital learning devices, stationery, and daily nutritional snacks to prevent school dropouts and foster academic excellence.',
    targetAmount: 500000,
    raisedAmount: 375000,
    donorsCount: 240,
    daysLeft: 18,
    image: '/src/assets/campaign_education.jpg',
    urgent: true,
    featured: true,
    budgetBreakdown: [
      { item: 'Books & Learning Kits', amount: 150000 },
      { item: 'Teacher Honorariums', amount: 200000 },
      { item: 'Nutritional Snacks', amount: 100000 },
      { item: 'Digital Tab Supplies', amount: 50000 }
    ]
  },
  {
    id: 'camp-2',
    title: 'Blood Donation Drives & Emergency Health Camps',
    category: 'Healthcare',
    summary: 'Organizing quarterly blood donation drives and free medical checkup camps in underserved blocks.',
    fullStory: 'Access to safe blood supplies during emergency surgeries and maternal deliveries is a critical challenge in rural hospitals. Help-A-Mission Society organizes voluntary blood donation camps in partnership with district blood banks, providing health screenings, medicines, and emergency donor matching.',
    targetAmount: 300000,
    raisedAmount: 220000,
    donorsCount: 165,
    daysLeft: 25,
    image: '/src/assets/campaign_blood.jpg',
    urgent: false,
    featured: true,
    budgetBreakdown: [
      { item: 'Camp Equipment & Supplies', amount: 80000 },
      { item: 'Free Prescription Medicines', amount: 120000 },
      { item: 'Doctor Honorarium & Transport', amount: 60000 },
      { item: 'Donor Refreshments & Certificates', amount: 40000 }
    ]
  },
  {
    id: 'camp-3',
    title: 'Community Food Bank & Malnutrition Relief',
    category: 'Hunger Relief',
    summary: 'Ensuring zero hunger for vulnerable elderly, widows, and homeless individuals through daily food drives.',
    fullStory: 'Our Anna Seva program serves fresh, hygienic, balanced meals daily to destitute senior citizens and daily wagers. We also supply monthly ration kits (wheat flour, pulses, cooking oil, rice) to families facing acute economic distress.',
    targetAmount: 400000,
    raisedAmount: 310000,
    donorsCount: 198,
    daysLeft: 12,
    image: '/src/assets/campaign_community.jpg',
    urgent: true,
    featured: true,
    budgetBreakdown: [
      { item: 'Monthly Ration Kits (200 families)', amount: 240000 },
      { item: 'Community Kitchen Fuel & Logistics', amount: 100000 },
      { item: 'Storage & Packaging', amount: 60000 }
    ]
  },
  {
    id: 'camp-4',
    title: 'Financial Aid & Skill Center for Widows & Women',
    category: 'Women Empowerment',
    summary: 'Setting up industrial sewing machines and computer skill centers to generate sustainable livelihoods.',
    fullStory: 'Empowering marginalized women and young girls with market-aligned vocational skills. We conduct 3-month certified courses in tailoring, handicrafts, basic IT, and micro-entrepreneurship, enabling them to earn dignified independent incomes.',
    targetAmount: 350000,
    raisedAmount: 185000,
    donorsCount: 112,
    daysLeft: 30,
    image: '/src/assets/campaign_financial.jpg',
    urgent: false,
    featured: false,
    budgetBreakdown: [
      { item: '10 Sewing Machines & Toolkits', amount: 120000 },
      { item: 'Computer Workstations (5 units)', amount: 130000 },
      { item: 'Instructor Fees & Material', amount: 100000 }
    ]
  }
];

export const IMPACT_STORIES: ImpactStory[] = [
  {
    id: 'story-1',
    title: 'From School Dropout to Top Scorer',
    category: 'Education',
    beneficiary: 'Pooja Rani (Age 14)',
    location: 'Village Ramrai, Jind',
    before: 'Pooja was forced to drop out of 6th grade due to family financial constraints and lack of nearby study support.',
    after: 'Joined our Shiksha Learning Center, cleared 10th board exams with 88% marks, and is now pursuing science.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    quote: 'The teachers at Help-A-Mission gave me books, confidence, and a dream to become a doctor.'
  },
  {
    id: 'story-2',
    title: 'Empowered with Financial Independence',
    category: 'Financial Support',
    beneficiary: 'Sunita Devi (Widow & Mother of 2)',
    location: 'Jind City',
    before: 'Struggling to feed her children after losing her husband, working irregular domestic jobs.',
    after: 'Completed 3-month tailoring course, received a micro-grant sewing machine, and now earns ₹14,000/month.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80',
    quote: 'I can now pay for my children school fees proudly with my own hard-earned income.'
  },
  {
    id: 'story-3',
    title: 'Lifesaving Emergency Blood Transfer',
    category: 'Healthcare',
    beneficiary: 'Master Rahul (Age 8)',
    location: 'District Hospital, Jind',
    before: 'Diagnosed with acute anemia requiring immediate rare AB-ve blood units during surgery.',
    after: 'Connected via Help-A-Mission 24/7 Blood Donor Helpline; donor reached hospital within 35 minutes.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    quote: 'The volunteer response was lightning fast. They saved our son life.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Tax Benefits',
    question: 'Are donations to Help-A-Mission Welfare Society eligible for 80G Tax Exemption?',
    answer: 'Yes! Help-A-Mission Welfare Society is registered under Section 80G of the Income Tax Act. Indian donors can claim a 50% tax deduction on their total donation amount. You will receive an official 80G tax receipt instantly via email upon donating.'
  },
  {
    category: 'General',
    question: 'How is my donation utilized?',
    answer: 'We maintain 100% financial transparency. At least 92% of all public contributions go directly into field project execution (books, rations, medical supplies, teacher salaries), while under 8% covers essential administrative and audit operations.'
  },
  {
    category: 'Donations',
    question: 'Can I donate via UPI, Credit Card, or Net Banking?',
    answer: 'Yes, we accept all popular payment methods including Google Pay, PhonePe, Paytm, BHIM UPI, Visa, MasterCard, RuPay, and all major Indian Net Banking portals through our secure 256-bit SSL encrypted gateway.'
  },
  {
    category: 'Volunteering',
    question: 'How can I register as a volunteer?',
    answer: 'You can apply online via our Contact & Volunteer page by filling out the brief registration form. Our team will review your interest (teaching, medical camp support, event coordination, digital media) and connect with you within 48 hours.'
  },
  {
    category: 'Tax Benefits',
    question: 'What information is needed to issue an 80G tax certificate?',
    answer: 'To issue a valid 80G receipt required by the Income Tax Department of India, we need your full legal name, PAN Card number, mailing address, and email ID.'
  }
];
