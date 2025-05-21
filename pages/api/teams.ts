import { NextApiRequest, NextApiResponse } from 'next'
import { Team } from '../../types'

// Mock data for teams
const teams: Team[] = [
  {
    id: 1,
    name: 'Arsenal',
    country: 'England',
    logo: '/teams/arsenal.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png'
  },
  {
    id: 2,
    name: 'Liverpool',
    country: 'England',
    logo: '/teams/liverpool.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png'
  },
  {
    id: 3,
    name: 'Liverpool',
    country: 'England',
    logo: '/teams/liverpool.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png'
  },
  {
    id: 4,
    name: 'Liverpool',
    country: 'England',
    logo: '/teams/liverpool.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png'
  },
  {
    id: 5,
    name: 'Liverpool',
    country: 'England',
    logo: '/teams/liverpool.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png'
  },
  {
    id: 6,
    name: 'Manchester City',
    country: 'England',
    logo: '/teams/man-city.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png'
  },
  {
    id: 7,
    name: 'Manchester City',
    country: 'England',
    logo: '/teams/man-city.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png'
  },
  {
    id: 8,
    name: 'Manchester City',
    country: 'England',
    logo: '/teams/man-city.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png'
  },
  {
    id: 9,
    name: 'Manchester City',
    country: 'England',
    logo: '/teams/man-city.png',
    flag: 'https://flagcdn.com/w20/gb-eng.png'
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Team[]>) {
  // Optional filtering by country
  const { country } = req.query
  let filteredTeams = teams
  
  if (country && typeof country === 'string') {
    filteredTeams = teams.filter(team => team.country.toLowerCase() === country.toLowerCase())
  }
  
  res.status(200).json(filteredTeams)
} 