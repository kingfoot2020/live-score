import React from 'react'
import { FiClock, FiChevronRight } from 'react-icons/fi'
import Image from 'next/image'
import { FeaturedMatchType } from '../types'

const FeaturedMatch: React.FC = () => {
  // This would come from an API in a real app
  const featuredMatch: FeaturedMatchType = {
    league: 'Premier League',
    leagueCountry: 'England',
    homeTeam: 'Liverpool FC',
    awayTeam: 'Manchester United',
    homeTeamLogo: '/team-logos/liverpool.png',
    awayTeamLogo: '/team-logos/manchester-united.png',
    date: new Date('2023-08-24T17:40:00'),
    live: true,
    odds: {
      home: '1.50',
      draw: '3.40',
      away: '2.20'
    },
    totalBets: '+1253'
  }
  
  // Format time for display
  const timeString: string = featuredMatch.date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
  
  return (
    <div className="bg-gradient-to-br from-primary to-accent rounded-xl text-white overflow-hidden shadow-card">
      <div className="relative">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        <div className="relative p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <div className="bg-white p-1 rounded-full w-7 h-7 flex items-center justify-center mr-2">
                <img src="/team-logos/premier-league.png" alt="Premier League" className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">{featuredMatch.league}</span>
            </div>
            
            {featuredMatch.live && (
              <div className="flex items-center bg-black bg-opacity-30 px-3 py-1 rounded-full text-xs font-medium">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                Today, {timeString}
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-bold mb-4">
            {featuredMatch.homeTeam} vs {featuredMatch.awayTeam}
          </h3>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white rounded-full p-1 flex items-center justify-center">
                <img src={featuredMatch.homeTeamLogo} alt={featuredMatch.homeTeam} className="w-9 h-9" />
              </div>
              <div className="mx-3 font-bold text-xl">VS</div>
              <div className="w-12 h-12 bg-white rounded-full p-1 flex items-center justify-center">
                <img src={featuredMatch.awayTeamLogo} alt={featuredMatch.awayTeam} className="w-9 h-9" />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-center">
                <div className="text-xs opacity-80">1</div>
                <div className="font-bold">{featuredMatch.odds.home}</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-center">
                <div className="text-xs opacity-80">X</div>
                <div className="font-bold">{featuredMatch.odds.draw}</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-center">
                <div className="text-xs opacity-80">2</div>
                <div className="font-bold">{featuredMatch.odds.away}</div>
              </div>
            </div>
          </div>
          
          <div className="text-sm opacity-90 mb-4">
            Place a bet on this match today, get instant cashback and participate in various raffles.
          </div>
          
          <button className="w-full bg-white text-primary font-bold py-3 px-5 rounded-lg flex items-center justify-center hover:bg-opacity-90 transition-colors">
            Bet now
            <FiChevronRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeaturedMatch 