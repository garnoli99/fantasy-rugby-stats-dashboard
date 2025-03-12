
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import PlayerChart from '@/components/PlayerChart';
import PlayerCard from '@/components/PlayerCard';
import TeamFilter from '@/components/TeamFilter';
import StatsSummary from '@/components/StatsSummary';
import { 
  Player, 
  Team, 
  players as mockPlayers, 
  teamNames,
  getPlayerPerformanceData
} from '@/utils/mockData';
import { LineChart, TrendingUp, ChevronDown, Search, Info } from 'lucide-react';

const Index = () => {
  const [selectedTeams, setSelectedTeams] = useState<Team[]>(['england', 'france', 'ireland', 'italy', 'scotland', 'wales']);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Load data
  useEffect(() => {
    setIsLoading(true);
    // Simulate loading data
    setTimeout(() => {
      setPlayers(mockPlayers);
      // Preselect the first player
      setSelectedPlayer(mockPlayers[0]);
      setIsLoading(false);
    }, 600);
  }, []);

  // Filter players by selected teams and search term
  const filteredPlayers = players.filter(player => 
    selectedTeams.includes(player.team) && 
    (player.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     player.position.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleToggleTeam = (team: Team) => {
    if (selectedTeams.includes(team)) {
      // Don't allow removing the last team
      if (selectedTeams.length > 1) {
        setSelectedTeams(selectedTeams.filter(t => t !== team));
      }
    } else {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main content */}
      <main className="container pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium mb-2">
            Fantasy Stats Dashboard
          </span>
          <h1 className="text-3xl font-bold mb-2">Six Nations 2024</h1>
          <p className="text-muted-foreground max-w-3xl">
            Track player performance, analyze point trends, and monitor cost changes to optimize your fantasy rugby team.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Player Chart Section */}
          <div className="lg:col-span-7 space-y-6">
            {selectedPlayer ? (
              <>
                <motion.div 
                  key={selectedPlayer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PlayerCard player={selectedPlayer} />
                </motion.div>
                
                <PlayerChart playerId={selectedPlayer.id} />
              </>
            ) : (
              <div className="bg-card rounded-lg border p-8 text-center">
                <Info className="h-10 w-10 text-muted-foreground mb-2 mx-auto" />
                <h3 className="text-lg font-medium mb-1">No Player Selected</h3>
                <p className="text-muted-foreground mb-4">
                  Select a player from the list to view their detailed stats and performance chart.
                </p>
              </div>
            )}
          </div>
          
          {/* Filters and Player List */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search players or positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 py-2.5 bg-card border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <TeamFilter 
              selectedTeams={selectedTeams}
              onToggleTeam={handleToggleTeam}
            />
            
            <div className="bg-card rounded-lg border shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium">Players</h3>
                <span className="text-sm text-muted-foreground">
                  {filteredPlayers.length} players
                </span>
              </div>
              
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse bg-muted h-16 rounded-md" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  <AnimatePresence>
                    {filteredPlayers.map((player, index) => (
                      <PlayerCard
                        key={player.id}
                        player={player}
                        compact={true}
                        selected={selectedPlayer?.id === player.id}
                        onClick={() => setSelectedPlayer(player)}
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                  
                  {filteredPlayers.length === 0 && (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">No players found for your current filters.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Stats Summary Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <LineChart className="h-6 w-6 text-primary mr-2" />
            Performance Insights
          </h2>
          
          <StatsSummary />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-3 md:mb-0">
              © 2024 Fantasy Rugby Stats Dashboard. Data is simulated for demonstration purposes.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
