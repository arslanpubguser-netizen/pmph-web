import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Users, BarChart3, Newspaper, ShoppingBag, Crosshair } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { TeamCard } from '@/components/teams/TeamCard';
import { PlayerCard } from '@/components/players/PlayerCard';
import { TournamentCard } from '@/components/tournaments/TournamentCard';
import { NewsCard } from '@/components/news/NewsCard';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { mockDashboardStats } from '@/data/mockData';
import {
  mockTeams, mockPlayers, mockTournaments, mockNews, mockProducts,
  mockRecruitmentPosts, mockTeamRankings, mockPlayerRankings,
} from '@/data/mockData';

export function HomePage() {
  const topTeams = mockTeams.slice(0, 6);
  const featuredPlayers = mockPlayers.slice(0, 8);
  const featuredTournaments = mockTournaments.filter(t => t.status !== 'COMPLETED').slice(0, 3);
  const latestNews = mockNews.slice(0, 4);
  const featuredProducts = mockProducts.filter(p => p.isFeatured).slice(0, 4);
  const recentRecruitment = mockRecruitmentPosts.filter(r => r.status === 'OPEN').slice(0, 4);
  const topRankings = mockTeamRankings.slice(0, 5);
  const topPlayerRankings = mockPlayerRankings.slice(0, 5);

  return (
    <>
      <HeroSection />
      <FeaturedTournamentSection />

      {/* Featured Tournaments */}
      <section className="container-esports py-16">
        <SectionHeader
          title="Featured Tournaments"
          subtitle="Compete in the biggest PUBG Mobile events"
          link={{ label: 'View All', to: '/tournaments' }}
          icon={<Trophy className="w-6 h-6" />}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTournaments.map((t, i) => (
            <TournamentCard key={t.id} tournament={t} index={i} />
          ))}
        </div>
      </section>

      {/* Latest Recruitment */}
      <section className="container-esports py-16">
        <SectionHeader
          title="Latest Recruitment"
          subtitle="Teams looking for players right now"
          link={{ label: 'View All', to: '/teams' }}
          icon={<Users className="w-6 h-6" />}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentRecruitment.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/teams/${post.teamId}`}
                className="card card-hover group block p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/30">
                    {post.role}
                  </span>
                  <span className="text-xs text-text-muted">{post.team?.name}</span>
                </div>
                <h3 className="font-display font-semibold text-white group-hover:text-primary transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-xs text-text-muted line-clamp-2 mb-3">{post.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-yellow">{post.rankRequired}+</span>
                  <span className="text-text-muted">{post.region}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top Teams */}
      <section className="container-esports py-16">
        <SectionHeader
          title="Top Teams"
          subtitle="Pakistan's most competitive rosters"
          link={{ label: 'View All', to: '/teams' }}
          icon={<Crosshair className="w-6 h-6" />}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topTeams.map((team, i) => (
            <TeamCard key={team.id} team={team} index={i} />
          ))}
        </div>
      </section>

      {/* Featured Players */}
      <section className="container-esports py-16">
        <SectionHeader
          title="Featured Players"
          subtitle="Discover top talent in the scene"
          link={{ label: 'View All', to: '/players' }}
          icon={<Users className="w-6 h-6" />}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredPlayers.map((player, i) => (
            <PlayerCard key={player.id} player={player} index={i} />
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="container-esports py-16">
        <SectionHeader
          title="Latest News"
          subtitle="Stay updated with the esports scene"
          link={{ label: 'View All', to: '/news' }}
          icon={<Newspaper className="w-6 h-6" />}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestNews.map((article, i) => (
            <NewsCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </section>

      {/* Rankings Preview */}
      <section className="container-esports py-16">
        <SectionHeader
          title="Rankings Preview"
          subtitle="Top teams and players in Pakistan"
          link={{ label: 'Full Rankings', to: '/rankings' }}
          icon={<BarChart3 className="w-6 h-6" />}
        />
        <div className="grid md:grid-cols-2 gap-6">
          {/* Team Rankings */}
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-display font-bold text-white">Team Rankings</h3>
            </div>
            <div className="p-2">
              {topRankings.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-hover transition-colors"
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm ${
                    i === 0 ? 'bg-yellow/20 text-yellow' : i === 1 ? 'bg-text-muted/20 text-text-secondary' : i === 2 ? 'bg-orange/20 text-orange' : 'bg-bg-base text-text-muted'
                  }`}>
                    {i + 1}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-bg-base overflow-hidden">
                    <img src={r.team?.logoUrl} alt={r.team?.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{r.team?.name}</p>
                    <p className="text-xs text-text-muted">{r.team?.region}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{r.points}</p>
                    <p className="text-[10px] text-text-muted">points</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Player Rankings */}
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-display font-bold text-white">Player Rankings</h3>
            </div>
            <div className="p-2">
              {topPlayerRankings.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-hover transition-colors"
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm ${
                    i === 0 ? 'bg-yellow/20 text-yellow' : i === 1 ? 'bg-text-muted/20 text-text-secondary' : i === 2 ? 'bg-orange/20 text-orange' : 'bg-bg-base text-text-muted'
                  }`}>
                    {i + 1}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-bg-base overflow-hidden">
                    <img src={r.player?.avatarUrl} alt={r.player?.username} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{r.player?.username}</p>
                    <p className="text-xs text-text-muted">{r.teamName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{r.kills}</p>
                    <p className="text-[10px] text-text-muted">kills</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="container-esports py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Players', value: mockDashboardStats.totalPlayers, color: 'text-primary', icon: Users },
            { label: 'Registered Teams', value: mockDashboardStats.totalTeams, color: 'text-blue', icon: Crosshair },
            { label: 'Tournaments Hosted', value: mockDashboardStats.totalTournaments, color: 'text-yellow', icon: Trophy },
            { label: 'Matches Played', value: mockDashboardStats.totalMatches, color: 'text-red', icon: BarChart3 },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="hud-corners card p-6 text-center"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <p className={`font-display font-bold text-3xl ${stat.color}`}>
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="text-xs text-text-muted uppercase tracking-wider mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Marketplace Preview */}
      <section className="container-esports py-16">
        <SectionHeader
          title="Marketplace Preview"
          subtitle="Premium gaming accessories for competitive play"
          link={{ label: 'Shop All', to: '/marketplace' }}
          icon={<ShoppingBag className="w-6 h-6" />}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Community CTA */}
      <section className="container-esports py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-border bg-bg-card p-10 md:p-16 text-center"
        >
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="relative z-10">
            <Crosshair className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
              Ready to enter the <span className="text-gradient">battlefield</span>?
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto mb-8">
              Join thousands of Pakistani PUBG Mobile players. Create your esports profile, find your team, and start competing today.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-bg-base font-display font-semibold hover:bg-primary-electric btn-glow transition-all text-lg"
            >
              Create Your Esports Profile
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}

import { Hero } from './Hero';
import { FeaturedTournament } from './FeaturedTournament';

function HeroSection() { return <Hero />; }
function FeaturedTournamentSection() { return <FeaturedTournament />; }

export default HomePage;
