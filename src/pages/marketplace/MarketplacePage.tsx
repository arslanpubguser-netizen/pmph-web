import { useState, useMemo } from 'react';
import { Search, ShoppingBag, Star } from 'lucide-react';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { mockProducts } from '@/data/mockData';

const categories = ['All', 'Gaming Triggers', 'Cooling Fans', 'Earbuds', 'Controllers', 'Gaming Phones', 'Gaming Accessories'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Newest');
  const [page, setPage] = useState(1);
  const perPage = 12;

  const filtered = useMemo(() => {
    let result = mockProducts.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== 'All' && p.category !== category) return false;
      return true;
    });
    if (sort === 'Price: Low to High') result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === 'Price: High to Low') result = [...result].sort((a, b) => b.price - a.price);
    else if (sort === 'Top Rated') result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [search, category, sort]);

  const pages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen">
      <div className="relative bg-bg-surface border-b border-border py-12">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
        <div className="container-esports relative">
          <h1 className="font-display font-bold text-4xl text-white mb-2">Marketplace</h1>
          <p className="text-text-muted">Premium gaming accessories for competitive play</p>
        </div>
      </div>

      <div className="container-esports py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center bg-bg-card border border-border rounded-lg px-4 h-11">
            <Search className="w-4 h-4 text-text-muted" />
            <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search products..." className="flex-1 bg-transparent text-sm text-white placeholder-text-muted outline-none ml-3" />
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} className="bg-bg-card border border-border rounded-lg px-4 h-11 text-sm text-white outline-none cursor-pointer">
            {sortOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
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
            <ShoppingBag className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-white mb-2">No Products Found</h3>
            <p className="text-text-muted mb-4">No products match your search.</p>
            <button onClick={() => { setSearch(''); setCategory('All'); }} className="text-primary text-sm hover:text-primary-electric">Clear Filters</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paged.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
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
