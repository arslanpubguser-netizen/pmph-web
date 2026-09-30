import { Link, useLocation } from 'react-router-dom';
import { Crosshair } from 'lucide-react';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center transition-transform group-hover:scale-110">
          <Crosshair className="w-5 h-5 text-bg-base" strokeWidth={2.5} />
        </div>
        <div className="absolute inset-0 rounded-lg bg-primary/40 blur-lg -z-10 group-hover:bg-primary/60 transition-all" />
      </div>
      {!compact && (
        <div className="flex flex-col leading-none">
          <span className="font-display font-bold text-lg text-white tracking-wide">PMPH</span>
          <span className="text-[10px] text-text-muted tracking-widest uppercase">Pakistan Hub</span>
        </div>
      )}
    </Link>
  );
}
