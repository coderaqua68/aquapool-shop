import { useState } from "react";
import { Link } from "wouter";
import { Heart, ShoppingCart, Menu, MapPin, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { cartStore } from "@/lib/cart-store";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import CategoryMenu from "@/components/layout/category-menu";
import SearchWithSuggestions from "@/components/search/search-with-suggestions";

export default function Header() {
  const { getItemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const catalogCategories = [
    { 
      name: "Каркасные бассейны", 
      slug: "frame-pools",
      subcategories: [
        "Ultra Frame",
        "Prism Frame", 
        "Steel Pro Max",
        "Metal Frame"
      ]
    },
    { 
      name: "Надувные бассейны", 
      slug: "inflatable-pools",
      subcategories: [
        "Easy Set",
        "Fast Set",
        "Snap Set",
        "Детские бассейны"
      ]
    },
    { 
      name: "Насосы и фильтры", 
      slug: "pumps-filters",
      subcategories: [
        "Фильтр-насосы",
        "Песочные фильтры",
        "Картриджные фильтры",
        "Скиммеры"
      ]
    },
    { 
      name: "Лестницы", 
      slug: "ladders",
      subcategories: [
        "Лестницы безопасности",
        "Стандартные лестницы",
        "Поручни"
      ]
    },
    { 
      name: "Тенты и подстилки", 
      slug: "covers-underlays",
      subcategories: [
        "Защитные тенты",
        "Солнечные покрывала",
        "Подстилки",
        "Покрывала"
      ]
    },
    { 
      name: "Химия для бассейнов", 
      slug: "chemicals",
      subcategories: [
        "Дезинфекция",
        "pH регуляторы",
        "Альгициды",
        "Тест-наборы"
      ]
    },
    { 
      name: "Аксессуары", 
      slug: "accessories",
      subcategories: [
        "Чаши для бассейнов",
        "Комплектующие",
        "Инструменты для чистки",
        "Игрушки для бассейна"
      ]
    }
  ];

  const navigationPages = [
    { name: "Главная", href: "/" },
    { name: "О нас", href: "/about" },
    { name: "Доставка", href: "/delivery" },
    { name: "Оплата", href: "/payment" },
    { name: "Контакты", href: "/contacts" }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm text-gray-600 border-b border-gray-100">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-[hsl(207,90%,54%)]" />
              г.Химки
            </span>
            <span className="flex items-center">
              <Truck className="w-4 h-4 mr-1 text-[hsl(207,90%,54%)]" />
              Доставка по всей России
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://t.me/aquapool_manager" target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(207,90%,54%)] transition-colors">
              Telegram
            </a>
            <span className="font-medium text-[hsl(207,89%,40%)]">+7 928 566‑87‑29</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="pool-gradient p-3 rounded-lg mr-3">
              <div className="text-white text-2xl">🏊</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AquaPool</h1>
              <p className="text-sm text-gray-500">Бассейны и аксессуары</p>
            </div>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchWithSuggestions 
              className="w-full"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Избранное</span>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center space-x-2"
              onClick={() => cartStore.setIsOpen(true)}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Корзина</span>
              {getItemCount() > 0 && (
                <span className="bg-[hsl(207,90%,54%)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block py-3 border-t border-gray-100">
          <NavigationMenu>
            <NavigationMenuList className="space-x-6">
              {/* Hierarchical Catalog Menu */}
              <CategoryMenu />

              {/* Other Navigation Links */}
              {navigationPages.slice(1).map((page) => (
                <NavigationMenuItem key={page.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={page.href}
                      className="text-gray-700 hover:text-[hsl(207,90%,54%)] font-medium transition-colors px-3 py-2 rounded-md hover:bg-blue-50"
                    >
                      {page.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <SearchWithSuggestions className="w-full" />
              </div>
              
              {/* Mobile Categories */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 mb-3">Категории</h3>
                {catalogCategories.map((category) => (
                  <div key={category.slug} className="space-y-1">
                    <Link
                      href={`/catalog?category=${category.slug}`}
                      className="block p-3 text-gray-700 hover:text-[hsl(207,90%,54%)] hover:bg-blue-50 rounded-md transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        href={`/catalog?category=${category.slug}&subcategory=${sub}`}
                        className="block p-2 ml-4 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              
              {/* Mobile Navigation Links */}
              <div className="border-t pt-4 space-y-2">
                {navigationPages.slice(1).map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="block p-3 text-gray-700 hover:text-[hsl(207,90%,54%)] hover:bg-blue-50 rounded-md transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
              
              {/* Mobile Action Buttons */}
              <div className="border-t pt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full mobile-button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    // Add favorites logic here
                  }}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Избранное
                </Button>
                <Button
                  className="w-full bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)] text-white mobile-button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    cartStore.setIsOpen(true);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Корзина {getItemCount() > 0 && `(${getItemCount()})`}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
