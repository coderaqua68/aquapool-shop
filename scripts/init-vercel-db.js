const { Pool } = require('@neondatabase/serverless');

async function initializeDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  try {
    // Create products table
    await pool.query(`
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
    `);

    // Create categories table
    await pool.query(`
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
    `);

    // Create orders table
    await pool.query(`
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
    `);

    // Create consultations table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS consultations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        message TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Create site_settings table
    await pool.query(`
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
    `);

    // Create telegram_admins table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS telegram_admins (
        id SERIAL PRIMARY KEY,
        chat_id VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        username VARCHAR(50),
        is_active BOOLEAN DEFAULT true,
        added_at TIMESTAMP DEFAULT NOW(),
        last_notified TIMESTAMP
      );
    `);

    console.log('Database tables created successfully!');
    
    // Insert basic categories
    await pool.query(`
      INSERT INTO categories (name, slug, description, level) VALUES
      ('Каркасные бассейны', 'karkasnye-basseyny', 'Надежные каркасные бассейны для дачи', 0),
      ('Морозоустойчивые бассейны', 'morozoustoychivye-basseyny', 'Всесезонные бассейны', 0),
      ('Джакузи и СПА', 'dzhakuzi-spa', 'Гидромассажные ванны и джакузи', 0),
      ('Запасные чаши', 'zapasnie-chashi', 'Сменные чаши для бассейнов', 0),
      ('Пленка для бассейнов', 'plenka-dlya-basseinov', 'Покрытия и пленки', 0)
      ON CONFLICT (slug) DO NOTHING;
    `);

    console.log('Basic categories inserted!');

  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await pool.end();
  }
}

initializeDatabase();