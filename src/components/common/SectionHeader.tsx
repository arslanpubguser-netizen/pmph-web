import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  link?: { label: string; to: string };
  icon?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, link, icon }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {icon && <span className="text-primary">{icon}</span>}
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white">{title}</h2>
        </div>
        {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link.to} className="group flex items-center gap-1 text-sm text-primary hover:text-primary-electric transition-colors">
          {link.label}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
