import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Users, MapPin, Trophy, X } from 'lucide-react';
import { TeamCard } from '@/components/teams/TeamCard';
import { mockTeams } from '@/data/mockData';
import type { Region, CompetitiveLevel } from '@/types';

const regions: Region[] = ['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Multan', 'Faisalabad', 'Quetta', 'Rawalpindi'];
const levels: CompetitiveLevel[] = ['Amateur', 'Semi-Pro', 'Professional', 'Elite'];

export default function TeamsPage() {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [recruitingOnly, setRecruitingOnly] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 9;

  const filtered = useMemo(() => {
    return mockTeams.filter(team => {
      if (search && !team.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (regionFilter !== 'all' && team.region !== regionFilter) return false;
      if (levelFilter !== 'all' && team.level !== levelFilter) return false;
      if (recruitingOnly && !team.isRecruiting) return false;
      return true;
    });
  }, [search, regionFilter, levelFilter, recruitingOnly]);

  const pages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen">
      <div className="relative bg-bg-surface border-b border-border py-12">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
        <div className="container-esports relative">
          <h1 className="font-display font-bold text-4xl text-white mb-2">Teams</h1>
          <p className="text-text-muted">Discover competitive PUBG Mobile teams across Pakistan</p>
        </div>
      </div>

      <div className="container-esports py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center bg-bg-card border border-border rounded-lg px-4 h-11">
            <Search className="w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search teams..."
              className="flex-1 bg-transparent text-sm text-white placeholder-text-muted outline-none ml-3"
            />
          </div>
          <select
            value={regionFilter}
            onChange={e => { setRegionFilter(e.target.value); setPage(1); }}
            className="bg-bg-card border border-border rounded-lg px-4 h-11 text-sm text-white outline-none cursor-pointer"
          >
            <option value="all">All Regions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select
            value={levelFilter}
            onChange={e => { setLevelFilter(e.target.value); setPage(1); }}
            className="bg-bg-card border border-border rounded-lg px-4 h-11 text-sm text-white outline-none cursor-pointer"
          >
            <option value="all">All Levels</option>
            {levels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <button
            onClick={() => { setRecruitingOnly(!recruitingOnly); setPage(1); }}
            className={`px-4 h-11 rounded-lg border text-sm font-medium transition-all ${
              recruitingOnly ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-bg-card border-border text-text-secondary hover:text-white'
            }`}
          >
            Recruiting Only
          </button>
        </div>

        {paged.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-white mb-2">No Teams Found</h3>
            <p className="text-text-muted mb-4">Looks like your squad is still waiting in the lobby.</p>
            <button onClick={() => { setSearch(''); setRegionFilter('all'); setLevelFilter('all'); setRecruitingOnly(false); }} className="text-primary text-sm hover:text-primary-electric">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paged.map((team, i) => <TeamCard key={team.id} team={team} index={i} />)}
          </div>
        )}

        {pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 rounded-lg bg-bg-card border border-border text-sm text-white disabled:opacity-50 hover:border-primary/30 transition-colors">
              Previous
            </button>
            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                  page === i + 1 ? 'bg-primary text-bg-base' : 'bg-bg-card border border-border text-text-secondary hover:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages} className="px-4 py-2 rounded-lg bg-bg-card border border-border text-sm text-white disabled:opacity-50 hover:border-primary/30 transition-colors">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
