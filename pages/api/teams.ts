import { NextApiRequest, NextApiResponse } from 'next'
import { Team } from '../../types'

// Mock data for teams
const teams: Omit<Team, 'flag'>[] = [
  {
    id: 1,
    name: 'Arsenal',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/teams/arsenal.png'
  },
  {
    id: 2,
    name: 'Liverpool',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/teams/liverpool.png'
  },
  {
    id: 3,
    name: 'Liverpool',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/teams/liverpool.png'
  },
  {
    id: 4,
    name: 'Liverpool',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/teams/liverpool.png'
  },
  {
    id: 5,
    name: 'Liverpool',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/teams/liverpool.png'
  },
  {
    id: 6,
    name: 'Manchester City',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/teams/man-city.png'
  },
  {
    id: 7,
    name: 'Manchester City',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/teams/man-city.png'
  },
  {
    id: 8,
    name: 'Manchester City',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/teams/man-city.png'
  },
  {
    id: 9,
    name: 'Manchester City',
    country: 'England',
    countryCode: 'gb-eng',
    logo: '/teams/man-city.png'
  }
] as Team[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Team[]>) {
  // Optional filtering by country
  const { country } = req.query
  let filteredTeams = teams
  
  if (country && typeof country === 'string') {
    filteredTeams = teams.filter(team => team.country.toLowerCase() === country.toLowerCase())
  }
  
  res.status(200).json(filteredTeams)
} 