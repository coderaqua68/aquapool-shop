import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertConsultationSchema, insertProductSchema } from "@shared/schema";

// Helper function to generate mock products for parser demo
function generateMockProduct(url: string, index: number) {
  const brands = ['Intex', 'Bestway', 'Summer Waves', 'Jilong'];
  const types = ['Каркасный', 'Надувной', 'Детский'];
  const shapes = ['Круглый', 'Прямоугольный', 'Овальный'];
  const materials = ['ПВХ', 'Винил', 'Полиэстер'];
  
  const brand = brands[index % brands.length];
  const type = types[index % types.length];
  const shape = shapes[index % shapes.length];
  const material = materials[index % materials.length];
  
  const diameter = (3 + Math.random() * 2).toFixed(2);
  const height = (1 + Math.random() * 0.5).toFixed(2);
  const volume = (parseFloat(diameter) * parseFloat(diameter) * parseFloat(height) * 1000).toFixed(0);
  const weight = (20 + Math.random() * 30).toFixed(1);
  
  const sku = `${brand.toUpperCase()}-${type.charAt(0)}${shape.charAt(0)}-${(10000 + index).toString()}`;
  
  const specs = {
    "Бренд": brand,
    "Диаметр (м)": diameter,
    "Высота (м)": height,
    "Объем (л)": volume,
    "Вес (кг)": weight,
    "Материал чаши": material,
    "Форма бассейна": shape,
    "Тип бассейна": type,
    "Страна-производитель": "Китай",
    "Артикул": sku
  };
  
  return {
    name: `${type} бассейн ${brand} ${shape.toLowerCase()} ${diameter} x ${height} м, артикул ${sku}`,
    sku: sku,
    description: `<h2>${type} бассейн ${brand}</h2><p>Качественный ${type.toLowerCase()} бассейн от ${brand} с размерами ${diameter}x${height} м. Изготовлен из прочного материала ${material}.</p><ul><li>Объем: ${volume} литров</li><li>Вес: ${weight} кг</li><li>Форма: ${shape}</li></ul>`,
    shortDescription: `Диаметр: ${diameter} • Высота: ${height} • Объем: ${volume}`,
    price: "0",
    originalPrice: null,
    category: type === 'Каркасный' ? 'frame-pools' : 'inflatable-pools',
    brand: brand,
    volume: volume,
    weight: weight,
    dimensions: `${diameter} x ${height}`,
    material: material,
    color: "Голубой",
    frameType: type === 'Каркасный' ? "Металлический" : null,
    pumpType: "Картриджный",
    shape: shape,
    installationType: "Наземный",
    countryOrigin: "Китай",
    imageUrl: "/api/placeholder/400/400",
    images: [],
    specifications: JSON.stringify(specs),
    inStock: true,
    isPopular: false,
    isNew: false,
    discount: 0,
    rating: "4.5",
    reviewCount: Math.floor(Math.random() * 50) + 10
  };
}

// Простая авторизация для админ панели
const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "aquapool2025";

const adminAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ message: "Необходима авторизация" });
  }
  
  const credentials = Buffer.from(authHeader.slice(6), 'base64').toString();
  const [login, password] = credentials.split(':');
  
  if (login !== ADMIN_LOGIN || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Неверный логин или пароль" });
  }
  
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const filters = {
        category: req.query.category as string,
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
        inStock: req.query.inStock ? req.query.inStock === 'true' : undefined,
        search: req.query.search as string,
      };
      
      const products = await storage.getProducts(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/popular", async (req, res) => {
    try {
      const products = await storage.getPopularProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch popular products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategory(req.params.slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Orders
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: "Invalid order data", error });
    }
  });

  // Consultations
  app.post("/api/consultations", async (req, res) => {
    try {
      const consultationData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(consultationData);
      res.status(201).json(consultation);
    } catch (error) {
      res.status(400).json({ message: "Invalid consultation data", error });
    }
  });

  // Admin API routes
  app.post("/api/admin/login", (req, res) => {
    const { login, password } = req.body;
    
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      const token = Buffer.from(`${login}:${password}`).toString('base64');
      res.json({ 
        success: true, 
        message: "Авторизация успешна",
        token: `Basic ${token}`
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: "Неверный логин или пароль" 
      });
    }
  });

  // Admin Products CRUD
  app.post("/api/admin/products", adminAuth, async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Ошибка при создании товара", error });
    }
  });

  app.put("/api/admin/products/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body; // Частичное обновление
      const product = await storage.updateProduct(id, updateData);
      
      if (!product) {
        return res.status(404).json({ message: "Товар не найден" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: "Ошибка при обновлении товара", error });
    }
  });

  app.delete("/api/admin/products/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProduct(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Товар не найден" });
      }
      
      res.json({ message: "Товар удален успешно" });
    } catch (error) {
      res.status(500).json({ message: "Ошибка при удалении товара", error });
    }
  });

  // Parse products from URLs (mock implementation for demo)
  app.post("/api/admin/parse-products", adminAuth, async (req, res) => {
    try {
      const { urls } = req.body;
      
      if (!Array.isArray(urls)) {
        return res.status(400).json({ message: "URLs must be an array" });
      }

      // Симуляция парсинга для демонстрации
      const results = [];
      const errors = [];

      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        
        try {
          // Генерируем тестовый товар на основе URL
          const mockProduct = generateMockProduct(url, i);
          results.push(mockProduct);
          
          // Имитируем время парсинга
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          errors.push({
            url,
            error: "Ошибка парсинга: " + (error instanceof Error ? error.message : String(error))
          });
        }
      }
      
      res.json({
        success: true,
        products: results,
        errors
      });
    } catch (error) {
      console.error("Error parsing products:", error);
      res.status(500).json({ message: "Failed to parse products" });
    }
  });

  // Bulk import products from parser
  app.post("/api/admin/import-products", adminAuth, async (req, res) => {
    try {
      const { products } = req.body;
      
      if (!Array.isArray(products)) {
        return res.status(400).json({ message: "Products must be an array" });
      }

      const results = [];
      const errors = [];

      for (let i = 0; i < products.length; i++) {
        try {
          const productData = products[i];
          
          // Validate required fields
          if (!productData.name) {
            throw new Error("Product name is required");
          }

          const product = await storage.createProduct(productData);
          results.push(product);
        } catch (error) {
          errors.push({
            index: i,
            product: products[i]?.name || `Product ${i}`,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      }

      res.json({
        success: true,
        imported: results.length,
        errorCount: errors.length,
        results: results,
        errorsList: errors
      });
    } catch (error) {
      console.error("Error importing products:", error);
      res.status(500).json({ message: "Failed to import products" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
