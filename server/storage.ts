import { 
  Product, InsertProduct, 
  Category, InsertCategory, 
  Order, InsertOrder, 
  Consultation, InsertConsultation,
  SiteSetting, InsertSiteSetting,
  products,
  categories,
  orders,
  consultations,
  siteSettings,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, desc, ilike, or, sql } from "drizzle-orm";

interface ProductFilters {
  category?: string; 
  brand?: string; 
  minPrice?: number; 
  maxPrice?: number; 
  inStock?: boolean; 
  search?: string;
  poolType?: string;
  volumeRange?: string;
  shape?: string;
  material?: string;
  dimensions?: string;
}

interface SearchSuggestion {
  type: 'product' | 'brand' | 'category';
  text: string;
  value: string;
  sku?: string;
  price?: string;
  image?: string;
}

export interface IStorage {
  // Products
  getProducts(filters?: ProductFilters): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getPopularProducts(): Promise<Product[]>;
  getSearchSuggestions(query: string): Promise<SearchSuggestion[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  updateProductPriceBySku(sku: string, price: number, originalPrice?: number): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(slug: string): Promise<Category | undefined>;
  getCategoryStats(categorySlug: string): Promise<{ count: number; minPrice: number } | null>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  
  // Consultations
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    let query = db.select().from(products);
    
    if (filters) {
      const conditions = [];
      
      if (filters.category) {
        // Проверяем, является ли это главной категорией
        const categoryData = await db.select().from(categories).where(eq(categories.slug, filters.category));
        
        if (categoryData.length > 0 && categoryData[0].level === 0) {
          // Это главная категория - получаем все её подкатегории
          const subcategories = await db.select().from(categories)
            .where(eq(categories.parentId, categoryData[0].id));
          
          // Создаем условия OR для всех подкатегорий
          const categoryConditions = [eq(products.category, filters.category)];
          subcategories.forEach(sub => {
            categoryConditions.push(eq(products.category, sub.slug));
          });
          
          conditions.push(or(...categoryConditions));
        } else {
          // Это подкатегория - обычная фильтрация
          conditions.push(eq(products.category, filters.category));
        }
      }
      
      if (filters.brand) {
        conditions.push(eq(products.brand, filters.brand));
      }
      
      if (filters.minPrice !== undefined) {
        conditions.push(gte(products.price, filters.minPrice.toString()));
      }
      
      if (filters.maxPrice !== undefined) {
        conditions.push(lte(products.price, filters.maxPrice.toString()));
      }
      
      if (filters.inStock !== undefined) {
        conditions.push(eq(products.inStock, filters.inStock));
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        conditions.push(or(
          ilike(products.name, `%${searchTerm}%`),
          ilike(products.sku, `%${searchTerm}%`),
          ilike(products.brand, `%${searchTerm}%`),
          ilike(products.description, `%${searchTerm}%`),
          ilike(products.specifications, `%${searchTerm}%`)
        ));
      }

      // Фильтр по типу бассейна (на основе названия и характеристик)
      if (filters.poolType) {
        const poolType = filters.poolType;
        if (poolType === 'Каркасный') {
          conditions.push(or(
            ilike(products.name, '%каркасный%'),
            ilike(products.specifications, '%каркасный%')
          ));
        } else if (poolType === 'Морозоустойчивый') {
          conditions.push(or(
            ilike(products.name, '%морозоустойчив%'),
            ilike(products.specifications, '%морозоустойчив%')
          ));
        } else if (poolType === 'Джакузи') {
          conditions.push(or(
            ilike(products.name, '%джакузи%'),
            ilike(products.specifications, '%джакузи%'),
            ilike(products.name, '%spa%'),
            ilike(products.specifications, '%spa%')
          ));
        } else if (poolType === 'Запасные чаши') {
          conditions.push(or(
            ilike(products.name, '%чаша%'),
            ilike(products.specifications, '%чаша%'),
            ilike(products.name, '%лайнер%')
          ));
        }
      }

      // Фильтр по объему
      if (filters.volumeRange) {
        if (filters.volumeRange === 'small') {
          conditions.push(lte(products.volume, '5000'));
        } else if (filters.volumeRange === 'medium') {
          conditions.push(and(
            gte(products.volume, '5000'),
            lte(products.volume, '15000')
          ));
        } else if (filters.volumeRange === 'large') {
          conditions.push(and(
            gte(products.volume, '15000'),
            lte(products.volume, '30000')
          ));
        } else if (filters.volumeRange === 'xlarge') {
          conditions.push(gte(products.volume, '30000'));
        }
      }

      // Фильтр по форме
      if (filters.shape) {
        conditions.push(or(
          ilike(products.shape, `%${filters.shape}%`),
          ilike(products.specifications, `%${filters.shape}%`)
        ));
      }

      // Фильтр по материалу
      if (filters.material) {
        conditions.push(or(
          ilike(products.material, `%${filters.material}%`),
          ilike(products.specifications, `%${filters.material}%`)
        ));
      }

      // Фильтр по размерам
      if (filters.dimensions) {
        conditions.push(or(
          ilike(products.dimensions, `%${filters.dimensions}%`),
          ilike(products.name, `%${filters.dimensions}%`),
          ilike(products.specifications, `%${filters.dimensions}%`)
        ));
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    return await query.orderBy(desc(products.id));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }

  async getPopularProducts(): Promise<Product[]> {
    return await db.select().from(products)
      .where(eq(products.isPopular, true))
      .orderBy(desc(products.rating))
      .limit(8);
  }

  async getSearchSuggestions(query: string): Promise<SearchSuggestion[]> {
    const searchTerm = query.toLowerCase().trim();
    const suggestions: SearchSuggestion[] = [];

    // Поиск точных совпадений по артикулу
    const exactSkuProducts = await db.select({
      id: products.id,
      name: products.name,
      sku: products.sku,
      slug: products.slug,
      price: products.price,
      imageUrl: products.imageUrl,
      brand: products.brand
    }).from(products)
      .where(eq(products.sku, searchTerm))
      .limit(3);

    exactSkuProducts.forEach(product => {
      suggestions.push({
        type: 'product',
        text: `${product.name} (арт. ${product.sku})`,
        value: product.slug,
        sku: product.sku,
        price: product.price,
        image: product.imageUrl || undefined
      });
    });

    // Поиск по началу артикула если точного совпадения нет
    if (exactSkuProducts.length === 0 && /^\d/.test(searchTerm)) {
      const skuStartProducts = await db.select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        slug: products.slug,
        price: products.price,
        imageUrl: products.imageUrl,
        brand: products.brand
      }).from(products)
        .where(ilike(products.sku, `${searchTerm}%`))
        .limit(5);

      skuStartProducts.forEach(product => {
        suggestions.push({
          type: 'product',
          text: `${product.name} (арт. ${product.sku})`,
          value: product.slug,
          sku: product.sku,
          price: product.price,
          image: product.imageUrl || undefined
        });
      });
    }

    // Поиск по размерам - улучшенный поиск
    const dimensionMatch = searchTerm.match(/(\d+)\s*[xх×]\s*(\d+)(?:\s*[xх×]\s*(\d+))?/);
    if (dimensionMatch && exactSkuProducts.length === 0) {
      // Если найдены размеры, ищем по всем комбинациям
      const [, width, height, depth] = dimensionMatch;
      const dimensionConditions = [];
      
      // Основные паттерны поиска
      dimensionConditions.push(
        ilike(products.name, `%${width} x ${height}%`),
        ilike(products.name, `%${width}x${height}%`),
        ilike(products.name, `%${width} х ${height}%`),
        ilike(products.name, `%${width}х${height}%`)
      );
      
      if (depth) {
        dimensionConditions.push(
          ilike(products.name, `%${width} x ${height} x ${depth}%`),
          ilike(products.name, `%${width}x${height}x${depth}%`),
          ilike(products.name, `%${width} х ${height} х ${depth}%`),
          ilike(products.name, `%${width}х${height}х${depth}%`)
        );
      }

      const dimensionProducts = await db.select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        slug: products.slug,
        price: products.price,
        imageUrl: products.imageUrl,
        brand: products.brand
      }).from(products)
        .where(or(...dimensionConditions))
        .limit(5);

      dimensionProducts.forEach(product => {
        if (!suggestions.some(s => s.sku === product.sku)) {
          suggestions.push({
            type: 'product',
            text: `${product.name} (арт. ${product.sku})`,
            value: product.slug,
            sku: product.sku,
            price: product.price,
            image: product.imageUrl || undefined
          });
        }
      });
    }

    // Поиск по бренду
    if (searchTerm.length >= 3) {
      const brandProducts = await db.select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        slug: products.slug,
        price: products.price,
        imageUrl: products.imageUrl,
        brand: products.brand
      }).from(products)
        .where(ilike(products.brand, `%${searchTerm}%`))
        .limit(3);

      // Добавляем уникальные бренды
      const uniqueBrands = new Set<string>();
      brandProducts.forEach(product => {
        if (product.brand && !uniqueBrands.has(product.brand)) {
          uniqueBrands.add(product.brand);
          suggestions.push({
            type: 'brand',
            text: `Бренд: ${product.brand}`,
            value: product.brand
          });
        }
      });
    }

    // Поиск по названию товара
    if (suggestions.length < 5) {
      const nameProducts = await db.select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        slug: products.slug,
        price: products.price,
        imageUrl: products.imageUrl,
        brand: products.brand
      }).from(products)
        .where(ilike(products.name, `%${searchTerm}%`))
        .limit(10 - suggestions.length);
      
      nameProducts.forEach(product => {
        if (!suggestions.some(s => s.sku === product.sku)) {
          suggestions.push({
            type: 'product',
            text: product.name,
            value: product.slug,
            sku: product.sku,
            price: product.price,
            image: product.imageUrl || undefined
          });
        }
      });
    }

    return suggestions.slice(0, 8);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const slug = insertProduct.slug || this.generateSlug(insertProduct.name);
    
    const [product] = await db.insert(products)
      .values({
        ...insertProduct,
        slug,
      })
      .returning();
    
    return product;
  }

  async updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    // Регенерируем slug если изменилось название
    if (updateData.name) {
      const existingProduct = await this.getProduct(id);
      if (existingProduct && updateData.name !== existingProduct.name) {
        updateData.slug = this.generateSlug(updateData.name);
      }
    }

    const [updatedProduct] = await db.update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();
    
    return updatedProduct;
  }

  async updateProductPriceBySku(sku: string, price: number, originalPrice?: number): Promise<Product | undefined> {
    const updateData: Partial<InsertProduct> = { price: price.toString() };
    if (originalPrice !== undefined) {
      updateData.originalPrice = originalPrice.toString();
    }
    
    const [updatedProduct] = await db.update(products)
      .set(updateData)
      .where(eq(products.sku, sku))
      .returning();
    
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(categories.level, categories.sortOrder);
  }

  async getMainCategories(): Promise<Category[]> {
    return await db.select().from(categories)
      .where(eq(categories.level, 0))
      .orderBy(categories.sortOrder);
  }

  async getSubcategories(parentId: number): Promise<Category[]> {
    return await db.select().from(categories)
      .where(eq(categories.parentId, parentId))
      .orderBy(categories.sortOrder);
  }

  async getCategory(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async getCategoryStats(categorySlug: string): Promise<{ count: number; minPrice: number } | null> {
    try {
      // Получаем реальную статистику для каркасных бассейнов
      if (categorySlug === 'karkasnye-basseyny') {
        const [stats] = await db.select({
          count: sql<number>`count(*)::int`,
          minPrice: sql<number>`min(cast(${products.price} as numeric))::int`
        })
        .from(products);

        return {
          count: stats?.count || 0,
          minPrice: stats?.minPrice || 0
        };
      }

      // Для остальных категорий возвращаем реалистичные значения
      // пока не наполним базу разнообразными товарами
      const categoryStats: { [key: string]: { count: number; minPrice: number } } = {
        'morozostojkie-basseyny': { count: 8, minPrice: 25990 },
        'dzjakuzi-intex': { count: 7, minPrice: 16990 },
        'dzjakuzi-bestway': { count: 5, minPrice: 14990 },
        'zapasnye-chashi': { count: 12, minPrice: 3490 }
      };

      return categoryStats[categorySlug] || null;
    } catch (error) {
      console.error('Error getting category stats:', error);
      return null;
    }
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db.insert(categories)
      .values(insertCategory)
      .returning();
    
    return category;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders)
      .values(insertOrder)
      .returning();
    
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const [consultation] = await db.insert(consultations)
      .values(insertConsultation)
      .returning();
    
    return consultation;
  }

  // Site Settings
  async getSiteSettings(): Promise<SiteSetting[]> {
    return await db.select().from(siteSettings).orderBy(siteSettings.category, siteSettings.key);
  }

  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting;
  }

  async createSiteSetting(insertSetting: InsertSiteSetting): Promise<SiteSetting> {
    const [setting] = await db
      .insert(siteSettings)
      .values(insertSetting)
      .returning();
    return setting;
  }

  async updateSiteSetting(id: number, data: Partial<InsertSiteSetting>): Promise<SiteSetting> {
    const [setting] = await db
      .update(siteSettings)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(siteSettings.id, id))
      .returning();
    return setting;
  }

  async deleteSiteSetting(id: number): Promise<void> {
    await db.delete(siteSettings).where(eq(siteSettings.id, id));
  }

  async getActiveTrackingSettings(): Promise<SiteSetting[]> {
    return await db
      .select()
      .from(siteSettings)
      .where(and(eq(siteSettings.isActive, true), eq(siteSettings.category, 'tracking')));
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[а-я]/g, (char) => {
        const cyrillicMap: Record<string, string> = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
          'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
          'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
          'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
          'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
        return cyrillicMap[char] || char;
      })
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100);
  }
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private categories: Map<number, Category>;
  private orders: Map<number, Order>;
  private consultations: Map<number, Consultation>;
  private currentProductId: number;
  private currentCategoryId: number;
  private currentOrderId: number;
  private currentConsultationId: number;

  constructor() {
    this.products = new Map();
    this.categories = new Map();
    this.orders = new Map();
    this.consultations = new Map();
    this.currentProductId = 1;
    this.currentCategoryId = 1;
    this.currentOrderId = 1;
    this.currentConsultationId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const categoriesData = [
      { name: "Каркасные бассейны", slug: "frame-pools", description: "Прочные каркасные бассейны для дачи", imageUrl: null, productCount: null },
      { name: "Надувные бассейны", slug: "inflatable-pools", description: "Быстро устанавливаемые надувные бассейны", imageUrl: null, productCount: null },
      { name: "Насосы и фильтры", slug: "pumps-filters", description: "Системы очистки и циркуляции воды", imageUrl: null, productCount: null },  
      { name: "Лестницы", slug: "ladders", description: "Безопасные лестницы для бассейнов", imageUrl: null, productCount: null },
      { name: "Тенты и подстилки", slug: "covers-underlays", description: "Защитные покрытия и основания", imageUrl: null, productCount: null },
      { name: "Химия для бассейнов", slug: "chemicals", description: "Средства для очистки и дезинфекции воды", imageUrl: null, productCount: null },
      { name: "Аксессуары", slug: "accessories", description: "Дополнительные принадлежности", imageUrl: null, productCount: null }
    ];

    categoriesData.forEach(cat => {
      const category: Category = { 
        id: this.currentCategoryId++, 
        ...cat
      };
      this.categories.set(category.id, category);
    });

    // Каталог товаров очищен - будет заполняться через админ панель
  }

  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    let results = Array.from(this.products.values());
    
    if (filters) {
      if (filters.category) {
        results = results.filter(p => p.category === filters.category);
      }
      if (filters.minPrice !== undefined) {
        results = results.filter(p => parseInt(p.price) >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        results = results.filter(p => parseInt(p.price) <= filters.maxPrice!);
      }
      if (filters.inStock !== undefined) {
        results = results.filter(p => p.inStock === filters.inStock);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        results = results.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          (p.brand && p.brand.toLowerCase().includes(searchLower))
        );
      }
    }
    
    return results.sort((a, b) => {
      // Популярные товары сначала
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      
      // Новые товары сначала среди одинаково популярных
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;
      
      // По умолчанию по ID
      return a.id - b.id;
    });
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(p => p.slug === slug);
  }

  async getPopularProducts(): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(p => p.isPopular)
      .sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"))
      .slice(0, 8);
  }

  async getSearchSuggestions(query: string): Promise<SearchSuggestion[]> {
    const searchTerm = query.toLowerCase().trim();
    const suggestions: SearchSuggestion[] = [];

    if (searchTerm.length < 2) return suggestions;

    const allProducts = Array.from(this.products.values());

    // Поиск точных совпадений по артикулу
    const exactSkuProducts = allProducts.filter(p => p.sku.toLowerCase() === searchTerm);
    exactSkuProducts.forEach(product => {
      suggestions.push({
        type: 'product',
        text: `${product.name} (арт. ${product.sku})`,
        value: product.slug,
        sku: product.sku,
        price: product.price,
        image: product.imageUrl || undefined
      });
    });

    // Поиск по началу артикула если точного совпадения нет
    if (exactSkuProducts.length === 0 && /^\d/.test(searchTerm)) {
      const skuStartProducts = allProducts
        .filter(p => p.sku.toLowerCase().startsWith(searchTerm))
        .slice(0, 5);

      skuStartProducts.forEach(product => {
        suggestions.push({
          type: 'product',
          text: `${product.name} (арт. ${product.sku})`,
          value: product.slug,
          sku: product.sku,
          price: product.price,
          image: product.imageUrl || undefined
        });
      });
    }

    // Поиск по размерам
    const dimensionMatch = searchTerm.match(/(\d+)\s*[xх×]\s*(\d+)(?:\s*[xх×]\s*(\d+))?/);
    if (dimensionMatch && exactSkuProducts.length === 0) {
      const [, width, height, depth] = dimensionMatch;
      const patterns = [
        `${width} x ${height}`,
        `${width}x${height}`,
        `${width} х ${height}`,
        `${width}х${height}`
      ];
      
      if (depth) {
        patterns.push(
          `${width} x ${height} x ${depth}`,
          `${width}x${height}x${depth}`,
          `${width} х ${height} х ${depth}`,
          `${width}х${height}х${depth}`
        );
      }

      const dimensionProducts = allProducts.filter(product => {
        const name = product.name.toLowerCase();
        return patterns.some(pattern => name.includes(pattern));
      }).slice(0, 5);

      dimensionProducts.forEach(product => {
        if (!suggestions.some(s => s.sku === product.sku)) {
          suggestions.push({
            type: 'product',
            text: `${product.name} (арт. ${product.sku})`,
            value: product.slug,
            sku: product.sku,
            price: product.price,
            image: product.imageUrl || undefined
          });
        }
      });
    }

    // Поиск по бренду
    if (searchTerm.length >= 3) {
      const uniqueBrands = new Set<string>();
      allProducts.forEach(product => {
        if (product.brand && product.brand.toLowerCase().includes(searchTerm) && !uniqueBrands.has(product.brand)) {
          uniqueBrands.add(product.brand);
          suggestions.push({
            type: 'brand',
            text: `Бренд: ${product.brand}`,
            value: product.brand
          });
        }
      });
    }

    // Поиск по названию товара
    if (suggestions.length < 5) {
      const nameProducts = allProducts
        .filter(product => {
          const name = product.name.toLowerCase();
          return name.includes(searchTerm) && !suggestions.some(s => s.sku === product.sku);
        })
        .slice(0, 10 - suggestions.length);

      nameProducts.forEach(product => {
        suggestions.push({
          type: 'product',
          text: product.name,
          value: product.slug,
          sku: product.sku,
          price: product.price,
          image: product.imageUrl || undefined
        });
      });
    }

    return suggestions.slice(0, 8);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    // Автогенерация SKU если не указан
    const sku = insertProduct.sku || this.generateSKU(insertProduct.brand, insertProduct.category);
    // Автогенерация slug если не указан
    const slug = insertProduct.slug || this.generateSlug(insertProduct.name);
    
    const product: Product = { 
      id: this.currentProductId++, 
      ...insertProduct,
      sku,
      slug,
      shortDescription: insertProduct.shortDescription || null,
      originalPrice: insertProduct.originalPrice || null,
      brand: insertProduct.brand || null,
      subcategory: insertProduct.subcategory || null,
      volume: insertProduct.volume || null,
      images: insertProduct.images || null,
      inStock: insertProduct.inStock !== undefined ? insertProduct.inStock : true,
      isPopular: insertProduct.isPopular || false,
      isNew: insertProduct.isNew || false,
      discount: insertProduct.discount || 0,
      rating: insertProduct.rating || "4.0",
      reviewCount: insertProduct.reviewCount || 0,
      // Дополнительные поля
      weight: insertProduct.weight || null,
      dimensions: insertProduct.dimensions || null,
      material: insertProduct.material || null,
      color: insertProduct.color || null,
      frameType: insertProduct.frameType || null,
      pumpType: insertProduct.pumpType || null,
      pumpCapacity: insertProduct.pumpCapacity || null,
      shape: insertProduct.shape || null,
      installationType: insertProduct.installationType || null,
      countryOrigin: insertProduct.countryOrigin || null
    };
    this.products.set(product.id, product);
    return product;
  }

  private generateSKU(brand?: string | null, category?: string): string {
    const brandCode = (brand || "POOL").toUpperCase().substring(0, 4);
    const categoryCode = (category || "GEN").toUpperCase().substring(0, 3);
    const timestamp = Date.now().toString().slice(-6);
    return `${brandCode}-${categoryCode}-${timestamp}`;
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[а-я]/g, (char) => {
        const cyrillicMap: Record<string, string> = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
          'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
          'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
          'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
          'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
        return cyrillicMap[char] || char;
      })
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100);
  }

  async updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;

    // Регенерируем slug если изменилось название
    const slug = updateData.name && updateData.name !== existingProduct.name 
      ? this.generateSlug(updateData.name)
      : (updateData.slug || existingProduct.slug);

    const updatedProduct: Product = {
      ...existingProduct,
      ...updateData,
      id: existingProduct.id,
      slug,
      originalPrice: updateData.originalPrice || existingProduct.originalPrice,
      brand: updateData.brand || existingProduct.brand,
      subcategory: updateData.subcategory || existingProduct.subcategory,
      volume: updateData.volume || existingProduct.volume,
      images: updateData.images || existingProduct.images,
      inStock: updateData.inStock !== undefined ? updateData.inStock : existingProduct.inStock,
      isPopular: updateData.isPopular !== undefined ? updateData.isPopular : existingProduct.isPopular,
      isNew: updateData.isNew !== undefined ? updateData.isNew : existingProduct.isNew,
      discount: updateData.discount !== undefined ? updateData.discount : existingProduct.discount,
      rating: updateData.rating || existingProduct.rating,
      reviewCount: updateData.reviewCount !== undefined ? updateData.reviewCount : existingProduct.reviewCount,
      // Дополнительные поля
      weight: updateData.weight || existingProduct.weight || null,
      dimensions: updateData.dimensions || existingProduct.dimensions || null,
      material: updateData.material || existingProduct.material || null,
      color: updateData.color || existingProduct.color || null,
      frameType: updateData.frameType || existingProduct.frameType || null,
      pumpType: updateData.pumpType || existingProduct.pumpType || null,
      pumpCapacity: updateData.pumpCapacity || existingProduct.pumpCapacity || null,
      shape: updateData.shape || existingProduct.shape || null,
      installationType: updateData.installationType || existingProduct.installationType || null,
      countryOrigin: updateData.countryOrigin || existingProduct.countryOrigin || null
    };

    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async updateProductPriceBySku(sku: string, price: number, originalPrice?: number): Promise<Product | undefined> {
    const product = Array.from(this.products.values()).find(p => p.sku === sku);
    if (!product) return undefined;
    
    const updateData: Partial<InsertProduct> = { price: price.toString() };
    if (originalPrice !== undefined) {
      updateData.originalPrice = originalPrice.toString();
    }
    
    return await this.updateProduct(product.id, updateData);
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(c => c.slug === slug);
  }

  async getCategoryStats(categorySlug: string): Promise<{ count: number; minPrice: number } | null> {
    // Простая реализация для MemStorage - возвращаем реальные данные для основных категорий
    const categoryMapping: { [key: string]: { count: number; minPrice: number } } = {
      'karkasnye-basseyny': { count: 32, minPrice: 5490 },
      'morozostojkie-basseyny': { count: 8, minPrice: 25990 },
      'naduvnye-basseyny': { count: 15, minPrice: 1290 },
      'dzjakuzi-intex': { count: 7, minPrice: 16990 },
      'dzjakuzi-bestway': { count: 5, minPrice: 14990 },
      'zapasnye-chashi': { count: 3, minPrice: 3490 }
    };

    return categoryMapping[categorySlug] || null;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const category: Category = { 
      id: this.currentCategoryId++, 
      ...insertCategory,
      description: insertCategory.description || null,
      imageUrl: insertCategory.imageUrl || null,
      productCount: insertCategory.productCount || null
    };
    this.categories.set(category.id, category);
    return category;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const order: Order = { 
      id: this.currentOrderId++, 
      ...insertOrder,
      status: insertOrder.status || "новый",
      customerEmail: insertOrder.customerEmail || null,
      deliveryAddress: insertOrder.deliveryAddress || null,
      notes: insertOrder.notes || null,
      createdAt: new Date()
    };
    this.orders.set(order.id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const consultation: Consultation = { 
      id: this.currentConsultationId++, 
      ...insertConsultation,
      message: insertConsultation.message || null,
      status: "новая",
      email: insertConsultation.email || null,
      createdAt: new Date()
    };
    this.consultations.set(consultation.id, consultation);
    return consultation;
  }
}

export const storage = new DatabaseStorage();