import { NextApiRequest, NextApiResponse } from 'next'

interface TeamData {
  name: string;
  logo: string;
  isFavorite?: boolean;
}

interface UpcomingMatch {
  id: number;
  league: {
    name: string;
    country: string;
    logo: string;
  };
  dateTime: string;
  date: string;
  time: string;
  homeTeam: TeamData;
  awayTeam: TeamData;
  odds: {
    home: number;
    draw: number;
    away: number;
    totalBets: string;
  };
}

// Mock data for upcoming matches
const upcomingMatches: UpcomingMatch[] = [
  {
    id: 1,
    league: {
      name: 'Premier League',
      country: 'England',
      logo: '/leagues/premier-league.png',
    },
    dateTime: '24 Aug Wednesday 17:40 PM',
    date: '2023-08-24',
    time: '17:40',
    homeTeam: {
      name: 'Liverpool FC',
      logo: '/teams/liverpool.png',
      isFavorite: true,
    },
    awayTeam: {
      name: 'Manchester United',
      logo: '/teams/manchester-united.png',
    },
    odds: {
      home: 1.50,
      draw: 3.40,
      away: 2.20,
      totalBets: '+1253'
    }
  },
  {
    id: 2,
    league: {
      name: 'La Liga',
      country: 'Spanish',
      logo: '/leagues/la-liga.png',
    },
    dateTime: '24 Aug Wednesday 17:40 PM',
    date: '2023-08-24',
    time: '17:40',
    homeTeam: {
      name: 'Liverpool FC',
      logo: '/teams/liverpool.png',
    },
    awayTeam: {
      name: 'Manchester United',
      logo: '/teams/manchester-united.png',
    },
    odds: {
      home: 1.50,
      draw: 3.40,
      away: 2.20,
      totalBets: '+1253'
    }
  },
  {
    id: 3,
    league: {
      name: 'Bundesliga',
      country: 'Germany',
      logo: '/leagues/bundesliga.png',
    },
    dateTime: '25 Aug Thursday 19:30 PM',
    date: '2023-08-25',
    time: '19:30',
    homeTeam: {
      name: 'Bayern Munich',
      logo: '/teams/bayern.png',
      isFavorite: false,
    },
    awayTeam: {
      name: 'Borussia Dortmund',
      logo: '/teams/dortmund.png',
    },
    odds: {
      home: 1.70,
      draw: 3.80,
      away: 4.50,
      totalBets: '+987'
    }
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<UpcomingMatch[]>) {
  // Optional: filter by date if provided in query
  const { date } = req.query
  let matches = upcomingMatches
  
  if (date && typeof date === 'string') {
    matches = upcomingMatches.filter(match => match.date === date)
  }
  
  // Add a small delay to simulate network latency
  setTimeout(() => {
    res.status(200).json(matches)
  }, 300)
} 