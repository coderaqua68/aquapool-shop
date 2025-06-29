import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingBag, 
  Plus, 
  LogOut, 
  Edit, 
  Trash2,
  Package,
  TrendingUp,
  Settings
} from "lucide-react";
import ProductForm from "@/components/admin/product-form";
import ProductsList from "@/components/admin/products-list";
import { ProductParser } from "@/components/admin/product-parser";
import SiteSettings from "@/components/admin/site-settings";
import type { Product, Category } from "@shared/schema";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);
  const { toast } = useToast();

  // Получаем статистику
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Вычисляем статистику
  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.inStock).length;
  const totalCategories = categories.length;
  const popularProducts = products.filter(p => p.isPopular).length;

  useEffect(() => {
    // Проверяем авторизацию
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin/login");
      return;
    }
    setIsAuthenticated(true);
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast({
      title: "Выход выполнен",
      description: "Вы вышли из админ панели",
    });
    setLocation("/admin/login");
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setActiveTab("add-product");
  };

  const handleProductSaved = () => {
    setEditingProduct(null);
    setActiveTab("products");
    toast({
      title: "Успешно",
      description: editingProduct ? "Товар обновлен" : "Товар добавлен",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-[hsl(207,90%,54%)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-[hsl(207,90%,54%)] mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Админ панель</h1>
                <p className="text-sm text-gray-500">AquaPool - Управление товарами</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Выйти</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Статистика</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Товары</span>
            </TabsTrigger>
            <TabsTrigger value="add-product" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>{editingProduct ? "Редактировать" : "Добавить товар"}</span>
            </TabsTrigger>
            <TabsTrigger value="parser" className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>Парсер</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Настройки</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего товаров</CardTitle>
                  <Package className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalProducts}</div>
                  <p className="text-xs text-muted-foreground">
                    {totalProducts === 0 ? "Начните добавлять товары" : "товаров в каталоге"}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">В наличии</CardTitle>
                  <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inStockProducts}</div>
                  <p className="text-xs text-muted-foreground">
                    товаров доступно для продажи
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Категории</CardTitle>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCategories}</div>
                  <p className="text-xs text-muted-foreground">
                    категорий товаров
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Популярные</CardTitle>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{popularProducts}</div>
                  <p className="text-xs text-muted-foreground">
                    популярных товаров
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products List */}
          <TabsContent value="products" className="space-y-6">
            <ProductsList onEdit={handleEditProduct} />
          </TabsContent>

          {/* Add/Edit Product */}
          <TabsContent value="add-product" className="space-y-6">
            <ProductForm 
              product={editingProduct}
              onSave={handleProductSaved}
              onCancel={() => {
                setEditingProduct(null);
                setActiveTab("products");
              }}
            />
          </TabsContent>

          {/* Product Parser */}
          <TabsContent value="parser" className="space-y-6">
            <ProductParser />
          </TabsContent>

          {/* Site Settings */}
          <TabsContent value="settings" className="space-y-6">
            <SiteSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}