import { useState, useMemo } from 'react';
import { Search, Newspaper } from 'lucide-react';
import { NewsCard } from '@/components/news/NewsCard';
import { mockNews } from '@/data/mockData';

const categories = ['All', 'PUBG Updates', 'Esports News', 'Tournament Results', 'Team News', 'Player News', 'Community'];

export default function NewsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const perPage = 9;

  const filtered = useMemo(() => {
    return mockNews.filter(article => {
      if (search && !article.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== 'All' && article.category !== category) return false;
      return true;
    });
  }, [search, category]);

  const pages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen">
      <div className="relative bg-bg-surface border-b border-border py-12">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
        <div className="container-esports relative">
          <h1 className="font-display font-bold text-4xl text-white mb-2">News</h1>
          <p className="text-text-muted">Latest PUBG Mobile esports news and updates</p>
        </div>
      </div>

      <div className="container-esports py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center bg-bg-card border border-border rounded-lg px-4 h-11">
            <Search className="w-4 h-4 text-text-muted" />
            <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search news..." className="flex-1 bg-transparent text-sm text-white placeholder-text-muted outline-none ml-3" />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setCategory(cat); setPage(1); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${category === cat ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-bg-card border border-border text-text-muted hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>

        {paged.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-white mb-2">No Articles Found</h3>
            <p className="text-text-muted mb-4">No articles match your search.</p>
            <button onClick={() => { setSearch(''); setCategory('All'); }} className="text-primary text-sm hover:text-primary-electric">Clear Filters</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paged.map((article, i) => <NewsCard key={article.id} article={article} index={i} />)}
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
