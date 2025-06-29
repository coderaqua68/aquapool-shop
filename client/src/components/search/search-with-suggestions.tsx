import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Search, Package, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchSuggestion {
  type: 'product' | 'brand' | 'category';
  text: string;
  value: string;
  sku?: string;
  price?: string;
  image?: string;
}

interface SearchWithSuggestionsProps {
  className?: string;
  placeholder?: string;
}

export default function SearchWithSuggestions({ 
  className,
  placeholder = "поиск" 
}: SearchWithSuggestionsProps) {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Получаем подсказки с сервера
  const { data: suggestions = [] } = useQuery<SearchSuggestion[]>({
    queryKey: ["/api/search/suggestions", searchQuery],
    queryFn: async () => {
      const encodedQuery = encodeURIComponent(searchQuery);
      const response = await fetch(`/api/search/suggestions?q=${encodedQuery}`);
      if (!response.ok) throw new Error('Search failed');
      return response.json();
    },
    enabled: searchQuery.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 минут
  });

  // Обработка поиска
  const handleSearch = (query?: string) => {
    const searchTerm = query || searchQuery.trim();
    if (searchTerm) {
      setLocation(`/catalog?search=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  // Выбор подсказки
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'product') {
      setLocation(`/product/${suggestion.value}`);
    } else if (suggestion.type === 'brand') {
      setLocation(`/catalog?brand=${encodeURIComponent(suggestion.value)}`);
    } else {
      handleSearch(suggestion.text);
    }
    setShowSuggestions(false);
    setSearchQuery("");
  };

  // Обработка клавиш
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Закрытие подсказок при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Показ подсказок при вводе
  useEffect(() => {
    if (searchQuery.length >= 2 && suggestions.length > 0) {
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery, suggestions.length]);

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('ru-RU').format(parseInt(price)) + ' ₽';
  };

  return (
    <div className={cn("relative w-full", className)} ref={suggestionsRef}>
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (searchQuery.length >= 2 && suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onKeyDown={handleKeyDown}
          className="pr-12 text-base"
          autoComplete="off"
        />
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[hsl(207,90%,54%)]"
        >
          <Search className="w-4 h-4" />
        </Button>
      </form>

      {/* Подсказки */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${suggestion.value}-${index}`}
              className={cn(
                "flex items-center p-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50",
                selectedIndex === index && "bg-blue-50"
              )}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {/* Иконка */}
              <div className="flex-shrink-0 mr-3">
                {suggestion.type === 'product' && suggestion.image ? (
                  <img 
                    src={suggestion.image} 
                    alt="" 
                    className="w-10 h-10 object-cover rounded border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={cn(
                  "w-10 h-10 bg-gray-100 rounded flex items-center justify-center",
                  suggestion.image ? "hidden" : ""
                )}>
                  {suggestion.type === 'product' && <Package className="w-5 h-5 text-gray-400" />}
                  {suggestion.type === 'brand' && <Star className="w-5 h-5 text-gray-400" />}
                  {suggestion.type === 'category' && <Search className="w-5 h-5 text-gray-400" />}
                </div>
              </div>

              {/* Содержимое */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {suggestion.text}
                </div>
                {suggestion.sku && (
                  <div className="text-sm text-gray-500">
                    Артикул: {suggestion.sku}
                  </div>
                )}
              </div>

              {/* Цена */}
              {suggestion.price && (
                <div className="flex-shrink-0 ml-3 text-right">
                  <div className="font-semibold text-[hsl(207,90%,54%)]">
                    {formatPrice(suggestion.price)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}