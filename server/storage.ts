import { 
  Product, InsertProduct, 
  Category, InsertCategory, 
  Order, InsertOrder, 
  Consultation, InsertConsultation,
  products,
  categories,
  orders,
  consultations,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, desc, ilike } from "drizzle-orm";

export interface IStorage {
  // Products
  getProducts(filters?: { category?: string; brand?: string; minPrice?: number; maxPrice?: number; inStock?: boolean; search?: string }): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getPopularProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  
  // Consultations
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(filters?: { category?: string; brand?: string; minPrice?: number; maxPrice?: number; inStock?: boolean; search?: string }): Promise<Product[]> {
    let query = db.select().from(products);
    
    if (filters) {
      const conditions = [];
      
      if (filters.category) {
        conditions.push(eq(products.category, filters.category));
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
        conditions.push(ilike(products.name, `%${filters.search}%`));
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

  async getProducts(filters?: { category?: string; minPrice?: number; maxPrice?: number; inStock?: boolean; search?: string }): Promise<Product[]> {
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

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(c => c.slug === slug);
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