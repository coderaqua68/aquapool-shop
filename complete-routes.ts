import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertConsultationSchema, insertProductSchema } from "@shared/schema";
import { sendConsultationRequest, sendOrderNotification, testTelegramBot, getAdminChatIds } from "./telegram";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

// Function to generate URL-friendly slug from product name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[а-яё]/g, (char) => {
      const translitMap: { [key: string]: string } = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
        'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
      };
      return translitMap[char] || char;
    })
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

export function registerRoutes(app: Express): Server {
  // Basic routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:identifier", async (req, res) => {
    try {
      const { identifier } = req.params;
      let product;
      
      // Check if identifier is a number (ID) or string (slug)
      if (/^\d+$/.test(identifier)) {
        product = await storage.getProduct(parseInt(identifier));
      } else {
        product = await storage.getProductBySlug(identifier);
      }
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      
      // Send Telegram notification
      try {
        await sendOrderNotification(order);
      } catch (telegramError) {
        console.error("Failed to send Telegram notification:", telegramError);
      }
      
      res.json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.post("/api/consultations", async (req, res) => {
    try {
      const validatedData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(validatedData);
      
      // Send Telegram notification
      try {
        await sendConsultationRequest(consultation);
      } catch (telegramError) {
        console.error("Failed to send Telegram notification:", telegramError);
      }
      
      res.json(consultation);
    } catch (error) {
      console.error("Error creating consultation:", error);
      res.status(500).json({ message: "Failed to create consultation" });
    }
  });

  // Admin authentication middleware
  const adminAuth = (req: any, res: any, next: any) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Basic ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const credentials = Buffer.from(auth.slice(6), 'base64').toString();
    const [username, password] = credentials.split(':');
    
    if (username === 'admin' && password === 'aquapool2025') {
      next();
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };

  // Admin product management
  app.get("/api/admin/products", adminAuth, async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.post("/api/admin/products", adminAuth, async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.put("/api/admin/products/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.updateProduct(id, validatedData);
      res.json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/admin/products/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteProduct(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Database initialization endpoint (one-time use for Vercel)
  app.post('/api/init-database', async (req, res) => {
    try {
      // Import neon directly for initialization
      const { neon } = await import('@neondatabase/serverless');
      
      const sql = neon(process.env.DATABASE_URL!);

      // Create products table
      await sql`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          sku TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          description TEXT NOT NULL,
          composition TEXT,
          short_description TEXT,
          price DECIMAL(10,2) NOT NULL,
          original_price DECIMAL(10,2),
          category TEXT NOT NULL,
          subcategory TEXT,
          brand TEXT,
          volume TEXT,
          image_url TEXT NOT NULL,
          images TEXT[],
          specifications TEXT NOT NULL,
          in_stock BOOLEAN DEFAULT true,
          is_popular BOOLEAN DEFAULT false,
          is_new BOOLEAN DEFAULT false,
          discount INTEGER DEFAULT 0,
          rating DECIMAL(2,1) DEFAULT 0,
          review_count INTEGER DEFAULT 0,
          weight TEXT,
          dimensions TEXT,
          material TEXT,
          color TEXT,
          frame_type TEXT,
          pump_type TEXT,
          pump_capacity TEXT,
          shape TEXT,
          installation_type TEXT,
          country_origin TEXT
        );
      `;

      // Create categories table
      await sql`
        CREATE TABLE IF NOT EXISTS categories (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          description TEXT,
          image_url TEXT,
          product_count INTEGER DEFAULT 0,
          parent_id INTEGER REFERENCES categories(id),
          level INTEGER DEFAULT 0,
          sort_order INTEGER DEFAULT 0
        );
      `;

      // Create orders table
      await sql`
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          customer_name TEXT NOT NULL,
          customer_email TEXT,
          customer_phone TEXT NOT NULL,
          delivery_address TEXT,
          delivery_method TEXT NOT NULL,
          payment_method TEXT NOT NULL,
          items TEXT NOT NULL,
          total_amount DECIMAL(10,2) NOT NULL,
          status TEXT DEFAULT 'pending',
          notes TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `;

      // Create consultations table
      await sql`
        CREATE TABLE IF NOT EXISTS consultations (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT,
          message TEXT,
          status TEXT DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT NOW()
        );
      `;

      // Create site_settings table
      await sql`
        CREATE TABLE IF NOT EXISTS site_settings (
          id SERIAL PRIMARY KEY,
          key VARCHAR UNIQUE NOT NULL,
          value TEXT,
          description TEXT,
          category VARCHAR NOT NULL DEFAULT 'general',
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `;

      // Create telegram_admins table
      await sql`
        CREATE TABLE IF NOT EXISTS telegram_admins (
          id SERIAL PRIMARY KEY,
          chat_id VARCHAR(50) UNIQUE NOT NULL,
          name VARCHAR(100) NOT NULL,
          username VARCHAR(50),
          is_active BOOLEAN DEFAULT true,
          added_at TIMESTAMP DEFAULT NOW(),
          last_notified TIMESTAMP
        );
      `;

      // Insert basic categories
      await sql`
        INSERT INTO categories (name, slug, description, level) VALUES
        ('Каркасные бассейны', 'karkasnye-basseyny', 'Надежные каркасные бассейны для дачи', 0),
        ('Морозоустойчивые бассейны', 'morozoustoychivye-basseyny', 'Всесезонные бассейны', 0),
        ('Джакузи и СПА', 'dzhakuzi-spa', 'Гидромассажные ванны и джакузи', 0),
        ('Запасные чаши', 'zapasnie-chashi', 'Сменные чаши для бассейнов', 0),
        ('Пленка для бассейнов', 'plenka-dlya-basseinov', 'Покрытия и пленки', 0)
        ON CONFLICT (slug) DO NOTHING;
      `;

      res.json({ 
        success: true, 
        message: 'Database initialized successfully with all tables and basic categories' 
      });

    } catch (error) {
      console.error('Database initialization error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to initialize database',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}