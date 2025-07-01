-- Простой импорт товаров AquaPool
SET NAMES 'utf8mb4';

-- Очистка существующих данных
DELETE FROM products WHERE id > 5;
DELETE FROM categories WHERE id > 9;

-- Добавляем дополнительные категории
INSERT INTO categories (name, slug, parent_id, parent_slug, description) VALUES
('INTEX каркасные', 'intex-karkasnye', 1, 'karkasnye-basseyny', 'Каркасные бассейны INTEX всех размеров'),
('Bestway каркасные', 'bestway-karkasnye', 1, 'karkasnye-basseyny', 'Каркасные бассейны Bestway премиум качества'),
('Laguna морозоустойчивые', 'laguna-morozostojkie', 2, 'morozoustoychivye-basseyny', 'Морозоустойчивые бассейны Laguna'),
('Summer Fun морозоустойчивые', 'summer-fun-morozostojkie', 2, 'morozoustoychivye-basseyny', 'Бассейны Summer Fun'),
('INTEX джакузи', 'intex-dzhakuzi', 3, 'dzhakuzi', 'Надувные джакузи INTEX с подогревом'),
('Bestway джакузи', 'bestway-dzhakuzi', 3, 'dzhakuzi', 'СПА-бассейны Bestway'),
('INTEX чаши', 'intex-chashi', 4, 'zapasnye-chashi', 'Запасные чаши для бассейнов INTEX'),
('Bestway чаши', 'bestway-chashi', 4, 'zapasnye-chashi', 'Запасные чаши для бассейнов Bestway'),
('Пленка Laguna', 'plenka-laguna', 5, 'plenka-pvh', 'Пленка ПВХ для бассейнов Laguna');

-- Добавляем товары INTEX каркасные
INSERT INTO products (name, slug, sku, description, price, original_price, brand, category_id, rating, review_count, is_popular, dimensions, type, specifications) VALUES
('INTEX Metal Frame 244x51 см', 'intex-metal-frame-244x51', '28205', 'Компактный каркасный бассейн для небольших участков', 4500, 5200, 'INTEX', 10, 4.2, 16, FALSE, '244x51', 'Каркасный', 'Диаметр: 244см, высота: 51см, объем: 2419л'),
('INTEX Metal Frame 305x76 см', 'intex-metal-frame-305x76', '28200', 'Популярный каркасный бассейн среднего размера', 6800, 7500, 'INTEX', 10, 4.4, 32, TRUE, '305x76', 'Каркасный', 'Диаметр: 305см, высота: 76см, объем: 4485л'),
('INTEX Metal Frame 366x76 см', 'intex-metal-frame-366x76', '28210', 'Большой семейный каркасный бассейн', 8500, 9500, 'INTEX', 10, 4.5, 28, TRUE, '366x76', 'Каркасный', 'Диаметр: 366см, высота: 76см, объем: 6503л'),
('INTEX Metal Frame 457x84 см', 'intex-metal-frame-457x84', '28210', 'Самый большой каркасный бассейн INTEX', 12500, 14000, 'INTEX', 10, 4.6, 45, TRUE, '457x84', 'Каркасный', 'Диаметр: 457см, высота: 84см, объем: 10249л'),
('INTEX Prism Frame 305x76 см', 'intex-prism-frame-305x76', '26700', 'Каркасный бассейн с технологией Prism Frame', 7200, 8100, 'INTEX', 10, 4.3, 21, FALSE, '305x76', 'Каркасный', 'Диаметр: 305см, высота: 76см, объем: 4485л'),
('INTEX Prism Frame 366x99 см', 'intex-prism-frame-366x99', '26716', 'Высокий каркасный бассейн Prism Frame', 9800, 11200, 'INTEX', 10, 4.7, 38, TRUE, '366x99', 'Каркасный', 'Диаметр: 366см, высота: 99см, объем: 8347л'),
('INTEX Prism Frame 457x107 см', 'intex-prism-frame-457x107', '26724', 'Большой глубокий бассейн Prism Frame', 15500, 17800, 'INTEX', 10, 4.8, 52, TRUE, '457x107', 'Каркасный', 'Диаметр: 457см, высота: 107см, объем: 13030л');

-- Добавляем товары Bestway каркасные
INSERT INTO products (name, slug, sku, description, price, original_price, brand, category_id, rating, review_count, is_popular, dimensions, type, specifications) VALUES
('Bestway Steel Pro 305x76 см', 'bestway-steel-pro-305x76', '56408', 'Надежный каркасный бассейн Steel Pro', 7200, 8000, 'Bestway', 11, 4.3, 18, FALSE, '305x76', 'Каркасный', 'Диаметр: 305см, высота: 76см, объем: 4678л'),
('Bestway Steel Pro 366x76 см', 'bestway-steel-pro-366x76', '56416', 'Семейный бассейн Steel Pro среднего размера', 8900, 9800, 'Bestway', 11, 4.4, 25, TRUE, '366x76', 'Каркасный', 'Диаметр: 366см, высота: 76см, объем: 6478л'),
('Bestway Steel Pro 457x84 см', 'bestway-steel-pro-457x84', '56438', 'Большой каркасный бассейн Steel Pro', 13200, 15000, 'Bestway', 11, 4.6, 41, TRUE, '457x84', 'Каркасный', 'Диаметр: 457см, высота: 84см, объем: 10250л'),
('Bestway Steel Pro Max 305x76 см', 'bestway-steel-pro-max-305x76', '56408', 'Усиленный каркасный бассейн Max', 8100, 9200, 'Bestway', 11, 4.5, 29, FALSE, '305x76', 'Каркасный', 'Диаметр: 305см, высота: 76см, объем: 4678л'),
('Bestway Steel Pro Max 366x100 см', 'bestway-steel-pro-max-366x100', '56420', 'Глубокий бассейн Steel Pro Max', 11500, 13000, 'Bestway', 11, 4.7, 36, TRUE, '366x100', 'Каркасный', 'Диаметр: 366см, высота: 100см, объем: 8419л'),
('Bestway Power Steel 488x122 см', 'bestway-power-steel-488x122', '56705', 'Премиальный каркасный бассейн Power Steel', 22900, 26500, 'Bestway', 11, 4.9, 63, TRUE, '488x122', 'Каркасный', 'Диаметр: 488см, высота: 122см, объем: 18426л');

-- Добавляем джакузи INTEX
INSERT INTO products (name, slug, sku, description, price, original_price, brand, category_id, rating, review_count, is_popular, dimensions, type, specifications) VALUES
('INTEX PureSpa Bubble 196x71 см', 'intex-purespa-bubble-196x71', '28426', 'СПА-бассейн с гидромассажем на 4 человека', 45000, 52000, 'INTEX', 14, 4.8, 42, TRUE, '196x71', 'Джакузи', 'Вместимость: 4 чел, подогрев: до 40°C, 120 форсунок'),
('INTEX PureSpa Plus 216x71 см', 'intex-purespa-plus-216x71', '28428', 'Большое джакузи на 6 человек с подогревом', 58000, 67000, 'INTEX', 14, 4.9, 38, TRUE, '216x71', 'Джакузи', 'Вместимость: 6 чел, подогрев: до 40°C, 140 форсунок'),
('INTEX Simple Spa 196x66 см', 'intex-simple-spa-196x66', '28404', 'Простое джакузи без гидромассажа', 35000, 41000, 'INTEX', 14, 4.4, 24, FALSE, '196x66', 'Джакузи', 'Вместимость: 4 чел, подогрев: до 40°C'),
('INTEX PureSpa Jet Massage 196x71 см', 'intex-purespa-jet-massage-196x71', '28454', 'Джакузи с гидромассажем и пузырьками', 52000, 59000, 'INTEX', 14, 4.7, 31, TRUE, '196x71', 'Джакузи', 'Вместимость: 4 чел, гидромассаж + пузырьки'),
('INTEX 28408 Spa 180x66 см', 'intex-28408-spa-180x66', '28408', 'Компактное джакузи для 2-3 человек', 28000, 33000, 'INTEX', 14, 4.2, 18, FALSE, '180x66', 'Джакузи', 'Вместимость: 2-3 чел, подогрев: до 40°C');

-- Добавляем джакузи Bestway
INSERT INTO products (name, slug, sku, description, price, original_price, brand, category_id, rating, review_count, is_popular, dimensions, type, specifications) VALUES
('Bestway LAY-Z-SPA Miami 180x66 см', 'bestway-lay-z-spa-miami-180x66', '54123', 'Компактное джакузи LAY-Z-SPA Miami', 32000, 38000, 'Bestway', 15, 4.3, 22, FALSE, '180x66', 'Джакузи', 'Вместимость: 2-4 чел, подогрев: до 40°C'),
('Bestway LAY-Z-SPA Vegas 196x61 см', 'bestway-lay-z-spa-vegas-196x61', '54138', 'СПА-бассейн Vegas с подсветкой', 48000, 55000, 'Bestway', 15, 4.6, 35, TRUE, '196x61', 'Джакузи', 'Вместимость: 4-6 чел, LED подсветка'),
('Bestway LAY-Z-SPA Paris 196x66 см', 'bestway-lay-z-spa-paris-196x66', '54148', 'Джакузи Paris AirJet с гидромассажем', 42000, 49000, 'Bestway', 15, 4.5, 28, TRUE, '196x66', 'Джакузи', 'Вместимость: 4-6 чел, система AirJet'),
('Bestway LAY-Z-SPA Helsinki 180x66 см', 'bestway-lay-z-spa-helsinki-180x66', '54129', 'Джакузи Helsinki AirJet', 35000, 41000, 'Bestway', 15, 4.4, 19, FALSE, '180x66', 'Джакузи', 'Вместимость: 2-4 чел, система AirJet');

-- Добавляем морозоустойчивые бассейны
INSERT INTO products (name, slug, sku, description, price, original_price, brand, category_id, rating, review_count, is_popular, dimensions, type, specifications) VALUES
('Laguna 4.0x1.5 м морозоустойчивый', 'laguna-4-0x1-5-morozostojkiy', 'LAG4015', 'Композитный морозоустойчивый бассейн', 125000, 145000, 'Laguna', 12, 4.9, 15, TRUE, '400x200x150', 'Морозоустойчивый', 'Материал: композит, морозостойкость: -30°C'),
('Laguna 5.0x2.5x1.5 м', 'laguna-5-0x2-5x1-5', 'LAG50255', 'Большой морозоустойчивый бассейн Laguna', 185000, 215000, 'Laguna', 12, 5.0, 8, TRUE, '500x250x150', 'Морозоустойчивый', 'Материал: композит, система фильтрации'),
('Summer Fun 3.5x1.2 м', 'summer-fun-3-5x1-2', 'SF35120', 'Морозоустойчивый бассейн Summer Fun', 95000, 115000, 'Summer Fun', 13, 4.6, 12, FALSE, '350x200x120', 'Морозоустойчивый', 'Материал: стеклопластик'),
('Summer Fun 4.5x2.0x1.5 м', 'summer-fun-4-5x2-0x1-5', 'SF45205', 'Большой бассейн Summer Fun', 165000, 190000, 'Summer Fun', 13, 4.8, 9, TRUE, '450x200x150', 'Морозоустойчивый', 'Материал: стеклопластик, LED подсветка');

-- Добавляем запасные чаши
INSERT INTO products (name, slug, sku, description, price, original_price, brand, category_id, rating, review_count, is_popular, dimensions, type, specifications) VALUES
('Чаша INTEX 305x76 см', 'chasha-intex-305x76', 'CH305', 'Запасная чаша для бассейна INTEX 305 см', 4200, 5000, 'INTEX', 16, 4.1, 12, FALSE, '305x76', 'Запасная чаша', 'Материал: ПВХ 0.4мм, цвет: голубой'),
('Чаша INTEX 366x76 см', 'chasha-intex-366x76', 'CH366', 'Запасная чаша для бассейна INTEX 366 см', 5500, 6500, 'INTEX', 16, 4.2, 8, FALSE, '366x76', 'Запасная чаша', 'Материал: ПВХ 0.4мм, цвет: голубой'),
('Чаша INTEX 457x84 см', 'chasha-intex-457x84', 'CH457', 'Запасная чаша для большого бассейна INTEX', 8500, 10000, 'INTEX', 16, 4.3, 6, FALSE, '457x84', 'Запасная чаша', 'Материал: ПВХ 0.55мм, цвет: голубой'),
('Чаша Bestway 366x76 см', 'chasha-bestway-366x76', 'CHB366', 'Запасная чаша для бассейна Bestway 366 см', 5800, 6800, 'Bestway', 17, 4.2, 9, FALSE, '366x76', 'Запасная чаша', 'Материал: ПВХ 0.45мм, цвет: голубой'),
('Чаша Bestway 457x84 см', 'chasha-bestway-457x84', 'CHB457', 'Запасная чаша для большого бассейна Bestway', 9200, 11000, 'Bestway', 17, 4.4, 7, FALSE, '457x84', 'Запасная чаша', 'Материал: ПВХ 0.55мм, цвет: голубой');

-- Добавляем пленку ПВХ
INSERT INTO products (name, slug, sku, description, price, original_price, brand, category_id, rating, review_count, is_popular, dimensions, type, specifications) VALUES
('Пленка Laguna ПВХ 0.7мм голубая', 'plenka-laguna-pvh-07-golubaya', 'PL07BL', 'Качественная пленка ПВХ для облицовки бассейнов', 850, 1000, 'Laguna', 18, 4.4, 15, FALSE, '1.5м ширина', 'Пленка ПВХ', 'Толщина: 0.7мм, цвет: голубой, за м.пог.'),
('Пленка Laguna ПВХ 0.8мм мозаика', 'plenka-laguna-pvh-08-mozaika', 'PL08MZ', 'Декоративная пленка с рисунком мозаики', 1150, 1350, 'Laguna', 18, 4.6, 22, TRUE, '1.5м ширина', 'Пленка ПВХ', 'Толщина: 0.8мм, рисунок: мозаика, за м.пог.'),
('Пленка Laguna ПВХ 1.0мм синяя', 'plenka-laguna-pvh-10-sinyaya', 'PL10BL', 'Прочная пленка ПВХ повышенной толщины', 1450, 1700, 'Laguna', 18, 4.7, 18, TRUE, '1.5м ширина', 'Пленка ПВХ', 'Толщина: 1.0мм, цвет: синий, за м.пог.');

-- Обновляем популярность товаров
UPDATE products SET is_popular = TRUE WHERE rating >= 4.6;
UPDATE products SET is_popular = FALSE WHERE rating < 4.3;