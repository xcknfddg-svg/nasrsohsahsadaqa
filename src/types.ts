export type Currency = 'USD' | 'EUR' | 'GBP' | 'SAR' | 'AED' | 'CAD';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rateFromUSD: number; // For live currency display
}

export type Category = 
  | 'All'
  | 'Sadaqah Jariyah'
  | 'Clean Water'
  | 'Orphan & Widow'
  | 'Emergency Relief'
  | 'Healthcare & Medical'
  | 'Mosque & Education';

export interface Campaign {
  id: string;
  title: string;
  arabicTitle?: string;
  category: Category;
  isJariyah: boolean;
  featured?: boolean;
  location: string;
  targetUSD: number;
  raisedUSD: number;
  donorCount: number;
  daysLeft: number;
  imageUrl: string;
  summary: string;
  detailedStory: string;
  impactTiers: {
    amountUSD: number;
    impact: string;
  }[];
  updates: {
    date: string;
    title: string;
    description: string;
  }[];
}

export interface DonationRecord {
  id: string;
  campaignId: string;
  campaignTitle: string;
  amount: number;
  currency: Currency;
  donorName: string;
  donorEmail: string;
  isAnonymous: boolean;
  frequency: 'one-time' | 'friday' | 'monthly';
  dedication?: {
    type: 'in_honor_of' | 'in_memory_of' | 'general';
    personName: string;
    duaMessage: string;
  };
  timestamp: string;
  transactionRef: string;
}

export interface DailyDeed {
  id: string;
  text: string;
  arabicSubtitle?: string;
  hadithReference: string;
  category: 'kindness' | 'speech' | 'community' | 'worship';
  completed: boolean;
}

export interface HadithVirtue {
  id: string;
  arabicText: string;
  translation: string;
  source: string;
  narrator: string;
  topic: string;
}
