import { DashboardLayout } from './DashboardPage';
import { mockNotifications } from '@/data/mockData';
import { Bell, FileText, Trophy, Users, Mail, Settings } from 'lucide-react';

const typeIcons: Record<string, { icon: typeof Bell; color: string }> = {
  application: { icon: FileText, color: 'text-primary' },
  tournament: { icon: Trophy, color: 'text-yellow' },
  recruitment: { icon: Users, color: 'text-blue' },
  team_invite: { icon: Mail, color: 'text-purple' },
  system: { icon: Settings, color: 'text-text-muted' },
};

export default function DashboardNotificationsPage() {
  return (
    <DashboardLayout title="Notifications">
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-display font-bold text-white">All Notifications</h3>
          <button className="text-xs text-primary hover:text-primary-electric transition-colors">Mark all as read</button>
        </div>
        <div className="divide-y divide-border-subtle">
          {mockNotifications.map(n => {
            const config = typeIcons[n.type] || typeIcons.system;
            return (
              <div key={n.id} className={`flex items-start gap-3 p-4 hover:bg-bg-hover transition-colors ${!n.isRead ? 'bg-primary/5' : ''}`}>
                <div className={`w-9 h-9 rounded-lg bg-bg-base flex items-center justify-center ${config.color} flex-shrink-0`}>
                  <config.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{n.title}</p>
                    {!n.isRead && <span className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-xs text-text-muted mt-1">{n.message}</p>
                  <p className="text-[10px] text-text-muted mt-1">{new Date(n.createdAt).toLocaleDateString('en-PK')}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
