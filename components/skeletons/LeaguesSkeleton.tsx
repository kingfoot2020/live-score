import React from 'react';

const LeaguesSkeleton: React.FC = () => {
  return (
    <div>
      {/* Header with shimmer */}
      <div className="flex justify-between items-center mb-3">
        <div className="h-5 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
      </div>
      
      {/* Region filter skeleton */}
      <div className="flex overflow-x-auto scrollbar-hide mb-3 pb-1">
        {Array(5).fill(0).map((_, index) => (
          <div 
            key={index} 
            className="h-7 w-20 rounded-full mr-1.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
          ></div>
        ))}
      </div>
      
      {/* Leagues list with shimmer */}
      <div className="divide-y divide-gray-100 max-h-[350px] overflow-y-auto custom-scrollbar pr-1">
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="flex items-center py-2.5 px-2">
            {/* League logo */}
            <div className="w-9 h-9 mr-3 flex-shrink-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer"></div>
            <div className="flex-1 min-w-0">
              {/* League name */}
              <div className="h-5 w-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
              {/* Country */}
              <div className="h-3 w-28 mt-1.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
            </div>
            {/* Chevron */}
            <div className="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
          </div>
        ))}
      </div>
      
      {/* View all button */}
      <div className="text-center mt-3">
        <div className="h-5 w-28 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer mx-auto"></div>
      </div>
    </div>
  );
};

export default LeaguesSkeleton; 