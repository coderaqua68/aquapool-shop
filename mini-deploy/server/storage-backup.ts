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
    // Initialize categories (structure based on intex-bassein.ru)
    const categoriesData = [
      { name: "Каркасные бассейны", slug: "frame-pools", description: "Прочные каркасные бассейны для дачи и постоянного использования", imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5", productCount: 200 },
      { name: "Каркасные Intex", slug: "intex-frame", description: "Оригинальные каркасные бассейны бренда Intex всех серий", imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856", productCount: 85 },
      { name: "Каркасные Bestway", slug: "bestway-frame", description: "Каркасные бассейны премиум класса Bestway Steel Pro", imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f", productCount: 65 },
      { name: "Надувные бассейны", slug: "inflatable-pools", description: "Легкие надувные бассейны для отдыха", imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0", productCount: 120 },
      { name: "Морозоустойчивые", slug: "winter-pools", description: "Всесезонные морозоустойчивые бассейны", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96", productCount: 35 },
      { name: "Оборудование", slug: "equipment", description: "Насосы, фильтры и системы очистки", imageUrl: "https://pixabay.com/get/gd670bb74f0a47e34eda0506d0f0dadeda3f72eafc355e46ef91a1aa4773a75f9019f39aee1572c64843541647b3f91652665259c687decef7956b984d2d9a4d6_1280.jpg", productCount: 90 },
      { name: "Павильоны", slug: "pavilions", description: "Павильоны и навесы для бассейнов", imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2", productCount: 25 },
      { name: "Химия и уход", slug: "chemicals", description: "Средства для обработки и дезинфекции воды", imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19", productCount: 80 },
      { name: "Покрытия и тенты", slug: "covers-underlays", description: "Защитные покрытия, тенты и подложки", imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf", productCount: 55 },
      { name: "Лестницы и трапы", slug: "ladders", description: "Лестницы и трапы для безопасного входа", imageUrl: "https://images.unsplash.com/photo-1592861956120-e524fc739696", productCount: 40 },
      { name: "Аксессуары", slug: "accessories", description: "Аксессуары для бассейнов и обслуживания", imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b", productCount: 150 },
      { name: "Отдых на воде", slug: "recreation", description: "Матрасы, игрушки и аксессуары для отдыха", imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635", productCount: 75 }
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
        volume: "15000л",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
        images: ["https://images.unsplash.com/photo-1557804506-669a67965ba0"],
        specifications: JSON.stringify({
          "Диаметр": "457 см",
          "Высота": "122 см",
          "Объем": "15000 л",
          "Материал": "ПВХ 3 слоя",
          "Вес": "45 кг",
          "Комплект": "насос + лестница"
        }),
        inStock: true,
        isPopular: false,
        isNew: true,
        discount: 17,
        rating: "4.7",
        reviewCount: 15
      },
      {
        name: "Песочный фильтр-насос 4000 л/ч",
        description: "Мощный песочный фильтр для больших бассейнов",
        price: "12500",
        originalPrice: null,
        category: "pumps-filters",
        subcategory: null,
        brand: "Summer Fun",
        volume: null,
        imageUrl: "https://pixabay.com/get/g4913ea801ce2508f3b3a3494f5abc4d239a654ee734fa45b3df988fe4a188442ffbf94011391a59ac6703ddfb5144c7c3813e41137ecf8bf92c43290b09507a2_1280.jpg",
        images: ["https://pixabay.com/get/g4913ea801ce2508f3b3a3494f5abc4d239a654ee734fa45b3df988fe4a188442ffbf94011391a59ac6703ddfb5144c7c3813e41137ecf8bf92c43290b09507a2_1280.jpg"],
        specifications: JSON.stringify({
          "Производительность": "4000 л/ч",
          "Мощность": "180 Вт",
          "Напряжение": "220 В",
          "Тип фильтра": "Песочный",
          "Объем песка": "35 кг"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 0,
        rating: "4.8",
        reviewCount: 22
      },
      {
        name: "Солярное покрытие 400 см",
        description: "Плавающее покрытие для подогрева воды от солнца",
        price: "3500",
        originalPrice: null,
        category: "covers-underlays",
        subcategory: null,
        brand: "AquaDoctor",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
        images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf"],
        specifications: JSON.stringify({
          "Диаметр": "400 см",
          "Материал": "Пузырчатая пленка",
          "Толщина": "400 мкм",
          "Цвет": "Синий",
          "Эффект": "Подогрев до +8°C"
        }),
        inStock: true,
        isPopular: false,
        isNew: false,
        discount: 0,
        rating: "4.4",
        reviewCount: 8
      },
      {
        name: "Робот-пылесос для бассейна",
        description: "Автоматический пылесос для очистки дна и стенок",
        price: "35000",
        originalPrice: "42000",
        category: "accessories",
        subcategory: null,
        brand: "Dolphin",
        volume: null,
        imageUrl: "https://pixabay.com/get/g357854e7fb59e092d285536302bda3ac39d11f3c4a30e7e8a482897a72dbd30428ef3ef15b5aa4aa7e80c6e98363f511e2044aa366f1f13f9ee4b4bc5170503a_1280.jpg",
        images: ["https://pixabay.com/get/g357854e7fb59e092d285536302bda3ac39d11f3c4a30e7e8a482897a72dbd30428ef3ef15b5aa4aa7e80c6e98363f511e2044aa366f1f13f9ee4b4bc5170503a_1280.jpg"],
        specifications: JSON.stringify({
          "Тип": "Автоматический",
          "Площадь": "До 100 м²",
          "Время работы": "2 часа",
          "Вес": "7 кг",
          "Длина кабеля": "18 м"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 17,
        rating: "4.9",
        reviewCount: 35
      },
      {
        name: "Лестница безопасности 91 см",
        description: "Односторонняя лестница с системой безопасности",
        price: "2800",
        originalPrice: null,
        category: "ladders",
        subcategory: null,
        brand: "Intex",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1592861956120-e524fc739696",
        images: ["https://images.unsplash.com/photo-1592861956120-e524fc739696"],
        specifications: JSON.stringify({
          "Высота": "91 см",
          "Материал": "Оцинкованная сталь",
          "Ступени": "3 шт",
          "Максимальная нагрузка": "136 кг",
          "Особенности": "Съемные ступени"
        }),
        inStock: true,
        isPopular: false,
        isNew: false,
        discount: 0,
        rating: "4.3",
        reviewCount: 7
      },
      {
        name: "Хлор длительного действия 3 кг",
        description: "Медленнорастворимые таблетки для дезинфекции воды",
        price: "1800",
        originalPrice: null,
        category: "chemicals",
        subcategory: null,
        brand: "AquaDoctor",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
        images: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19"],
        specifications: JSON.stringify({
          "Вес": "3 кг",
          "Форма": "Таблетки 200г",
          "Действующее вещество": "Хлор 90%",
          "Расход": "1 таблетка на 30 м³",
          "Срок годности": "3 года"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 0,
        rating: "4.7",
        reviewCount: 42
      },
      {
        name: "Тент защитный для бассейна 366 см",
        description: "Водонепроницаемый тент для защиты от загрязнений",
        price: "2200",
        originalPrice: "2800",
        category: "covers-underlays",
        subcategory: null,
        brand: "Summer Fun",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
        images: ["https://images.unsplash.com/photo-1571902943202-507ec2618e8f"],
        specifications: JSON.stringify({
          "Диаметр": "366 см",
          "Материал": "ПВХ 650 г/м²",
          "Водонепроницаемость": "100%",
          "Крепление": "Резинка + шнур",
          "Цвет": "Синий"
        }),
        inStock: true,
        isPopular: false,
        isNew: false,
        discount: 21,
        rating: "4.2",
        reviewCount: 13
      },
      {
        name: "Набор для чистки бассейна",
        description: "Комплект: сачок, щетка, телескопическая ручка",
        price: "3200",
        originalPrice: null,
        category: "accessories",
        subcategory: null,
        brand: "Bestway",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b",
        images: ["https://images.unsplash.com/photo-1584464491033-06628f3a6b7b"],
        specifications: JSON.stringify({
          "В комплекте": "Сачок, щетка, ручка",
          "Длина ручки": "120-240 см",
          "Материал": "Алюминий + пластик",
          "Сачок": "Глубокий с мелкой сеткой",
          "Щетка": "Для стенок и дна"
        }),
        inStock: true,
        isPopular: false,
        isNew: true,
        discount: 0,
        rating: "4.5",
        reviewCount: 18
      },
      {
        name: "pH регулятор 1.5 кг",
        description: "Средство для понижения уровня pH воды в бассейне",
        price: "950",
        originalPrice: null,
        category: "chemicals",
        subcategory: null,
        brand: "Chemoform",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7",
        images: ["https://images.unsplash.com/photo-1576506295286-5cda18df43e7"],
        specifications: JSON.stringify({
          "Вес": "1.5 кг",
          "Тип": "Гранулы",
          "Назначение": "Понижение pH",
          "Расход": "100г на 10 м³",
          "Оптимальный pH": "7.0-7.4"
        }),
        inStock: true,
        isPopular: false,
        isNew: false,
        discount: 0,
        rating: "4.6",
        reviewCount: 9
      },
      
      // Intex каркасные бассейны (по образцу intex-bassein.ru)
      {
        name: "Intex Ultra Frame XTR 549x132 см",
        description: "Премиальный каркасный бассейн с песочным фильтром",
        price: "89990",
        originalPrice: "109990",
        category: "intex-frame",
        subcategory: "ultra-frame-xtr",
        brand: "Intex",
        volume: "26423л",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
        images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5"],
        specifications: JSON.stringify({
          "Размер": "549 x 132 см",
          "Объем": "26423 л",
          "Материал каркаса": "Сталь с покрытием",
          "Материал чаши": "ПВХ Super-Tough",
          "Фильтр-насос": "Песочный 6000 л/ч",
          "Лестница": "В комплекте",
          "Подстилка": "В комплекте",
          "Тент": "В комплекте"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 18,
        rating: "4.9",
        reviewCount: 67
      },
      {
        name: "Intex Prism Frame 457x107 см",
        description: "Каркасный бассейн серии Prism Frame с хромированными соединениями",
        price: "32990",
        originalPrice: null,
        category: "intex-frame",
        subcategory: "prism-frame",
        brand: "Intex",
        volume: "16805л",
        imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
        images: ["https://images.unsplash.com/photo-1571902943202-507ec2618e8f"],
        specifications: JSON.stringify({
          "Размер": "457 x 107 см",
          "Объем": "16805 л",
          "Материал каркаса": "Сталь с порошковой окраской",
          "Материал чаши": "Трёхслойный ПВХ",
          "Фильтр-насос": "2006 л/ч",
          "Лестница": "Опционально",
          "Максимальная нагрузка": "Не указана"
        }),
        inStock: true,
        isPopular: false,
        isNew: true,
        discount: 0,
        rating: "4.7",
        reviewCount: 34
      },
      {
        name: "Intex Metal Frame 305x76 см",
        description: "Классический каркасный бассейн серии Metal Frame",
        price: "12990",
        originalPrice: "15490",
        category: "intex-frame",
        subcategory: "metal-frame",
        brand: "Intex",
        volume: "4485л",
        imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856",
        images: ["https://images.unsplash.com/photo-1534430480872-3498386e7856"],
        specifications: JSON.stringify({
          "Размер": "305 x 76 см",
          "Объем": "4485 л",
          "Материал каркаса": "Оцинкованная сталь",
          "Материал чаши": "ПВХ 3 слоя",
          "Фильтр-насос": "1250 л/ч",
          "Время сборки": "30 минут",
          "Дренажный клапан": "Есть"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 16,
        rating: "4.5",
        reviewCount: 128
      },
      
      // Bestway каркасные бассейны
      {
        name: "Bestway Steel Pro Max 366x100 см",
        description: "Каркасный бассейн премиум-класса Steel Pro Max",
        price: "28990",
        originalPrice: null,
        category: "bestway-frame",
        subcategory: "steel-pro-max",
        brand: "Bestway",
        volume: "9150л",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
        images: ["https://images.unsplash.com/photo-1557804506-669a67965ba0"],
        specifications: JSON.stringify({
          "Размер": "366 x 100 см",
          "Объем": "9150 л",
          "Материал каркаса": "Сталь с антикоррозийным покрытием",
          "Материал чаши": "TriTech трёхслойный",
          "Фильтр-насос": "2006 л/ч",
          "Лестница": "В комплекте",
          "Подстилка": "В комплекте",
          "Сливной клапан": "ChemConnect"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 0,
        rating: "4.8",
        reviewCount: 89
      },
      {
        name: "Bestway Power Steel 488x122 см",
        description: "Овальный каркасный бассейн Power Steel с песочным фильтром",
        price: "67990",
        originalPrice: "79990",
        category: "bestway-frame",
        subcategory: "power-steel",
        brand: "Bestway",
        volume: "17203л",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96"],
        specifications: JSON.stringify({
          "Размер": "488 x 305 x 122 см",
          "Объем": "17203 л",
          "Форма": "Овальный",
          "Материал каркаса": "Сталь Corten",
          "Материал чаши": "TriTech 3-слоя",
          "Фильтр-насос": "Песочный 3785 л/ч",
          "Лестница": "Двухсторонняя",
          "Тент": "Flowclear"
        }),
        inStock: true,
        isPopular: false,
        isNew: true,
        discount: 15,
        rating: "4.6",
        reviewCount: 23
      },
      
      // Надувные бассейны
      {
        name: "Intex Easy Set 366x91 см",
        description: "Надувной бассейн с системой Easy Set",
        price: "8990",
        originalPrice: null,
        category: "inflatable-pools",
        subcategory: "easy-set",
        brand: "Intex",
        volume: "7290л",
        imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635",
        images: ["https://images.unsplash.com/photo-1530549387789-4c1017266635"],
        specifications: JSON.stringify({
          "Размер": "366 x 91 см",
          "Объем": "7290 л",
          "Материал": "ПВХ Super-Tough",
          "Надувное кольцо": "Верхнее",
          "Фильтр-насос": "2006 л/ч",
          "Время установки": "15 минут",
          "Слив": "Дренажный клапан"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 0,
        rating: "4.4",
        reviewCount: 156
      },
      {
        name: "Bestway Fast Set 457x107 см",
        description: "Большой надувной бассейн Fast Set с картриджным фильтром",
        price: "14990",
        originalPrice: "17990",
        category: "inflatable-pools",
        subcategory: "fast-set",
        brand: "Bestway",
        volume: "16015л",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"],
        specifications: JSON.stringify({
          "Размер": "457 x 107 см",
          "Объем": "16015 л",
          "Материал": "Vinyl 0.55мм",
          "Технология": "I-Beam конструкция",
          "Фильтр-насос": "3028 л/ч",
          "Заплатки": "В комплекте",
          "Клапан": "Double Lock"
        }),
        inStock: true,
        isPopular: false,
        isNew: false,
        discount: 17,
        rating: "4.3",
        reviewCount: 67
      },
      
      // Оборудование
      {
        name: "Песочный фильтр Intex Krystal Clear 6000 л/ч",
        description: "Мощный песочный фильтр для больших бассейнов",
        price: "18500",
        originalPrice: null,
        category: "equipment",
        subcategory: "sand-filters",
        brand: "Intex",
        volume: null,
        imageUrl: "https://pixabay.com/get/gd670bb74f0a47e34eda0506d0f0dadeda3f72eafc355e46ef91a1aa4773a75f9019f39aee1572c64843541647b3f91652665259c687decef7956b984d2d9a4d6_1280.jpg",
        images: ["https://pixabay.com/get/gd670bb74f0a47e34eda0506d0f0dadeda3f72eafc355e46ef91a1aa4773a75f9019f39aee1572c64843541647b3f91652665259c687decef7956b984d2d9a4d6_1280.jpg"],
        specifications: JSON.stringify({
          "Производительность": "6000 л/ч",
          "Мощность": "230 Вт",
          "Объем бака": "Не указан",
          "Загрузка песка": "35 кг",
          "Размер песка": "0.45-0.85 мм",
          "6-ти позиционный клапан": "Есть",
          "Манометр": "Встроенный"
        }),
        inStock: true,
        isPopular: true,
        isNew: false,
        discount: 0,
        rating: "4.7",
        reviewCount: 45
      },
      {
        name: "Тепловой насос Bestway 2.8 кВт",
        description: "Тепловой насос для подогрева воды в бассейне",
        price: "85000",
        originalPrice: "95000",
        category: "equipment",
        subcategory: "heaters",
        brand: "Bestway",
        volume: null,
        imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
        images: ["https://images.unsplash.com/photo-1581094794329-c8112a89af12"],
        specifications: JSON.stringify({
          "Мощность нагрева": "2.8 кВт",
          "Потребляемая мощность": "0.65 кВт",
          "COP": "4.3",
          "Объем бассейна": "До 20 м³",
          "Рабочая температура": "-7°C до +43°C",
          "Хладагент": "R32",
          "Подключение": "220В"
        }),
        inStock: true,
        isPopular: false,
        isNew: true,
        discount: 11,
        rating: "4.5",
        reviewCount: 12
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
    const product: Product = { 
      ...insertProduct, 
      id,
      originalPrice: insertProduct.originalPrice ?? null,
      subcategory: insertProduct.subcategory ?? null,
      brand: insertProduct.brand ?? null,
      volume: insertProduct.volume ?? null,
      images: insertProduct.images ?? null,
      inStock: insertProduct.inStock ?? true,
      isPopular: insertProduct.isPopular ?? false,
      isNew: insertProduct.isNew ?? false,
      discount: insertProduct.discount ?? 0,
      rating: insertProduct.rating ?? "0",
      reviewCount: insertProduct.reviewCount ?? 0
    };
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
    const category: Category = { 
      ...insertCategory, 
      id,
      description: insertCategory.description ?? null,
      imageUrl: insertCategory.imageUrl ?? null,
      productCount: insertCategory.productCount ?? 0
    };
    this.categories.set(id, category);
    return category;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id,
      status: insertOrder.status ?? "pending",
      customerEmail: insertOrder.customerEmail ?? null,
      deliveryAddress: insertOrder.deliveryAddress ?? null,
      notes: insertOrder.notes ?? null,
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
      message: insertConsultation.message ?? null,
      email: insertConsultation.email ?? null,
      status: "pending",
      createdAt: new Date() 
    };
    this.consultations.set(id, consultation);
    return consultation;
  }
}

export const storage = new MemStorage();
