import React from 'react';
import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import MatchHeader from '../../../../../components/match/MatchHeader';
import MatchMenuBar from '../../../../../components/match/MatchMenuBar';
import HeadToHead from '../../../../../components/match/HeadToHead';

async function getFixtureData(id: string) {
  noStore();
  try {
    const response = await fetch(`https://beta.api-score.top/api/fixtures/${id}`, {
      next: { revalidate: 30 }
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

export default async function HeadToHeadPage({ params }: { params: { id: string, slug: string } }) {
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
        activeTab="head2head"
      />
      
      <div className="mt-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-xl font-bold mb-4">Head to Head</h2>
          <HeadToHead fixture={fixtureData} />
        </div>
      </div>
    </div>
  );
} 