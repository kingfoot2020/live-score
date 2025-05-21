import { NextApiRequest, NextApiResponse } from 'next'
import { League } from '../../types'

// Mock data for leagues
const leagues: League[] = [
  {
    id: 1,
    name: 'Arsenal',
    country: 'England',
    logo: '/leagues/arsenal.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png',
    region: 'Europe'
  },
  {
    id: 2,
    name: 'Arsenal',
    country: 'England',
    logo: '/leagues/arsenal.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png',
    region: 'Europe'
  },
  {
    id: 3,
    name: 'Arsenal',
    country: 'England',
    logo: '/leagues/arsenal.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png',
    region: 'Europe'
  },
  {
    id: 4,
    name: 'Chelsea',
    country: 'England',
    logo: '/leagues/chelsea.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png',
    region: 'Europe'
  },
  {
    id: 5,
    name: 'Liverpool',
    country: 'England',
    logo: '/leagues/liverpool.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png',
    region: 'Europe'
  },
  {
    id: 6,
    name: 'Manchester City',
    country: 'England',
    logo: '/leagues/man-city.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png',
    region: 'Europe'
  },
  {
    id: 7,
    name: 'Manchester City',
    country: 'England',
    logo: '/leagues/man-city.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png',
    region: 'Europe'
  },
  {
    id: 8,
    name: 'Manchester City',
    country: 'England',
    logo: '/leagues/man-city.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png',
    region: 'Europe'
  },
  {
    id: 9,
    name: 'Manchester City',
    country: 'England',
    logo: '/leagues/man-city.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png',
    region: 'Europe'
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<League[]>) {
  // Optional filtering by country
  const { country } = req.query
  let filteredLeagues = leagues
  
  if (country && typeof country === 'string') {
    filteredLeagues = leagues.filter(league => league.country.toLowerCase() === country.toLowerCase())
  }
  
  res.status(200).json(filteredLeagues)
} 