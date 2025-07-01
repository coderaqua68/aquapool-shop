import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// Simple test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Database initialization endpoint  
app.post('/api/init-database', async (req, res) => {
  try {
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
        price DECIMAL(10,2) NOT NULL,
        category TEXT NOT NULL,
        image_url TEXT NOT NULL,
        specifications TEXT NOT NULL,
        in_stock BOOLEAN DEFAULT true,
        rating DECIMAL(2,1) DEFAULT 0,
        review_count INTEGER DEFAULT 0
      )
    `;

    // Create categories table
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        level INTEGER DEFAULT 0
      )
    `;

    // Insert basic categories
    await sql`
      INSERT INTO categories (name, slug, description, level) VALUES
      ('Каркасные бассейны', 'karkasnye-basseyny', 'Надежные каркасные бассейны для дачи', 0),
      ('Морозоустойчивые бассейны', 'morozoustoychivye-basseyny', 'Всесезонные бассейны', 0),
      ('Джакузи и СПА', 'dzhakuzi-spa', 'Гидромассажные ванны и джакузи', 0)
      ON CONFLICT (slug) DO NOTHING
    `;

    res.json({ success: true, message: 'Database initialized successfully!' });

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