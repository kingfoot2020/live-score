import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import FeaturedMatch from '../components/FeaturedMatch'
import LiveMatches from '../components/LiveMatches'
import MatchSchedule from '../components/MatchSchedule'
import SportCategories from '../components/SportCategories'
import TeamsList from '../components/TeamsList'
import LeaguesList from '../components/LeaguesList'
import BreakingNews from '../components/BreakingNews'

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>BetScore - Live Sports Betting</title>
        <meta name="description" content="Live sports scores and betting with BetScore" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <BreakingNews />
        
        <div className="mb-4 sm:mb-6 mt-4 sm:mt-6">
          <SportCategories />
        </div>
          
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-3 sm:order-2 lg:order-1 space-y-4 sm:space-y-6">
            <div className="card animate-fade-in">
              <h2 className="text-lg font-bold mb-4 text-red-600 flex items-center justify-between">
                Teams
                <span className="bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded">10+</span>
              </h2>
              <TeamsList />
            </div>
          </div>
            
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4 sm:space-y-6">
            <div className="animate-fade-in" style={{animationDelay: '100ms'}}>
              <FeaturedMatch />
            </div>
              
            <div className="card animate-fade-in" style={{animationDelay: '200ms'}}>
              <h2 className="text-lg font-bold mb-4 text-gray-800">Fixtures</h2>
              <MatchSchedule />
            </div>
          </div>
            
          <div className="lg:col-span-3 sm:order-3 space-y-4 sm:space-y-6">
            <div className="card animate-fade-in" style={{animationDelay: '300ms'}}>
              <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                Live Matches
              </h2>
              <LiveMatches />
            </div>
              
            <div className="card animate-fade-in" style={{animationDelay: '400ms'}}>
              <h2 className="text-lg font-bold mb-4 text-blue-600 flex items-center justify-between">
                Leagues
                <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded">8+</span>
              </h2>
              <LeaguesList />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home 