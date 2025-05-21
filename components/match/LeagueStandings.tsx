import React from 'react';
import Image from 'next/image';

type StandingTeam = {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string | null;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
};

type StandingGroup = {
  name: string;
  standings: StandingTeam[];
};

type FixtureData = {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    season: number;
    round: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
    };
    away: {
      id: number;
      name: string;
    };
  };
  standings?: StandingGroup[];
};

type LeagueStandingsProps = {
  fixture: FixtureData;
};

export default function LeagueStandings({ fixture }: LeagueStandingsProps) {
  // Mock standings data if API doesn't provide it
  const mockStandings: StandingTeam[] = [
    {
      rank: 1,
      team: {
        id: 1,
        name: 'Team A',
        logo: '/placeholder-team.png'
      },
      points: 30,
      goalsDiff: 15,
      group: 'Group A',
      form: 'WWWDW',
      status: 'up',
      description: 'Champions League',
      all: {
        played: 12,
        win: 9,
        draw: 3,
        lose: 0,
        goals: {
          for: 25,
          against: 10
        }
      }
    },
    {
      rank: 2,
      team: {
        id: 2,
        name: 'Team B',
        logo: '/placeholder-team.png'
      },
      points: 25,
      goalsDiff: 10,
      group: 'Group A',
      form: 'WDWWL',
      status: 'up',
      description: 'Champions League',
      all: {
        played: 12,
        win: 7,
        draw: 4,
        lose: 1,
        goals: {
          for: 22,
          against: 12
        }
      }
    },
    {
      rank: 3,
      team: {
        id: fixture.teams.home.id,
        name: fixture.teams.home.name,
        logo: '/placeholder-team.png'
      },
      points: 23,
      goalsDiff: 8,
      group: 'Group A',
      form: 'DWWLW',
      status: 'same',
      description: 'Europa League',
      all: {
        played: 12,
        win: 7,
        draw: 2,
        lose: 3,
        goals: {
          for: 18,
          against: 10
        }
      }
    },
    {
      rank: 4,
      team: {
        id: 4,
        name: 'Team D',
        logo: '/placeholder-team.png'
      },
      points: 20,
      goalsDiff: 5,
      group: 'Group A',
      form: 'WLWDW',
      status: 'down',
      description: 'Europa League',
      all: {
        played: 12,
        win: 6,
        draw: 2,
        lose: 4,
        goals: {
          for: 15,
          against: 10
        }
      }
    },
    {
      rank: 5,
      team: {
        id: fixture.teams.away.id,
        name: fixture.teams.away.name,
        logo: '/placeholder-team.png'
      },
      points: 18,
      goalsDiff: 2,
      group: 'Group A',
      form: 'LWDWL',
      status: 'same',
      description: 'Conference League',
      all: {
        played: 12,
        win: 5,
        draw: 3,
        lose: 4,
        goals: {
          for: 14,
          against: 12
        }
      }
    },
    {
      rank: 6,
      team: {
        id: 6,
        name: 'Team F',
        logo: '/placeholder-team.png'
      },
      points: 15,
      goalsDiff: -2,
      group: 'Group A',
      form: 'LDWLD',
      status: 'down',
      description: null,
      all: {
        played: 12,
        win: 4,
        draw: 3,
        lose: 5,
        goals: {
          for: 10,
          against: 12
        }
      }
    },
    {
      rank: 7,
      team: {
        id: 7,
        name: 'Team G',
        logo: '/placeholder-team.png'
      },
      points: 10,
      goalsDiff: -8,
      group: 'Group A',
      form: 'LLDLW',
      status: 'down',
      description: null,
      all: {
        played: 12,
        win: 2,
        draw: 4,
        lose: 6,
        goals: {
          for: 8,
          against: 16
        }
      }
    },
    {
      rank: 8,
      team: {
        id: 8,
        name: 'Team H',
        logo: '/placeholder-team.png'
      },
      points: 5,
      goalsDiff: -15,
      group: 'Group A',
      form: 'LLLLD',
      status: 'down',
      description: 'Relegation',
      all: {
        played: 12,
        win: 1,
        draw: 2,
        lose: 9,
        goals: {
          for: 5,
          against: 20
        }
      }
    }
  ];
  
  // Get standings data, or use mock if not available
  const standingsData = fixture.standings && fixture.standings.length > 0 
    ? fixture.standings[0].standings 
    : mockStandings;
  
  // Function to highlight the home or away team
  const isMatchTeam = (teamId: number) => {
    return teamId === fixture.teams.home.id || teamId === fixture.teams.away.id;
  };
  
  // Function to render form indicators
  const renderForm = (form: string) => {
    if (!form) return null;
    
    return (
      <div className="flex space-x-1">
        {form.split('').map((result, index) => {
          let bgColor = 'bg-gray-200';
          let textColor = 'text-gray-700';
          
          if (result === 'W') {
            bgColor = 'bg-green-100';
            textColor = 'text-green-700';
          } else if (result === 'L') {
            bgColor = 'bg-red-100';
            textColor = 'text-red-700';
          } else if (result === 'D') {
            bgColor = 'bg-yellow-100';
            textColor = 'text-yellow-700';
          }
          
          return (
            <span 
              key={index}
              className={`inline-block w-5 h-5 flex items-center justify-center text-xs font-bold rounded-sm ${bgColor} ${textColor}`}
            >
              {result}
            </span>
          );
        })}
      </div>
    );
  };
  
  // Function to render status indicator
  const renderStatus = (status: string) => {
    if (status === 'up') {
      return <span className="text-green-500 text-lg">↑</span>;
    } else if (status === 'down') {
      return <span className="text-red-500 text-lg">↓</span>;
    }
    return <span className="text-gray-400 text-lg">-</span>;
  };
  
  return (
    <div>
      <div className="flex items-center mb-4">
        <Image 
          src={fixture.league.logo || '/placeholder-league.png'} 
          alt={fixture.league.name}
          width={30}
          height={30}
          className="mr-2"
        />
        <div>
          <h3 className="font-bold">{fixture.league.name}</h3>
          <p className="text-sm text-gray-500">{fixture.league.country} • {fixture.league.season}</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-4 text-left w-12">#</th>
              <th className="py-3 px-4 text-left">Team</th>
              <th className="py-3 px-2 text-center">MP</th>
              <th className="py-3 px-2 text-center">W</th>
              <th className="py-3 px-2 text-center">D</th>
              <th className="py-3 px-2 text-center">L</th>
              <th className="py-3 px-2 text-center">GF</th>
              <th className="py-3 px-2 text-center">GA</th>
              <th className="py-3 px-2 text-center">GD</th>
              <th className="py-3 px-2 text-center">PTS</th>
              <th className="py-3 px-4 text-center">Form</th>
              <th className="py-3 px-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {standingsData.map((team, index) => (
              <tr 
                key={index} 
                className={`border-b border-gray-100 hover:bg-gray-50 ${
                  isMatchTeam(team.team.id) ? 'bg-primary bg-opacity-5' : ''
                }`}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      team.description ? 'bg-primary bg-opacity-10 text-primary' : 'bg-gray-100'
                    }`}>
                      {team.rank}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-2">
                      <Image 
                        src={team.team.logo || '/placeholder-team.png'} 
                        alt={team.team.name}
                        width={24}
                        height={24}
                      />
                    </div>
                    <span className="font-medium">{team.team.name}</span>
                    {isMatchTeam(team.team.id) && (
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary bg-opacity-10 text-primary">
                        {team.team.id === fixture.teams.home.id ? 'Home' : 'Away'}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-2 text-center">{team.all.played}</td>
                <td className="py-3 px-2 text-center">{team.all.win}</td>
                <td className="py-3 px-2 text-center">{team.all.draw}</td>
                <td className="py-3 px-2 text-center">{team.all.lose}</td>
                <td className="py-3 px-2 text-center">{team.all.goals.for}</td>
                <td className="py-3 px-2 text-center">{team.all.goals.against}</td>
                <td className="py-3 px-2 text-center font-medium">
                  {team.goalsDiff > 0 ? `+${team.goalsDiff}` : team.goalsDiff}
                </td>
                <td className="py-3 px-2 text-center font-bold">{team.points}</td>
                <td className="py-3 px-4 text-center">{renderForm(team.form)}</td>
                <td className="py-3 px-2 text-center">{renderStatus(team.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Legend for qualifications */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {['Champions League', 'Europa League', 'Conference League', 'Relegation'].map((desc, index) => (
          <div key={index} className="flex items-center">
            <span className={`w-3 h-3 rounded-full ${
              desc === 'Champions League' ? 'bg-green-500' :
              desc === 'Europa League' ? 'bg-blue-500' :
              desc === 'Conference League' ? 'bg-purple-500' :
              'bg-red-500'
            } mr-2`}></span>
            <span className="text-sm text-gray-600">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 