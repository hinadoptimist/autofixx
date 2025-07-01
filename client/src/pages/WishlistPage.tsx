import { useState } from 'react';
import { Link } from 'wouter';
import { Heart, ShoppingCart, Trash2, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { products, brands } from '@/data/mockData';

export function WishlistPage() {
  // Mock wishlist items - in a real app, this would come from context or API
  const [wishlistItems, setWishlistItems] = useState([
    products[0], // Performance Brake Disc Rotor
    products[2], // Sport Performance Tire
    products[5], // Motorcycle Performance Exhaust
  ]);
  
  const { addItem } = useCart();
  const { toast } = useToast();

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    toast({
      title: 'Removed from Wishlist',
      description: 'Item has been removed from your wishlist.',
    });
  };

  const addToCart = (product: any) => {
    addItem(product);
  };

  const moveAllToCart = () => {
    wishlistItems.forEach(item => addItem(item));
    setWishlistItems([]);
    toast({
      title: 'All Items Added to Cart',
      description: `${wishlistItems.length} items have been added to your cart.`,
    });
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: 'Wishlist Cleared',
      description: 'All items have been removed from your wishlist.',
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <Heart className="mx-auto w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Save items you're interested in to your wishlist so you can easily find them later.
            </p>
            <Button size="lg" asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/shop">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Wishlist ({wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'})
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Save your favorite parts for later
              </p>
            </div>
            {wishlistItems.length > 0 && (
              <div className="flex gap-3 mt-4 sm:mt-0">
                <Button variant="outline" onClick={clearWishlist}>
                  Clear All
                </Button>
                <Button onClick={moveAllToCart} className="bg-blue-600 hover:bg-blue-700">
                  Add All to Cart
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => {
            const brand = brands.find(b => b.id === product.brandId);
            const hasDiscount = product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price);
            const discountPercentage = hasDiscount 
              ? Math.round(((parseFloat(product.originalPrice!) - parseFloat(product.price)) / parseFloat(product.originalPrice!)) * 100)
              : 0;

            return (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  {hasDiscount && (
                    <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600">
                      Save {discountPercentage}%
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-2 z-10 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
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

                  <div className="flex items-center justify-between mb-4">
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
                  </div>

                  <div className="space-y-2">
                    <Button
                      size="sm"
                      onClick={() => addToCart(product)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromWishlist(product.id)}
                      className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>

                  {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
                    <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
                      Only {product.stock} left in stock
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recently Viewed or Recommendations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(1, 5).map((product) => {
              const brand = brands.find(b => b.id === product.brandId);
              return (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                  <Link href={`/product/${product.slug}`}>
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={product.images?.[0] || '/placeholder-product.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {brand?.name || 'Generic'}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ${product.price}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
