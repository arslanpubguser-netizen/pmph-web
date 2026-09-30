import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Crosshair, Gamepad2, Users, Trophy } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { useSEO } from '@/hooks/useSEO';

const roles = [
  { value: 'player', label: 'Player', icon: Gamepad2 },
  { value: 'team_manager', label: 'Team Manager', icon: Users },
  { value: 'organizer', label: 'Organizer', icon: Trophy },
];

export default function RegisterPage() {
  useSEO({ title: 'Register', description: 'Create your PUBG Mobile Pakistan Hub account' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('player');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue/10 rounded-full blur-[120px]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md mx-4">
        <div className="card p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-4">
              <Crosshair className="w-7 h-7 text-bg-base" strokeWidth={2.5} />
            </div>
            <h1 className="font-display font-bold text-2xl text-white">Join the Hub</h1>
            <p className="text-sm text-text-muted mt-1">Create your esports profile</p>
          </div>

          <div className="mb-4">
            <label className="text-xs text-text-muted uppercase tracking-wider mb-2 block">I am a...</label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map(r => (
                <button key={r.value} type="button" onClick={() => setRole(r.value)} className={`flex flex-col items-center gap-1 p-3 rounded-lg border text-xs font-medium transition-all ${role === r.value ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-bg-base border-border text-text-muted hover:text-white'}`}>
                  <r.icon className="w-5 h-5" />
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-text-muted uppercase tracking-wider mb-1.5 block">Username</label>
              <div className="flex items-center bg-bg-base border border-border rounded-lg px-3 h-11 focus-within:border-primary/40 transition-colors">
                <User className="w-4 h-4 text-text-muted" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="ProGamerPK" className="flex-1 bg-transparent text-sm text-white placeholder-text-muted outline-none ml-3" required />
              </div>
            </div>
            <div>
              <label className="text-xs text-text-muted uppercase tracking-wider mb-1.5 block">Email</label>
              <div className="flex items-center bg-bg-base border border-border rounded-lg px-3 h-11 focus-within:border-primary/40 transition-colors">
                <Mail className="w-4 h-4 text-text-muted" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 bg-transparent text-sm text-white placeholder-text-muted outline-none ml-3" required />
              </div>
            </div>
            <div>
              <label className="text-xs text-text-muted uppercase tracking-wider mb-1.5 block">Password</label>
              <div className="flex items-center bg-bg-base border border-border rounded-lg px-3 h-11 focus-within:border-primary/40 transition-colors">
                <Lock className="w-4 h-4 text-text-muted" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="flex-1 bg-transparent text-sm text-white placeholder-text-muted outline-none ml-3" required minLength={8} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-text-muted hover:text-white transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs text-text-muted uppercase tracking-wider mb-1.5 block">Confirm Password</label>
              <div className="flex items-center bg-bg-base border border-border rounded-lg px-3 h-11 focus-within:border-primary/40 transition-colors">
                <Lock className="w-4 h-4 text-text-muted" />
                <input type={showPassword ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" className="flex-1 bg-transparent text-sm text-white placeholder-text-muted outline-none ml-3" required />
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-text-muted mt-6">
            Already have an account? <Link to="/login" className="text-primary hover:text-primary-electric transition-colors">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
