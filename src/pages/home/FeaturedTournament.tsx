import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { mockTournaments } from '@/data/mockData';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Countdown } from '@/components/common/Countdown';

export function FeaturedTournament() {
  const liveTournament = mockTournaments.find(t => t.status === 'LIVE');
  const featured = liveTournament || mockTournaments.find(t => t.status === 'OPEN') || mockTournaments[0];

  return (
    <section className="container-esports py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl border border-border bg-bg-card"
      >
        <div className="absolute inset-0">
          <img src={featured.bannerUrl} alt={featured.name} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-card via-bg-card/90 to-bg-card/40" />
        </div>

        {featured.status === 'LIVE' && (
          <div className="absolute inset-0 gradient-border rounded-2xl opacity-60 animate-gradient-x" />
        )}

        <div className="relative p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <StatusBadge status={featured.status} />
              <span className="text-xs text-text-muted">Featured Tournament</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
              {featured.name}
            </h2>
            <p className="text-sm text-text-muted mb-4">Organized by {featured.organizer}</p>
            <p className="text-text-secondary mb-6">{featured.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-bg-base/60 backdrop-blur border border-border rounded-lg p-3">
                <Trophy className="w-4 h-4 text-yellow mb-1" />
                <p className="text-lg font-bold text-yellow font-mono">Rs {featured.prizePool.toLocaleString()}</p>
                <p className="text-[10px] text-text-muted uppercase">Prize Pool</p>
              </div>
              <div className="bg-bg-base/60 backdrop-blur border border-border rounded-lg p-3">
                <Users className="w-4 h-4 text-blue mb-1" />
                <p className="text-lg font-bold text-white">{featured.registeredTeams}/{featured.maxTeams}</p>
                <p className="text-[10px] text-text-muted uppercase">Teams</p>
              </div>
              <div className="bg-bg-base/60 backdrop-blur border border-border rounded-lg p-3">
                <MapPin className="w-4 h-4 text-primary mb-1" />
                <p className="text-lg font-bold text-white">{featured.region}</p>
                <p className="text-[10px] text-text-muted uppercase">Region</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={`/tournaments/${featured.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-bg-base font-display font-semibold hover:bg-primary-electric btn-glow transition-all"
              >
                {featured.status === 'OPEN' ? 'Register Now' : 'View Details'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              {featured.status === 'OPEN' && (
                <div className="flex items-center gap-1 text-xs text-text-muted">
                  <Calendar className="w-3 h-3" />
                  Closes {new Date(featured.registrationDeadline).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })}
                </div>
              )}
            </div>
          </div>

          {featured.status !== 'COMPLETED' && featured.status !== 'LIVE' && (
            <div className="flex flex-col items-center md:items-end">
              <p className="text-xs text-text-muted uppercase tracking-widest mb-3">Starts In</p>
              <Countdown targetDate={featured.startDate} />
            </div>
          )}
          {featured.status === 'LIVE' && (
            <div className="flex flex-col items-center md:items-end">
              <div className="flex items-center gap-2 text-red font-display font-bold text-2xl">
                <span className="w-3 h-3 rounded-full bg-red animate-pulse" />
                LIVE NOW
              </div>
              <p className="text-sm text-text-muted mt-2">Watch the action unfold!</p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
