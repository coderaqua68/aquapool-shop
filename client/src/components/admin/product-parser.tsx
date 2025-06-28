import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Play, Eye, Plus, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ParsedProduct {
  name: string;
  sku: string;
  description: string;
  shortDescription: string;
  brand: string;
  category: string;
  volume: string;
  specifications: string;
  [key: string]: any;
}

interface ParseResult {
  success: boolean;
  products: ParsedProduct[];
  errors: Array<{ url: string; error: string }>;
}

export function ProductParser() {
  const [urls, setUrls] = useState("");
  const [isParsingNow, setIsParsingNow] = useState(false);
  const [parseResults, setParseResults] = useState<ParseResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { toast } = useToast();

  // Загрузка категорий при монтировании компонента
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const categoriesData = await response.json();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleParse = async () => {
    const urlList = urls.split('\n').filter(url => url.trim()).map(url => url.trim());
    
    if (urlList.length === 0) {
      toast({
        title: "Ошибка",
        description: "Добавьте хотя бы один URL товара",
        variant: "destructive",
      });
      return;
    }

    setIsParsingNow(true);
    setProgress(0);
    setParseResults(null);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch('/api/admin/parse-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token || '',
        },
        credentials: 'include',
        body: JSON.stringify({ urls: urlList }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const result = await response.json();
      setParseResults(result);
      
      toast({
        title: "Парсинг завершен",
        description: `Обработано ${result.products.length} товаров, ошибок: ${result.errors.length}`,
      });

    } catch (error) {
      toast({
        title: "Ошибка парсинга",
        description: error instanceof Error ? error.message : "Неизвестная ошибка",
        variant: "destructive",
      });
    } finally {
      setIsParsingNow(false);
      setProgress(0);
      setCurrentUrl("");
    }
  };

  const handleImport = async () => {
    if (!parseResults?.products.length) return;
    
    if (!selectedCategory) {
      toast({
        title: "Выберите категорию",
        description: "Необходимо выбрать категорию для импортируемых товаров",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    try {
      const token = localStorage.getItem("adminToken");
      
      // Обновляем категорию для всех товаров
      const productsWithCategory = parseResults.products.map(product => ({
        ...product,
        category: selectedCategory
      }));
      
      const response = await fetch('/api/admin/import-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token || '',
        },
        credentials: 'include',
        body: JSON.stringify({ products: productsWithCategory }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка импорта: ${response.status}`);
      }

      const result = await response.json();
      
      toast({
        title: "Товары добавлены",
        description: `Импортировано ${result.imported} товаров`,
      });

      // Очищаем результаты после успешного импорта
      setParseResults(null);
      setUrls("");

    } catch (error) {
      toast({
        title: "Ошибка импорта",
        description: error instanceof Error ? error.message : "Неизвестная ошибка",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const ProductPreview = ({ product }: { product: ParsedProduct }) => {
    const specs = JSON.parse(product.specifications || '{}');
    
    return (
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge variant="secondary">Артикул: {product.sku}</Badge>
                <Badge variant="outline">{product.brand}</Badge>
                <Badge variant="outline">{product.volume}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Краткое описание:</p>
              <p className="text-sm">{product.shortDescription}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground font-medium">Цена:</p>
              <div className="flex gap-2 items-center">
                <span className="text-lg font-bold text-green-600">{product.price} руб.</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">{product.originalPrice} руб.</span>
                )}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground font-medium">Описание:</p>
              <div 
                className="text-sm prose prose-sm max-w-none" 
                dangerouslySetInnerHTML={{ __html: product.description }} 
              />
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground font-medium">Основные характеристики:</p>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {Object.entries(specs).slice(0, 8).map(([key, value]) => (
                  <div key={key} className="text-xs">
                    <span className="text-muted-foreground">{key}:</span> {value as string}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Парсер товаров
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Автоматическое извлечение данных товаров с сайта intex-bassein.ru
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ввод URL */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Ссылки на товары (по одной на строку):
          </label>
          <Textarea
            placeholder={`https://intex-bassein.ru/catalog/product-1/
https://intex-bassein.ru/catalog/product-2/
https://intex-bassein.ru/catalog/product-3/`}
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            rows={6}
            className="font-mono text-sm"
            disabled={isParsingNow}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Количество URL: {urls.split('\n').filter(url => url.trim()).length}
          </p>
        </div>

        {/* Выбор категории для импорта */}
        {parseResults && (
          <div>
            <label className="text-sm font-medium mb-2 block">
              Выберите категорию для товаров:
            </label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите категорию..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Все товары будут добавлены в выбранную категорию
            </p>
          </div>
        )}

        {/* Прогресс парсинга */}
        {isParsingNow && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Парсинг товаров...</span>
            </div>
            {currentUrl && (
              <p className="text-xs text-muted-foreground truncate">
                Обрабатываю: {currentUrl}
              </p>
            )}
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {/* Кнопки */}
        <div className="flex gap-2">
          <Button 
            onClick={handleParse} 
            disabled={isParsingNow || !urls.trim()}
            className="flex items-center gap-2"
          >
            {isParsingNow ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isParsingNow ? "Парсинг..." : "Начать парсинг"}
          </Button>

          {parseResults && (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Просмотр ({parseResults.products.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>Предварительный просмотр товаров</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[60vh]">
                    <div className="space-y-4">
                      {parseResults.products.map((product, index) => (
                        <ProductPreview key={index} product={product} />
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>

              <Button 
                onClick={handleImport}
                disabled={isImporting}
                className="flex items-center gap-2"
              >
                {isImporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {isImporting ? "Добавление..." : "Добавить товары"}
              </Button>
            </>
          )}
        </div>

        {/* Результаты */}
        {parseResults && (
          <div className="space-y-3">
            <div className="flex gap-4 text-sm">
              <span className="text-green-600">
                ✓ Успешно: {parseResults.products.length}
              </span>
              {parseResults.errors.length > 0 && (
                <span className="text-red-600">
                  ✗ Ошибок: {parseResults.errors.length}
                </span>
              )}
            </div>

            {parseResults.errors.length > 0 && (
              <Card className="border-red-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    Ошибки парсинга
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-xs">
                    {parseResults.errors.map((error, index) => (
                      <div key={index} className="text-red-600">
                        <span className="font-mono">{error.url}</span>
                        <br />
                        <span className="text-red-500">{error.error}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Инструкция */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <div className="text-sm space-y-2">
              <p className="font-medium text-blue-800">Как использовать:</p>
              <ol className="list-decimal list-inside space-y-1 text-blue-700">
                <li>Вставьте ссылки на товары с сайта intex-bassein.ru</li>
                <li>Нажмите "Начать парсинг" и дождитесь завершения</li>
                <li>Нажмите "Просмотр" чтобы увидеть результат</li>
                <li>Выберите категорию для товаров</li>
                <li>Нажмите "Добавить товары" для импорта в выбранную категорию</li>
              </ol>
              <p className="text-xs text-blue-600 mt-2">
                Изображения и цены нужно будет добавить вручную после импорта
              </p>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}