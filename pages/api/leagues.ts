import { NextApiRequest, NextApiResponse } from 'next'
import { League } from '../../types'

// Mock data for leagues
const leagues: Omit<League, 'region' | 'flag'>[] = [
  {
    id: 1,
    name: 'Arsenal',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/leagues/arsenal.png'
  },
  {
    id: 2,
    name: 'Arsenal',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/leagues/arsenal.png'
  },
  {
    id: 3,
    name: 'Arsenal',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/leagues/arsenal.png'
  },
  {
    id: 4,
    name: 'Chelsea',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/leagues/chelsea.png'
  },
  {
    id: 5,
    name: 'Liverpool',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/leagues/liverpool.png'
  },
  {
    id: 6,
    name: 'Manchester City',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/leagues/man-city.png'
  },
  {
    id: 7,
    name: 'Manchester City',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/leagues/man-city.png'
  },
  {
    id: 8,
    name: 'Manchester City',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/leagues/man-city.png'
  },
  {
    id: 9,
    name: 'Manchester City',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/leagues/man-city.png'
  }
] as League[]

export default function handler(req: NextApiRequest, res: NextApiResponse<League[]>) {
  // Optional filtering by country
  const { country } = req.query
  let filteredLeagues = leagues
  
  if (country && typeof country === 'string') {
    filteredLeagues = leagues.filter(league => league.country.toLowerCase() === country.toLowerCase())
  }
  
  res.status(200).json(filteredLeagues)
} 