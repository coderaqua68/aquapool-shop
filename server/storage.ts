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
      const category: Category = { id: this.currentCategoryId++, ...cat };
      this.categories.set(category.id, category);
    });

    // Initialize products - Реальный каталог на основе intex-bassein.ru
    const productsData = [
      // === КАРКАСНЫЕ БАССЕЙНЫ INTEX ===
      {
        name: "Бассейн каркасный Intex Ultra XTR Frame 26356 549x274x132 см",
        description: "Прямоугольный каркасный бассейн с фильтр-насосом 5678 л/ч, тентом, лестницей",
        price: "89990",
        originalPrice: "99990",
        category: "frame-pools",
        subcategory: "ultra-frame-xtr",
        brand: "Intex",
        volume: "19156л",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
        images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5"],
        specifications: JSON.stringify({
          "Размер": "549x274x132 см",
          "Объем": "19156 л",
          "Материал": "Super-Tough ПВХ",
          "Каркас": "Оцинкованная сталь",
          "Комплектация": "Насос, лестница, тент, подстилка",
          "Артикул": "26356"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 10,
        rating: "4.8",
        reviewCount: 47
      },
      {
        name: "Бассейн каркасный Intex Prism Frame 26716 427x107 см",
        description: "Круглый каркасный бассейн с картриджным фильтр-насосом",
        price: "24990",
        originalPrice: "29990",
        category: "frame-pools",
        subcategory: "prism-frame",
        brand: "Intex",
        volume: "14062л",
        imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
        images: ["https://images.unsplash.com/photo-1571902943202-507ec2618e8f"],
        specifications: JSON.stringify({
          "Диаметр": "427 см",
          "Высота": "107 см",
          "Объем": "14062 л",
          "Материал": "3-слойный ПВХ",
          "Каркас": "Металлические стойки",
          "Комплектация": "Насос 2006 л/ч, картридж",
          "Артикул": "26716"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 17,
        rating: "4.6",
        reviewCount: 33
      },
      {
        name: "Бассейн каркасный Intex Metal Frame 28200 305x76 см",
        description: "Круглый каркасный бассейн начального уровня",
        price: "8990",
        originalPrice: null,
        category: "frame-pools",
        subcategory: "metal-frame",
        brand: "Intex",
        volume: "4485л",
        imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635",
        images: ["https://images.unsplash.com/photo-1530549387789-4c1017266635"],
        specifications: JSON.stringify({
          "Диаметр": "305 см",
          "Высота": "76 см",
          "Объем": "4485 л",
          "Материал": "Усиленный ПВХ",
          "Каркас": "Оцинкованный металл",
          "Артикул": "28200"
        }),
        inStock: true,
        isPopular: false,
        isNew: false,
        discount: 0,
        rating: "4.3",
        reviewCount: 19
      },
      
      // === КАРКАСНЫЕ БАССЕЙНЫ BESTWAY ===
      {
        name: "Бассейн каркасный Bestway Power Steel 56444 412x201x122 см",
        description: "Овальный каркасный бассейн с песочным фильтр-насосом",
        price: "52990",
        originalPrice: "59990",
        category: "frame-pools",
        subcategory: "power-steel",
        brand: "Bestway",
        volume: "8645л",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
        images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"],
        specifications: JSON.stringify({
          "Размер": "412x201x122 см",
          "Объем": "8645 л",
          "Материал": "TriTech 3-слоя",
          "Каркас": "Коррозионностойкий",
          "Комплектация": "Песочный насос 2006 л/ч, лестница",
          "Артикул": "56444"
        }),
        inStock: true,
        isPopular: true,
        isNew: true,
        discount: 12,
        rating: "4.7",
        reviewCount: 28
      },
      {
        name: "Бассейн каркасный Bestway Steel Pro Max 56416 366x100 см",
        description: "Круглый каркасный бассейн с картриджным фильтром",
        price: "18990",
        originalPrice: "21990",
        category: "frame-pools",
        subcategory: "steel-pro-max",
        brand: "Bestway",
        volume: "9150л",
        imageUrl: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c",
        images: ["https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c"],
        specifications: JSON.stringify({
          "Диаметр": "366 см",
          "Высота": "100 см",
          "Объем": "9150 л",
          "Материал": "TriTech 3-слоя",
          "Каркас": "Порошковое покрытие",
          "Комплектация": "Насос 1249 л/ч",
          "Артикул": "56416"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 14,
        rating: "4.5",
        reviewCount: 41
      },
      
      // === НАДУВНЫЕ БАССЕЙНЫ ===
      {
        name: "Бассейн надувной Intex Easy Set 28120 305x76 см",
        description: "Надувной бассейн с фильтр-насосом",
        price: "5990",
        originalPrice: null,
        category: "inflatable-pools",
        subcategory: "easy-set",
        brand: "Intex",
        volume: "3853л",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
        images: ["https://images.unsplash.com/photo-1560472354-b33ff0c44a43"],
        specifications: JSON.stringify({
          "Диаметр": "305 см",
          "Высота": "76 см",
          "Объем": "3853 л",
          "Материал": "Винил 0.25 мм",
          "Комплектация": "Насос 1250 л/ч",
          "Время установки": "10 минут",
          "Артикул": "28120"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 0,
        rating: "4.4",
        reviewCount: 67
      },
      {
        name: "Бассейн надувной Bestway Fast Set 57270 366x76 см",
        description: "Быстроустанавливаемый надувной бассейн",
        price: "7490",
        originalPrice: "8490",
        category: "inflatable-pools",
        subcategory: "fast-set",
        brand: "Bestway",
        volume: "5621л",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
        images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"],
        specifications: JSON.stringify({
          "Диаметр": "366 см",
          "Высота": "76 см",
          "Объем": "5621 л",
          "Материал": "Tritech 3-слоя",
          "Комплектация": "Фильтр-насос 1249 л/ч",
          "Время установки": "15 минут",
          "Артикул": "57270"
        }),
        inStock: true,
        isPopular: false,
        isNew: false,
        discount: 12,
        rating: "4.2",
        reviewCount: 23
      },
      
      // === НАСОСЫ И ФИЛЬТРЫ ===
      {
        name: "Песочный фильтр-насос Intex 26644 4000 л/ч",
        description: "Песочный фильтр с 6-позиционным вентилем",
        price: "16990",
        originalPrice: null,
        category: "pumps-filters",
        subcategory: "sand-filters",
        brand: "Intex",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7",
        images: ["https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7"],
        specifications: JSON.stringify({
          "Производительность": "4000 л/ч",
          "Тип фильтра": "Песочный",
          "Объем песка": "35 кг",
          "Подключение": "32/38 мм",
          "Мощность": "150 Вт",
          "Артикул": "26644"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 0,
        rating: "4.6",
        reviewCount: 34
      },
      {
        name: "Картриджный фильтр-насос Bestway 58381 1249 л/ч",
        description: "Компактный картриджный фильтр-насос",
        price: "4490",
        originalPrice: null,
        category: "pumps-filters",
        subcategory: "cartridge-filters",
        brand: "Bestway",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
        images: ["https://images.unsplash.com/photo-1581833971358-2c8b550f87b3"],
        specifications: JSON.stringify({
          "Производительность": "1249 л/ч",
          "Тип фильтра": "Картриджный",
          "Подключение": "32 мм",
          "Мощность": "16 Вт",
          "Напряжение": "220-240 В",
          "Артикул": "58381"
        }),
        inStock: true,
        isPopular: false,
        isNew: false,
        discount: 0,
        rating: "4.3",
        reviewCount: 15
      },
      
      // === ЛЕСТНИЦЫ ===
      {
        name: "Лестница Intex 28066 для бассейнов 132 см",
        description: "Лестница безопасности с платформой и замком",
        price: "7990",
        originalPrice: null,
        category: "ladders",
        subcategory: null,
        brand: "Intex",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144",
        images: ["https://images.unsplash.com/photo-1590736969955-71cc94901144"],
        specifications: JSON.stringify({
          "Высота бассейна": "до 132 см",
          "Материал": "Нержавеющая сталь",
          "Ступени": "4 ступени",
          "Платформа": "Да",
          "Замок безопасности": "Да",
          "Артикул": "28066"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 0,
        rating: "4.7",
        reviewCount: 22
      },
      {
        name: "Лестница Bestway 58331 для бассейнов 107 см",
        description: "Двухсторонняя лестница с широкими ступенями",
        price: "5990",
        originalPrice: "6990",
        category: "ladders",
        subcategory: null,
        brand: "Bestway",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
        images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"],
        specifications: JSON.stringify({
          "Высота бассейна": "до 107 см",
          "Материал": "Оцинкованная сталь",
          "Ступени": "3 ступени",
          "Вес": "8.5 кг",
          "Нагрузка": "до 120 кг",
          "Артикул": "58331"
        }),
        inStock: true,
        isPopular: false,
        isNew: false,
        discount: 14,
        rating: "4.4",
        reviewCount: 18
      },
      
      // === ТЕНТЫ И ПОДСТИЛКИ ===
      {
        name: "Тент солнечный Intex 29022 для бассейнов 457 см",
        description: "Нагревающий тент с пузырьковым покрытием",
        price: "3990",
        originalPrice: null,
        category: "covers-underlays",
        subcategory: "solar-covers",
        brand: "Intex",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
        images: ["https://images.unsplash.com/photo-1571902943202-507ec2618e8f"],
        specifications: JSON.stringify({
          "Диаметр": "457 см",
          "Материал": "PE пленка 120 мкм",
          "Тип": "Пузырьковое покрытие",
          "Нагрев воды": "до +8°C",
          "Сохранение тепла": "до 95%",
          "Артикул": "29022"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 0,
        rating: "4.5",
        reviewCount: 31
      },
      {
        name: "Подстилка Bestway 58003 для бассейнов 396x396 см",
        description: "Защитная подстилка под каркасные бассейны",
        price: "1990",
        originalPrice: null,
        category: "covers-underlays",
        subcategory: "ground-cloths",
        brand: "Bestway",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c",
        images: ["https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c"],
        specifications: JSON.stringify({
          "Размер": "396x396 см",
          "Материал": "Полиэтилен высокой плотности",
          "Толщина": "0.25 мм",
          "Защита": "От проколов и повреждений",
          "Артикул": "58003"
        }),
        inStock: true,
        isPopular: false,
        isNew: false,
        discount: 0,
        rating: "4.2",
        reviewCount: 12
      },
      
      // === ХИМИЯ ДЛЯ БАССЕЙНОВ ===
      {
        name: "Набор химии Intex для ухода за водой стартовый",
        description: "Комплект средств для дезинфекции и очистки воды",
        price: "2490",
        originalPrice: null,
        category: "chemicals",
        subcategory: "starter-kits",
        brand: "Intex",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
        images: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19"],
        specifications: JSON.stringify({
          "Состав": "Хлор, pH+, pH-",
          "Объем бассейна": "до 10000 л",
          "Дезинфекция": "Хлорные таблетки",
          "Регулировка pH": "Включена",
          "Срок годности": "3 года"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 0,
        rating: "4.6",
        reviewCount: 45
      },
      {
        name: "Хлор шоковый Маркопул Кемиклс Хлоритэкс 1 кг",
        description: "Быстрорастворимый хлор для шоковой обработки",
        price: "890",
        originalPrice: null,
        category: "chemicals",
        subcategory: "chlorine",
        brand: "Маркопул",
        volume: "1кг",
        imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f",
        images: ["https://images.unsplash.com/photo-1583947215259-38e31be8751f"],
        specifications: JSON.stringify({
          "Вес": "1 кг",
          "Активный хлор": "56%",
          "Растворимость": "Быстрорастворимый",
          "Применение": "Шоковая дезинфекция",
          "Расход": "20 г на 1000 л"
        }),
        inStock: true,
        isPopular: false,
        isNew: false,
        discount: 0,
        rating: "4.4",
        reviewCount: 28
      },
      
      // === АКСЕССУАРЫ ===
      {
        name: "Набор для чистки Intex 28003 сачок + щетка + шланг",
        description: "Комплект аксессуаров для уборки бассейна",
        price: "2990",
        originalPrice: null,
        category: "accessories",
        subcategory: "cleaning-kits",
        brand: "Intex",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
        images: ["https://images.unsplash.com/photo-1571902943202-507ec2618e8f"],
        specifications: JSON.stringify({
          "Сачок": "Алюминиевая рукоятка",
          "Щетка": "Для стенок и дна",
          "Шланг": "7.5 м для пылесоса",
          "Комплектация": "3 предмета",
          "Артикул": "28003"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 0,
        rating: "4.3",
        reviewCount: 19
      },
      {
        name: "Термометр плавающий Bestway для бассейна",
        description: "Водонепроницаемый термометр с привязью",
        price: "590",
        originalPrice: null,
        category: "accessories",
        subcategory: "thermometers",
        brand: "Bestway",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
        images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"],
        specifications: JSON.stringify({
          "Тип": "Плавающий",
          "Диапазон": "-10°C до +50°C",
          "Материал": "Пластик ABS",
          "Привязь": "В комплекте",
          "Размер": "15 см"
        }),
        inStock: true,
        isPopular: false,
        isNew: false,
        discount: 0,
        rating: "4.1",
        reviewCount: 7
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
          p.brand.toLowerCase().includes(searchLower)
        );
      }
    }
    
    return results;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getPopularProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.isPopular);
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
      ...insertCategory 
    };
    this.categories.set(category.id, category);
    return category;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const order: Order = { 
      id: this.currentOrderId++, 
      createdAt: new Date().toISOString(),
      ...insertOrder 
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
      createdAt: new Date().toISOString(),
      ...insertConsultation 
    };
    this.consultations.set(consultation.id, consultation);
    return consultation;
  }
}

export const storage = new MemStorage();