import React from 'react';
import Image from 'next/image';

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
  league: {
    id: number;
    name: string;
    logo: string;
    country: string;
  };
  fixture: {
    id: number;
    venue?: {
      name: string;
      city: string;
    };
    status: {
      short: string; // NS, LIVE, FT, etc.
      elapsed: number | null;
    };
    date?: string;
  };
  goals: {
    home: number | null;
    away: number | null;
  };
};

type MatchHeaderProps = {
  fixture: FixtureData;
};

export default function MatchHeader({ fixture }: MatchHeaderProps) {
  // Add defensive checks to handle potentially missing data
  if (!fixture || !fixture.fixture || !fixture.teams || !fixture.league) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4">
        <div className="text-center py-8">
          <p className="text-gray-500">Match information is unavailable</p>
        </div>
      </div>
    );
  }

  // Format date to local time with fallback
  let formattedDate = "Date unavailable";
  let formattedTime = "Time unavailable";
  
  if (fixture.fixture.date) {
    try {
      const matchDate = new Date(fixture.fixture.date);
      formattedDate = matchDate.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      formattedTime = matchDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
    }
  }

  // Determine match status display
  const getStatusDisplay = () => {
    if (!fixture.fixture.status) return 'Status Unavailable';
    
    const status = fixture.fixture.status.short;
    
    switch (status) {
      case 'NS':
        return 'Not Started';
      case 'LIVE':
        return `LIVE ${fixture.fixture.status.elapsed || 0}'`;
      case 'HT':
        return 'Half Time';
      case 'FT':
        return 'Full Time';
      case '1H':
        return `1st Half ${fixture.fixture.status.elapsed || 0}'`;
      case '2H':
        return `2nd Half ${fixture.fixture.status.elapsed || 0}'`;
      default:
        return status || 'Unknown';
    }
  };

  // Determine status color
  const getStatusColor = () => {
    if (!fixture.fixture.status) return 'text-gray-600';
    
    const status = fixture.fixture.status.short;
    
    if (status === 'LIVE' || status === '1H' || status === '2H') {
      return 'text-red-600';
    } else if (status === 'FT' || status === 'AET' || status === 'PEN') {
      return 'text-gray-700';
    } else {
      return 'text-blue-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4">
      <div className="flex items-center mb-2">
        <div className="text-sm text-gray-600 flex items-center">
          <Image 
            src={fixture.league.logo || '/placeholder-league.png'} 
            alt={fixture.league.name}
            width={20}
            height={20}
            className="mr-2"
          />
          {fixture.league.name} • {fixture.league.country || 'Unknown'}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 flex flex-col md:flex-row items-center md:justify-end mb-4 md:mb-0">
          <div className="text-center md:text-right md:mr-4">
            <p className="font-bold text-lg md:text-xl">{fixture.teams.home.name}</p>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <Image 
              src={fixture.teams.home.logo || '/placeholder-team.png'} 
              alt={fixture.teams.home.name}
              width={60}
              height={60}
            />
          </div>
        </div>
        
        <div className="mx-3 md:mx-6 text-center">
          {!fixture.fixture.status || fixture.fixture.status.short === 'NS' ? (
            <div className="text-gray-800 text-lg font-medium mb-1">VS</div>
          ) : (
            <div className="flex items-center justify-center space-x-2 mb-1">
              <span className="text-2xl font-bold">{fixture.goals.home ?? 0}</span>
              <span className="text-xl text-gray-400">-</span>
              <span className="text-2xl font-bold">{fixture.goals.away ?? 0}</span>
            </div>
          )}
          
          <div className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusDisplay()}
          </div>
          
          <div className="text-xs text-gray-500 mt-1">
            {formattedDate} • {formattedTime}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col md:flex-row items-center md:justify-start">
          <div className="w-16 h-16 flex items-center justify-center">
            <Image 
              src={fixture.teams.away.logo || '/placeholder-team.png'} 
              alt={fixture.teams.away.name}
              width={60}
              height={60}
            />
          </div>
          <div className="text-center md:text-left md:ml-4">
            <p className="font-bold text-lg md:text-xl">{fixture.teams.away.name}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 text-center">
        {fixture.fixture.venue ? (
          <div>
            <span className="font-medium">Venue:</span> {fixture.fixture.venue.name}, {fixture.fixture.venue.city}
          </div>
        ) : (
          <div>Venue information unavailable</div>
        )}
      </div>
    </div>
  );
} 