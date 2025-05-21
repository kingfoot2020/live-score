# Live Score App

A modern, responsive web/mobile application for viewing live sports scores, upcoming matches, and sports news.

## Features1

- Display live scores for various sports
- View upcoming matches and schedules
- Browse popular teams and leagues
- Read latest sports news
- Support for multiple sports categories
- Responsive design for mobile and desktop

## Technologies Used

- Next.js
- React
- Tailwind CSS
- SWR for data fetching
- React Icons
- Responsive design with mobile-first approach

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```
npm run build
npm start
```

## Project Structure

- `/components` - React components
- `/pages` - Next.js pages and API routes
- `/public` - Static assets (images, etc.)
- `/styles` - CSS styles

## API Routes

- `/api/matches/live` - Get live matches
- `/api/matches/upcoming` - Get upcoming matches
- `/api/sports` - Get sports categories
- `/api/teams` - Get popular teams
- `/api/leagues` - Get leagues
- `/api/news` - Get sports news 