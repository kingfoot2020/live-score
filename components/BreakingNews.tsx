"use client"

import React, { useState, useEffect, useRef } from 'react'
import { FiChevronLeft, FiChevronRight, FiRadio } from 'react-icons/fi'
import { HiOutlineSpeakerWave, HiOutlineBolt } from 'react-icons/hi2'
import { IoNewspaperOutline } from 'react-icons/io5'
import { RiLiveLine } from 'react-icons/ri'

const BreakingNews: React.FC = () => {
  const [activeNews, setActiveNews] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const newsItems: string[] = [
    "Bayern Munich Extends Winning Streak to 10 Games",
    "PSG Star Linked with Premier League Move",
    "Liverpool Announces New Signing from Bundesliga",
    "Real Madrid Wins El Clasico in Spectacular 3-2 Match"
  ]
  
  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      setActiveNews((prev) => (prev + 1) % newsItems.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [newsItems.length, isPaused])
  
  const navigateNews = (direction: 'prev' | 'next'): void => {
    if (direction === 'prev') {
      setActiveNews((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1))
    } else {
      setActiveNews((prev) => (prev + 1) % newsItems.length)
    }
  }
  
  return (
    <div className="bg-white border-b border-gray-200 overflow-hidden" suppressHydrationWarning={true}>
      <div 
        ref={containerRef}
        className="container mx-auto relative flex flex-col sm:flex-row items-center overflow-hidden py-3 px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        suppressHydrationWarning={true}
      >
        {/* Desktop breaking news label */}
        <div className="hidden sm:flex flex-shrink-0 bg-red-600 text-white font-medium py-1 px-3 rounded-full items-center mr-4" suppressHydrationWarning={true}>
          <HiOutlineBolt className="mr-1.5 h-4 w-4" aria-hidden="true" />
          <span className="text-sm">Breaking News</span>
        </div>
        
        <div className="w-full sm:flex-1 overflow-hidden relative" suppressHydrationWarning={true}>
          <div className="flex items-center" suppressHydrationWarning={true}>
            {/* Mobile icon */}
            <div className="sm:hidden text-red-600 mr-2 flex-shrink-0" suppressHydrationWarning={true}>
              <RiLiveLine className="text-xl" aria-hidden="true" />
            </div>
            
            <button 
              className="hidden sm:flex items-center justify-center h-6 w-6 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors mr-2 flex-shrink-0"
              onClick={() => navigateNews('prev')}
              aria-label="Previous news"
            >
              <FiChevronLeft className="text-sm" />
            </button>
            
            <div className="overflow-hidden relative whitespace-nowrap w-full" suppressHydrationWarning={true}>
              {newsItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`transition-all duration-500 ${
                    index === activeNews 
                      ? 'opacity-100 translate-x-0 relative' 
                      : 'opacity-0 absolute top-0 left-0 translate-x-full'
                  }`}
                  suppressHydrationWarning={true}
                >
                  <p className="text-gray-800 font-medium text-sm sm:text-base truncate">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            
            <button 
              className="hidden sm:flex items-center justify-center h-6 w-6 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors ml-2 flex-shrink-0"
              onClick={() => navigateNews('next')}
              aria-label="Next news"
            >
              <FiChevronRight className="text-sm" />
            </button>
          </div>
          
          {/* News indicators */}
          <div className="flex justify-center sm:hidden mt-1 space-x-1" suppressHydrationWarning={true}>
            {newsItems.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeNews 
                    ? 'w-4 bg-red-500' 
                    : 'w-1.5 bg-gray-300'
                }`}
                onClick={() => setActiveNews(index)}
                aria-label={`News ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="hidden sm:flex items-center ml-3" suppressHydrationWarning={true}>
          <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
            {activeNews + 1}/{newsItems.length}
          </span>
        </div>
      </div>
    </div>
  )
}

export default BreakingNews 