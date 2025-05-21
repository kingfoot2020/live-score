import { NextApiRequest, NextApiResponse } from 'next'

interface TeamWithScore {
  id: number;
  name: string;
  logo: string;
  score: number;
}

interface LiveMatch {
  id: number;
  league: {
    id: number;
    name: string;
    matchday: string;
  };
  match: {
    homeTeam: TeamWithScore;
    awayTeam: TeamWithScore;
    minute: number;
    isLive: boolean;
    odds: {
      home: number;
      draw: number;
      away: number;
    };
  };
}

// Mock data for live matches
const liveMatches: LiveMatch[] = [
  {
    id: 1,
    league: {
      id: 1,
      name: 'Italy / Serie A',
      matchday: 'Matchday 2 of 38'
    },
    match: {
      homeTeam: {
        id: 101,
        name: 'Napoli',
        logo: '/team-logos/napoli.png',
        score: 2
      },
      awayTeam: {
        id: 102,
        name: 'Inter',
        logo: '/team-logos/inter.png',
        score: 1
      },
      minute: 60,
      isLive: true,
      odds: {
        home: 2.10,
        draw: 2.80,
        away: 1.70
      }
    }
  },
  {
    id: 2,
    league: {
      id: 2,
      name: 'Premier League',
      matchday: 'Matchday 36 of 38'
    },
    match: {
      homeTeam: {
        id: 103,
        name: 'Arsenal',
        logo: '/team-logos/arsenal.png',
        score: 3
      },
      awayTeam: {
        id: 104,
        name: 'Chelsea',
        logo: '/team-logos/chelsea.png',
        score: 1
      },
      minute: 75,
      isLive: true,
      odds: {
        home: 1.30,
        draw: 4.50,
        away: 8.00
      }
    }
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<LiveMatch[]>) {
  // Add a small delay to simulate network latency
  setTimeout(() => {
    res.status(200).json(liveMatches)
  }, 300)
} 