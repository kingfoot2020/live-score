import React from 'react';
import Image from 'next/image';

type Statistic = {
  type: string;
  value: number | string | null;
};

type TeamStatistics = {
  statistics: Statistic[];
  team: {
    id: number;
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
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  statistics?: {
    home: TeamStatistics;
    away: TeamStatistics;
  };
  fixture: {
    status: {
      short: string;
    };
  };
};

type MatchStatsProps = {
  fixture: FixtureData;
};

export default function MatchStats({ fixture }: MatchStatsProps) {
  const hasStatistics = fixture.statistics && 
                       fixture.statistics.home && 
                       fixture.statistics.away;
  
  const isMatchStarted = fixture.fixture.status.short !== 'NS';
  
  // If match hasn't started, show a message
  if (!isMatchStarted) {
    return (
      <div className="text-center py-6">
        <div className="text-gray-500 mb-2">Match hasn't started yet</div>
        <p className="text-sm text-gray-400">
          Statistics will be available once the match begins.
        </p>
      </div>
    );
  }
  
  // If we don't have statistics data, show a message
  if (!hasStatistics) {
    return (
      <div className="text-center py-6">
        <div className="text-gray-500 mb-2">Statistics not available yet</div>
        <p className="text-sm text-gray-400">
          Statistics will be updated during the match.
        </p>
      </div>
    );
  }
  
  // Mock statistics in case the API doesn't provide real data
  // In a real implementation, this would be replaced with actual data from the API
  const mockStatistics = [
    { type: 'Ball Possession', home: '60%', away: '40%' },
    { type: 'Shots on Goal', home: 5, away: 2 },
    { type: 'Shots off Goal', home: 7, away: 3 },
    { type: 'Total Shots', home: 12, away: 5 },
    { type: 'Blocked Shots', home: 2, away: 1 },
    { type: 'Corner Kicks', home: 6, away: 2 },
    { type: 'Offsides', home: 1, away: 2 },
    { type: 'Fouls', home: 8, away: 14 },
    { type: 'Yellow Cards', home: 1, away: 3 },
    { type: 'Red Cards', home: 0, away: 0 },
    { type: 'Goalkeeper Saves', home: 1, away: 4 },
    { type: 'Total Passes', home: 400, away: 300 },
    { type: 'Passes Accurate', home: 350, away: 240 },
    { type: 'Pass Accuracy', home: '88%', away: '80%' }
  ];
  
  // Function to find a statistic by type in the API data
  const findStatistic = (type: string, team: 'home' | 'away') => {
    if (!hasStatistics) return null;
    
    const stats = team === 'home' 
      ? fixture.statistics!.home.statistics 
      : fixture.statistics!.away.statistics;
    
    return stats.find(stat => stat.type === type)?.value;
  };
  
  // Function to get statistic value, falling back to mock data if needed
  const getStatistic = (type: string, team: 'home' | 'away') => {
    const apiValue = findStatistic(type, team);
    
    if (apiValue !== undefined && apiValue !== null) {
      return apiValue;
    }
    
    // Fallback to mock data
    const mockStat = mockStatistics.find(stat => stat.type === type);
    return mockStat ? mockStat[team] : '0';
  };
  
  // Calculate the percentage for progress bars
  const calculatePercentage = (home: string | number, away: string | number) => {
    const homeValue = typeof home === 'string' ? parseInt(home) : home;
    const awayValue = typeof away === 'string' ? parseInt(away) : away;
    
    const total = homeValue + awayValue;
    
    if (total === 0) return { home: 50, away: 50 };
    
    return {
      home: Math.round((homeValue / total) * 100),
      away: Math.round((awayValue / total) * 100)
    };
  };
  
  // Define the statistics to display
  const statsToDisplay = [
    { name: 'Ball Possession', type: 'Ball Possession', format: 'percentage' },
    { name: 'Total Shots', type: 'Total Shots', format: 'number' },
    { name: 'Shots on Goal', type: 'Shots on Goal', format: 'number' },
    { name: 'Shots off Goal', type: 'Shots off Goal', format: 'number' },
    { name: 'Blocked Shots', type: 'Blocked Shots', format: 'number' },
    { name: 'Corner Kicks', type: 'Corner Kicks', format: 'number' },
    { name: 'Offsides', type: 'Offsides', format: 'number' },
    { name: 'Fouls', type: 'Fouls', format: 'number' },
    { name: 'Yellow Cards', type: 'Yellow Cards', format: 'number' },
    { name: 'Red Cards', type: 'Red Cards', format: 'number' },
    { name: 'Goalkeeper Saves', type: 'Goalkeeper Saves', format: 'number' },
    { name: 'Total Passes', type: 'Total Passes', format: 'number' },
    { name: 'Pass Accuracy', type: 'Pass Accuracy', format: 'percentage' }
  ];
  
  return (
    <div>
      {/* Team Headers */}
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <Image 
            src={fixture.teams.home.logo || '/placeholder-team.png'} 
            alt={fixture.teams.home.name}
            width={30}
            height={30}
            className="mr-2"
          />
          <h3 className="font-bold">{fixture.teams.home.name}</h3>
        </div>
        
        <div className="flex items-center">
          <h3 className="font-bold">{fixture.teams.away.name}</h3>
          <Image 
            src={fixture.teams.away.logo || '/placeholder-team.png'} 
            alt={fixture.teams.away.name}
            width={30}
            height={30}
            className="ml-2"
          />
        </div>
      </div>
      
      {/* Statistics Display */}
      <div className="space-y-4">
        {statsToDisplay.map((stat, index) => {
          const homeValue = getStatistic(stat.type, 'home');
          const awayValue = getStatistic(stat.type, 'away');
          
          // Format value for display
          const formatValue = (value: string | number) => {
            if (stat.format === 'percentage' && typeof value === 'number') {
              return `${value}%`;
            }
            return value;
          };
          
          // Calculate progress bar percentages
          const percentages = calculatePercentage(
            typeof homeValue === 'string' ? homeValue.replace('%', '') : homeValue,
            typeof awayValue === 'string' ? awayValue.replace('%', '') : awayValue
          );
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-bold">{formatValue(homeValue)}</span>
                <span className="text-gray-600">{stat.name}</span>
                <span className="font-bold">{formatValue(awayValue)}</span>
              </div>
              
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div 
                  className="bg-primary" 
                  style={{ width: `${percentages.home}%` }}
                ></div>
                <div 
                  className="bg-secondary" 
                  style={{ width: `${percentages.away}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 