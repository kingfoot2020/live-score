"use client"

import React, { useState, useEffect } from 'react'
import { FiClock, FiChevronRight } from 'react-icons/fi'
import Image from 'next/image'
import { FeaturedMatchType } from '../types'
import useApiData from '../hooks/useApiData'
import { getFixturesByDate, getFixtureDetails } from '../services/api'

const FeaturedMatch: React.FC = () => {
  // Using state for client-rendered content
  const [timeString, setTimeString] = useState<string>('')
  const [featuredFixtureId, setFeaturedFixtureId] = useState<number | null>(null)
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]
  
  // Fetch upcoming fixtures
  const { data: fixtures, isLoading: fixturesLoading, error: fixturesError } = useApiData(
    () => getFixturesByDate(today),
    `fixtures-${today}`,
    []
  )
  
  // Once fixtures are loaded, select a featured match (first live match or first upcoming match)
  useEffect(() => {
    if (fixtures && fixtures.length > 0) {
      // Try to find a live match first
      const liveMatch = fixtures.find(match => match.status === 'Live')
      
      if (liveMatch) {
        setFeaturedFixtureId(liveMatch.id)
      } else {
        // If no live match, use the first upcoming match
        const upcomingMatch = fixtures.find(match => match.status === 'Not Started')
        if (upcomingMatch) {
          setFeaturedFixtureId(upcomingMatch.id)
        }
      }
    }
  }, [fixtures])
  
  // Fetch details for the selected featured fixture
  const { data: fixtureDetails, isLoading: detailsLoading, error: detailsError } = useApiData(
    () => featuredFixtureId ? getFixtureDetails(featuredFixtureId) : Promise.resolve(null),
    featuredFixtureId ? `fixture-details-${featuredFixtureId}` : undefined,
    [featuredFixtureId]
  )
  
  // Determine if we're loading or have an error
  const isLoading = fixturesLoading || (featuredFixtureId && detailsLoading)
  const error = fixturesError || detailsError
  
  // Get the featured match from the fixtures list to show basic info while details load
  const basicMatchInfo = featuredFixtureId && fixtures 
    ? fixtures.find(match => match.id === featuredFixtureId) 
    : null
  
  // Format time for display on client side only
  useEffect(() => {
    if (basicMatchInfo) {
      const matchDate = new Date(`${basicMatchInfo.date}T${basicMatchInfo.time}`)
      setTimeString(matchDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
      }))
    }
  }, [basicMatchInfo])
  
  // If loading or error, show appropriate state
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-primary to-accent rounded-xl text-white overflow-hidden shadow-card p-10 flex justify-center items-center" suppressHydrationWarning={true}>
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mr-3" suppressHydrationWarning={true}></div>
        <p className="font-medium">Loading featured match...</p>
      </div>
    )
  }
  
  if (error || !basicMatchInfo) {
    return (
      <div className="bg-gradient-to-br from-primary to-accent rounded-xl text-white overflow-hidden shadow-card p-8 text-center" suppressHydrationWarning={true}>
        <p className="text-xl font-bold mb-2">No Featured Match Available</p>
        <p className="opacity-80">Check back later for upcoming matches</p>
      </div>
    )
  }
  
  // Determine if the match is live
  const isLive = basicMatchInfo.status === 'Live'
  
  // Generate mock odds if real odds are not available
  const mockOdds = {
    home: '1.85',
    draw: '3.40',
    away: '2.20'
  }
  
  return (
    <div className="bg-gradient-to-br from-primary to-accent rounded-xl text-white overflow-hidden shadow-card" suppressHydrationWarning={true}>
      <div className="relative" suppressHydrationWarning={true}>
        <div className="absolute inset-0 bg-black bg-opacity-20" suppressHydrationWarning={true}></div>
        
        <div className="relative p-5" suppressHydrationWarning={true}>
          <div className="flex justify-between items-center mb-3" suppressHydrationWarning={true}>
            <div className="flex items-center" suppressHydrationWarning={true}>
              <div className="bg-white p-1 rounded-full w-7 h-7 flex items-center justify-center mr-2" suppressHydrationWarning={true}>
                <img src={basicMatchInfo.competition.logo} alt={basicMatchInfo.competition.name} className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">{basicMatchInfo.competition.name}</span>
            </div>
            
            <div className="flex items-center bg-black bg-opacity-30 px-3 py-1 rounded-full text-xs font-medium" suppressHydrationWarning={true}>
              {isLive ? (
                <>
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  LIVE {basicMatchInfo.elapsed ? `${basicMatchInfo.elapsed}'` : ''}
                </>
              ) : (
                <>
                  <FiClock className="mr-1" />
                  Today, {basicMatchInfo.time}
                </>
              )}
              </div>
          </div>
          
          <h3 className="text-xl font-bold mb-4">
            {basicMatchInfo.homeTeam.name} vs {basicMatchInfo.awayTeam.name}
          </h3>
          
          <div className="flex items-center justify-between mb-6" suppressHydrationWarning={true}>
            <div className="flex items-center" suppressHydrationWarning={true}>
              <div className="w-12 h-12 bg-white rounded-full p-1 flex items-center justify-center" suppressHydrationWarning={true}>
                <img src={basicMatchInfo.homeTeam.logo} alt={basicMatchInfo.homeTeam.name} className="w-9 h-9" />
              </div>
              {isLive && basicMatchInfo.homeScore !== undefined && basicMatchInfo.awayScore !== undefined ? (
                <div className="mx-3 font-bold text-xl" suppressHydrationWarning={true}>
                  {basicMatchInfo.homeScore} - {basicMatchInfo.awayScore}
                </div>
              ) : (
                <div className="mx-3 font-bold text-xl" suppressHydrationWarning={true}>VS</div>
              )}
              <div className="w-12 h-12 bg-white rounded-full p-1 flex items-center justify-center" suppressHydrationWarning={true}>
                <img src={basicMatchInfo.awayTeam.logo} alt={basicMatchInfo.awayTeam.name} className="w-9 h-9" />
              </div>
            </div>
            
            <div className="flex space-x-2" suppressHydrationWarning={true}>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-center" suppressHydrationWarning={true}>
                <div className="text-xs opacity-80" suppressHydrationWarning={true}>1</div>
                <div className="font-bold" suppressHydrationWarning={true}>{mockOdds.home}</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-center" suppressHydrationWarning={true}>
                <div className="text-xs opacity-80" suppressHydrationWarning={true}>X</div>
                <div className="font-bold" suppressHydrationWarning={true}>{mockOdds.draw}</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-center" suppressHydrationWarning={true}>
                <div className="text-xs opacity-80" suppressHydrationWarning={true}>2</div>
                <div className="font-bold" suppressHydrationWarning={true}>{mockOdds.away}</div>
              </div>
            </div>
          </div>
          
          <div className="text-sm opacity-90 mb-4" suppressHydrationWarning={true}>
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