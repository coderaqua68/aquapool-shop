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

  async getPopularProducts(): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(p => p.isPopular)
      .sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"))
      .slice(0, 8);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    // Автогенерация SKU если не указан
    const sku = insertProduct.sku || this.generateSKU(insertProduct.brand, insertProduct.category);
    
    const product: Product = { 
      id: this.currentProductId++, 
      ...insertProduct,
      sku,
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
      reviewCount: insertProduct.reviewCount || 0
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

  async updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;

    const updatedProduct: Product = {
      ...existingProduct,
      ...updateData,
      id: existingProduct.id,
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
      reviewCount: updateData.reviewCount !== undefined ? updateData.reviewCount : existingProduct.reviewCount
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

export const storage = new MemStorage();