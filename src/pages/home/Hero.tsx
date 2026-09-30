import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Gamepad2, Trophy, ArrowRight, Zap, Crosshair, ChevronRight } from 'lucide-react';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { mockDashboardStats } from '@/data/mockData';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
      <div className="absolute inset-0 bg-radial-fade opacity-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-scanline opacity-30 pointer-events-none" />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/40"
          style={{
            top: `${15 + i * 12}%`,
            left: `${5 + i * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="container-esports relative z-10 py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">Pakistan's #1 PUBG Mobile Esports Platform</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white leading-tight"
          >
            Pakistan's Home for
            <br />
            <span className="text-gradient">PUBG Mobile</span> Esports
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary mt-6 max-w-2xl"
          >
            Find Teams. Recruit Players. Join Tournaments. Stay Ahead of the Game.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 mt-8"
          >
            <Link
              to="/teams"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-bg-base font-display font-semibold hover:bg-primary-electric btn-glow transition-all"
            >
              <Users className="w-5 h-5" />
              Find a Team
            </Link>
            <Link
              to="/players"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue text-white font-display font-semibold hover:bg-blue-electric transition-all"
            >
              <Gamepad2 className="w-5 h-5" />
              Recruit Players
            </Link>
            <Link
              to="/tournaments"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-bg-card/80 backdrop-blur text-white font-display font-semibold hover:border-primary/40 transition-all"
            >
              <Trophy className="w-5 h-5" />
              Explore Tournaments
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-2xl"
          >
            {[
              { label: 'Players', value: mockDashboardStats.totalPlayers, icon: Gamepad2, color: 'text-primary' },
              { label: 'Teams', value: mockDashboardStats.totalTeams, icon: Users, color: 'text-blue' },
              { label: 'Tournaments', value: mockDashboardStats.totalTournaments, icon: Trophy, color: 'text-yellow' },
              { label: 'Matches', value: mockDashboardStats.totalMatches, icon: Crosshair, color: 'text-red' },
            ].map((stat, i) => (
              <div key={stat.label} className="hud-corners bg-bg-card/60 backdrop-blur border border-border rounded-lg p-4">
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <p className="font-display font-bold text-2xl text-white">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-xs text-text-muted uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-base to-transparent" />
    </section>
  );
}
