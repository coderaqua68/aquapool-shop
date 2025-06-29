import { 
  Product, 
  Category, 
  Order, 
  Consultation,
  SiteSetting,
  type InsertProduct, 
  type InsertCategory, 
  type InsertOrder, 
  type InsertConsultation,
  type InsertSiteSetting
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, desc, ilike, or, sql, inArray } from "drizzle-orm";

// Import products table
import { products, categories, orders, consultations, siteSettings } from "@shared/schema";

// Define interface types
interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  dimensions?: string;
  sortBy?: string;
}

interface SearchSuggestion {
  type: 'product' | 'category' | 'brand';
  text: string;
  slug?: string;
}

interface CategoryStats {
  count: number;
  minPrice: number;
}

// Storage interface with all required methods
export interface IStorage {
  // Product operations
  getProducts(filters?: ProductFilters): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getPopularProducts(): Promise<Product[]>;
  getSearchSuggestions(query: string): Promise<SearchSuggestion[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product>;
  updateProductPriceBySku(sku: string, price: number, originalPrice?: number): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getMainCategories(): Promise<Category[]>;
  getCategoryStats(categorySlug: string): Promise<{ count: number; minPrice: number } | null>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Order operations
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  
  // Consultation operations
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  
  // Site Settings operations
  getSiteSettings(): Promise<SiteSetting[]>;
  getSiteSetting(key: string): Promise<SiteSetting | undefined>;
  createSiteSetting(setting: InsertSiteSetting): Promise<SiteSetting>;
  updateSiteSetting(id: number, data: Partial<InsertSiteSetting>): Promise<SiteSetting>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    let query = db.select().from(products);
    
    if (filters) {
      const conditions = [];
      
      // Фильтр по категории - поддержка основных категорий с подкатегориями
      if (filters.category) {
        // Сначала найдем саму категорию
        const [category] = await db.select().from(categories)
          .where(eq(categories.slug, filters.category));
        
        if (category) {
          // Проверяем, есть ли у этой категории дочерние категории
          const subcategories = await db.select().from(categories)
            .where(eq(categories.parentId, category.id));
          
          if (subcategories.length > 0) {
            // Это родительская категория - включаем товары из всех дочерних категорий
            const subcategorySlugs = subcategories.map(sub => sub.slug);
            const categoryConditions = subcategorySlugs.map(slug => eq(products.category, slug));
            conditions.push(or(...categoryConditions));
          } else {
            // Это дочерняя категория - обычная фильтрация
            conditions.push(eq(products.category, filters.category));
          }
        }
      }
      
      if (filters.minPrice !== undefined) {
        conditions.push(gte(products.price, filters.minPrice.toString()));
      }
      
      if (filters.maxPrice !== undefined) {
        conditions.push(lte(products.price, filters.maxPrice.toString()));
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





      // Фильтр по размерам - поиск в названии и характеристиках
      if (filters.dimensions) {
        const dimensionsQuery = filters.dimensions.trim();
        if (dimensionsQuery) {
          conditions.push(or(
            ilike(products.name, `%${dimensionsQuery}%`),
            ilike(products.specifications, `%${dimensionsQuery}%`)
          ));
        }
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

    if (searchTerm.length < 2) return suggestions;

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
      .where(eq(products.sku, searchTerm.toUpperCase()))
      .limit(5);

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
        .limit(3);

      dimensionProducts.forEach(product => {
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

    // Поиск по названию если нужно больше результатов
    if (suggestions.length < 8) {
      const nameProducts = await db.select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        slug: products.slug,
        price: products.price,
        imageUrl: products.imageUrl,
        brand: products.brand
      }).from(products)
        .where(and(
          ilike(products.name, `%${searchTerm}%`),
          // Исключаем уже найденные товары
          ...suggestions.map(s => sql`${products.sku} != ${s.sku}`)
        ))
        .limit(8 - suggestions.length);

      nameProducts.forEach(product => {
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

    // Поиск по бренду если нужно больше результатов
    if (suggestions.length < 8) {
      const brandProducts = await db.select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        slug: products.slug,
        price: products.price,
        imageUrl: products.imageUrl,
        brand: products.brand
      }).from(products)
        .where(and(
          ilike(products.brand, `%${searchTerm}%`),
          // Исключаем уже найденные товары
          ...suggestions.map(s => sql`${products.sku} != ${s.sku}`)
        ))
        .limit(8 - suggestions.length);

      brandProducts.forEach(product => {
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

    return suggestions;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  async updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product> {
    const [product] = await db.update(products)
      .set(data)
      .where(eq(products.id, id))
      .returning();
    return product;
  }

  async updateProductPriceBySku(sku: string, price: number, originalPrice?: number): Promise<Product | undefined> {
    const updateData: Partial<InsertProduct> = { price: price.toString() };
    if (originalPrice !== undefined) {
      updateData.originalPrice = originalPrice.toString();
    }

    const [product] = await db.update(products)
      .set(updateData)
      .where(eq(products.sku, sku))
      .returning();
    
    return product;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products)
      .where(eq(products.id, id));
    return result.rowCount > 0;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getMainCategories(): Promise<Category[]> {
    return await db.select().from(categories).where(sql`parent_id IS NULL`);
  }

  async getCategoryStats(categorySlug: string): Promise<{ count: number; minPrice: number } | null> {
    // Маппинг главных категорий к их подкатегориям
    const categoryMapping: { [key: string]: string[] } = {
      'karkasnye-basseyny': ['intex-karkasnye', 'bestway-karkasnye'],
      'morozostojkie-basseyny': ['morozostojkie-basseyny'],
      'dzjakuzi-intex': ['dzjakuzi-intex'],
      'dzjakuzi-bestway': ['dzjakuzi-bestway'],
      'zapasnye-chashi': ['zapasnye-chashi', 'laguna-films', 'azuro-films', 'gre-films', 'atlantic-pool-films', 'larimar-films']
    };

    const subcategories = categoryMapping[categorySlug] || [categorySlug];
    
    const result = await db.select({
      count: sql<number>`count(*)::int`,
      minPrice: sql<number>`min(${products.price}::int)::int`
    }).from(products)
      .where(inArray(products.category, subcategories));

    const stats = result[0];
    if (!stats || stats.count === 0) {
      return { count: 0, minPrice: 0 };
    }

    return {
      count: stats.count,
      minPrice: stats.minPrice || 0
    };
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
}

export const storage = new DatabaseStorage();