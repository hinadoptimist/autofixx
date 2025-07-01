import { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { Filter, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { ProductGrid } from '@/components/product/ProductGrid';
import { products } from '@/data/mockData';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface Filters {
  vehicleType: string[];
  brands: number[];
  categories: number[];
  priceRange: [number, number];
  inStock: boolean;
  onSale: boolean;
}

export function ShopPage() {
  const [location] = useLocation();
  const [sortBy, setSortBy] = useState('popularity');
  const [filters, setFilters] = useState<Filters>({
    vehicleType: [],
    brands: [],
    categories: [],
    priceRange: [0, 1000],
    inStock: false,
    onSale: false,
  });

  // Get initial filters from URL params
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const vehicleTypeParam = urlParams.get('vehicleType');
  
  // Apply URL filters on mount
  useMemo(() => {
    if (vehicleTypeParam && !filters.vehicleType.includes(vehicleTypeParam)) {
      setFilters(prev => ({
        ...prev,
        vehicleType: [vehicleTypeParam]
      }));
    }
  }, [vehicleTypeParam]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply vehicle type filter
    if (filters.vehicleType.length > 0) {
      filtered = filtered.filter(product => 
        filters.vehicleType.includes(product.vehicleType)
      );
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        product.brandId && filters.brands.includes(product.brandId)
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        product.categoryId && filters.categories.includes(product.categoryId)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Apply stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => 
        product.stock && product.stock > 0
      );
    }

    // Apply sale filter
    if (filters.onSale) {
      filtered = filtered.filter(product => 
        product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price)
      );
    }

    return filtered;
  }, [filters]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case 'price-high':
        return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'rating':
        return sorted.sort((a, b) => parseFloat(b.rating || '0') - parseFloat(a.rating || '0'));
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const clearFilters = () => {
    setFilters({
      vehicleType: [],
      brands: [],
      categories: [],
      priceRange: [0, 1000],
      inStock: false,
      onSale: false,
    });
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
              <BreadcrumbPage>Shop</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-1/4">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              className="sticky top-24"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shop Auto Parts</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Showing {sortedProducts.length} of {products.length} products
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <FilterSidebar
                      filters={filters}
                      onFiltersChange={setFilters}
                      onClearFilters={clearFilters}
                    />
                  </SheetContent>
                </Sheet>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SortAsc className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Sort by popularity</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid products={sortedProducts} />

            {/* Load More Button (if needed) */}
            {sortedProducts.length > 12 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
