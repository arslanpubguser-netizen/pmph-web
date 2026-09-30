import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy, Users, Calendar, MapPin, ChevronLeft, Clock,
  CheckCircle2, Award, ListChecks, DollarSign,
} from 'lucide-react';
import { mockTournaments, mockTeams } from '@/data/mockData';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Countdown } from '@/components/common/Countdown';
import { Button } from '@/components/common/Button';

export default function TournamentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const tournament = mockTournaments.find(t => t.id === id);
  if (!tournament) {
    return (
      <div className="container-esports py-20 text-center">
        <p className="text-text-muted">Tournament not found.</p>
        <Link to="/tournaments" className="text-primary mt-4 inline-block">Back to Tournaments</Link>
      </div>
    );
  }

  const participatingTeams = mockTeams.filter(t => tournament.participatingTeamIds.includes(t.id));

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-64 overflow-hidden">
        <img src={tournament.bannerUrl} alt={tournament.name} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/70 to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors z-10">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="container-esports -mt-20 relative z-10">
        {/* Header */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <StatusBadge status={tournament.status} />
            <span className="text-xs text-text-muted">by {tournament.organizer}</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">{tournament.name}</h1>
          <p className="text-text-secondary max-w-3xl mb-6">{tournament.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-bg-base/60 border border-border rounded-lg p-4">
              <DollarSign className="w-5 h-5 text-yellow mb-2" />
              <p className="text-xl font-bold text-yellow font-mono">Rs {tournament.prizePool.toLocaleString()}</p>
              <p className="text-xs text-text-muted">Prize Pool</p>
            </div>
            <div className="bg-bg-base/60 border border-border rounded-lg p-4">
              <Users className="w-5 h-5 text-blue mb-2" />
              <p className="text-xl font-bold text-white">{tournament.registeredTeams}/{tournament.maxTeams}</p>
              <p className="text-xs text-text-muted">Teams Registered</p>
            </div>
            <div className="bg-bg-base/60 border border-border rounded-lg p-4">
              <MapPin className="w-5 h-5 text-primary mb-2" />
              <p className="text-xl font-bold text-white">{tournament.region}</p>
              <p className="text-xs text-text-muted">Region</p>
            </div>
            <div className="bg-bg-base/60 border border-border rounded-lg p-4">
              <Calendar className="w-5 h-5 text-orange mb-2" />
              <p className="text-xl font-bold text-white">{new Date(tournament.startDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })}</p>
              <p className="text-xs text-text-muted">Start Date</p>
            </div>
          </div>

          {tournament.status === 'OPEN' && (
            <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div>
                <p className="text-xs text-primary uppercase tracking-widest mb-1">Registration Closes In</p>
                <Countdown targetDate={tournament.registrationDeadline} />
              </div>
              <Button to="/register" icon={Trophy} size="lg">Register Your Team</Button>
            </div>
          )}
          {tournament.status === 'LIVE' && (
            <div className="flex items-center gap-3 p-4 bg-red/10 border border-red/30 rounded-lg">
              <span className="w-3 h-3 rounded-full bg-red animate-pulse" />
              <span className="text-red font-display font-bold text-lg">LIVE NOW</span>
              <span className="text-text-muted text-sm">— Watch the action unfold!</span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Prize Breakdown */}
          <div className="card p-6">
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow" /> Prize Breakdown
            </h3>
            <div className="space-y-2">
              {tournament.prizeBreakdown.map((prize, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-bg-base rounded-lg">
                  <span className="text-sm text-text-secondary flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-yellow/20 text-yellow' : i === 1 ? 'bg-text-muted/20 text-text-secondary' : i === 2 ? 'bg-orange/20 text-orange' : 'bg-bg-hover text-text-muted'}`}>
                      {i + 1}
                    </span>
                    {prize.position}
                  </span>
                  <span className="text-sm font-bold text-yellow font-mono">Rs {prize.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="card p-6">
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-primary" /> Tournament Rules
            </h3>
            <div className="space-y-2">
              {tournament.rules.map((rule, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  {rule}
                </div>
              ))}
            </div>
          </div>

          {/* Participating Teams */}
          <div className="card p-6 md:col-span-2">
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue" /> Participating Teams
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {participatingTeams.map((team, i) => (
                <motion.div key={team.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <Link to={`/teams/${team.id}`} className="card card-hover group flex items-center gap-3 p-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <img src={team.logoUrl} alt={team.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white group-hover:text-primary transition-colors truncate">{team.name}</p>
                      <p className="text-xs text-text-muted">{team.region}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
