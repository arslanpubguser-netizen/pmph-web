import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Users, Trophy, Newspaper, ShoppingBag, Gamepad2 } from 'lucide-react';
import { mockTeams, mockPlayers, mockTournaments, mockNews, mockProducts } from '@/data/mockData';

export default function SearchPage() {
  const [params] = useSearchParams();
  const initialQuery = params.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return { teams: [], players: [], tournaments: [], news: [], products: [] };
    const q = query.toLowerCase();
    return {
      teams: mockTeams.filter(t => t.name.toLowerCase().includes(q)).slice(0, 5),
      players: mockPlayers.filter(p => p.username.toLowerCase().includes(q)).slice(0, 5),
      tournaments: mockTournaments.filter(t => t.name.toLowerCase().includes(q)).slice(0, 5),
      news: mockNews.filter(n => n.title.toLowerCase().includes(q)).slice(0, 5),
      products: mockProducts.filter(p => p.name.toLowerCase().includes(q)).slice(0, 5),
    };
  }, [query]);

  const sections = [
    { label: 'Teams', icon: Users, items: results.teams, getLink: (id: string) => `/teams/${id}`, getName: (item: any) => item.name, getSub: (item: any) => item.region },
    { label: 'Players', icon: Gamepad2, items: results.players, getLink: (id: string) => `/players/${id}`, getName: (item: any) => item.username, getSub: (item: any) => item.rank },
    { label: 'Tournaments', icon: Trophy, items: results.tournaments, getLink: (id: string) => `/tournaments/${id}`, getName: (item: any) => item.name, getSub: (item: any) => item.organizer },
    { label: 'News', icon: Newspaper, items: results.news, getLink: (id: string) => `/news/${(results.news.find(n => n.id === id) as any)?.slug || ''}`, getName: (item: any) => item.title, getSub: (item: any) => item.category },
    { label: 'Products', icon: ShoppingBag, items: results.products, getLink: (id: string) => `/marketplace/${(results.products.find(p => p.id === id) as any)?.slug || ''}`, getName: (item: any) => item.name, getSub: (item: any) => `Rs ${item.price.toLocaleString()}` },
  ];

  const totalResults = sections.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <div className="min-h-screen">
      <div className="relative bg-bg-surface border-b border-border py-12">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
        <div className="container-esports relative">
          <h1 className="font-display font-bold text-4xl text-white mb-2">Search</h1>
          <p className="text-text-muted">Find teams, players, tournaments, news, and products</p>
        </div>
      </div>

      <div className="container-esports py-8">
        <div className="flex items-center bg-bg-card border border-border rounded-lg px-4 h-12 mb-8 max-w-2xl">
          <Search className="w-5 h-5 text-text-muted" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." className="flex-1 bg-transparent text-base text-white placeholder-text-muted outline-none ml-3" autoFocus />
        </div>

        {query.trim() === '' ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">Start typing to search across the platform</p>
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-white mb-2">No Results Found</h3>
            <p className="text-text-muted">No results for "{query}"</p>
          </div>
        ) : (
          <div className="space-y-8">
            {sections.filter(s => s.items.length > 0).map(section => (
              <div key={section.label}>
                <h2 className="font-display font-bold text-lg text-white mb-3 flex items-center gap-2">
                  <section.icon className="w-5 h-5 text-primary" />
                  {section.label} <span className="text-sm text-text-muted">({section.items.length})</span>
                </h2>
                <div className="space-y-2">
                  {section.items.map((item: any) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <Link to={section.getLink(item.id)} className="card card-hover group flex items-center gap-3 p-3">
                        <div className="w-10 h-10 rounded-lg bg-bg-base overflow-hidden flex-shrink-0">
                          {item.logoUrl && <img src={item.logoUrl} alt="" className="w-full h-full object-cover" />}
                          {item.avatarUrl && <img src={item.avatarUrl} alt="" className="w-full h-full object-cover" />}
                          {item.bannerUrl && <img src={item.bannerUrl} alt="" className="w-full h-full object-cover" />}
                          {item.thumbnailUrl && <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" />}
                          {item.imageUrl && <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white group-hover:text-primary transition-colors truncate">{section.getName(item)}</p>
                          <p className="text-xs text-text-muted truncate">{section.getSub(item)}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
