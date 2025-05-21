import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface NewsItem {
  id: number;
  title: string;
  image: string;
  source: string;
  timeAgo: string;
  isLive: boolean;
}

const NewsSection: React.FC = () => {
  // Mock news data, would come from API in real app
  const news: NewsItem[] = [
    {
      id: 1,
      title: "Appreciate Trent Alexander-Arnold's greatness",
      image: "/news/news1.jpg",
      source: "365Scores Magazine",
      timeAgo: "6 Minutes Ago",
      isLive: true
    },
    {
      id: 2,
      title: "Ten Hag confirms Varane will leave Man Utd",
      image: "/news/news2.jpg",
      source: "BBC Sport",
      timeAgo: "2 Hours Ago",
      isLive: false
    },
    {
      id: 3,
      title: "Barcelona in talks to sign Athletic forward Williams",
      image: "/news/news3.jpg",
      source: "Sky Sports",
      timeAgo: "4 Hours Ago", 
      isLive: false
    },
    {
      id: 4,
      title: "Kylian Mbappé set to join Real Madrid next season",
      image: "/news/news4.jpg",
      source: "ESPN",
      timeAgo: "5 Hours Ago",
      isLive: false
    }
  ]
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Live Football News</h2>
        <div className="flex space-x-2">
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
            <FiChevronLeft />
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
            <FiChevronRight />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="relative h-40 bg-gray-200">
              <img 
                src={item.image || `https://source.unsplash.com/300x200/?football,${item.id}`} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {item.isLive && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-md">
                  LIVE
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium line-clamp-2">{item.title}</h3>
              <div className="mt-2 text-sm text-gray-600 flex items-center justify-between">
                <span>{item.source}</span>
                <span>{item.timeAgo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button 
              key={num} 
              className={`w-2 h-2 rounded-full ${num === 1 ? 'bg-primary' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsSection 