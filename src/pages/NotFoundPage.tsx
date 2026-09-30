import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crosshair, Home, ArrowLeft } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

export default function NotFoundPage() {
  useSEO({ title: '404 - Page Not Found', description: 'The page you are looking for does not exist' });

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red/10 rounded-full blur-[120px]" />

      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-red/30"
          style={{ top: `${20 + i * 20}%`, left: `${10 + i * 25}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      <div className="relative z-10 text-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-6">
          <Crosshair className="w-16 h-16 text-red mx-auto mb-4" />
          <h1 className="font-display font-bold text-8xl md:text-9xl text-white">404</h1>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-display font-bold text-xl text-white mb-2">You dropped outside the safe zone.</h2>
          <p className="text-text-muted mb-8">The page you're looking for doesn't exist.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-bg-base font-display font-semibold hover:bg-primary-electric btn-glow transition-all">
            <Home className="w-5 h-5" /> Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
