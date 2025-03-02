export interface Expert {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  location: string;
  experience: string;
  languages: string[];
  certifications: string[];
  avatarUrl: string;
  rating: number;
  availability: 'available' | 'busy' | 'offline';
  bio: string;
  recentProjects: string[];
  hourlyRate: string;
}