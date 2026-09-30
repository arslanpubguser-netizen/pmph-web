import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Bell, Menu, X, ChevronDown, LayoutDashboard,
  User, LogOut, Settings, Home, Users, Gamepad2, Trophy,
  Newspaper, BarChart3, ShoppingBag,
} from 'lucide-react';
import { Logo } from './Logo';
import { mockNotifications } from '@/data/mockData';

const navLinks = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Teams', path: '/teams', icon: Users },
  { label: 'Players', path: '/players', icon: Gamepad2 },
  { label: 'Tournaments', path: '/tournaments', icon: Trophy },
  { label: 'Rankings', path: '/rankings', icon: BarChart3 },
  { label: 'News', path: '/news', icon: Newspaper },
  { label: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setNotifOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg-base/95 backdrop-blur-md border-b border-border shadow-lg shadow-black/50'
            : 'bg-transparent'
        }`}
      >
        <div className="container-esports">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Logo />
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                        active
                          ? 'text-primary'
                          : 'text-text-secondary hover:text-white'
                      }`}
                    >
                      {link.label}
                      {active && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                          style={{ boxShadow: '0 0 8px rgba(34,197,94,0.8)' }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <form onSubmit={handleSearch} className="hidden md:flex items-center">
                <div className={`flex items-center bg-bg-card border border-border rounded-lg transition-all ${searchOpen ? 'w-64' : 'w-9'} h-9`}>
                  <button type="button" onClick={() => setSearchOpen(!searchOpen)} className="flex items-center justify-center w-9 h-9 text-text-muted hover:text-primary transition-colors">
                    <Search className="w-4 h-4" />
                  </button>
                  {searchOpen && (
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="flex-1 bg-transparent text-sm text-white placeholder-text-muted outline-none pr-3"
                    />
                  )}
                </div>
              </form>

              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-bg-card border border-border text-text-secondary hover:text-primary hover:border-primary/30 transition-all"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red text-[10px] font-bold text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
                    >
                      <div className="p-3 border-b border-border flex items-center justify-between">
                        <span className="font-display font-semibold text-sm">Notifications</span>
                        <span className="text-xs text-primary">{unreadCount} new</span>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {mockNotifications.slice(0, 5).map((n) => (
                          <Link
                            key={n.id}
                            to={n.link || '#'}
                            className={`flex gap-3 p-3 border-b border-border-subtle hover:bg-bg-hover transition-colors ${!n.isRead ? 'bg-primary/5' : ''}`}
                          >
                            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.isRead ? 'bg-primary' : 'bg-border'}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">{n.title}</p>
                              <p className="text-xs text-text-muted truncate">{n.message}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link to="/dashboard/notifications" className="block p-3 text-center text-xs text-primary hover:bg-bg-hover transition-colors">
                        View all notifications
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 h-9 px-2 rounded-lg bg-bg-card border border-border hover:border-primary/30 transition-all"
                >
                  <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary to-blue-electric flex items-center justify-center text-xs font-bold text-bg-base">
                    P
                  </div>
                  <ChevronDown className="w-3 h-3 text-text-muted hidden sm:block" />
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
                    >
                      <div className="p-3 border-b border-border">
                        <p className="text-sm font-medium text-white">Player Account</p>
                        <p className="text-xs text-text-muted">player@pmph.pk</p>
                      </div>
                      <div className="p-1">
                        {[
                          { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
                          { label: 'Profile', path: '/dashboard/profile', icon: User },
                          { label: 'Settings', path: '/dashboard/profile', icon: Settings },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            to={item.path}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-bg-hover rounded-lg transition-colors"
                          >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        ))}
                        <Link to="/login" className="flex items-center gap-3 px-3 py-2 text-sm text-red hover:bg-red/10 rounded-lg transition-colors">
                          <LogOut className="w-4 h-4" />
                          Logout
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-bg-card border border-border text-text-secondary"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-bg-surface border-l border-border lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Logo />
                <button onClick={() => setMobileOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-bg-card border border-border">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSearch} className="p-4 border-b border-border">
                <div className="flex items-center bg-bg-card border border-border rounded-lg px-3 h-10">
                  <Search className="w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 bg-transparent text-sm text-white placeholder-text-muted outline-none ml-2"
                  />
                </div>
              </form>
              <nav className="p-2">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                        active ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:text-white hover:bg-bg-hover'
                      }`}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
