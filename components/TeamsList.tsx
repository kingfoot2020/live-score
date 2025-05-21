"use client"

import React, { useState, useRef } from 'react'
import { FiChevronRight, FiSearch } from 'react-icons/fi'
import { Team } from '../types'
import useApiData from '../hooks/useApiData'
import { getSelectedTeams } from '../services/api'
import TeamsSkeleton from './skeletons/TeamsSkeleton'

const TeamsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  
  // Fetch teams data from API
  const { data: teams, isLoading, error } = useApiData<Team[]>(
    getSelectedTeams,
    'selected-teams'
  );
  
  const filteredTeams: Team[] = searchTerm && teams
    ? teams.filter(team => 
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        team.country.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : teams || [];
  
  const toggleSearch = (): void => {
    setShowSearch(!showSearch)
    if (!showSearch) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      setSearchTerm('')
    }
  }
  
  return (
    <div suppressHydrationWarning={true}>
      <div className="flex justify-between items-center mb-3" suppressHydrationWarning={true}>
        <div className="text-sm text-gray-500 font-medium" suppressHydrationWarning={true}>
          {filteredTeams.length} Teams
        </div>
        <button 
          onClick={toggleSearch}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={showSearch ? "Close search" : "Search teams"}
        >
          <FiSearch className="text-gray-500 w-4 h-4" />
        </button>
      </div>
      
      {showSearch && (
        <div className="mb-3 animate-fade-in" suppressHydrationWarning={true}>
          <div className="relative" suppressHydrationWarning={true}>
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search teams..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      )}
      
      {/* Loading state with skeleton */}
      {isLoading && <TeamsSkeleton />}
      
      {/* Error state */}
      {error && (
        <div className="py-4 text-center text-red-500 text-sm" suppressHydrationWarning={true}>
          Error loading teams. Please try again later.
        </div>
      )}
      
      {/* Teams list */}
      {!isLoading && !error && (
        <div className="divide-y divide-gray-100 max-h-[350px] overflow-y-auto custom-scrollbar pr-1" suppressHydrationWarning={true}>
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <div 
                key={team.id} 
                className="flex items-center py-2.5 hover:bg-gray-50 transition-colors rounded-lg px-2 cursor-pointer group"
                suppressHydrationWarning={true}
              >
                <div className="w-8 h-8 mr-3 flex-shrink-0" suppressHydrationWarning={true}>
                  <img 
                    src={team.logo || 'https://via.placeholder.com/32'} 
                    alt={team.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0" suppressHydrationWarning={true}>
                  <div className="font-medium text-gray-900 truncate" suppressHydrationWarning={true}>{team.name}</div>
                  <div className="flex items-center text-xs text-gray-500 mt-0.5" suppressHydrationWarning={true}>
                    <img 
                      src={team.flag} 
                      alt={team.country} 
                      className="w-3.5 h-auto mr-1" 
                      onError={(e) => {
                        // Handle image load errors by setting a placeholder
                        e.currentTarget.src = 'https://via.placeholder.com/24';
                      }}
                    />
                    <span className="truncate">{team.country}</span>
                  </div>
                </div>
                <FiChevronRight className="text-gray-300 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500" suppressHydrationWarning={true}>
              <p>No teams found</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      )}
      
      <div className="text-center mt-3" suppressHydrationWarning={true}>
        <button className="text-primary text-sm font-medium hover:underline">
          View All Teams
        </button>
      </div>
    </div>
  )
}

export default TeamsList 