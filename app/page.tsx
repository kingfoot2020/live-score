import React from 'react'
import Header from '../components/Header'
import FeaturedMatch from '../components/FeaturedMatch'
import LiveMatches from '../components/LiveMatches'
import MatchSchedule from '../components/MatchSchedule'
import SportCategories from '../components/SportCategories'
import TeamsList from '../components/TeamsList'
import LeaguesList from '../components/LeaguesList'
import BreakingNews from '../components/BreakingNews'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-3 sm:px-4 py-3 sm:py-6" suppressHydrationWarning={true}>
        <BreakingNews />
        
        <div className="mb-2 sm:mb-6 mt-2 sm:mt-6" suppressHydrationWarning={true}>
          <SportCategories />
        </div>
          
        <div className="grid grid-cols-1 lg:grid-cols-12 sm:gap-6" suppressHydrationWarning={true}>
          <div className="lg:col-span-3 sm:order-2 lg:order-1 space-y-4 sm:space-y-6" suppressHydrationWarning={true}>
            <div className="card animate-fade-in hidden md:block" suppressHydrationWarning={true}>
              <h2 className="text-lg font-bold mb-4 text-red-600 flex items-center justify-between">
                Teams
                <span className="bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded">10+</span>
              </h2>
              <TeamsList />
            </div>
          </div>
            
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-3 sm:space-y-6" suppressHydrationWarning={true}>
            <div className="animate-fade-in hidden md:block" style={{animationDelay: '100ms'}} suppressHydrationWarning={true}>
              <FeaturedMatch />
            </div>
              
            <div className="card animate-fade-in" style={{animationDelay: '200ms'}} suppressHydrationWarning={true}>
              <MatchSchedule />
            </div>
          </div>
            
          <div className="lg:col-span-3 sm:order-3 space-y-4 sm:space-y-6" suppressHydrationWarning={true}>
            <div className="card animate-fade-in hidden md:block" style={{animationDelay: '300ms'}} suppressHydrationWarning={true}>
              <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                Live Matches
              </h2>
              <LiveMatches />
            </div>
              
            <div className="card animate-fade-in hidden md:block" style={{animationDelay: '400ms'}} suppressHydrationWarning={true}>
              <h2 className="text-lg font-bold mb-4 text-primary flex items-center justify-between">
                Leagues
                <span className="bg-violet-100 text-primary text-xs px-2 py-0.5 rounded">8+</span>
              </h2>
              <LeaguesList />
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white py-4 sm:py-6 border-t border-gray-200 mt-8" suppressHydrationWarning={true}>
        <div className="container mx-auto px-4 text-center text-sm text-gray-600" suppressHydrationWarning={true}>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4" suppressHydrationWarning={true}>
            <div className="text-xl font-bold text-gray-900 flex items-center mb-3 sm:mb-0" suppressHydrationWarning={true}>
              <span className="text-primary">Yalla</span> Score
            </div>
            
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-gray-600" suppressHydrationWarning={true}>
              <a href="#" className="hover:text-primary transition-colors">About</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Help</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4 mt-4" suppressHydrationWarning={true}>
            © {new Date().getFullYear()} Yalla Score. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
} 