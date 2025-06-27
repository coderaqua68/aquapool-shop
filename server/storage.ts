import { 
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
    // Initialize categories
    const categoriesData = [
      { name: "Каркасные бассейны", slug: "frame-pools", description: "Современные каркасные бассейны для дачи", imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5", productCount: 150 },
      { name: "Насосы и фильтры", slug: "pumps-filters", description: "Оборудование для очистки воды", imageUrl: "https://pixabay.com/get/gd670bb74f0a47e34eda0506d0f0dadeda3f72eafc355e46ef91a1aa4773a75f9019f39aee1572c64843541647b3f91652665259c687decef7956b984d2d9a4d6_1280.jpg", productCount: 80 },
      { name: "Лестницы", slug: "ladders", description: "Безопасные лестницы для бассейнов", imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b", productCount: 30 },
      { name: "Подстилки и тенты", slug: "covers-underlays", description: "Защитные покрытия и подстилки", imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf", productCount: 45 },
      { name: "Аксессуары", slug: "accessories", description: "Дополнительные аксессуары для бассейнов", imageUrl: "https://pixabay.com/get/g4913ea801ce2508f3b3a3494f5abc4d239a654ee734fa45b3df988fe4a188442ffbf94011391a59ac6703ddfb5144c7c3813e41137ecf8bf92c43290b09507a2_1280.jpg", productCount: 120 },
      { name: "Химия и уход", slug: "chemicals", description: "Средства для ухода за водой", imageUrl: "https://pixabay.com/get/g357854e7fb59e092d285536302bda3ac39d11f3c4a30e7e8a482897a72dbd30428ef3ef15b5aa4aa7e80c6e98363f511e2044aa366f1f13f9ee4b4bc5170503a_1280.jpg", productCount: 60 }
    ];

    categoriesData.forEach(cat => {
      const category: Category = { id: this.currentCategoryId++, ...cat };
      this.categories.set(category.id, category);
    });

    // Initialize products
    const productsData = [
      {
        name: "Каркасный бассейн Intex 366х76 см",
        description: "Круглый каркасный бассейн с фильтр-насосом",
        price: "15990",
        originalPrice: "19990",
        category: "frame-pools",
        brand: "Intex",
        volume: "7000л",
        imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856",
        images: ["https://images.unsplash.com/photo-1534430480872-3498386e7856"],
        specifications: JSON.stringify({
          "Диаметр": "366 см",
          "Высота": "76 см",
          "Объем": "7000 л",
          "Материал": "ПВХ 3 слоя",
          "Вес": "25 кг"
        }),
        inStock: true,
        isPopular: true,
        discount: 20,
        rating: "4.8",
        reviewCount: 24
      },
      {
        name: "Насос для бассейна 2000 л/ч",
        description: "Фильтр-насос для бассейнов до 10000 л",
        price: "8500",
        category: "pumps-filters",
        brand: "Bestway",
        imageUrl: "https://pixabay.com/get/gf923fd370105fec386ca3292f64275afb115e445d595b7a00cdc82167279245d0574d80bfa008f19dd50f6cc4b0c3cad497f649384d7d28f3f4d9e76fc158575_1280.jpg",
        images: ["https://pixabay.com/get/gf923fd370105fec386ca3292f64275afb115e445d595b7a00cdc82167279245d0574d80bfa008f19dd50f6cc4b0c3cad497f649384d7d28f3f4d9e76fc158575_1280.jpg"],
        specifications: JSON.stringify({
          "Производительность": "2000 л/ч",
          "Мощность": "58 Вт",
          "Напряжение": "220 В",
          "Тип фильтра": "Картриджный"
        }),
        inStock: true,
        isPopular: true,
        rating: "4.5",
        reviewCount: 18
      },
      {
        name: "Лестница металлическая 132 см",
        description: "Двухсторонняя лестница с платформой",
        price: "4200",
        category: "ladders",
        brand: "Summer Fun",
        imageUrl: "https://images.unsplash.com/photo-1592861956120-e524fc739696",
        images: ["https://images.unsplash.com/photo-1592861956120-e524fc739696"],
        specifications: JSON.stringify({
          "Высота": "132 см",
          "Материал": "Нержавеющая сталь",
          "Ступени": "4 шт",
          "Максимальная нагрузка": "150 кг"
        }),
        inStock: true,
        isPopular: true,
        isNew: true,
        rating: "4.9",
        reviewCount: 12
      },
      {
        name: "Набор химии для бассейна",
        description: "Стартовый набор средств для ухода за водой",
        price: "2890",
        category: "chemicals",
        brand: "AquaDoctor",
        imageUrl: "https://pixabay.com/get/g7f639da33b0503aa4c565f71c93970afe1c966dd18a4b8b9ecb7e0be2920d6a4411b31eba307db8e989e6cadeb1e42bb6eaab8cb51727c2d835c0bc9f46dd9d3_1280.jpg",
        images: ["https://pixabay.com/get/g7f639da33b0503aa4c565f71c93970afe1c966dd18a4b8b9ecb7e0be2920d6a4411b31eba307db8e989e6cadeb1e42bb6eaab8cb51727c2d835c0bc9f46dd9d3_1280.jpg"],
        specifications: JSON.stringify({
          "Хлор": "1 кг",
          "pH-": "0.5 кг",
          "pH+": "0.5 кг",
          "Альгицид": "1 л",
          "Тест-полоски": "50 шт"
        }),
        inStock: true,
        isPopular: true,
        rating: "4.6",
        reviewCount: 31
      }
    ];

    productsData.forEach(prod => {
      const product: Product = { id: this.currentProductId++, ...prod };
      this.products.set(product.id, product);
    });
  }

  async getProducts(filters?: { category?: string; minPrice?: number; maxPrice?: number; inStock?: boolean; search?: string }): Promise<Product[]> {
    let products = Array.from(this.products.values());
    
    if (filters?.category) {
      products = products.filter(p => p.category === filters.category);
    }
    
    if (filters?.minPrice !== undefined) {
      products = products.filter(p => parseFloat(p.price) >= filters.minPrice!);
    }
    
    if (filters?.maxPrice !== undefined) {
      products = products.filter(p => parseFloat(p.price) <= filters.maxPrice!);
    }
    
    if (filters?.inStock !== undefined) {
      products = products.filter(p => p.inStock === filters.inStock);
    }
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.description.toLowerCase().includes(search)
      );
    }
    
    return products;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getPopularProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.isPopular);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(c => c.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date() 
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const id = this.currentConsultationId++;
    const consultation: Consultation = { 
      ...insertConsultation, 
      id, 
      status: "pending",
      createdAt: new Date() 
    };
    this.consultations.set(id, consultation);
    return consultation;
  }
}

export const storage = new MemStorage();
