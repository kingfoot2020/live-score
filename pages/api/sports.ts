import { NextApiRequest, NextApiResponse } from 'next'

interface Sport {
  id: string;
  name: string;
  icon: string;
  active?: boolean;
}

// Mock data for sports categories
const sports: Sport[] = [
  { id: 'football', name: 'Football', icon: 'FaFutbol', active: true },
  { id: 'basketball', name: 'Basketball', icon: 'FaBasketballBall' },
  { id: 'tennis', name: 'Tennis', icon: 'GiTennisBall' },
  { id: 'table-tennis', name: 'Table Tennis', icon: 'FaTableTennis' },
  { id: 'ice-hockey', name: 'Ice Hockey', icon: 'FaHockeyPuck' },
  { id: 'esports', name: 'Esports', icon: 'GiBowlingPin' },
  { id: 'handball', name: 'Handball', icon: 'FaVolleyballBall' },
  { id: 'volleyball', name: 'Volleyball', icon: 'FaVolleyballBall' },
  { id: 'cricket', name: 'Cricket', icon: 'GiCricketBat' },
  { id: 'cycling', name: 'Cycling', icon: 'BiCycling' },
  { id: 'archery', name: 'Archery', icon: 'FaFutbol' },
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Sport[]>) {
  res.status(200).json(sports)
} 