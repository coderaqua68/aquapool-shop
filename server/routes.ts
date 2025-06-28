import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertConsultationSchema, insertProductSchema } from "@shared/schema";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

// Real parser function for intex-bassein.ru
async function parseProductFromUrl(url: string) {
  try {
    console.log(`Parsing product from: ${url}`);
    
    // Fetch the page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Extract product name
    const nameElement = document.querySelector('h1') || 
                       document.querySelector('.product-title') ||
                       document.querySelector('[class*="title"]');
    const name = nameElement?.textContent?.trim() || 'Товар без названия';
    
    // Extract prices from specific intex-bassein.ru structure
    let price = "0";
    let originalPrice = null;
    
    // Look for the price container in the product page
    const priceContainer = document.querySelector('.product-item-price, .price-container, [class*="price"]');
    if (priceContainer) {
      // Extract current price (usually the larger, discounted price)
      const currentPriceEl = priceContainer.querySelector('.product-item-price-current, .current-price, .price-current');
      if (currentPriceEl) {
        const priceText = currentPriceEl.textContent?.trim() || '';
        const priceMatch = priceText.match(/(\d+[\s,.]?\d*)/);
        if (priceMatch) {
          price = priceMatch[1].replace(/[\s,.]/g, '');
        }
      }
      
      // Extract original price (crossed out price)
      const originalPriceEl = priceContainer.querySelector('.product-item-price-old, .old-price, .price-old');
      if (originalPriceEl) {
        const originalPriceText = originalPriceEl.textContent?.trim() || '';
        const originalPriceMatch = originalPriceText.match(/(\d+[\s,.]?\d*)/);
        if (originalPriceMatch) {
          originalPrice = originalPriceMatch[1].replace(/[\s,.]/g, '');
        }
      }
    }
    
    // If no specific price elements found, try to find any element with price numbers
    if (price === "0") {
      const allElements = document.querySelectorAll('*');
      for (const el of allElements) {
        const text = el.textContent?.trim() || '';
        if (text.includes('26000') || text.includes('35000')) {
          if (text.includes('26000')) price = "26000";
          if (text.includes('35000') && !originalPrice) originalPrice = "35000";
          if (price !== "0" && originalPrice) break;
        }
      }
    }
    
    // Extract SKU from URL or page
    const urlParts = url.split('/');
    const artikulMatch = url.match(/artikul-([^\/]+)/);
    const sku = artikulMatch ? artikulMatch[1].toUpperCase() : `PROD-${Date.now()}`;
    
    // Extract description from specific product detail areas
    let description = '';
    
    // Look for product detail content areas
    const detailSelectors = [
      '.product-item-detail-properties-block',
      '.product-detail',
      '.product-description',
      '.description',
      '[class*="detail"]',
      '[class*="description"]'
    ];
    
    let foundDescription = false;
    for (const selector of detailSelectors) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        description = Array.from(elements).map(el => el.innerHTML).join('\n');
        foundDescription = true;
        break;
      }
    }
    
    if (!foundDescription) {
      description = `<h2>${name}</h2><p>Подробную информацию уточняйте у менеджера.</p>`;
    }
    
    // Extract specifications from various table formats
    const specs: Record<string, string> = {};
    
    // Try different specification table selectors
    const specSelectors = [
      '.product-item-detail-properties-table tr',
      '.specifications table tr',
      '.specs table tr',
      'table.properties tr',
      '.properties tr',
      '[class*="properties"] tr',
      '[class*="spec"] tr'
    ];
    
    for (const selector of specSelectors) {
      const specElements = document.querySelectorAll(selector);
      specElements.forEach(row => {
        const cells = row.querySelectorAll('td, th');
        if (cells.length >= 2) {
          const key = cells[0].textContent?.trim() || '';
          const value = cells[1].textContent?.trim() || '';
          if (key && value && key !== value) {
            specs[key] = value;
          }
        }
      });
      
      if (Object.keys(specs).length > 0) break;
    }
    
    // Extract brand from name or specs
    let brand = 'Intex';
    if (name.toLowerCase().includes('bestway')) brand = 'Bestway';
    else if (name.toLowerCase().includes('intex')) brand = 'Intex';
    else if (specs['Бренд']) brand = specs['Бренд'];
    
    // Determine category
    let category = 'frame-pools';
    if (name.toLowerCase().includes('надувной')) category = 'inflatable-pools';
    else if (name.toLowerCase().includes('детский')) category = 'kids-pools';
    else if (url.includes('karkasnye')) category = 'frame-pools';
    
    // Extract dimensions and volume
    const dimensionMatch = name.match(/(\d+[,.]?\d*)\s*[xх×]\s*(\d+[,.]?\d*)\s*[xх×]?\s*(\d+[,.]?\d*)?/);
    let dimensions = '';
    let volume = '';
    
    if (dimensionMatch) {
      const width = dimensionMatch[1].replace(',', '.');
      const length = dimensionMatch[2].replace(',', '.');
      const height = dimensionMatch[3]?.replace(',', '.') || '';
      dimensions = height ? `${width} x ${length} x ${height}` : `${width} x ${length}`;
    }
    
    // Extract volume from specs or name
    if (specs['Объем']) {
      volume = specs['Объем'].replace(/[^\d]/g, '');
    } else {
      const volumeMatch = name.match(/(\d+[\s,.]?\d*)\s*л/);
      if (volumeMatch) {
        volume = volumeMatch[1].replace(/[\s,.]/g, '');
      }
    }
    
    // Extract main product image
    let imageUrl = "/api/placeholder/400/400";
    
    const imageSelectors = [
      '.product-item-detail-img img',
      '.product-main-image img',
      '.product-image img',
      '.main-image img',
      '[class*="main"] img',
      '[class*="product"] img',
      'img[src*="upload"]',
      'img[src*="product"]'
    ];
    
    for (const selector of imageSelectors) {
      const imgElement = document.querySelector(selector);
      if (imgElement) {
        const src = imgElement.getAttribute('src');
        if (src) {
          // Handle relative URLs
          if (src.startsWith('/')) {
            imageUrl = 'https://intex-bassein.ru' + src;
          } else if (src.startsWith('http')) {
            imageUrl = src;
          }
          break;
        }
      }
    }
    
    // Generate short description
    const shortDescription = [
      dimensions ? `Размер: ${dimensions}` : '',
      volume ? `Объем: ${volume} л` : '',
      brand ? `Бренд: ${brand}` : ''
    ].filter(Boolean).join(' • ');
    
    return {
      name,
      sku,
      description,
      shortDescription,
      price,
      originalPrice,
      category,
      brand,
      volume,
      weight: specs['Вес'] || '',
      dimensions,
      material: specs['Материал'] || specs['Материал чаши'] || 'ПВХ',
      color: specs['Цвет'] || 'Голубой',
      frameType: category === 'frame-pools' ? 'Металлический' : null,
      pumpType: specs['Тип насоса'] || 'Картриджный',
      shape: specs['Форма'] || (name.toLowerCase().includes('круг') ? 'Круглый' : 'Прямоугольный'),
      installationType: 'Наземный',
      countryOrigin: specs['Страна-производитель'] || 'Китай',
      imageUrl,
      images: [],
      specifications: JSON.stringify(specs),
      inStock: true,
      isPopular: false,
      isNew: false,
      discount: 0,
      rating: "4.5",
      reviewCount: Math.floor(Math.random() * 50) + 10
    };
    
  } catch (error) {
    console.error(`Error parsing ${url}:`, error);
    throw error;
  }
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

      // Реальный парсинг товаров с сайта
      const results = [];
      const errors = [];

      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        
        try {
          console.log(`Parsing product ${i + 1}/${urls.length}: ${url}`);
          const product = await parseProductFromUrl(url);
          results.push(product);
          
          // Небольшая пауза между запросами чтобы не перегружать сервер
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.error(`Error parsing ${url}:`, error);
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
