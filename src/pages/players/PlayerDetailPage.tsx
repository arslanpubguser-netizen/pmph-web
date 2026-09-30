import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, ChevronLeft, Target, Zap, Crosshair, Award,
  Calendar, Gamepad2, ExternalLink, Trophy,
} from 'lucide-react';
import { mockPlayers, mockTeams, mockTournaments } from '@/data/mockData';

export default function PlayerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const player = mockPlayers.find(p => p.id === id);
  if (!player) {
    return (
      <div className="container-esports py-20 text-center">
        <p className="text-text-muted">Player not found.</p>
        <Link to="/players" className="text-primary mt-4 inline-block">Back to Players</Link>
      </div>
    );
  }

  const team = player.teamId ? mockTeams.find(t => t.id === player.teamId) : null;
  const playerTournaments = mockTournaments.slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="relative h-48 bg-gradient-to-r from-primary/20 via-bg-surface to-blue/20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors z-10">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="container-esports -mt-16 relative z-10">
        {/* Profile Header */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative">
              <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-bg-hover to-bg-card border-2 border-border overflow-hidden">
                <img src={player.avatarUrl} alt={player.username} className="w-full h-full object-cover" />
              </div>
              {player.isAvailable && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-bg-base whitespace-nowrap">
                  AVAILABLE
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="font-display font-bold text-3xl text-white">{player.username}</h1>
              <p className="text-sm text-text-muted font-mono mt-1">PUBG ID: {player.pubgId}</p>
              <div className="flex items-center gap-4 text-sm mt-3">
                <span className="flex items-center gap-1 text-text-muted"><MapPin className="w-4 h-4" />{player.region}</span>
                <span className="text-yellow font-bold">{player.rank}</span>
                <span className="text-primary">{player.level}</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs font-bold px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/30">{player.primaryRole}</span>
                {player.secondaryRole && (
                  <span className="text-xs font-bold px-2 py-1 rounded-md bg-blue/10 text-blue border border-blue/30">{player.secondaryRole}</span>
                )}
              </div>
              {team && (
                <Link to={`/teams/${team.id}`} className="inline-flex items-center gap-2 mt-4 text-sm text-text-secondary hover:text-primary transition-colors">
                  <Gamepad2 className="w-4 h-4" /> {team.name}
                </Link>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {player.socialLinks && Object.entries(player.socialLinks).map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-bg-card border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-all text-xs">
                  {key.slice(0, 2).toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {[
            { label: 'K/D', value: player.kd, icon: Target, color: 'text-primary' },
            { label: 'Win Rate', value: `${player.winRate}%`, icon: Zap, color: 'text-yellow' },
            { label: 'Matches', value: player.matches, icon: Crosshair, color: 'text-blue' },
            { label: 'Kills', value: player.kills, icon: Crosshair, color: 'text-red' },
            { label: 'Wins', value: player.wins, icon: Trophy, color: 'text-orange' },
            { label: 'Level', value: player.level, icon: Award, color: 'text-purple' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="hud-corners card p-4 text-center"
            >
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
              <p className={`font-display font-bold text-xl ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bio */}
          {player.bio && (
            <div className="card p-6">
              <h3 className="font-display font-bold text-lg text-white mb-3">About</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{player.bio}</p>
            </div>
          )}

          {/* Achievements */}
          <div className="card p-6">
            <h3 className="font-display font-bold text-lg text-white mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow" /> Achievements
            </h3>
            <div className="space-y-2">
              {player.achievements.map((ach, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                  <Trophy className="w-4 h-4 text-yellow/60" /> {ach}
                </div>
              ))}
            </div>
          </div>

          {/* Tournament History */}
          <div className="card p-6 md:col-span-2">
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue" /> Tournament History
            </h3>
            <div className="space-y-2">
              {playerTournaments.map(t => (
                <Link key={t.id} to={`/tournaments/${t.id}`} className="card card-hover group flex items-center gap-4 p-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img src={t.bannerUrl} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white group-hover:text-primary transition-colors">{t.name}</h4>
                    <p className="text-xs text-text-muted">{new Date(t.startDate).toLocaleDateString('en-PK')} • {t.region}</p>
                  </div>
                  <span className="text-xs font-bold text-yellow">Rs {t.prizePool.toLocaleString()}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
