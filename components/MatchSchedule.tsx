"use client"

import React, { useState, useRef, useEffect } from 'react'
import { FiClock, FiHeart, FiBell, FiStar, FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Day, Match } from '../types'
import useApiData from '../hooks/useApiData'
import { getFixturesByDate } from '../services/api'
import Link from 'next/link'

const MatchSchedule: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(5) // Today at index 5
  const [activeTab, setActiveTab] = useState<string>('all')
  const daysScrollRef = useRef<HTMLDivElement | null>(null)
  
  // Generate days dynamically based on current date
  const generateCalendarDays = (): Day[] => {
    const months = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    const today = new Date();
    const days: Day[] = [];
    
    // Generate 5 days before today, today, and 5 days after (total 11 days)
    for (let i = -5; i <= 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      days.push({
        id: i + 5, // 0-10 range, with today at index 5
        day: date.getDate(),
        month: months[date.getMonth()],
        active: i === 0, // Today is active by default
        fullDate: formatDateForApi(date),
      });
    }
    
    return days;
  };
  
  // Format date for API call (YYYY-MM-DD)
  const formatDateForApi = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
  
  // Generate days for the week view
  const days: Day[] = generateCalendarDays();
  
  // Get the selected date
  const selectedDate = days[activeDay]?.fullDate || formatDateForApi(new Date());
  
  // Fetch fixtures for the selected date
  const { data: fetchedMatches, isLoading, error } = useApiData<Match[]>(
    () => getFixturesByDate(selectedDate),
    `fixtures-${selectedDate}`,
    [selectedDate]
  );
  
  // Use fetched matches or empty array if loading or error
  const matches = fetchedMatches || [];
  
  useEffect(() => {
    // Center the active day in the scroll view when component mounts
    if (daysScrollRef.current) {
      const container = daysScrollRef.current;
      const activeButton = container.children[activeDay] as HTMLElement;
      
      if (activeButton) {
        const containerWidth = container.offsetWidth;
        const buttonLeft = activeButton.offsetLeft;
        const buttonWidth = activeButton.offsetWidth;
        
        // Calculate scroll position to center the button
        const scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeDay]);
  
  const scrollDays = (direction: 'left' | 'right'): void => {
    if (daysScrollRef.current) {
      const { current: container } = daysScrollRef
      const scrollAmount = direction === 'left' ? -container.offsetWidth / 2 : container.offsetWidth / 2
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }
  
  // Filter matches based on active tab
  const filteredMatches = matches.filter(match => {
    if (activeTab === 'all') return true;
    if (activeTab === 'live') return match.status === 'Live';
    if (activeTab === 'favorites') return false; // TODO: Implement favorites functionality
    return true;
  });
  
  // Helper function to get the elapsed time display
  const getElapsedTime = (match: Match): string => {
    if (match.status === 'Live' && match.elapsed) {
      return `${match.elapsed}'`;
    }
    return '';
  }
  
  // Helper function to get match status display
  const getMatchStatus = (match: Match): React.ReactNode => {
    if (match.status === 'Not Started') {
      return match.time;
    } else if (match.status === 'Live') {
      return (
        <span className="text-red-600">
          {match.elapsed || '•'}<span className="animate-pulse">'</span>
        </span>
      );
    } else if (match.status === 'Finished') {
      return 'FT';
    } else if (match.status === 'Canceled') {
      return 'CANC';
    }
    return match.time;
  }
  
  // Helper function to get score display
  const getScoreDisplay = (match: Match): string => {
    if (match.status === 'Live' || match.status === 'Finished') {
      return `${match.homeScore} - ${match.awayScore}`;
    } else if (match.status === 'Not Started') {
      return '-';
    }
    return '';
  }
  
  // Helper function to get score class
  const getScoreClass = (match: Match): string => {
    if (match.status === 'Live') {
      return 'text-red-600';
    }
    return '';
  }

  // Helper function to group matches by competition
  const groupMatchesByCompetition = () => {
    const groups: {[key: string]: {competition: {name: string, country: string, logo: string}, matches: Match[]}} = {};
    
    filteredMatches.forEach(match => {
      const key = `${match.competition.country}-${match.competition.name}`;
      if (!groups[key]) {
        groups[key] = {
          competition: match.competition,
          matches: []
        };
      }
      groups[key].matches.push(match);
    });
    
    return Object.values(groups);
  };
  
  const groupedMatches = groupMatchesByCompetition();
  
  return (
    <div suppressHydrationWarning={true}>
      {/* Filter tabs */}
      <div className="flex overflow-x-auto scrollbar-hide mb-4 pb-1" suppressHydrationWarning={true}>
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
          <span className="ml-1.5 bg-white bg-opacity-20 rounded px-1.5 text-xs">{filteredMatches.length}</span>
        </button>
        
        <button 
          className={`flex-shrink-0 ml-2 py-2 px-3 md:px-4 text-sm font-medium flex items-center rounded-lg transition-colors ${
            activeTab === 'live' 
              ? 'bg-secondary text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('live')}
        >
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" suppressHydrationWarning={true}></div>
          Live
          <span className="ml-1.5 bg-white bg-opacity-20 rounded px-1.5 text-xs">
            {filteredMatches.filter(match => match.status === 'Live').length}
          </span>
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
          <span className="md:hidden">Favorites</span>
          <span className="ml-1.5 bg-gray-100 rounded px-1.5 text-xs text-gray-600">0</span>
        </button>
      </div>
      
      {/* Days of the week */}
      <div className="relative mb-6" suppressHydrationWarning={true}>
        <button 
          className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-8 flex items-center justify-center text-gray-500 z-10 bg-white bg-opacity-80 rounded-full shadow-sm hover:bg-gray-100 transition-colors hidden"
          onClick={() => scrollDays('left')}
          aria-label="Previous days"
        >
          <FiChevronLeft className="text-lg" />
        </button>
        
        <div 
          ref={daysScrollRef}
          className="flex overflow-x-auto scrollbar-hide py-1 snap-x"
          suppressHydrationWarning={true}
        >
          {days.map((day) => (
            <button
              key={day.id}
              className={`flex-shrink-0 w-1/5 md:min-w-[4.5rem] flex flex-col items-center py-2 px-2 mx-1 rounded-lg transition-all snap-start ${
                day.id === activeDay 
                  ? 'bg-secondary text-white shadow-md scale-105' 
                  : 'text-gray-700 hover:bg-gray-50 bg-white border border-gray-100'
              }`}
              onClick={() => setActiveDay(day.id)}
            >
              <div className="text-lg font-bold" suppressHydrationWarning={true}>{day.day}</div>
              <div className="text-xs opacity-80" suppressHydrationWarning={true}>{day.month}</div>
            </button>
          ))}
        </div>
        
        <button 
          className="absolute top-1/2 -translate-y-1/2 right-0 w-8 h-8 flex items-center justify-center text-gray-500 z-10 bg-white bg-opacity-80 rounded-full shadow-sm hover:bg-gray-100 transition-colors hidden"
          onClick={() => scrollDays('right')}
          aria-label="Next days"
        >
          <FiChevronRight className="text-lg" />
        </button>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-8" suppressHydrationWarning={true}>
          <div className="w-6 h-6 border-2 border-gray-200 border-t-primary rounded-full animate-spin" suppressHydrationWarning={true}></div>
          <span className="ml-2 text-gray-600">Loading matches...</span>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center" suppressHydrationWarning={true}>
          Error loading matches. Please try again later.
        </div>
      )}
      
      {/* Empty state */}
      {!isLoading && !error && groupedMatches.length === 0 && (
        <div className="bg-gray-50 p-6 rounded-lg text-center" suppressHydrationWarning={true}>
          <div className="text-gray-400 text-2xl mb-2">
            <FiCalendar className="inline-block" />
          </div>
          <p className="text-gray-600 font-medium">No matches scheduled for this day</p>
          <p className="text-gray-500 text-sm mt-1">Try selecting a different date</p>
      </div>
      )}
      
      {/* Match list by competition */}
      {!isLoading && !error && groupedMatches.length > 0 && (
        <div className="space-y-4" suppressHydrationWarning={true}>
          {groupedMatches.map((group, groupIndex) => (
            <div key={`${group.competition.name}-${groupIndex}`} suppressHydrationWarning={true}>
              {/* Add divider between competition groups */}
              {groupIndex > 0 && (
                <div className="py-2" suppressHydrationWarning={true}>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" suppressHydrationWarning={true}></div>
                </div>
              )}
              
              {/* Competition header */}
              <div className="flex items-center space-x-2 mb-4 animate-fade-in" suppressHydrationWarning={true}>
                <div className="flex items-center space-x-2" suppressHydrationWarning={true}>
                  {group.competition.logo && (
                    <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center shadow-sm" suppressHydrationWarning={true}>
                      <img src={group.competition.logo} alt={group.competition.name} className="w-5 h-5" />
                    </div>
                  )}
                  <div suppressHydrationWarning={true}>
                    {group.competition.country && (
                      <div className="text-xs text-gray-500" suppressHydrationWarning={true}>
                        {group.competition.country}
                      </div>
                    )}
                    <div className="font-medium" suppressHydrationWarning={true}>{group.competition.name}</div>
                  </div>
                  <div className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full ml-auto" suppressHydrationWarning={true}>{group.matches.length}</div>
                </div>
              </div>
              
              {/* Matches for this competition */}
              <div className="space-y-0" suppressHydrationWarning={true}>
                {group.matches.map((match, index) => (
                  <div 
                    key={match.id} 
                    className="border-b border-gray-100 py-2 last:border-0"
                    suppressHydrationWarning={true}
                  >
                    <Link 
                      href={`/fixture/${match.id}/${match.homeTeam.name.toLowerCase().replace(/\s+/g, '-')}-vs-${match.awayTeam.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center px-2" suppressHydrationWarning={true}>
                        {/* Left side - time/status */}
                        <div className="w-14 text-left pr-2" suppressHydrationWarning={true}>
                          <div className="text-sm font-medium" suppressHydrationWarning={true}>
                            {getMatchStatus(match)}
                          </div>
                        </div>
                        
                        {/* Center - teams */}
                        <div className="flex-1" suppressHydrationWarning={true}>
                          <div className="flex flex-col space-y-1" suppressHydrationWarning={true}>
                            <div className="flex items-center" suppressHydrationWarning={true}>
                              <div className="w-5 h-5 mr-2 flex-shrink-0" suppressHydrationWarning={true}>
                                <img src={match.homeTeam.logo} alt="" className="w-full h-full object-contain" />
                              </div>
                              <span className="font-medium text-sm" suppressHydrationWarning={true}>
                                {match.homeTeam.name}
                              </span>
                            </div>
                            <div className="flex items-center" suppressHydrationWarning={true}>
                              <div className="w-5 h-5 mr-2 flex-shrink-0" suppressHydrationWarning={true}>
                                <img src={match.awayTeam.logo} alt="" className="w-full h-full object-contain" />
                              </div>
                              <span className="text-sm" suppressHydrationWarning={true}>
                                {match.awayTeam.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Right side - score or status */}
                        <div className="w-12 text-right" suppressHydrationWarning={true}>
                          <div className="flex flex-col space-y-1" suppressHydrationWarning={true}>
                            <div className={`text-sm font-medium ${getScoreClass(match)}`} suppressHydrationWarning={true}>
                              {match.status === 'Live' || match.status === 'Finished' ? match.homeScore : ''}
                            </div>
                            <div className={`text-sm font-medium ${getScoreClass(match)}`} suppressHydrationWarning={true}>
                              {match.status === 'Live' || match.status === 'Finished' ? match.awayScore : ''}
                            </div>
                          </div>
                        </div>
                        
                        {/* Favorite icon */}
                        <div className="ml-2 text-gray-300" suppressHydrationWarning={true}>
                          <FiStar className="w-5 h-5" />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MatchSchedule 