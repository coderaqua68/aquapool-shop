import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { X, Plus } from "lucide-react";

interface ProductFormProps {
  product?: any;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    brand: "",
    category: "",
    subcategory: "",
    volume: "",
    imageUrl: "",
    images: [] as string[],
    specifications: "",
    inStock: true,
    isPopular: false,
    isNew: false,
    discount: 0,
    rating: "4.0",
    reviewCount: 0
  });

  const [newImage, setNewImage] = useState("");
  const [specificationsArray, setSpecificationsArray] = useState<Array<{key: string, value: string}>>([]);

  const categories = [
    { value: "frame-pools", label: "Каркасные бассейны" },
    { value: "inflatable-pools", label: "Надувные бассейны" },
    { value: "pumps-filters", label: "Насосы и фильтры" },
    { value: "ladders", label: "Лестницы" },
    { value: "covers-underlays", label: "Тенты и подстилки" },
    { value: "chemicals", label: "Химия для бассейнов" },
    { value: "accessories", label: "Аксессуары" }
  ];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        originalPrice: product.originalPrice || "",
        brand: product.brand || "",
        category: product.category || "",
        subcategory: product.subcategory || "",
        volume: product.volume || "",
        imageUrl: product.imageUrl || "",
        images: product.images || [],
        specifications: product.specifications || "",
        inStock: product.inStock !== undefined ? product.inStock : true,
        isPopular: product.isPopular || false,
        isNew: product.isNew || false,
        discount: product.discount || 0,
        rating: product.rating || "4.0",
        reviewCount: product.reviewCount || 0
      });

      // Парсим характеристики
      try {
        const specs = JSON.parse(product.specifications || "{}");
        const specsArray = Object.entries(specs).map(([key, value]) => ({
          key,
          value: String(value)
        }));
        setSpecificationsArray(specsArray);
      } catch {
        setSpecificationsArray([]);
      }
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Собираем характеристики в JSON
      const specifications = specificationsArray.reduce((acc, spec) => {
        if (spec.key.trim() && spec.value.trim()) {
          acc[spec.key.trim()] = spec.value.trim();
        }
        return acc;
      }, {} as Record<string, string>);

      const productData = {
        ...formData,
        specifications: JSON.stringify(specifications),
        price: formData.price.toString(),
        originalPrice: formData.originalPrice || null,
        brand: formData.brand || null,
        subcategory: formData.subcategory || null,
        volume: formData.volume || null,
        images: formData.images.length > 0 ? formData.images : null
      };

      const token = localStorage.getItem("adminToken");
      const url = product 
        ? `/api/admin/products/${product.id}`
        : "/api/admin/products";
      
      const method = product ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": token || ""
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        onSave();
      } else {
        const error = await response.json();
        toast({
          title: "Ошибка",
          description: error.message || "Не удалось сохранить товар",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить данные",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {product ? "Редактировать товар" : "Добавить новый товар"}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Основная информация */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Название товара *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Каркасный бассейн Ultra Frame 457x122"
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">Цена *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="25990"
                  required
                />
              </div>

              <div>
                <Label htmlFor="originalPrice">Первоначальная цена</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                  placeholder="29990"
                />
              </div>

              <div>
                <Label htmlFor="brand">Бренд</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  placeholder="Intex"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Категория *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="imageUrl">Главное изображение *</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: checked }))}
                />
                <Label htmlFor="inStock">В наличии</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isPopular"
                  checked={formData.isPopular}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPopular: checked }))}
                />
                <Label htmlFor="isPopular">Популярный товар</Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Описание */}
          <div>
            <Label htmlFor="description">Описание товара *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Подробное описание товара..."
              className="min-h-32"
              required
            />
          </div>

          <Separator />

          {/* Характеристики */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Характеристики</Label>
              <Button 
                type="button" 
                onClick={() => setSpecificationsArray(prev => [...prev, { key: "", value: "" }])} 
                variant="outline" 
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Добавить
              </Button>
            </div>
            
            {specificationsArray.map((spec, index) => (
              <div key={index} className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Название характеристики"
                  value={spec.key}
                  onChange={(e) => {
                    const newSpecs = [...specificationsArray];
                    newSpecs[index] = { ...newSpecs[index], key: e.target.value };
                    setSpecificationsArray(newSpecs);
                  }}
                />
                <div className="flex space-x-2">
                  <Input
                    placeholder="Значение"
                    value={spec.value}
                    onChange={(e) => {
                      const newSpecs = [...specificationsArray];
                      newSpecs[index] = { ...newSpecs[index], value: e.target.value };
                      setSpecificationsArray(newSpecs);
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSpecificationsArray(prev => prev.filter((_, i) => i !== index))}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Кнопки */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Отмена
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)]"
            >
              {isLoading ? "Сохранение..." : (product ? "Обновить" : "Создать")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}