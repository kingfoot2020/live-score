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
    round?: string;
    season?: number;
  };
  fixture: {
    id: number;
    referee?: string | null;
    timezone?: string;
    venue?: {
      name: string;
      city: string;
    };
    status: {
      short: string;
      long: string;
    };
    date?: string;
  };
};

type MatchInfoCardProps = {
  fixture: FixtureData;
};

export default function MatchInfoCard({ fixture }: MatchInfoCardProps) {
  // Add defensive checks to handle potentially missing data
  if (!fixture || !fixture.fixture || !fixture.teams || !fixture.league) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Match Information</h2>
        <div className="text-center py-4">
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
        weekday: 'long',
        year: 'numeric',
        month: 'long',
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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Match Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-8">
              <span className="material-icons-outlined text-primary">event</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{formattedDate}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8">
              <span className="material-icons-outlined text-primary">schedule</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium">{formattedTime} {fixture.fixture.timezone ? `(${fixture.fixture.timezone})` : ''}</p>
            </div>
          </div>
          
          {fixture.fixture.venue && (
            <div className="flex items-center">
              <div className="w-8">
                <span className="material-icons-outlined text-primary">stadium</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Venue</p>
                <p className="font-medium">{fixture.fixture.venue.name}</p>
                <p className="text-sm text-gray-500">{fixture.fixture.venue.city}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-8">
              <span className="material-icons-outlined text-primary">emoji_events</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">League</p>
              <div className="flex items-center">
                <div className="w-5 h-5 mr-2">
                  <Image 
                    src={fixture.league.logo || '/placeholder-league.png'} 
                    alt={fixture.league.name}
                    width={20}
                    height={20}
                  />
                </div>
                <p className="font-medium">{fixture.league.name}</p>
              </div>
              <p className="text-sm text-gray-500">
                {fixture.league.country}
                {fixture.league.round ? ` • ${fixture.league.round}` : ''}
              </p>
            </div>
          </div>
          
          {fixture.fixture.referee && (
            <div className="flex items-center">
              <div className="w-8">
                <span className="material-icons-outlined text-primary">sports</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Referee</p>
                <p className="font-medium">{fixture.fixture.referee}</p>
              </div>
            </div>
          )}
          
          {fixture.fixture.status && (
            <div className="flex items-center">
              <div className="w-8">
                <span className="material-icons-outlined text-primary">info</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{fixture.fixture.status.long}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 border-t border-gray-100 pt-4">
        <h3 className="text-lg font-semibold mb-3">Match Summary</h3>
        <div className="flex items-center justify-center py-2">
          <div className="flex-1 text-right pr-3">
            <p className="font-bold">{fixture.teams.home.name}</p>
          </div>
          <div className="flex items-center justify-center px-3">
            <Image 
              src={fixture.teams.home.logo || '/placeholder-team.png'} 
              alt={fixture.teams.home.name}
              width={36}
              height={36}
              className="mr-2"
            />
            <span className="mx-2 text-gray-400">vs</span>
            <Image 
              src={fixture.teams.away.logo || '/placeholder-team.png'} 
              alt={fixture.teams.away.name}
              width={36}
              height={36}
              className="ml-2"
            />
          </div>
          <div className="flex-1 pl-3">
            <p className="font-bold">{fixture.teams.away.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 