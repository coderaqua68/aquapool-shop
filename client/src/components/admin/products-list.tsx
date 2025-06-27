import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Edit2, Trash2, Eye, Package } from "lucide-react";
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
        <CardContent className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-[hsl(207,90%,54%)] border-t-transparent rounded-full animate-spin"></div>
        </CardContent>
      </Card>
    );
  }

  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Товары не найдены</h3>
          <p className="text-gray-600 mb-6">
            Начните добавлять товары в ваш каталог
          </p>
          <Button className="bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)]">
            Добавить первый товар
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
            <span>Управление товарами</span>
            <Badge variant="secondary">{products.length} товаров</Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {/* Изображение товара */}
                <div className="flex-shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg bg-gray-100"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/96x96?text=No+Image";
                    }}
                  />
                </div>

                {/* Информация о товаре */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-4 mb-2">
                        <Badge variant="outline">
                          {product.category === "frame-pools" && "Каркасные бассейны"}
                          {product.category === "inflatable-pools" && "Надувные бассейны"}
                          {product.category === "pumps-filters" && "Насосы и фильтры"}
                          {product.category === "ladders" && "Лестницы"}
                          {product.category === "covers-underlays" && "Тенты и подстилки"}
                          {product.category === "chemicals" && "Химия для бассейнов"}
                          {product.category === "accessories" && "Аксессуары"}
                        </Badge>
                        
                        {product.brand && (
                          <Badge variant="secondary">{product.brand}</Badge>
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
                        
                        <Badge variant={product.inStock ? "default" : "destructive"}>
                          {product.inStock ? "В наличии" : "Нет в наличии"}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>ID: {product.id}</span>
                        {product.volume && <span>Объем: {product.volume}</span>}
                        <span>Рейтинг: {product.rating}</span>
                      </div>
                    </div>

                    {/* Цена */}
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-gray-900">
                        {parseInt(product.price).toLocaleString()} ₽
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {parseInt(product.originalPrice).toLocaleString()} ₽
                        </div>
                      )}
                      {product.discount > 0 && (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-200 mt-1">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Действия */}
                  <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/product/${product.id}`, '_blank')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Просмотр
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(product)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Редактировать
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product)}
                      disabled={deleteMutation.isPending}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {deleteMutation.isPending ? "Удаление..." : "Удалить"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}