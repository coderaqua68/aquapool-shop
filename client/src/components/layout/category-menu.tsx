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

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-base font-medium">
            Каталог товаров
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] gap-3 p-6">
              {mainCategories.map((category) => (
                <div 
                  key={category.id}
                  className="group"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
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
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  </Link>
                  
                  {/* Subcategories dropdown */}
                  {hoveredCategory === category.id && subcategories.length > 0 && (
                    <div className="ml-6 mt-2 space-y-1">
                      {subcategories.map((subcategory) => (
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
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}