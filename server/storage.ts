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
      { name: "Каркасные бассейны", slug: "frame-pools", description: "Прочные каркасные бассейны для дачи" },
      { name: "Надувные бассейны", slug: "inflatable-pools", description: "Быстро устанавливаемые надувные бассейны" },
      { name: "Насосы и фильтры", slug: "pumps-filters", description: "Системы очистки и циркуляции воды" },
      { name: "Лестницы", slug: "ladders", description: "Безопасные лестницы для бассейнов" },
      { name: "Тенты и подстилки", slug: "covers-underlays", description: "Защитные покрытия и основания" },
      { name: "Химия для бассейнов", slug: "chemicals", description: "Средства для очистки и дезинфекции воды" },
      { name: "Аксессуары", slug: "accessories", description: "Дополнительные принадлежности" }
    ];

    categoriesData.forEach(cat => {
      const category: Category = { 
        id: this.currentCategoryId++, 
        ...cat,
        imageUrl: null,
        productCount: null
      };
      this.categories.set(category.id, category);
    });

    // Initialize products - Реальные товары из basseyn.ru
    const productsData = [
      {
        name: "Каркасный бассейн Prism Frame 305x76см, 4485л, фил.-насос 1250л/ч, Intex, 28702",
        description: "Чаша бассейна изготовлена по запатентованной технологии SUPER-TOUGH из высококачественного трехслойного ПВХ: два слоя плотного винила и один — полиэстер для особой прочности.",
        price: "10070",
        originalPrice: "12580",
        category: "frame-pools",
        subcategory: "prism-frame",
        brand: "Intex",
        volume: "4485л",
        imageUrl: "https://basseyn.ru/upload/iblock/ae9/ae9a4bd1ec516620aee93d23d55d7aca.jpg",
        images: [
          "https://basseyn.ru/upload/iblock/ae9/ae9a4bd1ec516620aee93d23d55d7aca.jpg",
          "https://basseyn.ru/upload/iblock/cda/cdab74dcdc0805db38b955b3581fdccc.png"
        ],
        specifications: JSON.stringify({
          "Диаметр": "305 см",
          "Высота": "76 см",
          "Объем": "4485 л при 90% заполнении",
          "Вес упаковки": "19,160 кг",
          "Серия": "Prism Frame",
          "Артикул": "28702"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 20,
        rating: "4.7",
        reviewCount: 32
      },
      {
        name: "Каркасный бассейн Prism Frame 366x76см, 6503л, фил.-насос 2006л/ч, Intex, 28712",
        description: "Чаша бассейна изготовлена по запатентованной технологии SUPER-TOUGH из высококачественного трехслойного ПВХ: два слоя плотного винила и один — полиэстер для особой прочности.",
        price: "10080",
        originalPrice: "12590",
        category: "frame-pools",
        subcategory: "prism-frame",
        brand: "Intex",
        volume: "6503л",
        imageUrl: "https://basseyn.ru/upload/iblock/e9a/e9ac1b8a9a46f6907c260922c5ff0ec6.jpg",
        images: [
          "https://basseyn.ru/upload/iblock/e9a/e9ac1b8a9a46f6907c260922c5ff0ec6.jpg",
          "https://basseyn.ru/upload/iblock/78a/78a6c12a0cf62fd26697260491803fba.jpg"
        ],
        specifications: JSON.stringify({
          "Диаметр": "366 см", 
          "Высота": "76 см",
          "Объем": "6503 л при 90% заполнении",
          "Вес упаковки": "24,649 кг",
          "Серия": "Prism Frame",
          "Артикул": "28712"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 20,
        rating: "4.6",
        reviewCount: 28
      },
      {
        name: "Каркасный бассейн Steel Pro 300х201х66см, 3300л, фил.-насос 1249л/ч, Bestway, 56411 BW",
        description: "Не требует бетонирования и подготовки ямы, все, что нужно, это плоская, горизонтальная площадка. Сезонный бассейн обладает простой конструкцией - может быть легко разобран и собран заново.",
        price: "10080",
        originalPrice: "12600",
        category: "frame-pools",
        subcategory: "steel-pro-max",
        brand: "Bestway",
        volume: "3300л",
        imageUrl: "https://basseyn.ru/upload/iblock/171/tydf0adl1ds9qhvmg6kdl6dc4vn1vu39.jpeg",
        images: [
          "https://basseyn.ru/upload/iblock/171/tydf0adl1ds9qhvmg6kdl6dc4vn1vu39.jpeg",
          "https://basseyn.ru/upload/iblock/da5/xn3wk780mq1335dj3cb298yhoqwaw6p7.jpeg"
        ],
        specifications: JSON.stringify({
          "Размер": "300 х 201 х 66 см",
          "Максимальные монтажные размеры": "355 x 255 см",
          "Объем при 90% заполнении": "3300 литров",
          "Серия": "Steel Pro",
          "Производительность фильтр-насоса": "1249 л/ч",
          "Артикул": "56411 BW"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 20,
        rating: "4.5",
        reviewCount: 22
      },
      {
        name: "Чаша каркасного бассейна 366*122см",
        description: "Запасная чаша для каркасного бассейна диаметром 366 см и высотой 122 см. Высококачественный материал, устойчивый к воздействию хлора и UV-излучения.",
        price: "9960",
        originalPrice: "12450",
        category: "accessories",
        subcategory: null,
        brand: "Другие",
        volume: null,
        imageUrl: "https://basseyn.ru/upload/iblock/5dd/5ddf4e93cf633b24ebb542708d0d2074.jpg",
        images: ["https://basseyn.ru/upload/iblock/5dd/5ddf4e93cf633b24ebb542708d0d2074.jpg"],
        specifications: JSON.stringify({
          "Диаметр": "366 см",
          "Высота": "122 см",
          "Материал": "ПВХ",
          "Артикул": "56420ASS18"
        }),
        inStock: true,
        isPopular: false,
        isNew: false,
        discount: 20,
        rating: "4.3",
        reviewCount: 15
      },
      {
        name: "Каркасный бассейн 305х100см, 6148л",
        description: "Каркасный бассейн Bestway отличается высокой прочностью и устойчивостью. Простая установка без инструментов.",
        price: "10240",
        originalPrice: "12800",
        category: "frame-pools",
        subcategory: null,
        brand: "Bestway",
        volume: "6148л",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
        images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5"],
        specifications: JSON.stringify({
          "Диаметр": "305 см",
          "Высота": "100 см", 
          "Объем": "6148 л",
          "Время установки": "30 мин",
          "Артикул": "5617N BW"
        }),
        inStock: true,
        isPopular: false,
        isNew: true,
        discount: 20,
        rating: "4.4",
        reviewCount: 18
      }
    ];

    productsData.forEach(prod => {
      const product: Product = { id: this.currentProductId++, ...prod };
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
      ...insertProduct 
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
      createdAt: new Date()
    };
    this.consultations.set(consultation.id, consultation);
    return consultation;
  }
}

export const storage = new MemStorage();