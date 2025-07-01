import { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { ArrowLeft, Heart, ShoppingCart, Star, Shield, Truck, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { products, brands, vehicleMakes, vehicleYears } from '@/data/mockData';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function ProductDetailPage() {
  const [, params] = useRoute('/product/:slug');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [compatibility, setCompatibility] = useState({
    year: '',
    make: '',
    model: '',
  });
  const { addItem } = useCart();

  const product = products.find(p => p.slug === params?.slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h1>
          <Button asChild>
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const brand = brands.find(b => b.id === product.brandId);
  const hasDiscount = product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price);
  const discountPercentage = hasDiscount 
    ? Math.round(((parseFloat(product.originalPrice!) - parseFloat(product.price)) / parseFloat(product.originalPrice!)) * 100)
    : 0;

  const specifications = product.specifications ? JSON.parse(product.specifications) : {};
  const compatibilityData = product.compatibility ? JSON.parse(product.compatibility) : {};

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/shop">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </Button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={product.images?.[selectedImageIndex] || '/placeholder-product.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square bg-gray-100 dark:bg-gray-700 rounded cursor-pointer border-2 ${
                        selectedImageIndex === index
                          ? 'border-blue-500'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {brand?.name || 'Generic'}
                </p>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {product.name}
                </h1>
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(parseFloat(product.rating || '0'))
                              ? 'fill-current'
                              : ''
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                      <Badge className="bg-red-500 hover:bg-red-600">
                        Save {discountPercentage}%
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              {/* Compatibility Checker */}
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Check Vehicle Compatibility
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <Select value={compatibility.year} onValueChange={(value) => setCompatibility(prev => ({ ...prev, year: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleYears.map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={compatibility.make} onValueChange={(value) => setCompatibility(prev => ({ ...prev, make: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Make" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleMakes.map(make => (
                          <SelectItem key={make} value={make}>{make}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={compatibility.model} onValueChange={(value) => setCompatibility(prev => ({ ...prev, model: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="model1">Model 1</SelectItem>
                        <SelectItem value="model2">Model 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Check Compatibility</Button>
                </CardContent>
              </Card>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={decreaseQuantity}
                      className="px-3 py-1"
                    >
                      -
                    </Button>
                    <span className="px-4 py-1 border-x border-gray-300 dark:border-gray-600">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={increaseQuantity}
                      className="px-3 py-1"
                    >
                      +
                    </Button>
                  </div>
                  {product.stock && product.stock > 0 ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

                <div className="flex space-x-4">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!product.stock || product.stock === 0}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleWishlistToggle}
                    className="px-4"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Product Features */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    High-quality construction
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    OEM quality guarantee
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Easy installation
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    1-year warranty included
                  </li>
                </ul>
              </div>

              {/* Shipping & Returns */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Free shipping over $99</span>
                  </div>
                  <div className="flex items-center">
                    <RotateCcw className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">30-day returns</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">1-year warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <Tabs defaultValue="description" className="p-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>{product.description}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="compatibility" className="mt-6">
                <div className="space-y-4">
                  {compatibilityData.makes && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Compatible Makes:</h4>
                      <div className="flex flex-wrap gap-2">
                        {compatibilityData.makes.map((make: string, index: number) => (
                          <Badge key={index} variant="secondary">{make}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {compatibilityData.years && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Year Range:</h4>
                      <Badge variant="secondary">{compatibilityData.years.join(' - ')}</Badge>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
