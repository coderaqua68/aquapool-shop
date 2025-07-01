import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Edit2, Trash2, Eye, Package, Plus, Search, Filter, X, ImageIcon } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Product, Category } from "@shared/schema";

interface ProductsListProps {
  onEdit: (product: Product) => void;
}

export default function ProductsList({ onEdit }: ProductsListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Состояние фильтров
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Состояние для диалога замены фотографии
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newImageUrl, setNewImageUrl] = useState("");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Получаем уникальные бренды из товаров
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach(product => {
      if (product.brand) {
        brands.add(product.brand);
      }
    });
    return Array.from(brands).sort();
  }, [products]);

  // Фильтрованные товары
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Поиск по названию
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Фильтр по категории
      if (selectedCategory && selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // Фильтр по бренду
      if (selectedBrand && selectedBrand !== "all" && product.brand !== selectedBrand) {
        return false;
      }

      // Фильтр по статусу
      if (selectedStatus && selectedStatus !== "all") {
        switch (selectedStatus) {
          case "in-stock":
            if (!product.inStock) return false;
            break;
          case "out-of-stock":
            if (product.inStock) return false;
            break;
          case "popular":
            if (!product.isPopular) return false;
            break;
          case "new":
            if (!product.isNew) return false;
            break;
          case "discounted":
            if (!product.originalPrice || parseInt(product.originalPrice) <= parseInt(product.price)) return false;
            break;
        }
      }

      return true;
    });
  }, [products, searchTerm, selectedCategory, selectedBrand, selectedStatus]);

  // Функция очистки фильтров
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSelectedStatus("all");
  };

  // Проверяем, есть ли активные фильтры
  const hasActiveFilters = searchTerm || 
    (selectedCategory && selectedCategory !== "all") || 
    (selectedBrand && selectedBrand !== "all") || 
    (selectedStatus && selectedStatus !== "all");

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

  // Mutation для обновления изображения товара
  const updateImageMutation = useMutation({
    mutationFn: async ({ productId, imageUrl }: { productId: number; imageUrl: string }) => {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token || ""
        },
        body: JSON.stringify({ imageUrl })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Ошибка при обновлении изображения");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Успешно",
        description: "Фотография товара обновлена",
      });
      setImageDialogOpen(false);
      setNewImageUrl("");
      setSelectedProduct(null);
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

  const handleUpdateImage = () => {
    if (!selectedProduct || !newImageUrl.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите ссылку на изображение",
        variant: "destructive",
      });
      return;
    }

    updateImageMutation.mutate({
      productId: selectedProduct.id,
      imageUrl: newImageUrl.trim()
    });
  };

  const openImageDialog = (product: Product) => {
    setSelectedProduct(product);
    setNewImageUrl(product.imageUrl || "");
    setImageDialogOpen(true);
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
      <div className="space-y-6">
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Заголовок и кнопка добавления */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>
                Список товаров ({filteredProducts.length}
                {filteredProducts.length !== products.length && ` из ${products.length}`})
              </span>
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

      {/* Панель фильтров */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Фильтры</span>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="ml-auto text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4 mr-1" />
                Очистить
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Поиск */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Поиск по названию</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Введите название товара..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Категория */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Категория</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Все категории" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.slug} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Бренд */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Бренд</label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Все бренды" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все бренды</SelectItem>
                  {availableBrands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Статус */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Статус</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Все статусы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="in-stock">В наличии</SelectItem>
                  <SelectItem value="out-of-stock">Нет в наличии</SelectItem>
                  <SelectItem value="popular">Популярные</SelectItem>
                  <SelectItem value="new">Новинки</SelectItem>
                  <SelectItem value="discounted">Со скидкой</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Результаты фильтрации */}
      {filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {hasActiveFilters ? "Товары не найдены" : "Пока нет товаров"}
            </h3>
            <p className="text-gray-500 mb-4">
              {hasActiveFilters
                ? "Попробуйте изменить условия фильтрации"
                : "Начните добавлять товары в ваш каталог"}
            </p>
            {hasActiveFilters ? (
              <Button onClick={clearFilters} variant="outline">
                Сбросить фильтры
              </Button>
            ) : (
              <Button onClick={() => onEdit(null as any)}>
                <Plus className="w-4 h-4 mr-2" />
                Добавить первый товар
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
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
                  <div className="flex flex-col space-y-2 pt-2">
                    <div className="flex space-x-2">
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
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openImageDialog(product)}
                      className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <ImageIcon className="w-4 h-4 mr-1" />
                      Сменить фото
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Диалог замены фотографии */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Сменить фотографию товара</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedProduct && (
              <div className="text-sm text-gray-600">
                <strong>Товар:</strong> {selectedProduct.name}
              </div>
            )}
            
            {/* Текущее изображение */}
            {selectedProduct?.imageUrl && (
              <div className="space-y-2">
                <Label>Текущее изображение:</Label>
                <div className="relative">
                  <img 
                    src={selectedProduct.imageUrl} 
                    alt="Текущее изображение"
                    className="w-full h-32 object-cover border rounded-lg"
                  />
                </div>
              </div>
            )}
            
            {/* Новое изображение */}
            <div className="space-y-2">
              <Label htmlFor="new-image-url">Новая ссылка на изображение:</Label>
              <Input
                id="new-image-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
            </div>
            
            {/* Превью нового изображения */}
            {newImageUrl && newImageUrl !== selectedProduct?.imageUrl && (
              <div className="space-y-2">
                <Label>Предварительный просмотр:</Label>
                <div className="relative">
                  <img 
                    src={newImageUrl} 
                    alt="Превью нового изображения"
                    className="w-full h-32 object-cover border rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
            
            {/* Кнопки действий */}
            <div className="flex space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setImageDialogOpen(false)}
                className="flex-1"
                disabled={updateImageMutation.isPending}
              >
                Отмена
              </Button>
              <Button
                onClick={handleUpdateImage}
                disabled={updateImageMutation.isPending || !newImageUrl.trim()}
                className="flex-1"
              >
                {updateImageMutation.isPending ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}