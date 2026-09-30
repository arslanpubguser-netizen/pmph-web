import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Crosshair, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { useSEO } from '@/hooks/useSEO';

export default function ForgotPasswordPage() {
  useSEO({ title: 'Forgot Password', description: 'Reset your PUBG Mobile Pakistan Hub password' });
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple/10 rounded-full blur-[120px]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md mx-4">
        <div className="card p-8">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-4" />
              <h1 className="font-display font-bold text-2xl text-white mb-2">Check Your Email</h1>
              <p className="text-sm text-text-muted mb-6">We've sent a password reset link to <span className="text-white">{email}</span></p>
              <Link to="/login" className="inline-flex items-center gap-2 text-primary hover:text-primary-electric transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-4">
                  <Crosshair className="w-7 h-7 text-bg-base" strokeWidth={2.5} />
                </div>
                <h1 className="font-display font-bold text-2xl text-white">Reset Password</h1>
                <p className="text-sm text-text-muted mt-1">Enter your email to receive a reset link</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-text-muted uppercase tracking-wider mb-1.5 block">Email</label>
                  <div className="flex items-center bg-bg-base border border-border rounded-lg px-3 h-11 focus-within:border-primary/40 transition-colors">
                    <Mail className="w-4 h-4 text-text-muted" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 bg-transparent text-sm text-white placeholder-text-muted outline-none ml-3" required />
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
              <p className="text-center text-sm text-text-muted mt-6">
                <Link to="/login" className="text-primary hover:text-primary-electric transition-colors">Back to Login</Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
