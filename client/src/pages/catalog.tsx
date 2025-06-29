import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import ProductCard from "@/components/product/product-card";
import ProductFilters from "@/components/product/product-filters";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

export default function Catalog() {
  const [location] = useLocation();
  const [filters, setFilters] = useState<any>({});
  const [urlKey, setUrlKey] = useState(0); // Триггер для обновления

  // Parse URL parameters
  useEffect(() => {
    // Используем window.location.search вместо парсинга из location
    const params = new URLSearchParams(window.location.search);
    const categoryFromPath = location.split('/catalog/')[1]?.split('?')[0];
    
    const newFilters: any = {};
    
    if (categoryFromPath) {
      newFilters.category = categoryFromPath;
    }
    
    if (params.get('search')) {
      newFilters.search = params.get('search');
    }
    
    if (params.get('brand')) {
      newFilters.brand = params.get('brand');
    }
    
    if (params.get('minPrice')) {
      newFilters.minPrice = parseInt(params.get('minPrice')!);
    }
    
    if (params.get('maxPrice')) {
      newFilters.maxPrice = parseInt(params.get('maxPrice')!);
    }
    
    if (params.get('inStock')) {
      newFilters.inStock = params.get('inStock') === 'true';
    }
    
    setFilters(newFilters);
  }, [location, urlKey]);

  // Отслеживаем изменения в search параметрах для принудительного обновления
  useEffect(() => {
    const handleLocationChange = () => {
      setUrlKey(prev => prev + 1);
    };

    // Добавляем обработчик для pushState/replaceState (для программных изменений URL)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      originalPushState.apply(this, args);
      handleLocationChange();
    };

    history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      handleLocationChange();
    };

    // Восстанавливаем оригинальные методы при размонтировании
    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters.category) params.append('category', filters.category);
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.search) params.append('search', filters.search);
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.inStock) params.append('inStock', 'true');
      
      const url = `/api/products?${params}`;
      
      const response = await fetch(url);
      const data = await response.json();
      return data;
    },
  });

  const sortedProducts = [...products].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-desc':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return b.isNew ? 1 : -1;
      case 'popular':
      default:
        return b.isPopular ? 1 : -1;
    }
  });

  const getCategoryTitle = (category?: string) => {
    const categoryMap: Record<string, string> = {
      'frame-pools': 'Каркасные бассейны',
      'pumps-filters': 'Насосы и фильтры',
      'ladders': 'Лестницы',
      'covers-underlays': 'Подстилки и тенты',
      'accessories': 'Аксессуары',
      'chemicals': 'Химия и уход',
    };
    return category ? categoryMap[category] || 'Каталог' : 'Каталог товаров';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="h-96 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getCategoryTitle(filters.category)}
        </h1>
        {filters.search && (
          <p className="text-gray-600">
            Результаты поиска по запросу: "{filters.search}" ({products.length} товаров)
          </p>
        )}
        {!filters.search && (
          <p className="text-gray-600">Найдено товаров: {products.length}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ProductFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Товары не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте изменить параметры поиска или фильтры
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
