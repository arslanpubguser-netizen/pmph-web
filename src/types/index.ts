export type UserRole = 'player' | 'team_manager' | 'organizer' | 'admin';

export type TournamentStatus = 'OPEN' | 'UPCOMING' | 'LIVE' | 'COMPLETED';

export type CompetitiveLevel = 'Amateur' | 'Semi-Pro' | 'Professional' | 'Elite';

export type PlayerRole = 'IGL' | 'Entry Fragger' | 'Support' | 'Sniper' | 'Assaulter' | 'Flex';

export type Region = 'Lahore' | 'Karachi' | 'Islamabad' | 'Peshawar' | 'Multan' | 'Quetta' | 'Faisalabad' | 'Rawalpindi';

export type PubgRank = 'Conqueror' | 'Ace Dominator' | 'Ace' | 'Crown' | 'Diamond' | 'Platinum' | 'Gold' | 'Silver' | 'Bronze';

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface PlayerProfile {
  id: string;
  userId: string;
  username: string;
  pubgId: string;
  avatarUrl?: string;
  rank: PubgRank;
  primaryRole: PlayerRole;
  secondaryRole?: PlayerRole;
  region: Region;
  level: CompetitiveLevel;
  kd: number;
  winRate: number;
  matches: number;
  kills: number;
  wins: number;
  bio?: string;
  isAvailable: boolean;
  teamId?: string;
  socialLinks?: {
    discord?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
  };
  achievements: string[];
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  logoUrl?: string;
  bannerUrl?: string;
  region: Region;
  description: string;
  level: CompetitiveLevel;
  achievements: string[];
  isRecruiting: boolean;
  socialLinks?: {
    discord?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
  };
  managerId: string;
  points: number;
  wins: number;
  matches: number;
  rank?: number;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  playerId: string;
  player?: PlayerProfile;
  role: PlayerRole;
  joinedAt: string;
  isCaptain: boolean;
}

export interface RecruitmentPost {
  id: string;
  teamId: string;
  team?: Team;
  title: string;
  description: string;
  role: PlayerRole;
  rankRequired: PubgRank;
  region: Region;
  level: CompetitiveLevel;
  status: 'OPEN' | 'CLOSED' | 'FILLED';
  createdAt: string;
}

export interface Application {
  id: string;
  recruitmentPostId: string;
  playerId: string;
  player?: PlayerProfile;
  teamId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  message: string;
  createdAt: string;
}

export interface Tournament {
  id: string;
  name: string;
  bannerUrl?: string;
  organizer: string;
  prizePool: number;
  registrationDeadline: string;
  startDate: string;
  endDate?: string;
  status: TournamentStatus;
  region: Region;
  maxTeams: number;
  registeredTeams: number;
  description: string;
  rules: string[];
  prizeBreakdown: { position: string; amount: number }[];
  participatingTeamIds: string[];
  createdAt: string;
}

export interface TournamentRegistration {
  id: string;
  tournamentId: string;
  teamId: string;
  registeredAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorAvatar?: string;
  thumbnailUrl?: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  isPublished: boolean;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Ranking {
  id: string;
  teamId: string;
  team?: Team;
  points: number;
  wins: number;
  matches: number;
  winRate: number;
  rankChange: number;
  isNew: boolean;
}

export interface PlayerRanking {
  id: string;
  playerId: string;
  player?: PlayerProfile;
  teamName?: string;
  kills: number;
  matches: number;
  points: number;
  kd: number;
  rankChange: number;
  isNew: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrl?: string;
  images?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isFeatured: boolean;
  brand: string;
  features: string[];
  createdAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'application' | 'tournament' | 'recruitment' | 'team_invite' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}
