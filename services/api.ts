import { Match, Team, League } from '../types';

const API_BASE_URL = 'https://beta.api-score.top/api';

// Media asset URLs
export const MEDIA_URLS = {
  team: (id: number) => `https://beta.api-score.top/uploads/teams/${id}.webp`,
  league: (id: number) => `https://beta.api-score.top/uploads/leagues/${id}.webp`,
  country: (id: number) => `https://beta.api-score.top/uploads/countries/${id}.webp`,
  player: (id: number) => `https://beta.api-score.top/uploads/players/${id}.webp`,
  coach: (id: number) => `https://beta.api-score.top/uploads/coaches/${id}.webp`,
  referee: (id: number) => `https://beta.api-score.top/referees/coaches/${id}.webp`,
};

// Helper to handle API errors
const handleApiError = (error: any): never => {
  console.error('API Error:', error);
  throw new Error('Failed to fetch data from API');
};

// Fetch fixtures by date
export const getFixturesByDate = async (date: string): Promise<Match[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/fixtures/date/${date}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform API data to match our Match type
    return data.data.map((fixture: any) => {
      // Format time from 24-hour (13:15:00) to user-friendly format (13:15)
      const timeString = fixture.starting_at.split(' ')[1].substring(0, 5);
      
      return {
        id: fixture.id,
        date: fixture.starting_at.split(' ')[0],
        time: timeString,
        competition: {
          name: fixture.league.name,
          logo: MEDIA_URLS.league(fixture.league.id),
          country: fixture.league.country.name,
        },
        homeTeam: {
          name: fixture.home_team.name,
          logo: MEDIA_URLS.team(fixture.home_team.id),
        },
        awayTeam: {
          name: fixture.away_team.name,
          logo: MEDIA_URLS.team(fixture.away_team.id),
        },
        status: getMatchStatus(fixture.state),
        elapsed: fixture.state === 'LIVE' ? '45' : undefined, // Placeholder as elapsed time isn't provided
        homeScore: fixture.score_current_home,
        awayScore: fixture.score_current_away,
      };
    });
  } catch (error) {
    return handleApiError(error);
  }
};

// Get single fixture details
export const getFixtureDetails = async (fixtureId: number): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/fixtures/${fixtureId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get selected teams
export const getSelectedTeams = async (): Promise<Team[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/teams/selected`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform API data to match our Team type
    // The data is grouped by countries, we need to flatten it
    const teams: Team[] = [];
    
    if (data.data && Array.isArray(data.data)) {
      data.data.forEach((countryGroup: any) => {
        if (countryGroup.teams && Array.isArray(countryGroup.teams)) {
          countryGroup.teams.forEach((team: any) => {
            // Ensure we have a default placeholder image for empty flags
            const flag = countryGroup.country_image 
              ? `https://beta.api-score.top/${countryGroup.country_image}`
              : 'https://via.placeholder.com/24'; // Placeholder image for countries with no flag
            
            teams.push({
              id: team.id,
              name: team.name,
              country: team.country_name,
              logo: MEDIA_URLS.team(team.id),
              flag,
            });
          });
        }
      });
    }
    
    return teams;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get selected leagues
export const getSelectedLeagues = async (): Promise<League[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/leagues/selected`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform API data to match our League type
    // The data is grouped by countries, we need to flatten it
    const leagues: League[] = [];
    
    if (data.data && Array.isArray(data.data)) {
      data.data.forEach((countryGroup: any) => {
        if (countryGroup.leagues && Array.isArray(countryGroup.leagues)) {
          countryGroup.leagues.forEach((league: any) => {
            // Ensure we have a default placeholder image for empty flags
            const flag = countryGroup.country_image 
              ? `https://beta.api-score.top/${countryGroup.country_image}`
              : 'https://via.placeholder.com/24'; // Placeholder image for countries with no flag
              
            leagues.push({
              id: league.id,
              name: league.name,
              country: league.country_name,
              logo: MEDIA_URLS.league(league.id),
              flag,
              region: countryGroup.country_id || '',
            });
          });
        }
      });
    }
    
    return leagues;
  } catch (error) {
    return handleApiError(error);
  }
};

// Helper function to convert API status to our status format
const getMatchStatus = (status: string): string => {
  switch (status) {
    case 'NS':
    case 'TBD':
    case 'SCHEDULED':
      return 'Not Started';
    case 'LIVE':
    case '1H':
    case '2H':
    case 'HT':
    case 'ET':
    case 'BT':
    case 'P':
    case 'INT':
      return 'Live';
    case 'FT':
    case 'FT_PEN':
    case 'AET':
    case 'FINISHED':
      return 'Finished';
    case 'SUSP':
    case 'PST':
    case 'CANC':
    case 'ABD':
    case 'CANCELLED':
    case 'POSTPONED':
      return 'Canceled';
    default:
      return 'Not Started';
  }
}; 