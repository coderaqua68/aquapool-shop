import fs from 'fs';

// Загружаем данные о товарах
const catalogData = JSON.parse(fs.readFileSync('./full-catalog-processed.json', 'utf-8'));

console.log(`📝 Обрабатываю описания для ${catalogData.products.length} товаров...`);

// Функция для создания расширенного описания на основе характеристик
function enhanceDescription(product) {
  const { name, specifications } = product;
  let specs = {};
  
  try {
    specs = JSON.parse(specifications);
  } catch (e) {
    specs = {};
  }

  // Определяем тип товара для персонализированного описания
  const nameL = name.toLowerCase();
  let description = '';
  
  if (nameL.includes('каркасный бассейн') || nameL.includes('каркасного бассейна')) {
    description = generateFramePoolDescription(name, specs);
  } else if (nameL.includes('надувной бассейн') || nameL.includes('fast set')) {
    description = generateInflatablePoolDescription(name, specs);
  } else if (nameL.includes('насос') || nameL.includes('фильтр')) {
    description = generatePumpDescription(name, specs);
  } else if (nameL.includes('лестница')) {
    description = generateLadderDescription(name, specs);
  } else if (nameL.includes('тент') || nameL.includes('покрывало')) {
    description = generateCoverDescription(name, specs);
  } else if (nameL.includes('чаша')) {
    description = generateChashDescription(name, specs);
  } else {
    description = generateAccessoryDescription(name, specs);
  }

  return description;
}

function generateFramePoolDescription(name, specs) {
  const brand = name.includes('Intex') ? 'Intex' : name.includes('Bestway') ? 'Bestway' : '';
  const isUltra = name.includes('Ultra');
  const isPrism = name.includes('Prism');
  const isSteel = name.includes('Steel Pro');
  
  let desc = `Каркасный бассейн ${brand}`;
  
  if (isUltra) {
    desc += ' серии Ultra Frame - премиальная модель с улучшенной конструкцией каркаса и повышенной прочностью.';
  } else if (isPrism) {
    desc += ' серии Prism Frame - отличается современным дизайном и технологией Super-Tough для дополнительной прочности.';
  } else if (isSteel) {
    desc += ' серии Steel Pro - надежная конструкция с металлическим каркасом, покрытым антикоррозийным слоем.';
  } else {
    desc += ' - качественная модель для дачи и загородного дома.';
  }

  if (specs['Объем']) {
    desc += ` Вместимость бассейна составляет ${specs['Объем']}.`;
  }
  
  if (specs['Время установки, мин']) {
    desc += ` Время сборки: всего ${specs['Время установки, мин']} минут.`;
  } else {
    desc += ' Быстрая и простая установка без специальных инструментов.';
  }

  desc += ' Чаша выполнена из высококачественного трехслойного ПВХ-материала, устойчивого к проколам и воздействию ультрафиолета.';
  
  if (specs['Производительность фильтра л/ч']) {
    desc += ` В комплекте фильтр-насос производительностью ${specs['Производительность фильтра л/ч']} л/ч для поддержания чистоты воды.`;
  }

  desc += ' Идеальное решение для семейного отдыха и активного досуга на свежем воздухе.';

  return desc;
}

function generateInflatablePoolDescription(name, specs) {
  const brand = name.includes('Intex') ? 'Intex' : name.includes('Bestway') ? 'Bestway' : '';
  
  let desc = `Надувной бассейн ${brand} - отличный выбор для быстрого создания зоны отдыха у дома.`;
  
  desc += ' Конструкция Easy Set позволяет установить бассейн всего за несколько минут: надуйте верхнее кольцо и наполните водой.';
  
  if (specs['Объем']) {
    desc += ` Объем бассейна: ${specs['Объем']}.`;
  }
  
  desc += ' Изготовлен из прочного винила с защитой от солнечных лучей.';
  
  if (name.includes('фильтр') || specs['Производительность фильтра л/ч']) {
    desc += ' В комплекте картриджный фильтр-насос для очистки воды.';
  }
  
  desc += ' Компактен в сложенном виде, легко хранится и транспортируется.';

  return desc;
}

function generatePumpDescription(name, specs) {
  let desc = '';
  
  if (name.includes('скиммер')) {
    desc = 'Скиммер для поверхностной очистки воды бассейна. Эффективно удаляет листья, насекомых и мелкий мусор с поверхности воды.';
  } else if (name.includes('фильтр-насос')) {
    desc = 'Фильтр-насос для бассейна обеспечивает циркуляцию и очистку воды.';
    if (specs['Производительность'] || specs['Производительность фильтра л/ч']) {
      const performance = specs['Производительность'] || specs['Производительность фильтра л/ч'];
      desc += ` Производительность: ${performance}.`;
    }
    desc += ' Картриджная система фильтрации эффективно задерживает загрязнения и поддерживает воду в чистом состоянии.';
  } else {
    desc = 'Насосное оборудование для бассейна, обеспечивающее надежную работу системы водообмена.';
  }
  
  desc += ' Простая установка и обслуживание. Совместимо с большинством моделей бассейнов.';

  return desc;
}

function generateLadderDescription(name, specs) {
  let desc = 'Лестница для бассейна обеспечивает безопасный и удобный вход и выход из воды.';
  
  if (name.includes('безопасности')) {
    desc += ' Модель с системой безопасности - ступеньки можно поднять, чтобы ограничить доступ детей к бассейну.';
  }
  
  desc += ' Изготовлена из прочных материалов, устойчивых к коррозии и воздействию хлорированной воды.';
  desc += ' Нескользящие ступени гарантируют дополнительную безопасность при использовании.';
  
  if (specs['Высота'] || name.includes('122') || name.includes('132')) {
    desc += ' Подходит для бассейнов соответствующей высоты.';
  }

  return desc;
}

function generateCoverDescription(name, specs) {
  let desc = '';
  
  if (name.includes('тент')) {
    desc = 'Защитный тент для бассейна предохраняет воду от загрязнений, листьев и мусора.';
    desc += ' Помогает поддерживать температуру воды и сокращает испарение.';
    desc += ' Изготовлен из прочного материала, устойчивого к ультрафиолетовому излучению.';
  } else if (name.includes('подстилка')) {
    desc = 'Защитная подстилка предназначена для установки под дно бассейна.';
    desc += ' Защищает дно от проколов острыми предметами и обеспечивает дополнительную теплоизоляцию.';
    desc += ' Изготовлена из прочного нетканого материала.';
  }
  
  desc += ' Легко устанавливается и снимается при необходимости.';

  return desc;
}

function generateChashDescription(name, specs) {
  let desc = 'Запасная чаша для каркасного бассейна - необходимый элемент для замены поврежденной чаши.';
  desc += ' Изготовлена из высококачественного ПВХ-материала с повышенной прочностью.';
  desc += ' Устойчива к воздействию хлора, соли и ультрафиолетового излучения.';
  
  if (specs['Диаметр']) {
    desc += ` Диаметр: ${specs['Диаметр']}.`;
  }
  
  if (specs['Высота']) {
    desc += ` Высота: ${specs['Высота']}.`;
  }
  
  desc += ' Точное соответствие оригинальным размерам обеспечивает идеальную посадку.';

  return desc;
}

function generateAccessoryDescription(name, specs) {
  let desc = 'Качественный аксессуар для бассейна от надежного производителя.';
  
  if (name.includes('комплект')) {
    desc = 'Полный комплект аксессуаров для бассейна включает все необходимое для комфортного использования.';
  } else if (name.includes('картридж')) {
    desc = 'Сменный картридж для фильтр-насоса обеспечивает эффективную очистку воды в бассейне.';
    desc += ' Регулярная замена картриджей необходима для поддержания качества фильтрации.';
  }
  
  desc += ' Совместим с соответствующими моделями бассейнов и оборудования.';
  desc += ' Изготовлен из качественных материалов для длительного срока службы.';

  return desc;
}

// Обрабатываем все товары
let enhancedCount = 0;
catalogData.products.forEach(product => {
  const currentDesc = product.description;
  
  // Если описание слишком короткое или стандартное
  if (!currentDesc || 
      currentDesc.length < 100 || 
      currentDesc.includes('Качественный товар для бассейна от проверенного производителя')) {
    
    product.description = enhanceDescription(product);
    enhancedCount++;
  }
});

console.log(`✅ Улучшено описаний: ${enhancedCount} из ${catalogData.products.length}`);

// Сохраняем обновленные данные
fs.writeFileSync('./full-catalog-enhanced.json', JSON.stringify(catalogData, null, 2), 'utf-8');
console.log('💾 Сохранен файл с улучшенными описаниями: full-catalog-enhanced.json');

// Обновляем storage.ts
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

    // Initialize products - Полный каталог с улучшенными описаниями (${catalogData.products.length} товаров)
    const productsData = ${JSON.stringify(catalogData.products, null, 2)};

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

export const storage = new MemStorage();`;

// Сохраняем обновленный storage.ts
fs.writeFileSync('../server/storage.ts', storageTemplate, 'utf-8');
console.log('✅ Storage.ts обновлен с улучшенными описаниями товаров!');

main();