import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import type { NewsArticle } from '@/types';

const categoryColors: Record<string, string> = {
  'PUBG Updates': 'text-blue bg-blue/10 border-blue/30',
  'Esports News': 'text-primary bg-primary/10 border-primary/30',
  'Tournament Results': 'text-yellow bg-yellow/10 border-yellow/30',
  'Team News': 'text-purple bg-purple/10 border-purple/30',
  'Player News': 'text-orange bg-orange/10 border-orange/30',
  'Community': 'text-cyan bg-cyan/10 border-cyan/30',
};

export function NewsCard({ article, index = 0 }: { article: NewsArticle; index?: number }) {
  const catColor = categoryColors[article.category] || 'text-text-muted bg-bg-hover border-border';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/news/${article.slug}`}
        className="card card-hover group block overflow-hidden"
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={article.thumbnailUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/40 to-transparent" />
          <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-md border ${catColor}`}>
            {article.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-display font-bold text-white group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-text-muted line-clamp-2 mb-3">{article.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingTime} min read
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
