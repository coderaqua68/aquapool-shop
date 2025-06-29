import { Link, useLocation } from "wouter";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, clearCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    toast({
      title: "Товар добавлен в корзину",
      description: `${product.name} успешно добавлен в корзину`,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    // Clear cart and add only this product
    clearCart();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    // Redirect to checkout
    setLocation('/checkout');
  };

  const renderRating = (rating: string) => {
    const ratingNum = parseFloat(rating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i <= ratingNum ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.originalPrice && product.price && (
            (() => {
              const original = parseFloat(product.originalPrice);
              const current = parseFloat(product.price);
              const discountPercent = Math.round(((original - current) / original) * 100);
              return discountPercent > 0 ? (
                <Badge className="bg-red-500 text-white text-xs font-bold">
                  -{discountPercent}%
                </Badge>
              ) : null;
            })()
          )}
          {product.isNew && (
            <Badge className="bg-green-500 text-white text-xs font-bold">
              NEW
            </Badge>
          )}
          {product.isPopular && (
            <Badge className="bg-[hsl(207,90%,54%)] text-white text-xs font-bold">
              ХИТ
            </Badge>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-[hsl(207,90%,54%)] p-2 rounded-full"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="p-4">
        <Link href={`/product/${product.slug || product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[hsl(207,90%,54%)] transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <div className="flex mr-2">
            {renderRating(product.rating || "0")}
          </div>
          <span className="text-gray-500 text-sm">({product.reviewCount} отзывов)</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-[hsl(207,90%,54%)]">
                {parseInt(product.price).toLocaleString()} ₽
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {parseInt(product.originalPrice).toLocaleString()} ₽
                </span>
              )}
            </div>
            {product.originalPrice && product.price && (
              (() => {
                const original = parseFloat(product.originalPrice);
                const current = parseFloat(product.price);
                const savings = original - current;
                return savings > 0 ? (
                  <div className="text-sm text-green-600 font-medium">
                    Экономия: {Math.round(savings).toLocaleString()} ₽
                  </div>
                ) : null;
              })()
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="border-[hsl(207,90%,54%)] text-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,54%)] hover:text-white"
          >
            В корзину
          </Button>
          <Button
            onClick={handleBuyNow}
            className="bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)] text-white"
          >
            Купить
          </Button>
        </div>
      </div>
    </div>
  );
}
