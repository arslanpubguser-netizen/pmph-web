import { useState, useMemo } from 'react';
import { Search, Gamepad2, X } from 'lucide-react';
import { PlayerCard } from '@/components/players/PlayerCard';
import { mockPlayers } from '@/data/mockData';
import type { Region, PlayerRole, PubgRank } from '@/types';

const regions: Region[] = ['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Multan', 'Faisalabad', 'Quetta', 'Rawalpindi'];
const roles: PlayerRole[] = ['IGL', 'Entry Fragger', 'Support', 'Sniper', 'Assaulter', 'Flex'];
const ranks: PubgRank[] = ['Conqueror', 'Ace Dominator', 'Ace', 'Crown', 'Diamond', 'Platinum', 'Gold'];

export default function PlayersPage() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('all');
  const [role, setRole] = useState('all');
  const [rank, setRank] = useState('all');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12;

  const filtered = useMemo(() => {
    return mockPlayers.filter(p => {
      if (search && !p.username.toLowerCase().includes(search.toLowerCase())) return false;
      if (region !== 'all' && p.region !== region) return false;
      if (role !== 'all' && p.primaryRole !== role) return false;
      if (rank !== 'all' && p.rank !== rank) return false;
      if (availableOnly && !p.isAvailable) return false;
      return true;
    });
  }, [search, region, role, rank, availableOnly]);

  const pages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen">
      <div className="relative bg-bg-surface border-b border-border py-12">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
        <div className="container-esports relative">
          <h1 className="font-display font-bold text-4xl text-white mb-2">Players</h1>
          <p className="text-text-muted">Discover top PUBG Mobile talent across Pakistan</p>
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
              placeholder="Search players..."
              className="flex-1 bg-transparent text-sm text-white placeholder-text-muted outline-none ml-3"
            />
          </div>
          <select value={region} onChange={e => { setRegion(e.target.value); setPage(1); }} className="bg-bg-card border border-border rounded-lg px-4 h-11 text-sm text-white outline-none cursor-pointer">
            <option value="all">All Regions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={role} onChange={e => { setRole(e.target.value); setPage(1); }} className="bg-bg-card border border-border rounded-lg px-4 h-11 text-sm text-white outline-none cursor-pointer">
            <option value="all">All Roles</option>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={rank} onChange={e => { setRank(e.target.value); setPage(1); }} className="bg-bg-card border border-border rounded-lg px-4 h-11 text-sm text-white outline-none cursor-pointer">
            <option value="all">All Ranks</option>
            {ranks.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button onClick={() => { setAvailableOnly(!availableOnly); setPage(1); }} className={`px-4 h-11 rounded-lg border text-sm font-medium transition-all ${availableOnly ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-bg-card border-border text-text-secondary hover:text-white'}`}>
            Available Only
          </button>
        </div>

        {paged.length === 0 ? (
          <div className="text-center py-20">
            <Gamepad2 className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-white mb-2">No Players Found</h3>
            <p className="text-text-muted mb-4">No players match your filters. Try adjusting your search.</p>
            <button onClick={() => { setSearch(''); setRegion('all'); setRole('all'); setRank('all'); setAvailableOnly(false); }} className="text-primary text-sm hover:text-primary-electric">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paged.map((player, i) => <PlayerCard key={player.id} player={player} index={i} />)}
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
