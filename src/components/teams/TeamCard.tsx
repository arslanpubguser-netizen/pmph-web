import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, MapPin, Trophy, ChevronRight } from 'lucide-react';
import type { Team } from '@/types';

export function TeamCard({ team, index = 0 }: { team: Team; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/teams/${team.id}`}
        className="card card-hover group block overflow-hidden"
      >
        <div className="relative h-28 overflow-hidden">
          <img
            src={team.bannerUrl}
            alt={team.name}
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent" />
          <div className="absolute top-3 right-3">
            {team.isRecruiting && (
              <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-primary/20 text-primary border border-primary/30">
                RECRUITING
              </span>
            )}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start gap-3 -mt-10">
            <div className="w-14 h-14 rounded-lg bg-bg-card border-2 border-border overflow-hidden flex-shrink-0 group-hover:border-primary/40 transition-colors">
              <img src={team.logoUrl} alt={team.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 pt-6">
              <h3 className="font-display font-bold text-white group-hover:text-primary transition-colors">
                {team.name}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                <MapPin className="w-3 h-3" />
                {team.region}
                <span className="text-border">•</span>
                <span className="text-primary">{team.level}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-text-muted mt-3 line-clamp-2">{team.description}</p>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-subtle">
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <Trophy className="w-3 h-3 text-yellow" />
                {team.points} pts
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-blue" />
                {team.matches} matches
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
