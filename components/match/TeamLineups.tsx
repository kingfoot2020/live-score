import React from 'react';
import Image from 'next/image';

type Player = {
  id: number;
  name: string;
  number: number;
  pos: string;
  grid: string | null;
  photo?: string;
};

type Coach = {
  id: number;
  name: string;
  photo?: string;
};

type TeamData = {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  coach: Coach;
  formation: string;
  startXI: {
    player: Player;
  }[];
  substitutes: {
    player: Player;
  }[];
};

type LineupData = {
  team: {
    home: TeamData;
    away: TeamData;
  };
};

type FixtureData = {
  lineup?: LineupData;
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
};

type TeamLineupsProps = {
  fixture: FixtureData;
};

export default function TeamLineups({ fixture }: TeamLineupsProps) {
  const hasLineups = fixture.lineup && fixture.lineup.team;
  
  // If we don't have lineup data, show a message
  if (!hasLineups) {
    return (
      <div className="text-center py-6">
        <div className="text-gray-500 mb-2">Lineups not available yet</div>
        <p className="text-sm text-gray-400">
          Lineups are typically published about one hour before the match starts.
        </p>
      </div>
    );
  }
  
  const homeTeam = fixture.lineup!.team.home;
  const awayTeam = fixture.lineup!.team.away;
  
  return (
    <div className="space-y-8">
      {/* Formations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Home Team Formation */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image 
                src={homeTeam.team.logo || '/placeholder-team.png'} 
                alt={homeTeam.team.name}
                width={30}
                height={30}
                className="mr-2"
              />
              <h3 className="font-bold">{homeTeam.team.name}</h3>
            </div>
            <div className="bg-primary bg-opacity-10 text-primary text-sm px-3 py-1 rounded-full">
              Formation: {homeTeam.formation || 'N/A'}
            </div>
          </div>
          
          <div className="relative w-full h-[340px] bg-gradient-to-b from-green-600 to-green-700 rounded-lg overflow-hidden">
            {/* Field markings */}
            <div className="absolute inset-0 flex flex-col">
              <div className="w-full flex-1 border-b-2 border-white border-opacity-30 flex items-center justify-center">
                <div className="w-[80%] h-[80%] border-2 border-white border-opacity-30 rounded-full"></div>
              </div>
              <div className="w-full flex-1"></div>
            </div>
            
            {/* Players positioning based on formation */}
            <div className="absolute inset-0 p-4">
              {/* This is a simplified representation. In a real implementation, you would position 
                  players based on their 'grid' value or calculate positions from the formation */}
              <div className="grid grid-cols-3 gap-2 h-full">
                <div className="flex flex-col justify-around">
                  {homeTeam.startXI.slice(1, 4).map((player, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sm font-bold mb-1">
                        {player.player.number}
                      </div>
                      <div className="text-xs text-white text-center truncate max-w-[80px]">
                        {player.player.name}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-around">
                  {homeTeam.startXI.slice(4, 8).map((player, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sm font-bold mb-1">
                        {player.player.number}
                      </div>
                      <div className="text-xs text-white text-center truncate max-w-[80px]">
                        {player.player.name}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-around">
                  {homeTeam.startXI.slice(8, 11).map((player, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sm font-bold mb-1">
                        {player.player.number}
                      </div>
                      <div className="text-xs text-white text-center truncate max-w-[80px]">
                        {player.player.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Away Team Formation */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image 
                src={awayTeam.team.logo || '/placeholder-team.png'} 
                alt={awayTeam.team.name}
                width={30}
                height={30}
                className="mr-2"
              />
              <h3 className="font-bold">{awayTeam.team.name}</h3>
            </div>
            <div className="bg-primary bg-opacity-10 text-primary text-sm px-3 py-1 rounded-full">
              Formation: {awayTeam.formation || 'N/A'}
            </div>
          </div>
          
          <div className="relative w-full h-[340px] bg-gradient-to-b from-green-600 to-green-700 rounded-lg overflow-hidden">
            {/* Field markings */}
            <div className="absolute inset-0 flex flex-col">
              <div className="w-full flex-1 border-b-2 border-white border-opacity-30 flex items-center justify-center">
                <div className="w-[80%] h-[80%] border-2 border-white border-opacity-30 rounded-full"></div>
              </div>
              <div className="w-full flex-1"></div>
            </div>
            
            {/* Players positioning based on formation */}
            <div className="absolute inset-0 p-4">
              <div className="grid grid-cols-3 gap-2 h-full">
                <div className="flex flex-col justify-around">
                  {awayTeam.startXI.slice(1, 4).map((player, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sm font-bold mb-1">
                        {player.player.number}
                      </div>
                      <div className="text-xs text-white text-center truncate max-w-[80px]">
                        {player.player.name}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-around">
                  {awayTeam.startXI.slice(4, 8).map((player, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sm font-bold mb-1">
                        {player.player.number}
                      </div>
                      <div className="text-xs text-white text-center truncate max-w-[80px]">
                        {player.player.name}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-around">
                  {awayTeam.startXI.slice(8, 11).map((player, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sm font-bold mb-1">
                        {player.player.number}
                      </div>
                      <div className="text-xs text-white text-center truncate max-w-[80px]">
                        {player.player.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Starting Lineups and Subs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Home Team Lineups */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image 
                src={homeTeam.team.logo || '/placeholder-team.png'} 
                alt={homeTeam.team.name}
                width={20}
                height={20}
                className="mr-2"
              />
              <h3 className="font-semibold">{homeTeam.team.name} Lineup</h3>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="material-icons-outlined text-primary mr-1">person</span>
              Coach: {homeTeam.coach.name}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-3">
              <h4 className="font-medium text-sm text-gray-500 mb-2">Starting XI</h4>
              <div className="space-y-2">
                {homeTeam.startXI.map((player, index) => (
                  <div key={index} className="flex items-center py-1 border-b border-gray-100 last:border-0">
                    <div className="w-8 text-center text-sm font-bold text-gray-700 mr-2">
                      {player.player.number}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{player.player.name}</div>
                      <div className="text-xs text-gray-500">{player.player.pos || 'Unknown'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-3">
              <h4 className="font-medium text-sm text-gray-500 mb-2">Substitutes</h4>
              <div className="space-y-2">
                {homeTeam.substitutes.map((player, index) => (
                  <div key={index} className="flex items-center py-1 border-b border-gray-100 last:border-0">
                    <div className="w-8 text-center text-sm font-bold text-gray-700 mr-2">
                      {player.player.number}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{player.player.name}</div>
                      <div className="text-xs text-gray-500">{player.player.pos || 'Unknown'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Away Team Lineups */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image 
                src={awayTeam.team.logo || '/placeholder-team.png'} 
                alt={awayTeam.team.name}
                width={20}
                height={20}
                className="mr-2"
              />
              <h3 className="font-semibold">{awayTeam.team.name} Lineup</h3>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="material-icons-outlined text-primary mr-1">person</span>
              Coach: {awayTeam.coach.name}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-3">
              <h4 className="font-medium text-sm text-gray-500 mb-2">Starting XI</h4>
              <div className="space-y-2">
                {awayTeam.startXI.map((player, index) => (
                  <div key={index} className="flex items-center py-1 border-b border-gray-100 last:border-0">
                    <div className="w-8 text-center text-sm font-bold text-gray-700 mr-2">
                      {player.player.number}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{player.player.name}</div>
                      <div className="text-xs text-gray-500">{player.player.pos || 'Unknown'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-3">
              <h4 className="font-medium text-sm text-gray-500 mb-2">Substitutes</h4>
              <div className="space-y-2">
                {awayTeam.substitutes.map((player, index) => (
                  <div key={index} className="flex items-center py-1 border-b border-gray-100 last:border-0">
                    <div className="w-8 text-center text-sm font-bold text-gray-700 mr-2">
                      {player.player.number}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{player.player.name}</div>
                      <div className="text-xs text-gray-500">{player.player.pos || 'Unknown'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 