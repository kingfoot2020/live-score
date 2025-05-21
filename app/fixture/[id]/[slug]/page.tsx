import React from 'react';
import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import MatchHeader from '../../../../components/match/MatchHeader';
import MatchMenuBar from '../../../../components/match/MatchMenuBar';
import MatchInfoCard from '../../../../components/match/MatchInfoCard';
import TeamLastMatches from '../../../../components/match/TeamLastMatches';

async function getFixtureData(id: string) {
  noStore();
  try {
    const response = await fetch(`https://beta.api-score.top/api/fixtures/${id}`, {
      next: { revalidate: 30 } // Revalidate every 30 seconds for live scores
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch fixture data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching fixture data:', error);
    return null;
  }
}

export default async function FixturePage({ params }: { params: { id: string, slug: string } }) {
  const fixtureData = await getFixtureData(params.id);
  
  if (!fixtureData) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Section 1: Match Header */}
      <MatchHeader fixture={fixtureData} />
      
      {/* Section 2: Menu Bar */}
      <MatchMenuBar 
        fixtureId={params.id} 
        slug={params.slug} 
        activeTab="info"
      />
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Section 3: Match Card */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <MatchInfoCard fixture={fixtureData} />
          </div>
          
          {/* Section 4: Last 5 Matches */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold mb-4">Recent Form</h2>
            <TeamLastMatches fixture={fixtureData} />
          </div>
        </div>
        
        <div className="lg:col-span-4 space-y-6">
          {/* Additional widgets or info panels can go here */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-bold mb-3">Match Facts</h2>
            {/* Match facts content */}
          </div>
        </div>
      </div>
    </div>
  );
} 