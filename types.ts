export type Page = 
  'landing' | 
  'login' |
  'register' |
  'home' | 
  'watermarking' | 
  'steganography' | 
  'uploads' | 
  'keyVault' | 
  'contact' |
  'profile' |
  'policy' |
  'terms' |
  'team';

export interface AppFile {
  id: string;
  name: string;
  type: 'Image' | 'Document' | 'Text';
  size: string;
  uploaded: string;
}

export interface CryptoKey {
  id: string;
  label: string;
  type: 'AES-256' | 'RSA-2048';
  dateCreated: string;
}

export interface ProcessHistoryItem {
  id:string;
  fileName: string;
  watermark: string;
  status: 'Completed' | 'Processing' | 'Failed';
  date: string;
}

export interface User {
  name: string;
  email: string;
  memberSince: string;
  avatarUrl: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  storageUsed: number; // in MB
  storageTotal: number; // in MB
  watermarksThisMonth: number;
  watermarkLimit: number;
  organisation?: string;
  role?: string;
  location?: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface SteganographyHistoryItem {
  id: string;
  type: 'Image' | 'URL' | 'Emoji';
  operation: 'Encode' | 'Decode';
  message: string;
  carrier: string;
  date: string;
  status: 'Success' | 'Failed';
}