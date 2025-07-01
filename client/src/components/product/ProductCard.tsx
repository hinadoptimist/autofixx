import { useState } from 'react';
import { Link } from 'wouter';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@shared/schema';
import { useCart } from '@/contexts/CartContext';
import { brands } from '@/data/mockData';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();

  const brand = brands.find(b => b.id === product.brandId);
  const hasDiscount = product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price);
  const discountPercentage = hasDiscount 
    ? Math.round(((parseFloat(product.originalPrice!) - parseFloat(product.price)) / parseFloat(product.originalPrice!)) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className="relative">
        {hasDiscount && (
          <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600">
            Save {discountPercentage}%
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-500"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
        </Button>
        <Link href={`/product/${product.slug}`}>
          <div className="aspect-square overflow-hidden rounded-t-lg">
            <img
              src={product.images?.[0] || '/placeholder-product.jpg'}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {brand?.name || 'Generic'}
          </span>
          {product.rating && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {product.rating}
              </span>
            </div>
          )}
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.reviewCount && (
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400 text-sm">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(parseFloat(product.rating || '0'))
                      ? 'fill-current'
                      : ''
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              ({product.reviewCount})
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
          <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
            Only {product.stock} left in stock
          </p>
        )}

        {product.stock === 0 && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-2">
            Out of stock
          </p>
        )}
      </CardContent>
    </Card>
  );
}
