import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { categories, brands } from '@/data/mockData';

interface Filters {
  vehicleType: string[];
  brands: number[];
  categories: number[];
  priceRange: [number, number];
  inStock: boolean;
  onSale: boolean;
}

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClearFilters: () => void;
  className?: string;
}

export function FilterSidebar({ filters, onFiltersChange, onClearFilters, className = '' }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    vehicleType: true,
    brands: true,
    categories: true,
    price: true,
    availability: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleVehicleTypeChange = (vehicleType: string, checked: boolean) => {
    const newVehicleTypes = checked
      ? [...filters.vehicleType, vehicleType]
      : filters.vehicleType.filter(v => v !== vehicleType);
    
    onFiltersChange({ ...filters, vehicleType: newVehicleTypes });
  };

  const handleBrandChange = (brandId: number, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, brandId]
      : filters.brands.filter(b => b !== brandId);
    
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(c => c !== categoryId);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handlePriceRangeChange = (newRange: [number, number]) => {
    onFiltersChange({ ...filters, priceRange: newRange });
  };

  const handleAvailabilityChange = (type: 'inStock' | 'onSale', checked: boolean) => {
    onFiltersChange({ ...filters, [type]: checked });
  };

  const carCategories = categories.filter(c => c.vehicleType === 'car');
  const motorcycleCategories = categories.filter(c => c.vehicleType === 'motorcycle');

  const hasActiveFilters = 
    filters.vehicleType.length > 0 ||
    filters.brands.length > 0 ||
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000 ||
    filters.inStock ||
    filters.onSale;

  return (
    <div className={`w-full bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* Vehicle Type Filter */}
          <Collapsible open={expandedSections.vehicleType} onOpenChange={() => toggleSection('vehicleType')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <span className="font-medium text-gray-900 dark:text-white">Vehicle Type</span>
              {expandedSections.vehicleType ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="car"
                  checked={filters.vehicleType.includes('car')}
                  onCheckedChange={(checked) => handleVehicleTypeChange('car', checked as boolean)}
                />
                <Label htmlFor="car" className="text-sm">Cars</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="motorcycle"
                  checked={filters.vehicleType.includes('motorcycle')}
                  onCheckedChange={(checked) => handleVehicleTypeChange('motorcycle', checked as boolean)}
                />
                <Label htmlFor="motorcycle" className="text-sm">Motorcycles</Label>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Brand Filter */}
          <Collapsible open={expandedSections.brands} onOpenChange={() => toggleSection('brands')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <span className="font-medium text-gray-900 dark:text-white">Brand</span>
              {expandedSections.brands ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              {brands.slice(0, 6).map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={filters.brands.includes(brand.id)}
                    onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
                  />
                  <Label htmlFor={`brand-${brand.id}`} className="text-sm">{brand.name}</Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Category Filter */}
          <Collapsible open={expandedSections.categories} onOpenChange={() => toggleSection('categories')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <span className="font-medium text-gray-900 dark:text-white">Category</span>
              {expandedSections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              {carCategories.slice(0, 4).map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category.id}`} className="text-sm">{category.name}</Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Price Range Filter */}
          <Collapsible open={expandedSections.price} onOpenChange={() => toggleSection('price')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <span className="font-medium text-gray-900 dark:text-white">Price Range</span>
              {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-4">
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={handlePriceRangeChange}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <div className="flex items-center justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange([parseInt(e.target.value) || 0, filters.priceRange[1]])}
                  className="w-20 text-sm"
                />
                <span className="text-gray-500">to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange([filters.priceRange[0], parseInt(e.target.value) || 1000])}
                  className="w-20 text-sm"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Availability Filter */}
          <Collapsible open={expandedSections.availability} onOpenChange={() => toggleSection('availability')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <span className="font-medium text-gray-900 dark:text-white">Availability</span>
              {expandedSections.availability ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={filters.inStock}
                  onCheckedChange={(checked) => handleAvailabilityChange('inStock', checked as boolean)}
                />
                <Label htmlFor="inStock" className="text-sm">In Stock Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="onSale"
                  checked={filters.onSale}
                  onCheckedChange={(checked) => handleAvailabilityChange('onSale', checked as boolean)}
                />
                <Label htmlFor="onSale" className="text-sm">On Sale</Label>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}
