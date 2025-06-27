import fs from 'fs';

// Загружаем данные о товарах
const catalogData = JSON.parse(fs.readFileSync('./full-catalog-processed.json', 'utf-8'));

console.log(`🔄 Исправляю категории для ${catalogData.products.length} товаров...`);

// Улучшенная функция определения категории
function determineCategory(name, manufacturer) {
  const nameL = name.toLowerCase();
  const manL = (manufacturer || '').toLowerCase();
  
  // Каркасные бассейны
  if (nameL.includes('каркасный бассейн') || 
      nameL.includes('каркасного бассейна') ||
      nameL.includes('ultra frame') ||
      nameL.includes('prism frame') ||
      nameL.includes('steel pro') ||
      nameL.includes('metal frame') ||
      (nameL.includes('бассейн') && (nameL.includes('каркас') || nameL.includes('frame')))) {
    return 'frame-pools';
  }
  
  // Надувные бассейны
  if (nameL.includes('надувной бассейн') ||
      nameL.includes('fast set') ||
      nameL.includes('easy set') ||
      nameL.includes('snap set') ||
      (nameL.includes('бассейн') && (nameL.includes('надувн') || nameL.includes('inflat')))) {
    return 'inflatable-pools';
  }
  
  // Насосы и фильтры
  if (nameL.includes('насос') || 
      nameL.includes('фильтр') ||
      nameL.includes('скиммер') ||
      nameL.includes('pump') ||
      nameL.includes('filter') ||
      nameL.includes('картридж') ||
      nameL.includes('cartridge')) {
    return 'pumps-filters';
  }
  
  // Лестницы
  if (nameL.includes('лестница') ||
      nameL.includes('ladder') ||
      nameL.includes('ступен')) {
    return 'ladders';
  }
  
  // Тенты и подстилки
  if (nameL.includes('тент') ||
      nameL.includes('покрывало') ||
      nameL.includes('подстилка') ||
      nameL.includes('cover') ||
      nameL.includes('mat') ||
      nameL.includes('cloth') ||
      nameL.includes('carpet')) {
    return 'covers-underlays';
  }
  
  // Химия для бассейнов
  if (nameL.includes('химия') ||
      nameL.includes('хлор') ||
      nameL.includes('дезинфекц') ||
      nameL.includes('альгицид') ||
      nameL.includes('ph') ||
      nameL.includes('тест') ||
      nameL.includes('реагент') ||
      nameL.includes('chemical')) {
    return 'chemicals';
  }
  
  // Чаши для бассейнов
  if (nameL.includes('чаша') || nameL.includes('liner')) {
    return 'accessories';
  }
  
  // Комплектующие и аксессуары
  if (nameL.includes('комплект') ||
      nameL.includes('набор') ||
      nameL.includes('аксессуар') ||
      nameL.includes('запчаст') ||
      nameL.includes('соединител') ||
      nameL.includes('крепеж') ||
      nameL.includes('хомут') ||
      nameL.includes('клапан') ||
      nameL.includes('заглушка') ||
      nameL.includes('переходник')) {
    return 'accessories';
  }
  
  // По умолчанию - аксессуары
  return 'accessories';
}

// Статистика до изменений
const beforeStats = {};
catalogData.products.forEach(p => {
  if (!beforeStats[p.category]) beforeStats[p.category] = 0;
  beforeStats[p.category]++;
});

console.log('До исправления:');
Object.entries(beforeStats).forEach(([cat, count]) => {
  console.log(`${cat}: ${count} товаров`);
});

// Исправляем категории
let changedCount = 0;
catalogData.products.forEach(product => {
  const oldCategory = product.category;
  const newCategory = determineCategory(product.name, product.brand);
  
  if (oldCategory !== newCategory) {
    product.category = newCategory;
    changedCount++;
  }
});

// Статистика после изменений
const afterStats = {};
catalogData.products.forEach(p => {
  if (!afterStats[p.category]) afterStats[p.category] = 0;
  afterStats[p.category]++;
});

console.log('\nПосле исправления:');
Object.entries(afterStats).sort((a,b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`${cat}: ${count} товаров`);
});

console.log(`\n✅ Изменено категорий: ${changedCount} товаров`);

// Сохраняем исправленные данные
fs.writeFileSync('./full-catalog-fixed.json', JSON.stringify(catalogData, null, 2), 'utf-8');
console.log('💾 Сохранен файл с исправленными категориями');

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

    // Initialize products - Полный каталог с исправленными категориями (${catalogData.products.length} товаров)
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
console.log('✅ Storage.ts обновлен с правильными категориями товаров!');