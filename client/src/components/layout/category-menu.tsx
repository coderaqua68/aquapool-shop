import { useState } from "react";
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

  const { data: mainCategories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories/main"],
  });

  const { data: subcategories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories", hoveredCategory, "subcategories"],
    enabled: !!hoveredCategory,
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
            <div className="grid w-[90vw] max-w-[600px] min-w-[320px] gap-3 p-4 md:p-6">
              {mainCategories.map((category) => {
                const categorySubcategories = subcategoriesByParent[category.id] || [];
                
                return (
                  <div 
                    key={category.id}
                    className="group"
                  >
                    <Link
                      to={`/catalog/${category.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {category.imageUrl && (
                          <img 
                            src={category.imageUrl} 
                            alt={category.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">{category.name}</h4>
                          {category.description && (
                            <p className="text-sm text-gray-600">{category.description}</p>
                          )}
                        </div>
                      </div>
                      {categorySubcategories.length > 0 && (
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      )}
                    </Link>
                    
                    {/* Subcategories */}
                    {categorySubcategories.length > 0 && (
                      <div className="ml-6 mt-2 space-y-1">
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
                    )}
                  </div>
                );
              })}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}