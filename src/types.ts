export interface SubTask {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
}

export interface VerifiedReceipt {
  id: string;
  location: string;
  timeAgo: string;
  amountPaid: number;
  isVerified: boolean; // true = Verified Receipt, false = Flagged High
  notes?: string;
}

export interface ServiceRate {
  id: string;
  title: string;
  category: string;
  verifiedCount: number;
  fairPercentage: number;
  minPrice: number;
  maxPrice: number;
  locations: string[];
  gaugePosition: number; // 0 to 100 percentage
  subTasks: SubTask[];
  receipts: VerifiedReceipt[];
  userVotes?: { fair: number; overcharged: number };
}

export type ScreenType = 'home' | 'details' | 'submit' | 'flutter_code';

export interface FlutterFile {
  path: string;
  language: string;
  content: string;
  description: string;
}
