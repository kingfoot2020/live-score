"use client"

import React, { useState } from 'react'
import { FiClock, FiHeart, FiPlusCircle, FiInfo } from 'react-icons/fi'
import { BsTwitter } from 'react-icons/bs'
import { Match } from '../types'
import useApiData from '../hooks/useApiData'
import { getFixturesByDate } from '../services/api'

const LiveMatches: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'live' | 'favorites'>('all')
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]
  
  // Fetch today's fixtures
  const { data: matches, isLoading, error } = useApiData<Match[]>(
    () => getFixturesByDate(today),
    `fixtures-${today}-livematches`
  )
  
  // Filter matches based on selected filter
  const filteredMatches = matches ? matches.filter(match => {
    if (filter === 'all') return true
    if (filter === 'live') return match.status === 'Live'
    if (filter === 'favorites') return false // TODO: Implement favorites functionality
    return true
  }) : []
  
  // Count matches by status
  const liveCount = matches ? matches.filter(match => match.status === 'Live').length : 0
  const allCount = matches ? matches.length : 0
  const favoritesCount = 0 // TODO: Implement favorites functionality
  
  // Function to render a featured live match
  const renderFeaturedMatch = (match: Match) => {
  return (
      <div className="relative bg-white rounded-lg overflow-hidden mb-4" suppressHydrationWarning={true} key={match.id}>
        <div className="px-4 pt-4 pb-3" suppressHydrationWarning={true}>
          <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-medium" suppressHydrationWarning={true}>
            {match.competition.name} / {match.competition.country}
          </div>
          
          <div className="flex justify-between items-center" suppressHydrationWarning={true}>
            <div className="flex flex-col items-center" suppressHydrationWarning={true}>
              <div className="bg-gray-50 rounded-full p-2 mb-2" suppressHydrationWarning={true}>
                <img 
                  src={match.homeTeam.logo} 
                  alt={match.homeTeam.name} 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="text-sm font-medium" suppressHydrationWarning={true}>{match.homeTeam.name}</div>
            </div>
            
            <div className="text-center px-2" suppressHydrationWarning={true}>
              {match.status === 'Live' && (
                <div className="mb-1 inline-block py-0.5 px-2 bg-red-500 text-white text-xs font-medium rounded-full" suppressHydrationWarning={true}>
                  LIVE
                </div>
              )}
              <div className="flex items-center justify-center" suppressHydrationWarning={true}>
                <div className="text-2xl font-bold" suppressHydrationWarning={true}>
                  {match.homeScore !== undefined ? match.homeScore : '-'}
                </div>
                <div className="mx-2 text-2xl font-bold text-gray-400" suppressHydrationWarning={true}>:</div>
                <div className="text-2xl font-bold" suppressHydrationWarning={true}>
                  {match.awayScore !== undefined ? match.awayScore : '-'}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1" suppressHydrationWarning={true}>
                {match.status === 'Live' ? (
                  match.elapsed ? `${match.elapsed}'` : <span className="text-red-600 animate-pulse">• LIVE</span>
                ) : match.time}
              </div>
            </div>
            
            <div className="flex flex-col items-center" suppressHydrationWarning={true}>
              <div className="bg-gray-50 rounded-full p-2 mb-2" suppressHydrationWarning={true}>
                <img 
                  src={match.awayTeam.logo} 
                  alt={match.awayTeam.name} 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="text-sm font-medium" suppressHydrationWarning={true}>{match.awayTeam.name}</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-1 px-2 pb-4" suppressHydrationWarning={true}>
          <button className="border border-gray-100 bg-gray-50 hover:bg-gray-100 text-gray-900 py-2 rounded-md flex flex-col items-center justify-center transition-colors">
            <div className="text-xs text-gray-500" suppressHydrationWarning={true}>1</div>
            <div className="text-base font-bold" suppressHydrationWarning={true}>1.85</div>
          </button>
          <button className="border border-gray-100 bg-gray-50 hover:bg-gray-100 text-gray-900 py-2 rounded-md flex flex-col items-center justify-center transition-colors">
            <div className="text-xs text-gray-500" suppressHydrationWarning={true}>X</div>
            <div className="text-base font-bold" suppressHydrationWarning={true}>3.40</div>
          </button>
          <button className="border border-gray-100 bg-gray-50 hover:bg-gray-100 text-gray-900 py-2 rounded-md flex flex-col items-center justify-center transition-colors">
            <div className="text-xs text-gray-500" suppressHydrationWarning={true}>2</div>
            <div className="text-base font-bold" suppressHydrationWarning={true}>2.20</div>
          </button>
        </div>
        
        <div className="border-t border-gray-100 flex" suppressHydrationWarning={true}>
          <button className="flex-1 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-colors">
            <FiInfo className="mr-1.5 text-primary" /> Match details
          </button>
          <div className="w-px h-10 my-auto bg-gray-100" suppressHydrationWarning={true}></div>
          <button className="flex-1 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-colors">
            <FiPlusCircle className="mr-1.5 text-gray-400" /> Add to favorites
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div suppressHydrationWarning={true}>
      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-10" suppressHydrationWarning={true}>
          <div className="w-6 h-6 border-2 border-gray-200 border-t-primary rounded-full animate-spin mr-2" suppressHydrationWarning={true}></div>
          <span className="text-gray-500">Loading matches...</span>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center mb-4" suppressHydrationWarning={true}>
          Error loading matches. Please try again later.
        </div>
      )}
      
      {/* Featured match */}
      {!isLoading && !error && filteredMatches.length > 0 && (
        renderFeaturedMatch(filteredMatches[0])
      )}
      
      {/* Empty state */}
      {!isLoading && !error && filteredMatches.length === 0 && (
        <div className="bg-gray-50 p-6 rounded-lg text-center mb-4" suppressHydrationWarning={true}>
          <div className="text-gray-400 text-2xl mb-2">
            <FiClock className="inline-block" />
          </div>
          <p className="text-gray-600 font-medium">No matches found</p>
          <p className="text-gray-500 text-sm mt-1">Try a different filter</p>
        </div>
      )}
      
      {/* Filter buttons */}
      <div className="flex justify-between gap-2 mb-2" suppressHydrationWarning={true}>
        <button 
          className={`flex-1 ${
            filter === 'all' 
              ? 'bg-primary/10 text-primary border border-primary/20' 
              : 'bg-white border border-gray-200 text-gray-700'
          } font-medium py-2 rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors`}
          onClick={() => setFilter('all')}
        >
          <div className={`w-4 h-4 ${filter === 'all' ? 'bg-primary' : 'bg-gray-200'} rounded-full flex items-center justify-center mr-2`} suppressHydrationWarning={true}>
            {filter === 'all' && <span className="text-white text-xs">✓</span>}
          </div>
          All games <span className={`${filter === 'all' ? 'bg-primary' : 'bg-gray-200'} text-white ml-1 px-1.5 rounded-md text-xs`}>{allCount}</span>
        </button>
        <button 
          className={`flex-1 ${
            filter === 'live' 
              ? 'bg-red-50 text-red-600 border border-red-100' 
              : 'bg-white border border-gray-200 text-gray-700'
          } font-medium py-2 rounded-xl flex items-center justify-center hover:bg-red-50 transition-colors`}
          onClick={() => setFilter('live')}
        >
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2" suppressHydrationWarning={true}></div>
          Live <span className={`bg-red-500 text-white ml-1 px-1.5 rounded-md text-xs`}>{liveCount}</span>
        </button>
      </div>
      
      <button 
        className={`w-full ${
          filter === 'favorites' 
            ? 'bg-amber-50 text-amber-600 border border-amber-100' 
            : 'bg-white border border-gray-200 text-gray-700'
        } font-medium py-2 rounded-xl flex items-center justify-center hover:bg-amber-50 transition-colors`}
        onClick={() => setFilter('favorites')}
      >
        <FiHeart className="mr-2 text-amber-500" />
        Favorites <span className="bg-amber-500 text-white ml-1 px-1.5 rounded-md text-xs">{favoritesCount}</span>
      </button>
    </div>
  )
}

export default LiveMatches 