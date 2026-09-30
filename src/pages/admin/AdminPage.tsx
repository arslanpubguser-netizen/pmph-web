import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, Trophy, Newspaper, ShoppingBag,
  FileText, BarChart3, Settings, Search, Trash2, Edit, Plus, X,
} from 'lucide-react';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { mockAdminStats, mockTeams, mockPlayers, mockTournaments, mockNews, mockProducts } from '@/data/mockData';

const adminSections = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'teams', label: 'Teams', icon: Users },
  { id: 'players', label: 'Players', icon: Users },
  { id: 'tournaments', label: 'Tournaments', icon: Trophy },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'products', label: 'Products', icon: ShoppingBag },
  { id: 'recruitment', label: 'Recruitment', icon: FileText },
];

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [search, setSearch] = useState('');
  const [deleteModal, setDeleteModal] = useState<string | null>(null);

  const stats = [
    { label: 'Total Users', value: mockAdminStats.totalUsers, icon: Users, color: 'text-primary' },
    { label: 'Total Teams', value: mockAdminStats.totalTeams, icon: Users, color: 'text-blue' },
    { label: 'Total Players', value: mockAdminStats.totalPlayers, icon: Users, color: 'text-yellow' },
    { label: 'Tournaments', value: mockAdminStats.totalTournaments, icon: Trophy, color: 'text-orange' },
    { label: 'News Articles', value: mockAdminStats.totalNewsArticles, icon: Newspaper, color: 'text-purple' },
    { label: 'Products', value: mockAdminStats.totalProducts, icon: ShoppingBag, color: 'text-cyan' },
    { label: 'Active Recruitments', value: mockAdminStats.activeRecruitmentPosts, icon: FileText, color: 'text-red' },
    { label: 'Revenue', value: mockAdminStats.totalRevenue, icon: BarChart3, color: 'text-primary', prefix: 'Rs ' },
  ];

  const getTableData = () => {
    switch (activeSection) {
      case 'teams': return mockTeams.map(t => ({ id: t.id, name: t.name, sub: t.region, status: t.level, extra: `${t.points} pts` }));
      case 'players': return mockPlayers.slice(0, 20).map(p => ({ id: p.id, name: p.username, sub: p.region, status: p.rank, extra: `${p.kd} K/D` }));
      case 'tournaments': return mockTournaments.map(t => ({ id: t.id, name: t.name, sub: t.organizer, status: t.status, extra: `Rs ${t.prizePool.toLocaleString()}` }));
      case 'news': return mockNews.map(n => ({ id: n.id, name: n.title, sub: n.author, status: n.category, extra: n.publishedAt.slice(0, 10) }));
      case 'products': return mockProducts.map(p => ({ id: p.id, name: p.name, sub: p.brand, status: p.inStock ? 'In Stock' : 'Out', extra: `Rs ${p.price.toLocaleString()}` }));
      default: return [];
    }
  };

  const tableData = getTableData().filter(item => !search || item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen">
      <div className="relative bg-bg-surface border-b border-border py-8">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
        <div className="container-esports relative">
          <h1 className="font-display font-bold text-3xl text-white">Admin Panel</h1>
          <p className="text-sm text-text-muted mt-1">Manage the entire platform</p>
        </div>
      </div>

      <div className="container-esports py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-56 flex-shrink-0">
            <div className="card p-2 sticky top-20">
              {adminSections.map(section => (
                <button key={section.id} onClick={() => { setActiveSection(section.id); setSearch(''); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeSection === section.id ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:text-white hover:bg-bg-hover'}`}>
                  <section.icon className="w-4 h-4" />
                  {section.label}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {activeSection === 'overview' ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {stats.map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="hud-corners card p-4">
                      <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                      <p className={`font-display font-bold text-2xl ${stat.color}`}>
                        <AnimatedCounter value={stat.value} prefix={stat.prefix || ''} />
                      </p>
                      <p className="text-xs text-text-muted">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="card p-6">
                  <h3 className="font-display font-bold text-white mb-4">Platform Growth</h3>
                  <div className="space-y-3">
                    {['Users', 'Teams', 'Tournaments', 'Products'].map((label, i) => {
                      const values = [85, 72, 65, 90];
                      return (
                        <div key={label}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-text-secondary">{label}</span>
                            <span className="text-primary">{values[i]}%</span>
                          </div>
                          <div className="h-2 bg-bg-base rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${values[i]}%` }} transition={{ duration: 1, delay: i * 0.1 }} className="h-full bg-gradient-to-r from-primary to-primary-electric rounded-full" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 flex items-center bg-bg-card border border-border rounded-lg px-4 h-11">
                    <Search className="w-4 h-4 text-text-muted" />
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="flex-1 bg-transparent text-sm text-white placeholder-text-muted outline-none ml-3" />
                  </div>
                  <button className="px-4 h-11 rounded-lg bg-primary text-bg-base font-display font-semibold text-sm hover:bg-primary-electric btn-glow transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add New
                  </button>
                </div>

                <div className="card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-4 text-xs font-bold text-text-muted uppercase">Name</th>
                          <th className="text-left p-4 text-xs font-bold text-text-muted uppercase hidden sm:table-cell">Detail</th>
                          <th className="text-left p-4 text-xs font-bold text-text-muted uppercase">Status</th>
                          <th className="text-right p-4 text-xs font-bold text-text-muted uppercase hidden md:table-cell">Extra</th>
                          <th className="text-right p-4 text-xs font-bold text-text-muted uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.slice(0, 15).map(item => (
                          <tr key={item.id} className="border-b border-border-subtle hover:bg-bg-hover transition-colors">
                            <td className="p-4 text-sm font-medium text-white">{item.name}</td>
                            <td className="p-4 text-sm text-text-muted hidden sm:table-cell">{item.sub}</td>
                            <td className="p-4"><span className="text-xs font-bold px-2 py-1 rounded-md bg-primary/10 text-primary">{item.status}</span></td>
                            <td className="p-4 text-right text-sm text-text-secondary hidden md:table-cell">{item.extra}</td>
                            <td className="p-4">
                              <div className="flex items-center justify-end gap-2">
                                <button className="w-8 h-8 rounded-lg bg-bg-base border border-border text-text-muted hover:text-primary hover:border-primary/30 transition-all flex items-center justify-center">
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => setDeleteModal(item.id)} className="w-8 h-8 rounded-lg bg-bg-base border border-border text-text-muted hover:text-red hover:border-red/30 transition-all flex items-center justify-center">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setDeleteModal(null)}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card p-6 max-w-sm mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red" />
              </div>
              <h3 className="font-display font-bold text-white">Confirm Delete</h3>
            </div>
            <p className="text-sm text-text-muted mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 px-4 py-2.5 rounded-lg bg-bg-base border border-border text-white text-sm hover:bg-bg-hover transition-colors">Cancel</button>
              <button onClick={() => setDeleteModal(null)} className="flex-1 px-4 py-2.5 rounded-lg bg-red text-white text-sm font-semibold hover:bg-red/90 transition-colors">Delete</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
