import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, Minus, ArrowUp, ArrowDown, BarChart3 } from 'lucide-react';
import { mockTeamRankings, mockPlayerRankings } from '@/data/mockData';

export default function RankingsPage() {
  const [tab, setTab] = useState<'teams' | 'players'>('teams');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 15;

  const data: any[] = tab === 'teams' ? mockTeamRankings : mockPlayerRankings;
  const filtered = data.filter((item: any) => {
    const name = tab === 'teams' ? item.team?.name : item.player?.username;
    return name && name.toLowerCase().includes(search.toLowerCase());
  });

  const pages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen">
      <div className="relative bg-bg-surface border-b border-border py-12">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
        <div className="container-esports relative">
          <h1 className="font-display font-bold text-4xl text-white mb-2">Rankings</h1>
          <p className="text-text-muted">Pakistan's competitive PUBG Mobile leaderboard</p>
        </div>
      </div>

      <div className="container-esports py-8">
        <div className="flex items-center gap-1 mb-6 border-b border-border">
          {(['teams', 'players'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setPage(1); }} className={`px-4 py-3 text-sm font-medium capitalize transition-colors relative ${tab === t ? 'text-primary' : 'text-text-muted hover:text-white'}`}>
              {t === 'teams' ? 'Team Rankings' : 'Player Rankings'}
              {tab === t && <motion.div layoutId="rankTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-bg-card border border-border rounded-lg px-4 h-11 mb-6 max-w-md">
          <Search className="w-4 h-4 text-text-muted" />
          <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder={`Search ${tab}...`} className="flex-1 bg-transparent text-sm text-white placeholder-text-muted outline-none ml-3" />
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Rank</th>
                  <th className="text-left p-4 text-xs font-bold text-text-muted uppercase tracking-wider">{tab === 'teams' ? 'Team' : 'Player'}</th>
                  {tab === 'teams' ? (
                    <>
                      <th className="text-left p-4 text-xs font-bold text-text-muted uppercase tracking-wider hidden md:table-cell">Region</th>
                      <th className="text-right p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Points</th>
                      <th className="text-right p-4 text-xs font-bold text-text-muted uppercase tracking-wider hidden sm:table-cell">Wins</th>
                      <th className="text-right p-4 text-xs font-bold text-text-muted uppercase tracking-wider hidden sm:table-cell">Matches</th>
                      <th className="text-right p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Win Rate</th>
                    </>
                  ) : (
                    <>
                      <th className="text-left p-4 text-xs font-bold text-text-muted uppercase tracking-wider hidden md:table-cell">Team</th>
                      <th className="text-right p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Kills</th>
                      <th className="text-right p-4 text-xs font-bold text-text-muted uppercase tracking-wider hidden sm:table-cell">Matches</th>
                      <th className="text-right p-4 text-xs font-bold text-text-muted uppercase tracking-wider">K/D</th>
                      <th className="text-right p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Points</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {paged.map((item: any, i) => {
                  const rank = (page - 1) * perPage + i + 1;
                  const name = tab === 'teams' ? item.team?.name : item.player?.username;
                  const avatar = tab === 'teams' ? item.team?.logoUrl : item.player?.avatarUrl;
                  const subInfo = tab === 'teams' ? item.team?.region : item.teamName;
                  return (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-border-subtle hover:bg-bg-hover transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm ${rank === 1 ? 'bg-yellow/20 text-yellow' : rank === 2 ? 'bg-text-muted/20 text-text-secondary' : rank === 3 ? 'bg-orange/20 text-orange' : 'bg-bg-base text-text-muted'}`}>
                            {rank}
                          </span>
                          {item.isNew ? (
                            <span className="text-[10px] font-bold text-primary">NEW</span>
                          ) : item.rankChange > 0 ? (
                            <span className="text-[10px] text-primary flex items-center"><ArrowUp className="w-3 h-3" />{item.rankChange}</span>
                          ) : item.rankChange < 0 ? (
                            <span className="text-[10px] text-red flex items-center"><ArrowDown className="w-3 h-3" />{Math.abs(item.rankChange)}</span>
                          ) : (
                            <Minus className="w-3 h-3 text-text-muted" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg overflow-hidden bg-bg-base">
                            <img src={avatar} alt={name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-sm font-medium text-white">{name}</span>
                        </div>
                      </td>
                      {tab === 'teams' ? (
                        <>
                          <td className="p-4 text-sm text-text-muted hidden md:table-cell">{subInfo}</td>
                          <td className="p-4 text-right text-sm font-bold text-primary">{item.points}</td>
                          <td className="p-4 text-right text-sm text-text-secondary hidden sm:table-cell">{item.wins}</td>
                          <td className="p-4 text-right text-sm text-text-secondary hidden sm:table-cell">{item.matches}</td>
                          <td className="p-4 text-right text-sm font-bold text-yellow">{item.winRate}%</td>
                        </>
                      ) : (
                        <>
                          <td className="p-4 text-sm text-text-muted hidden md:table-cell">{subInfo}</td>
                          <td className="p-4 text-right text-sm font-bold text-red">{item.kills}</td>
                          <td className="p-4 text-right text-sm text-text-secondary hidden sm:table-cell">{item.matches}</td>
                          <td className="p-4 text-right text-sm font-bold text-primary">{item.kd}</td>
                          <td className="p-4 text-right text-sm font-bold text-primary">{item.points}</td>
                        </>
                      )}
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 rounded-lg bg-bg-card border border-border text-sm text-white disabled:opacity-50 hover:border-primary/30 transition-colors">Previous</button>
            {[...Array(pages)].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${page === i + 1 ? 'bg-primary text-bg-base' : 'bg-bg-card border border-border text-text-secondary hover:text-white'}`}>{i + 1}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages} className="px-4 py-2 rounded-lg bg-bg-card border border-border text-sm text-white disabled:opacity-50 hover:border-primary/30 transition-colors">Next</button>
          </div>
        )}
      </div>
    </div>
  );
}
