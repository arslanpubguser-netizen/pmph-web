import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Users, Calendar, MapPin } from 'lucide-react';
import type { Tournament } from '@/types';
import { StatusBadge } from '@/components/common/StatusBadge';

export function TournamentCard({ tournament, index = 0 }: { tournament: Tournament; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/tournaments/${tournament.id}`}
        className="card card-hover group block overflow-hidden"
      >
        <div className="relative h-36 overflow-hidden">
          <img
            src={tournament.bannerUrl}
            alt={tournament.name}
            className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/60 to-transparent" />
          <div className="absolute top-3 left-3">
            <StatusBadge status={tournament.status} />
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-display font-bold text-lg text-white group-hover:text-primary transition-colors line-clamp-1">
              {tournament.name}
            </h3>
            <p className="text-xs text-text-muted">by {tournament.organizer}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-yellow/10 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-yellow" />
              </div>
              <div>
                <p className="text-xs text-text-muted">Prize Pool</p>
                <p className="text-sm font-bold text-yellow font-mono">Rs {tournament.prizePool.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue" />
              </div>
              <div>
                <p className="text-xs text-text-muted">Teams</p>
                <p className="text-sm font-bold text-white">{tournament.registeredTeams}/{tournament.maxTeams}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-subtle text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(tournament.startDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {tournament.region}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
