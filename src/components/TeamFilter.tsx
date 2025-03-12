
import React from 'react';
import { Team, teamNames } from '@/utils/mockData';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TeamFilterProps {
  selectedTeams: Team[];
  onToggleTeam: (team: Team) => void;
  className?: string;
}

const TeamFilter = ({ selectedTeams, onToggleTeam, className = '' }: TeamFilterProps) => {
  const teams: Team[] = ['england', 'france', 'ireland', 'italy', 'scotland', 'wales'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("bg-card rounded-lg border p-4 shadow-sm", className)}
    >
      <h3 className="text-lg font-medium mb-3">Filter by Team</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {teams.map((team, index) => (
          <motion.button
            key={team}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            onClick={() => onToggleTeam(team)}
            className={cn(
              "flex items-center p-2 rounded-md transition-all",
              selectedTeams.includes(team)
                ? `bg-rugby-${team}/15 border-rugby-${team}/30 border`
                : "bg-muted/50 border-transparent border hover:bg-muted"
            )}
            style={selectedTeams.includes(team) ? { color: `hsl(var(--rugby-${team}))` } : {}}
          >
            <div 
              className={cn(
                "w-3 h-3 rounded-full mr-2",
                `bg-rugby-${team}`
              )}
            />
            <span className={cn(
              "text-sm font-medium",
              !selectedTeams.includes(team) && "text-muted-foreground"
            )}>
              {teamNames[team]}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default TeamFilter;
