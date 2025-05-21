// Team types
export interface Team {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
}

// League types
export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  region: string;
}

// Match types
export interface Match {
  id: number;
  date: string;
  time: string;
  competition: {
    name: string;
    logo: string;
    country: string;
  };
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  status: string;
  elapsed?: string;
  homeScore?: number;
  awayScore?: number;
}

// Day type for calendar
export interface Day {
  id: number;
  day: number;
  month: string;
  active?: boolean;
  fullDate?: string; // Date string in YYYY-MM-DD format for API calls
}

// Featured match type
export interface FeaturedMatchType {
  league: string;
  leagueCountry: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  date: Date;
  live: boolean;
  odds: {
    home: string;
    draw: string;
    away: string;
  };
  totalBets: string;
}

// Region type
export interface Region {
  id: string;
  name: string;
}

// Sport type
export interface Sport {
  id: string;
  name: string;
  icon: string;
  active?: boolean;
}

// News item type
export interface NewsItem {
  id: number;
  title: string;
  image: string;
  content: string;
  source: string;
  timeAgo: string;
  date: string;
  isLive: boolean;
  category: string;
  team: string;
}

// Props interfaces
export interface LayoutProps {
  children: React.ReactNode;
}

export interface SportCategoriesProps {
  minimal?: boolean;
} 