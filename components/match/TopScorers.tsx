import React from 'react';
import Image from 'next/image';

type Player = {
  player: {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    photo: string;
  };
  statistics: {
    team: {
      id: number;
      name: string;
      logo: string;
    };
    goals: {
      total: number;
      assists: number;
      penalties: number;
    };
    games: {
      appearences: number;
      minutes: number;
    };
  }[];
};

type FixtureData = {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    season: number;
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
  topScorers?: Player[];
};

type TopScorersProps = {
  fixture: FixtureData;
};

export default function TopScorers({ fixture }: TopScorersProps) {
  // Mock top scorers data if API doesn't provide it
  const mockTopScorers: Player[] = [
    {
      player: {
        id: 1,
        name: 'Player A',
        firstname: 'Player',
        lastname: 'A',
        photo: '/placeholder-player.png'
      },
      statistics: [{
        team: {
          id: 1,
          name: 'Team A',
          logo: '/placeholder-team.png'
        },
        goals: {
          total: 15,
          assists: 7,
          penalties: 3
        },
        games: {
          appearences: 20,
          minutes: 1752
        }
      }]
    },
    {
      player: {
        id: 2,
        name: 'Player B',
        firstname: 'Player',
        lastname: 'B',
        photo: '/placeholder-player.png'
      },
      statistics: [{
        team: {
          id: fixture.teams.home.id,
          name: fixture.teams.home.name,
          logo: '/placeholder-team.png'
        },
        goals: {
          total: 12,
          assists: 5,
          penalties: 2
        },
        games: {
          appearences: 19,
          minutes: 1680
        }
      }]
    },
    {
      player: {
        id: 3,
        name: 'Player C',
        firstname: 'Player',
        lastname: 'C',
        photo: '/placeholder-player.png'
      },
      statistics: [{
        team: {
          id: 3,
          name: 'Team C',
          logo: '/placeholder-team.png'
        },
        goals: {
          total: 10,
          assists: 3,
          penalties: 1
        },
        games: {
          appearences: 18,
          minutes: 1620
        }
      }]
    },
    {
      player: {
        id: 4,
        name: 'Player D',
        firstname: 'Player',
        lastname: 'D',
        photo: '/placeholder-player.png'
      },
      statistics: [{
        team: {
          id: fixture.teams.away.id,
          name: fixture.teams.away.name,
          logo: '/placeholder-team.png'
        },
        goals: {
          total: 9,
          assists: 8,
          penalties: 1
        },
        games: {
          appearences: 20,
          minutes: 1800
        }
      }]
    },
    {
      player: {
        id: 5,
        name: 'Player E',
        firstname: 'Player',
        lastname: 'E',
        photo: '/placeholder-player.png'
      },
      statistics: [{
        team: {
          id: 5,
          name: 'Team E',
          logo: '/placeholder-team.png'
        },
        goals: {
          total: 8,
          assists: 2,
          penalties: 0
        },
        games: {
          appearences: 17,
          minutes: 1485
        }
      }]
    },
    {
      player: {
        id: 6,
        name: 'Player F',
        firstname: 'Player',
        lastname: 'F',
        photo: '/placeholder-player.png'
      },
      statistics: [{
        team: {
          id: 6,
          name: 'Team F',
          logo: '/placeholder-team.png'
        },
        goals: {
          total: 7,
          assists: 4,
          penalties: 2
        },
        games: {
          appearences: 18,
          minutes: 1602
        }
      }]
    },
    {
      player: {
        id: 7,
        name: 'Player G',
        firstname: 'Player',
        lastname: 'G',
        photo: '/placeholder-player.png'
      },
      statistics: [{
        team: {
          id: 7,
          name: 'Team G',
          logo: '/placeholder-team.png'
        },
        goals: {
          total: 7,
          assists: 1,
          penalties: 0
        },
        games: {
          appearences: 16,
          minutes: 1350
        }
      }]
    },
    {
      player: {
        id: 8,
        name: 'Player H',
        firstname: 'Player',
        lastname: 'H',
        photo: '/placeholder-player.png'
      },
      statistics: [{
        team: {
          id: fixture.teams.home.id,
          name: fixture.teams.home.name,
          logo: '/placeholder-team.png'
        },
        goals: {
          total: 6,
          assists: 6,
          penalties: 1
        },
        games: {
          appearences: 19,
          minutes: 1710
        }
      }]
    },
    {
      player: {
        id: 9,
        name: 'Player I',
        firstname: 'Player',
        lastname: 'I',
        photo: '/placeholder-player.png'
      },
      statistics: [{
        team: {
          id: 9,
          name: 'Team I',
          logo: '/placeholder-team.png'
        },
        goals: {
          total: 6,
          assists: 3,
          penalties: 0
        },
        games: {
          appearences: 17,
          minutes: 1479
        }
      }]
    },
    {
      player: {
        id: 10,
        name: 'Player J',
        firstname: 'Player',
        lastname: 'J',
        photo: '/placeholder-player.png'
      },
      statistics: [{
        team: {
          id: fixture.teams.away.id,
          name: fixture.teams.away.name,
          logo: '/placeholder-team.png'
        },
        goals: {
          total: 5,
          assists: 7,
          penalties: 0
        },
        games: {
          appearences: 18,
          minutes: 1600
        }
      }]
    }
  ];
  
  // Get top scorers data, or use mock if not available
  const topScorersData = fixture.topScorers || mockTopScorers;
  
  // Function to highlight if player is from one of the fixture teams
  const isFixtureTeamPlayer = (teamId: number) => {
    return teamId === fixture.teams.home.id || teamId === fixture.teams.away.id;
  };
  
  // Calculate minutes per goal
  const getMinutesPerGoal = (minutes: number, goals: number) => {
    if (goals === 0) return '-';
    return Math.round(minutes / goals);
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Image 
          src={fixture.league.logo || '/placeholder-league.png'} 
          alt={fixture.league.name}
          width={30}
          height={30}
          className="mr-3"
        />
        <div>
          <h3 className="font-bold">{fixture.league.name}</h3>
          <p className="text-sm text-gray-500">{fixture.league.country} • Season {fixture.league.season}</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-4 text-left w-10">#</th>
              <th className="py-3 px-4 text-left">Player</th>
              <th className="py-3 px-4 text-left">Team</th>
              <th className="py-3 px-2 text-center">Goals</th>
              <th className="py-3 px-2 text-center">Penalties</th>
              <th className="py-3 px-2 text-center">Assists</th>
              <th className="py-3 px-2 text-center">Apps</th>
              <th className="py-3 px-2 text-center">Minutes</th>
              <th className="py-3 px-2 text-center">Min/Goal</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {topScorersData.map((player, index) => {
              const stats = player.statistics[0]; // Get first statistics entry
              
              return (
                <tr 
                  key={index} 
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    isFixtureTeamPlayer(stats.team.id) ? 'bg-primary bg-opacity-5' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-medium">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3 rounded-full overflow-hidden bg-gray-100">
                        <Image 
                          src={player.player.photo || '/placeholder-player.png'} 
                          alt={player.player.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium">{player.player.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-5 h-5 mr-2">
                        <Image 
                          src={stats.team.logo || '/placeholder-team.png'} 
                          alt={stats.team.name}
                          width={20}
                          height={20}
                        />
                      </div>
                      <span>{stats.team.name}</span>
                      {isFixtureTeamPlayer(stats.team.id) && (
                        <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-primary bg-opacity-10 text-primary">
                          {stats.team.id === fixture.teams.home.id ? 'Home' : 'Away'}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center font-bold">{stats.goals.total}</td>
                  <td className="py-3 px-2 text-center">{stats.goals.penalties}</td>
                  <td className="py-3 px-2 text-center">{stats.goals.assists}</td>
                  <td className="py-3 px-2 text-center">{stats.games.appearences}</td>
                  <td className="py-3 px-2 text-center">{stats.games.minutes}</td>
                  <td className="py-3 px-2 text-center text-gray-600">
                    {getMinutesPerGoal(stats.games.minutes, stats.goals.total)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>* Top goal scorers in the {fixture.league.name} for season {fixture.league.season}</p>
      </div>
    </div>
  );
} 