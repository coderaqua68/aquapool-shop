-- AquaPool Database Schema for PostgreSQL/MySQL
-- Создание базы данных и таблиц для PHP версии

-- Создание базы данных (если нужно)
-- CREATE DATABASE aquapool_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Таблица категорий
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    sort_order INTEGER DEFAULT 0,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица товаров
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    sku VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    short_description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    brand VARCHAR(100),
    images JSON,
    specifications JSON,
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    is_popular BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заказов
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_method VARCHAR(100) DEFAULT 'Курьером до двери',
    payment_method VARCHAR(100) DEFAULT 'Оплата через менеджера',
    status VARCHAR(50) DEFAULT 'new',
    total_amount DECIMAL(10,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица товаров в заказе
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL
);

-- Таблица консультаций
CREATE TABLE IF NOT EXISTS consultations (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255),
    message TEXT,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица настроек сайта
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) NOT NULL UNIQUE,
    value TEXT,
    description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_popular ON products(is_popular);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);

-- Вставка базовых категорий
INSERT INTO categories (name, slug, description, sort_order) VALUES
('Каркасные бассейны', 'karkasnye-basseyny', 'Прочные каркасные бассейны для дачи и дома', 1),
('Морозоустойчивые бассейны', 'morozostojkie-basseyny', 'Всесезонные бассейны, устойчивые к морозу', 2),
('Джакузи Intex', 'dzjakuzi-intex', 'Гидромассажные ванны и джакузи от Intex', 3),
('Джакузи Bestway', 'dzjakuzi-bestway', 'Гидромассажные ванны и джакузи от Bestway', 4),
('Запасные чаши', 'zapasnye-chashi', 'Запасные чаши для бассейнов', 5);

-- Вставка подкатегорий
INSERT INTO categories (name, slug, description, parent_id, sort_order) VALUES
('Intex каркасные', 'intex-karkasnye', 'Каркасные бассейны Intex', 1, 1),
('Bestway каркасные', 'bestway-karkasnye', 'Каркасные бассейны Bestway', 1, 2);

-- Вставка базовых настроек
INSERT INTO site_settings (key, value, description) VALUES
('site_name', 'AquaPool', 'Название сайта'),
('site_description', 'Интернет-магазин бассейнов и оборудования', 'Описание сайта'),
('contact_email', 'aquapoolshop@yandex.ru', 'Email для связи'),
('whatsapp_phone', '79000000000', 'Номер WhatsApp'),
('free_delivery_until', '2025-07-31', 'Дата окончания бесплатной доставки'),
('yandex_metrika_id', '98765432', 'ID Яндекс.Метрики'),
('google_analytics', 'GA-XXXXXXXXX', 'ID Google Analytics');

-- Пример добавления товаров (можно удалить после импорта реальных данных)
INSERT INTO products (name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular) VALUES
(
    'Каркасный бассейн Intex Prism Frame 427x122 см',
    'karkasnyy-basseyn-intex-prism-frame-427x122-sm',
    '26726',
    'Прочный каркасный бассейн от Intex с металлическим каркасом. Идеально подходит для дачи и загородного дома.',
    'Каркасный бассейн диаметром 4,27 м и высотой 1,22 м с комплектом для установки',
    45000,
    60000,
    (SELECT id FROM categories WHERE slug = 'intex-karkasnye'),
    'Intex',
    '["https://images.unsplash.com/photo-1586282391129-76a6df230f37?w=600&h=400&fit=crop"]',
    '{"Диаметр": "427 см", "Высота": "122 см", "Объем": "16.805 л", "Материал": "ПВХ + металл", "В комплекте": "Насос, лестница, тент"}',
    4.5,
    23,
    true
);

-- Создание пользователя для базы данных (опционально)
-- CREATE USER 'aquapool_user'@'localhost' IDENTIFIED BY 'secure_password';
-- GRANT ALL PRIVILEGES ON aquapool_db.* TO 'aquapool_user'@'localhost';
-- FLUSH PRIVILEGES;