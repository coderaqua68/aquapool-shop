import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Filters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  sortBy?: string;
  brand?: string;
  poolType?: string;
  volumeRange?: string;
  shape?: string;
  material?: string;
  dimensions?: string;
}

interface ProductFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export default function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() || "");
  const [dimensionsInput, setDimensionsInput] = useState(filters.dimensions || "");

  // Debounce для поиска по размерам
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFiltersChange({
        ...filters,
        dimensions: dimensionsInput || undefined
      });
    }, 800); // Задержка 800ms

    return () => clearTimeout(timeoutId);
  }, [dimensionsInput]); // Только dimensionsInput в зависимостях

  const handlePriceFilter = () => {
    onFiltersChange({
      ...filters,
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
    });
  };

  const handleSortChange = (value: string) => {
    onFiltersChange({ ...filters, sortBy: value });
  };

  const handleInStockChange = (checked: boolean) => {
    onFiltersChange({ ...filters, inStock: checked ? true : undefined });
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setDimensionsInput("");
    onFiltersChange({});
  };

  return (
    <div className="space-y-6">
      {/* Sort */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Сортировка</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Сортировать по" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">По популярности</SelectItem>
              <SelectItem value="price-asc">По цене: сначала дешевые</SelectItem>
              <SelectItem value="price-desc">По цене: сначала дорогие</SelectItem>
              <SelectItem value="name">По названию</SelectItem>
              <SelectItem value="newest">Сначала новые</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Price Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Цена</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="min-price">От</Label>
              <Input
                id="min-price"
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="max-price">До</Label>
              <Input
                id="max-price"
                type="number"
                placeholder="∞"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handlePriceFilter} className="w-full" variant="outline">
            Применить
          </Button>
        </CardContent>
      </Card>

      {/* Dimensions Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Размеры</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="dimensions">Поиск по размерам</Label>
            <Input
              id="dimensions"
              type="text"
              placeholder="Например: 549x274, 366x122"
              value={dimensionsInput}
              onChange={(e) => setDimensionsInput(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Введите размеры через "x" или поиск по части размера
            </p>
          </div>
        </CardContent>
      </Card>



      {/* Pool Type Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Тип бассейна</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.poolType || "all"} onValueChange={(value) => onFiltersChange({...filters, poolType: value === "all" ? undefined : value})}>
            <SelectTrigger>
              <SelectValue placeholder="Тип бассейна" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="Каркасный">Каркасный</SelectItem>
              <SelectItem value="Морозоустойчивый">Морозоустойчивый</SelectItem>
              <SelectItem value="Джакузи">Джакузи</SelectItem>
              <SelectItem value="Запасные чаши">Запасные чаши</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Volume Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Объем</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.volumeRange || "all"} onValueChange={(value) => onFiltersChange({...filters, volumeRange: value === "all" ? undefined : value})}>
            <SelectTrigger>
              <SelectValue placeholder="Объем бассейна" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Любой объем</SelectItem>
              <SelectItem value="small">До 5000 л</SelectItem>
              <SelectItem value="medium">5000 - 15000 л</SelectItem>
              <SelectItem value="large">15000 - 30000 л</SelectItem>
              <SelectItem value="xlarge">Свыше 30000 л</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Shape Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Форма</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.shape || "all"} onValueChange={(value) => onFiltersChange({...filters, shape: value === "all" ? undefined : value})}>
            <SelectTrigger>
              <SelectValue placeholder="Форма бассейна" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Любая форма</SelectItem>
              <SelectItem value="Круглый">Круглый</SelectItem>
              <SelectItem value="Прямоугольный">Прямоугольный</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Material Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Материал</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.material || "all"} onValueChange={(value) => onFiltersChange({...filters, material: value === "all" ? undefined : value})}>
            <SelectTrigger>
              <SelectValue placeholder="Материал чаши" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Любой материал</SelectItem>
              <SelectItem value="ПВХ">ПВХ</SelectItem>
              <SelectItem value="DuraPlus">DuraPlus</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Availability Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Наличие</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock || false}
              onCheckedChange={handleInStockChange}
            />
            <Label htmlFor="in-stock">Только в наличии</Label>
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button onClick={clearFilters} variant="outline" className="w-full">
        Сбросить фильтры
      </Button>
    </div>
  );
}
