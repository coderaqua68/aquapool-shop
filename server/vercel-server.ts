import express from "express";
import path from "path";
import { sql } from "./db-vercel";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// API Routes
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await sql`SELECT * FROM products ORDER BY id LIMIT 50`;
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product by slug
app.get("/api/products/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const [product] = await sql`SELECT * FROM products WHERE slug = ${slug}`;
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Get categories
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await sql`SELECT * FROM categories ORDER BY level, name`;
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Search products
app.get("/api/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }
    
    const searchTerm = `%${q}%`;
    const products = await sql`
      SELECT * FROM products 
      WHERE name ILIKE ${searchTerm} 
         OR sku ILIKE ${searchTerm}
         OR description ILIKE ${searchTerm}
      ORDER BY name
      LIMIT 20
    `;
    
    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Failed to search products' });
  }
});

// Database initialization endpoint  
app.post('/api/init-database', async (req, res) => {
  try {
    // Create products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        sku TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2),
        category TEXT NOT NULL,
        brand TEXT,
        image_url TEXT NOT NULL,
        specifications TEXT NOT NULL,
        in_stock BOOLEAN DEFAULT true,
        rating DECIMAL(2,1) DEFAULT 4.5,
        review_count INTEGER DEFAULT 10,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create categories table
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        level INTEGER DEFAULT 0,
        parent_id INTEGER REFERENCES categories(id)
      )
    `;

    // Insert basic categories
    await sql`
      INSERT INTO categories (name, slug, description, level) VALUES
      ('Каркасные бассейны', 'karkasnye-basseyny', 'Надежные каркасные бассейны для дачи', 0),
      ('Морозоустойчивые бассейны', 'morozoustoychivye-basseyny', 'Всесезонные бассейны', 0),
      ('Джакузи и СПА', 'dzhakuzi-spa', 'Гидромассажные ванны и джакузи', 0),
      ('Запасные чаши', 'zapasnie-chashi', 'Сменные чаши для бассейнов', 0),
      ('Пленки для бассейнов', 'plenki-basseyni', 'Покрытия и пленки', 0)
      ON CONFLICT (slug) DO NOTHING
    `;

    // Insert sample products
    await sql`
      INSERT INTO products (sku, name, slug, description, price, original_price, category, brand, image_url, specifications) VALUES
      ('28271', 'INTEX Metal Frame 457x122', 'intex-metal-frame-457x122', 'Каркасный бассейн INTEX Metal Frame с объемом 12706 л', 15750, 21000, 'karkasnye-basseyny', 'INTEX', 'https://intex-bassein.ru/images/detailed/13/28271.jpg', '{"diameter": "457 см", "height": "122 см", "volume": "12706 л", "weight": "31.2 кг"}'),
      ('28273', 'INTEX Metal Frame 549x122', 'intex-metal-frame-549x122', 'Каркасный бассейн INTEX Metal Frame с объемом 19156 л', 22500, 30000, 'karkasnye-basseyny', 'INTEX', 'https://intex-bassein.ru/images/detailed/13/28273.jpg', '{"diameter": "549 см", "height": "122 см", "volume": "19156 л", "weight": "42.6 кг"}'),
      ('5614A', 'Bestway Power Steel 305x200x84', 'bestway-power-steel-305x200x84', 'Каркасный бассейн Bestway Power Steel овальной формы', 18750, 25000, 'karkasnye-basseyny', 'Bestway', 'https://intex-bassein.ru/images/detailed/26/5614A.jpg', '{"length": "305 см", "width": "200 см", "height": "84 см", "volume": "4200 л", "weight": "28.5 кг"}')
      ON CONFLICT (sku) DO NOTHING
    `;

    res.json({ success: true, message: 'Database initialized successfully with sample data!' });

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to initialize database',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Serve frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;