import { motion } from 'framer-motion';
import type { TournamentStatus } from '@/types';
import { Radio, Clock, CheckCircle2, Calendar } from 'lucide-react';

export function StatusBadge({ status, size = 'md' }: { status: TournamentStatus; size?: 'sm' | 'md' }) {
  const config: Record<TournamentStatus, { color: string; bg: string; icon: React.ReactNode; label: string; pulse?: boolean }> = {
    LIVE: { color: 'text-red', bg: 'bg-red/10 border-red/30', icon: <Radio className="w-3 h-3" />, label: 'LIVE', pulse: true },
    OPEN: { color: 'text-primary', bg: 'bg-primary/10 border-primary/30', icon: <Calendar className="w-3 h-3" />, label: 'OPEN' },
    UPCOMING: { color: 'text-yellow', bg: 'bg-yellow/10 border-yellow/30', icon: <Clock className="w-3 h-3" />, label: 'UPCOMING' },
    COMPLETED: { color: 'text-text-muted', bg: 'bg-bg-hover border-border', icon: <CheckCircle2 className="w-3 h-3" />, label: 'COMPLETED' },
  };

  const c = config[status];
  const sizeClass = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1 ${sizeClass} font-bold rounded-md border ${c.bg} ${c.color}`}>
      <span className={c.pulse ? 'animate-pulse' : ''}>{c.icon}</span>
      {c.label}
    </span>
  );
}
