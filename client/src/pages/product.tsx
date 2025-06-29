import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FormattedText } from "@/components/ui/formatted-text";
import { Heart, Star, Truck, Shield, ArrowLeft, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Link } from "wouter";
import OneClickOrderModal from "@/components/modals/one-click-order-modal";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export default function ProductPage() {
  const params = useParams<{ identifier: string }>();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isOneClickModalOpen, setIsOneClickModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${params.identifier}`],
  });

  const { data: relatedProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products", { category: product?.category }],
    enabled: !!product?.category,
  });

  const handleAddToCart = () => {
    if (product) {
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
    }
  };

  const handleWhatsAppClick = () => {
    if (product) {
      const currentUrl = window.location.href;
      const message = `Здравствуйте! Интересует товар:\n${product.name}\nАртикул: ${product.sku}\nСсылка: ${currentUrl}`;
      const phoneNumber = "79285668729"; // Номер без символов
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-96 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Товар не найден</h1>
        <Link href="/catalog">
          <Button>Вернуться в каталог</Button>
        </Link>
      </div>
    );
  }

  const specifications = JSON.parse(product.specifications);
  const related = relatedProducts.filter(p => p.id !== product.id).slice(0, 4);
  
  // Создаем полную галерею изображений
  const allImages = product.imageUrl ? 
    [product.imageUrl, ...(product.images || [])] : 
    (product.images || []);
  
  // Автоматический расчет скидки если не указана
  const calculatedDiscount = product.originalPrice && product.price
    ? Math.round(((parseInt(product.originalPrice) - parseInt(product.price)) / parseInt(product.originalPrice)) * 100)
    : 0;
  
  const actualDiscount = (product.discount && product.discount > 0) ? product.discount : calculatedDiscount;

  // Функция для получения названия категории
  const getCategoryName = (categorySlug: string) => {
    const categoryMap: { [key: string]: string } = {
      "frame-pools": "Каркасные бассейны",
      "inflatable-pools": "Надувные бассейны", 
      "pumps-filters": "Насосы и фильтры",
      "ladders": "Лестницы",
      "covers": "Тенты и покрытия",
      "chemistry": "Химия для бассейнов",
      "accessories": "Аксессуары",
      "lighting": "Освещение",
      "heating": "Подогрев",
      "cleaning": "Очистка",
      "above-ground": "Наземные бассейны",
      "spas": "СПА и джакузи"
    };
    return categoryMap[categorySlug] || categorySlug;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[hsl(207,90%,54%)]">Главная</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-[hsl(207,90%,54%)]">Каталог</Link>
        <span>/</span>
        <Link href={`/catalog?category=${product.category}`} className="hover:text-[hsl(207,90%,54%)]">
          {getCategoryName(product.category)}
        </Link>
        {product.subcategory && (
          <>
            <span>/</span>
            <Link href={`/catalog?category=${product.category}&subcategory=${product.subcategory}`} className="hover:text-[hsl(207,90%,54%)]">
              {product.subcategory}
            </Link>
          </>
        )}
        {product.brand && (
          <>
            <span>/</span>
            <Link href={`/catalog?brand=${product.brand}`} className="hover:text-[hsl(207,90%,54%)]">
              {product.brand}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images Gallery */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={allImages.length > 0 ? allImages[selectedImageIndex] : product.imageUrl}
              alt={product.name}
              className="w-full h-96 object-contain bg-gray-50 rounded-lg"
            />
            
            {/* Navigation arrows for multiple images */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : allImages.length - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev < allImages.length - 1 ? prev + 1 : 0)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            
            {/* Badges */}
            {(
              (actualDiscount || 0) > 0 ||
              product.isNew ||
              (product.isPopular && !product.isNew && (actualDiscount || 0) <= 0)
            ) && (
              <div className="absolute top-4 left-4 space-y-2">
                {(actualDiscount || 0) > 0 && (
                  <Badge className="bg-red-500 text-white">
                    -{actualDiscount}%
                  </Badge>
                )}
                {product.isNew && (
                  <Badge className="bg-green-500 text-white">
                    NEW
                  </Badge>
                )}
                {product.isPopular && !product.isNew && (actualDiscount || 0) <= 0 && (
                  <Badge className="bg-[hsl(207,90%,54%)] text-white">
                    ХИТ
                  </Badge>
                )}
              </div>
            )}

            {/* Image counter */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {selectedImageIndex + 1} / {allImages.length}
              </div>
            )}
          </div>

          {/* Thumbnail gallery */}
          {allImages.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                    selectedImageIndex === index ? 'border-[hsl(207,90%,54%)]' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - фото ${index + 1}`}
                    className="w-full h-full object-contain bg-gray-50"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          </div>

          {/* Rating */}
          {(product.reviewCount || 0) > 0 && (
            <div className="flex items-center space-x-2">
              <div className="flex">
                {renderRating(product.rating || "0")}
              </div>
              <span className="text-gray-500">({product.reviewCount} отзывов)</span>
            </div>
          )}

          {/* SKU and Short Description */}
          <div className="space-y-3">
            {product.sku && (
              <div className="text-sm text-gray-500">
                <span className="font-medium">Артикул:</span> {product.sku}
              </div>
            )}
            
            {product.shortDescription && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <FormattedText text={product.shortDescription} />
              </div>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-[hsl(207,90%,54%)]">
                {parseInt(product.price).toLocaleString()} ₽
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {parseInt(product.originalPrice).toLocaleString()} ₽
                </span>
              )}
            </div>
            {(actualDiscount || 0) > 0 && product.originalPrice && (
              <p className="text-green-600 font-medium">
                Экономия: {(parseInt(product.originalPrice) - parseInt(product.price)).toLocaleString()} ₽ ({actualDiscount}%)
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
              {product.inStock ? 'В наличии' : 'Нет в наличии'}
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)] text-white"
                size="lg"
                disabled={!product.inStock}
              >
                Добавить в корзину
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="w-full" 
                size="lg"
                onClick={() => setIsOneClickModalOpen(true)}
              >
                Купить в 1 клик
              </Button>
              <Button 
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                size="lg"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Написать в WhatsApp
              </Button>
            </div>
          </div>

          {/* Delivery Info */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">🎉 Бесплатная доставка до 31 июля</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[hsl(207,90%,54%)]" />
                  <span className="text-sm">Гарантия качества</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Описание</TabsTrigger>
          <TabsTrigger value="specifications">Характеристики</TabsTrigger>
          <TabsTrigger value="composition">Комплектация</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Описание товара</h3>
              <FormattedText text={product.description} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Технические характеристики</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="font-medium">{key}:</span>
                    <span className="text-gray-600">{value as string}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="composition" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Комплектация товара</h3>
              {product.composition ? (
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.composition }}
                />
              ) : (
                <p className="text-gray-600">Информация о комплектации будет добавлена</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Похожие товары</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Link href={`/product/${relatedProduct.id}`}>
                  <img
                    src={relatedProduct.imageUrl}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform"
                  />
                </Link>
                <div className="p-4">
                  <Link href={`/product/${relatedProduct.id}`}>
                    <h3 className="font-medium text-gray-900 mb-2 hover:text-[hsl(207,90%,54%)] transition-colors">
                      {relatedProduct.name}
                    </h3>
                  </Link>
                  <p className="text-xl font-bold text-[hsl(207,90%,54%)]">
                    {parseInt(relatedProduct.price).toLocaleString()} ₽
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* One Click Order Modal */}
      {product && (
        <OneClickOrderModal
          isOpen={isOneClickModalOpen}
          onClose={() => setIsOneClickModalOpen(false)}
          product={product}
        />
      )}
    </div>
  );
}
