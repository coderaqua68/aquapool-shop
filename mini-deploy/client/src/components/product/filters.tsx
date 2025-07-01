import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductFilters } from "@shared/schema";

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
}

export default function Filters({ filters, onFiltersChange }: ProductFiltersProps) {
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() || "");
  const [dimensionsInput, setDimensionsInput] = useState(filters.dimensions || "");

  // Debounce функция для размеров
  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // Debounce функция для обновления фильтра dimensions
  const debouncedDimensionsChange = useCallback(
    debounce((value: string) => {
      onFiltersChange({
        ...filters,
        dimensions: value || undefined
      });
    }, 800),
    [filters, onFiltersChange]
  );

  // Обработка изменения размеров
  const handleDimensionsChange = (value: string) => {
    setDimensionsInput(value);
    debouncedDimensionsChange(value);
  };

  const handlePriceChange = () => {
    const min = minPrice ? parseFloat(minPrice) : undefined;
    const max = maxPrice ? parseFloat(maxPrice) : undefined;
    
    onFiltersChange({
      ...filters,
      minPrice: min,
      maxPrice: max
    });
  };

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setDimensionsInput("");
    onFiltersChange({
      category: filters.category,
      search: filters.search,
      sortBy: filters.sortBy
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Фильтры</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Сортировка */}
        <div className="space-y-2">
          <Label>Сортировка</Label>
          <Select
            value={filters.sortBy || "default"}
            onValueChange={(value) => onFiltersChange({
              ...filters,
              sortBy: value === "default" ? undefined : value
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите сортировку" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">По умолчанию</SelectItem>
              <SelectItem value="price_asc">Цена: по возрастанию</SelectItem>
              <SelectItem value="price_desc">Цена: по убыванию</SelectItem>
              <SelectItem value="name_asc">Название: А-Я</SelectItem>
              <SelectItem value="name_desc">Название: Я-А</SelectItem>
              <SelectItem value="rating_desc">По рейтингу</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Цена */}
        <div className="space-y-2">
          <Label>Цена, ₽</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="От"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onBlur={handlePriceChange}
            />
            <Input
              type="number"
              placeholder="До"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onBlur={handlePriceChange}
            />
          </div>
        </div>

        {/* Размеры */}
        <div className="space-y-2">
          <Label>Размеры</Label>
          <Input
            type="text"
            placeholder="Например: 488x122"
            value={dimensionsInput}
            onChange={(e) => handleDimensionsChange(e.target.value)}
          />
        </div>

        <Button
          variant="outline"
          onClick={resetFilters}
          className="w-full"
        >
          Сбросить фильтры
        </Button>
      </CardContent>
    </Card>
  );
}