import React, { useState, useRef } from 'react'
import { FiChevronRight, FiSearch } from 'react-icons/fi'
import { Team } from '../types'

const TeamsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  
  // Sample team data
  const teams: Team[] = [
    {
      id: 1,
      name: 'Arsenal',
      country: 'England',
      logo: '/team-logos/arsenal.png',
      flag: 'https://flagcdn.com/w20/gb-eng.png'
    },
    {
      id: 2,
      name: 'Chelsea',
      country: 'England',
      logo: '/team-logos/chelsea.png',
      flag: 'https://flagcdn.com/w20/gb-eng.png'
    },
    {
      id: 3,
      name: 'Liverpool',
      country: 'England',
      logo: '/team-logos/liverpool.png',
      flag: 'https://flagcdn.com/w20/gb-eng.png'
    },
    {
      id: 4,
      name: 'Manchester City',
      country: 'England',
      logo: '/team-logos/mancity.png',
      flag: 'https://flagcdn.com/w20/gb-eng.png'
    },
    {
      id: 5,
      name: 'Manchester United',
      country: 'England',
      logo: '/team-logos/manchester-united.png',
      flag: 'https://flagcdn.com/w20/gb-eng.png'
    },
    {
      id: 6,
      name: 'Tottenham Hotspur',
      country: 'England',
      logo: '/team-logos/tottenham.png',
      flag: 'https://flagcdn.com/w20/gb-eng.png'
    },
    {
      id: 7,
      name: 'FC Barcelona',
      country: 'Spain',
      logo: '/team-logos/barcelona.png',
      flag: 'https://flagcdn.com/w20/es.png'
    },
    {
      id: 8,
      name: 'Real Madrid',
      country: 'Spain',
      logo: '/team-logos/real-madrid.png',
      flag: 'https://flagcdn.com/w20/es.png'
    },
  ]
  
  const filteredTeams: Team[] = searchTerm
    ? teams.filter(team => 
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        team.country.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : teams
  
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
    <div>
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm text-gray-500 font-medium">
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
        <div className="mb-3 animate-fade-in">
          <div className="relative">
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
      
      <div className="divide-y divide-gray-100 max-h-[350px] overflow-y-auto custom-scrollbar pr-1">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <div 
              key={team.id} 
              className="flex items-center py-2.5 hover:bg-gray-50 transition-colors rounded-lg px-2 cursor-pointer group"
            >
              <div className="w-8 h-8 mr-3 flex-shrink-0">
                <img 
                  src={team.logo || 'https://via.placeholder.com/32'} 
                  alt={team.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{team.name}</div>
                <div className="flex items-center text-xs text-gray-500 mt-0.5">
                  <img 
                    src={team.flag} 
                    alt={team.country} 
                    className="w-3.5 h-auto mr-1" 
                  />
                  <span className="truncate">{team.country}</span>
                </div>
              </div>
              <FiChevronRight className="text-gray-300 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>No teams found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        )}
      </div>
      
      <div className="text-center mt-3">
        <button className="text-primary text-sm font-medium hover:underline">
          View All Teams
        </button>
      </div>
    </div>
  )
}

export default TeamsList 