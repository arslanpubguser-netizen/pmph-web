import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star, ShoppingCart, Heart, ChevronLeft, Check, Truck,
  Shield, RotateCcw, Share2,
} from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import { Button } from '@/components/common/Button';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { useSEO } from '@/hooks/useSEO';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find(p => p.slug === slug);

  useSEO({
    title: product?.name || 'Product Not Found',
    description: product?.description,
    type: 'product',
    structuredData: product ? {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      brand: product.brand,
      offers: { '@type': 'Offer', price: product.price, priceCurrency: 'PKR' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviews },
    } : undefined,
  });

  if (!product) {
    return (
      <div className="container-esports py-20 text-center">
        <p className="text-text-muted">Product not found.</p>
        <Link to="/marketplace" className="text-primary mt-4 inline-block">Back to Marketplace</Link>
      </div>
    );
  }

  const related = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const images = product.images || [product.imageUrl || ''];

  return (
    <div className="min-h-screen">
      <div className="container-esports py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="card overflow-hidden mb-3 h-80">
              <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImage === i ? 'border-primary' : 'border-border'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{product.category}</p>
            <h1 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow fill-yellow' : 'text-border'}`} />
                ))}
                <span className="text-sm text-text-muted ml-1">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-primary font-mono">Rs {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-text-muted line-through">Rs {product.originalPrice.toLocaleString()}</span>
                  <span className="text-xs font-bold px-2 py-1 rounded-md bg-red/20 text-red">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-text-secondary mb-6">{product.description}</p>

            <div className="space-y-2 mb-6">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                  <Check className="w-4 h-4 text-primary" /> {feature}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-9 h-9 rounded-lg bg-bg-card border border-border text-white flex items-center justify-center hover:border-primary/30 transition-colors">-</button>
                <span className="w-12 text-center text-white font-medium">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-9 h-9 rounded-lg bg-bg-card border border-border text-white flex items-center justify-center hover:border-primary/30 transition-colors">+</button>
              </div>
              <span className={`text-sm font-medium ${product.inStock ? 'text-primary' : 'text-red'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Button icon={ShoppingCart} size="lg" disabled={!product.inStock}>Add to Cart</Button>
              <button className="w-12 h-12 rounded-lg bg-bg-card border border-border flex items-center justify-center text-text-muted hover:text-red hover:border-red/30 transition-all">
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-lg bg-bg-card border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: 'Free Shipping' },
                { icon: Shield, label: 'Warranty' },
                { icon: RotateCcw, label: '7-Day Return' },
              ].map(item => (
                <div key={item.label} className="card p-3 text-center">
                  <item.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-text-muted">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display font-bold text-xl text-white mb-4">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
