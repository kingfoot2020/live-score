import React from 'react';
import Link from 'next/link';

type MatchMenuBarProps = {
  fixtureId: string;
  slug: string;
  activeTab: string;
};

export default function MatchMenuBar({ fixtureId, slug, activeTab }: MatchMenuBarProps) {
  const menuItems = [
    { id: 'info', label: 'Match Info', href: `/fixture/${fixtureId}/${slug}` },
    { id: 'lineups', label: 'Lineups', href: `/fixture/${fixtureId}/${slug}/lineups` },
    { id: 'events', label: 'Events', href: `/fixture/${fixtureId}/${slug}/events` },
    { id: 'stats', label: 'Stats', href: `/fixture/${fixtureId}/${slug}/stats` },
    { id: 'head2head', label: 'H2H', href: `/fixture/${fixtureId}/${slug}/head2head` },
    { id: 'standings', label: 'Standings', href: `/fixture/${fixtureId}/${slug}/standings` },
    { id: 'scorers', label: 'Top Scorers', href: `/fixture/${fixtureId}/${slug}/scorers` },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="overflow-x-auto">
        <div className="flex min-w-max">
          {menuItems.map((item) => (
            <Link 
              key={item.id}
              href={item.href}
              className={`
                px-4 py-3 text-sm font-medium flex-1 text-center whitespace-nowrap transition-colors
                ${activeTab === item.id 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 