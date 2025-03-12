
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  getTopPerformers, 
  getBiggestRisers, 
  getBiggestFallers,
  getTeamPerformance,
  Player,
  Team,
  teamNames
} from '@/utils/mockData';
import { 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Users,
  ArrowRight 
} from 'lucide-react';
import PlayerCard from './PlayerCard';

interface StatsSummaryProps {
  className?: string;
}

const StatsSummary = ({ className = '' }: StatsSummaryProps) => {
  const topPerformers = getTopPerformers();
  const biggestRisers = getBiggestRisers();
  const biggestFallers = getBiggestFallers();
  const teamPerformance = getTeamPerformance();
  
  // Convert team performance object to sortable array
  const teamPerformanceArray = Object.entries(teamPerformance).map(
    ([team, data]) => ({
      team: team as Team,
      ...data
    })
  ).sort((a, b) => b.averagePoints - a.averagePoints);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn("grid grid-cols-1 lg:grid-cols-12 gap-6", className)}
    >
      {/* Top Performers */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:col-span-4 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-amber-500" />
            <h3 className="text-lg font-medium">Top Performers</h3>
          </div>
          <a href="/players" className="text-sm text-primary flex items-center hover:underline">
            View all <ArrowRight className="h-3 w-3 ml-1" />
          </a>
        </div>
        
        <div className="space-y-3">
          {topPerformers.map((player, index) => (
            <PlayerCard 
              key={player.id} 
              player={player} 
              compact={true} 
              index={index}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Value Changes */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="lg:col-span-4 space-y-4"
      >
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-medium">Biggest Risers</h3>
        </div>
        
        <div className="space-y-3">
          {biggestRisers.map((player, index) => (
            <div 
              key={player.id}
              className="bg-card rounded-lg p-3 border shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{player.name}</div>
                  <div className="flex items-center mt-0.5">
                    <span className="text-xs text-muted-foreground">{player.position}</span>
                    <span className="mx-1 text-muted-foreground">•</span>
                    <span 
                      className="text-xs font-medium"
                      style={{ color: `hsl(var(--rugby-${player.team}))` }}
                    >
                      {teamNames[player.team]}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-baseline">
                  <span className="text-lg font-semibold">£{player.cost.toFixed(1)}m</span>
                  <span className="ml-1 text-sm text-green-500">+{player.costChange.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Team Performance */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="lg:col-span-4 space-y-4"
      >
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Team Performance</h3>
        </div>
        
        <div className="bg-card rounded-lg p-4 border shadow-sm">
          <div className="space-y-3">
            {teamPerformanceArray.map((teamData, index) => (
              <div key={teamData.team} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className={cn(
                      "w-3 h-3 rounded-full mr-2",
                      `bg-rugby-${teamData.team}`
                    )}
                  />
                  <span className="font-medium">{teamNames[teamData.team]}</span>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-semibold">{teamData.averagePoints} pts avg</div>
                  <div className="text-xs text-muted-foreground">{teamData.playerCount} players</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
          <TrendingDown className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-medium">Biggest Fallers</h3>
        </div>
        
        <div className="space-y-3">
          {biggestFallers.map((player, index) => (
            <div 
              key={player.id}
              className="bg-card rounded-lg p-3 border shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{player.name}</div>
                  <div className="flex items-center mt-0.5">
                    <span className="text-xs text-muted-foreground">{player.position}</span>
                    <span className="mx-1 text-muted-foreground">•</span>
                    <span 
                      className="text-xs font-medium"
                      style={{ color: `hsl(var(--rugby-${player.team}))` }}
                    >
                      {teamNames[player.team]}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-baseline">
                  <span className="text-lg font-semibold">£{player.cost.toFixed(1)}m</span>
                  <span className="ml-1 text-sm text-red-500">{player.costChange.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatsSummary;
