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

    // Initialize products - Полный каталог с улучшенными описаниями (332 товаров)
    const productsData = [
  {
    "name": "Чаша каркасного бассейна 366*122см",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "9960",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/5dd/5ddf4e93cf633b24ebb542708d0d2074.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/5dd/5ddf4e93cf633b24ebb542708d0d2074.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 10
  },
  {
    "name": "Чаша каркасного бассейна 366*122см",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "9960",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/c38/c3862118045268d0c64043f822211af5.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/c38/c3862118045268d0c64043f822211af5.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 19
  },
  {
    "name": "Чаша круглая для бассейна 200 х 140 см, 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "10000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/dcd/od6z2e9i42yt95390u4f4uo0c0ibe6yx.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/dcd/od6z2e9i42yt95390u4f4uo0c0ibe6yx.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 44
  },
  {
    "name": "Чаша круглая для бассейна 200 х 140 см, 0.4/0.4 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "10000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e2e/cv61bxw5jib0p1wb2xny1pvuttz4cbvy.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e2e/cv61bxw5jib0p1wb2xny1pvuttz4cbvy.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 26
  },
  {
    "name": "Чаша для каркасного бассейна см, Metal Frame Pool",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "10120",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2cd/2cd7cecde7aae5bac77fcf90b5742a50.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2cd/2cd7cecde7aae5bac77fcf90b5742a50.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"19.83\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.08\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 12
  },
  {
    "name": "Чаша 610х366х122см для овального бассейна Fast Set",
    "description": "Надувной бассейн  - отличный выбор для быстрого создания зоны отдыха у дома. Конструкция Easy Set позволяет установить бассейн всего за несколько минут: надуйте верхнее кольцо и наполните водой. Изготовлен из прочного винила с защитой от солнечных лучей. Компактен в сложенном виде, легко хранится и транспортируется.",
    "price": "10680",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/994/994040c229b2d08985e233484b1dda5f.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/994/994040c229b2d08985e233484b1dda5f.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"37.48\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.124\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 23
  },
  {
    "name": "Чаша 610х366х122см для овального бассейна Fast Set",
    "description": "Надувной бассейн  - отличный выбор для быстрого создания зоны отдыха у дома. Конструкция Easy Set позволяет установить бассейн всего за несколько минут: надуйте верхнее кольцо и наполните водой. Изготовлен из прочного винила с защитой от солнечных лучей. Компактен в сложенном виде, легко хранится и транспортируется.",
    "price": "10680",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/748/7484f54c61b6b193aca3991e718f65e8.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/748/7484f54c61b6b193aca3991e718f65e8.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"36.7\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.124\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 22
  },
  {
    "name": "Чаша 488х305х107см для овального бассейна Steel Pro",
    "description": "Вес упаковки (кг): 30.01 Форма бассейна: Овальный Страна производства: КИТАЙ Длина/Диаметр, см: 488 Ширина, см: 305 Высота, см: 107 Объем упаковки (м3): 0.147Чаша для круглого овального бассейна Steel Pro 488х305х107см. Выполнена из высококачественного трехслойного ПВХ: два слоя винила и внешний слой высокопрочный полиэстер. Отличается высокой прочностью, не подвержена растягиванию, истиранию, воздействию ультрафиолета. Чаша оборудована всем необходимым для подключения систем фильтрации, а также...",
    "price": "10680",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/b0c/b0ca2fc2b64f3066c35faf576fec8e9c.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/b0c/b0ca2fc2b64f3066c35faf576fec8e9c.jpg",
      "https://basseyn.ru/upload/iblock/d3b/d3b68b772bbe805b95bc8129da31fc1b.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"30.01\",\"Форма бассейна\":\"Овальный\",\"Страна производства\":\"КИТАЙ\",\"Длина/Диаметр, см\":\"488\",\"Ширина, см\":\"305\",\"Высота, см\":\"107\",\"Объем упаковки (м3)\":\"0.147\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 47
  },
  {
    "name": "Чаша для овального бассейна Steel Pro 549х366х122 см, 15033 л",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "10690",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/c55/c5544809e97ea7c2cdbe8ae6d2c918ee.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/c55/c5544809e97ea7c2cdbe8ae6d2c918ee.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"0\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 17
  },
  {
    "name": "Чаша для бассейна 488x107см, Easy Set Pool",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Диаметр: 488 см. Высота: 107 см. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "10930",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/d3b/d3b79ca6b01fffad7d8ad6c4563bd628.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/d3b/d3b79ca6b01fffad7d8ad6c4563bd628.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"25\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.108\",\"Диаметр\":\"488 см\",\"Высота\":\"107 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 38
  },
  {
    "name": "Чаша для каркасного бассейна 457x107см, Metal Frame Pool",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "10990",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/a1d/a1d1bd1754f46930088740d3ac274902.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/a1d/a1d1bd1754f46930088740d3ac274902.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"19.83\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.081\",\"Диаметр\":\"457 см\",\"Высота\":\"107 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 51
  },
  {
    "name": "Чаша 360*90см, для бассейна со стальными стенками Hydrium Splasher",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "11160",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/bd0/bd0ac572a700de56279f8aa3d0c1612d.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/bd0/bd0ac572a700de56279f8aa3d0c1612d.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 10
  },
  {
    "name": "Каркасный бассейн 366х91см с фильтр-насосом",
    "description": "Форма бассейна: Круглый Тип фильтр-насоса: Картриджный насос Длина/Диаметр, см: 366 Высота, см: 91 Время установки, мин: 45",
    "price": "11750",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/340/kf65qcpbl28j0ajpoe5ps661hz1atqiu.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/340/kf65qcpbl28j0ajpoe5ps661hz1atqiu.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Длина/Диаметр, см\":\"366\",\"Высота, см\":\"91\",\"Время установки, мин\":\"45\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 49
  },
  {
    "name": "Каркасный бассейн 305х76см с фильтр-насосом",
    "description": "Форма бассейна: Круглый Тип фильтр-насоса: Картриджный насос Длина/Диаметр, см: 305 Высота, см: 76 Время установки, мин: 45",
    "price": "11990",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/67a/gw3x91roip17z5w003k030j6imw00jtq.webp",
    "images": [
      "https://basseyn.ru/upload/iblock/67a/gw3x91roip17z5w003k030j6imw00jtq.webp"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Длина/Диаметр, см\":\"305\",\"Высота, см\":\"76\",\"Время установки, мин\":\"45\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 26
  },
  {
    "name": "Чаша для каркасного бассейна 427x122см, Metal Frame Pool",
    "description": "Вес упаковки (кг): 0 Форма бассейна: Круглый Страна производства: КИТАЙ Длина/Диаметр, см: 427 Высота, см: 122 Объем упаковки (м3): 0Чаша для круглого бассейна Metal Frame Pool 427x122см. Выполнена из высококачественного трехслойного ПВХ: два слоя винила и внешний слой высокопрочный полиэстер. Отличается высокой прочностью, не подвержена растягиванию, истиранию, воздействию ультрафиолета. Чаша оборудована всем необходимым для подключения систем фильтрации, а также имеет сливной клапан....",
    "price": "12020",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "intex",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/4dd/4ddd7285c800bb200c7d95d929d7362e.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/4dd/4ddd7285c800bb200c7d95d929d7362e.jpg",
      "https://basseyn.ru/upload/iblock/6ee/6eefbae1510cc7122437a23008e17190.jpg",
      "https://basseyn.ru/upload/iblock/882/882eed471cb76b8b6168c4f612fa1b65.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"0\",\"Форма бассейна\":\"Круглый\",\"Страна производства\":\"КИТАЙ\",\"Длина/Диаметр, см\":\"427\",\"Высота, см\":\"122\",\"Объем упаковки (м3)\":\"0\",\"Диаметр\":\"427 см\",\"Высота\":\"122 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 25
  },
  {
    "name": "Каркасный бассейн 305х100см, 6148л",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "12080",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": "6148л",
    "imageUrl": "https://basseyn.ru/upload/iblock/dad/12h2dlmc91oli6le4ccudzfq5n2s6tnv.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/dad/12h2dlmc91oli6le4ccudzfq5n2s6tnv.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 40
  },
  {
    "name": "Чаша круглая для бассейна 244 х 140 см. 0.4/0.4 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "12400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e8e/rln2hyessncoo2dl2kvieci5fhdntw29.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e8e/rln2hyessncoo2dl2kvieci5fhdntw29.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.0",
    "reviewCount": 12
  },
  {
    "name": "Чаша круглая для бассейна 200 х 140 см, 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "12400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/5f0/30iwl64zyki1prw6bf20bdgvbikkcv4l.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/5f0/30iwl64zyki1prw6bf20bdgvbikkcv4l.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 41
  },
  {
    "name": "Чаша круглая для бассейна 244 х 140 см, 0.25/0.4mm Patterned Liner 85058",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "12400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/a82/a8211ee471b6b48aa1b96dee3d1d7ef4.PNG",
    "images": [
      "https://basseyn.ru/upload/iblock/a82/a8211ee471b6b48aa1b96dee3d1d7ef4.PNG"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 42
  },
  {
    "name": "Чаша 427x107см для каркасного бассейна Steel Pro",
    "description": "Каркасный бассейн  серии Steel Pro - надежная конструкция с металлическим каркасом, покрытым антикоррозийным слоем. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "12470",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/9a3/qnxrj327uza1iedu69wvoc3nazycur2l.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/9a3/qnxrj327uza1iedu69wvoc3nazycur2l.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 43
  },
  {
    "name": "Чаша 457*122см, для каркасного бассейна Steel Pro MAX",
    "description": "Каркасный бассейн  серии Steel Pro - надежная конструкция с металлическим каркасом, покрытым антикоррозийным слоем. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "12470",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/5cd/5cdd6ff227ff77763b2e7c6e495c205b.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/5cd/5cdd6ff227ff77763b2e7c6e495c205b.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 25
  },
  {
    "name": "Чаша овальная для бассейна 300 х 200 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "12800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/376/wjfydbi4tkgievoyxcfvxfwfv44guwjs.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/376/wjfydbi4tkgievoyxcfvxfwfv44guwjs.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 44
  },
  {
    "name": "Чаша для овального бассейна Steel Pro 549х366х122 см, 15033 л",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "12830",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/02f/02fe4bc6fa4d5396958af6bf9dd71c1f.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/02f/02fe4bc6fa4d5396958af6bf9dd71c1f.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"0\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 38
  },
  {
    "name": "Чаша 404х201х100см для прямоугольного каркасного бассейна",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "12880",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/d36/qujw4cvvve9culenk9sc1qg02tw07uzg.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/d36/qujw4cvvve9culenk9sc1qg02tw07uzg.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 48
  },
  {
    "name": "Чаша 460*90см, для бассейна со стальными стенками Hydrium Splasher",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "13040",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/748/748f22a47a89e91a15de6c3800334d5d.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/748/748f22a47a89e91a15de6c3800334d5d.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 53
  },
  {
    "name": "Чаша 196*61см, для бассейна LAY-Z-SPA Vegas",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "13040",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/237/237693245f8bac7113749712c2606c35.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/237/237693245f8bac7113749712c2606c35.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 10
  },
  {
    "name": "Чаша 366x122см для каркасного бассейна Steel Pro",
    "description": "Каркасный бассейн  серии Steel Pro - надежная конструкция с металлическим каркасом, покрытым антикоррозийным слоем. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "13120",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/256/r1ehpmyrv2eoeuzdpodzib0rfft6bymv.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/256/r1ehpmyrv2eoeuzdpodzib0rfft6bymv.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 6
  },
  {
    "name": "Чаша 300*120см, для бассейна со стальными стенками Hydrium",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "13170",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/91d/91d72c681b12b8f0d37145651349ed4e.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/91d/91d72c681b12b8f0d37145651349ed4e.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 46
  },
  {
    "name": "Чаша 300х120см, для бассейна со стальными стенками Hydrium",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "13280",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/4dd/wvd30lcfme9j64w0rwpm2l9pmfazx2b6.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/4dd/wvd30lcfme9j64w0rwpm2l9pmfazx2b6.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 21
  },
  {
    "name": "Каркасный бассейн 366x201x66см, фильтр-насос",
    "description": "Форма бассейна: Прямоугольный Тип фильтр-насоса: Картриджный насос Длина/Диаметр, см: 366 Ширина, см: 201 Высота, см: 66 Время установки, мин: 45",
    "price": "13280",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/resize_cache/iblock/670/1500_1500_1/c1epb2y1k2d6k5apphhui6223mrg601q.jpg",
    "images": [
      "https://basseyn.ru/upload/resize_cache/iblock/670/1500_1500_1/c1epb2y1k2d6k5apphhui6223mrg601q.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/c7b/1500_1500_1/uia4r2tg1iw6zjmx11vc9syasx8edg4w.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/e07/1500_1500_1/la13ko9vp3xgtxd3wf5r7wwy8wvac80q.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/148/1500_1500_1/475ng82omgyc607elob0ygus13hdm7jy.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Прямоугольный\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Длина/Диаметр, см\":\"366\",\"Ширина, см\":\"201\",\"Высота, см\":\"66\",\"Время установки, мин\":\"45\",\"Размер\":\"366x201x66 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 13
  },
  {
    "name": "Каркасный бассейн 366x132см, 10250л, фил.-насос 3785л/ч",
    "description": "Вес упаковки (кг): 45,71 Форма бассейна: Круглый Вес товара: 43 Страна производства: КИТАЙ Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 3785 Объем, л: 10250 Длина/Диаметр, см: 366 Высота, см: 132 Время установки, мин: 45",
    "price": "13310",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "summer-escapes-polygroup",
    "brand": "Другие",
    "volume": "10250л",
    "imageUrl": "https://basseyn.ru/upload/iblock/016/016a10898e248b0fb0f77e5490120896.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/016/016a10898e248b0fb0f77e5490120896.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"45,71\",\"Форма бассейна\":\"Круглый\",\"Вес товара\":\"43\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"3785\",\"Объем, л\":\"10250\",\"Длина/Диаметр, см\":\"366\",\"Высота, см\":\"132\",\"Время установки, мин\":\"45\",\"Диаметр\":\"366 см\",\"Высота\":\"132 см\",\"Объем\":\"10250 л\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 43
  },
  {
    "name": "Чаша 610х366х122cм для овального бассейна Steel Pro",
    "description": "Вес упаковки (кг): 36.32 Форма бассейна: Овальный Страна производства: КИТАЙ Длина/Диаметр, см: 610 Ширина, см: 366 Высота, см: 122 Объем упаковки (м3): 0.139Чаша для круглого овального бассейна Steel Pro 610х366х122cм. Выполнена из высококачественного трехслойного ПВХ: два слоя винила и внешний слой высокопрочный полиэстер. Отличается высокой прочностью, не подвержена растягиванию, истиранию, воздействию ультрафиолета. Чаша оборудована всем необходимым для подключения систем фильтрации, а также...",
    "price": "13350",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/cea/cea3bcea59c5ec01dbb5a3f6993384e8.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/cea/cea3bcea59c5ec01dbb5a3f6993384e8.jpg",
      "https://basseyn.ru/upload/iblock/8d4/8d4ecd36d7e129dee34004025f0a7fb4.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"36.32\",\"Форма бассейна\":\"Овальный\",\"Страна производства\":\"КИТАЙ\",\"Длина/Диаметр, см\":\"610\",\"Ширина, см\":\"366\",\"Высота, см\":\"122\",\"Объем упаковки (м3)\":\"0.139\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 25
  },
  {
    "name": "Чаша для каркасного бассейна см, Metal Frame Pool",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "13410",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2f6/2f6cf2a541931c2a6279de8e224c3c21.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2f6/2f6cf2a541931c2a6279de8e224c3c21.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"15.9\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.072\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 17
  },
  {
    "name": "Чаша для овального бассейна 549x305x107см, Oval Frame Pool",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "13620",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/043/04325eb2821000ab87e36c4ff6b04714.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/043/04325eb2821000ab87e36c4ff6b04714.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"24.55\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.116\",\"Размер\":\"549x305x107 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 7
  },
  {
    "name": "Чаша для каркасного бассейна 400x200x100см, Rectangular Metal Frame Pool",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "13630",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/774/7743367ee92abcdab85016a5e9ce3bb5.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/774/7743367ee92abcdab85016a5e9ce3bb5.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"0\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0\",\"Размер\":\"400x200x100 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 47
  },
  {
    "name": "Чаша для каркасного бассейна Intex Prism Frame 427х107см",
    "description": "Каркасный бассейн Intex серии Prism Frame - отличается современным дизайном и технологией Super-Tough для дополнительной прочности. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "13680",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "intex",
    "brand": "Intex",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e02/e026112afe1543211ccec4027c7c968e.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e02/e026112afe1543211ccec4027c7c968e.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 23
  },
  {
    "name": "Каркасный бассейн 366x132см, 10250л, фил.-насос 3785л/ч, скиммер",
    "description": "Вес упаковки (кг): 46,21 Форма бассейна: Круглый Вес товара: 43,5 Страна производства: КИТАЙ Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 3785 Объем, л: 10250 Длина/Диаметр, см: 366 Высота, см: 132 Время установки, мин: 60",
    "price": "13840",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "summer-escapes-polygroup",
    "brand": "Другие",
    "volume": "10250л",
    "imageUrl": "https://basseyn.ru/upload/iblock/eef/vk3fcgpq5igjix00dry2iaoko0uwozqv.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/eef/vk3fcgpq5igjix00dry2iaoko0uwozqv.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"46,21\",\"Форма бассейна\":\"Круглый\",\"Вес товара\":\"43,5\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"3785\",\"Объем, л\":\"10250\",\"Длина/Диаметр, см\":\"366\",\"Высота, см\":\"132\",\"Время установки, мин\":\"60\",\"Диаметр\":\"366 см\",\"Высота\":\"132 см\",\"Объем\":\"10250 л\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 21
  },
  {
    "name": "Чаша для каркасного бассейна 457х122см, Metal Frame Pool",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "14070",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/b2b/b2bcccbd8da119a29e4eb131e2d90968.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/b2b/b2bcccbd8da119a29e4eb131e2d90968.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"21.1\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.095\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 10
  },
  {
    "name": "Чаша 457x107см для каркасного бассейна Steel Pro",
    "description": "Каркасный бассейн  серии Steel Pro - надежная конструкция с металлическим каркасом, покрытым антикоррозийным слоем. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "14150",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/f5f/m54ztb7w5bzu2o8ylltwyi17aq403k00.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/f5f/m54ztb7w5bzu2o8ylltwyi17aq403k00.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 6
  },
  {
    "name": "Чаша 396x122см для каркасного бассейна, серая",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "14410",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/df6/fhan5rbj1ii83gpzr6o3wqlaoj0lr3ty.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/df6/fhan5rbj1ii83gpzr6o3wqlaoj0lr3ty.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 8
  },
  {
    "name": "Чаша 412х201х122см для прямоугольного каркасного бассейна",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "14560",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/be2/t96zb8kr8igs8ghu8zaiarvrsjybm3qy.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/be2/t96zb8kr8igs8ghu8zaiarvrsjybm3qy.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 12
  },
  {
    "name": "Чаша для каркасного бассейна 412х201х122 см, 8124 л",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "14600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/3c9/ad7ay9vgwxukofh8lxw5r4zio7c8mz98.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/3c9/ad7ay9vgwxukofh8lxw5r4zio7c8mz98.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 28
  },
  {
    "name": "Чаша 427x122см для каркасного бассейна",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "14720",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/bcc/cuie2ntulrbq140880bmc9te1kanr102.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/bcc/cuie2ntulrbq140880bmc9te1kanr102.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 20
  },
  {
    "name": "Чаша 412х201х122см для прямоугольного каркасного бассейна, мрамор",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "14960",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/ec9/awbte8h886mtinjg6yoi7yim8hkxm9i0.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ec9/awbte8h886mtinjg6yoi7yim8hkxm9i0.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 51
  },
  {
    "name": "Чаша 732х366х122cм для овального бассейна Steel Pro",
    "description": "Вес упаковки (кг): 43.13 Форма бассейна: Овальный Страна производства: КИТАЙ Длина/Диаметр, см: 732 Ширина, см: 366 Высота, см: 122 Объем упаковки (м3): 0.128Чаша для круглого овального бассейна Steel Pro 732х366х122cм. Выполнена из высококачественного трехслойного ПВХ: два слоя винила и внешний слой высокопрочный полиэстер. Отличается высокой прочностью, не подвержена растягиванию, истиранию, воздействию ультрафиолета. Чаша оборудована всем необходимым для подключения систем фильтрации, а также...",
    "price": "15120",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/0de/0defde54e5fef68e5ef11267748e7622.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/0de/0defde54e5fef68e5ef11267748e7622.jpg",
      "https://basseyn.ru/upload/iblock/ad7/ad7a9b971bbf88be74e02807450cd62d.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"43.13\",\"Форма бассейна\":\"Овальный\",\"Страна производства\":\"КИТАЙ\",\"Длина/Диаметр, см\":\"732\",\"Ширина, см\":\"366\",\"Высота, см\":\"122\",\"Объем упаковки (м3)\":\"0.128\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 53
  },
  {
    "name": "Чаша 360*120см, для бассейна со стальными стенками Hydrium",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "15500",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/942/942736ffccdf02c3633edbf3bbaca8f1.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/942/942736ffccdf02c3633edbf3bbaca8f1.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 33
  },
  {
    "name": "Чаша круглая для бассейна 305 х 140 см. 0.4/0.4 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "15600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/ead/30lnbr5sak65yb1ifbgutqvdkbbj79m4.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ead/30lnbr5sak65yb1ifbgutqvdkbbj79m4.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 53
  },
  {
    "name": "Чаша круглая для бассейна 305 х 140 см. 0.4/0.4 мм. Лазурит",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "15600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/f96/5ays8j3dtw64gp7uj8zcla31nctx0gca.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/f96/5ays8j3dtw64gp7uj8zcla31nctx0gca.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 14
  },
  {
    "name": "Чаша круглая для бассейна 300 х 140 см. 0.4/0.4 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "15600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/53d/6v08k019b1ar43kee54ykvtm2p2y6n51.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/53d/6v08k019b1ar43kee54ykvtm2p2y6n51.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 37
  },
  {
    "name": "Чаша круглая для бассейна 250 х 140 см, 0.6/0.6 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "15600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/17e/c6pfnbmskvg0bj0pc4xjbzscqoly06w1.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/17e/c6pfnbmskvg0bj0pc4xjbzscqoly06w1.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 49
  },
  {
    "name": "Чаша круглая для бассейна 250 х 140 см, 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "15600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/0e4/iao5p0fz4s86ma1zx6r3f24ecvakv8bz.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/0e4/iao5p0fz4s86ma1zx6r3f24ecvakv8bz.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 39
  },
  {
    "name": "Чаша круглая для бассейна 244 х 140 см. 0.6/0.6 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "15600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/9b6/ipyer0s2rzi50vpc2rb3nvqwjx10l6sd.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/9b6/ipyer0s2rzi50vpc2rb3nvqwjx10l6sd.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 44
  },
  {
    "name": "Чаша круглая для бассейна 244 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "15600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/3ce/id1aq2grtpuf19nm9094a22dt221w0so.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/3ce/id1aq2grtpuf19nm9094a22dt221w0so.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 32
  },
  {
    "name": "Чаша круглая для бассейна 305 х 140 см, 0.4/0.4mm Patterned Liner 85058",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "15600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/484/484f216aa22297c81cfe140705e77eec.PNG",
    "images": [
      "https://basseyn.ru/upload/iblock/484/484f216aa22297c81cfe140705e77eec.PNG"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 26
  },
  {
    "name": "Каркасный бассейн 305x107см, 6300л, фил.-насос 2300л/ч",
    "description": "Вес упаковки (кг): 31.2 Форма бассейна: Круглый Страна производства: КИТАЙ Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 2300 Объем, л: 6300 Длина/Диаметр, см: 305 Высота, см: 107 Время установки, мин: 60 Объем упаковки (м3): 0.14",
    "price": "15760",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "summer-escapes-polygroup",
    "brand": "Другие",
    "volume": "6300л",
    "imageUrl": "https://basseyn.ru/upload/iblock/e04/5lxoth4n1va7ad3vdqums19locd2ao6x.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e04/5lxoth4n1va7ad3vdqums19locd2ao6x.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"31.2\",\"Форма бассейна\":\"Круглый\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"2300\",\"Объем, л\":\"6300\",\"Длина/Диаметр, см\":\"305\",\"Высота, см\":\"107\",\"Время установки, мин\":\"60\",\"Объем упаковки (м3)\":\"0.14\",\"Диаметр\":\"305 см\",\"Высота\":\"107 см\",\"Объем\":\"6300 л\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 49
  },
  {
    "name": "Каркасный бассейн, 457х91 см, 12627 л ,фильтр-насос 2006л/ч, тент, лестница, Bestway, 56066 BW",
    "description": "Каркасный бассейн Bestway - качественная модель для дачи и загородного дома. Вместимость бассейна составляет 2006 л. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "15770",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "bestway",
    "brand": "Bestway",
    "volume": "2006л",
    "imageUrl": "https://basseyn.ru/upload/iblock/e5e/e5ea664a41fb9a251a066ddebbd15ea1.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e5e/e5ea664a41fb9a251a066ddebbd15ea1.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"51.08\",\"Объем упаковки (м3)\":\"0.213\",\"Объем\":\"2006 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 19
  },
  {
    "name": "Каркасный бассейн 305x106см, 6300л, фил.-насос 3785л/ч, лестн, тент, подст, наб.д./чистки, скиммер",
    "description": "Форма бассейна: Круглый Страна производства: КИТАЙ Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 3785 Объем, л: 6300 Длина/Диаметр, см: 305 Высота, см: 106 Время установки, мин: 90",
    "price": "15840",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "summer-escapes-polygroup",
    "brand": "Другие",
    "volume": "6300л",
    "imageUrl": "https://basseyn.ru/upload/iblock/043/jaea03y23jgqplhc7t7nh1k37xybvial.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/043/jaea03y23jgqplhc7t7nh1k37xybvial.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"3785\",\"Объем, л\":\"6300\",\"Длина/Диаметр, см\":\"305\",\"Высота, см\":\"106\",\"Время установки, мин\":\"90\",\"Диаметр\":\"305 см\",\"Высота\":\"106 см\",\"Объем\":\"6300 л\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 30
  },
  {
    "name": "Чаша 360х120см, для бассейна со стальными стенками Hydrium",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "16000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/da1/2vqqpqnbvrzlau7egyoa2urilp1mctxd.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/da1/2vqqpqnbvrzlau7egyoa2urilp1mctxd.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 6
  },
  {
    "name": "Чаша овальная для бассейна 350 х 250 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "16000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/914/84ccyi82naf3dho21vsxml11ggo4pimr.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/914/84ccyi82naf3dho21vsxml11ggo4pimr.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 30
  },
  {
    "name": "Чаша овальная для бассейна 366 х 244 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "16000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/b43/k3n8rnbubkpc80rokvp87fkxv73nvfx7.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/b43/k3n8rnbubkpc80rokvp87fkxv73nvfx7.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 30
  },
  {
    "name": "Чаша для каркасного бассейна 478x124см, Sequoia Spirit™ Wood-Grain Frame Pool",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "16080",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/eea/eeaa32bc4bdd37c6746fa8c17914dcfd.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/eea/eeaa32bc4bdd37c6746fa8c17914dcfd.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"22.45\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.121\",\"Диаметр\":\"478 см\",\"Высота\":\"124 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 48
  },
  {
    "name": "Чаша 457x122см для каркасного бассейна Steel Pro",
    "description": "Каркасный бассейн  серии Steel Pro - надежная конструкция с металлическим каркасом, покрытым антикоррозийным слоем. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "16320",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/deb/2bo1siaak1igpkmf0n2sxqa3m58yzt2c.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/deb/2bo1siaak1igpkmf0n2sxqa3m58yzt2c.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 45
  },
  {
    "name": "Чаша овальная для бассейна 400 х 200 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "16400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/9bd/25tggqjx9qd21et3wpnd53xaoyv20ruq.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/9bd/25tggqjx9qd21et3wpnd53xaoyv20ruq.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 10
  },
  {
    "name": "Чаша овальная для бассейна 300 х 200 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "16400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/de0/7ljqgw878kysuwyx4d8z15quxlja1x5e.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/de0/7ljqgw878kysuwyx4d8z15quxlja1x5e.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 20
  },
  {
    "name": "Чаша для каркасного бассейна 400х200х100см",
    "description": "Форма бассейна: Прямоугольный Страна производства: КИТАЙ Длина/Диаметр, см: 400 Ширина, см: 200 Высота, см: 100Чаша для прямоугольного бассейна, размер 400х200х100см. Выполнена из высококачественного трехслойного ПВХ: два слоя винила и внешний слой высокопрочный полиэстер. Отличается высокой прочностью, не подвержена растягиванию, истиранию, воздействию ультрафиолета. Чаша оборудована всем необходимым для подключения систем фильтрации, а также имеет сливной клапан....",
    "price": "16560",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "intex",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/54a/2v8ruq8f02ffwukc5qnvwmfof29gsfci.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/54a/2v8ruq8f02ffwukc5qnvwmfof29gsfci.jpg",
      "https://basseyn.ru/upload/iblock/283/28331744912c114cd92bf05cee2831ac.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Прямоугольный\",\"Страна производства\":\"КИТАЙ\",\"Длина/Диаметр, см\":\"400\",\"Ширина, см\":\"200\",\"Высота, см\":\"100\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 16
  },
  {
    "name": "Каркасный бассейн 427х100 см, 12110л, фильтр-насос 2006л/ч, тент, лестница., Bestway, 56305 BW",
    "description": "Вес упаковки (кг): 50.11 Форма бассейна: Круглый Объем, л: 12110 Длина/Диаметр, см: 427 Высота, см: 100 Объем упаковки (м3): 0.234",
    "price": "16690",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "bestway",
    "brand": "Bestway",
    "volume": "12110л",
    "imageUrl": "https://basseyn.ru/upload/iblock/f35/f35d8147864d9f2bfac00fab7fb6173c.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/f35/f35d8147864d9f2bfac00fab7fb6173c.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"50.11\",\"Форма бассейна\":\"Круглый\",\"Объем, л\":\"12110\",\"Длина/Диаметр, см\":\"427\",\"Высота, см\":\"100\",\"Объем упаковки (м3)\":\"0.234\",\"Объем\":\"12110 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 20
  },
  {
    "name": "Чаша для каркасного бассейна 457х122см, Prism Frame",
    "description": "Каркасный бассейн  серии Prism Frame - отличается современным дизайном и технологией Super-Tough для дополнительной прочности. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "16720",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/d67/42ttam1bagmb30y6b2t6o5xd64k7zhcs.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/d67/42ttam1bagmb30y6b2t6o5xd64k7zhcs.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 31
  },
  {
    "name": "Чаша круглая для бассейна 366 х 140 см. 0.4/0.4 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "16800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/967/u2b2a3zr1shjgucyoegfp8me2g5z79y2.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/967/u2b2a3zr1shjgucyoegfp8me2g5z79y2.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 36
  },
  {
    "name": "Чаша круглая для бассейна 366 х 140 см, 0.4/0.4mm Patterned Liner 85058",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "16800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/da8/da867e82afcf42d25b9719f789b532fe.PNG",
    "images": [
      "https://basseyn.ru/upload/iblock/da8/da867e82afcf42d25b9719f789b532fe.PNG"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 44
  },
  {
    "name": "Чаша 549x366x122см для овального бассейна Steel Pro",
    "description": "Вес упаковки (кг): 36.13 Форма бассейна: Овальный Страна производства: КИТАЙ Длина/Диаметр, см: 549 Ширина, см: 366 Высота, см: 122 Объем упаковки (м3): 0.153Чаша для овального каркасного бассейна 549x366x122см. Выполнена из высококачественного трехслойного ПВХ: два слоя винила и внешний слой высокопрочный полиэстер. Отличается высокой прочностью, не подвержена растягиванию, истиранию, воздействию ультрафиолета. Чаша оборудована всем необходимым для подключения систем фильтрации, а также имеет с...",
    "price": "16910",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/5ff/5ffe4cfcd5db72e4c64a06b9e6882bd4.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/5ff/5ffe4cfcd5db72e4c64a06b9e6882bd4.jpg",
      "https://basseyn.ru/upload/iblock/427/4274087e7a6eac0c358dfe64eff57c38.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"36.13\",\"Форма бассейна\":\"Овальный\",\"Страна производства\":\"КИТАЙ\",\"Длина/Диаметр, см\":\"549\",\"Ширина, см\":\"366\",\"Высота, см\":\"122\",\"Объем упаковки (м3)\":\"0.153\",\"Размер\":\"549x366x122 см\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 26
  },
  {
    "name": "Чаша для каркасного бассейна 457х122см",
    "description": "Форма бассейна: Круглый Страна производства: КИТАЙ Длина/Диаметр, см: 457 Высота, см: 122Чаша для круглого бассейна, размер 457х122см. Выполнена из высококачественного трехслойного ПВХ: два слоя винила и внешний слой высокопрочный полиэстер. Отличается высокой прочностью, не подвержена растягиванию, истиранию, воздействию ультрафиолета. Чаша оборудована всем необходимым для подключения систем фильтрации, а также имеет сливной клапан.",
    "price": "17270",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "intex",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/882/882e56e0ecba0bf6c5c9146a23641837.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/882/882e56e0ecba0bf6c5c9146a23641837.jpg",
      "https://basseyn.ru/upload/iblock/0e4/0e40eef0e8c3ca3c8f0afbd1d7061e20.jpg",
      "https://basseyn.ru/upload/iblock/70d/70d8bcea3dc8c983174979fa1ac7782d.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Страна производства\":\"КИТАЙ\",\"Длина/Диаметр, см\":\"457\",\"Высота, см\":\"122\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.0",
    "reviewCount": 52
  },
  {
    "name": "ЧАША ПРЯМОУГОЛЬНОГО КАРКАСНОГО БАССЕЙНА 488Х244Х107 PRISM FRAME POOL",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "17280",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/1a7/1a7187badd58a78f13754b2f33cdfad3.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/1a7/1a7187badd58a78f13754b2f33cdfad3.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 16
  },
  {
    "name": "Каркасный бассейн Steel Pro 366х122см, 10250л, Bestway, 5617T BW",
    "description": "Каркасный бассейн Bestway серии Steel Pro - надежная конструкция с металлическим каркасом, покрытым антикоррозийным слоем. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "17520",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "bestway",
    "brand": "Bestway",
    "volume": "10250л",
    "imageUrl": "https://basseyn.ru/upload/iblock/b9d/f257l6t5tncsxr1r8dcemeqn1kzm073r.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/b9d/f257l6t5tncsxr1r8dcemeqn1kzm073r.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 24
  },
  {
    "name": "Чаша круглая для бассейна 250 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "17600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/d84/8om1gvvpllahoyzfxexx2cw24sdo7izq.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/d84/8om1gvvpllahoyzfxexx2cw24sdo7izq.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 52
  },
  {
    "name": "Чаша для каркасного бассейна 412х201х122 см, 8124 л",
    "description": "Вес упаковки (кг): 0 Форма бассейна: Прямоугольный Страна производства: КИТАЙ Длина/Диаметр, см: 412 Ширина, см: 201 Высота, см: 122 Объем упаковки (м3): 0Чаша для прямоугольного каркасного бассейна 412х201х122 см. Выполнена из высококачественного трехслойного ПВХ: два слоя винила и внешний слой высокопрочный полиэстер. Отличается высокой прочностью, не подвержена растягиванию, истиранию, воздействию ультрафиолета. Чаша оборудована всем необходимым для подключения систем фильтрации, а также имее...",
    "price": "18280",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/727/727c87d85c1c76f56603cff8557eb75e.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/727/727c87d85c1c76f56603cff8557eb75e.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"0\",\"Форма бассейна\":\"Прямоугольный\",\"Страна производства\":\"КИТАЙ\",\"Длина/Диаметр, см\":\"412\",\"Ширина, см\":\"201\",\"Высота, см\":\"122\",\"Объем упаковки (м3)\":\"0\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 27
  },
  {
    "name": "Чаша 488x122см для каркасного бассейна Steel Pro",
    "description": "Каркасный бассейн  серии Steel Pro - надежная конструкция с металлическим каркасом, покрытым антикоррозийным слоем. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "18400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/bf5/79g8a85i3vod16nnfahf3n4prcw1i9bf.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/bf5/79g8a85i3vod16nnfahf3n4prcw1i9bf.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 11
  },
  {
    "name": "Чаша овальная для бассейна 300 х 200 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "18400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/eb2/y5zcghr3z2cyd9c5pucwi5wlirsay9zl.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/eb2/y5zcghr3z2cyd9c5pucwi5wlirsay9zl.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 8
  },
  {
    "name": "Чаша овальная для бассейна 400 х 300 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "18400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/373/trjdof7qg4okaf11foz8ph4vkcek81mb.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/373/trjdof7qg4okaf11foz8ph4vkcek81mb.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 13
  },
  {
    "name": "Чаша 457x122см для бассейна с надувным верхом Fast Set",
    "description": "Надувной бассейн  - отличный выбор для быстрого создания зоны отдыха у дома. Конструкция Easy Set позволяет установить бассейн всего за несколько минут: надуйте верхнее кольцо и наполните водой. Изготовлен из прочного винила с защитой от солнечных лучей. Компактен в сложенном виде, легко хранится и транспортируется.",
    "price": "18480",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/402/2yc2gr6e3ogmqwmrtbwz05ff3le7a96g.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/402/2yc2gr6e3ogmqwmrtbwz05ff3le7a96g.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 20
  },
  {
    "name": "Чаша для бассейна 549x122см, Easy Set Pool",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Диаметр: 549 см. Высота: 122 см. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "18670",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/301/3014434c8f0729cf3b11d18fc5d0aeed.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/301/3014434c8f0729cf3b11d18fc5d0aeed.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"33.25\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.147\",\"Диаметр\":\"549 см\",\"Высота\":\"122 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 30
  },
  {
    "name": "Чаша 488x122см для каркасного бассейна",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "18800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/aca/99zx78op1lds6j2wp3stdj2pjxevfjw9.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/aca/99zx78op1lds6j2wp3stdj2pjxevfjw9.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 7
  },
  {
    "name": "Чаша 460*120см, для каркасного бассейна Hydrium",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "18880",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/88f/88f0dd9f091527fa95e40466b18e524e.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/88f/88f0dd9f091527fa95e40466b18e524e.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 34
  },
  {
    "name": "Чаша 460*120см, для бассейна со стальными стенками Hydrium",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "18880",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/908/9083ae50082002c4ecd0ee6de97e7e99.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/908/9083ae50082002c4ecd0ee6de97e7e99.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 6
  },
  {
    "name": "Чаша круглая для бассейна 457 х 140 см. 0.4/0.4 мм. Лазурит",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "19200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e27/l2854c5nfnceqq0xyx8dvkovsqdit82m.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e27/l2854c5nfnceqq0xyx8dvkovsqdit82m.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 37
  },
  {
    "name": "Чаша круглая для бассейна 457 х 140 см. 0.4/0.4 мм. Волна",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "19200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/caa/vjk4e06wa8tlm0k7nm1rkcduzbth9cwp.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/caa/vjk4e06wa8tlm0k7nm1rkcduzbth9cwp.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 33
  },
  {
    "name": "Чаша круглая для бассейна 400 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "19200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/db6/w3y7pyqkun2r1z6lm1711899fpevtubl.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/db6/w3y7pyqkun2r1z6lm1711899fpevtubl.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 17
  },
  {
    "name": "Чаша круглая для бассейна 400 х 140 см. 0.4/0.4 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "19200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/ef8/0lmgereegc00w6mx2xlddr6h30n5t51r.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ef8/0lmgereegc00w6mx2xlddr6h30n5t51r.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 19
  },
  {
    "name": "Чаша 488*366*122см, для овального бассейна со стальными стенками Hydrium",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "19240",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/3a0/3a036ed6932db616dbe35de3ec9f2669.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/3a0/3a036ed6932db616dbe35de3ec9f2669.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 17
  },
  {
    "name": "Чаша для каркасного бассейна 412х201х122см, (56722), 8124л",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "19300",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": "8124л",
    "imageUrl": "https://basseyn.ru/upload/iblock/a44/axogzyfmegf2e4mqhwhbr9tzeuatskik.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/a44/axogzyfmegf2e4mqhwhbr9tzeuatskik.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 14
  },
  {
    "name": "Чаша для каркасного бассейна 508x124см, Sequoia Spirit™ Wood-Grain Frame Pool",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "19300",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/ce5/ce5f6642d48c62a6610a7c52f158bd79.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ce5/ce5f6642d48c62a6610a7c52f158bd79.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"0\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0\",\"Диаметр\":\"508 см\",\"Высота\":\"124 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 33
  },
  {
    "name": "Чаша овальная для бассейна 450 х 250 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "19600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/b79/dqfqjh30krw0mypgy9ltb006gf739plf.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/b79/dqfqjh30krw0mypgy9ltb006gf739plf.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 31
  },
  {
    "name": "Чаша круглая армированная для бессейна 250 х 165 см. 0.7мм/Синяя",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "19600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/096/35h7xxiz76bf6p9cmhm6yxs6gsoyijsd.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/096/35h7xxiz76bf6p9cmhm6yxs6gsoyijsd.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 40
  },
  {
    "name": "Каркасный бассейн Metal Frame 457х84см, 11325л, фил.-насос 2006л/ч, лестница, тент, подстилка, Intex, 28228",
    "description": "Снят с производства: Да Вес упаковки (кг): 53.5 Форма бассейна: Круглый Серия бассейна: Metal Frame Страна производства: КИТАЙ Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 2006 Объем, л: 11325 Длина/Диаметр, см: 457 Высота, см: 84 Время установки, мин: 90 Объем упаковки (м3): 0.231",
    "price": "19760",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "intex",
    "brand": "Intex",
    "volume": "11325л",
    "imageUrl": "https://basseyn.ru/upload/iblock/2e9/a8bc57uuoqv4j6zmqbq1fumgcy0avs9c.webp",
    "images": [
      "https://basseyn.ru/upload/iblock/2e9/a8bc57uuoqv4j6zmqbq1fumgcy0avs9c.webp"
    ],
    "specifications": "{\"Снят с производства\":\"Да\",\"Вес упаковки (кг)\":\"53.5\",\"Форма бассейна\":\"Круглый\",\"Серия бассейна\":\"Metal Frame\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"2006\",\"Объем, л\":\"11325\",\"Длина/Диаметр, см\":\"457\",\"Высота, см\":\"84\",\"Время установки, мин\":\"90\",\"Объем упаковки (м3)\":\"0.231\",\"Объем\":\"11325 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 7
  },
  {
    "name": "Каркасный бассейн 366х122 см, 10250л, песочный фильтр-насос 2006л/ч, тент, лестница, Bestway, 56259 BW",
    "description": "Вес упаковки (кг): 54.53 Форма бассейна: Круглый Производительность фильтра л/ч: 2006 Объем, л: 10250 Длина/Диаметр, см: 366 Высота, см: 122 Объем упаковки (м3): 0.328",
    "price": "19820",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "bestway",
    "brand": "Bestway",
    "volume": "10250л",
    "imageUrl": "https://basseyn.ru/upload/iblock/7d4/7d4814280e13ef8a93ceac157e931e61.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/7d4/7d4814280e13ef8a93ceac157e931e61.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"54.53\",\"Форма бассейна\":\"Круглый\",\"Производительность фильтра л/ч\":\"2006\",\"Объем, л\":\"10250\",\"Длина/Диаметр, см\":\"366\",\"Высота, см\":\"122\",\"Объем упаковки (м3)\":\"0.328\",\"Объем\":\"10250 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 6
  },
  {
    "name": "Чаша для овального бассейна 610x366x122см, Oval Frame Pool",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "19860",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/8a6/8a6608ca11802df37243ed3ba6d46b91.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/8a6/8a6608ca11802df37243ed3ba6d46b91.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"35.82\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.138\",\"Размер\":\"610x366x122 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 27
  },
  {
    "name": "Чаша 488х244х122см для прямоугольного каркасного бассейна",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "19920",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/ebb/zolw0ro01dd3ydl540y4rz9g0sk8ur6g.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ebb/zolw0ro01dd3ydl540y4rz9g0sk8ur6g.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 35
  },
  {
    "name": "Чаша овальная для бассейна 500 х 200 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "20000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e32/ralslgnp7d2tjnq0a33kc6db4tkfps8l.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e32/ralslgnp7d2tjnq0a33kc6db4tkfps8l.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 43
  },
  {
    "name": "Чаша круглая для бассейна 305 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "20000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/747/uvpo2vw1wo9e5ayz1gl3weq411z2e2ew.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/747/uvpo2vw1wo9e5ayz1gl3weq411z2e2ew.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 27
  },
  {
    "name": "Чаша круглая для бассейна 305 х 140 см. 0.6/0.6 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "20000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/491/r37gmrma07nde0gvuv8huqhfaykz1kv3.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/491/r37gmrma07nde0gvuv8huqhfaykz1kv3.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 38
  },
  {
    "name": "Чаша круглая для бассейна 300 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "20000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/1c2/w5uvw85i96bdef8huu7w37jv4tx781xp.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/1c2/w5uvw85i96bdef8huu7w37jv4tx781xp.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 51
  },
  {
    "name": "Чаша круглая для бассейна 300 х 140 см. 0.6/0.6 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "20000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/1b4/20rqklxjx9mx359hgytjn2943xh5zlv9.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/1b4/20rqklxjx9mx359hgytjn2943xh5zlv9.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 23
  },
  {
    "name": "Бассейн Fast Set 457х122см, 13807л, фил.-насос 3028л/ч, лестница, Bestway, 57289 BW",
    "description": "Вес упаковки (кг): 45.16 Форма бассейна: Круглый Серия бассейна: Fast Set Страна производства: КИТАЙ Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 3028 Объем, л: 13807 Длина/Диаметр, см: 457 Высота, см: 122 Время установки, мин: 45 Объем упаковки (м3): 0.248",
    "price": "20320",
    "originalPrice": null,
    "category": "inflatable-pools",
    "subcategory": "bestway",
    "brand": "Bestway",
    "volume": "13807л",
    "imageUrl": "https://basseyn.ru/upload/iblock/233/ge7un011afjhec4xzxx5gowsytwulguq.jpeg",
    "images": [
      "https://basseyn.ru/upload/iblock/233/ge7un011afjhec4xzxx5gowsytwulguq.jpeg",
      "https://basseyn.ru/upload/iblock/811/1m211czhgf2hq666l6dgkg7q6grlmzee.jpeg",
      "https://basseyn.ru/upload/iblock/ef9/56gsemwjxmndqr4enhyj89cu8412yhgt.jpeg",
      "https://basseyn.ru/upload/iblock/821/8v7wtnkfhuh52n3p10vp3090r7yohnvz.jpeg",
      "https://basseyn.ru/upload/iblock/f36/ehm2q26f5v98184dyxinmdfkde4m92xa.jpeg",
      "https://basseyn.ru/upload/iblock/a01/g8igku8o1dtcixas99jsxh86avbrwokm.jpeg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"45.16\",\"Форма бассейна\":\"Круглый\",\"Серия бассейна\":\"Fast Set\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"3028\",\"Объем, л\":\"13807\",\"Длина/Диаметр, см\":\"457\",\"Высота, см\":\"122\",\"Время установки, мин\":\"45\",\"Объем упаковки (м3)\":\"0.248\",\"Объем\":\"13807 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 52
  },
  {
    "name": "Чаша овальная для бассейна 350 х 250 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "20400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/5cb/1jel6i5vzkv2oqv40co4uhyowe124fr7.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/5cb/1jel6i5vzkv2oqv40co4uhyowe124fr7.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 7
  },
  {
    "name": "Чаша овальная для бассейна 366 х 244 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "20400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/4c4/ec4qll06qe6ikvdymcg9zn92zw1a3r2w.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/4c4/ec4qll06qe6ikvdymcg9zn92zw1a3r2w.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 54
  },
  {
    "name": "Чаша для каркасного бассейна 549х132см, Ultra Frame Pool",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "20410",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/585/5858e78ff8c455d96d7fdae92f7f3cbc.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/585/5858e78ff8c455d96d7fdae92f7f3cbc.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"33.6\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.15\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 44
  },
  {
    "name": "Чаша 488х305х107cм для овального бассейна Steel Pro",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "20490",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/c03/l57m3ezhhlz26ptxk5qgzdfwpcnxnzeq.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/c03/l57m3ezhhlz26ptxk5qgzdfwpcnxnzeq.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 42
  },
  {
    "name": "Каркасный бассейн 366х122 см, 10250л, фильтр-насос 2006 л/ч, тент, лестница, Bestway, 56088 BW",
    "description": "Вес упаковки (кг): 47.82 Форма бассейна: Круглый Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 2006 Объем, л: 10250 Длина/Диаметр, см: 366 Высота, см: 122 Время установки, мин: 45 Объем упаковки (м3): 0.227",
    "price": "21090",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "bestway",
    "brand": "Bestway",
    "volume": "10250л",
    "imageUrl": "https://basseyn.ru/upload/iblock/fb6/fb6603fbe7940f3436694853e0dce671.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/fb6/fb6603fbe7940f3436694853e0dce671.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"47.82\",\"Форма бассейна\":\"Круглый\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"2006\",\"Объем, л\":\"10250\",\"Длина/Диаметр, см\":\"366\",\"Высота, см\":\"122\",\"Время установки, мин\":\"45\",\"Объем упаковки (м3)\":\"0.227\",\"Объем\":\"10250 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 54
  },
  {
    "name": "Чаша овальная для бассейна 500 х 250 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "21200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2bd/lubbzo8b1l7wk6mebpkcqep9i56neev7.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2bd/lubbzo8b1l7wk6mebpkcqep9i56neev7.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 22
  },
  {
    "name": "Чаша овальная для бассейна 488 х 274 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "21200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/20e/mfrp4f370nlhmbjt1rrh8gcgf5yvbbij.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/20e/mfrp4f370nlhmbjt1rrh8gcgf5yvbbij.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 44
  },
  {
    "name": "Чаша овальная для бассейна 400 х 200 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "21200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/1f1/p67yrgrhk1r7n8jmasx4bat54lht10qt.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/1f1/p67yrgrhk1r7n8jmasx4bat54lht10qt.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 18
  },
  {
    "name": "Каркасный бассейн Metal Frame 457х91см, фильтр-насос 220В, лестница, тент, подстилка, Intex, 28232",
    "description": "Снят с производства: Да Вес упаковки (кг): 57.4 Форма бассейна: Круглый Серия бассейна: Metal Frame Страна производства: КИТАЙ Тип фильтр-насоса: Картриджный насос Длина/Диаметр, см: 457 Высота, см: 91 Время установки, мин: 90 Объем упаковки (м3): 0.236",
    "price": "21200",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "intex",
    "brand": "Intex",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/910/uf42cshlypl2y4wb9pbuv49vlmt8h0j6.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/910/uf42cshlypl2y4wb9pbuv49vlmt8h0j6.jpg"
    ],
    "specifications": "{\"Снят с производства\":\"Да\",\"Вес упаковки (кг)\":\"57.4\",\"Форма бассейна\":\"Круглый\",\"Серия бассейна\":\"Metal Frame\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Длина/Диаметр, см\":\"457\",\"Высота, см\":\"91\",\"Время установки, мин\":\"90\",\"Объем упаковки (м3)\":\"0.236\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.0",
    "reviewCount": 41
  },
  {
    "name": "Чаша для каркасного бассейна 457x274x122см, Rectangular Ultra Frame Pool",
    "description": "Каркасный бассейн  серии Ultra Frame - премиальная модель с улучшенной конструкцией каркаса и повышенной прочностью. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "21220",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/902/9023c57b6445ea8f8d5d8cc68895b664.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/902/9023c57b6445ea8f8d5d8cc68895b664.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"26.8\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.118\",\"Размер\":\"457x274x122 см\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 41
  },
  {
    "name": "Чаша для каркасного бассейна 549x122см \"Ротанг\" (56977) 23062л",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "21330",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": "23062л",
    "imageUrl": "https://basseyn.ru/upload/iblock/fd1/xystswuyxfs7gxkf5k5dguuy4htapht6.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/fd1/xystswuyxfs7gxkf5k5dguuy4htapht6.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 41
  },
  {
    "name": "Каркасный бассейн 427х132см, 16048л",
    "description": "Вес упаковки (кг): 77,8 Форма бассейна: Круглый Вес товара: 77,8 Тип фильтр-насоса: Нет Объем, л: 16048 Длина/Диаметр, см: 427 Высота, см: 132 Время установки, мин: 30Практичный сборный каркасный бассейн Summer Escapes Р20-1452-B, обладает оригинальной конструкцией, которая позволяет собрать бассейн за 55 минут, без особых физических усилий. Чаша бассейна изготовлена из высококачественного трехслойного ПВХ. Стойки каркаса металлические с покрытием. При сборке бассейна следуйте рекомендациям, ука...",
    "price": "21360",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": "16048л",
    "imageUrl": "https://basseyn.ru/upload/iblock/dea/6ocbzw7nox0tve147bl5v9c0b3wsevg6.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/dea/6ocbzw7nox0tve147bl5v9c0b3wsevg6.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"77,8\",\"Форма бассейна\":\"Круглый\",\"Вес товара\":\"77,8\",\"Тип фильтр-насоса\":\"Нет\",\"Объем, л\":\"16048\",\"Длина/Диаметр, см\":\"427\",\"Высота, см\":\"132\",\"Время установки, мин\":\"30\",\"Объем\":\"16048 л\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 16
  },
  {
    "name": "Чаша 549x122см для каркасного бассейна Steel Pro",
    "description": "Каркасный бассейн  серии Steel Pro - надежная конструкция с металлическим каркасом, покрытым антикоррозийным слоем. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "21640",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/296/75p40lvicr715w3dyt0pcje8igzpz59d.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/296/75p40lvicr715w3dyt0pcje8igzpz59d.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 16
  },
  {
    "name": "Чаша 549х274х122см для прямоугольного каркасного бассейна",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "22180",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2a9/74e3g1pv44l9d5wb5rwagtzgezvnz7wk.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2a9/74e3g1pv44l9d5wb5rwagtzgezvnz7wk.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 13
  },
  {
    "name": "Чаша 488х244х122см для прямоугольного каркасного бассейна, мрамор",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "22350",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/de6/0xjgvl2hl21n5clq3zwtspwlsofs1ey4.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/de6/0xjgvl2hl21n5clq3zwtspwlsofs1ey4.jpg",
      "https://basseyn.ru/upload/iblock/cc9/wt95hl513thnfk6xepd2w35tmrmdlof4.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 31
  },
  {
    "name": "Чаша для каркасного бассейна 488x122см, Ultra Frame Pool",
    "description": "Вес упаковки (кг): 25.14 Форма бассейна: Круглый Страна производства: КИТАЙ Длина/Диаметр, см: 488 Высота, см: 122 Объем упаковки (м3): 0.1Чаша для круглого бассейна Ultra Frame Pool 488x122см. Выполнена из высококачественного трехслойного ПВХ: два слоя винила и внешний слой высокопрочный полиэстер. Отличается высокой прочностью, не подвержена растягиванию, истиранию, воздействию ультрафиолета. Чаша оборудована всем необходимым для подключения систем фильтрации, а также имеет сливной клапан....",
    "price": "22350",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "intex",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/196/1968bb28f77370d9918251634b69d41f.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/196/1968bb28f77370d9918251634b69d41f.jpg",
      "https://basseyn.ru/upload/iblock/2a1/2a1b8036478c99200c8938956ba24bec.jpg",
      "https://basseyn.ru/upload/iblock/45f/45fbda156c280c021a8a824419ae7f56.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"25.14\",\"Форма бассейна\":\"Круглый\",\"Страна производства\":\"КИТАЙ\",\"Длина/Диаметр, см\":\"488\",\"Высота, см\":\"122\",\"Объем упаковки (м3)\":\"0.1\",\"Диаметр\":\"488 см\",\"Высота\":\"122 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 28
  },
  {
    "name": "Чаша овальная для бассейна 500 х 300 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "22400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/541/cbybthxsx43ze180r8pr5afw286ayrk0.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/541/cbybthxsx43ze180r8pr5afw286ayrk0.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.0",
    "reviewCount": 43
  },
  {
    "name": "Чаша овальная для бассейна 488 х 305 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "22400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2a3/ycgtzw67ww60xzauj6g5i8aeggpip7l4.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2a3/ycgtzw67ww60xzauj6g5i8aeggpip7l4.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 9
  },
  {
    "name": "Чаша 490х130см, для бассейна со стальными стенками Hydrium",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "22420",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/ad9/fb8l29bug731f5gano660p4qlr4k5yeu.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ad9/fb8l29bug731f5gano660p4qlr4k5yeu.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 10
  },
  {
    "name": "Чаша круглая для бассейна 450 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "22800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/8bb/tw1m5re4329myf9ltydlxpy9ahs7qdr3.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/8bb/tw1m5re4329myf9ltydlxpy9ahs7qdr3.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 21
  },
  {
    "name": "Чаша круглая для бассейна 457 х 140 см. 0.4/0.4 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "22800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/99f/k0zgy83e6e5513jgfrf9c0o3s90cpulw.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/99f/k0zgy83e6e5513jgfrf9c0o3s90cpulw.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 47
  },
  {
    "name": "Чаша круглая для бассейна 366 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "22800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/5b9/dvgc5kley3uf95mqpbtu7yp25p2qq1ks.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/5b9/dvgc5kley3uf95mqpbtu7yp25p2qq1ks.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 23
  },
  {
    "name": "Чаша круглая для бассейна 350 х 140 см. 0.6/0.6 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "22800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/8cc/bcq28mmt4zi6d5fd97uqtdkoyg7kbo9h.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/8cc/bcq28mmt4zi6d5fd97uqtdkoyg7kbo9h.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 34
  },
  {
    "name": "Чаша круглая для бассейна 350 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "22800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/71e/e3w78uu4bvwepk31m4pkqcnsamwvdexy.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/71e/e3w78uu4bvwepk31m4pkqcnsamwvdexy.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 52
  },
  {
    "name": "Чаша круглая для бассейна 300 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "22800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2d3/bujs91in1lgud72hjts0wjc4kthdfeek.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2d3/bujs91in1lgud72hjts0wjc4kthdfeek.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 14
  },
  {
    "name": "Чаша круглая для бассейна 457 х 140 см, 0.4/0.4mm Patterned Liner 85058",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "22800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/940/9405dac586c9f24617053ea671b962b2.PNG",
    "images": [
      "https://basseyn.ru/upload/iblock/940/9405dac586c9f24617053ea671b962b2.PNG"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 54
  },
  {
    "name": "Чаша для круглого бассейна 460х132см, толщина 0,40 мм с накидным кантом",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "23030",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2ed/2ed77cd3cdbfad901f8f2e14d932ae9f.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2ed/2ed77cd3cdbfad901f8f2e14d932ae9f.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 8
  },
  {
    "name": "Чаша 549х274х132см для прямоугольного каркасного бассейна",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "23240",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2ee/wqtmv06hii037dzjrx31kpzqc6nx24ts.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2ee/wqtmv06hii037dzjrx31kpzqc6nx24ts.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 35
  },
  {
    "name": "Чаша для каркасного бассейна 549x132см \"Камень\" (56886), 26000л",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "23360",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": "26000л",
    "imageUrl": "https://basseyn.ru/upload/iblock/db0/io5zds5pj8f9o2s7mfyth7tcxj2c02f5.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/db0/io5zds5pj8f9o2s7mfyth7tcxj2c02f5.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 16
  },
  {
    "name": "Чаша овальная для бассейна 400 х 200 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "23600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/d19/2csd71s3x0ogepnos0tzxvzg0dfc808y.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/d19/2csd71s3x0ogepnos0tzxvzg0dfc808y.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 37
  },
  {
    "name": "Чаша овальная для бассейна 400 х 300 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "23600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/1a0/3ng4esamg5yhcezfn95y8cxf48mfqltf.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/1a0/3ng4esamg5yhcezfn95y8cxf48mfqltf.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 46
  },
  {
    "name": "Чаша овальная для бассейна 350 х 250 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "23600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/a19/my2tw6ce2yw3nqefcda6iombr2g0ep2c.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/a19/my2tw6ce2yw3nqefcda6iombr2g0ep2c.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 13
  },
  {
    "name": "Чаша овальная для бассейна 549 х 305 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "24000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/591/kw5svqep3cyskngju3uvw6xtmseifr2b.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/591/kw5svqep3cyskngju3uvw6xtmseifr2b.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 44
  },
  {
    "name": "Чаша 550х130см, для бассейна со стальными стенками Hydrium",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "24120",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/84d/4exikn0b339d89yxsjocearoo7emsww3.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/84d/4exikn0b339d89yxsjocearoo7emsww3.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 41
  },
  {
    "name": "Чаша 549х274х122cм для овального бассейна Steel Pro",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "24360",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/366/tsp89xncarm3vwup4vrcux87q6db6uwq.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/366/tsp89xncarm3vwup4vrcux87q6db6uwq.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 47
  },
  {
    "name": "Бассейн овальный с надув. бортом 488х305х107 см, 10759 л, фил.-насос 3028л/ч, тент, лестница., Bestway, 56447/56269 BW",
    "description": "Насосное оборудование для бассейна, обеспечивающее надежную работу системы водообмена. Простая установка и обслуживание. Совместимо с большинством моделей бассейнов.",
    "price": "24370",
    "originalPrice": null,
    "category": "inflatable-pools",
    "subcategory": "bestway",
    "brand": "Bestway",
    "volume": "3028л",
    "imageUrl": "https://basseyn.ru/upload/iblock/fe9/fe9d71646a2ebf9cb3533d2fafe41458.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/fe9/fe9d71646a2ebf9cb3533d2fafe41458.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"56.56\",\"Форма бассейна\":\"Овальный\",\"Объем упаковки (м3)\":\"0.326\",\"Объем\":\"3028 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 54
  },
  {
    "name": "Каркасный бассейн Steel Pro Max 427х107см, 13030л, фил.-насос 3028л/ч, лестница, тент, Bestway, 5614Z BW",
    "description": "Каркасный бассейн Bestway серии Steel Pro - надежная конструкция с металлическим каркасом, покрытым антикоррозийным слоем. Вместимость бассейна составляет 13030 л. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "24480",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "bestway",
    "brand": "Bestway",
    "volume": "13030л",
    "imageUrl": "https://basseyn.ru/upload/iblock/5cc/ybdtdlly8lqozjb8wr61q5riqvwkxvim.jpeg",
    "images": [
      "https://basseyn.ru/upload/iblock/5cc/ybdtdlly8lqozjb8wr61q5riqvwkxvim.jpeg",
      "https://basseyn.ru/upload/iblock/1ac/0rvm2yxybf79leuyagcb2qpxrjzn2her.jpg",
      "https://basseyn.ru/upload/iblock/39e/3mvt41qt89st6xfk5yskgs5xjx5gaunh.jpg",
      "https://basseyn.ru/upload/iblock/29c/e0pijts2mhfvbobil1jfqcd50ljwrl32.jpg",
      "https://basseyn.ru/upload/iblock/c60/re4fi8iy3y7noem1mn22gf6y74q7enhg.jpeg",
      "https://basseyn.ru/upload/iblock/b1c/dgcn1ep6cb4ad6eff101tskk9olwwdop.jpeg",
      "https://basseyn.ru/upload/iblock/7f9/w9gjp5erkriruyqae3cuf6kjlzc1ayfz.jpeg",
      "https://basseyn.ru/upload/iblock/49d/pwxlsve2iqo25awutiak5a7zqbj2ir2y.jpeg",
      "https://basseyn.ru/upload/iblock/2cf/v1b3hr3eusmfcksffc5aus51qlwyia4b.jpeg",
      "https://basseyn.ru/upload/iblock/5f9/e0xls6knjmt66wkox15wpl07b714zsj5.jpeg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"51.08\",\"Объем упаковки (м3)\":\"0.225\",\"Объем\":\"13030 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 11
  },
  {
    "name": "Чаша 549х274х122см для прямоугольного каркасного бассейна, мрамор",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "24960",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/b2c/af1wft1mt9ad50pna5sqqklqu3t9hyes.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/b2c/af1wft1mt9ad50pna5sqqklqu3t9hyes.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 8
  },
  {
    "name": "Каркасный бассейн Steel Pro 366х122см \"Ротанг\", 10250л, фил.-насос 2006л/ч, лестница",
    "description": "Форма бассейна: Круглый Серия бассейна: Steel Pro (Bestway) Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 2006 Объем, л: 10250 Длина/Диаметр, см: 366 Высота, см: 122 Время установки, мин: 60",
    "price": "25040",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": "10250л",
    "imageUrl": "https://basseyn.ru/upload/iblock/357/357357fd4ebb610347398f0f3057a726.jpeg",
    "images": [
      "https://basseyn.ru/upload/iblock/357/357357fd4ebb610347398f0f3057a726.jpeg"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Серия бассейна\":\"Steel Pro (Bestway)\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"2006\",\"Объем, л\":\"10250\",\"Длина/Диаметр, см\":\"366\",\"Высота, см\":\"122\",\"Время установки, мин\":\"60\",\"Объем\":\"10250 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 17
  },
  {
    "name": "Чаша 460х120см, для бассейна со стальными стенками Hydrium",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "25160",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/824/ja0qz2gv1vrg4mtf0bqgznezz5mhu4vd.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/824/ja0qz2gv1vrg4mtf0bqgznezz5mhu4vd.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 32
  },
  {
    "name": "Чаша овальная для бассейна 500 х 200 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "25200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/f4b/z4xy31hirw821lolmic9lb8y0ni44cpo.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/f4b/z4xy31hirw821lolmic9lb8y0ni44cpo.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 11
  },
  {
    "name": "Чаша овальная для бассейна 450 х 250 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "25200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/06c/ltztbp84ygaxsdu04as1kpgc38fftsrr.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/06c/ltztbp84ygaxsdu04as1kpgc38fftsrr.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 16
  },
  {
    "name": "Чаша круглая армированная для бессейна 300 х 165 см. 0.7мм/Синяя",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "25200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e1c/p397a0kxvucq06ryip5f0k43pudlz1bm.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e1c/p397a0kxvucq06ryip5f0k43pudlz1bm.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 14
  },
  {
    "name": "Чаша для каркасного бассейна 488х305х107см \"Ротанг\" (56946), 7250л",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "25400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": "7250л",
    "imageUrl": "https://basseyn.ru/upload/iblock/dc3/ho8o6ccbmtrnohg62jsqmart28y01rmx.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/dc3/ho8o6ccbmtrnohg62jsqmart28y01rmx.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 52
  },
  {
    "name": "Чаша круглая для бассейна 488 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "26400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e17/4uywxbvk5bi6lkhcbgp4iozgxtksim12.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e17/4uywxbvk5bi6lkhcbgp4iozgxtksim12.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 32
  },
  {
    "name": "Чаша овальная для бассейна 550 х 350 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "26400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/552/i3cbz8qdkd27ybat925yce50mdro1gt6.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/552/i3cbz8qdkd27ybat925yce50mdro1gt6.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 9
  },
  {
    "name": "Чаша овальная для бассейна 488 х 274 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "26400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/5cd/mlrzx35f7ouwk6939jn55kor5fn21xw3.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/5cd/mlrzx35f7ouwk6939jn55kor5fn21xw3.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.0",
    "reviewCount": 9
  },
  {
    "name": "Чаша круглая для бассейна 500 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "26400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/c58/6633qfw9nu2ye5ohz9pyyalz5lyir4be.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/c58/6633qfw9nu2ye5ohz9pyyalz5lyir4be.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 52
  },
  {
    "name": "Чаша круглая для бассейна 400 х 140 см. 0.6/0.6 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "26400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/6fc/ld11nydv3vlgg2fbu70objp5v833spr8.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/6fc/ld11nydv3vlgg2fbu70objp5v833spr8.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 5
  },
  {
    "name": "Чаша круглая для бассейна 400 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "26400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/115/c6blybcl9thp3ekc9ccv96uomqfpzins.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/115/c6blybcl9thp3ekc9ccv96uomqfpzins.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 16
  },
  {
    "name": "Чаша круглая для бассейна 488 х 140 см, 0.4/0.4mm Solid blue",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "26400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/81b/81b857a54441639b4bb2700d374a3d0c.PNG",
    "images": [
      "https://basseyn.ru/upload/iblock/81b/81b857a54441639b4bb2700d374a3d0c.PNG"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 11
  },
  {
    "name": "Чаша для каркасного бассейна 549х132см",
    "description": "Форма бассейна: Круглый Страна производства: КИТАЙ Длина/Диаметр, см: 549 Высота, см: 132Чаша для круглого бассейна, размер 549х132см. Выполнена из высококачественного трехслойного ПВХ: два слоя винила и внешний слой высокопрочный полиэстер. Отличается высокой прочностью, не подвержена растягиванию, истиранию, воздействию ультрафиолета. Чаша оборудована всем необходимым для подключения систем фильтрации, а также имеет сливной клапан.",
    "price": "26520",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "intex",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/438/438be1dea6e193cf2c5eadcd56f369b3.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/438/438be1dea6e193cf2c5eadcd56f369b3.jpg",
      "https://basseyn.ru/upload/iblock/6cf/6cfec7cf525ea1a6a08e98e3ff582d6d.jpg",
      "https://basseyn.ru/upload/iblock/eee/eeef74d8ca18c8e9cab7043f53dff513.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Страна производства\":\"КИТАЙ\",\"Длина/Диаметр, см\":\"549\",\"Высота, см\":\"132\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 36
  },
  {
    "name": "Чаша для каркасного бассейна 549x274x132см, Rectangular Ultra Frame Pool",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "26560",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/cc6/cc64616650b456c197f5cf7691b87868.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/cc6/cc64616650b456c197f5cf7691b87868.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"31.42\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.123\",\"Размер\":\"549x274x132 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 6
  },
  {
    "name": "Чаша 549x122см для каркасного бассейна, коричневая",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "26600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/ece/qz4trz06xmvfkzo02ivgktx0c5sfan58.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ece/qz4trz06xmvfkzo02ivgktx0c5sfan58.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 11
  },
  {
    "name": "Каркасный бассейн Steel Pro 366х122см \"Ротанг\", 10250л, фил.-насос 2006л/ч, лестн., тент",
    "description": "Форма бассейна: Круглый Серия бассейна: Steel Pro (Bestway) Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 2006 Объем, л: 10250 Длина/Диаметр, см: 366 Высота, см: 122 Время установки, мин: 60",
    "price": "26720",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": "10250л",
    "imageUrl": "https://basseyn.ru/upload/iblock/a2a/a2a8822b98aaae06cd14bd6cdf4101b3.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/a2a/a2a8822b98aaae06cd14bd6cdf4101b3.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Серия бассейна\":\"Steel Pro (Bestway)\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"2006\",\"Объем, л\":\"10250\",\"Длина/Диаметр, см\":\"366\",\"Высота, см\":\"122\",\"Время установки, мин\":\"60\",\"Объем\":\"10250 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 26
  },
  {
    "name": "Каркасный бассейн, 549х122 см, 23062 л, фильтр-насос 5678 л/ч, тент, лестница., Bestway, 56113 BW",
    "description": "Каркасный бассейн Bestway - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "26760",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "bestway",
    "brand": "Bestway",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/82b/82b271785e34a43660f2a45729dfead8.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/82b/82b271785e34a43660f2a45729dfead8.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"78.44\",\"Объем упаковки (м3)\":\"0.385\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 31
  },
  {
    "name": "Чаша овальная для бассейна 549 х 365 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "26800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/048/8anmfje5du7wc6evofxhbipbf35j7bzt.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/048/8anmfje5du7wc6evofxhbipbf35j7bzt.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 34
  },
  {
    "name": "Чаша для каркасного бассейна 549х275х132см, Rectangular Ultra Frame",
    "description": "Каркасный бассейн  серии Ultra Frame - премиальная модель с улучшенной конструкцией каркаса и повышенной прочностью. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "26840",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/52b/52b9b6d8b4cbfed1de6232b7c823113c.PNG",
    "images": [
      "https://basseyn.ru/upload/iblock/52b/52b9b6d8b4cbfed1de6232b7c823113c.PNG"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 24
  },
  {
    "name": "Чаша для каркасного бассейна 569x135см, Sequoia Spirit™ Wood-Grain Frame Pool",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "26940",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e85/e85ab8b46632eb08c689ff886dac6e23.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e85/e85ab8b46632eb08c689ff886dac6e23.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"32.45\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.155\",\"Диаметр\":\"569 см\",\"Высота\":\"135 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 48
  },
  {
    "name": "Чаша овальная для бассейна 500 х 250 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "27200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/54a/8whl23t6r11jol7ivzr7w15zrk608zyv.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/54a/8whl23t6r11jol7ivzr7w15zrk608zyv.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 30
  },
  {
    "name": "Чаша для каркасного бассейна 732x366x132см, Rectangular Ultra Frame Pool",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "27570",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/cf4/cf4a06ec4e855b1d293d744bfcc36139.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/cf4/cf4a06ec4e855b1d293d744bfcc36139.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"47.46\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.173\",\"Размер\":\"732x366x132 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 9
  },
  {
    "name": "Чаша овальная для бассейна 600 х 300 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "27600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/820/vuanydt8r1r7or4glewqtk33m2s40f0z.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/820/vuanydt8r1r7or4glewqtk33m2s40f0z.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 24
  },
  {
    "name": "Чаша круглая для бассейна 350 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "27600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/335/nfssgx96akawe2o1b103rfbv5legl854.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/335/nfssgx96akawe2o1b103rfbv5legl854.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 8
  },
  {
    "name": "Чаша для каркасного бассейна 549х122см, Metal Frame",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "27720",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "intex",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/37c/37c847bd05688ba4778926540b00f3d9.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/37c/37c847bd05688ba4778926540b00f3d9.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 14
  },
  {
    "name": "Чаша для каркасного бассейна 732x132см, Metal Frame Pool",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Диаметр: 732 см. Высота: 132 см. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "28240",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/68d/68dcc371453f0290c3f6d9b3f9dc43ba.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/68d/68dcc371453f0290c3f6d9b3f9dc43ba.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"51.2\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.229\",\"Диаметр\":\"732 см\",\"Высота\":\"132 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 24
  },
  {
    "name": "Каркасный бассейн Metal Frame 457х122см, 16805л, фил.-насос 3785л/ч, лестница, тент, подстилка, Intex, 28236",
    "description": "Снят с производства: Да Вес упаковки (кг): 67.5 Форма бассейна: Круглый Серия бассейна: Metal Frame Страна производства: КИТАЙ Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 3785 Объем, л: 16805 Длина/Диаметр, см: 457 Высота, см: 122 Время установки, мин: 60 Объем упаковки (м3): 0.358",
    "price": "28330",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "intex",
    "brand": "Intex",
    "volume": "16805л",
    "imageUrl": "https://basseyn.ru/upload/resize_cache/iblock/10d/1500_1500_1/5w5gw25s94wd3gp8ofb7iwphhpqobt09.webp",
    "images": [
      "https://basseyn.ru/upload/resize_cache/iblock/10d/1500_1500_1/5w5gw25s94wd3gp8ofb7iwphhpqobt09.webp"
    ],
    "specifications": "{\"Снят с производства\":\"Да\",\"Вес упаковки (кг)\":\"67.5\",\"Форма бассейна\":\"Круглый\",\"Серия бассейна\":\"Metal Frame\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"3785\",\"Объем, л\":\"16805\",\"Длина/Диаметр, см\":\"457\",\"Высота, см\":\"122\",\"Время установки, мин\":\"60\",\"Объем упаковки (м3)\":\"0.358\",\"Объем\":\"16805 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 27
  },
  {
    "name": "Чаша овальная для бассейна 400 х 300 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "28400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/0f7/5c5s0dzgy77r7ycsgidls6bdtp9x9wm1.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/0f7/5c5s0dzgy77r7ycsgidls6bdtp9x9wm1.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 54
  },
  {
    "name": "Чаша овальная для бассейна 600 х 350 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "28400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/0b0/22q6dwr76ojnyyl2ac8gkmym5trjq6j4.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/0b0/22q6dwr76ojnyyl2ac8gkmym5trjq6j4.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 17
  },
  {
    "name": "Каркасный бассейн Steel Pro Max 396x107см, 11133 л, фил.-нас. 2006 л\\ч, лестн, тент, навес",
    "description": "Форма бассейна: Круглый Серия бассейна: Steel Pro (Bestway) Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 2006 Объем, л: 11133 Длина/Диаметр, см: 396 Высота, см: 107 Время установки, мин: 45",
    "price": "28720",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/resize_cache/iblock/1b6/1500_1500_1/ckqaoa3k32zuz5h26tcqz0zzr46m3t8y.jpg",
    "images": [
      "https://basseyn.ru/upload/resize_cache/iblock/1b6/1500_1500_1/ckqaoa3k32zuz5h26tcqz0zzr46m3t8y.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/0b7/1500_1500_1/kee1m5iw962cfsyxa9cb28wvtiw60v5a.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/70b/1500_1500_1/3pxvez9rzfdjopok3up4t5c45mj6anym.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/4c5/1500_1500_1/fzdqr3dhlvirpy2p69lbrh7347gdnj0x.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/a27/1500_1500_1/ye341q08rulr0c11g6yyexoywknhal26.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/4d1/1500_1500_1/hl9w8by8nyydxu9nggc928yhu70e8hmq.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/b4b/1500_1500_1/uy0s2wfkjylgyh0ez3d0cucmtify6kxd.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/15f/1500_1500_1/av4stazuo51a61qc2fke6p6m7tpv390z.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/db7/1500_1500_1/syhy6225bnfe3kq3pxwiozkvib0q4kjb.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/dae/1500_1500_1/5yfx2s6i9p8mja2d0q9a4fznm2wphy64.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/a5d/1500_1500_1/c6hpkgkcx62tsswpve4g3a43urs9nh92.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/0fb/1500_1500_1/51abj5cz42d4cih528fu935s7mf2g319.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/bf8/1500_1500_1/qmlu1uu7inx8zjgyyx8p49iezbyhsegl.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/f08/1500_1500_1/gxzmgfmbdxrgpp2yfu0wo51s9hhjilhu.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/351/1500_1500_1/52v7i6r4s2sncd3zse3x7fkolu2h2cki.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/03b/1500_1500_1/rw56krpka6jpgwc7p4kpdhmuh9s6jpv0.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Серия бассейна\":\"Steel Pro (Bestway)\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"2006\",\"Объем, л\":\"11133\",\"Длина/Диаметр, см\":\"396\",\"Высота, см\":\"107\",\"Время установки, мин\":\"45\",\"Диаметр\":\"396 см\",\"Высота\":\"107 см\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 35
  },
  {
    "name": "Чаша овальная для бассейна 640 х 300 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "28800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/36c/bpfb9maj1l7m03qwp10ag6f0rcs668ik.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/36c/bpfb9maj1l7m03qwp10ag6f0rcs668ik.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 52
  },
  {
    "name": "Чаша овальная для бассейна 500 х 300 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "28800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/fff/qub7odqoxk1bx5e3jeuribzhdw2kydiz.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/fff/qub7odqoxk1bx5e3jeuribzhdw2kydiz.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.0",
    "reviewCount": 6
  },
  {
    "name": "Чаша овальная для бассейна 488 х 305 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "28800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/7de/mgqxv6hhflh7u11rcw8p0shu2vk7pp7j.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/7de/mgqxv6hhflh7u11rcw8p0shu2vk7pp7j.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 48
  },
  {
    "name": "Чаша для каркасного бассейна 457х122см, Prism Frame",
    "description": "Каркасный бассейн  серии Prism Frame - отличается современным дизайном и технологией Super-Tough для дополнительной прочности. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "29040",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e49/qjp7nav4423wzj0dtvz80ho8h41xak4z.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e49/qjp7nav4423wzj0dtvz80ho8h41xak4z.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 46
  },
  {
    "name": "Чаша овальная армированная для бассейна 350 х 250 х 165 см. 0.7мм/Синяя",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "29200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/074/o6g83keqjn2pzxd1lyfwl39usgcqt3rv.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/074/o6g83keqjn2pzxd1lyfwl39usgcqt3rv.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 21
  },
  {
    "name": "Чаша круглая для бассейна 550 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "29200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/3b6/zzgmvxpajtxpubcpyjicpgp4glwf2x0w.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/3b6/zzgmvxpajtxpubcpyjicpgp4glwf2x0w.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 27
  },
  {
    "name": "Чаша круглая для бассейна 549 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "29200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/1f6/b2fn7bakdh75zrnh7djtzihpqb469sqo.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/1f6/b2fn7bakdh75zrnh7djtzihpqb469sqo.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 45
  },
  {
    "name": "Чаша круглая для бассейна 549 х 140 см, 0.4/0.4mm Solid blue",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "29200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/459/4592e7049852062ee9422f5b1d8f8e06.PNG",
    "images": [
      "https://basseyn.ru/upload/iblock/459/4592e7049852062ee9422f5b1d8f8e06.PNG"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 37
  },
  {
    "name": "Чаша овальная для бассейна 600 х 400 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "29600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2b6/qt8oocfzdatvtiqybrxn5zijkvw1xe0g.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2b6/qt8oocfzdatvtiqybrxn5zijkvw1xe0g.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 6
  },
  {
    "name": "Каркасный бассейн Power Steel 396x107см 11133л, фил.-насос 2006л/ч, лестн., тент, попл.-доз., навес, Bestway, 5614V BW",
    "description": "Каркасный бассейн Bestway - качественная модель для дачи и загородного дома. Вместимость бассейна составляет 11133 л. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "29600",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "bestway",
    "brand": "Bestway",
    "volume": "11133л",
    "imageUrl": "https://basseyn.ru/upload/iblock/b35/qbwjk17nkd2pafvj7lnw3ml207lahso5.jpeg",
    "images": [
      "https://basseyn.ru/upload/iblock/b35/qbwjk17nkd2pafvj7lnw3ml207lahso5.jpeg",
      "https://basseyn.ru/upload/iblock/5e3/es7vznrxy3f66v4aso8ys2l21j30voea.jpg",
      "https://basseyn.ru/upload/iblock/de2/7r9zs3j14uz7uh5pwt22al3jtxmrfqvi.jpg",
      "https://basseyn.ru/upload/iblock/5cf/n6eo7vqcok75rxe7uvkhsohyvwixpbw8.jpg",
      "https://basseyn.ru/upload/iblock/06b/nuohba0kwvirrmbspo6tophi41u8i49k.jpg",
      "https://basseyn.ru/upload/iblock/c54/eiiqcdgdy3rdwxxmma22ls50u4sd3b1c.jpg",
      "https://basseyn.ru/upload/iblock/508/810u0ft3l8235zet8f7y2kahec63djlk.jpg",
      "https://basseyn.ru/upload/iblock/5e7/09966ewc0cmy8i5y1rbc3tka4ehxu011.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"50.04\",\"Объем упаковки (м3)\":\"0.227\",\"Диаметр\":\"396 см\",\"Высота\":\"107 см\",\"Объем\":\"11133 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 20
  },
  {
    "name": "Каркасный бассейн Chevron Prism Frame 400х200х100см, 6836л, фил.-нас. 2006л\\ч, лестница",
    "description": "Форма бассейна: Прямоугольный Серия бассейна: Metal Frame Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 2006 Объем, л: 6836 Длина/Диаметр, см: 400 Ширина, см: 200 Высота, см: 100 Время установки, мин: 45",
    "price": "29760",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": "6836л",
    "imageUrl": "https://basseyn.ru/upload/iblock/24b/yqjxg79qhixk5x8o38zzkhlkm35osnyo.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/24b/yqjxg79qhixk5x8o38zzkhlkm35osnyo.jpg",
      "https://basseyn.ru/upload/iblock/973/h4vxfejx6019ok10e97szbavj2l1dmv3.JPG"
    ],
    "specifications": "{\"Форма бассейна\":\"Прямоугольный\",\"Серия бассейна\":\"Metal Frame\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"2006\",\"Объем, л\":\"6836\",\"Длина/Диаметр, см\":\"400\",\"Ширина, см\":\"200\",\"Высота, см\":\"100\",\"Время установки, мин\":\"45\",\"Объем\":\"6836 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 13
  },
  {
    "name": "Чаша 610х360х120см, для овального бассейна со стальными стенками Hydrium",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "29850",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/045/i3b40n589nf5b29mkz5ebkmg1so3ma8z.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/045/i3b40n589nf5b29mkz5ebkmg1so3ma8z.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 8
  },
  {
    "name": "Каркасный бассейн Steel Pro MAX 427х122см, 15232л, фил.-насос 3028л/ч, лестница, тент, Bestway, 5619D BW",
    "description": "Насосное оборудование для бассейна, обеспечивающее надежную работу системы водообмена. Простая установка и обслуживание. Совместимо с большинством моделей бассейнов.",
    "price": "30000",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "bestway",
    "brand": "Bestway",
    "volume": "15232л",
    "imageUrl": "https://basseyn.ru/upload/iblock/3e7/5o5dadudrp358dvg4n784x08rsm418ix.jpeg",
    "images": [
      "https://basseyn.ru/upload/iblock/3e7/5o5dadudrp358dvg4n784x08rsm418ix.jpeg",
      "https://basseyn.ru/upload/iblock/318/ij3n4f38637ojxkjyx14hu3fd185rrub.jpeg",
      "https://basseyn.ru/upload/iblock/5e2/ly3d15uo39u4hl8qppcgce4px1cgdj2i.jpeg",
      "https://basseyn.ru/upload/iblock/181/6nbe38z2wc4m97whj6ar3pdfsdwloeeh.jpeg",
      "https://basseyn.ru/upload/iblock/5cc/nxzlc6lz183t7d9p7f6pozrmxgsxtepf.jpeg",
      "https://basseyn.ru/upload/iblock/28a/e8wbqscggyqqutl2sf408br66az123tk.jpeg",
      "https://basseyn.ru/upload/iblock/f72/vmvv71sask104kw61o7h9dz7eteyvr67.jpeg",
      "https://basseyn.ru/upload/iblock/3d1/o8et19x2sb566v7mwmikl24ybnqdvhnv.jpeg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 8
  },
  {
    "name": "Чаша 610*360*120см, для овального бассейна со стальными стенками Hydrium",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "30000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/cc1/cc1dbee86298ab774ce63dd19d124026.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/cc1/cc1dbee86298ab774ce63dd19d124026.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 6
  },
  {
    "name": "Чаша для каркасного бассейна 610x132см \"Камень\" (56883) 33240л",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "30320",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": "33240л",
    "imageUrl": "https://basseyn.ru/upload/iblock/e00/czpekxy2tt2w8x57f2sdoxcoddg450uf.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e00/czpekxy2tt2w8x57f2sdoxcoddg450uf.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 32
  },
  {
    "name": "Чаша овальная для бассейна 450 х 250 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "30400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/bf1/zyw6b6bx5gzfktnamfzslc0pf35omoew.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/bf1/zyw6b6bx5gzfktnamfzslc0pf35omoew.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 8
  },
  {
    "name": "Чаша овальная для бассейна 500 х 200 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "30800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/0fd/zc82ec7k20toiq5uib3a6oe1pk0dni2x.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/0fd/zc82ec7k20toiq5uib3a6oe1pk0dni2x.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 53
  },
  {
    "name": "Каркасный бассейн Steel Pro 366х122см \"Ротанг\", 10250л, фил.-насос 2006л/ч, лестн., тент, подст.",
    "description": "Каркасный бассейн  серии Steel Pro - надежная конструкция с металлическим каркасом, покрытым антикоррозийным слоем. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "30880",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": "10250л",
    "imageUrl": "https://basseyn.ru/upload/iblock/59b/59b74803ea304222197107b2f7a09868.jpeg",
    "images": [
      "https://basseyn.ru/upload/iblock/59b/59b74803ea304222197107b2f7a09868.jpeg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.0",
    "reviewCount": 18
  },
  {
    "name": "Чаша 640х274х132см для прямоугольного каркасного бассейна",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "31000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/3ac/wg1ikadpf7cz3cr75870w28bzw5skjw0.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/3ac/wg1ikadpf7cz3cr75870w28bzw5skjw0.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 33
  },
  {
    "name": "Каркасный бассейн, 549х122 см, 23062 л.,фильтр-насос 5678л/ч, тент, лестница., Bestway, 56462/56113 BW",
    "description": "Каркасный бассейн Bestway - качественная модель для дачи и загородного дома. Вместимость бассейна составляет 5678 л. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "31470",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "bestway",
    "brand": "Bestway",
    "volume": "5678л",
    "imageUrl": "https://basseyn.ru/upload/resize_cache/iblock/454/1500_1500_1/454b2f8f5215a126479c30c366f2958b.jpg",
    "images": [
      "https://basseyn.ru/upload/resize_cache/iblock/454/1500_1500_1/454b2f8f5215a126479c30c366f2958b.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/15c/1500_1500_1/15c460d8ecf4a5c4eb4eaabb8dfd0648.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/4f0/1500_1500_1/4f0e97f8fc7acf8b15c4b631cd75c340.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/3a6/1500_1500_1/3a690563d0cbd832bba2e739d539515b.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/d9b/1500_1500_1/d9b80af914333d946cd8c4040748ee7c.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/e2e/1500_1500_1/e2e7e9643a89362c78e4ed9ca877d49b.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/00f/1500_1500_1/00f6cca10df2cf77171fda8077ffca52.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"78.44\",\"Объем упаковки (м3)\":\"0.385\",\"Объем\":\"5678 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 33
  },
  {
    "name": "Каркасный бассейн Steel Pro Max 457x107 см, 14970 л, фил.-нас. 3028 л\\ч, лестн, тент, подсветка",
    "description": "Форма бассейна: Круглый Серия бассейна: Steel Pro (Bestway) Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 3028 Объем, л: 14970 Длина/Диаметр, см: 457 Высота, см: 107 Время установки, мин: 45",
    "price": "31760",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/resize_cache/iblock/637/1500_1500_1/csuj1qm8i3bmn2jn9o5rvou07gfok2rf.jpg",
    "images": [
      "https://basseyn.ru/upload/resize_cache/iblock/637/1500_1500_1/csuj1qm8i3bmn2jn9o5rvou07gfok2rf.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/f3d/1500_1500_1/teenlw3duli910wnwp3mpslq64yyhv4f.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/cb4/1500_1500_1/b73tjrk4i54yed22m285x6b39sqm2nzv.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/67e/1500_1500_1/ht5uxba3pu956u9e1sfqxh5d619rviqz.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/da0/1500_1500_1/9rrcwxoofmb7npx2turklfm7ico0zxne.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/ff0/1500_1500_1/2okn4mei0c612c3fuq018c076m4mmsac.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/63b/1500_1500_1/vynhbbxkq7u21jb2uyufipdhi91ifaj2.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/3ac/1500_1500_1/xyf31uuddtubjald9n2ial5kl4mj59tn.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/3c3/1500_1500_1/6o1d7hfbwfy0y7mzh3flpqixzuzzvq1i.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/8bb/1500_1500_1/kes1ez4cw18kn30qc7yfh0s2nx49srcv.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/880/1500_1500_1/saap4jdqm2i4zsxa9niwne1dx5m3o9f4.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/b49/1500_1500_1/5ut2ht1o310fxlsecb6og332dvymfdmm.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/48b/1500_1500_1/ray0uefmepblasejaa0o05ebyxg4wbi5.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/8ca/1500_1500_1/94ttvhbyglyukq2y36y3848ojlcjbqfl.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/eeb/1500_1500_1/dcavncnowsidv6mpdud6yy830r7svsb3.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Серия бассейна\":\"Steel Pro (Bestway)\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"3028\",\"Объем, л\":\"14970\",\"Длина/Диаметр, см\":\"457\",\"Высота, см\":\"107\",\"Время установки, мин\":\"45\",\"Диаметр\":\"457 см\",\"Высота\":\"107 см\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 28
  },
  {
    "name": "Чаша овальная для бассейна 700 х 300 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "32000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/f7f/fppajk9o5d9lsr2gqulus8rlulbzai2a.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/f7f/fppajk9o5d9lsr2gqulus8rlulbzai2a.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 45
  },
  {
    "name": "Чаша овальная для бассейна 549 х 305 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "32000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/46e/qdzpzh24rg19cw1l5t488ln22ybhjro1.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/46e/qdzpzh24rg19cw1l5t488ln22ybhjro1.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 38
  },
  {
    "name": "Чаша круглая для бассейна 600 х 140 см. 0.4/0.4 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "32000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/315/lbno4hceq9e9oauu0e7gfkmq5gpvokfv.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/315/lbno4hceq9e9oauu0e7gfkmq5gpvokfv.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.0",
    "reviewCount": 35
  },
  {
    "name": "Чаша круглая для бассейна 450 х 140 см. 0.6/0.6 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "32000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/d04/ocr2znbpin6fv80qvn4w1d324yn1qo6w.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/d04/ocr2znbpin6fv80qvn4w1d324yn1qo6w.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 16
  },
  {
    "name": "Чаша круглая для бассейна 450 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "32000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/534/ge2ouzw1zsp8c70z8drd8fh002t2c79u.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/534/ge2ouzw1zsp8c70z8drd8fh002t2c79u.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 26
  },
  {
    "name": "Чаша круглая для бассейна 457 х 140 см. 0.6/0.6 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "32000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/305/njpejgo9zkaaxdgqjhewjtvmkqod6laj.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/305/njpejgo9zkaaxdgqjhewjtvmkqod6laj.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 25
  },
  {
    "name": "Чаша круглая для бассейна 457 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "32000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/376/3bpyyyy8a28pmmxr28zjr8b2thvedt7y.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/376/3bpyyyy8a28pmmxr28zjr8b2thvedt7y.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 24
  },
  {
    "name": "Чаша овальная для бассейна 730 х 300 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "32400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/10b/kjfvymcc81qz53p0iay2z1mvifo5c6bf.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/10b/kjfvymcc81qz53p0iay2z1mvifo5c6bf.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 46
  },
  {
    "name": "Бассейн овальный с надувным бортом 549х366х122 см, 15033 л, фил.-насос 3028л/ч,  тент, лестница, Bestway, 56461/56153 BW",
    "description": "Насосное оборудование для бассейна, обеспечивающее надежную работу системы водообмена. Простая установка и обслуживание. Совместимо с большинством моделей бассейнов.",
    "price": "32610",
    "originalPrice": null,
    "category": "inflatable-pools",
    "subcategory": "bestway",
    "brand": "Bestway",
    "volume": "3028л",
    "imageUrl": "https://basseyn.ru/upload/iblock/993/9938b431e68dc418b399a0868e6794ed.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/993/9938b431e68dc418b399a0868e6794ed.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"67.82\",\"Форма бассейна\":\"Овальный\",\"Объем упаковки (м3)\":\"0.341\",\"Объем\":\"3028 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 16
  },
  {
    "name": "Чаша овальная для бассейна 700 х 350 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "32800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/598/c0am9nw10hfk7dysszdlsl3ao4rxpmhk.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/598/c0am9nw10hfk7dysszdlsl3ao4rxpmhk.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 20
  },
  {
    "name": "Чаша круглая для бассейна 400 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "32800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/981/pjll5bxjyw15dm32pwgy1iskdi5if2t6.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/981/pjll5bxjyw15dm32pwgy1iskdi5if2t6.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 18
  },
  {
    "name": "Чаша для каркасного бассейна Ultra Frame 549х132см, 26423л",
    "description": "Чаша для каркасного бассейна Intex Ultra Frame 12436 выполнена по технологии SUPER-TOUGH из ПВХ. Это плотный армированный материал из трех спаенных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Толщина стенок полотна - 0,64 мм",
    "price": "33760",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "intex",
    "brand": "Другие",
    "volume": "26423л",
    "imageUrl": "https://basseyn.ru/upload/iblock/f47/n1rx6btzh584t0j1dlxxhonsksu4p63e.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/f47/n1rx6btzh584t0j1dlxxhonsksu4p63e.jpg"
    ],
    "specifications": "{\"Объем\":\"26423 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 10
  },
  {
    "name": "Каркасный бассейн Metal Frame 549х122см, 24311л, фильтр-насос 5678л/ч, лестница, тент, подстилка, Intex, 28252",
    "description": "Вес упаковки (кг): 90.8 Форма бассейна: Круглый Серия бассейна: Metal Frame Страна производства: КИТАЙ Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 5678 Объем, л: 24311 Длина/Диаметр, см: 549 Высота, см: 122 Время установки, мин: 60 Объем упаковки (м3): 0.429",
    "price": "33880",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "intex",
    "brand": "Intex",
    "volume": "24311л",
    "imageUrl": "https://basseyn.ru/upload/iblock/ea1/ea1761228d5305eebdc1e87e149e7ea6.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ea1/ea1761228d5305eebdc1e87e149e7ea6.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"90.8\",\"Форма бассейна\":\"Круглый\",\"Серия бассейна\":\"Metal Frame\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"5678\",\"Объем, л\":\"24311\",\"Длина/Диаметр, см\":\"549\",\"Высота, см\":\"122\",\"Время установки, мин\":\"60\",\"Объем упаковки (м3)\":\"0.429\",\"Объем\":\"24311 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 10
  },
  {
    "name": "Чаша овальная для бассейна 800 х 400 х 140 см. 0.4/0.4 мм. Мозаика",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "34000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/72c/z2v47kunypq1mal3ijkp1idvyo2cmkis.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/72c/z2v47kunypq1mal3ijkp1idvyo2cmkis.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 9
  },
  {
    "name": "Чаша овальная для бассейна 730 х 365 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "34000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/239/gel5maus4gwnd4vr71dfj6r87jhcncy5.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/239/gel5maus4gwnd4vr71dfj6r87jhcncy5.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 29
  },
  {
    "name": "Чаша овальная для бассейна 730 х 365 х 140 см. 0.4/0.4 мм. Мозаика",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "34000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/d96/wk4jojvj9nzzf00z5s4z1whtlahdd6p3.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/d96/wk4jojvj9nzzf00z5s4z1whtlahdd6p3.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 36
  },
  {
    "name": "Чаша овальная для бассейна 550 х 350 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "34400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/7a5/g8tymt4grfa5pact57c2kg3sqfd4g0ik.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/7a5/g8tymt4grfa5pact57c2kg3sqfd4g0ik.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 52
  },
  {
    "name": "Чаша овальная для бассейна 549 х 365 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "34800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/4be/4bl7urw3m8pvyb6saz8ub6atm862f983.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/4be/4bl7urw3m8pvyb6saz8ub6atm862f983.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 27
  },
  {
    "name": "Чаша для каркасного бассейна 671x132см \"Камень\" (56889) 40377л",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "34800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": "40377л",
    "imageUrl": "https://basseyn.ru/upload/iblock/e11/cc8e6av7l3o4425fas90vq90y4me1d2o.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e11/cc8e6av7l3o4425fas90vq90y4me1d2o.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 15
  },
  {
    "name": "Чаша овальная для бассейна 800 х 300 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "35200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/f51/o2pv6ny32jixll6koqkz2wkfp2st04zf.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/f51/o2pv6ny32jixll6koqkz2wkfp2st04zf.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 28
  },
  {
    "name": "Чаша для круглого бассейна 550х132см, толщина 0,40 мм с накидным кантом",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "35270",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/b78/b781f1fe97499ad9e8f5abb0aed23799.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/b78/b781f1fe97499ad9e8f5abb0aed23799.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 28
  },
  {
    "name": "Чаша овальная для бассейна 600 х 300 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "35600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/ea0/hazgbzutxm4r6scdp1ufo5rwjq3p4t3i.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ea0/hazgbzutxm4r6scdp1ufo5rwjq3p4t3i.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 37
  },
  {
    "name": "Чаша для каркасного бассейна 549х122см, Prism Frame",
    "description": "Чаша для каркасного бассейна Intex GreyWood Prism Frame 10092G выполнена по технологии SUPER-TOUGH из ПВХ. Это плотный армированный материал из трех спаенных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Толщина стенок полотна - 0,58 мм.",
    "price": "35780",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "intex",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/9bd/w8aeqykv1fdmk3hzbnlofak0wwjo2rey.png",
    "images": [
      "https://basseyn.ru/upload/iblock/9bd/w8aeqykv1fdmk3hzbnlofak0wwjo2rey.png"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 7
  },
  {
    "name": "Чаша круглая армированная для бессейна 400 х 165 см. 0.7мм/Синяя",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "36000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/c2e/zfahnhd9ydlbn7pn3xbv6b20dyk7mkig.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/c2e/zfahnhd9ydlbn7pn3xbv6b20dyk7mkig.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 35
  },
  {
    "name": "Каркасный бассейн 549х274х132см, 17203л, лестница, тент, подстилка",
    "description": "Вес упаковки (кг): 115 Форма бассейна: Прямоугольный Страна производства: КИТАЙ Тип фильтр-насоса: Нет Объем, л: 17203 Длина/Диаметр, см: 549 Ширина, см: 274 Высота, см: 132 Время установки, мин: 45 Объем упаковки (м3): 0.493",
    "price": "36600",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "summer-escapes-polygroup",
    "brand": "Другие",
    "volume": "17203л",
    "imageUrl": "https://basseyn.ru/upload/iblock/965/96527e11749b1ca1b92e9656d1ca67f4.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/965/96527e11749b1ca1b92e9656d1ca67f4.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"115\",\"Форма бассейна\":\"Прямоугольный\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Нет\",\"Объем, л\":\"17203\",\"Длина/Диаметр, см\":\"549\",\"Ширина, см\":\"274\",\"Высота, см\":\"132\",\"Время установки, мин\":\"45\",\"Объем упаковки (м3)\":\"0.493\",\"Объем\":\"17203 л\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 24
  },
  {
    "name": "Чаша круглая для бассейна 500 х 140 см. 0.6/0.6 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "36800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/a45/pjgo2w6529b2v3yukudvawkp5im54km5.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/a45/pjgo2w6529b2v3yukudvawkp5im54km5.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 39
  },
  {
    "name": "Чаша круглая для бассейна 500 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "36800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/5d6/l3p2p0c40qkxk19vnk1tmfpkitbh8gg1.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/5d6/l3p2p0c40qkxk19vnk1tmfpkitbh8gg1.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 54
  },
  {
    "name": "Чаша круглая для бассейна 488 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "36800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/ee3/gmwc3sgw9y749z1j1ng1j9ahj3ujkhdo.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ee3/gmwc3sgw9y749z1j1ng1j9ahj3ujkhdo.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 37
  },
  {
    "name": "Чаша 732х366х132см для прямоугольного каркасного бассейна",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "37160",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/ee3/q0qbwyeml9jku258yrlb5esa5nro0fom.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ee3/q0qbwyeml9jku258yrlb5esa5nro0fom.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 23
  },
  {
    "name": "Чаша овальная для бассейна 800 х 350 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "37200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/c86/jgi8msaksduuhouis21jf24ghnkliio8.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/c86/jgi8msaksduuhouis21jf24ghnkliio8.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 43
  },
  {
    "name": "Чаша овальная для бассейна 600 х 350 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "37200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/f5c/xa9matgpvi1oa0n4d22rbgf4n0023tnt.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/f5c/xa9matgpvi1oa0n4d22rbgf4n0023tnt.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 21
  },
  {
    "name": "Чаша для каркасного бассейна 975x488x132см, Rectangular Ultra Frame Pool",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "37630",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/16d/16d949da7e8e05d96d42ab0c422cd96f.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/16d/16d949da7e8e05d96d42ab0c422cd96f.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"72.3\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.225\",\"Размер\":\"975x488x132 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 51
  },
  {
    "name": "Чаша овальная для бассейна 640 х 300 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "38000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e62/v5nvtm6v2rp0at9iwum21oknp1fikb5i.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e62/v5nvtm6v2rp0at9iwum21oknp1fikb5i.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 35
  },
  {
    "name": "Чаша круглая для бассейна 450 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "38400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/a40/p1sc71s0r3bkqtx9rufo00kgva30mhtd.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/a40/p1sc71s0r3bkqtx9rufo00kgva30mhtd.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 41
  },
  {
    "name": "Чаша овальная для бассейна 600 х 400 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "38800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/ba4/ga83u1p8eqgnt7ff9nd36xd9fshlvj13.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ba4/ga83u1p8eqgnt7ff9nd36xd9fshlvj13.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 15
  },
  {
    "name": "Чаша овальная для бассейна 800 х 400 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "40000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/bd8/7ai2pgmsjfb383ws5gbvsypugqrc55vj.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/bd8/7ai2pgmsjfb383ws5gbvsypugqrc55vj.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 18
  },
  {
    "name": "Чаша овальная для бассейна 700 х 300 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "41200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/f86/fyvp3erl7wge9dhrofxgp938ttcf15yi.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/f86/fyvp3erl7wge9dhrofxgp938ttcf15yi.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 22
  },
  {
    "name": "Чаша овальная для бассейна 500 х 300 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "41200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/987/k23me3yhoi2690ia1rgastblf7e3wuu0.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/987/k23me3yhoi2690ia1rgastblf7e3wuu0.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 12
  },
  {
    "name": "Чаша овальная для бассейна 730 х 300 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "41600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/818/so1h79k6zah8mw2s0dw90jam8spfdltz.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/818/so1h79k6zah8mw2s0dw90jam8spfdltz.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 41
  },
  {
    "name": "Чаша для прямоугольного каркасного бассейна 732х366х132см",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "41640",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/866/866ff504007a1dff70fab6850c2c8043.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/866/866ff504007a1dff70fab6850c2c8043.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 30
  },
  {
    "name": "Чаша круглая для бассейна 700 х 140 см. 0.4/0.4 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "42000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/003/ox4wus8qmq8vpbl50miyvr9rrwejxx1t.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/003/ox4wus8qmq8vpbl50miyvr9rrwejxx1t.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 39
  },
  {
    "name": "Чаша круглая для бассейна 550 х 140 см. 0.6/0.6 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "42000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/0e4/vyq9aofoe7n2leuto5fs5l15a4r5rt82.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/0e4/vyq9aofoe7n2leuto5fs5l15a4r5rt82.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 39
  },
  {
    "name": "Чаша круглая для бассейна 550 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "42000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e77/4cbkbio6yy8amso5hg07vd6oipjeia8d.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e77/4cbkbio6yy8amso5hg07vd6oipjeia8d.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 19
  },
  {
    "name": "Чаша круглая для бассейна 549 х 140 см. 0.6/0.6 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "42000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/eec/qth6vmcnktr19v8y67c2028czoqzsb2o.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/eec/qth6vmcnktr19v8y67c2028czoqzsb2o.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 34
  },
  {
    "name": "Чаша круглая для бассейна 549 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "42000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/7b1/v5w2s1rao614s4e2a7x371rvw04v3fp5.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/7b1/v5w2s1rao614s4e2a7x371rvw04v3fp5.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 23
  },
  {
    "name": "Каркасный бассейн Steel Pro MAX 488х122см, 19480л, фил.-насос 5678л/ч, лестница, тент, Bestway, 5619E BW",
    "description": "Насосное оборудование для бассейна, обеспечивающее надежную работу системы водообмена. Простая установка и обслуживание. Совместимо с большинством моделей бассейнов.",
    "price": "42410",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "bestway",
    "brand": "Bestway",
    "volume": "19480л",
    "imageUrl": "https://basseyn.ru/upload/iblock/b40/wxgs76weaxvreb2bgexmrk37aik901ew.jpeg",
    "images": [
      "https://basseyn.ru/upload/iblock/b40/wxgs76weaxvreb2bgexmrk37aik901ew.jpeg",
      "https://basseyn.ru/upload/iblock/79e/z9pky6ug0qt5uu1oakou7zq2lnhc0gfo.jpeg",
      "https://basseyn.ru/upload/iblock/99e/syh2im369scbo6xh9ch9jdnrg6wylxvq.jpeg",
      "https://basseyn.ru/upload/iblock/d78/rhourw2yb7dt6f3vvihtkxd103ch1sst.jpeg",
      "https://basseyn.ru/upload/iblock/c8e/ibxtaimlgybql0p21l93kk04n1st7hoe.jpeg",
      "https://basseyn.ru/upload/iblock/163/5evmwfzufpq70st6swqwz1gzoy0gu02p.jpeg",
      "https://basseyn.ru/upload/iblock/1ea/jfq2lwwt0cfmmg1lta154zlo7mo2lt56.jpeg",
      "https://basseyn.ru/upload/iblock/cd4/ebwegrsycj7738dn122hutxwl46759ic.jpeg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 14
  },
  {
    "name": "Чаша овальная для бассейна 700 х 350 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "42800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/595/qterybug9zo89p1f2hcqcz1t4zbuwu0f.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/595/qterybug9zo89p1f2hcqcz1t4zbuwu0f.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 21
  },
  {
    "name": "Чаша овальная армированная для бассейна 500 х 300х 165 см. 0.7мм/Синяя",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "43600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/bdc/b19uhh4j6puom2l9p8i8nzghns9o1vg8.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/bdc/b19uhh4j6puom2l9p8i8nzghns9o1vg8.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 20
  },
  {
    "name": "Чаша овальная для бассейна 730 х 365 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "44000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2ff/dlob2kxzc20s3sru1a8wl59yjwxcqibf.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2ff/dlob2kxzc20s3sru1a8wl59yjwxcqibf.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 24
  },
  {
    "name": "Чаша круглая армированная для бессейна 450 х 165 см. 0.7мм/Синяя",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "44400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/a86/hmztni5y3ynf6dwumlj9vshouygwlztk.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/a86/hmztni5y3ynf6dwumlj9vshouygwlztk.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 31
  },
  {
    "name": "Чаша овальная для бассейна 1 000 х 300 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "44800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/1a7/e5cylyde0kdxf5jkitn34ex51fucf0rs.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/1a7/e5cylyde0kdxf5jkitn34ex51fucf0rs.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 20
  },
  {
    "name": "Чаша круглая для бассейна 500 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "45200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/255/zc6avuiwqbu8jkm6qqku2q64ttr4x8au.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/255/zc6avuiwqbu8jkm6qqku2q64ttr4x8au.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 6
  },
  {
    "name": "Каркасный бассейн Ultra Frame 488х122см, хлорогенер, лестница, тент, подстилка, Intex, 28326",
    "description": "Вес упаковки (кг): 106 Форма бассейна: Круглый Серия бассейна: Ultra Frame Страна производства: КИТАЙ Тип фильтр-насоса: Система морской воды Длина/Диаметр, см: 488 Высота, см: 122 Время установки, мин: 60 Объем упаковки (м3): 0.52",
    "price": "45490",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "intex",
    "brand": "Intex",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/ba5/ba5be7e4943276840a7b4b189114a19e.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ba5/ba5be7e4943276840a7b4b189114a19e.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"106\",\"Форма бассейна\":\"Круглый\",\"Серия бассейна\":\"Ultra Frame\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Система морской воды\",\"Длина/Диаметр, см\":\"488\",\"Высота, см\":\"122\",\"Время установки, мин\":\"60\",\"Объем упаковки (м3)\":\"0.52\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 48
  },
  {
    "name": "Чаша овальная для бассейна 800 х 300 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "45600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/5f1/hiqqwkh3tgx7hrysvleg55c09xpn3eqi.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/5f1/hiqqwkh3tgx7hrysvleg55c09xpn3eqi.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 13
  },
  {
    "name": "Чаша овальная для бассейна 550 х 350 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "46000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/51c/n5oeqxj53cgopgr6ntmiui7rnwleubqv.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/51c/n5oeqxj53cgopgr6ntmiui7rnwleubqv.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.0",
    "reviewCount": 22
  },
  {
    "name": "Чаша овальная для бассейна 600 х 300 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "46000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/c81/hr091wfmpc4bko0fxpuhxxcmvj132slk.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/c81/hr091wfmpc4bko0fxpuhxxcmvj132slk.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 38
  },
  {
    "name": "Чаша овальная для бассейна 1 000 х 400 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "47200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/24f/samh3tofvnhkh403or43b5cyv28srbio.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/24f/samh3tofvnhkh403or43b5cyv28srbio.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 7
  },
  {
    "name": "Чаша круглая для бассейна 600 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "47200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/395/a3umauxp2e954n7qw8959wxif1694e0k.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/395/a3umauxp2e954n7qw8959wxif1694e0k.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 12
  },
  {
    "name": "Чаша овальная для бассейна 900 х 450 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "47600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/980/vh7n0mv0cy4uzi93ms45k73kbo49x3g5.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/980/vh7n0mv0cy4uzi93ms45k73kbo49x3g5.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 49
  },
  {
    "name": "Чаша овальная для бассейна 800 х 350 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "48400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/419/u8atyzwtjecmmkxywdu3m2wpwhkv98m7.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/419/u8atyzwtjecmmkxywdu3m2wpwhkv98m7.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 34
  },
  {
    "name": "Чаша овальная армированная для бассейна 600 х 300 х 165 см. 0.7мм/Синяя",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "48800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/287/s1gpod37d3fttnb91qhe2657j0hlhw9p.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/287/s1gpod37d3fttnb91qhe2657j0hlhw9p.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 20
  },
  {
    "name": "Чаша овальная для бассейна 600 х 350 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "49200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/c69/cnewqk57e63b5skuv7xa2qjnugrrcbe9.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/c69/cnewqk57e63b5skuv7xa2qjnugrrcbe9.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 47
  },
  {
    "name": "Чаша круглая для бассейна 640 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "50400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/b05/48gylm3y59858rfxah6ecyr6brr13a9g.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/b05/48gylm3y59858rfxah6ecyr6brr13a9g.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 12
  },
  {
    "name": "Каркасный бассейн 549х274х132см, 17203л, фил.-насос, лест, наст, тент, наб.д./чис, скиммер",
    "description": "Форма бассейна: Прямоугольный Тип фильтр-насоса: Картриджный насос Объем, л: 17203 Длина/Диаметр, см: 549 Ширина, см: 274 Высота, см: 132 Время установки, мин: 90",
    "price": "51560",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": "17203л",
    "imageUrl": "https://basseyn.ru/upload/iblock/57c/8cu8vr9o5u74bwe9wuxs1eni1kp963c0.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/57c/8cu8vr9o5u74bwe9wuxs1eni1kp963c0.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Прямоугольный\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Объем, л\":\"17203\",\"Длина/Диаметр, см\":\"549\",\"Ширина, см\":\"274\",\"Высота, см\":\"132\",\"Время установки, мин\":\"90\",\"Объем\":\"17203 л\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.0",
    "reviewCount": 14
  },
  {
    "name": "Чаша круглая для бассейна 550 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "51600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/b6b/mrg30fpesqkr8glkcynvd0wioj3ruwl0.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/b6b/mrg30fpesqkr8glkcynvd0wioj3ruwl0.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 13
  },
  {
    "name": "Чаша круглая армированная для бессейна 500 х 165 см. 0.7мм/Синяя",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "52000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/de7/qyaarsz1fjdgevuq35kvwcrlo5z2pdic.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/de7/qyaarsz1fjdgevuq35kvwcrlo5z2pdic.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 32
  },
  {
    "name": "Чаша овальная для бассейна 600 х 400 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "52400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/598/trcpp23wbidnud193vwcildh4n4tre04.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/598/trcpp23wbidnud193vwcildh4n4tre04.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 35
  },
  {
    "name": "Чаша овальная для бассейна 800 х 400 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "52400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/f2b/03dg04zp04oq8gqvpnllbl3ka8ecbl93.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/f2b/03dg04zp04oq8gqvpnllbl3ka8ecbl93.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 17
  },
  {
    "name": "Чаша овальная для бассейна 700 х 300 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "52800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/b11/rk3nj0kub1p8wa24y6a01iogsqz9k9zj.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/b11/rk3nj0kub1p8wa24y6a01iogsqz9k9zj.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 36
  },
  {
    "name": "Чаша овальная для бассейна 1 000 х 500 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "54800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/154/8lfb7y2ylitoelcuaeufwxe3cdqpggts.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/154/8lfb7y2ylitoelcuaeufwxe3cdqpggts.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 7
  },
  {
    "name": "Каркасный бассейн Steel Pro Max 549x132 см, 26000 л, фил.-нас. 5678 л\\ч, лестн, тент",
    "description": "Форма бассейна: Круглый Серия бассейна: Steel Pro (Bestway) Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 5678 Объем, л: 26000 Длина/Диаметр, см: 549 Высота, см: 132 Время установки, мин: 45",
    "price": "55680",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/resize_cache/iblock/6af/1500_1500_1/uq0yi2mou2dzhboac6x3ypr73kdsol15.jpg",
    "images": [
      "https://basseyn.ru/upload/resize_cache/iblock/6af/1500_1500_1/uq0yi2mou2dzhboac6x3ypr73kdsol15.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/52f/1500_1500_1/kxk3ftpg1kghepiwzujo489uhixc54by.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/67a/1500_1500_1/ikcavjuc3klyakkestwoj6nne1h8dp2b.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/532/1500_1500_1/w3vuyvhbr5b0gwtcmgofjt5lfn6jbprt.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/cbc/1500_1500_1/32lz7ebb0moawsh01y9h0az3213dxe75.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/d9b/1500_1500_1/23p8rgawjtsnpv9onbxv4s2o4115usxh.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Серия бассейна\":\"Steel Pro (Bestway)\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"5678\",\"Объем, л\":\"26000\",\"Длина/Диаметр, см\":\"549\",\"Высота, см\":\"132\",\"Время установки, мин\":\"45\",\"Диаметр\":\"549 см\",\"Высота\":\"132 см\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 17
  },
  {
    "name": "Чаша овальная для бассейна 700 х 350 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "56800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/562/5rb3rt2z7axxg60lq96wjw0ezty0226q.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/562/5rb3rt2z7axxg60lq96wjw0ezty0226q.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 18
  },
  {
    "name": "Чаша 956х488х132см для прямоугольного каркасного бассейна",
    "description": "Каркасный бассейн  - качественная модель для дачи и загородного дома. Быстрая и простая установка без специальных инструментов. Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета. Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.",
    "price": "57100",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/c9c/9qaqoo1zpqcaqlcnq1ptqlca8lx36yur.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/c9c/9qaqoo1zpqcaqlcnq1ptqlca8lx36yur.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 40
  },
  {
    "name": "Чаша овальная для бассейна 1 000 х 550 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "57600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/acd/v62mry6w4z28xhh0gjzj2250sq3ek132.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/acd/v62mry6w4z28xhh0gjzj2250sq3ek132.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 35
  },
  {
    "name": "Чаша овальная для бассейна 1 000 х 300 х 140 см 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "58000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/76b/o6inx63rngnaht7rk6w98iuremcqqrm8.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/76b/o6inx63rngnaht7rk6w98iuremcqqrm8.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 6
  },
  {
    "name": "Чаша круглая для бассейна 700 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "58000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/bf7/aa739kz9d9s6qsbzllr4acoac6997t8x.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/bf7/aa739kz9d9s6qsbzllr4acoac6997t8x.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 8
  },
  {
    "name": "Чаша круглая для бассейна 600 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "58000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/4ae/fn7r1pq0e1ktx8tdr8iq75mso2g8gtri.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/4ae/fn7r1pq0e1ktx8tdr8iq75mso2g8gtri.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.0",
    "reviewCount": 14
  },
  {
    "name": "Чаша овальная для бассейна 800 х 300 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "59200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/42e/qucza4i68584rl02qzquxg452unsp757.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/42e/qucza4i68584rl02qzquxg452unsp757.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 39
  },
  {
    "name": "Чаша круглая для бассейна 735 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "60000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/b56/8kgv6z08m6w5va3j85ghg3tvqpe12a4i.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/b56/8kgv6z08m6w5va3j85ghg3tvqpe12a4i.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 18
  },
  {
    "name": "Чаша овальная армированная для бассейна 700 х 350 х 165 см. 0.7мм/Синяя",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "60400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/b9d/6sb0x7yxeteqyxx7qse2pxq0ar2lc5q5.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/b9d/6sb0x7yxeteqyxx7qse2pxq0ar2lc5q5.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.0",
    "reviewCount": 22
  },
  {
    "name": "Каркасный бассейн Ultra Frame 549х132cм, комб.фил.-насос, лестн., настил,тент,наб.д/чист., вол.сетка, Intex, 28334",
    "description": "Вес упаковки (кг): 121 Форма бассейна: Круглый Серия бассейна: Ultra Frame Страна производства: КИТАЙ Тип фильтр-насоса: Комбинированный насос Длина/Диаметр, см: 549 Высота, см: 132 Время установки, мин: 90 Объем упаковки (м3): 0.64",
    "price": "61090",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "intex",
    "brand": "Intex",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/9d3/9d377238374376640f1085c730b5bb45.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/9d3/9d377238374376640f1085c730b5bb45.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"121\",\"Форма бассейна\":\"Круглый\",\"Серия бассейна\":\"Ultra Frame\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Комбинированный насос\",\"Длина/Диаметр, см\":\"549\",\"Высота, см\":\"132\",\"Время установки, мин\":\"90\",\"Объем упаковки (м3)\":\"0.64\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 19
  },
  {
    "name": "Чаша овальная для бассейна 900 х 450 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "62000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/ceb/fwnnc5pecqwa6cgl6u71wjxxdjhwlk3n.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ceb/fwnnc5pecqwa6cgl6u71wjxxdjhwlk3n.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 29
  },
  {
    "name": "&nbsp",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "&nbsp",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "nbsp",
    "brand": "&nbsp",
    "volume": null,
    "imageUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    "images": [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5"
    ],
    "specifications": "{}",
    "inStock": false,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 51
  },
  {
    "name": "&nbsp",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "&nbsp",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "nbsp",
    "brand": "&nbsp",
    "volume": null,
    "imageUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    "images": [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5"
    ],
    "specifications": "{}",
    "inStock": false,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 40
  },
  {
    "name": "&nbsp",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "&nbsp",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "nbsp",
    "brand": "&nbsp",
    "volume": null,
    "imageUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    "images": [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5"
    ],
    "specifications": "{}",
    "inStock": false,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 43
  },
  {
    "name": "&nbsp",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "&nbsp",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "nbsp",
    "brand": "&nbsp",
    "volume": null,
    "imageUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    "images": [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5"
    ],
    "specifications": "{}",
    "inStock": false,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 12
  },
  {
    "name": "&nbsp",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "&nbsp",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "nbsp",
    "brand": "&nbsp",
    "volume": null,
    "imageUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    "images": [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5"
    ],
    "specifications": "{}",
    "inStock": false,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 24
  },
  {
    "name": "&nbsp",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "&nbsp",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "nbsp",
    "brand": "0,645</div>",
    "volume": null,
    "imageUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    "images": [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5"
    ],
    "specifications": "{}",
    "inStock": false,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 28
  },
  {
    "name": "Чаша овальная для бассейна 1 000 х 400 х 140 см 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "62400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/1cc/z42on7tnxk60gngbt6wlwrdhxcnjc68s.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/1cc/z42on7tnxk60gngbt6wlwrdhxcnjc68s.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 50
  },
  {
    "name": "Чаша овальная для бассейна 800 х 350 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "63200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e6b/gu6hcxridqs0kd7t7wg7hkolsf4zrrxk.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e6b/gu6hcxridqs0kd7t7wg7hkolsf4zrrxk.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 36
  },
  {
    "name": "Чаша овальная для бассейна 910 х 455 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "63200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/588/ztd4g345fsqomtgtw6pebrm32bdkvvfk.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/588/ztd4g345fsqomtgtw6pebrm32bdkvvfk.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 34
  },
  {
    "name": "Бассейн ЛАГУНА овальный вкапываемый 5 х 3 х 1,25 м ; Темный шоколад, Чаша Мрамор 0.4/0.4 мм.",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "63600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/cf3/e7wd3au0rd11bi6j24kkoupu914b23aw.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/cf3/e7wd3au0rd11bi6j24kkoupu914b23aw.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 16
  },
  {
    "name": "Чаша овальная для бассейна 800 х 400 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "66800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2ee/763qf3tvd5pzj45xc40uahjrgk55wxdg.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2ee/763qf3tvd5pzj45xc40uahjrgk55wxdg.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 38
  },
  {
    "name": "Каркасный бассейн Steel Pro Max 610x132см, 33240 л, фил.-нас. 9463 л\\ч, лестн, тент",
    "description": "Форма бассейна: Круглый Серия бассейна: Steel Pro (Bestway) Производительность фильтра л/ч: 9463 Объем, л: 33240 Длина/Диаметр, см: 610 Высота, см: 132 Время установки, мин: 30",
    "price": "67640",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/resize_cache/iblock/d6a/1500_1500_1/68j4hu1im5jv177smsma065avrfbdxbv.jpg",
    "images": [
      "https://basseyn.ru/upload/resize_cache/iblock/d6a/1500_1500_1/68j4hu1im5jv177smsma065avrfbdxbv.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/e9b/1500_1500_1/n7yvk084c0cy8of13eq3avqsaigjwrpg.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/ae3/1500_1500_1/cimpu9l8soeazbo6i64t06ih01tje373.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/b0d/1500_1500_1/rsi8r434sxinuugno96gm5eflx73rtsd.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/a5a/1500_1500_1/j24zbulz9b4fmmuvv5g8j40p96bnhb3e.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/647/1500_1500_1/s6ym7074u1cmcqnofdnrjamwqkm4g2ji.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/c8a/1500_1500_1/2ywg7flz3unx0u07hmngz3y1fyzcv6w4.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Серия бассейна\":\"Steel Pro (Bestway)\",\"Производительность фильтра л/ч\":\"9463\",\"Объем, л\":\"33240\",\"Длина/Диаметр, см\":\"610\",\"Высота, см\":\"132\",\"Время установки, мин\":\"30\",\"Диаметр\":\"610 см\",\"Высота\":\"132 см\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 7
  },
  {
    "name": "Чаша круглая армированная для бессейна 600 х 165 см. 0.7мм/Синяя",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "68400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/90f/pvnsrwe71n3c6jxq42fu6bbwqsl121mn.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/90f/pvnsrwe71n3c6jxq42fu6bbwqsl121mn.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 15
  },
  {
    "name": "Чаша овальная для бассейна 1 000 х 500 х 140 см 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "71600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/426/f6h4vtvl0aoub14kwwg3rpib7qwnq6cb.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/426/f6h4vtvl0aoub14kwwg3rpib7qwnq6cb.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 45
  },
  {
    "name": "Чаша овальная для бассейна 1000 х 300 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "72000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/3ed/ynf0etbihlh4srn841k66z4khrk6wbtb.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/3ed/ynf0etbihlh4srn841k66z4khrk6wbtb.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 20
  },
  {
    "name": "Чаша овальная армированная для бассейна 800 х 400 х 165 см. 0.7мм/Синяя",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "73200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2ae/so0mhbsfdlyaaih1gbh1wkf81s173067.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2ae/so0mhbsfdlyaaih1gbh1wkf81s173067.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 54
  },
  {
    "name": "Чаша круглая для бассейна 700 х 165см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "73600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2a6/14itrkjr103ocyh9pk73r8090j4fklk4.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2a6/14itrkjr103ocyh9pk73r8090j4fklk4.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 43
  },
  {
    "name": "Каркасный бассейн Power Steel 732x366x1.32см, 28068 л, фил.-нас. 9463 л\\ч, лестн, тент, попл.-доз",
    "description": "Форма бассейна: Прямоугольный Серия бассейна: Power Steel (Bestway) Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 9463 Объем, л: 28068 Длина/Диаметр, см: 732 Ширина, см: 366 Высота, см: 132 Время установки, мин: 45",
    "price": "73700",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/resize_cache/iblock/ded/1500_1500_1/fr5bts4jpkx9e7yyiy18063hxoj9eb9u.jpg",
    "images": [
      "https://basseyn.ru/upload/resize_cache/iblock/ded/1500_1500_1/fr5bts4jpkx9e7yyiy18063hxoj9eb9u.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/ff5/1500_1500_1/3c756no7j4aswa159819pev3lp4lol9p.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/c05/1500_1500_1/2z4v5y6jkg3et4894be50v3iwz2lylqy.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/310/1500_1500_1/u1jfb2vc8zcwmjy8xn45upyci3so16h6.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/7d0/1500_1500_1/rpivsztnx5y8mm9l42cskncedr4uav3j.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/bb8/1500_1500_1/2gmnmjl20o4fd5s7fynbeka3zuk6x5ds.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/d29/1500_1500_1/e21w083kzf3ueup6dnsfmhcbt5rn0jhi.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/58e/1500_1500_1/80z5s3lfz9bjxtfb04gscmcfpxe3xkkp.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/bae/1500_1500_1/xtshq84c8r5bigxwuzxpqws5xk6eeq39.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/627/1500_1500_1/njoadxxquxzgpps5a5hfigmca3ozz7me.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Прямоугольный\",\"Серия бассейна\":\"Power Steel (Bestway)\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"9463\",\"Объем, л\":\"28068\",\"Длина/Диаметр, см\":\"732\",\"Ширина, см\":\"366\",\"Высота, см\":\"132\",\"Время установки, мин\":\"45\",\"Размер\":\"732x366x1 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 43
  },
  {
    "name": "Бассейн ЛАГУНА овальный вкапываемый 6 х 3 х 1,25 м; Темный шоколад, Чаша Мрамор 0.4/0.4 мм.",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "74800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/bc8/hehwxxaq5zzyz3mg0d0dy973gevumvux.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/bc8/hehwxxaq5zzyz3mg0d0dy973gevumvux.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 32
  },
  {
    "name": "Чаша овальная для бассейна 1 200 х 600 х 140 см 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "75600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/a0f/z0szbicam98r5vdpdr0t5g5kx6as7htd.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/a0f/z0szbicam98r5vdpdr0t5g5kx6as7htd.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 20
  },
  {
    "name": "Чаша овальная для бассейна 1 000 х 550 х 140 см. 0.6/0.6 мм. Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "75600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/df8/xn908c7y3onqp1qe1xtp09fl3so3lxaj.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/df8/xn908c7y3onqp1qe1xtp09fl3so3lxaj.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 6
  },
  {
    "name": "Чаша овальная для бассейна 1000 х 400 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "78000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/62d/xtjyuzqv4xbx1c96685nplcbwigkog7k.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/62d/xtjyuzqv4xbx1c96685nplcbwigkog7k.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 50
  },
  {
    "name": "Чаша овальная для бассейна 900 х 450 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "79600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/015/wsx32pi1u1q2zdzu2e2cba0zsc9d5zl0.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/015/wsx32pi1u1q2zdzu2e2cba0zsc9d5zl0.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 38
  },
  {
    "name": "Круглый бассейн 550х125см (темный шоколад RAL 8017), чаша 0.4 мм",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "80800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/resize_cache/iblock/1d8/1500_1500_1/rn71mxe3k7sc6mld36wf52gv2q21uwim.jpg",
    "images": [
      "https://basseyn.ru/upload/resize_cache/iblock/1d8/1500_1500_1/rn71mxe3k7sc6mld36wf52gv2q21uwim.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 50
  },
  {
    "name": "Каркасный бассейн Ultra Frame 732x366x132см, 31805л, ком.фил.-нас, лест, тент, подс, наб.д/чис, воле, Intex, 28364",
    "description": "Вес упаковки (кг): 199 Форма бассейна: Прямоугольный Серия бассейна: Ultra Frame Страна производства: КИТАЙ Тип фильтр-насоса: Комбинированный насос Объем, л: 31805 Длина/Диаметр, см: 732 Ширина, см: 366 Высота, см: 132 Время установки, мин: 90 Объем упаковки (м3): 2.051",
    "price": "85810",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "intex",
    "brand": "Intex",
    "volume": "31805л",
    "imageUrl": "https://basseyn.ru/upload/iblock/c2b/c2b661a0f08fb121917a84814482222d.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/c2b/c2b661a0f08fb121917a84814482222d.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"199\",\"Форма бассейна\":\"Прямоугольный\",\"Серия бассейна\":\"Ultra Frame\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Комбинированный насос\",\"Объем, л\":\"31805\",\"Длина/Диаметр, см\":\"732\",\"Ширина, см\":\"366\",\"Высота, см\":\"132\",\"Время установки, мин\":\"90\",\"Объем упаковки (м3)\":\"2.051\",\"Размер\":\"732x366x132 см\",\"Объем\":\"31805 л\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 9
  },
  {
    "name": "Чаша овальная для бассейна 1000 х 500 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "87200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/1d4/axcp8ecfl34vnsnk51ge7cbhtgd2e4hk.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/1d4/axcp8ecfl34vnsnk51ge7cbhtgd2e4hk.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 40
  },
  {
    "name": "Чаша круглая армированная для бассейна 700 х 165 см. 0.7мм/Синяя",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "87200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/00f/pwouhb7tsidykp3vrgulxl7waulp8bzh.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/00f/pwouhb7tsidykp3vrgulxl7waulp8bzh.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 18
  },
  {
    "name": "Каркасный бассейн Sequoia Frame 569х135см, песочн. фильтр-насос. 220В, лестница, тент, подстилка, Intex, 28392",
    "description": "Вес упаковки (кг): 287.8 Форма бассейна: Круглый Страна производства: КИТАЙ Тип фильтр-насоса: Песочный насос Длина/Диаметр, см: 569 Высота, см: 135 Время установки, мин: 90 Объем упаковки (м3): 0.57",
    "price": "90610",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "intex",
    "brand": "Intex",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/03a/03ab5644fea55f7044ab393beadf6134.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/03a/03ab5644fea55f7044ab393beadf6134.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"287.8\",\"Форма бассейна\":\"Круглый\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Песочный насос\",\"Длина/Диаметр, см\":\"569\",\"Высота, см\":\"135\",\"Время установки, мин\":\"90\",\"Объем упаковки (м3)\":\"0.57\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.0",
    "reviewCount": 29
  },
  {
    "name": "Чаша овальная для бассейна 1000 х 550 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "91200",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/6db/mj9jjag3k0lwlk9g50svnnxiop46fp0p.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/6db/mj9jjag3k0lwlk9g50svnnxiop46fp0p.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 12
  },
  {
    "name": "Овальный бассейн, 4 боковых упора",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "100710",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/c71/c711c76b595d70d40433aac6df6be7f2.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/c71/c711c76b595d70d40433aac6df6be7f2.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Овальный\",\"Тип фильтр-насоса\":\"Нет\",\"Время установки, мин\":\"45\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 20
  },
  {
    "name": "СПА-бассейн 151х151/201х201х80см \"Maldives HydroJet Pro\" 1050л, квадратный, с гидро-аэромассажем",
    "description": "Снят с производства: Да Вес упаковки (кг): 87.05 Форма бассейна: Квадратный Объем, л: 1050 Длина/Диаметр, см: 151 Ширина, см: 151 Высота, см: 80 Время установки, мин: 30 Объем упаковки (м3): 0.604",
    "price": "101180",
    "originalPrice": null,
    "category": "inflatable-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": "1050л",
    "imageUrl": "https://basseyn.ru/upload/iblock/62d/62d67b5d373f045098b5443d85f62b71.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/62d/62d67b5d373f045098b5443d85f62b71.jpg",
      "https://basseyn.ru/upload/iblock/0a9/0a99acca581197a03bb4b5f6bfacac45.jpg"
    ],
    "specifications": "{\"Снят с производства\":\"Да\",\"Вес упаковки (кг)\":\"87.05\",\"Форма бассейна\":\"Квадратный\",\"Объем, л\":\"1050\",\"Длина/Диаметр, см\":\"151\",\"Ширина, см\":\"151\",\"Высота, см\":\"80\",\"Время установки, мин\":\"30\",\"Объем упаковки (м3)\":\"0.604\",\"Объем\":\"1050 л\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 39
  },
  {
    "name": "Чаша овальная армированная для бассейна 1000 х 550 х 165 см. 0.7мм/Синяя",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "108000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2c9/593fvb60v1ymncz2dxe5qc7ggroec79j.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2c9/593fvb60v1ymncz2dxe5qc7ggroec79j.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 29
  },
  {
    "name": "Овальный бассейн, 4 боковых упора",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "113080",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/1d7/1d707631599092a642a7aacccfc9d206.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/1d7/1d707631599092a642a7aacccfc9d206.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Овальный\",\"Тип фильтр-насоса\":\"Нет\",\"Время установки, мин\":\"45\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 50
  },
  {
    "name": "Чаша овальная для бассейна 1200 х 600 х 165 см. 0.6мм/Голубая",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "113600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/821/7sxefvlags2s487ebfuz70qqwuscdgvl.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/821/7sxefvlags2s487ebfuz70qqwuscdgvl.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 32
  },
  {
    "name": "Овальный бассейн 500х300х150см",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "118490",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/a07/a07e675627fac511c75c97affa252fba.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/a07/a07e675627fac511c75c97affa252fba.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 7
  },
  {
    "name": "Круглый бассейн вкапываемый ЛАГУНА 5 х 1,5 м (Платина RAL 7024)",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "126000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/637/em0aded0c32rx7keijew4nbod9zbgviv.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/637/em0aded0c32rx7keijew4nbod9zbgviv.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Длина/Диаметр, см\":\"500\",\"Высота, см\":\"150\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 31
  },
  {
    "name": "Круглый бассейн 420х150см",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "129530",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/9fb/9fb548116695818314586eec29f89f21.png",
    "images": [
      "https://basseyn.ru/upload/iblock/9fb/9fb548116695818314586eec29f89f21.png"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 12
  },
  {
    "name": "Овальный бассейн 500х300х132см, 4 боковых упора",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "130640",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/3a1/3a1733bb3671b86f548176734537bba4.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/3a1/3a1733bb3671b86f548176734537bba4.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Овальный\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 46
  },
  {
    "name": "Круглый бассейн",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "131920",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/497/4975812a3be158b2b9f2582a5ee7866e.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/497/4975812a3be158b2b9f2582a5ee7866e.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 31
  },
  {
    "name": "Круглый бассейн",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "131920",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/dc9/dc9737ed9f059b1080a24b40c5a19ec2.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/dc9/dc9737ed9f059b1080a24b40c5a19ec2.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 15
  },
  {
    "name": "Овальный бассейн 600х320х150см",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "133180",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/1a8/1a804e73d0ed389099cad2ae712682d5.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/1a8/1a804e73d0ed389099cad2ae712682d5.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 54
  },
  {
    "name": "Чаша овальная армированная для бассейна 1200 х 600 х 165 см. 0.7мм/Синяя",
    "description": "Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши. Изготовлена из высококачественного ПВХ-материала с повышенной прочностью. Устойчива к воздействию хлора, соли и ультрафиолетового излучения. Точное соответствие оригинальным размерам обеспечивает идеальную посадку.",
    "price": "134400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/275/ouqlp1ao5i19swo29qywvzvam76p08pu.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/275/ouqlp1ao5i19swo29qywvzvam76p08pu.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 54
  },
  {
    "name": "Овальный бассейн, 2 U-стойки, без боковых упоров",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "135750",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/5f7/0s3wte4gnjx2k1jf38kpz7wrxftlewey.webp",
    "images": [
      "https://basseyn.ru/upload/iblock/5f7/0s3wte4gnjx2k1jf38kpz7wrxftlewey.webp"
    ],
    "specifications": "{\"Форма бассейна\":\"Овальный\",\"Тип фильтр-насоса\":\"Нет\",\"Время установки, мин\":\"45\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 45
  },
  {
    "name": "Круглый бассейн вкапываемый ЛАГУНА 6 х 1,5 м (Платина RAL 7024)",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "140640",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/57f/9haljip7cxm6dmowk005b2n543uu5jgf.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/57f/9haljip7cxm6dmowk005b2n543uu5jgf.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Длина/Диаметр, см\":\"600\",\"Высота, см\":\"150\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 42
  },
  {
    "name": "Круглый бассейн 550х150см",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "144390",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/4e1/4e16c9ac72fadfafb3c1dd7b28efb2ce.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/4e1/4e16c9ac72fadfafb3c1dd7b28efb2ce.jpg",
      "https://basseyn.ru/upload/iblock/bbb/bbb79974f5c3edaf0de5b21de53cacf0.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 9
  },
  {
    "name": "Овальный бассейн 700х320х150см",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "152920",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/cc9/cc95fcc1b48eccd3d76056b38b2ab304.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/cc9/cc95fcc1b48eccd3d76056b38b2ab304.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 18
  },
  {
    "name": "Овальный бассейн, 4 боковых упора",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "164480",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/354/354e7dfc4f567be16ad0dd2b0f7d40ee.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/354/354e7dfc4f567be16ad0dd2b0f7d40ee.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 15
  },
  {
    "name": "Круглый бассейн вкапываемый ЛАГУНА 7 х 1,5 м (Платина RAL 7024)",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "165040",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/5d6/tnnehsqm6tkdt1vjvk7qdabnsxrc909l.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/5d6/tnnehsqm6tkdt1vjvk7qdabnsxrc909l.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Длина/Диаметр, см\":\"700\",\"Высота, см\":\"150\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 20
  },
  {
    "name": "Овальный бассейн, 6 боковых упоров",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "166710",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/0a4/0a4d47d4039f457c6c5360a5a484dce6.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/0a4/0a4d47d4039f457c6c5360a5a484dce6.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 32
  },
  {
    "name": "Овальный бассейн, 2 U-стойки, без боковых упоров",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "171180",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/a0b/a0bfe16fc4da80da3bec9310a1edcb0a.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/a0b/a0bfe16fc4da80da3bec9310a1edcb0a.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 26
  },
  {
    "name": "Овальный бассейн 800х400х150см",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "172830",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/30c/30c212df1a1f95b9675fffd5e9d26f5d.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/30c/30c212df1a1f95b9675fffd5e9d26f5d.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 20
  },
  {
    "name": "Овальный бассейн, 4 боковых упора",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "182670",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/9b8/9b825afb747ba632393828c9307879f7.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/9b8/9b825afb747ba632393828c9307879f7.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 11
  },
  {
    "name": "Овальный бассейн, 3 U-стойки, без боковых упоров",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "201740",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/b57/b57710542041c65aae68c7cca9355b23.png",
    "images": [
      "https://basseyn.ru/upload/iblock/b57/b57710542041c65aae68c7cca9355b23.png"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 35
  },
  {
    "name": "Круглый бассейн, серия \"MDAGASCAR\" 420x150см",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "215720",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e92/e9214d7206db037b75889ee8ccf904fc.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e92/e9214d7206db037b75889ee8ccf904fc.jpg"
    ],
    "specifications": "{\"Тип фильтр-насоса\":\"Нет\",\"Диаметр\":\"420 см\",\"Высота\":\"150 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 26
  },
  {
    "name": "Овальный бассейн 915х470х150см",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "219000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/602/60252e93196f163d67843a0d612f2ffc.png",
    "images": [
      "https://basseyn.ru/upload/iblock/602/60252e93196f163d67843a0d612f2ffc.png",
      "https://basseyn.ru/upload/iblock/bb4/bb43f4d386c0b08314345ef165887e2f.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 6
  },
  {
    "name": "Овальный бассейн 915х470х132см, имитация Дерево",
    "description": "Форма бассейна: Овальный Длина/Диаметр, см: 915 Ширина, см: 470 Высота, см: 132Овальный бассейн GRE 915х470х132см Арт. PROV918WO имеет достаточно крупные размеры. Такая модель станет прекрасным выбором для большой семьи с детьми. Бассейн устойчив к морозу и к перепадам температуры. Изделие представлено в нейтральном оттенке, благодаря чему гармонично впишется в любой интерьер. Бассейн выполнен из прочных материалов, следовательно, он будет пребывать в эксплуатации своего владельца довольно долго...",
    "price": "234700",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/0e7/0e7fc05ba095ce912cb418db512bd0b8.png",
    "images": [
      "https://basseyn.ru/upload/iblock/0e7/0e7fc05ba095ce912cb418db512bd0b8.png",
      "https://basseyn.ru/upload/iblock/355/355c7dc5587d08d64e3e995b8e61d1bd.jpg",
      "https://basseyn.ru/upload/iblock/7b4/7b40fead4c3ac6df14da89034637ac6e.jpg",
      "https://basseyn.ru/upload/iblock/16e/16e1b2db24fbe7def235a9dfd22806b7.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Овальный\",\"Длина/Диаметр, см\":\"915\",\"Ширина, см\":\"470\",\"Высота, см\":\"132\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 50
  },
  {
    "name": "Овальный бассейн, серия \"MADAGASCAR\" 700x320x150см",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "237760",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/8c3/8c3b12cf6eb75d049db85214fa0ec2cc.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/8c3/8c3b12cf6eb75d049db85214fa0ec2cc.jpg"
    ],
    "specifications": "{\"Тип фильтр-насоса\":\"Нет\",\"Размер\":\"700x320x150 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 54
  },
  {
    "name": "Овальный бассейн, серия \"MADAGASCAR\" 800x400x150см",
    "description": "Качественный аксессуар для бассейна от надежного производителя. Совместим с соответствующими моделями бассейнов и оборудования. Изготовлен из качественных материалов для длительного срока службы.",
    "price": "261520",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "gre",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/7bf/7bf4e8ca42df61a266f03f8106fdf72c.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/7bf/7bf4e8ca42df61a266f03f8106fdf72c.jpg"
    ],
    "specifications": "{\"Тип фильтр-насоса\":\"Нет\",\"Размер\":\"800x400x150 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 38
  }
];

    productsData.forEach(prod => {
      const product: Product = { 
        id: this.currentProductId++, 
        ...prod,
        originalPrice: prod.originalPrice || null,
        brand: prod.brand || null,
        subcategory: prod.subcategory || null,
        volume: prod.volume || null,
        images: prod.images || null,
        inStock: prod.inStock !== undefined ? prod.inStock : true,
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
      .sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"))
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
      images: insertProduct.images || null,
      inStock: insertProduct.inStock !== undefined ? insertProduct.inStock : true,
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
      status: "новая",
      email: insertConsultation.email || null,
      createdAt: new Date()
    };
    this.consultations.set(consultation.id, consultation);
    return consultation;
  }
}

export const storage = new MemStorage();