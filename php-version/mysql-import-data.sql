-- Импорт данных AquaPool для MySQL
SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;

-- Очистка таблиц
DELETE FROM products WHERE id > 0;
DELETE FROM categories WHERE id > 0;

-- Сброс автоинкремента
ALTER TABLE categories AUTO_INCREMENT = 1;
ALTER TABLE products AUTO_INCREMENT = 1;

-- Импорт категорий
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES 
(23, 'Каркасные бассейны', 'karkasnye-basseyny', 'Каркасные бассейны INTEX и Bestway различных размеров', NULL, 1, ''),
(24, 'Морозоустойчивые бассейны', 'morozostojkie-basseyny', 'Морозоустойчивые бассейны премиум класса', NULL, 2, ''),
(26, 'Джакузи INTEX', 'dzjakuzi-intex', 'Джакузи и СПА INTEX с подогревом', NULL, 4, ''),
(27, 'Джакузи Bestway', 'dzjakuzi-bestway', 'Джакузи и СПА Bestway премиум класса', NULL, 5, ''),
(28, 'Запасные чаши', 'zapasnye-chashi', 'Запасные чаши для всех типов бассейнов', NULL, 6, ''),
(38, 'INTEX', 'intex-karkasnye', 'Каркасные бассейны INTEX', 23, 1, ''),
(39, 'Bestway', 'bestway-karkasnye', 'Каркасные бассейны Bestway', 23, 2, ''),
(40, 'Laguna', 'laguna-morozostojkie', 'Морозоустойчивые бассейны Laguna', 24, 1, ''),
(41, 'Atlantic Pool', 'atlantic-pool-morozostojkie', 'Морозоустойчивые бассейны Atlantic Pool', 24, 2, ''),
(42, 'Summer Fun', 'summer-fun-morozostojkie', 'Морозоустойчивые бассейны Summer Fun', 24, 3, ''),
(43, 'MAGIC POOL', 'magic-pool-morozostojkie', 'Морозоустойчивые бассейны MAGIC POOL', 24, 4, ''),
(44, 'GRE', 'gre-morozostojkie', 'Морозоустойчивые бассейны GRE', 24, 5, ''),
(45, 'Azuro', 'azuro-morozostojkie', 'Морозоустойчивые бассейны Azuro', 24, 6, ''),
(46, 'Gigabass', 'gigabass-morozostojkie', 'Морозоустойчивые бассейны Gigabass', 24, 7, ''),
(47, 'Larimar', 'larimar-morozostojkie', 'Морозоустойчивые бассейны Larimar', 24, 8, ''),
(48, 'INTEX чаши', 'intex-chashi', 'Запасные чаши INTEX', 28, 1, ''),
(49, 'Bestway чаши', 'bestway-chashi', 'Запасные чаши Bestway', 28, 2, ''),
(50, 'Laguna пленки', 'laguna-plenki', 'Пленки Laguna для бассейнов', 28, 3, '');

-- Тестовые товары для проверки работы
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES 
(1, 'Каркасный бассейн INTEX Metal Frame 366x76 см', 'intex-metal-frame-366x76', '28210', 'Круглый каркасный бассейн INTEX Metal Frame диаметром 366 см и высотой 76 см. Отличное качество и доступная цена.', 'Круглый каркасный бассейн 366x76 см', 8500.00, 9500.00, 38, 'INTEX', '["https://intex-bassein.ru/uploads/watermark/shop_products_files/6398/shop_products_6398_1585657425.jpg"]', '{"Диаметр": "366 см", "Высота": "76 см", "Объем": "6503 л", "Материал": "ПВХ 0.40мм"}', 4.5, 24, true, true, 5),
(2, 'Каркасный бассейн Bestway Steel Pro 305x76 см', 'bestway-steel-pro-305x76', 'BW56408', 'Круглый каркасный бассейн Bestway Steel Pro диаметром 305 см. Прочная конструкция и качественные материалы.', 'Круглый каркасный бассейн 305x76 см', 7200.00, 8000.00, 39, 'Bestway', '["https://intex-bassein.ru/uploads/watermark/shop_products_files/5814/shop_products_5814_1585657425.jpg"]', '{"Диаметр": "305 см", "Высота": "76 см", "Объем": "4678 л", "Материал": "ПВХ 0.40мм"}', 4.3, 18, false, true, 8),
(3, 'Джакузи INTEX PureSpa Bubble 196x71 см', 'intex-purespa-bubble-196x71', '28426', 'СПА-бассейн INTEX PureSpa с функцией гидромассажа. Подогрев воды и система очистки.', 'Джакузи с подогревом и гидромассажем', 45000.00, 52000.00, 26, 'INTEX', '["https://intex-bassein.ru/uploads/watermark/shop_products_files/7221/shop_products_7221_1585657425.jpg"]', '{"Диаметр": "196 см", "Высота": "71 см", "Объем": "795 л", "Подогрев": "Да", "Гидромассаж": "120 форсунок"}', 4.8, 42, true, true, 3),
(4, 'Морозоустойчивый бассейн Laguna 4.0x1.5 м', 'laguna-morozostojkiy-4x1-5', 'LAG4015', 'Морозоустойчивый композитный бассейн Laguna размером 4.0x1.5 м. Выдерживает российские зимы.', 'Морозоустойчивый композитный бассейн', 125000.00, 145000.00, 40, 'Laguna', '["https://intex-bassein.ru/uploads/watermark/shop_products_files/8341/shop_products_8341_1585657425.jpg"]', '{"Длина": "400 см", "Ширина": "200 см", "Глубина": "150 см", "Материал": "Композит", "Морозостойкость": "Да"}', 4.9, 15, true, true, 2),
(5, 'Запасная чаша INTEX для бассейна 457x122 см', 'zapas-chasha-intex-457x122', 'INT457CH', 'Запасная чаша для каркасного бассейна INTEX диаметром 457 см и высотой 122 см.', 'Запасная чаша для бассейна 457x122 см', 12500.00, 14000.00, 48, 'INTEX', '["https://intex-bassein.ru/uploads/watermark/shop_products_files/9128/shop_products_9128_1585657425.jpg"]', '{"Диаметр": "457 см", "Высота": "122 см", "Материал": "ПВХ 0.55мм", "Совместимость": "INTEX Metal Frame"}', 4.2, 8, false, true, 4);