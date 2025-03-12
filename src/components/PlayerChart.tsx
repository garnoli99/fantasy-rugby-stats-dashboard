
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Bar
} from 'recharts';
import { Player, PlayerGameStats, Game, getPlayerPerformanceData } from '@/utils/mockData';
import { motion } from 'framer-motion';

type ChartType = 'points' | 'cost';

interface PlayerChartProps {
  playerId: number;
  initialType?: ChartType;
  className?: string;
}

const DEFAULT_COLORS = {
  points: {
    line: 'hsl(var(--primary))',
    area: 'hsl(var(--primary) / 0.15)'
  },
  cost: {
    line: 'hsl(var(--rugby-france))',
    area: 'hsl(var(--rugby-france) / 0.15)'
  }
};

const PlayerChart = ({ playerId, initialType = 'points', className = '' }: PlayerChartProps) => {
  const [chartType, setChartType] = useState<ChartType>(initialType);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    
    setTimeout(() => {
      // Get player's performance data
      const data = getPlayerPerformanceData(playerId);
      setChartData(data);
      setIsLoading(false);
    }, 800);
  }, [playerId]);

  const handleChartTypeChange = (type: ChartType) => {
    setShowAnimation(true);
    setChartType(type);
    setTimeout(() => setShowAnimation(false), 600);
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="chart-tooltip">
          <p className="font-medium mb-1.5">Round {data.round}</p>
          <p className="text-muted-foreground">{new Date(data.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}</p>
          
          <div className="mt-2 pt-2 border-t border-border/60">
            {chartType === 'points' ? (
              <p className="font-medium">
                <span className="text-primary">Points: </span>
                {data.points}
              </p>
            ) : (
              <p className="font-medium">
                <span className="text-rugby-france">Cost: </span>
                {data.cost.toFixed(1)}
              </p>
            )}
          </div>
        </div>
      );
    }
    
    return null;
  };

  if (isLoading) {
    return (
      <div className={`w-full h-[300px] bg-card/50 rounded-lg flex items-center justify-center ${className}`}>
        <div className="animate-pulse-subtle text-muted-foreground">Loading chart data...</div>
      </div>
    );
  }

  return (
    <div className={`bg-card rounded-lg p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Performance Trend</h3>
        
        <div className="flex items-center bg-secondary rounded-md">
          <button
            onClick={() => handleChartTypeChange('points')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              chartType === 'points' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary-foreground/10'
            }`}
          >
            Points
          </button>
          <button
            onClick={() => handleChartTypeChange('cost')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              chartType === 'cost' ? 'bg-rugby-france text-primary-foreground' : 'hover:bg-secondary-foreground/10'
            }`}
          >
            Cost
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full h-[280px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={DEFAULT_COLORS.points.line} stopOpacity={0.25} />
                <stop offset="95%" stopColor={DEFAULT_COLORS.points.line} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={DEFAULT_COLORS.cost.line} stopOpacity={0.25} />
                <stop offset="95%" stopColor={DEFAULT_COLORS.cost.line} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.6)" />
            <XAxis 
              dataKey="round" 
              label={{ value: 'Round', position: 'insideBottomRight', offset: -10 }} 
              tick={{ fontSize: 12 }}
              stroke="hsl(var(--muted-foreground) / 0.5)"
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground) / 0.5)" 
              tick={{ fontSize: 12 }}
              domain={chartType === 'points' ? [0, 'auto'] : ['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip content={<CustomTooltip />} />
            {chartType === 'points' ? (
              <Area 
                type="monotone" 
                dataKey="points" 
                stroke={DEFAULT_COLORS.points.line} 
                fillOpacity={1}
                fill="url(#colorPoints)"
                strokeWidth={2}
                animationDuration={1500}
                isAnimationActive={showAnimation}
              />
            ) : (
              <Area 
                type="monotone" 
                dataKey="cost" 
                stroke={DEFAULT_COLORS.cost.line} 
                fillOpacity={1}
                fill="url(#colorCost)"
                strokeWidth={2}
                animationDuration={1500}
                isAnimationActive={showAnimation}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default PlayerChart;
