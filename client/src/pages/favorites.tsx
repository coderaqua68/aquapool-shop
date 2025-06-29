import { useFavorites } from "@/hooks/use-favorites";
import { Link } from "wouter";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

export default function Favorites() {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (favoriteItem: any) => {
    addItem({
      id: favoriteItem.id,
      name: favoriteItem.name,
      price: favoriteItem.price,
      imageUrl: favoriteItem.imageUrl,
    });
    toast({
      title: "Товар добавлен в корзину",
      description: `${favoriteItem.name} успешно добавлен в корзину`,
    });
  };

  const handleRemoveFromFavorites = (id: number, name: string) => {
    removeFromFavorites(id);
    toast({
      title: "Удалено из избранного",
      description: `${name} удален из избранного`,
    });
  };

  const handleClearAll = () => {
    clearFavorites();
    toast({
      title: "Избранное очищено",
      description: "Все товары удалены из избранного",
    });
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-gray-600 hover:text-[hsl(207,90%,54%)] flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Главная
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Избранное</span>
          </div>

          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Избранное пусто</h1>
            <p className="text-gray-600 mb-6">
              Добавляйте товары в избранное, нажимая на иконку сердечка на карточках товаров
            </p>
            <Link href="/catalog">
              <Button className="bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,48%)] text-white">
                Перейти к каталогу
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-gray-600 hover:text-[hsl(207,90%,54%)] flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Главная
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">Избранное</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500 fill-current" />
              Избранное ({favorites.length})
            </h1>
          </div>
          
          {favorites.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Очистить все
            </Button>
          )}
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative">
                <Link href={`/product/${item.slug || item.id}`}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                </Link>
                
                {/* Remove from favorites button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFromFavorites(item.id, item.name)}
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white text-red-500 hover:text-red-600 p-2 rounded-full"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </Button>
              </div>
              
              <div className="p-4">
                <Link href={`/product/${item.slug || item.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-3 hover:text-[hsl(207,90%,54%)] transition-colors cursor-pointer">
                    {item.name}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[hsl(207,90%,54%)]">
                    {parseInt(item.price).toLocaleString()} ₽
                  </span>
                  
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                    className="bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,48%)] text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    В корзину
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}