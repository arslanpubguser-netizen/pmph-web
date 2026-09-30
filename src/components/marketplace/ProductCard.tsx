import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '@/types';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/marketplace/${product.slug}`}
        className="card card-hover group block overflow-hidden"
      >
        <div className="relative h-48 overflow-hidden bg-bg-base">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.isFeatured && (
            <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-md bg-primary/20 text-primary border border-primary/30">
              FEATURED
            </span>
          )}
          {!product.inStock && (
            <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-md bg-red/20 text-red border border-red/30">
              OUT OF STOCK
            </span>
          )}
          <button
            className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-bg-card/80 backdrop-blur border border-border flex items-center justify-center text-text-muted hover:text-red transition-colors opacity-0 group-hover:opacity-100"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{product.category}</p>
          <h3 className="font-display font-semibold text-white group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3 h-3 text-yellow fill-yellow" />
            <span className="text-xs text-text-muted">{product.rating} ({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-primary font-mono">Rs {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xs text-text-muted line-through">Rs {product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-bg-base transition-all">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
