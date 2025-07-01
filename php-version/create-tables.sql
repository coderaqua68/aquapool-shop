-- Создание структуры базы данных AquaPool
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS order_items;

-- Создание таблицы категорий
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    parent_id INT NULL,
    parent_slug VARCHAR(255) NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы товаров
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    specifications TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    discount_percentage INT DEFAULT 0,
    brand VARCHAR(100),
    category_id INT,
    image_url TEXT,
    images TEXT,
    dimensions VARCHAR(200),
    material VARCHAR(100),
    shape VARCHAR(50),
    volume VARCHAR(50),
    type VARCHAR(100),
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INT DEFAULT 0,
    is_popular BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Создание таблицы заказов
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    address TEXT NOT NULL,
    delivery_method VARCHAR(100) DEFAULT 'Курьером до двери',
    payment_method VARCHAR(100) DEFAULT 'Оплата через менеджера',
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы товаров в заказе
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Вставка базовых категорий
INSERT INTO categories (name, slug, description) VALUES
('Каркасные бассейны', 'karkasnye-basseyny', 'Прочные каркасные бассейны для дачи и дома'),
('Морозоустойчивые бассейны', 'morozoustoychivye-basseyny', 'Всесезонные бассейны для круглогодичного использования'),
('Джакузи и СПА', 'dzhakuzi', 'Гидромассажные ванны и джакузи для релаксации'),
('Запасные чаши', 'zapasnye-chashi', 'Сменные чаши для каркасных бассейнов'),
('Пленка ПВХ', 'plenka-pvh', 'Качественная пленка для облицовки бассейнов');

-- Вставка подкатегорий
INSERT INTO categories (name, slug, parent_id, parent_slug, description) VALUES
('Intex каркасные', 'intex-karkasnye', 1, 'karkasnye-basseyny', 'Каркасные бассейны Intex'),
('Bestway каркасные', 'bestway-karkasnye', 1, 'karkasnye-basseyny', 'Каркасные бассейны Bestway'),
('Intex джакузи', 'intex-dzhakuzi', 3, 'dzhakuzi', 'Надувные джакузи Intex'),
('Bestway джакузи', 'bestway-dzhakuzi', 3, 'dzhakuzi', 'Надувные джакузи Bestway');

-- Вставка тестовых товаров
INSERT INTO products (name, slug, sku, description, price, original_price, brand, category_id, rating, review_count, is_popular, dimensions, type, specifications) VALUES
('INTEX Metal Frame 366x76 см', 'intex-metal-frame-366x76', 'INT28210', 'Каркасный бассейн Intex Metal Frame с металлической рамой. Отличное решение для дачи и загородного дома.', 12500, 15000, 'Intex', 6, 4.5, 28, TRUE, '366x76', 'Каркасный', 'Материал: ПВХ 0.4мм, объем: 7127л, комплект: насос-фильтр, лестница, подстилка'),

('Bestway Steel Pro 457x122 см', 'bestway-steel-pro-457x122', 'BST56438', 'Большой каркасный бассейн Bestway Steel Pro с усиленной конструкцией. Вместительность до 16 человек.', 25900, 32900, 'Bestway', 7, 4.8, 42, TRUE, '457x122', 'Каркасный', 'Материал: ПВХ 0.6мм, объем: 17203л, комплект: картриджный фильтр 3785л/ч, лестница, тент, подстилка'),

('INTEX PureSpa 28426 джакузи', 'intex-purespa-28426', 'SPA28426', 'Надувное джакузи Intex PureSpa на 4 человека с гидромассажем и подогревом воды.', 45000, 52000, 'Intex', 8, 4.7, 35, TRUE, '196x71', 'Джакузи', 'Вместимость: 4 человека, подогрев: до 40°C, 120 форсунок, светодиодная подсветка, панель управления'),

('Чаша для бассейна Intex 366 см', 'chasha-intex-366', 'CHASH366', 'Запасная чаша из прочного ПВХ материала для каркасного бассейна диаметром 366 см.', 8500, 11000, 'Intex', 4, 4.3, 18, FALSE, '366x76', 'Запасная чаша', 'Материал: ПВХ 0.4мм, цвет: голубой, совместимость: Metal Frame 366см'),

('Bestway Hydrium 460x120 см', 'bestway-hydrium-460x120', 'BST56384', 'Премиальный каркасный бассейн Bestway Hydrium с технологией TriTech и песочным фильтром.', 48900, 58900, 'Bestway', 7, 4.9, 51, TRUE, '460x120', 'Каркасный', 'Материал: TriTech 0.8мм, объем: 17800л, песочный фильтр 5678л/ч, лестница, тент, подстилка, скиммер');