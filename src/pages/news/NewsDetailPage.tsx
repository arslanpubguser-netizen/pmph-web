import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, User, Share2, Calendar, Tag } from 'lucide-react';
import { mockNews } from '@/data/mockData';
import { NewsCard } from '@/components/news/NewsCard';
import { useSEO } from '@/hooks/useSEO';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const article = mockNews.find(a => a.slug === slug);

  useSEO({
    title: article?.title || 'Article Not Found',
    description: article?.excerpt,
    type: 'article',
    structuredData: article ? {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      author: article.author,
      datePublished: article.publishedAt,
      articleSection: article.category,
    } : undefined,
  });

  if (!article) {
    return (
      <div className="container-esports py-20 text-center">
        <p className="text-text-muted">Article not found.</p>
        <Link to="/news" className="text-primary mt-4 inline-block">Back to News</Link>
      </div>
    );
  }

  const related = mockNews.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <div className="relative h-64 overflow-hidden">
        <img src={article.thumbnailUrl} alt={article.title} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/70 to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors z-10">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="container-esports -mt-16 relative z-10 max-w-3xl">
        <div className="mb-6">
          <span className="text-xs font-bold px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/30">
            {article.category}
          </span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-3xl md:text-4xl text-white mb-4"
        >
          {article.title}
        </motion.h1>
        <div className="flex items-center gap-4 text-sm text-text-muted mb-6">
          <span className="flex items-center gap-1"><User className="w-4 h-4" />{article.author}</span>
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(article.publishedAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{article.readingTime} min read</span>
        </div>

        <img src={article.thumbnailUrl} alt={article.title} className="w-full h-64 object-cover rounded-xl mb-6" />

        <div className="flex items-center gap-2 mb-6">
          {article.tags.map(tag => (
            <span key={tag} className="text-xs text-text-muted flex items-center gap-1">
              <Tag className="w-3 h-3" />{tag}
            </span>
          ))}
          <button className="ml-auto flex items-center gap-1 text-xs text-text-muted hover:text-primary transition-colors">
            <Share2 className="w-3 h-3" />Share
          </button>
        </div>

        <article className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-4">
          {article.content.split('</p>').filter(Boolean).map((para, i) => (
            <p key={i} className="text-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: para + '</p>' }} />
          ))}
        </article>

        {related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="font-display font-bold text-xl text-white mb-4">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((a, i) => <NewsCard key={a.id} article={a} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
