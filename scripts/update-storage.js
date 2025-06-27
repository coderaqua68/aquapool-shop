import fs from 'fs';

// Загружаем обработанный каталог
const catalogData = JSON.parse(fs.readFileSync('./full-catalog-processed.json', 'utf-8'));

console.log(`📦 Загружено ${catalogData.products.length} товаров`);

// Создаем обновленный storage.ts с полным каталогом
const storageTemplate = `import { 
  Product, InsertProduct, 
  Category, InsertCategory, 
  Order, InsertOrder, 
  Consultation, InsertConsultation 
} from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(filters?: { category?: string; minPrice?: number; maxPrice?: number; inStock?: boolean; search?: string }): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getPopularProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
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
    // Initialize categories - Полная структура каталога
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

    // Initialize products - Полный каталог из basseyn.ru (${catalogData.products.length} товаров)
    const productsData = ${JSON.stringify(catalogData.products, null, 2)};

    productsData.forEach(prod => {
      const product: Product = { 
        id: this.currentProductId++, 
        ...prod,
        originalPrice: prod.originalPrice || null,
        brand: prod.brand || null,
        subcategory: prod.subcategory || null,
        volume: prod.volume || null,
        isPopular: prod.isPopular || false,
        isNew: prod.isNew || false,
        discount: prod.discount || 0,
        rating: prod.rating || "4.0",
        reviewCount: prod.reviewCount || 0
      };
      this.products.set(product.id, product);
    });
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

  async getPopularProducts(): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(p => p.isPopular)
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      .slice(0, 8);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const product: Product = { 
      id: this.currentProductId++, 
      ...insertProduct,
      originalPrice: insertProduct.originalPrice || null,
      brand: insertProduct.brand || null,
      subcategory: insertProduct.subcategory || null,
      volume: insertProduct.volume || null,
      isPopular: insertProduct.isPopular || false,
      isNew: insertProduct.isNew || false,
      discount: insertProduct.discount || 0,
      rating: insertProduct.rating || "4.0",
      reviewCount: insertProduct.reviewCount || 0
    };
    this.products.set(product.id, product);
    return product;
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
      status: insertConsultation.status || "новая",
      email: insertConsultation.email || null,
      createdAt: new Date()
    };
    this.consultations.set(consultation.id, consultation);
    return consultation;
  }
}

export const storage = new MemStorage();`;

// Сохраняем обновленный storage.ts
fs.writeFileSync('../server/storage.ts', storageTemplate, 'utf-8');
console.log('✅ Storage.ts обновлен с полным каталогом товаров!');
console.log(`📊 Добавлено ${catalogData.products.length} товаров`);
console.log(`📂 Создано ${catalogData.categories.length} категорий`);
console.log(`🏷️ Найдено ${catalogData.brands.length} брендов`);

// Автозапуск не нужен, скрипт выполняется сразу