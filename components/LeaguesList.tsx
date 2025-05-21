import React, { useState, useRef } from 'react'
import { FiChevronRight, FiSearch, FiFilter } from 'react-icons/fi'
import { League, Region } from '../types'

const LeaguesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const inputRef = useRef<HTMLInputElement | null>(null)
  
  // Sample leagues data
  const leagues: League[] = [
    {
      id: 1,
      name: 'CAF Champions League',
      country: 'Africa',
      logo: '/league-logos/caf.png',
      flag: 'https://flagcdn.com/w20/africa.png',
      region: 'Africa'
    },
    {
      id: 2,
      name: 'Copa de la Superliga',
      country: 'Argentina',
      logo: '/league-logos/copa.png',
      flag: 'https://flagcdn.com/w20/ar.png',
      region: 'South America'
    },
    {
      id: 3,
      name: 'Liga Profesional de Fútbol',
      country: 'Argentina',
      logo: '/league-logos/liga-argentina.png',
      flag: 'https://flagcdn.com/w20/ar.png',
      region: 'South America'
    },
    {
      id: 4,
      name: 'AFC Champions League Elite',
      country: 'Asia',
      logo: '/league-logos/afc.png',
      flag: 'https://flagcdn.com/w20/asia.png',
      region: 'Asia'
    },
    {
      id: 5,
      name: 'Pro League',
      country: 'Belgium',
      logo: '/league-logos/belgium.png',
      flag: 'https://flagcdn.com/w20/be.png',
      region: 'Europe'
    },
    {
      id: 6,
      name: 'Serie A',
      country: 'Brazil',
      logo: '/league-logos/serie-a-brazil.png',
      flag: 'https://flagcdn.com/w20/br.png',
      region: 'South America'
    },
    {
      id: 7,
      name: 'Premier League',
      country: 'Egypt',
      logo: '/league-logos/egypt.png',
      flag: 'https://flagcdn.com/w20/eg.png',
      region: 'Africa'
    },
    {
      id: 8,
      name: 'Carabao Cup',
      country: 'England',
      logo: '/league-logos/carabao.png',
      flag: 'https://flagcdn.com/w20/gb-eng.png',
      region: 'Europe'
    }
  ]
  
  const regions: Region[] = [
    { id: 'all', name: 'All' },
    { id: 'europe', name: 'Europe' },
    { id: 'south_america', name: 'South America' },
    { id: 'africa', name: 'Africa' },
    { id: 'asia', name: 'Asia' },
  ]
  
  // Filter leagues by search term and region
  const filteredLeagues: League[] = leagues.filter(league => {
    const matchesSearch = 
      searchTerm === '' || 
      league.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      league.country.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRegion = 
      activeFilter === 'all' || 
      league.region.toLowerCase() === activeFilter.toLowerCase()
    
    return matchesSearch && matchesRegion
  })
  
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
          {filteredLeagues.length} Leagues
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={toggleSearch}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={showSearch ? "Close search" : "Search leagues"}
          >
            <FiSearch className="text-gray-500 w-4 h-4" />
          </button>
        </div>
      </div>
      
      {showSearch && (
        <div className="mb-3 animate-fade-in">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leagues..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      )}
      
      {/* Region filter */}
      <div className="flex overflow-x-auto scrollbar-hide mb-3 pb-1">
        {regions.map(region => (
          <button
            key={region.id}
            className={`whitespace-nowrap px-3 py-1 text-xs font-medium rounded-full mr-1.5 transition-colors ${
              activeFilter === region.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter(region.id)}
          >
            {region.name}
          </button>
        ))}
      </div>
      
      <div className="divide-y divide-gray-100 max-h-[350px] overflow-y-auto custom-scrollbar pr-1">
        {filteredLeagues.length > 0 ? (
          filteredLeagues.map((league) => (
            <div 
              key={league.id} 
              className="flex items-center py-2.5 hover:bg-gray-50 transition-colors rounded-lg px-2 cursor-pointer group"
            >
              <div className="w-9 h-9 mr-3 bg-gray-50 rounded-full p-1.5 flex items-center justify-center flex-shrink-0">
                <img 
                  src={league.logo || 'https://via.placeholder.com/32'} 
                  alt={league.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm truncate">{league.name}</div>
                <div className="flex items-center text-xs text-gray-500 mt-0.5">
                  <img 
                    src={league.flag} 
                    alt={league.country} 
                    className="w-3.5 h-auto mr-1" 
                  />
                  <span className="truncate">{league.country}</span>
                </div>
              </div>
              <FiChevronRight className="text-gray-300 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>No leagues found</p>
            <p className="text-sm mt-1">Try a different search term or filter</p>
          </div>
        )}
      </div>
      
      <div className="text-center mt-3">
        <button className="text-primary text-sm font-medium hover:underline">
          View All Leagues
        </button>
      </div>
    </div>
  )
}

export default LeaguesList 