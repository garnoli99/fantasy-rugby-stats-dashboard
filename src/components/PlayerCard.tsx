
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Player, Team, teamNames } from '@/utils/mockData';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  compact?: boolean;
  onClick?: () => void;
  selected?: boolean;
  index?: number;
}

const PlayerCard = ({ 
  player, 
  compact = false,
  onClick,
  selected = false,
  index = 0
}: PlayerCardProps) => {
  const costChangeIcon = () => {
    if (player.costChange > 0.1) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (player.costChange < -0.1) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const pointsChangeIcon = () => {
    if (player.pointsChange > 3) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (player.pointsChange < -3) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const teamColor = `bg-rugby-${player.team}`;
  const formattedCost = player.cost.toFixed(1);
  
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className={cn(
          "relative overflow-hidden bg-card rounded-lg p-3 border shadow-sm transition-all hover:shadow-md",
          selected && "ring-2 ring-primary",
          onClick && "cursor-pointer"
        )}
        onClick={onClick}
      >
        <div className={`absolute top-0 left-0 w-1.5 h-full ${teamColor}`} />
        
        <div className="flex items-center justify-between ml-1.5">
          <div>
            <h3 className="font-medium text-sm line-clamp-1">{player.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-muted-foreground">{player.position}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs font-medium" style={{ color: `hsl(var(--rugby-${player.team}))` }}>
                {teamNames[player.team]}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center justify-end">
              <span className="text-sm font-semibold mr-1">{player.points}</span>
              {pointsChangeIcon()}
            </div>
            <div className="flex items-center justify-end mt-1">
              <span className="text-xs mr-1">£{formattedCost}m</span>
              {costChangeIcon()}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "relative overflow-hidden bg-card rounded-lg border shadow-sm hover:shadow-md transition-all",
        selected && "ring-2 ring-primary",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className={`h-1.5 w-full ${teamColor}`} />
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{player.name}</h3>
            <div className="flex items-center mt-1">
              <span className="text-sm text-muted-foreground">{player.position}</span>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-sm font-medium" style={{ color: `hsl(var(--rugby-${player.team}))` }}>
                {teamNames[player.team]}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-md">
            <span className="text-xs font-medium uppercase">Form</span>
            <div className="flex items-center space-x-1">
              {player.form.map((point, i) => (
                <span 
                  key={i}
                  className={cn(
                    "w-6 h-6 flex items-center justify-center text-xs rounded-full",
                    point > 15 ? "bg-green-500/15 text-green-700 dark:text-green-400" :
                    point > 8 ? "bg-primary/15 text-primary" :
                    "bg-red-500/15 text-red-600 dark:text-red-400"
                  )}
                >
                  {point}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-muted/50 rounded-md p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Points</span>
              {pointsChangeIcon()}
            </div>
            <div className="mt-1 flex items-baseline">
              <span className="text-2xl font-bold">{player.points}</span>
              {player.pointsChange !== 0 && (
                <span className={cn(
                  "ml-2 text-sm",
                  player.pointsChange > 0 ? "text-green-500" : "text-red-500"
                )}>
                  {player.pointsChange > 0 ? '+' : ''}{player.pointsChange}
                </span>
              )}
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-md p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Cost</span>
              {costChangeIcon()}
            </div>
            <div className="mt-1 flex items-baseline">
              <span className="text-2xl font-bold">£{formattedCost}m</span>
              {player.costChange !== 0 && (
                <span className={cn(
                  "ml-2 text-sm",
                  player.costChange > 0 ? "text-green-500" : "text-red-500"
                )}>
                  {player.costChange > 0 ? '+' : ''}{player.costChange.toFixed(1)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerCard;
