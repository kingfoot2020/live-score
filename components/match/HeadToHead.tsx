import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type H2HMatch = {
  fixture: {
    id: number;
    date: string;
    venue: {
      name: string;
      city: string;
    };
    status: {
      short: string;
      long: string;
    };
  };
  league: {
    id: number;
    name: string;
    logo: string;
    country: string;
    season: number;
  };
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
};

type FixtureData = {
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
  h2h?: H2HMatch[];
};

type HeadToHeadProps = {
  fixture: FixtureData;
};

export default function HeadToHead({ fixture }: HeadToHeadProps) {
  // Mock H2H data in case API doesn't provide it
  const mockH2H = [
    {
      fixture: {
        id: 12345,
        date: '2023-01-15T14:00:00+00:00',
        venue: { name: 'Stadium A', city: 'City A' },
        status: { short: 'FT', long: 'Match Finished' }
      },
      league: {
        id: 1,
        name: 'League A',
        logo: '/placeholder-league.png',
        country: 'Country A',
        season: 2022
      },
      teams: {
        home: { id: fixture.teams.home.id, name: fixture.teams.home.name, logo: fixture.teams.home.logo },
        away: { id: fixture.teams.away.id, name: fixture.teams.away.name, logo: fixture.teams.away.logo }
      },
      goals: { home: 2, away: 1 }
    },
    {
      fixture: {
        id: 12346,
        date: '2022-09-20T14:00:00+00:00',
        venue: { name: 'Stadium B', city: 'City B' },
        status: { short: 'FT', long: 'Match Finished' }
      },
      league: {
        id: 1,
        name: 'League A',
        logo: '/placeholder-league.png',
        country: 'Country A',
        season: 2022
      },
      teams: {
        home: { id: fixture.teams.away.id, name: fixture.teams.away.name, logo: fixture.teams.away.logo },
        away: { id: fixture.teams.home.id, name: fixture.teams.home.name, logo: fixture.teams.home.logo }
      },
      goals: { home: 0, away: 3 }
    },
    {
      fixture: {
        id: 12347,
        date: '2022-05-10T14:00:00+00:00',
        venue: { name: 'Stadium A', city: 'City A' },
        status: { short: 'FT', long: 'Match Finished' }
      },
      league: {
        id: 1,
        name: 'League A',
        logo: '/placeholder-league.png',
        country: 'Country A',
        season: 2021
      },
      teams: {
        home: { id: fixture.teams.home.id, name: fixture.teams.home.name, logo: fixture.teams.home.logo },
        away: { id: fixture.teams.away.id, name: fixture.teams.away.name, logo: fixture.teams.away.logo }
      },
      goals: { home: 1, away: 1 }
    },
    {
      fixture: {
        id: 12348,
        date: '2021-12-05T14:00:00+00:00',
        venue: { name: 'Stadium B', city: 'City B' },
        status: { short: 'FT', long: 'Match Finished' }
      },
      league: {
        id: 1,
        name: 'League A',
        logo: '/placeholder-league.png',
        country: 'Country A',
        season: 2021
      },
      teams: {
        home: { id: fixture.teams.away.id, name: fixture.teams.away.name, logo: fixture.teams.away.logo },
        away: { id: fixture.teams.home.id, name: fixture.teams.home.name, logo: fixture.teams.home.logo }
      },
      goals: { home: 2, away: 2 }
    },
    {
      fixture: {
        id: 12349,
        date: '2021-08-15T14:00:00+00:00',
        venue: { name: 'Stadium A', city: 'City A' },
        status: { short: 'FT', long: 'Match Finished' }
      },
      league: {
        id: 1,
        name: 'League A',
        logo: '/placeholder-league.png',
        country: 'Country A',
        season: 2021
      },
      teams: {
        home: { id: fixture.teams.home.id, name: fixture.teams.home.name, logo: fixture.teams.home.logo },
        away: { id: fixture.teams.away.id, name: fixture.teams.away.name, logo: fixture.teams.away.logo }
      },
      goals: { home: 3, away: 0 }
    }
  ];
  
  const h2hMatches = fixture.h2h || mockH2H;
  
  // Calculate H2H summary
  const calculateSummary = () => {
    let homeWins = 0;
    let draws = 0;
    let awayWins = 0;
    
    h2hMatches.forEach(match => {
      if (match.goals.home === null || match.goals.away === null) {
        return; // Skip if no goals data
      }
      
      if (match.goals.home === match.goals.away) {
        draws++;
      } else if (
        (match.teams.home.id === fixture.teams.home.id && match.goals.home > match.goals.away) ||
        (match.teams.away.id === fixture.teams.home.id && match.goals.away > match.goals.home)
      ) {
        homeWins++;
      } else {
        awayWins++;
      }
    });
    
    return { homeWins, draws, awayWins };
  };
  
  const summary = calculateSummary();
  const totalMatches = summary.homeWins + summary.draws + summary.awayWins;
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Function to generate match result class
  const getResultClass = (match: H2HMatch, teamId: number) => {
    if (match.goals.home === null || match.goals.away === null) {
      return 'bg-gray-100 text-gray-600';
    }
    
    // Check if the team is home or away
    const isHomeTeam = match.teams.home.id === teamId;
    const homeGoals = match.goals.home;
    const awayGoals = match.goals.away;
    
    if (homeGoals === awayGoals) {
      return 'bg-yellow-100 text-yellow-800'; // Draw
    }
    
    if ((isHomeTeam && homeGoals > awayGoals) || (!isHomeTeam && awayGoals > homeGoals)) {
      return 'bg-green-100 text-green-800'; // Win
    }
    
    return 'bg-red-100 text-red-800'; // Loss
  };
  
  return (
    <div>
      {/* H2H Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="text-center mb-4">
          <span className="text-gray-500 text-sm">Total Matches: {totalMatches}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <Image 
              src={fixture.teams.home.logo || '/placeholder-team.png'} 
              alt={fixture.teams.home.name}
              width={40}
              height={40}
              className="mb-2"
            />
            <div className="font-bold">{fixture.teams.home.name}</div>
            <div className="text-green-600 font-bold text-xl mt-2">{summary.homeWins}</div>
            <div className="text-sm text-gray-500">Wins</div>
          </div>
          
          <div className="flex flex-col items-center px-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-700 mb-2">
              VS
            </div>
            <div className="text-yellow-600 font-bold text-xl">{summary.draws}</div>
            <div className="text-sm text-gray-500">Draws</div>
          </div>
          
          <div className="flex flex-col items-center">
            <Image 
              src={fixture.teams.away.logo || '/placeholder-team.png'} 
              alt={fixture.teams.away.name}
              width={40}
              height={40}
              className="mb-2"
            />
            <div className="font-bold">{fixture.teams.away.name}</div>
            <div className="text-green-600 font-bold text-xl mt-2">{summary.awayWins}</div>
            <div className="text-sm text-gray-500">Wins</div>
          </div>
        </div>
      </div>
      
      {/* Last Meetings */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Previous Meetings</h3>
        <div className="space-y-4">
          {h2hMatches.map((match, index) => (
            <Link 
              href={`/fixture/${match.fixture.id}/${match.teams.home.name.toLowerCase().replace(/\s+/g, '-')}-vs-${match.teams.away.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={index}
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Image 
                      src={match.league.logo || '/placeholder-league.png'} 
                      alt={match.league.name}
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-600">{match.league.name}</span>
                  </div>
                  <div className="text-xs text-gray-500">{formatDate(match.fixture.date)}</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <Image 
                      src={match.teams.home.logo || '/placeholder-team.png'} 
                      alt={match.teams.home.name}
                      width={30}
                      height={30}
                    />
                    <span className="font-medium">{match.teams.home.name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded text-sm font-bold ${getResultClass(match, fixture.teams.home.id)}`}>
                        {match.goals.home !== null ? match.goals.home : '-'}
                      </span>
                      <span className="mx-1">:</span>
                      <span className={`px-2 py-1 rounded text-sm font-bold ${getResultClass(match, fixture.teams.away.id)}`}>
                        {match.goals.away !== null ? match.goals.away : '-'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{match.teams.away.name}</span>
                    <Image 
                      src={match.teams.away.logo || '/placeholder-team.png'} 
                      alt={match.teams.away.name}
                      width={30}
                      height={30}
                    />
                  </div>
                </div>
                
                <div className="mt-2 text-xs text-gray-500 text-center">
                  {match.fixture.venue.name}, {match.fixture.venue.city}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 