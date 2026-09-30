import { DashboardLayout } from './DashboardPage';
import { Link } from 'react-router-dom';
import { mockTournaments } from '@/data/mockData';
import { StatusBadge } from '@/components/common/StatusBadge';

export default function DashboardTournamentsPage() {
  const tournaments = mockTournaments.slice(0, 5);
  return (
    <DashboardLayout title="My Tournaments">
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-display font-bold text-white">Registered Tournaments</h3>
        </div>
        <div className="divide-y divide-border-subtle">
          {tournaments.map(t => (
            <Link key={t.id} to={`/tournaments/${t.id}`} className="flex items-center gap-4 p-4 hover:bg-bg-hover transition-colors">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img src={t.bannerUrl} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{t.name}</p>
                <p className="text-xs text-text-muted">{t.organizer} • {new Date(t.startDate).toLocaleDateString('en-PK')}</p>
              </div>
              <StatusBadge status={t.status} size="sm" />
              <span className="text-sm font-bold text-yellow font-mono hidden sm:block">Rs {t.prizePool.toLocaleString()}</span>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
