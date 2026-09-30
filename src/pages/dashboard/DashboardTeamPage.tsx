import { DashboardLayout } from './DashboardPage';
import { Link } from 'react-router-dom';
import { Users, UserPlus, Settings } from 'lucide-react';
import { mockTeams, mockPlayers } from '@/data/mockData';

export default function DashboardTeamPage() {
  const team = mockTeams[0];
  const roster = mockPlayers.filter(p => p.teamId === team.id).slice(0, 6);

  return (
    <DashboardLayout title="My Team">
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden">
            <img src={team.logoUrl} alt={team.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h2 className="font-display font-bold text-xl text-white">{team.name}</h2>
            <p className="text-sm text-text-muted">{team.region} • {team.level}</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-bg-base border border-border text-sm text-white hover:border-primary/30 transition-colors flex items-center gap-2">
            <Settings className="w-4 h-4" /> Settings
          </button>
        </div>
      </div>

      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-white flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Roster</h3>
          <button className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors flex items-center gap-1">
            <UserPlus className="w-4 h-4" /> Add Player
          </button>
        </div>
        <div className="space-y-2">
          {roster.map((player, i) => (
            <Link key={player.id} to={`/players/${player.id}`} className="flex items-center gap-3 p-3 bg-bg-base rounded-lg hover:bg-bg-hover transition-colors">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img src={player.avatarUrl} alt={player.username} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{player.username}</p>
                <p className="text-xs text-text-muted">{player.primaryRole} • {player.rank}</p>
              </div>
              {i === 0 && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-yellow/20 text-yellow">CAPTAIN</span>}
            </Link>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-bold text-white mb-4">Team Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Points', value: team.points, color: 'text-yellow' },
            { label: 'Wins', value: team.wins, color: 'text-primary' },
            { label: 'Matches', value: team.matches, color: 'text-blue' },
            { label: 'Win Rate', value: `${Math.round((team.wins / team.matches) * 100)}%`, color: 'text-orange' },
          ].map(stat => (
            <div key={stat.label} className="bg-bg-base rounded-lg p-4 text-center">
              <p className={`font-display font-bold text-2xl ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
