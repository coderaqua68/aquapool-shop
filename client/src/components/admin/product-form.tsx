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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { parseHTMLSpecs, convertSpecsToKeyValue, formatSpecsAsTable } from '@/lib/html-parser';

interface ProductFormProps {
  product?: any;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    description: "",
    shortDescription: "",
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
  const [htmlInput, setHtmlInput] = useState('');

  // Генерация автоматического артикула
  const generateSKU = () => {
    const brand = (formData.brand || "POOL").toUpperCase().substring(0, 4);
    const category = (formData.category || "GEN").toUpperCase().substring(0, 3);
    const timestamp = Date.now().toString().slice(-6);
    return `${brand}-${category}-${timestamp}`;
  };

  // Автоматическое извлечение характеристик из описания
  const extractSpecsFromDescription = (description: string) => {
    if (!description) return [];
    
    const specs: Array<{key: string, value: string}> = [];
    const lines = description.split('\n');
    
    for (const line of lines) {
      // Ищем строки с двоеточием (Размер: 488x122 см)
      const colonMatch = line.match(/^[•\-\d\.\s]*([^:]+):\s*(.+)$/);
      if (colonMatch) {
        const key = colonMatch[1].trim().replace(/^\*\*|\*\*$/g, '').replace(/^\*|\*$/g, '');
        const value = colonMatch[2].trim().replace(/^\*\*|\*\*$/g, '').replace(/^\*|\*$/g, '');
        if (key && value && key.length > 2 && value.length > 0) {
          specs.push({ key, value });
        }
      }
      
      // Ищем размеры в тексте
      const sizeMatch = line.match(/(\d+)\s*[xх×]\s*(\d+)(?:\s*[xх×]\s*(\d+))?\s*(см|м|мм)/i);
      if (sizeMatch && !specs.some(s => s.key.toLowerCase().includes('размер'))) {
        const size = sizeMatch[3] ? 
          `${sizeMatch[1]} × ${sizeMatch[2]} × ${sizeMatch[3]} ${sizeMatch[4]}` :
          `${sizeMatch[1]} × ${sizeMatch[2]} ${sizeMatch[4]}`;
        specs.push({ key: 'Размеры', value: size });
      }
      
      // Ищем объем
      const volumeMatch = line.match(/(\d+(?:\.\d+)?)\s*(л|литр|м³|куб)/i);
      if (volumeMatch && !specs.some(s => s.key.toLowerCase().includes('объем'))) {
        specs.push({ key: 'Объем', value: `${volumeMatch[1]} ${volumeMatch[2] === 'л' ? 'литров' : volumeMatch[2]}` });
      }
      
      // Ищем материал
      if (line.toLowerCase().includes('материал') || line.toLowerCase().includes('pvc') || line.toLowerCase().includes('винил')) {
        const materialMatch = line.match(/материал[:\-\s]*([\w\s,]+)/i);
        if (materialMatch && !specs.some(s => s.key.toLowerCase().includes('материал'))) {
          specs.push({ key: 'Материал', value: materialMatch[1].trim() });
        }
      }
      
      // Ищем толщину
      const thicknessMatch = line.match(/толщин[аеуы][:\-\s]*(\d+(?:\.\d+)?)\s*(мм|см)/i);
      if (thicknessMatch && !specs.some(s => s.key.toLowerCase().includes('толщин'))) {
        specs.push({ key: 'Толщина', value: `${thicknessMatch[1]} ${thicknessMatch[2]}` });
      }
    }
    
    return specs.slice(0, 8); // Максимум 8 характеристик
  };

  const categories = [
    { value: "frame-pools", label: "Каркасные бассейны" },
    { value: "inflatable-pools", label: "Надувные бассейны" },
    { value: "pumps-filters", label: "Насосы и фильтры" },
    { value: "ladders", label: "Лестницы" },
    { value: "covers", label: "Тенты и покрытия" },
    { value: "chemistry", label: "Химия для бассейнов" },
    { value: "accessories", label: "Аксессуары" }
  ];

  // Инициализация формы при редактировании
  useEffect(() => {
    if (product && product.id) {
      setFormData({
        sku: product.sku || "",
        name: product.name || "",
        description: product.description || "",
        shortDescription: product.shortDescription || "",
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
    } else {
      // Сброс формы для нового товара
      setFormData({
        sku: "",
        name: "",
        description: "",
        shortDescription: "",
        price: "",
        originalPrice: "",
        brand: "",
        category: "",
        subcategory: "",
        volume: "",
        imageUrl: "",
        images: [],
        specifications: "",
        inStock: true,
        isPopular: false,
        isNew: false,
        discount: 0,
        rating: "4.0",
        reviewCount: 0
      });
      setSpecificationsArray([]);
    }
  }, [product]);

  const saveMutation = useMutation({
    mutationFn: async (productData: any) => {
      const token = localStorage.getItem("adminToken");
      const url = product && product.id
        ? `/api/admin/products/${product.id}`
        : "/api/admin/products";
      
      const method = product && product.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": token || ""
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Не удалось сохранить товар");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Успешно",
        description: product && product.id ? "Товар обновлен" : "Товар добавлен",
      });
      onSave();
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    saveMutation.mutate(productData);
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
      setNewImage("");
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addSpecification = () => {
    setSpecificationsArray(prev => [...prev, { key: "", value: "" }]);
  };

  const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
    setSpecificationsArray(prev => 
      prev.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      )
    );
  };

  const removeSpecification = (index: number) => {
    setSpecificationsArray(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {product && product.id ? "Редактировать товар" : "Добавить новый товар"}
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
                <Label htmlFor="sku">Артикул</Label>
                <div className="flex space-x-2">
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                    placeholder="AUTO-GEN-123456"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormData(prev => ({ ...prev, sku: generateSKU() }))}
                    size="sm"
                  >
                    Авто
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Оставьте пустым для автоматической генерации
                </p>
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

          {/* Описания */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="shortDescription">Короткое описание</Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                placeholder="Краткое описание для отображения рядом с ценой..."
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                Форматирование: **жирный**, *курсив*, новые строки для абзацев
              </p>
            </div>
            
            <div>
              <Label htmlFor="description">Полное описание товара</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Подробное описание товара..."
                rows={6}
              />
              <div className="text-xs text-gray-500 mt-1">
                <p><strong>Форматирование:</strong></p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>**жирный** → <strong>жирный</strong></div>
                  <div>*курсив* → <em>курсив</em></div>
                  <div>- список → • список</div>
                  <div>1. номер → 1. номер</div>
                </div>
                <p className="mt-1">Пустая строка = новый абзац</p>
              </div>
            </div>
          </div>

          {/* Дополнительные изображения */}
          <div>
            <Label>Дополнительные изображения</Label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  type="url"
                />
                <Button type="button" onClick={addImage} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {formData.images.length > 0 && (
                <div className="space-y-2">
                  {formData.images.map((img, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1 text-sm">{img}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* HTML импорт характеристик */}
          <div className="space-y-4">
            <Label>Импорт характеристик из HTML</Label>
            <Textarea
              placeholder="Вставьте HTML код с характеристиками товара..."
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              rows={4}
              className="font-mono text-sm"
            />
            <div className="flex space-x-2">
              <Button 
                type="button" 
                onClick={() => {
                  if (htmlInput.trim()) {
                    const parsedSpecs = parseHTMLSpecs(htmlInput);
                    const convertedSpecs = convertSpecsToKeyValue(parsedSpecs);
                    setSpecificationsArray(prev => {
                      const newSpecs = [...prev];
                      convertedSpecs.forEach(spec => {
                        if (!newSpecs.some(existing => existing.key.toLowerCase() === spec.key.toLowerCase())) {
                          newSpecs.push(spec);
                        }
                      });
                      return newSpecs;
                    });
                    setHtmlInput('');
                    toast({
                      title: "Успешно!",
                      description: `Добавлено ${convertedSpecs.length} характеристик`,
                    });
                  }
                }} 
                size="sm" 
                variant="default"
                disabled={!htmlInput.trim()}
              >
                📋 Импортировать из HTML
              </Button>
              <Button 
                type="button" 
                onClick={() => {
                  if (htmlInput.trim()) {
                    const parsedSpecs = parseHTMLSpecs(htmlInput);
                    const tableFormat = formatSpecsAsTable(parsedSpecs);
                    setFormData(prev => ({ 
                      ...prev, 
                      shortDescription: tableFormat 
                    }));
                    toast({
                      title: "Добавлено!",
                      description: "Характеристики добавлены в короткое описание как таблица",
                    });
                  }
                }} 
                size="sm" 
                variant="secondary"
                disabled={!htmlInput.trim()}
              >
                📊 В короткое описание
              </Button>
            </div>
          </div>

          <Separator />

          {/* Характеристики */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Характеристики товара</Label>
              <div className="flex space-x-2">
                <Button type="button" onClick={addSpecification} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              {specificationsArray.map((spec, index) => (
                <div key={index} className="grid grid-cols-5 gap-2 items-center">
                  <Input
                    placeholder="Название"
                    value={spec.key}
                    onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                  />
                  <div className="col-span-3">
                    <Input
                      placeholder="Значение"
                      value={spec.value}
                      onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSpecification(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Кнопки действий */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Отмена
            </Button>
            <Button type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "Сохраняем..." : "Сохранить товар"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}