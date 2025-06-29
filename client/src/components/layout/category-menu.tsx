import { useState, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ChevronRight, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  productCount: number | null;
  parentId: number | null;
  level: number | null;
  sortOrder: number | null;
}

export default function CategoryMenu() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<{top: number, left: number} | null>(null);
  const categoryRefs = useRef<{[key: number]: HTMLDivElement | null}>({});
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleShowSubmenu = useCallback((categoryId: number, rect: DOMRect) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setHoveredCategory(categoryId);
    setSubmenuPosition({
      top: rect.top,
      left: rect.right + 8
    });
  }, []);

  const handleHideSubmenu = useCallback(() => {
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
      setSubmenuPosition(null);
    }, 300); // 300ms задержка перед скрытием
  }, []);

  const handleKeepSubmenu = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const { data: mainCategories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories/main"],
  });

  // Получаем все подкатегории для всех главных категорий
  const { data: allCategories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Группируем подкатегории по родительским категориям
  const subcategoriesByParent = allCategories
    .filter(cat => cat.level === 1)
    .reduce((acc, cat) => {
      if (!acc[cat.parentId!]) {
        acc[cat.parentId!] = [];
      }
      acc[cat.parentId!].push(cat);
      return acc;
    }, {} as Record<number, Category[]>);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-base font-medium">
            Каталог товаров
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4">
              <div className="space-y-2">
                {mainCategories.map((category) => {
                  const categorySubcategories = subcategoriesByParent[category.id] || [];
                  
                  return (
                    <div 
                      key={category.id}
                      className="relative group"
                      ref={(el) => categoryRefs.current[category.id] = el}
                      onMouseEnter={(e) => {
                        // Только для десктоп устройств
                        if (categorySubcategories.length > 0 && window.innerWidth >= 768) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          handleShowSubmenu(category.id, rect);
                        }
                      }}
                      onMouseLeave={() => {
                        if (window.innerWidth >= 768) {
                          handleHideSubmenu();
                        }
                      }}
                    >
                      <Link
                        to={`/catalog/${category.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
                      >
                        <div className="flex items-center space-x-3">
                          {category.imageUrl && (
                            <img 
                              src={category.imageUrl} 
                              alt={category.name}
                              className="w-8 h-8 object-cover rounded"
                            />
                          )}
                          <span className="font-medium text-gray-900">{category.name}</span>
                        </div>
                        {categorySubcategories.length > 0 && (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </Link>
                      
                      {/* Horizontal Submenu - только для десктопа */}
                      {categorySubcategories.length > 0 && hoveredCategory === category.id && submenuPosition && (
                        <div 
                          className="hidden md:block fixed bg-white border border-gray-200 rounded-lg shadow-xl p-4 min-w-[280px] z-[9999]"
                          style={{
                            left: `${submenuPosition.left}px`,
                            top: `${submenuPosition.top}px`
                          }}
                          onMouseEnter={handleKeepSubmenu}
                          onMouseLeave={handleHideSubmenu}
                        >
                          <h4 className="font-semibold text-gray-900 mb-3 text-sm border-b border-gray-100 pb-2">{category.name}</h4>
                          <div className="space-y-1 max-h-[400px] overflow-y-auto">
                            {categorySubcategories
                              .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                              .map((subcategory) => (
                              <Link
                                key={subcategory.id}
                                to={`/catalog/${subcategory.slug}`}
                                className="block p-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                              >
                                {subcategory.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}