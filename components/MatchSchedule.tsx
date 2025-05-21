import React, { useState, useRef, useEffect } from 'react'
import { FiClock, FiHeart, FiBell, FiStar, FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Day, Match } from '../types'

const MatchSchedule: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(3)
  const [activeTab, setActiveTab] = useState<string>('all')
  const daysScrollRef = useRef<HTMLDivElement | null>(null)
  
  // Sample days for the week view
  const days: Day[] = [
    { id: 0, name: 'DIM.', day: 18, month: 'MAI' },
    { id: 1, name: 'LUN.', day: 19, month: 'MAI' },
    { id: 2, name: 'MAR.', day: 20, month: 'MAI' },
    { id: 3, name: 'MER.', day: 21, month: 'MAI', active: true },
    { id: 4, name: 'JEU.', day: 22, month: 'MAI' },
    { id: 5, name: 'VEN.', day: 23, month: 'MAI' },
    { id: 6, name: 'SAM.', day: 24, month: 'MAI' },
  ]
  
  // Sample matches for the fixture list
  const matches: Match[] = [
    {
      id: 1,
      date: '2025.05.20',
      time: '20:00',
      competition: { name: 'Premier League', logo: '/team-logos/premier-league.png', country: 'England' },
      homeTeam: { name: 'Crystal Palace', logo: '/team-logos/crystal.png' },
      awayTeam: { name: 'Wolverhampton Wanderers', logo: '/team-logos/wolves.png' },
      status: 'Not Started'
    },
    {
      id: 2,
      date: '2025.05.20',
      time: '20:00',
      competition: { name: 'Premier League', logo: '/team-logos/premier-league.png', country: 'England' },
      homeTeam: { name: 'Manchester City', logo: '/team-logos/mancity.png' },
      awayTeam: { name: 'AFC Bournemouth', logo: '/team-logos/bournemouth.png' },
      status: 'Not Started'
    }
  ]
  
  const scrollDays = (direction: 'left' | 'right'): void => {
    if (daysScrollRef.current) {
      const { current: container } = daysScrollRef
      const scrollAmount = direction === 'left' ? -container.offsetWidth / 2 : container.offsetWidth / 2
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }
  
  return (
    <div>
      {/* Filter tabs */}
      <div className="flex overflow-x-auto scrollbar-hide mb-4 pb-1">
        <button 
          className={`flex-shrink-0 py-2 px-3 md:px-4 text-sm font-medium flex items-center rounded-lg transition-colors ${
            activeTab === 'all' 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('all')}
        >
          <FiCalendar className="mr-2" aria-hidden="true" />
          All <span className="hidden md:inline ml-1">Matches</span>
          <span className="ml-1.5 bg-white bg-opacity-20 rounded px-1.5 text-xs">{matches.length}</span>
        </button>
        
        <button 
          className={`flex-shrink-0 ml-2 py-2 px-3 md:px-4 text-sm font-medium flex items-center rounded-lg transition-colors ${
            activeTab === 'live' 
              ? 'bg-secondary text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('live')}
        >
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
          Live
          <span className="ml-1.5 bg-white bg-opacity-20 rounded px-1.5 text-xs">0</span>
        </button>
        
        <button 
          className={`flex-shrink-0 ml-2 py-2 px-3 md:px-4 text-sm font-medium flex items-center rounded-lg transition-colors ${
            activeTab === 'favorites' 
              ? 'bg-amber-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('favorites')}
        >
          <FiStar className={`mr-2 ${activeTab === 'favorites' ? 'text-white' : 'text-amber-400'}`} aria-hidden="true" />
          <span className="hidden md:inline">Favorites</span>
          <span className="md:hidden">Favs</span>
          <span className="ml-1.5 bg-gray-100 rounded px-1.5 text-xs text-gray-600">0</span>
        </button>
        
        <button 
          className={`flex-shrink-0 ml-2 py-2 px-3 md:px-4 text-sm font-medium flex items-center rounded-lg transition-colors ${
            activeTab === 'reminders' 
              ? 'bg-blue-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('reminders')}
        >
          <FiBell className={`mr-2 ${activeTab === 'reminders' ? 'text-white' : 'text-gray-400'}`} aria-hidden="true" />
          <span className="hidden md:inline">Reminders</span>
          <span className="md:hidden">Remind</span>
          <span className="ml-1.5 bg-gray-100 rounded px-1.5 text-xs text-gray-600">0</span>
        </button>
      </div>
      
      {/* Days of the week */}
      <div className="relative mb-6">
        <button 
          className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-8 flex items-center justify-center text-gray-500 z-10 bg-white bg-opacity-80 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
          onClick={() => scrollDays('left')}
          aria-label="Previous days"
        >
          <FiChevronLeft className="text-lg" />
        </button>
        
        <div 
          ref={daysScrollRef}
          className="flex overflow-x-auto scrollbar-hide px-6 py-1 snap-x"
        >
          {days.map((day) => (
            <button
              key={day.id}
              className={`flex-shrink-0 min-w-[4.5rem] flex flex-col items-center py-2 px-2 mx-1 rounded-lg transition-all snap-start ${
                day.id === activeDay 
                  ? 'bg-secondary text-white shadow-md scale-105' 
                  : 'text-gray-700 hover:bg-gray-50 bg-white border border-gray-100'
              }`}
              onClick={() => setActiveDay(day.id)}
            >
              <div className="text-xs font-medium">{day.name}</div>
              <div className="text-lg font-bold mt-1">{day.day}</div>
              <div className="text-xs opacity-80">{day.month}</div>
            </button>
          ))}
        </div>
        
        <button 
          className="absolute top-1/2 -translate-y-1/2 right-0 w-8 h-8 flex items-center justify-center text-gray-500 z-10 bg-white bg-opacity-80 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
          onClick={() => scrollDays('right')}
          aria-label="Next days"
        >
          <FiChevronRight className="text-lg" />
        </button>
      </div>
      
      {/* Competition header */}
      <div className="flex items-center space-x-2 mb-4 animate-fade-in">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center shadow-sm">
          <img src="/team-logos/premier-league.png" alt="Premier League" className="w-5 h-5" />
        </div>
        <div className="font-medium">Premier League</div>
        <div className="text-xs bg-gray-100 px-2 py-0.5 rounded">
          <img src="https://flagcdn.com/w20/gb-eng.png" alt="England" className="w-4 h-auto inline-block mr-1" />
          England
        </div>
        <div className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full ml-auto">{matches.length}</div>
      </div>
      
      {/* Match list */}
      <div className="space-y-3">
        {matches.map((match, index) => (
          <div 
            key={match.id} 
            className={`bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md animate-slide-up`}
            style={{animationDelay: `${index * 100}ms`}}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{match.date}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-xs text-gray-500">{match.time}</span>
              </div>
              <div className="flex space-x-3">
                <button 
                  className="text-gray-400 hover:text-amber-400 transition-colors" 
                  aria-label="Add to favorites"
                >
                  <FiStar className="w-4 h-4" />
                </button>
                <button 
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  aria-label="Set reminder" 
                >
                  <FiBell className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-10 h-10 relative mb-1 md:mb-0 md:mr-3">
                  <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-full h-full object-contain" />
                </div>
                <div className="font-medium text-center md:text-left truncate max-w-[120px]">{match.homeTeam.name}</div>
              </div>
              
              <div className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-medium mx-2">
                {match.status === 'Not Started' ? 'VS' : match.status}
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="font-medium text-center md:text-right truncate max-w-[120px]">{match.awayTeam.name}</div>
                <div className="w-10 h-10 relative mt-1 md:mt-0 md:ml-3">
                  <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 grid grid-cols-4 border-t border-gray-100">
              <button className="py-2 text-sm font-medium text-center hover:bg-gray-100 transition-colors">
                <div className="text-xs text-gray-500">1</div>
                <div className="font-bold">1.50</div>
              </button>
              <button className="py-2 text-sm font-medium text-center hover:bg-gray-100 transition-colors">
                <div className="text-xs text-gray-500">X</div>
                <div className="font-bold">3.40</div>
              </button>
              <button className="py-2 text-sm font-medium text-center hover:bg-gray-100 transition-colors">
                <div className="text-xs text-gray-500">2</div>
                <div className="font-bold">2.20</div>
              </button>
              <button className="py-2 text-sm font-medium text-center text-primary hover:bg-gray-100 transition-colors">
                <div className="text-xs">More</div>
                <div className="font-bold">+1253</div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MatchSchedule 