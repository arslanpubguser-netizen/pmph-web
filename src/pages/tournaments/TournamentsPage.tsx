import { useState, useMemo } from 'react';
import { Search, Trophy, X } from 'lucide-react';
import { TournamentCard } from '@/components/tournaments/TournamentCard';
import { mockTournaments } from '@/data/mockData';
import type { TournamentStatus, Region } from '@/types';

const statuses: TournamentStatus[] = ['LIVE', 'OPEN', 'UPCOMING', 'COMPLETED'];
const regions: Region[] = ['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Multan', 'Faisalabad', 'Quetta', 'Rawalpindi'];

export default function TournamentsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [region, setRegion] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 9;

  const filtered = useMemo(() => {
    return mockTournaments.filter(t => {
      if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (status !== 'all' && t.status !== status) return false;
      if (region !== 'all' && t.region !== region) return false;
      return true;
    });
  }, [search, status, region]);

  const pages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen">
      <div className="relative bg-bg-surface border-b border-border py-12">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
        <div className="container-esports relative">
          <h1 className="font-display font-bold text-4xl text-white mb-2">Tournaments</h1>
          <p className="text-text-muted">Compete in PUBG Mobile tournaments across Pakistan</p>
        </div>
      </div>

      <div className="container-esports py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center bg-bg-card border border-border rounded-lg px-4 h-11">
            <Search className="w-4 h-4 text-text-muted" />
            <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search tournaments..." className="flex-1 bg-transparent text-sm text-white placeholder-text-muted outline-none ml-3" />
          </div>
          <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} className="bg-bg-card border border-border rounded-lg px-4 h-11 text-sm text-white outline-none cursor-pointer">
            <option value="all">All Statuses</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={region} onChange={e => { setRegion(e.target.value); setPage(1); }} className="bg-bg-card border border-border rounded-lg px-4 h-11 text-sm text-white outline-none cursor-pointer">
            <option value="all">All Regions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-2 mb-6">
          {statuses.map(s => {
            const count = mockTournaments.filter(t => t.status === s).length;
            return (
              <button key={s} onClick={() => { setStatus(status === s ? 'all' : s); setPage(1); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${status === s ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-bg-card border border-border text-text-muted hover:text-white'}`}>
                {s} ({count})
              </button>
            );
          })}
        </div>

        {paged.length === 0 ? (
          <div className="text-center py-20">
            <Trophy className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-white mb-2">No Tournaments Found</h3>
            <p className="text-text-muted mb-4">No tournaments match your filters.</p>
            <button onClick={() => { setSearch(''); setStatus('all'); setRegion('all'); }} className="text-primary text-sm hover:text-primary-electric">Clear Filters</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paged.map((t, i) => <TournamentCard key={t.id} tournament={t} index={i} />)}
          </div>
        )}

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
