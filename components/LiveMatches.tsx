import React from 'react'
import { FiClock, FiHeart, FiPlusCircle, FiInfo } from 'react-icons/fi'
import { BsTwitter } from 'react-icons/bs'

interface TeamData {
  name: string;
  logo: string;
  score: number;
}

interface MatchData {
  homeTeam: TeamData;
  awayTeam: TeamData;
  minute: number;
  isLive: boolean;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
}

interface LeagueData {
  name: string;
  matchday: string;
}

interface LiveMatchData {
  league: LeagueData;
  match: MatchData;
}

const LiveMatches: React.FC = () => {
  // This would come from an API in a real app
  const matchData: LiveMatchData = {
    league: {
      name: 'Italy / Serie A',
      matchday: 'Matchday 2 of 38'
    },
    match: {
      homeTeam: {
        name: 'Napoli',
        logo: '/team-logos/napoli.png',
        score: 2
      },
      awayTeam: {
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
  }
  
  return (
    <div>
      <div className="relative bg-white rounded-lg overflow-hidden mb-4">
        <div className="px-4 pt-4 pb-3">
          <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-medium">
            {matchData.league.name} / {matchData.league.matchday}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <div className="bg-gray-50 rounded-full p-2 mb-2">
                <img 
                  src={matchData.match.homeTeam.logo || 'https://via.placeholder.com/40'} 
                  alt={matchData.match.homeTeam.name} 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="text-sm font-medium">{matchData.match.homeTeam.name}</div>
            </div>
            
            <div className="text-center px-2">
              {matchData.match.isLive && (
                <div className="mb-1 inline-block py-0.5 px-2 bg-red-500 text-white text-xs font-medium rounded-full">
                  LIVE
                </div>
              )}
              <div className="flex items-center justify-center">
                <div className="text-2xl font-bold">
                  {matchData.match.homeTeam.score}
                </div>
                <div className="mx-2 text-2xl font-bold text-gray-400">:</div>
                <div className="text-2xl font-bold">
                  {matchData.match.awayTeam.score}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{matchData.match.minute}'</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-gray-50 rounded-full p-2 mb-2">
                <img 
                  src={matchData.match.awayTeam.logo || 'https://via.placeholder.com/40'} 
                  alt={matchData.match.awayTeam.name} 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="text-sm font-medium">{matchData.match.awayTeam.name}</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-1 px-2 pb-4">
          <button className="border border-gray-100 bg-gray-50 hover:bg-gray-100 text-gray-900 py-2 rounded-md flex flex-col items-center justify-center transition-colors">
            <div className="text-xs text-gray-500">1</div>
            <div className="text-base font-bold">{matchData.match.odds.home}</div>
          </button>
          <button className="border border-gray-100 bg-gray-50 hover:bg-gray-100 text-gray-900 py-2 rounded-md flex flex-col items-center justify-center transition-colors">
            <div className="text-xs text-gray-500">X</div>
            <div className="text-base font-bold">{matchData.match.odds.draw}</div>
          </button>
          <button className="border border-gray-100 bg-gray-50 hover:bg-gray-100 text-gray-900 py-2 rounded-md flex flex-col items-center justify-center transition-colors">
            <div className="text-xs text-gray-500">2</div>
            <div className="text-base font-bold">{matchData.match.odds.away}</div>
          </button>
        </div>
        
        <div className="border-t border-gray-100 flex">
          <button className="flex-1 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-colors">
            <FiInfo className="mr-1.5 text-primary" /> Match details
          </button>
          <div className="w-px h-10 my-auto bg-gray-100"></div>
          <button className="flex-1 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-colors">
            <FiPlusCircle className="mr-1.5 text-gray-400" /> Add to favorites
          </button>
        </div>
      </div>
      
      <div className="flex justify-between gap-2 mb-2">
        <button className="flex-1 bg-primary/10 text-primary font-medium py-2 rounded-xl border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-colors">
          <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center mr-2">
            <span className="text-white text-xs">✓</span>
          </div>
          All games <span className="bg-primary text-white ml-1 px-1.5 rounded-md text-xs">2</span>
        </button>
        <button className="flex-1 bg-white border border-gray-200 text-gray-700 font-medium py-2 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          Live <span className="bg-red-500 text-white ml-1 px-1.5 rounded-md text-xs">6</span>
        </button>
      </div>
      
      <button className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-2 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
        <FiHeart className="mr-2 text-secondary" />
        Favorites <span className="bg-secondary text-white ml-1 px-1.5 rounded-md text-xs">3</span>
      </button>
    </div>
  )
}

export default LiveMatches 