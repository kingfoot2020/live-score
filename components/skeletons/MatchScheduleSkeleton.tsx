import React from 'react';

const MatchScheduleSkeleton: React.FC = () => {
  return (
    <div>
      {/* Filter tabs skeleton */}
      <div className="flex overflow-x-auto scrollbar-hide mb-4 pb-1">
        {Array(3).fill(0).map((_, index) => (
          <div 
            key={`tab-${index}`} 
            className={`flex-shrink-0 h-10 ${index > 0 ? 'ml-2' : ''} rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer`}
            style={{ width: index === 0 ? '100px' : '90px' }}
          ></div>
        ))}
      </div>
      
      {/* Days of the week skeleton */}
      <div className="relative mb-6">
        <div className="flex overflow-x-auto scrollbar-hide py-1">
          {Array(7).fill(0).map((_, index) => (
            <div
              key={`day-${index}`}
              className={`flex-shrink-0 w-1/5 md:min-w-[4.5rem] h-16 flex-col items-center py-2 px-2 mx-1 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer`}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Match groups skeleton */}
      <div className="space-y-6">
        {Array(3).fill(0).map((_, groupIndex) => (
          <div key={`group-${groupIndex}`}>
            {/* Competition header skeleton */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
              <div className="flex-1">
                <div className="h-3 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer mb-1"></div>
                <div className="h-5 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
              </div>
              <div className="h-5 w-8 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
            </div>
            
            {/* Matches skeleton */}
            <div className="space-y-0">
              {Array(3).fill(0).map((_, matchIndex) => (
                <div 
                  key={`match-${groupIndex}-${matchIndex}`} 
                  className="border-b border-gray-100 py-2 last:border-0"
                >
                  <div className="flex items-center px-2">
                    {/* Left side - time/status */}
                    <div className="w-14 text-left pr-2">
                      <div className="h-5 w-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
                    </div>
                    
                    {/* Center - teams */}
                    <div className="flex-1">
                      <div className="flex flex-col space-y-3">
                        {/* Home team */}
                        <div className="flex items-center">
                          <div className="w-5 h-5 mr-2 flex-shrink-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer"></div>
                          <div className="h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
                        </div>
                        {/* Away team */}
                        <div className="flex items-center">
                          <div className="w-5 h-5 mr-2 flex-shrink-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer"></div>
                          <div className="h-4 w-28 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right side - score */}
                    <div className="w-12 text-right">
                      <div className="flex flex-col space-y-3">
                        <div className="h-4 w-4 ml-auto bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
                        <div className="h-4 w-4 ml-auto bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
                      </div>
                    </div>
                    
                    {/* Favorite icon */}
                    <div className="ml-2">
                      <div className="h-5 w-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchScheduleSkeleton; 