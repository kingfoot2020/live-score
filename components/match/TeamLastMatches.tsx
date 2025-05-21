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
    venue?: {
      name: string;
    };
  };
  league: {
    name: string;
    logo: string;
  };
};

type FixtureData = {
  teams?: {
    home?: {
      id?: number;
      name?: string;
      logo?: string;
      last_5?: Match[];
    };
    away?: {
      id?: number;
      name?: string;
      logo?: string;
      last_5?: Match[];
    };
  };
};

type TeamLastMatchesProps = {
  fixture: FixtureData;
};

export default function TeamLastMatches({ fixture }: TeamLastMatchesProps) {
  // Add defensive checks to handle potentially missing data
  if (!fixture || !fixture.teams || !fixture.teams.home || !fixture.teams.away) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">Team history is unavailable</p>
      </div>
    );
  }

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
    if (!match.teams || !match.goals) return 'N/A';
    
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

  // Safely format date with error handling
  const formatMatchDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'short', day: 'numeric' 
      });
    } catch (error) {
      return 'Date unavailable';
    }
  };

  const homeTeamId = fixture.teams.home.id || 0;
  const awayTeamId = fixture.teams.away.id || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Home Team's Last 5 Matches */}
      <div>
        <div className="flex items-center mb-3">
          <Image 
            src={fixture.teams.home.logo || '/placeholder-team.png'} 
            alt={fixture.teams.home.name || 'Home Team'}
            width={24}
            height={24}
            className="mr-2"
          />
          <h3 className="font-bold">{fixture.teams.home.name || 'Home Team'}</h3>
        </div>
        
        <div className="space-y-3">
          {homeLastMatches.slice(0, 5).map((match, index) => {
            if (!match || !match.teams || !match.fixture) {
              return (
                <div key={`home-${index}`} className="flex items-center bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                  <div className="text-gray-500 w-full text-center">Match data unavailable</div>
                </div>
              );
            }
            
            const result = getMatchResult(match, homeTeamId);
            const date = formatMatchDate(match.fixture.date);
            
            return (
              <div key={`home-${index}`} className="flex items-center bg-white rounded-lg p-2 shadow-sm border border-gray-100">
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
                    <span className="mx-1 text-sm">{match.goals?.home ?? '-'}</span>
                    <span className="mx-1 text-xs text-gray-400">-</span>
                    <span className="mx-1 text-sm">{match.goals?.away ?? '-'}</span>
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
            alt={fixture.teams.away.name || 'Away Team'}
            width={24}
            height={24}
            className="mr-2"
          />
          <h3 className="font-bold">{fixture.teams.away.name || 'Away Team'}</h3>
        </div>
        
        <div className="space-y-3">
          {awayLastMatches.slice(0, 5).map((match, index) => {
            if (!match || !match.teams || !match.fixture) {
              return (
                <div key={`away-${index}`} className="flex items-center bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                  <div className="text-gray-500 w-full text-center">Match data unavailable</div>
                </div>
              );
            }
            
            const result = getMatchResult(match, awayTeamId);
            const date = formatMatchDate(match.fixture.date);
            
            return (
              <div key={`away-${index}`} className="flex items-center bg-white rounded-lg p-2 shadow-sm border border-gray-100">
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
                    <span className="mx-1 text-sm">{match.goals?.home ?? '-'}</span>
                    <span className="mx-1 text-xs text-gray-400">-</span>
                    <span className="mx-1 text-sm">{match.goals?.away ?? '-'}</span>
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