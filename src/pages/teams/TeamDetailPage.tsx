import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Trophy, Users, ChevronLeft, ExternalLink, Award,
  Target, Zap, Crosshair, Gamepad2, UserPlus,
} from 'lucide-react';
import { mockTeams, mockPlayers, mockTournaments, mockRecruitmentPosts } from '@/data/mockData';
import { Button } from '@/components/common/Button';

export default function TeamDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'roster' | 'stats' | 'tournaments' | 'recruitment'>('roster');

  const team = mockTeams.find(t => t.id === id);
  if (!team) {
    return (
      <div className="container-esports py-20 text-center">
        <p className="text-text-muted">Team not found.</p>
        <Link to="/teams" className="text-primary mt-4 inline-block">Back to Teams</Link>
      </div>
    );
  }

  const roster = mockPlayers.filter(p => p.teamId === team.id).slice(0, 6);
  const teamTournaments = mockTournaments.filter(t => t.participatingTeamIds.includes(team.id));
  const recruitmentPosts = mockRecruitmentPosts.filter(r => r.teamId === team.id && r.status === 'OPEN');
  const winRate = Math.round((team.wins / team.matches) * 100);

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-64 overflow-hidden">
        <img src={team.bannerUrl} alt={team.name} className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/80 to-transparent" />
        <div className="absolute top-4 left-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </div>

      <div className="container-esports -mt-20 relative z-10">
        {/* Team Header */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-xl bg-bg-card border-2 border-border overflow-hidden flex-shrink-0">
              <img src={team.logoUrl} alt={team.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display font-bold text-3xl text-white">{team.name}</h1>
                {team.isRecruiting && (
                  <span className="text-xs font-bold px-2 py-1 rounded-md bg-primary/20 text-primary border border-primary/30">
                    RECRUITING
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-text-muted mb-3">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{team.region}</span>
                <span className="text-primary">{team.level}</span>
                <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-yellow" />{team.points} pts</span>
              </div>
              <p className="text-text-secondary max-w-2xl">{team.description}</p>
              <div className="flex items-center gap-3 mt-4">
                {team.socialLinks && Object.entries(team.socialLinks).map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-bg-card border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-all text-xs">
                    {key.slice(0, 2).toUpperCase()}
                  </a>
                ))}
                {team.isRecruiting && (
                  <Button to={`/teams/${team.id}`} icon={UserPlus} size="sm">Apply Now</Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-border">
          {(['roster', 'stats', 'tournaments', 'recruitment'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize transition-colors relative ${
                activeTab === tab ? 'text-primary' : 'text-text-muted hover:text-white'
              }`}
            >
              {tab}
              {tab === 'recruitment' && recruitmentPosts.length > 0 && (
                <span className="ml-1 text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">{recruitmentPosts.length}</span>
              )}
              {activeTab === tab && (
                <motion.div layoutId="teamTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'roster' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roster.map((player, i) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/players/${player.id}`} className="card card-hover group block p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg bg-bg-base overflow-hidden">
                      <img src={player.avatarUrl} alt={player.username} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-white group-hover:text-primary transition-colors">{player.username}</h3>
                      <p className="text-xs text-text-muted">{player.primaryRole}</p>
                      <p className="text-xs text-primary mt-0.5">{player.rank}</p>
                    </div>
                    {i === 0 && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-yellow/20 text-yellow">CAPTAIN</span>}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Points', value: team.points, icon: Trophy, color: 'text-yellow' },
              { label: 'Wins', value: team.wins, icon: Award, color: 'text-primary' },
              { label: 'Matches', value: team.matches, icon: Crosshair, color: 'text-blue' },
              { label: 'Win Rate', value: `${winRate}%`, icon: Zap, color: 'text-orange' },
            ].map((stat, i) => (
              <div key={stat.label} className="hud-corners card p-6 text-center">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <p className={`font-display font-bold text-3xl ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-text-muted uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tournaments' && (
          <div className="space-y-3">
            {teamTournaments.map(t => (
              <Link key={t.id} to={`/tournaments/${t.id}`} className="card card-hover group flex items-center gap-4 p-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img src={t.bannerUrl} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-white group-hover:text-primary transition-colors">{t.name}</h3>
                  <p className="text-xs text-text-muted">{t.organizer} • {t.region}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-yellow font-mono">Rs {t.prizePool.toLocaleString()}</p>
                  <p className="text-xs text-text-muted">{t.status}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'recruitment' && (
          <div className="space-y-4">
            {recruitmentPosts.length === 0 ? (
              <div className="text-center py-16">
                <Users className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-muted">No open recruitment posts.</p>
              </div>
            ) : (
              recruitmentPosts.map(post => (
                <div key={post.id} className="card p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">{post.title}</h3>
                      <p className="text-sm text-text-muted mt-1">{post.description}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/30">
                      {post.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
                    <span>Rank: <span className="text-yellow">{post.rankRequired}+</span></span>
                    <span>Region: <span className="text-white">{post.region}</span></span>
                    <span>Level: <span className="text-primary">{post.level}</span></span>
                  </div>
                  <Button to="/register" icon={UserPlus} size="sm">Apply</Button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Achievements */}
        <div className="mt-8 card p-6">
          <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow" /> Achievements
          </h3>
          <div className="space-y-2">
            {team.achievements.map((ach, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                <Trophy className="w-4 h-4 text-yellow/60" />
                {ach}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
