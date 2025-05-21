import { NextApiRequest, NextApiResponse } from 'next'

interface NewsItem {
  id: number;
  title: string;
  image: string;
  content: string;
  source: string;
  timeAgo: string;
  date: string;
  isLive: boolean;
  category: string;
  team: string;
}

// Mock data for news
const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Appreciate Trent Alexander-Arnold's greatness",
    image: "/news/news1.jpg",
    content: "Liverpool's Trent Alexander-Arnold continues to redefine the right-back position with his exceptional passing range and vision...",
    source: "365Scores Magazine",
    timeAgo: "6 Minutes Ago",
    date: "2023-05-16T10:30:00",
    isLive: true,
    category: "football",
    team: "liverpool"
  },
  {
    id: 2,
    title: "Ten Hag confirms Varane will leave Man Utd",
    image: "/news/news2.jpg",
    content: "Manchester United manager Erik ten Hag has confirmed that defender Raphael Varane will leave the club when his contract expires this summer...",
    source: "BBC Sport",
    timeAgo: "2 Hours Ago",
    date: "2023-05-16T08:45:00",
    isLive: false,
    category: "football",
    team: "manchester-united"
  },
  {
    id: 3,
    title: "Barcelona in talks to sign Athletic forward Williams",
    image: "/news/news3.jpg",
    content: "Barcelona are in advanced talks to sign Athletic Bilbao forward Nico Williams, who has impressed with his performances in La Liga...",
    source: "Sky Sports",
    timeAgo: "4 Hours Ago",
    date: "2023-05-16T06:20:00",
    isLive: false,
    category: "football",
    team: "barcelona"
  },
  {
    id: 4,
    title: "Kylian Mbappé set to join Real Madrid next season",
    image: "/news/news4.jpg",
    content: "PSG star Kylian Mbappé has reportedly agreed terms with Real Madrid ahead of a free transfer this summer...",
    source: "ESPN",
    timeAgo: "5 Hours Ago",
    date: "2023-05-16T05:10:00",
    isLive: false,
    category: "football",
    team: "real-madrid"
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<NewsItem[]>) {
  // Optional filtering by category or team
  const { category, team, limit } = req.query
  let filteredNews = newsItems
  
  if (category && typeof category === 'string') {
    filteredNews = filteredNews.filter(item => item.category === category)
  }
  
  if (team && typeof team === 'string') {
    filteredNews = filteredNews.filter(item => item.team === team)
  }
  
  // Apply limit if specified
  if (limit && typeof limit === 'string' && !isNaN(Number(limit))) {
    filteredNews = filteredNews.slice(0, Number(limit))
  }
  
  res.status(200).json(filteredNews)
} 