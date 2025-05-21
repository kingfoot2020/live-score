"use client"

import React, { useState } from 'react'
import { 
  FaFutbol, FaBasketballBall, FaTableTennis, 
  FaHockeyPuck, FaVolleyballBall 
} from 'react-icons/fa'
import { GiTennisBall, GiCricketBat, GiBowlingPin } from 'react-icons/gi'
import { BiCycling } from 'react-icons/bi'
import { FiChevronRight } from 'react-icons/fi'
import { SportCategoriesProps } from '../types'

interface Sport {
  id: string;
  name: string;
  icon: React.ElementType;
  active?: boolean;
}

const sports: Sport[] = [
  { id: 'football', name: 'Football', icon: FaFutbol, active: true },
  { id: 'basketball', name: 'Basketball', icon: FaBasketballBall },
  { id: 'tennis', name: 'Tennis', icon: GiTennisBall },
  { id: 'table-tennis', name: 'Table Tennis', icon: FaTableTennis },
  { id: 'ice-hockey', name: 'Ice Hockey', icon: FaHockeyPuck },
  { id: 'esports', name: 'Esports', icon: GiBowlingPin },
  { id: 'handball', name: 'Handball', icon: FaVolleyballBall },
  { id: 'volleyball', name: 'Volleyball', icon: FaVolleyballBall },
  { id: 'cricket', name: 'Cricket', icon: GiCricketBat },
  { id: 'cycling', name: 'Cycling', icon: BiCycling },
  { id: 'archery', name: 'Archery', icon: FaFutbol },
]

const SportCategories: React.FC<SportCategoriesProps> = ({ minimal = false }) => {
  const [activeSport, setActiveSport] = useState<string>('football')
  
  if (minimal) {
    return (
      <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2" suppressHydrationWarning={true}>
        {sports.slice(0, 5).map((sport) => (
          <button 
            key={sport.id}
            className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              sport.id === activeSport 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
            onClick={() => setActiveSport(sport.id)}
          >
            <sport.icon className="mr-2 text-sm" />
            {sport.name}
          </button>
        ))}
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-xl shadow-card overflow-x-auto" suppressHydrationWarning={true}>
      <div className="flex px-3 py-4 min-w-max" suppressHydrationWarning={true}>
        {sports.map((sport) => (
          <button 
            key={sport.id}
            className={`flex flex-col items-center justify-center px-4 mx-1.5 py-2 rounded-xl transition-all ${
              sport.id === activeSport 
                ? 'bg-primary text-white shadow-md' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveSport(sport.id)}
          >
            <sport.icon className={`text-xl mb-2 ${sport.id === activeSport ? 'animate-pulse' : ''}`} />
            <span className="text-xs font-medium whitespace-nowrap">{sport.name}</span>
          </button>
        ))}
        <button className="flex items-center justify-center w-10 h-10 bg-gray-50 text-gray-500 rounded-full ml-2 hover:bg-gray-100 transition-colors">
          <FiChevronRight className="text-lg" />
        </button>
      </div>
    </div>
  )
}

export default SportCategories 