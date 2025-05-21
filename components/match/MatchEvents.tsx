import React from 'react';
import Image from 'next/image';

type EventType = 'Goal' | 'Card' | 'Subst' | 'Var';

type Event = {
  time: {
    elapsed: number;
    extra?: number | null;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  player: {
    id: number;
    name: string;
  };
  assist?: {
    id: number | null;
    name: string | null;
  };
  type: EventType;
  detail: string;
  comments?: string | null;
};

type FixtureData = {
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  events?: Event[];
  fixture: {
    status: {
      short: string;
    };
  };
};

type MatchEventsProps = {
  fixture: FixtureData;
};

export default function MatchEvents({ fixture }: MatchEventsProps) {
  const events = fixture.events || [];
  const isMatchStarted = fixture.fixture.status.short !== 'NS';
  
  // Sort events by time elapsed
  const sortedEvents = [...events].sort((a, b) => {
    // First sort by elapsed time
    if (a.time.elapsed !== b.time.elapsed) {
      return a.time.elapsed - b.time.elapsed;
    }
    // If elapsed time is the same, sort by extra time if available
    if (a.time.extra !== b.time.extra) {
      return (a.time.extra || 0) - (b.time.extra || 0);
    }
    return 0;
  });
  
  // Function to get event icon based on type and detail
  const getEventIcon = (event: Event) => {
    if (event.type === 'Goal') {
      if (event.detail === 'Normal Goal') return 'sports_soccer';
      if (event.detail === 'Own Goal') return 'sports_soccer';
      if (event.detail === 'Penalty') return 'sports_soccer';
      return 'sports_soccer';
    }
    
    if (event.type === 'Card') {
      if (event.detail === 'Yellow Card') return 'rectangle';
      if (event.detail === 'Red Card') return 'rectangle';
      return 'rectangle';
    }
    
    if (event.type === 'Subst') return 'swap_horiz';
    if (event.type === 'Var') return 'videocam';
    
    return 'event';
  };
  
  // Function to get event icon color and class
  const getEventColor = (event: Event) => {
    if (event.type === 'Goal') {
      if (event.detail === 'Own Goal') return 'text-red-500 rotate-180';
      if (event.detail === 'Penalty') return 'text-green-500';
      return 'text-green-500';
    }
    
    if (event.type === 'Card') {
      if (event.detail === 'Yellow Card') return 'text-yellow-500';
      if (event.detail === 'Red Card') return 'text-red-500';
      return 'text-gray-500';
    }
    
    if (event.type === 'Subst') return 'text-blue-500';
    if (event.type === 'Var') return 'text-gray-500';
    
    return 'text-gray-500';
  };
  
  // Function to determine which team's side the event belongs to
  const isHomeTeamEvent = (event: Event) => {
    return event.team.id === fixture.teams.home.id;
  };
  
  if (!isMatchStarted) {
    return (
      <div className="text-center py-6">
        <div className="text-gray-500 mb-2">Match hasn't started yet</div>
        <p className="text-sm text-gray-400">
          Events will appear here once the match begins.
        </p>
      </div>
    );
  }
  
  if (events.length === 0) {
    return (
      <div className="text-center py-6">
        <div className="text-gray-500 mb-2">No events recorded yet</div>
        <p className="text-sm text-gray-400">
          Events will appear here as they happen during the match.
        </p>
      </div>
    );
  }
  
  return (
    <div className="relative">
      {/* Center timeline */}
      <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-px bg-gray-200"></div>
      
      <div className="space-y-6 relative">
        {sortedEvents.map((event, index) => {
          const isHome = isHomeTeamEvent(event);
          const timeDisplay = event.time.extra 
            ? `${event.time.elapsed}+${event.time.extra}′` 
            : `${event.time.elapsed}′`;
          
          // Event description based on type
          let eventDescription = '';
          if (event.type === 'Goal') {
            if (event.detail === 'Own Goal') {
              eventDescription = `Own Goal by ${event.player.name}`;
            } else if (event.detail === 'Penalty') {
              eventDescription = `Penalty Goal by ${event.player.name}`;
            } else {
              eventDescription = `Goal by ${event.player.name}${event.assist?.name ? ` (Assist: ${event.assist.name})` : ''}`;
            }
          } else if (event.type === 'Card') {
            eventDescription = `${event.detail} for ${event.player.name}`;
          } else if (event.type === 'Subst') {
            eventDescription = `${event.player.name} replaces ${event.assist?.name || 'a player'}`;
          } else {
            eventDescription = `${event.type}: ${event.detail}`;
          }
          
          return (
            <div key={index} className="flex items-center relative">
              {/* Time indicator in center */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10 bg-white p-1 rounded-full">
                <div className="bg-gray-100 h-6 w-12 flex items-center justify-center rounded-full text-xs font-medium">
                  {timeDisplay}
                </div>
              </div>
              
              {/* Home team event */}
              {isHome ? (
                <>
                  <div className="w-1/2 pr-6 py-3 flex justify-end">
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 max-w-xs">
                      <div className="flex items-center justify-end">
                        <div className="text-right">
                          <div className="font-medium">{event.player.name}</div>
                          <div className="text-sm text-gray-500">{eventDescription}</div>
                          {event.comments && <div className="text-xs text-gray-400 mt-1">{event.comments}</div>}
                        </div>
                        <div className={`ml-3 material-icons-outlined ${getEventColor(event)}`}>
                          {getEventIcon(event)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2"></div>
                </>
              ) : (
                <>
                  <div className="w-1/2"></div>
                  <div className="w-1/2 pl-6 py-3">
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 max-w-xs">
                      <div className="flex items-center">
                        <div className={`mr-3 material-icons-outlined ${getEventColor(event)}`}>
                          {getEventIcon(event)}
                        </div>
                        <div>
                          <div className="font-medium">{event.player.name}</div>
                          <div className="text-sm text-gray-500">{eventDescription}</div>
                          {event.comments && <div className="text-xs text-gray-400 mt-1">{event.comments}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Team indicators */}
      <div className="flex justify-between mb-4 mt-6">
        <div className="flex items-center">
          <Image 
            src={fixture.teams.home.logo || '/placeholder-team.png'} 
            alt={fixture.teams.home.name}
            width={24}
            height={24}
            className="mr-2"
          />
          <span className="font-medium text-sm">{fixture.teams.home.name}</span>
        </div>
        
        <div className="flex items-center">
          <span className="font-medium text-sm">{fixture.teams.away.name}</span>
          <Image 
            src={fixture.teams.away.logo || '/placeholder-team.png'} 
            alt={fixture.teams.away.name}
            width={24}
            height={24}
            className="ml-2"
          />
        </div>
      </div>
    </div>
  );
} 