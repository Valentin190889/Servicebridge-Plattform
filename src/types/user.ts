export interface UserProfile {
  id: string;
  name: string;
  email: string;
  position: string;
  industry: string;
  company?: string;
  subscription: {
    package: string;
    status: 'active' | 'canceled' | 'trial';
    expiresAt: string;
  };
  settings: {
    language: string;
    region: string;
    pseudonym: string;
    darkMode: boolean;
  };
  avatarUrl?: string;
  synonym?: string;
  role: 'user';
}

export type Industry = 
  | 'technology'
  | 'healthcare'
  | 'finance'
  | 'manufacturing'
  | 'retail'
  | 'education'
  | 'other';

export type Language = 'en' | 'de' | 'fr' | 'es';
export type Region = 'eu' | 'na' | 'asia' | 'other';

export type UserRole = 'user';
export type UserStatus = 'active' | 'inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
  lastLogin?: string;
  createdAt?: string;
}