
// Types for our data models
export interface Player {
  id: number;
  name: string;
  position: string;
  team: Team;
  cost: number;
  points: number;
  costChange: number;
  pointsChange: number;
  form: number[];
  image?: string;
}

export type Team = 'england' | 'france' | 'ireland' | 'italy' | 'scotland' | 'wales';

export interface Game {
  id: number;
  round: number;
  date: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
}

export interface PlayerGameStats {
  playerId: number;
  gameId: number;
  points: number;
  cost: number;
  minutesPlayed: number;
  tries: number;
  assists: number;
  tackles: number;
  linebreaks: number;
}

// Map team names to proper display names
export const teamNames: Record<Team, string> = {
  england: 'England',
  france: 'France',
  ireland: 'Ireland',
  italy: 'Italy',
  scotland: 'Scotland',
  wales: 'Wales'
};

// Mock data for our six nations games
export const games: Game[] = [
  {
    id: 1,
    round: 1,
    date: '2024-02-02',
    homeTeam: 'france',
    awayTeam: 'ireland',
    homeScore: 17,
    awayScore: 38
  },
  {
    id: 2,
    round: 1,
    date: '2024-02-03',
    homeTeam: 'italy',
    awayTeam: 'england',
    homeScore: 24,
    awayScore: 27
  },
  {
    id: 3,
    round: 1,
    date: '2024-02-03',
    homeTeam: 'wales',
    awayTeam: 'scotland',
    homeScore: 26,
    awayScore: 27
  },
  {
    id: 4,
    round: 2,
    date: '2024-02-10',
    homeTeam: 'scotland',
    awayTeam: 'france',
    homeScore: 16,
    awayScore: 20
  },
  {
    id: 5,
    round: 2,
    date: '2024-02-10',
    homeTeam: 'england',
    awayTeam: 'wales',
    homeScore: 16,
    awayScore: 14
  },
  {
    id: 6,
    round: 2,
    date: '2024-02-11',
    homeTeam: 'ireland',
    awayTeam: 'italy',
    homeScore: 36,
    awayScore: 0
  },
  {
    id: 7,
    round: 3,
    date: '2024-02-24',
    homeTeam: 'ireland',
    awayTeam: 'wales',
    homeScore: 31,
    awayScore: 7
  },
  {
    id: 8,
    round: 3,
    date: '2024-02-24',
    homeTeam: 'scotland',
    awayTeam: 'england',
    homeScore: 30,
    awayScore: 21
  },
  {
    id: 9,
    round: 3,
    date: '2024-02-25',
    homeTeam: 'france',
    awayTeam: 'italy',
    homeScore: 13,
    awayScore: 13
  },
  {
    id: 10,
    round: 4,
    date: '2024-03-09',
    homeTeam: 'italy',
    awayTeam: 'scotland',
    homeScore: null,
    awayScore: null
  },
  {
    id: 11,
    round: 4,
    date: '2024-03-09',
    homeTeam: 'england',
    awayTeam: 'ireland',
    homeScore: null,
    awayScore: null
  },
  {
    id: 12,
    round: 4,
    date: '2024-03-10',
    homeTeam: 'wales',
    awayTeam: 'france',
    homeScore: null,
    awayScore: null
  },
  {
    id: 13,
    round: 5,
    date: '2024-03-16',
    homeTeam: 'wales',
    awayTeam: 'italy',
    homeScore: null,
    awayScore: null
  },
  {
    id: 14,
    round: 5,
    date: '2024-03-16',
    homeTeam: 'ireland',
    awayTeam: 'scotland',
    homeScore: null,
    awayScore: null
  },
  {
    id: 15,
    round: 5,
    date: '2024-03-16',
    homeTeam: 'france',
    awayTeam: 'england',
    homeScore: null,
    awayScore: null
  }
];

// Mock data for players
export const players: Player[] = [
  {
    id: 1,
    name: 'James Lowe',
    position: 'Wing',
    team: 'ireland',
    cost: 10.2,
    points: 63,
    costChange: 0.8,
    pointsChange: 15,
    form: [12, 18, 20, 13]
  },
  {
    id: 2,
    name: 'Damian Penaud',
    position: 'Wing',
    team: 'france',
    cost: 10.5,
    points: 48,
    costChange: 0.3,
    pointsChange: -5,
    form: [15, 10, 8, 15]
  },
  {
    id: 3,
    name: 'Duhan van der Merwe',
    position: 'Wing',
    team: 'scotland',
    cost: 9.8,
    points: 69,
    costChange: 1.2,
    pointsChange: 22,
    form: [25, 8, 28, 8]
  },
  {
    id: 4,
    name: 'Tommaso Allan',
    position: 'Fly-half',
    team: 'italy',
    cost: 8.5,
    points: 32,
    costChange: -0.1,
    pointsChange: -2,
    form: [12, 6, 14, 0]
  },
  {
    id: 5,
    name: 'Ben Earl',
    position: 'Number 8',
    team: 'england',
    cost: 9.1,
    points: 42,
    costChange: 0.5,
    pointsChange: 8,
    form: [10, 15, 9, 8]
  },
  {
    id: 6,
    name: 'Aaron Wainwright',
    position: 'Flanker',
    team: 'wales',
    cost: 8.3,
    points: 36,
    costChange: -0.2,
    pointsChange: -3,
    form: [14, 10, 6, 6]
  },
  {
    id: 7,
    name: 'Bundee Aki',
    position: 'Center',
    team: 'ireland',
    cost: 9.7,
    points: 52,
    costChange: 0.6,
    pointsChange: 12,
    form: [15, 14, 12, 11]
  },
  {
    id: 8,
    name: 'Ellis Genge',
    position: 'Prop',
    team: 'england',
    cost: 8.8,
    points: 28,
    costChange: 0.1,
    pointsChange: 4,
    form: [6, 8, 7, 7]
  },
  {
    id: 9,
    name: 'Finn Russell',
    position: 'Fly-half',
    team: 'scotland',
    cost: 10.0,
    points: 45,
    costChange: 0.4,
    pointsChange: 7,
    form: [12, 10, 18, 5]
  },
  {
    id: 10,
    name: 'Antoine Dupont',
    position: 'Scrum-half',
    team: 'france',
    cost: 11.0,
    points: 38,
    costChange: -0.3,
    pointsChange: -4,
    form: [18, 10, 5, 5]
  },
  {
    id: 11,
    name: 'Caelan Doris',
    position: 'Number 8',
    team: 'ireland',
    cost: 9.5,
    points: 44,
    costChange: 0.5,
    pointsChange: 10,
    form: [10, 12, 10, 12]
  },
  {
    id: 12,
    name: 'Ange Capuozzo',
    position: 'Fullback',
    team: 'italy',
    cost: 8.7,
    points: 30,
    costChange: 0.2,
    pointsChange: 5,
    form: [8, 6, 10, 6]
  }
];

// Generate player game stats
export const playerGameStats: PlayerGameStats[] = [];

// Generate random stats for each player for each completed game
players.forEach(player => {
  games.filter(game => game.homeScore !== null).forEach(game => {
    // Only create stats if player's team is playing in this game
    if (game.homeTeam === player.team || game.awayTeam === player.team) {
      const basePoints = Math.floor(Math.random() * 15) + 5;
      const baseCost = player.cost - (Math.random() * 1.5 - 0.7);
      
      playerGameStats.push({
        playerId: player.id,
        gameId: game.id,
        points: basePoints,
        cost: parseFloat(baseCost.toFixed(1)),
        minutesPlayed: Math.floor(Math.random() * 40) + 40,
        tries: Math.random() > 0.7 ? 1 : 0,
        assists: Math.random() > 0.8 ? 1 : 0,
        tackles: Math.floor(Math.random() * 12) + 1,
        linebreaks: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0
      });
    }
  });
});

// Function to get player performance over all games
export const getPlayerPerformanceData = (playerId: number) => {
  const playerStats = playerGameStats.filter(stat => stat.playerId === playerId);
  const sortedStats = playerStats.sort((a, b) => {
    const gameA = games.find(g => g.id === a.gameId)!;
    const gameB = games.find(g => g.id === b.gameId)!;
    return new Date(gameA.date).getTime() - new Date(gameB.date).getTime();
  });
  
  return sortedStats.map(stat => {
    const game = games.find(g => g.id === stat.gameId)!;
    return {
      round: game.round,
      date: game.date,
      points: stat.points,
      cost: stat.cost,
      opponent: game.homeTeam === players.find(p => p.id === playerId)?.team ? game.awayTeam : game.homeTeam
    };
  });
};

// Get top performers
export const getTopPerformers = () => {
  return [...players]
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);
};

// Get players with biggest cost increases
export const getBiggestRisers = () => {
  return [...players]
    .sort((a, b) => b.costChange - a.costChange)
    .slice(0, 5);
};

// Get players with biggest cost decreases
export const getBiggestFallers = () => {
  return [...players]
    .sort((a, b) => a.costChange - b.costChange)
    .slice(0, 5);
};

// Get performance data by team
export const getTeamPerformance = () => {
  const teamData: Record<Team, { totalPoints: number, averagePoints: number, playerCount: number }> = {
    england: { totalPoints: 0, averagePoints: 0, playerCount: 0 },
    france: { totalPoints: 0, averagePoints: 0, playerCount: 0 },
    ireland: { totalPoints: 0, averagePoints: 0, playerCount: 0 },
    italy: { totalPoints: 0, averagePoints: 0, playerCount: 0 },
    scotland: { totalPoints: 0, averagePoints: 0, playerCount: 0 },
    wales: { totalPoints: 0, averagePoints: 0, playerCount: 0 }
  };
  
  players.forEach(player => {
    teamData[player.team].totalPoints += player.points;
    teamData[player.team].playerCount += 1;
  });
  
  // Calculate averages
  Object.keys(teamData).forEach(team => {
    const teamKey = team as Team;
    teamData[teamKey].averagePoints = teamData[teamKey].playerCount > 0 
      ? Math.round(teamData[teamKey].totalPoints / teamData[teamKey].playerCount) 
      : 0;
  });
  
  return teamData;
};
