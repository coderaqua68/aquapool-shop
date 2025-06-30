-- Импорт категорий AquaPool
DELETE FROM categories WHERE id > 0;


INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (23, 'Каркасные бассейны', 'karkasnye-basseyny', 'Каркасные бассейны INTEX и Bestway различных размеров', NULL, 1, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (24, 'Морозоустойчивые бассейны', 'morozostojkie-basseyny', 'Морозоустойчивые бассейны премиум класса', NULL, 2, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (26, 'Джакузи INTEX', 'dzjakuzi-intex', 'Джакузи и СПА INTEX с подогревом', NULL, 4, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (27, 'Джакузи Bestway', 'dzjakuzi-bestway', 'Джакузи и СПА Bestway премиум класса', NULL, 5, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (28, 'Запасные чаши', 'zapasnye-chashi', 'Запасные чаши для всех типов бассейнов', NULL, 6, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (38, 'INTEX', 'intex-karkasnye', 'Каркасные бассейны INTEX', 23, 1, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (39, 'Bestway', 'bestway-karkasnye', 'Каркасные бассейны Bestway', 23, 2, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (40, 'Лагуна', 'laguna', 'Морозоустойчивые бассейны Лагуна', 24, 1, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (41, 'Summer Fun', 'summer-fun', 'Морозоустойчивые бассейны Summer Fun', 24, 2, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (42, 'Magic Pool', 'magic-pool', 'Морозоустойчивые бассейны Magic Pool', 24, 3, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (43, 'GRE', 'gre', 'Морозоустойчивые бассейны GRE', 24, 4, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (47, 'Чаши Bestway', 'chashi-bestway', 'Запасные чаши для бассейнов Bestway', 28, 1, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (48, 'Чаши INTEX', 'chashi-intex', 'Запасные чаши для бассейнов INTEX', 28, 2, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (49, 'Чаши Лагуна', 'chashi-laguna', 'Запасные чаши для бассейнов Лагуна', 28, 3, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (50, 'Чаши Azuro', 'chashi-azuro', 'Запасные чаши для бассейнов Azuro', 28, 4, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (51, 'Чаши GRE', 'chashi-gre', 'Запасные чаши для бассейнов GRE', 28, 5, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (52, 'Чаши Atlantic Pool', 'chashi-atlantic-pool', 'Запасные чаши для бассейнов Atlantic Pool', 28, 6, '');
INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES (53, 'Чаши Larimar', 'chashi-larimar', 'Запасные чаши для бассейнов Larimar', 28, 7, '');

SELECT setval('categories_id_seq', 53);

-- Импорт товаров AquaPool
DELETE FROM products WHERE id > 0;


INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (538, 'Запасная пленка к бассейну Larimar 5.49 x 1.4 м, артикул 5187780', 'zapasnaya-plenka-k-basseynu-larimar-5-49-x-1-4-m-artikul-5187780', '5187780', '<h2>Лайнер чашковый пакет Larimar круг 5.49&nbsp;х 1.4 m</h2>
<p>
 Производитель: Larimar (Россия)
</p>
<p>
 <br>
 <b>Технические характеристики:</b>
</p>
<p>
</p>
<ul>
	<li>Применение: Покрытие внутреннее</li>
	<li>
	Предназначение: Для сборного бассейна</li>
	<li>
	Подходящие модели: Larimar, Atlantic Pool, GRE, Azuro.</li>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>
	Длина бассейна: 549 см</li>
	<li>
	Ширина бассейна: 549 см</li>
	<li>
	Глубина: 120 - 132 см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 5.49 x 1.4 • Бренд: Larimar', 20250.00, NULL, NULL, 'Larimar', '[]', '"{\"Бренд\":\"Larimar\",\"Диаметр (м)\":\"5.49\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187780\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.5, 19, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (537, 'Запасная пленка к бассейну Larimar 4.88 x 1.4 м, артикул 5187709', 'zapasnaya-plenka-k-basseynu-larimar-4-88-x-1-4-m-artikul-5187709', '5187709', '<h2>Лайнер чашковый пакет Larimar круг 4.88&nbsp;х 1.4 m</h2>
<p>
 Производитель: Larimar (Россия)
</p>
<p>
 <br>
 <b>Технические характеристики:</b>
</p>
<p>
</p>
<ul>
	<li>Применение: Покрытие внутреннее</li>
	<li>
	Предназначение: Для сборного бассейна</li>
	<li>
	Подходящие модели: Larimar, Atlantic Pool, GRE, Azuro.</li>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>
	Длина бассейна: 488 см</li>
	<li>
	Ширина бассейна: 488 см</li>
	<li>
	Глубина: 120 - 132 см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4.88 x 1.4 • Бренд: Larimar', 24750.00, NULL, NULL, 'Larimar', '[]', '"{\"Бренд\":\"Larimar\",\"Диаметр (м)\":\"4.88\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187709\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.5, 50, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (536, 'Запасная пленка к бассейну Larimar 4.57 x 1.4 м, артикул 5187779', 'zapasnaya-plenka-k-basseynu-larimar-4-57-x-1-4-m-artikul-5187779', '5187779', '<h2>Лайнер чашковый пакет Larimar круг 4.57&nbsp;х 1.4 m</h2>
<p>
 Производитель: Larimar (Россия)
