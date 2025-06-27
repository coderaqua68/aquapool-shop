import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Heart, ShoppingCart, Menu, Phone, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { cartStore } from "@/lib/cart-store";

export default function Header() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const { getItemCount } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { name: "Каркасные бассейны", slug: "frame-pools" },
    { name: "Насосы и фильтры", slug: "pumps-filters" },
    { name: "Лестницы", slug: "ladders" },
    { name: "Подстилки и тенты", slug: "covers-underlays" },
    { name: "Аксессуары", slug: "accessories" },
    { name: "Химия и уход", slug: "chemicals" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm text-gray-600 border-b border-gray-100">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-[hsl(207,90%,54%)]" />
              г. Химки, склад самовывоза
            </span>
            <span className="flex items-center">
              <Truck className="w-4 h-4 mr-1 text-[hsl(207,90%,54%)]" />
              Доставка по всей России
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-[hsl(207,90%,54%)] transition-colors">
              Telegram
            </a>
            <a href="#" className="hover:text-[hsl(207,90%,54%)] transition-colors">
              VK
            </a>
            <span className="font-medium text-[hsl(207,89%,40%)]">8 (800) 123-45-67</span>
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
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12"
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
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block py-3 border-t border-gray-100">
          <ul className="flex space-x-8">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/catalog/${category.slug}`}
                  className="text-gray-700 hover:text-[hsl(207,90%,54%)] font-medium transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
