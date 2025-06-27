import { Link } from "wouter";
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
  const { addItem } = useCart();
  const { toast } = useToast();

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
        {product.discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white">
            -{product.discount}%
          </Badge>
        )}
        {product.isNew && (
          <Badge className="absolute top-3 left-3 bg-green-500 text-white">
            NEW
          </Badge>
        )}
        {product.isPopular && !product.isNew && !product.discount && (
          <Badge className="absolute top-3 left-3 bg-[hsl(207,90%,54%)] text-white">
            ХИТ
          </Badge>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-[hsl(207,90%,54%)] p-2 rounded-full"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
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
            <span className="text-2xl font-bold text-[hsl(207,90%,54%)]">
              {parseInt(product.price).toLocaleString()} ₽
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through ml-2">
                {parseInt(product.originalPrice).toLocaleString()} ₽
              </span>
            )}
          </div>
        </div>
        
        <Button
          onClick={handleAddToCart}
          className="w-full bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)] text-white"
        >
          В корзину
        </Button>
      </div>
    </div>
  );
}
