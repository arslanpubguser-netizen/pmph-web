import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Crosshair, Target, Zap } from 'lucide-react';
import type { PlayerProfile } from '@/types';

const rankColors: Record<string, string> = {
  Conqueror: 'text-yellow',
  'Ace Dominator': 'text-orange',
  Ace: 'text-primary',
  Crown: 'text-purple',
  Diamond: 'text-blue',
  Platinum: 'text-cyan',
  Gold: 'text-yellow',
  Silver: 'text-text-secondary',
  Bronze: 'text-orange',
};

export function PlayerCard({ player, index = 0 }: { player: PlayerProfile; index?: number }) {
  const rankColor = rankColors[player.rank] || 'text-text-secondary';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/players/${player.id}`}
        className="card card-hover group block p-4"
      >
        <div className="flex items-start gap-3">
          <div className="relative">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-bg-hover to-bg-card border border-border overflow-hidden group-hover:border-primary/40 transition-colors">
              <img src={player.avatarUrl} alt={player.username} className="w-full h-full object-cover" />
            </div>
            {player.isAvailable && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary border-2 border-bg-card" title="Available" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-white group-hover:text-primary transition-colors truncate">
              {player.username}
            </h3>
            <p className="text-xs text-text-muted font-mono">ID: {player.pubgId}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs font-bold ${rankColor}`}>{player.rank}</span>
              <span className="text-border">•</span>
              <span className="text-xs text-primary">{player.primaryRole}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="text-center bg-bg-base rounded-lg py-2">
            <Target className="w-3 h-3 text-primary mx-auto mb-0.5" />
            <p className="text-sm font-bold text-white">{player.kd}</p>
            <p className="text-[10px] text-text-muted">K/D</p>
          </div>
          <div className="text-center bg-bg-base rounded-lg py-2">
            <Zap className="w-3 h-3 text-yellow mx-auto mb-0.5" />
            <p className="text-sm font-bold text-white">{player.winRate}%</p>
            <p className="text-[10px] text-text-muted">Win Rate</p>
          </div>
          <div className="text-center bg-bg-base rounded-lg py-2">
            <Crosshair className="w-3 h-3 text-red mx-auto mb-0.5" />
            <p className="text-sm font-bold text-white">{player.kills}</p>
            <p className="text-[10px] text-text-muted">Kills</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {player.region}
          </span>
          <span className={player.isAvailable ? 'text-primary' : 'text-text-muted'}>
            {player.isAvailable ? 'Available' : 'In Team'}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
