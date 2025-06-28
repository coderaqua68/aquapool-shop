import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Edit2, Trash2, Eye, Package, Plus } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductsListProps {
  onEdit: (product: Product) => void;
}

export default function ProductsList({ onEdit }: ProductsListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (productId: number) => {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Authorization": token || ""
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Ошибка при удалении товара");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Успешно",
        description: "Товар удален",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleDelete = (product: Product) => {
    if (confirm(`Вы уверены, что хотите удалить товар "${product.name}"?`)) {
      deleteMutation.mutate(product.id);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-[hsl(207,90%,54%)] border-t-transparent rounded-full animate-spin"></div>
        </CardContent>
      </Card>
    );
  }

  if (products.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Список товаров</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Пока нет товаров
          </h3>
          <p className="text-gray-500 mb-4">
            Начните добавлять товары в ваш каталог
          </p>
          <Button
            onClick={() => onEdit(null as any)}
            className="inline-flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить первый товар</span>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Список товаров ({products.length})</span>
            </div>
            <Button
              onClick={() => onEdit(null as any)}
              className="inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Добавить товар</span>
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Изображение товара */}
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/300/300';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <Package className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                
                {/* Статусы товара */}
                <div className="absolute top-2 left-2 space-y-1">
                  {!product.inStock && (
                    <Badge variant="destructive">Нет в наличии</Badge>
                  )}
                  {product.isPopular && (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                      Популярный
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      Новинка
                    </Badge>
                  )}
                </div>
              </div>

              {/* Информация о товаре */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  {product.brand && (
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  )}
                </div>

                {/* Категория */}
                <div>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>

                {/* Цена */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg text-[hsl(207,90%,54%)]">
                      {parseInt(product.price).toLocaleString()} ₽
                    </span>
                  </div>
                  {product.originalPrice && parseInt(product.originalPrice) > parseInt(product.price) && (
                    <div className="text-sm text-gray-500 line-through">
                      {parseInt(product.originalPrice).toLocaleString()} ₽
                    </div>
                  )}
                  {product.discount && product.discount > 0 && (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200 mt-1">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>

                {/* Дополнительная информация */}
                {product.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                )}

                {/* Характеристики (если есть) */}
                {product.specifications && (
                  <div className="text-xs text-gray-500">
                    {(() => {
                      try {
                        const specs = JSON.parse(product.specifications);
                        const specCount = Object.keys(specs).length;
                        return `${specCount} характеристик`;
                      } catch {
                        return '';
                      }
                    })()}
                  </div>
                )}

                {/* Кнопки действий */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`/product/${product.slug || product.id}`, '_blank')}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Просмотр
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(product)}
                    className="flex-1"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Изменить
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(product)}
                    disabled={deleteMutation.isPending}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}