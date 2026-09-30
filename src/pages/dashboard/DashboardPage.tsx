import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, Users, Trophy, FileText, Bell,
  Settings, BarChart3, Target, Zap, Crosshair, Award,
} from 'lucide-react';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { mockDashboardStats } from '@/data/mockData';

const sidebarItems = [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Profile', path: '/dashboard/profile', icon: User },
  { label: 'My Team', path: '/dashboard/team', icon: Users },
  { label: 'Tournaments', path: '/dashboard/tournaments', icon: Trophy },
  { label: 'Recruitment', path: '/dashboard/recruitment', icon: FileText },
  { label: 'Applications', path: '/dashboard/applications', icon: FileText },
  { label: 'Notifications', path: '/dashboard/notifications', icon: Bell },
];

export function DashboardLayout({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="container-esports py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-60 flex-shrink-0">
          <div className="card p-2 sticky top-20">
            <div className="px-3 py-2 mb-1">
              <p className="text-xs text-text-muted uppercase tracking-wider">Dashboard</p>
            </div>
            {sidebarItems.map(item => (
              <Link key={item.path} to={item.path} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-white hover:bg-bg-hover transition-colors">
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </aside>
        <div className="flex-1 min-w-0">
          <h1 className="font-display font-bold text-2xl text-white mb-6">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const stats = [
    { label: 'Profile Views', value: 342, icon: User, color: 'text-primary' },
    { label: 'Applications', value: 5, icon: FileText, color: 'text-blue' },
    { label: 'Tournaments', value: 3, icon: Trophy, color: 'text-yellow' },
    { label: 'K/D Ratio', value: 4.2, icon: Target, color: 'text-red' },
  ];

  return (
    <DashboardLayout title="Overview">
      {/* Profile Completion */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-white">Profile Completion</h3>
          <span className="text-2xl font-bold text-primary">75%</span>
        </div>
        <div className="h-2 bg-bg-base rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ duration: 1, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-primary to-primary-electric rounded-full" />
        </div>
        <p className="text-xs text-text-muted mt-2">Complete your profile to increase visibility to teams and recruiters</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="hud-corners card p-4">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <p className={`font-display font-bold text-2xl ${stat.color}`}>
              <AnimatedCounter value={stat.value} />
            </p>
            <p className="text-xs text-text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <h3 className="font-display font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { icon: FileText, text: 'Applied to Team Stalwart', time: '2 hours ago', color: 'text-primary' },
            { icon: Trophy, text: 'Registered for PMPL Pakistan Fall 2026', time: '1 day ago', color: 'text-yellow' },
            { icon: Target, text: 'Achieved Conqueror rank', time: '3 days ago', color: 'text-red' },
            { icon: Award, text: 'MVP in Lahore Showdown Finals', time: '1 week ago', color: 'text-orange' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-bg-base rounded-lg">
              <div className={`w-8 h-8 rounded-lg bg-bg-card flex items-center justify-center ${item.color}`}>
                <item.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">{item.text}</p>
                <p className="text-xs text-text-muted">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
