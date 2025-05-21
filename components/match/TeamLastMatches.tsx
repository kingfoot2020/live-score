import React from 'react';
import Image from 'next/image';

type Match = {
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  fixture: {
    date: string;
    venue: {
      name: string;
    };
  };
  league: {
    name: string;
    logo: string;
  };
};

type FixtureData = {
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      last_5: Match[];
    };
    away: {
      id: number;
      name: string;
      logo: string;
      last_5: Match[];
    };
  };
};

type TeamLastMatchesProps = {
  fixture: FixtureData;
};

export default function TeamLastMatches({ fixture }: TeamLastMatchesProps) {
  // Mock data for demonstration - in real implementation, this would come from the API
  // This is a fallback if the API doesn't provide last_5 matches
  const mockLastMatches = [
    {
      teams: {
        home: { id: 1, name: 'Team A', logo: '/placeholder-team.png' },
        away: { id: 2, name: 'Team B', logo: '/placeholder-team.png' }
      },
      goals: { home: 2, away: 1 },
      fixture: { date: '2023-04-15T14:00:00+00:00', venue: { name: 'Stadium A' } },
      league: { name: 'League A', logo: '/placeholder-league.png' }
    },
    {
      teams: {
        home: { id: 3, name: 'Team C', logo: '/placeholder-team.png' },
        away: { id: 1, name: 'Team A', logo: '/placeholder-team.png' }
      },
      goals: { home: 0, away: 3 },
      fixture: { date: '2023-04-08T14:00:00+00:00', venue: { name: 'Stadium C' } },
      league: { name: 'League A', logo: '/placeholder-league.png' }
    },
    {
      teams: {
        home: { id: 1, name: 'Team A', logo: '/placeholder-team.png' },
        away: { id: 4, name: 'Team D', logo: '/placeholder-team.png' }
      },
      goals: { home: 1, away: 1 },
      fixture: { date: '2023-04-01T14:00:00+00:00', venue: { name: 'Stadium A' } },
      league: { name: 'League A', logo: '/placeholder-league.png' }
    },
    {
      teams: {
        home: { id: 5, name: 'Team E', logo: '/placeholder-team.png' },
        away: { id: 1, name: 'Team A', logo: '/placeholder-team.png' }
      },
      goals: { home: 2, away: 0 },
      fixture: { date: '2023-03-25T14:00:00+00:00', venue: { name: 'Stadium E' } },
      league: { name: 'League A', logo: '/placeholder-league.png' }
    },
    {
      teams: {
        home: { id: 1, name: 'Team A', logo: '/placeholder-team.png' },
        away: { id: 6, name: 'Team F', logo: '/placeholder-team.png' }
      },
      goals: { home: 3, away: 0 },
      fixture: { date: '2023-03-18T14:00:00+00:00', venue: { name: 'Stadium A' } },
      league: { name: 'League A', logo: '/placeholder-league.png' }
    }
  ];

  // Get last 5 matches for home team, fallback to mock if not available
  const homeLastMatches = fixture.teams.home.last_5 || mockLastMatches;
  // Get last 5 matches for away team, fallback to mock if not available
  const awayLastMatches = fixture.teams.away.last_5 || mockLastMatches;

  // Function to determine match result for a team
  const getMatchResult = (match: Match, teamId: number) => {
    // If home team
    if (match.teams.home.id === teamId) {
      if (match.goals.home === null || match.goals.away === null) return 'N/A';
      if (match.goals.home > match.goals.away) return 'W';
      if (match.goals.home < match.goals.away) return 'L';
      return 'D';
    }
    // If away team
    else {
      if (match.goals.home === null || match.goals.away === null) return 'N/A';
      if (match.goals.home < match.goals.away) return 'W';
      if (match.goals.home > match.goals.away) return 'L';
      return 'D';
    }
  };

  // Function to get result background color
  const getResultBgColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-green-100 text-green-800';
      case 'L': return 'bg-red-100 text-red-800';
      case 'D': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Home Team's Last 5 Matches */}
      <div>
        <div className="flex items-center mb-3">
          <Image 
            src={fixture.teams.home.logo || '/placeholder-team.png'} 
            alt={fixture.teams.home.name}
            width={24}
            height={24}
            className="mr-2"
          />
          <h3 className="font-bold">{fixture.teams.home.name}</h3>
        </div>
        
        <div className="space-y-3">
          {homeLastMatches.slice(0, 5).map((match, index) => {
            const result = getMatchResult(match, fixture.teams.home.id);
            const date = new Date(match.fixture.date).toLocaleDateString('en-US', { 
              month: 'short', day: 'numeric' 
            });
            
            return (
              <div key={index} className="flex items-center bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getResultBgColor(result)}`}>
                  {result}
                </div>
                
                <div className="ml-3 flex-grow">
                  <div className="flex items-center">
                    <Image 
                      src={match.teams.home.logo || '/placeholder-team.png'} 
                      alt={match.teams.home.name}
                      width={16}
                      height={16}
                      className="mr-1"
                    />
                    <span className="text-sm font-medium">{match.teams.home.name}</span>
                    <span className="mx-1 text-sm">{match.goals.home ?? '-'}</span>
                    <span className="mx-1 text-xs text-gray-400">-</span>
                    <span className="mx-1 text-sm">{match.goals.away ?? '-'}</span>
                    <Image 
                      src={match.teams.away.logo || '/placeholder-team.png'} 
                      alt={match.teams.away.name}
                      width={16}
                      height={16}
                      className="ml-1 mr-1"
                    />
                    <span className="text-sm font-medium">{match.teams.away.name}</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 ml-2">{date}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Away Team's Last 5 Matches */}
      <div>
        <div className="flex items-center mb-3">
          <Image 
            src={fixture.teams.away.logo || '/placeholder-team.png'} 
            alt={fixture.teams.away.name}
            width={24}
            height={24}
            className="mr-2"
          />
          <h3 className="font-bold">{fixture.teams.away.name}</h3>
        </div>
        
        <div className="space-y-3">
          {awayLastMatches.slice(0, 5).map((match, index) => {
            const result = getMatchResult(match, fixture.teams.away.id);
            const date = new Date(match.fixture.date).toLocaleDateString('en-US', { 
              month: 'short', day: 'numeric' 
            });
            
            return (
              <div key={index} className="flex items-center bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getResultBgColor(result)}`}>
                  {result}
                </div>
                
                <div className="ml-3 flex-grow">
                  <div className="flex items-center">
                    <Image 
                      src={match.teams.home.logo || '/placeholder-team.png'} 
                      alt={match.teams.home.name}
                      width={16}
                      height={16}
                      className="mr-1"
                    />
                    <span className="text-sm font-medium">{match.teams.home.name}</span>
                    <span className="mx-1 text-sm">{match.goals.home ?? '-'}</span>
                    <span className="mx-1 text-xs text-gray-400">-</span>
                    <span className="mx-1 text-sm">{match.goals.away ?? '-'}</span>
                    <Image 
                      src={match.teams.away.logo || '/placeholder-team.png'} 
                      alt={match.teams.away.name}
                      width={16}
                      height={16}
                      className="ml-1 mr-1"
                    />
                    <span className="text-sm font-medium">{match.teams.away.name}</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 ml-2">{date}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 