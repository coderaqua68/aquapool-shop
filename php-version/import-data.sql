-- Импорт категорий AquaPool
DELETE FROM categories WHERE id > 0;
ALTER SEQUENCE categories_id_seq RESTART WITH 1;

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
ALTER SEQUENCE products_id_seq RESTART WITH 1;

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
	Длина бассейна: 457 см</li>
	<li>
	Ширина бассейна: 457 см</li>
	<li>
	Глубина: 120 - 132 см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4.57 x 1.4 • Бренд: Larimar', 14625.00, NULL, NULL, 'Larimar', '[]', '"{\"Бренд\":\"Larimar\",\"Длина (м)\":\"4.57\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187779\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.5, 11, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (535, 'Запасная пленка к бассейну Larimar 3.66 x 1.4 м, артикул 5187778', 'zapasnaya-plenka-k-basseynu-larimar-3-66-x-1-4-m-artikul-5187778', '5187778', '<h2>Лайнер чашковый пакет Larimar круг 3.66&nbsp;х 1.4 m</h2>
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
	Длина бассейна: 366 см</li>
	<li>
	Ширина бассейна: 366 см</li>
	<li>
	Глубина: 120 - 132 см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3.66 x 1.4 • Бренд: Larimar', 11250.00, NULL, NULL, 'Larimar', '[]', '"{\"Бренд\":\"Larimar\",\"Диаметр (м)\":\"3.66\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187778\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.5, 28, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (534, 'Запасная пленка к бассейну Larimar 3.05 x 1.4 м, артикул 5187777', 'zapasnaya-plenka-k-basseynu-larimar-3-05-x-1-4-m-artikul-5187777', '5187777', '<h2>Лайнер чашковый пакет Larimar круг 3.05 х 1.4 m</h2>
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
	Длина бассейна: 305 см</li>
	<li>
	Ширина бассейна: 305 см</li>
	<li>
	Глубина: 120 - 132 см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3.05 x 1.4 • Бренд: Larimar', 10875.00, NULL, NULL, 'Larimar', '[]', '"{\"Бренд\":\"Larimar\",\"Диаметр (м)\":\"3.05\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187777\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Материал чаши\":\"ПВХ\"}"', 4.5, 51, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (533, 'Запасная пленка к бассейну Larimar 2.44 x 1.4 м, артикул 5187776', 'zapasnaya-plenka-k-basseynu-larimar-2-44-x-1-4-m-artikul-5187776', '5187776', '<h2>Лайнер чашковый пакет Larimar круг 2.44&nbsp;х 1.4 m</h2>
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
	Длина бассейна: 244 см</li>
	<li>
	Ширина бассейна: 244&nbsp;см</li>
	<li>
	Глубина: 120 - 132 см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 2.44 x 1.4 • Бренд: Larimar', 8625.00, NULL, NULL, 'Larimar', '[]', '"{\"Бренд\":\"Larimar\",\"Диаметр (м)\":\"2.44\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187776\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.5, 36, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (532, 'Запасная пленка к бассейну Larimar 7.32 x 3.66 x 1.4 м (голубая 0.4 мм), артикул 5187789', 'zapasnaya-plenka-k-basseynu-larimar-7-32-x-3-66-x-1-4-m-golubaya-0-4-mm-artikul-5187789', '5187789', '<h2>Лайнер чашковый пакет Larimar круг 7.32 x 3.66 х 1.4 м</h2>
<p>
 Производитель: Larimar (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Овал</li>
	<li>
	Цвет: Голубой<br>
 </li>
	<li>Длина: 732 см</li>
	<li>Ширина: 366 см<br>
 </li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 7.32 x 3.66 x 1.4 • Бренд: Larimar', 24000.00, NULL, NULL, 'Larimar', '[]', '"{\"Бренд\":\"Larimar\",\"Длина (м)\":\"7.32\",\"Ширина (м)\":\"3.66\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187789\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\"}"', 4.5, 50, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (531, 'Запасная пленка к бассейну Larimar 3,66 х 2,44 х 1.4 м (голубая мозаика 0.4 мм), артикул 5187788', 'zapasnaya-plenka-k-basseynu-larimar-3-66-h-2-44-h-1-4-m-golubaya-mozaika-0-4-mm-artikul-5187788', '5187788', '<h2>Лайнер чашковый пакет Larimar круг&nbsp;<span style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica)); font-size: 14px;">3,66 х 2,44 х 1.4 м</span></h2>
<p>
 Производитель: Larimar (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Овал</li>
	<li>
	Цвет: Голубой мозаика<br>
 </li>
	<li>Длина: 366 см</li>
	<li>Ширина: 244 см<br>
 </li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3.66 x 2.44 x 1.4 • Бренд: Larimar', 9750.00, NULL, NULL, 'Larimar', '[]', '"{\"Бренд\":\"Larimar\",\"Длина (м)\":\"3.66\",\"Ширина (м)\":\"2.44\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187788\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\"}"', 4.5, 49, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (530, 'Запасная пленка к бассейну Atlantic Pool 10 x 5.5 x 1.35 м (0.4 мм) голубая, артикул LI183320', 'zapasnaya-plenka-k-basseynu-atlantic-pool-10-x-5-5-x-1-35-m-0-4-mm-golubaya-artikul-li183320', 'LI183320', '<h2>Чашковый пакет для круглого бассейна Atlantic Pool (10&nbsp;х 5.5&nbsp;х 1.25/1.35)</h2>
<p>
 Предназначен для внутренней облицовки бассейна. Представляет собой водонепроницаемую пленку изготовленную из прочного высококачественного материала. Чашковый пакет является средством гидроизоляции, защищает дно и стенки бассейна от грязи, сохраняет температуру воды и препятствует испарению.
</p>
<p>
 Облицовка бассейна пленкой - это самый простой и экономичный способ внутренней отделки бассейна. Монтаж пленки займет мало времени и не потребует дополнительных расходов на гидроизоляцию. Чашковые пакеты долговечны, устойчивы к механическим воздействиям и ультрафиолетовым лучам, не подвержены гниению. Срок службы пленки составляет около 10 лет.
</p>
 <br>
 Пленка проста в установке и обслуживании: хорошо укладывается на разные материалы (старая плитка, металл, бетон, камень), легко чистится и при необходимости быстро ремонтируется.<br>
<p>
</p>
<p>
 Технические характеристики чашкового пакета для круглого бассейна Atlantic Pool (10&nbsp;х 5.5&nbsp;х 1.25/1.35):
</p>
 <br>
<ul>
	<li>Форма: овальный</li>
	<li>
	Длина: 10&nbsp;м</li>
	<li>Ширина: 5.5&nbsp;м</li>
	<li>
	Глубина: 1.25/1.35 м</li>
	<li>
	Толщина: 0.4 - 0.6 мм</li>
	<li>Цвет - голубой</li>
</ul>', 'Размер: 10 x 5.5 x 1.35 • Бренд: Atlantic Pool', 40500.00, NULL, NULL, 'Atlantic Pool', '[]', '"{\"Бренд\":\"Atlantic Pool\",\"Длина (м)\":\"10\",\"Ширина (м)\":\"5.5\",\"Высота (м)\":\"1.35\",\"Страна-производитель\":\"Канада\",\"Артикул\":\"LI183320\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\"}"', 4.5, 40, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (529, 'Запасная пленка к бассейну Atlantic Pool 7.3 x 1.35 м (0.4 мм) голубая, артикул LI244820', 'zapasnaya-plenka-k-basseynu-atlantic-pool-7-3-x-1-35-m-0-4-mm-golubaya-artikul-li244820', 'LI244820', '<h2>Чашковый пакет для круглого бассейна Atlantic Pool (7.3 х 1.25/1.35)</h2>
<p>
 Предназначен для внутренней облицовки бассейна. Представляет собой водонепроницаемую пленку изготовленную из прочного высококачественного материала. Чашковый пакет является средством гидроизоляции, защищает дно и стенки бассейна от грязи, сохраняет температуру воды и препятствует испарению.
</p>
<p>
 Облицовка бассейна пленкой - это самый простой и экономичный способ внутренней отделки бассейна. Монтаж пленки займет мало времени и не потребует дополнительных расходов на гидроизоляцию. Чашковые пакеты долговечны, устойчивы к механическим воздействиям и ультрафиолетовым лучам, не подвержены гниению. Срок службы пленки составляет около 10 лет.
</p>
 <br>
 Пленка проста в установке и обслуживании: хорошо укладывается на разные материалы (старая плитка, металл, бетон, камень), легко чистится и при необходимости быстро ремонтируется.<br>
<p>
</p>
<p>
 Технические характеристики чашкового пакета для круглого бассейна Atlantic Pool (7.3 х 1.25/1.35):
</p>
 <br>
<ul>
	<li>Форма: круглый</li>
	<li>
	Диаметр: 7.3 м</li>
	<li>
	Глубина: 1.25/1.35 м</li>
	<li>
	Толщина: 0.4 - 0.6 мм</li>
	<li>Цвет - голубой</li>
</ul>', 'Размер: 7.3 x 1.35 • Бренд: Atlantic Pool', 36000.00, NULL, NULL, 'Atlantic Pool', '[]', '"{\"Бренд\":\"Atlantic Pool\",\"Диаметр (м)\":\"7.3\",\"Высота (м)\":\"1.35\",\"Страна-производитель\":\"Канада\",\"Артикул\":\"LI244820\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.5, 21, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (528, 'Запасная пленка к бассейну Atlantic Pool 7.3 x 3.7 x 1.35 м (0.4 мм) голубая, артикул LI122420', 'zapasnaya-plenka-k-basseynu-atlantic-pool-7-3-x-3-7-x-1-35-m-0-4-mm-golubaya-artikul-li122420', 'LI122420', '<h2>Чашковый пакет для круглого бассейна Atlantic Pool (7.3&nbsp;х 3.7 х 1.25/1.35)</h2>
<p>
 Предназначен для внутренней облицовки бассейна. Представляет собой водонепроницаемую пленку изготовленную из прочного высококачественного материала. Чашковый пакет является средством гидроизоляции, защищает дно и стенки бассейна от грязи, сохраняет температуру воды и препятствует испарению.
</p>
<p>
 Облицовка бассейна пленкой - это самый простой и экономичный способ внутренней отделки бассейна. Монтаж пленки займет мало времени и не потребует дополнительных расходов на гидроизоляцию. Чашковые пакеты долговечны, устойчивы к механическим воздействиям и ультрафиолетовым лучам, не подвержены гниению. Срок службы пленки составляет около 10 лет.
</p>
 <br>
 Пленка проста в установке и обслуживании: хорошо укладывается на разные материалы (старая плитка, металл, бетон, камень), легко чистится и при необходимости быстро ремонтируется.<br>
<p>
</p>
<p>
 Технические характеристики чашкового пакета для круглого бассейна Atlantic Pool (7.3&nbsp;х 3.7 х 1.25/1.35):
</p>
 <br>
<ul>
	<li>Форма: овальный</li>
	<li>
	Длина: 7.3&nbsp;м</li>
	<li>Ширина: 3.7 м</li>
	<li>
	Глубина: 1.25/1.35 м</li>
	<li>
	Толщина: 0.4 - 0.6 мм</li>
	<li>Цвет - голубой</li>
</ul>', 'Размер: 7.3 x 3.7 x 1.35 • Бренд: Atlantic Pool', 33750.00, NULL, NULL, 'Atlantic Pool', '[]', '"{\"Бренд\":\"Atlantic Pool\",\"Длина (м)\":\"7.3\",\"Ширина (м)\":\"3.7\",\"Высота (м)\":\"1.35\",\"Страна-производитель\":\"Канада\",\"Артикул\":\"LI122420\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\"}"', 4.5, 10, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (527, 'Запасная пленка к бассейну Atlantic Pool 5.5 x 3.7 x 1.35 м (0.4 мм) голубая, артикул LI121820', 'zapasnaya-plenka-k-basseynu-atlantic-pool-5-5-x-3-7-x-1-35-m-0-4-mm-golubaya-artikul-li121820', 'LI121820', '<h2>Чашковый пакет для круглого бассейна Atlantic Pool (5.5 х 3.7 х 1.25/1.35)</h2>
<p>
 Предназначен для внутренней облицовки бассейна. Представляет собой водонепроницаемую пленку изготовленную из прочного высококачественного материала. Чашковый пакет является средством гидроизоляции, защищает дно и стенки бассейна от грязи, сохраняет температуру воды и препятствует испарению.
</p>
<p>
 Облицовка бассейна пленкой - это самый простой и экономичный способ внутренней отделки бассейна. Монтаж пленки займет мало времени и не потребует дополнительных расходов на гидроизоляцию. Чашковые пакеты долговечны, устойчивы к механическим воздействиям и ультрафиолетовым лучам, не подвержены гниению. Срок службы пленки составляет около 10 лет.
</p>
 <br>
 Пленка проста в установке и обслуживании: хорошо укладывается на разные материалы (старая плитка, металл, бетон, камень), легко чистится и при необходимости быстро ремонтируется.<br>
<p>
</p>
<p>
 Технические характеристики чашкового пакета для круглого бассейна Atlantic Pool (5.5 х 3.7 х 1.25/1.35):
</p>
 <br>
<ul>
	<li>Форма: овальный</li>
	<li>
	Длина: 5.5 м</li>
	<li>Ширина: 3.7 м</li>
	<li>
	Глубина: 1.25/1.35 м</li>
	<li>
	Толщина: 0.4 - 0.6 мм</li>
	<li>Цвет - голубой</li>
</ul>', 'Размер: 5.5 x 3.7 x 1.35 • Бренд: Atlantic Pool', 30750.00, NULL, NULL, 'Atlantic Pool', '[]', '"{\"Бренд\":\"Atlantic Pool\",\"Длина (м)\":\"5.5\",\"Ширина (м)\":\"3.7\",\"Высота (м)\":\"1.35\",\"Страна-производитель\":\"Канада\",\"Артикул\":\"LI121820\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\"}"', 4.5, 57, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (526, 'Запасная пленка к бассейну Atlantic Pool 5.5 x 1.35 м (0.4 мм) голубая, артикул LI184820', 'zapasnaya-plenka-k-basseynu-atlantic-pool-5-5-x-1-35-m-0-4-mm-golubaya-artikul-li184820', 'LI184820', '<h2>Чашковый пакет для круглого бассейна Atlantic Pool (5.5&nbsp;х 1.25/1.35)</h2>
<p>
 Предназначен для внутренней облицовки бассейна. Представляет собой водонепроницаемую пленку изготовленную из прочного высококачественного материала. Чашковый пакет является средством гидроизоляции, защищает дно и стенки бассейна от грязи, сохраняет температуру воды и препятствует испарению.
</p>
<p>
 Облицовка бассейна пленкой - это самый простой и экономичный способ внутренней отделки бассейна. Монтаж пленки займет мало времени и не потребует дополнительных расходов на гидроизоляцию. Чашковые пакеты долговечны, устойчивы к механическим воздействиям и ультрафиолетовым лучам, не подвержены гниению. Срок службы пленки составляет около 10 лет.
</p>
 <br>
 Пленка проста в установке и обслуживании: хорошо укладывается на разные материалы (старая плитка, металл, бетон, камень), легко чистится и при необходимости быстро ремонтируется.<br>
<p>
</p>
<p>
 Технические характеристики чашкового пакета для круглого бассейна Atlantic Pool (5.5&nbsp;х 1.25/1.35):
</p>
 <br>
<ul>
	<li>Форма: круглый</li>
	<li>
	Диаметр: 5.5&nbsp;м</li>
	<li>
	Глубина: 1.25/1.35 м</li>
	<li>
	Толщина: 0.4 - 0.6 мм</li>
	<li>Цвет - голубой</li>
</ul>', 'Размер: 5.5 x 1.35 • Бренд: Atlantic Pool', 27000.00, NULL, NULL, 'Atlantic Pool', '[]', '"{\"Бренд\":\"Atlantic Pool\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.35\",\"Страна-производитель\":\"Канада\",\"Артикул\":\"LI184820\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.7, 47, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (525, 'Запасная пленка к бассейну Atlantic Pool 4.6 x 1.32 м (0.4 мм) голубая, артикул LI154820', 'zapasnaya-plenka-k-basseynu-atlantic-pool-4-6-x-1-32-m-0-4-mm-golubaya-artikul-li154820', 'LI154820', '<h2>Чашковый пакет для круглого бассейна Atlantic Pool (4.6 х 1.25/1.35)</h2>
<p>
 Предназначен для внутренней облицовки бассейна. Представляет собой водонепроницаемую пленку изготовленную из прочного высококачественного материала. Чашковый пакет является средством гидроизоляции, защищает дно и стенки бассейна от грязи, сохраняет температуру воды и препятствует испарению.
</p>
<p>
 Облицовка бассейна пленкой - это самый простой и экономичный способ внутренней отделки бассейна. Монтаж пленки займет мало времени и не потребует дополнительных расходов на гидроизоляцию. Чашковые пакеты долговечны, устойчивы к механическим воздействиям и ультрафиолетовым лучам, не подвержены гниению. Срок службы пленки составляет около 10 лет.
</p>
 <br>
 Пленка проста в установке и обслуживании: хорошо укладывается на разные материалы (старая плитка, металл, бетон, камень), легко чистится и при необходимости быстро ремонтируется.<br>
<p>
</p>
<p>
 Технические характеристики чашкового пакета для круглого бассейна Atlantic Pool (4.6 х 1.25/1.35):
</p>
 <br>
<ul>
	<li>Форма: круглый</li>
	<li>
	Диаметр: 4.6 м</li>
	<li>
	Глубина: 1.25/1.35 м</li>
	<li>
	Толщина: 0.4 - 0.6 мм</li>
	<li>Цвет - голубой</li>
</ul>', 'Размер: 4.6 x 1.32 • Бренд: Atlantic Pool', 24000.00, NULL, NULL, 'Atlantic Pool', '[]', '"{\"Бренд\":\"Atlantic Pool\",\"Диаметр (м)\":\"4.6\",\"Высота (м)\":\"1.35\",\"Страна-производитель\":\"Канада\",\"Артикул\":\"LI154820\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Материал чаши\":\"ПВХ\"}"', 4.1, 30, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (524, 'Запасная пленка к бассейну Atlantic Pool 3.6 x 1.35 м (0.4 мм) голубая, артикул LI124820', 'zapasnaya-plenka-k-basseynu-atlantic-pool-3-6-x-1-35-m-0-4-mm-golubaya-artikul-li124820', 'LI124820', '<h2>Чашковый пакет для круглого бассейна Atlantic Pool (3.6 х 1.25/1.35)</h2>
<p>
 Предназначен для внутренней облицовки бассейна. Представляет собой водонепроницаемую пленку изготовленную из прочного высококачественного материала. Чашковый пакет является средством гидроизоляции, защищает дно и стенки бассейна от грязи, сохраняет температуру воды и препятствует испарению.
</p>
<p>
 Облицовка бассейна пленкой - это самый простой и экономичный способ внутренней отделки бассейна. Монтаж пленки займет мало времени и не потребует дополнительных расходов на гидроизоляцию. Чашковые пакеты долговечны, устойчивы к механическим воздействиям и ультрафиолетовым лучам, не подвержены гниению. Срок службы пленки составляет около 10 лет.
</p>
 <br>
 Пленка проста в установке и обслуживании: хорошо укладывается на разные материалы (старая плитка, металл, бетон, камень), легко чистится и при необходимости быстро ремонтируется.<br>
<p>
</p>
<p>
 Технические характеристики чашкового пакета для круглого бассейна Atlantic Pool (3.6 х 1.25/1.35):
</p>
 <br>
<ul>
	<li>Форма: круглый</li>
	<li>
	Диаметр: 3.6 м</li>
	<li>
	Глубина: 1.25/1.35 м</li>
	<li>
	Толщина: 0.4 - 0.6 мм</li>
	<li>Цвет - голубой</li>
</ul>', 'Размер: 3.6 x 1.35 • Бренд: Atlantic Pool', 20250.00, NULL, NULL, 'Atlantic Pool', '[]', '"{\"Бренд\":\"Atlantic Pool\",\"Диаметр (м)\":\"3.6\",\"Высота (м)\":\"1.35\",\"Страна-производитель\":\"Канада\",\"Артикул\":\"LI124820\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.8, 42, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (523, 'Запасная пленка к бассейну GRE 6.1 x 3.75 x 1.32, артикул FPROV618', 'zapasnaya-plenka-k-basseynu-gre-6-1-x-3-75-x-1-32-artikul-fprov618', 'FPROV618', '<p>
 Внутреннее покрытие предназначена для отделки и гидроизоляции бассейна GRE 6,1 х 3,75 х 1,32.
</p>
<p>ВНИМАНИЕ: Установка чашкового пакета возможна только при температуре не ниже 15°C !!!</p>', 'Размер: 6.1 x 3.75 x 1.32 • Бренд: GRE', 30750.00, NULL, NULL, 'GRE', '[]', '"{\"Бренд\":\"GRE\",\"Длина (м)\":\"6.1\",\"Ширина (м)\":\"3.75\",\"Высота (м)\":\"1.32\",\"Страна-производитель\":\"Испания\",\"Артикул\":\"FPROV618\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Материал чаши\":\"ПВХ\"}"', 4.4, 57, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (522, 'Запасная пленка к бассейну GRE 5.0 x 3.0 x 1.32, артикул FPROV518', 'zapasnaya-plenka-k-basseynu-gre-5-0-x-3-0-x-1-32-artikul-fprov518', 'FPROV518', '<p>
 Внутреннее покрытие предназначена для отделки и гидроизоляции бассейна GRE 5,0 х 3,0 х 1,32
</p>
<p>
 ВНИМАНИЕ: Установка чашкового пакета возможна только при температуре не ниже 15°C !!!
</p>', 'Размер: 5.0 x 3.0 x 1.32 • Бренд: GRE', 20250.00, NULL, NULL, 'GRE', '[]', '"{\"Бренд\":\"GRE\",\"Длина (м)\":\"5\",\"Ширина (м)\":\"3\",\"Высота (м)\":\"1.32\",\"Страна-производитель\":\"Испания\",\"Артикул\":\"FPROV518\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\"}"', 4.5, 26, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (521, 'Запасная пленка к бассейну GRE 7.3 x 3.75 x 1.32, артикул FPROV738', 'zapasnaya-plenka-k-basseynu-gre-7-3-x-3-75-x-1-32-artikul-fprov738', 'FPROV738', '<p>
 Внутреннее покрытие предназначена для отделки и гидроизоляции бассейна GRE 7,3 х 3,75 х 1,32.
</p>
<p>
	ВНИМАНИЕ: Установка чашкового пакета возможна только при температуре не ниже 15°C !!!
</p>', 'Размер: 7.3 x 3.75 x 1.32 • Бренд: GRE', 33750.00, NULL, NULL, 'GRE', '[]', '"{\"Бренд\":\"GRE\",\"Длина (м)\":\"7.3\",\"Ширина (м)\":\"3.75\",\"Высота (м)\":\"1.32\",\"Страна-производитель\":\"Испания\",\"Артикул\":\"FPROV738\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\"}"', 4.2, 51, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (520, 'Запасная пленка к бассейну GRE 3.5 x 1.32, артикул FPR358', 'zapasnaya-plenka-k-basseynu-gre-3-5-x-1-32-artikul-fpr358', 'FPR358', '<p>
 Внутреннее покрытие предназначена для отделки и гидроизоляции бассейна GRE 3,5 х 1,32.
</p>
<p>ВНИМАНИЕ: Установка чашкового пакета возможна только при температуре не ниже 15°C !!!</p>', 'Размер: 3.5 x 1.32 • Бренд: GRE', 21000.00, NULL, NULL, 'GRE', '[]', '"{\"Бренд\":\"GRE\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.32\",\"Страна-производитель\":\"Испания\",\"Артикул\":\"FPR358\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.8, 46, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (519, 'Запасная пленка к бассейну GRE 4.6 x 1.32, артикул FPR458', 'zapasnaya-plenka-k-basseynu-gre-4-6-x-1-32-artikul-fpr458', 'FPR458', '<p>
 Внутреннее покрытие предназначена для отделки и гидроизоляции бассейна GRE 4,6 х 1,32.
</p>
<p>ВНИМАНИЕ: Установка чашкового пакета возможна только при температуре не ниже 15°C !!!</p>', 'Размер: 4.6 x 1.32 • Бренд: GRE', 28500.00, NULL, NULL, 'GRE', '[]', '"{\"Бренд\":\"GRE\",\"Диаметр (м)\":\"4.6\",\"Высота (м)\":\"1.32\",\"Страна-производитель\":\"Испания\",\"Артикул\":\"FPR458\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.5, 16, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (518, 'Запасная пленка к бассейну GRE 5.5 x 1.32, артикул FPR558', 'zapasnaya-plenka-k-basseynu-gre-5-5-x-1-32-artikul-fpr558', 'FPR558', '<p>
 Внутреннее покрытие предназначена для отделки и гидроизоляции бассейна GRE 3,5 х 1,32.
</p>
<p>
 <strong><span style="color:#ff0000;">ВНИМАНИЕ : </span></strong><span display:="" float:="" font-size:="" font-style:="" font-variant:="" font-weight:="" inline="" letter-spacing:="" line-height:="" pt="" style="color: #333333; font-family: " text-align:="" text-indent:="" text-transform:="" white-space:="" word-spacing:="">Установка чашкового пакета возможна только при температуре не ниже 15°C !!!</span>
</p>', 'Размер: 5.5 x 1.32 • Бренд: GRE', 42000.00, NULL, NULL, 'GRE', '[]', '"{\"Бренд\":\"GRE\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.32\",\"Страна-производитель\":\"Испания\",\"Артикул\":\"FPR558\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 5.0, 32, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (517, 'Запасная пленка к бассейну Azuro 5.5 x 1.4 м, артикул 3BPZ0270 (Mistry/Galaxy 0.35 мм)', 'zapasnaya-plenka-k-basseynu-azuro-5-5-x-1-4-m-artikul-3bpz0270-mistry-galaxy-0-35-mm', '3BPZ0270', '<h2>Внутреннее покрытие (чашковый пакет) для Azuro 5.5 x 1.2 м, толщина пленки 0.5 мм, рисунок Mistry/Galaxy</h2>
<p>
 Технические характеристики:
</p>
 <br>
<ul>
	<li>Применение: Покрытие внутреннее</li>
	<li>Предназначение: Для морозоустойчивого бассейна</li>
	<li>Подходящие модели: Mountfield Azuro 403 / Mountfield Galaxy 103</li>
</ul>
 <br>
<p>
 Внешний вид:
</p>
 <br>
<ul>
	<li>Форма: Круг</li>
	<li>Цвет: Mistry/Galaxy</li>
	<li>Длина бассейна: 550 см</li>
	<li>Ширина бассейна: 550 см</li>
	<li>Глубина бассейна: 120 см (140 см пленка)</li>
	<li>Толщина пленки: 0.35 мм</li>
	<li>Материал: ПВХ</li>
</ul>
 <br>
<p>
	Чашковый пакет представляет собой цельную пленку, используемую в качестве запасного верхнего покрытия чаши бассейна. Пленка изготовлена из ПВХ, имеет оптимальную толщину, позволяющую надежно защитить чашу бассейна от механических воздействий, тем самым увеличивая срок службы. Пленка имеет удивительную цветовую картину мистры, обладающую изумительным солнце-отражающим эффектом. Размеры данного пакета идеально подходят для бассейнов Azuro 403 и Galaxy 103.
</p>', 'Размер: 5.5 x 1.4 • Бренд: Azuro', 21000.00, NULL, NULL, 'Azuro', '[]', '"{\"Бренд\":\"Azuro\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Чехия\",\"Материал\":\"ПВХ\",\"Артикул\":\"3BPZ0270\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.9, 41, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (516, 'Запасная пленка к бассейну Azuro 3.66 x 1.4 м, артикул 3EXX0520 (Mistry/Galaxy 0.25 мм)', 'zapasnaya-plenka-k-basseynu-azuro-3-66-x-1-4-m-artikul-3exx0520-mistry-galaxy-0-25-mm', '3EXX0520', '<h2>Внутреннее покрытие (чашковый пакет) для Azuro 3.6 x 1.2 м, толщина пленки 0.25 мм, рисунок Mistry/Galaxy</h2>
<p>
 Технические характеристики:
</p>
 <br>
<ul>
	<li>Применение: Покрытие внутреннее</li>
	<li>Предназначение: Для морозоустойчивого бассейна</li>
	<li>Подходящие модели: Mountfield Azuro 300A / Mountfield Azuro 360</li>
</ul>
 <br>
<p>
 Внешний вид:
</p>
 <br>
<ul>
	<li>Форма: Круг</li>
	<li>Цвет: Mistry/Galaxy</li>
	<li>Длина бассейна: 360 см</li>
	<li>Ширина бассейна: 360 см</li>
	<li>Глубина бассейна: 120 см (140 см пленка)</li>
	<li>Толщина пленки: 0.25 мм</li>
	<li>Материал: ПВХ</li>
</ul>
 <br>
<p>
 Чашковый пакет представляет собой цельную пленку, используемую в качестве запасного верхнего покрытия чаши бассейна. Пленка изготовлена из ПВХ, имеет оптимальную толщину, позволяющую надежно защитить чашу бассейна от механических воздействий, тем самым увеличивая срок службы. Пленка имеет удивительную цветовую картину мистры, обладающую изумительным солнце-отражающим эффектом. Размеры данного пакета идеально подходят для бассейнов Azuro 300A и 306.
</p>', 'Размер: 3.66 x 1.4 • Бренд: Azuro', 13500.00, NULL, NULL, 'Azuro', '[]', '"{\"Бренд\":\"Azuro\",\"Диаметр (м)\":\"3.66\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Чехия\",\"Материал\":\"ПВХ\",\"Артикул\":\"3EXX0520\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.7, 14, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (515, 'Запасная пленка к бассейну Azuro 5 x 1.4 м, артикул 3EXX0282 (Голубая 0.5 мм)', 'zapasnaya-plenka-k-basseynu-azuro-5-x-1-4-m-artikul-3exx0282-golubaya-0-5-mm', '3EXX0282', '<h2>Внутреннее покрытие (чашковый пакет) для Azuro 5 x 1.2 м, толщина пленки 0.5 мм, голубая</h2>
<p>
 Технические характеристики:
</p>
 <br>
<ul>
	<li>Применение: Покрытие внутреннее</li>
	<li>Предназначение: Для морозоустойчивого бассейна</li>
	<li>Подходящие модели: Mountfield Azuro Stone 5.5 x 1.2 / Mountfield Azuro Rattan 5.5 x 1.2</li>
</ul>
 <br>
<p>
 Внешний вид:
</p>
 <br>
<ul>
	<li>Форма: Круг</li>
	<li>Цвет: Голубой</li>
	<li>Длина бассейна: 500 см</li>
	<li>Ширина бассейна: 500 см</li>
	<li>Глубина бассейна: 120 см (140 см пленка)</li>
	<li>Толщина пленки: 0.5 мм</li>
	<li>Материал: ПВХ</li>
</ul>
 <br>
<p>
 Чашковый пакет представляет собой цельную пленку, используемую в качестве запасного верхнего покрытия чаши бассейна. Пленка изготовлена из ПВХ, имеет оптимальную толщину, позволяющую надежно защитить чашу бассейна от механических воздействий, тем самым увеличивая срок службы. Пленка имеет привычный голубой цвет, являющийся классическим для большинства бассейнов. Размеры данного пакета идеально подходят для бассейнов Azuro Stone и Azuro Rattan.
</p>', 'Размер: 5 x 1.4 • Бренд: Azuro', 18750.00, NULL, NULL, 'Azuro', '[]', '"{\"Бренд\":\"Azuro\",\"Диаметр (м)\":\"5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Чехия\",\"Материал\":\"ПВХ\",\"Артикул\":\"3EXX0282\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.1, 49, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (514, 'Запасная пленка к бассейну Azuro 4 x 1.4 м, артикул 3EXX0279 (Голубая 0.5 мм)', 'zapasnaya-plenka-k-basseynu-azuro-4-x-1-4-m-artikul-3exx0279-golubaya-0-5-mm', '3EXX0279', '<h2>Внутреннее покрытие (чашковый пакет) для Azuro 4&nbsp;x 1.2 м, толщина пленки 0.5&nbsp;мм, голубая</h2>
<p>
 Технические характеристики:
</p>
 <br>
<ul>
	<li>Применение: Покрытие внутреннее</li>
	<li>Предназначение: Для морозоустойчивого бассейна</li>
	<li>Подходящие модели:&nbsp;Mountfield Azuro Stone 4 x 1.2 / Mountfield Azuro Rattan 4 x 1.2</li>
</ul>
 <br>
<p>
 Внешний вид:
</p>
 <br>
<ul>
	<li>Форма: Круг</li>
	<li>Цвет: Голубой</li>
	<li>Длина бассейна: 400 см</li>
	<li>Ширина бассейна: 400 см</li>
	<li>Глубина бассейна: 120 см (140 см пленка)</li>
	<li>Толщина пленки: 0.5 мм</li>
	<li>Материал: ПВХ</li>
</ul>
 <br>
<p>
 Чашковый пакет представляет собой цельную пленку, используемую в качестве запасного верхнего покрытия чаши бассейна. Пленка изготовлена из ПВХ, имеет оптимальную толщину, позволяющую надежно защитить чашу бассейна от механических воздействий, тем самым увеличивая срок службы. Пленка имеет привычный голубой цвет, являющийся классическим для большинства бассейнов. Размеры данного пакета идеально подходят для бассейнов Azuro Stone и Azuro Rattan.
</p>', 'Размер: 4 x 1.4 • Бренд: Azuro', 15000.00, NULL, NULL, 'Azuro', '[]', '"{\"Бренд\":\"Azuro\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Чехия\",\"Материал\":\"ПВХ\",\"Артикул\":\"3EXX0279\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.8, 20, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (513, 'Запасная пленка к бассейну Лагуна 3 x 1.4 м (голубая 0.4 мм), артикул 5187982', 'zapasnaya-plenka-k-basseynu-laguna-3-x-1-4-m-golubaya-0-4-mm-artikul-5187982', '5187982', '<h2>Лайнер чашковый пакет Лагуна круг 3&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 300 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3 x 1.4 • Бренд: Лагуна', 14625.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187982\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.9, 21, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (512, 'Запасная пленка к бассейну Лагуна 3.5 x 1.4 м (мрамор 0.6 мм), артикул 5187989', 'zapasnaya-plenka-k-basseynu-laguna-3-5-x-1-4-m-mramor-0-6-mm-artikul-5187989', '5187989', '<h2>Лайнер чашковый пакет Лагуна круг 3.5 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 350 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3.5 x 1.4 • Бренд: Лагуна', 21375.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187989\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.0, 43, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (511, 'Запасная пленка к бассейну Лагуна 3.5 x 1.4 м (мрамор 0.4 мм), артикул 5187987', 'zapasnaya-plenka-k-basseynu-laguna-3-5-x-1-4-m-mramor-0-4-mm-artikul-5187987', '5187987', '<h2>Лайнер чашковый пакет Лагуна круг 3.5 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 350 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3.5 x 1.4 • Бренд: Лагуна', 15750.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187987\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.4, 22, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (510, 'Запасная пленка к бассейну Лагуна 3.66 x 1.4 м (голубая 0.4 мм), артикул 5181830', 'zapasnaya-plenka-k-basseynu-laguna-3-66-x-1-4-m-golubaya-0-4-mm-artikul-5181830', '5181830', '<h2>Лайнер чашковый пакет Лагуна круг 3.66&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 366&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3.66 x 1.4 • Бренд: Лагуна', 15750.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.66\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5181830\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.0, 3, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (509, 'Запасная пленка к бассейну Лагуна 4 x 1.4 м (голубая 0.6 мм), артикул 5187992', 'zapasnaya-plenka-k-basseynu-laguna-4-x-1-4-m-golubaya-0-6-mm-artikul-5187992', '5187992', '<h2>Лайнер чашковый пакет Лагуна круг 4&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 400 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4 x 1.4 • Бренд: Лагуна', 24750.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187992\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.4, 26, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (508, 'Запасная пленка к бассейну Лагуна 4 x 1.4 м (голубая 0.4 мм), артикул 5187990', 'zapasnaya-plenka-k-basseynu-laguna-4-x-1-4-m-golubaya-0-4-mm-artikul-5187990', '5187990', '<h2>Лайнер чашковый пакет Лагуна круг 4&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 400 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4 x 1.4 • Бренд: Лагуна', 18000.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187990\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.3, 17, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (507, 'Запасная пленка к бассейну Лагуна 4 x 1.4 м (мрамор 0.6 мм), артикул 5187993', 'zapasnaya-plenka-k-basseynu-laguna-4-x-1-4-m-mramor-0-6-mm-artikul-5187993', '5187993', '<h2>Лайнер чашковый пакет Лагуна круг 4&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 400 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4 x 1.4 • Бренд: Лагуна', 24750.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187993\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.4, 13, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (506, 'Запасная пленка к бассейну Лагуна 4 x 1.4 м (мрамор 0.4 мм), артикул 5187991', 'zapasnaya-plenka-k-basseynu-laguna-4-x-1-4-m-mramor-0-4-mm-artikul-5187991', '5187991', '<h2>Лайнер чашковый пакет Лагуна круг 4&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 400 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4 x 1.4 • Бренд: Лагуна', 18000.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187991\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.0, 21, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (505, 'Запасная пленка к бассейну Лагуна 4.5 x 1.4 м (голубая 0.6 мм), артикул 5187996', 'zapasnaya-plenka-k-basseynu-laguna-4-5-x-1-4-m-golubaya-0-6-mm-artikul-5187996', '5187996', '<h2>Лайнер чашковый пакет Лагуна круг 4.5 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 450 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4.5 x 1.4 • Бренд: Лагуна', 30000.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187996\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.9, 64, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (504, 'Запасная пленка к бассейну Лагуна 4.5 x 1.4 м (мрамор 0.4 мм), артикул 5187994', 'zapasnaya-plenka-k-basseynu-laguna-4-5-x-1-4-m-mramor-0-4-mm-artikul-5187994', '5187994', '<h2>Лайнер чашковый пакет Лагуна круг 4.5 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 450&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4.5 x 1.4 • Бренд: Лагуна', 21375.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187994\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.7, 32, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (503, 'Запасная пленка к бассейну Лагуна 4.57 x 1.4 м (голубая 0.6 мм), артикул 5187845', 'zapasnaya-plenka-k-basseynu-laguna-4-57-x-1-4-m-golubaya-0-6-mm-artikul-5187845', '5187845', '<h2>Лайнер чашковый пакет Лагуна круг 4.57 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 457&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4.57 x 1.4 • Бренд: Лагуна', 30000.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.57\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187845\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.1, 33, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (502, 'Запасная пленка к бассейну Лагуна 4.57 x 1.4 м (голубая 0.4 мм), артикул 5187839', 'zapasnaya-plenka-k-basseynu-laguna-4-57-x-1-4-m-golubaya-0-4-mm-artikul-5187839', '5187839', '<h2>Лайнер чашковый пакет Лагуна круг 4.57 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 457&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4.57 x 1.4 • Бренд: Лагуна', 21375.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.57\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187839\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.4, 21, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (501, 'Запасная пленка к бассейну Лагуна 5 x 1.4 м (голубая 0.4 мм), артикул 5187999', 'zapasnaya-plenka-k-basseynu-laguna-5-x-1-4-m-golubaya-0-4-mm-artikul-5187999', '5187999', '<h2>Лайнер чашковый пакет Лагуна круг 5&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 500&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 5 x 1.4 • Бренд: Лагуна', 24750.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187999\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.9, 29, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (500, 'Запасная пленка к бассейну Лагуна 3.0 x 1.4 м (голубая 0.6 мм), артикул 5187985', 'zapasnaya-plenka-k-basseynu-laguna-3-0-x-1-4-m-golubaya-0-6-mm-artikul-5187985', '5187985', '<h2>Лайнер чашковый пакет Лагуна круг 3.0 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 300 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3.0 x 1.4 • Бренд: Лагуна', 18750.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187985\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.6, 3, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (499, 'Запасная пленка к бассейну Лагуна 3.66 x 1.4 м (голубая 0.6 мм), артикул 5187844', 'zapasnaya-plenka-k-basseynu-laguna-3-66-x-1-4-m-golubaya-0-6-mm-artikul-5187844', '5187844', '<h2>Лайнер чашковый пакет Лагуна круг 3.66 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 366 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3.66 x 1.4 • Бренд: Лагуна', 21375.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.66\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187844\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.7, 59, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (498, 'Запасная пленка к бассейну Лагуна 5.0 x 1.4 м (голубая 0.6 мм), артикул 5188000', 'zapasnaya-plenka-k-basseynu-laguna-5-0-x-1-4-m-golubaya-0-6-mm-artikul-5188000', '5188000', '<h2>Лайнер чашковый пакет Лагуна круг 5.0 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 500&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 5.0 x 1.4 • Бренд: Лагуна', 34500.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5188000\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.5, 51, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (497, 'Запасная пленка к бассейну Лагуна 5.0 x 3.0 x 1.4 м (голубая 0.6 мм), артикул 5188021', 'zapasnaya-plenka-k-basseynu-laguna-5-0-x-3-0-x-1-4-m-golubaya-0-6-mm-artikul-5188021', '5188021', '<h2>Лайнер чашковый пакет Лагуна круг 5.0 x 3.0 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Овал</li>
	<li>
	Цвет: Голубой</li>
	<li>Длина: 500 см</li>
	<li>Ширина: 300 см<br>
 </li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 5.0 x 3.0 x 1.4 • Бренд: Лагуна', 27000.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"5\",\"Ширина (м)\":\"3\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5188021\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.0, 56, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (496, 'Запасная пленка к бассейну Лагуна 5.5 x 1.4 м (голубая 0.6 мм), артикул 5188004', 'zapasnaya-plenka-k-basseynu-laguna-5-5-x-1-4-m-golubaya-0-6-mm-artikul-5188004', '5188004', '<h2>Лайнер чашковый пакет Лагуна круг 5.5&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 550&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 5.5 x 1.4 • Бренд: Лагуна', 39375.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5188004\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.6, 32, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (495, 'Запасная пленка к бассейну Лагуна 4.5 x 1.4 м (мрамор 0.6 мм), артикул 5187997', 'zapasnaya-plenka-k-basseynu-laguna-4-5-x-1-4-m-mramor-0-6-mm-artikul-5187997', '5187997', '<h2>Лайнер чашковый пакет Лагуна круг 4.5&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 450&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4.5 x 1.4 • Бренд: Лагуна', 30000.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187997\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.2, 26, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (494, 'Запасная пленка к бассейну Лагуна 2.44 x 1.4 м (голубая 0.4 мм), артикул 5187935', 'zapasnaya-plenka-k-basseynu-laguna-2-44-x-1-4-m-golubaya-0-4-mm-artikul-5187935', '5187935', '<h2>Лайнер чашковый пакет Лагуна круг 2.44 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 244 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 2.44 x 1.4 • Бренд: Лагуна', 8625.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"2.44\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187935\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.3, 46, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (493, 'Запасная пленка к бассейну Лагуна 2.44 x 1.4 м (мрамор 0.4 мм), артикул 5187848', 'zapasnaya-plenka-k-basseynu-laguna-2-44-x-1-4-m-mramor-0-4-mm-artikul-5187848', '5187848', '<h2>Лайнер чашковый пакет Лагуна круг 2.44 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 244 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 2.44 x 1.4 • Бренд: Лагуна', 8625.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"2.44\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187848\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.0, 31, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (492, 'Запасная пленка к бассейну Лагуна 2.5 x 1.4 м (голубая 0.4 мм), артикул 5187978', 'zapasnaya-plenka-k-basseynu-laguna-2-5-x-1-4-m-golubaya-0-4-mm-artikul-5187978', '5187978', '<h2>Лайнер чашковый пакет Лагуна круг 2.5&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 255 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 2.5 x 1.4 • Бренд: Лагуна', 8625.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"2.5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187978\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.0, 43, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (491, 'Запасная пленка к бассейну Лагуна 2.5 x 1.4 м (мрамор 0.4 мм), артикул 5187979', 'zapasnaya-plenka-k-basseynu-laguna-2-5-x-1-4-m-mramor-0-4-mm-artikul-5187979', '5187979', '<h2>Лайнер чашковый пакет Лагуна круг 2.5&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 250 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 2.5 x 1.4 • Бренд: Лагуна', 8625.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"2.5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187979\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.9, 4, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (490, 'Запасная пленка к бассейну Гигабасс 3 x 1.65 м (голубая 0.6 мм), артикул 5187892', 'zapasnaya-plenka-k-basseynu-gigabass-3-x-1-65-m-golubaya-0-6-mm-artikul-5187892', '5187892', '<h2>Лайнер чашковый пакет Гигабасс круг 3&nbsp;х 1.65 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 300 см</li>
	<li>
	Высота: 165 см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3 x 1.65 • Бренд: Лагуна', 21375.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.65\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187892\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.7, 26, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (489, 'Запасная пленка к бассейну Лагуна 3 x 1.4 м (мрамор 0.4 мм), артикул 5187983', 'zapasnaya-plenka-k-basseynu-laguna-3-x-1-4-m-mramor-0-4-mm-artikul-5187983', '5187983', '<h2>Лайнер чашковый пакет Лагуна круг 3&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 300 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3 x 1.4 • Бренд: Лагуна', 14625.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187983\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.0, 39, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (488, 'Запасная пленка к бассейну Лагуна 3.05 x 1.4 м (голубая 0.6 мм), артикул 5187931', 'zapasnaya-plenka-k-basseynu-laguna-3-05-x-1-4-m-golubaya-0-6-mm-artikul-5187931', '5187931', '<h2>Лайнер чашковый пакет Лагуна круг 3.05 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 305&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3.05 x 1.4 • Бренд: Лагуна', 18750.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.05\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187931\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.9, 28, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (487, 'Запасная пленка к бассейну Лагуна 3.05 x 1.4 м (голубая 0.4 мм), артикул 5149958', 'zapasnaya-plenka-k-basseynu-laguna-3-05-x-1-4-m-golubaya-0-4-mm-artikul-5149958', '5149958', '<h2>Лайнер чашковый пакет Лагуна круг 3.05 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 305&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3.05 x 1.4 • Бренд: Лагуна', 14625.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.05\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5149958\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.8, 27, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (486, 'Запасная пленка к бассейну Лагуна 3.05 x 1.4 м (мрамор 0.4 мм), артикул 5187849', 'zapasnaya-plenka-k-basseynu-laguna-3-05-x-1-4-m-mramor-0-4-mm-artikul-5187849', '5187849', '<h2>Лайнер чашковый пакет Лагуна круг 3.05 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 305&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3.05 x 1.4 • Бренд: Лагуна', 14625.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.05\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187849\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.1, 57, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (485, 'Запасная пленка к бассейну Лагуна 3.5 x 1.4 м (голубая 0.6 мм), артикул 5187988', 'zapasnaya-plenka-k-basseynu-laguna-3-5-x-1-4-m-golubaya-0-6-mm-artikul-5187988', '5187988', '<h2>Лайнер чашковый пакет Лагуна круг 3.5 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 350 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3.5 x 1.4 • Бренд: Лагуна', 21375.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187988\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.3, 17, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (484, 'Запасная пленка к бассейну Лагуна 3.5 x 1.4 м (голубая 0.4 мм), артикул 5187986', 'zapasnaya-plenka-k-basseynu-laguna-3-5-x-1-4-m-golubaya-0-4-mm-artikul-5187986', '5187986', '<h2>Лайнер чашковый пакет Лагуна круг 3.5 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 350 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3.5 x 1.4 • Бренд: Лагуна', 15750.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187986\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.6, 11, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (483, 'Запасная пленка к бассейну Лагуна 3.66 x 1.4 м (мрамор 0.4 мм), артикул 5187773', 'zapasnaya-plenka-k-basseynu-laguna-3-66-x-1-4-m-mramor-0-4-mm-artikul-5187773', '5187773', '<h2>Лайнер чашковый пакет Лагуна круг 3.66&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 366&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 3.66 x 1.4 • Бренд: Лагуна', 15750.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.66\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187773\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.9, 47, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (482, 'Запасная пленка к бассейну Лагуна 4.5 x 1.4 м (голубая 0.4 мм), артикул 5187995', 'zapasnaya-plenka-k-basseynu-laguna-4-5-x-1-4-m-golubaya-0-4-mm-artikul-5187995', '5187995', '<h2>Лайнер чашковый пакет Лагуна круг 4.5 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 450 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4.5 x 1.4 • Бренд: Лагуна', 21375.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187995\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.7, 33, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (481, 'Запасная пленка к бассейну Лагуна 4.88 x 1.4 м (голубая 0.4 мм), артикул 5187840', 'zapasnaya-plenka-k-basseynu-laguna-4-88-x-1-4-m-golubaya-0-4-mm-artikul-5187840', '5187840', '<h2>Лайнер чашковый пакет Лагуна круг 4.88&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 488&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4.88 x 1.4 • Бренд: Лагуна', 24750.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.88\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187840\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.8, 40, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (480, 'Запасная пленка к бассейну Лагуна 4.88 x 1.4 м (мрамор 0.6 мм), артикул 5187907', 'zapasnaya-plenka-k-basseynu-laguna-4-88-x-1-4-m-mramor-0-6-mm-artikul-5187907', '5187907', '<h2>Лайнер чашковый пакет Лагуна круг 4.88 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 488&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4.88 x 1.4 • Бренд: Лагуна', 34500.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.88\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187907\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.7, 50, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (479, 'Запасная пленка к бассейну Лагуна 4.88 x 1.4 м (мрамор 0.4 мм), артикул 5187709/1', 'zapasnaya-plenka-k-basseynu-laguna-4-88-x-1-4-m-mramor-0-4-mm-artikul-5187709-1', '5187709/1', '<h2>Лайнер чашковый пакет Лагуна круг 4.88 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 488&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4.88 x 1.4 • Бренд: Лагуна', 24750.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.88\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187709/1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.1, 53, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (478, 'Запасная пленка к бассейну Лагуна 5 x 1.4 м (мрамор 0.4 мм), артикул 5187998', 'zapasnaya-plenka-k-basseynu-laguna-5-x-1-4-m-mramor-0-4-mm-artikul-5187998', '5187998', '<h2>Лайнер чашковый пакет Лагуна круг 5&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 500&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 5 x 1.4 • Бренд: Лагуна', 24750.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187998\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.9, 3, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (477, 'Запасная пленка к бассейну Лагуна 5.49 x 1.4 м (голубая 0.4 мм), артикул 5187841', 'zapasnaya-plenka-k-basseynu-laguna-5-49-x-1-4-m-golubaya-0-4-mm-artikul-5187841', '5187841', '<h2>Лайнер чашковый пакет Лагуна круг 5.49 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 549&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 5.49 x 1.4 • Бренд: Лагуна', 20250.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.49\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187841\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.7, 64, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (476, 'Запасная пленка к бассейну Лагуна 5.49 x 1.4 м (мрамор 0.4 мм), артикул 5187775', 'zapasnaya-plenka-k-basseynu-laguna-5-49-x-1-4-m-mramor-0-4-mm-artikul-5187775', '5187775', '<h2>Лайнер чашковый пакет Лагуна круг 5.49 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 549&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 5.49 x 1.4 • Бренд: Лагуна', 20250.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.49\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187775\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.1, 36, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (475, 'Запасная пленка к бассейну Лагуна 5.5 x 1.4 м (голубая 0.4 мм), артикул 5188003', 'zapasnaya-plenka-k-basseynu-laguna-5-5-x-1-4-m-golubaya-0-4-mm-artikul-5188003', '5188003', '<h2>Лайнер чашковый пакет Лагуна круг 5.5&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Голубой</li>
	<li>Диаметр: 550&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 5.5 x 1.4 • Бренд: Лагуна', 27375.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5188003\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 5.0, 29, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (474, 'Запасная пленка к бассейну Лагуна 4.57 x 1.4 м (мрамор 0.6 мм), артикул 5187862', 'zapasnaya-plenka-k-basseynu-laguna-4-57-x-1-4-m-mramor-0-6-mm-artikul-5187862', '5187862', '<h2>Лайнер чашковый пакет Лагуна круг 4.57 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 457 см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4.57 x 1.4 • Бренд: Лагуна', 30000.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.57\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187862\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.7, 39, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (473, 'Запасная пленка к бассейну Лагуна 5.0 x 1.4 м (мрамор 0.6 мм), артикул 5188001', 'zapasnaya-plenka-k-basseynu-laguna-5-0-x-1-4-m-mramor-0-6-mm-artikul-5188001', '5188001', '<h2>Лайнер чашковый пакет Лагуна круг 5.5&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 550&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 5.0 x 1.4 • Бренд: Лагуна', 34500.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5188001\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.9, 47, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (472, 'Запасная пленка к бассейну Лагуна 5.0 x 3.0 x 1.4 м (мрамор 0.4 мм), артикул 5188020', 'zapasnaya-plenka-k-basseynu-laguna-5-0-x-3-0-x-1-4-m-mramor-0-4-mm-artikul-5188020', '5188020', '<h2>Лайнер чашковый пакет Лагуна круг 5.0 x 3.0 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Овал</li>
	<li>
	Цвет: Мрамор</li>
	<li>Длина: 500&nbsp;см</li>
	<li>Ширина: 300&nbsp;см<br>
 </li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 5.0 x 3.0 x 1.4 • Бренд: Лагуна', 21000.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"5\",\"Ширина (м)\":\"3\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5188020\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.3, 58, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (471, 'Запасная пленка к бассейну Лагуна 5.5 x 1.4 м (мрамор 0.6 мм), артикул 5188005', 'zapasnaya-plenka-k-basseynu-laguna-5-5-x-1-4-m-mramor-0-6-mm-artikul-5188005', '5188005', '<h2>Лайнер чашковый пакет Лагуна круг 5.5&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 550&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.6 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 5.5 x 1.4 • Бренд: Лагуна', 39375.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5188005\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.1, 49, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (470, 'Запасная пленка к бассейну Лагуна 5.5 x 1.4 м (мрамор 0.4 мм), артикул 5188002', 'zapasnaya-plenka-k-basseynu-laguna-5-5-x-1-4-m-mramor-0-4-mm-artikul-5188002', '5188002', '<h2>Лайнер чашковый пакет Лагуна круг 5.5&nbsp;х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 550&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 5.5 x 1.4 • Бренд: Лагуна', 27375.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5188002\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.3, 16, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (469, 'Запасная пленка к бассейну Лагуна 4.57 x 1.4 м (мрамор 0.4 мм), артикул 5187774/1', 'zapasnaya-plenka-k-basseynu-laguna-4-57-x-1-4-m-mramor-0-4-mm-artikul-5187774-1', '5187774/1', '<h2>Лайнер чашковый пакет Лагуна круг 4.57 х 1.4 м</h2>
<p>
 Производитель: Лагуна (Россия)
</p>
 <br>
 <b>Технические характеристики:</b>
<ul>
	<li>
	Форма: Круг</li>
	<li>
	Цвет: Мрамор</li>
	<li>Диаметр: 457&nbsp;см</li>
	<li>
	Высота: 140&nbsp;см</li>
	<li>
	Толщина: 0.4 мм</li>
	<li>
	Материал: ПВХ</li>
</ul>
 <br>
<p>
</p>', 'Размер: 4.57 x 1.4 • Бренд: Лагуна', 21375.00, NULL, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.57\",\"Высота (м)\":\"1.4\",\"Страна-производитель\":\"Россия\",\"Артикул\":\"5187774/1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\"}"', 4.8, 60, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (468, 'Чашковый пакет INTEX к каркасному бассейну Prism Frame 4.57 x 1.22, артикул 10090 (12457A)', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-prism-frame-4-57-x-1-22-artikul-10090-12457a', '12457A', '<p>
 Оригинальная чаша "Intex 12457" для круглых каркасных бассейнов серии Intex Prism Frame размером 457 х 122 см. Подходит для серии Metal Frame. Оборудована отверстиями для подключения систем фильтрации и сливным клапаном. Применима для моделей бассейнов Intex: 26736NP, 28736NP, 28236NP, 54946, 56946 и др. Для бассейнов Intex Prism Frame и Intex Metal Frame размером 457 х 122 см
</p>
<ul>
	<li>Габариты 457 х 457 х 122 см</li>
	<li>
	Глубина 122 см</li>
	<li>
	Вес в упаковке: 19.6 кг</li>
</ul>', 'Размер: 4.57 x 1.22 • Бренд: Intex', 21000.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"4.57\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"23\",\"Страна-производитель\":\"Китай\",\"Размер упаковки (см)\":\"51 x 27 x 69\",\"Артикул\":\"12457A\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.8, 34, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (467, 'Чашковый пакет INTEX к каркасному бассейну Ultra Frame 5.49 x 1.32, артикул 12436A', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-ultra-frame-5-49-x-1-32-artikul-12436a', '12436A', '<p>
 Запасная пленка (чашковый пакет) к каркасному сборному бассейну&nbsp; Intex Ultra Frame 5,49 м х 1,32 м
</p>', 'Размер: 5.49 x 1.32 • Бренд: Intex', 41250.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"5.49\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"40\",\"Страна-производитель\":\"Китай\",\"Размер упаковки (см)\":\"52 x 26 x 118\",\"Артикул\":\"12436A\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.4, 11, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (466, 'Чашковый пакет INTEX к каркасному бассейну Prism Frame Oval 5.03 x 2.74 x 1.22, артикул 12736', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-prism-frame-oval-5-03-x-2-74-x-1-22-artikul-12736', '12736', '<p>
	Чаша для каркасного бассейна Intex Prism Frame Oval 12736 выполнена по технологии SUPER-TOUGH из ПВХ. Это плотный армированный материал из трех спаенных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Толщина стенок полотна - 0,58 мм.
</p>
<ul>
	<li>Габариты 274 х 503 х 122 см</li>
	<li>
	Глубина 122 см</li>
	<li>
	Вес в упаковке: 26,6 кг</li>
</ul>', 'Размер: 5.03 x 2.74 x 1.22 • Бренд: Intex', 18000.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"5.03\",\"Ширина (м)\":\"2.74\",\"Высота (м)\":\"1.22\",\"Страна-производитель\":\"Китай\",\"Артикул\":\"12736\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\"}"', 4.8, 14, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (465, 'Чашковый пакет INTEX к каркасному бассейну Ultra Frame 5.49 x 2.74 x 1.32, артикул 12445A', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-ultra-frame-5-49-x-2-74-x-1-32-artikul-12445a', '12445A', '<p>
Запасная пленка&nbsp; к каркасному бассейну Intex Rectangular Ultra Frame 5,49 м х 2,74 м х 1,32 м</p>', 'Размер: 5.49 x 2.74 x 1.32 • Бренд: Intex', 41250.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"5.49\",\"Ширина (м)\":\"2.74\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"32\",\"Страна-производитель\":\"Китай\",\"Размер упаковки (см)\":\"94 x 57 x 26\",\"Артикул\":\"12445A\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\"}"', 4.4, 54, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (464, 'Чашковый пакет INTEX к каркасному бассейну Prism Frame 3.66 x 1.22, артикул 11984A', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-prism-frame-3-66-x-1-22-artikul-11984a', '11984A', '<p>
 Запасная пленка (чашковый пакет) к каркасному сборному бассейну INTEX 3,66 м х 1,22м
</p>', 'Размер: 3.66 x 1.22 • Бренд: Intex', 10500.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"3.66\",\"Высота (м)\":\"1.22\",\"Страна-производитель\":\"Китай\",\"Артикул\":\"11984A\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.9, 16, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (463, 'Чашковый пакет INTEX к каркасному бассейну Prism Frame 4.27 x 1.07, артикул 12466A', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-prism-frame-4-27-x-1-07-artikul-12466a', '12466A', '<p>
 Запасная пленка ( чашковый пакет) к каркасно сборному бассейну Intex 4,27 м х 1,07 м
</p>', 'Размер: 4.27 x 1.07 • Бренд: Intex', 10500.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"4.27\",\"Высота (м)\":\"1.07\",\"Страна-производитель\":\"Китай\",\"Артикул\":\"12466A\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.1, 37, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (462, 'Чашковый пакет INTEX к каркасному бассейну Prism Frame 3.66 x 0.99, артикул 12533A', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-prism-frame-3-66-x-0-99-artikul-12533a', '10086', '<p>
 Запасная пленка (чашковый пакет) к каркасному сборному бассейну INTEX 3,66 м х 0,99 м
</p>', 'Размер: 3.66 x 0.99 • Бренд: Intex', 9000.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"3.66\",\"Высота (м)\":\"0.99\",\"Страна-производитель\":\"Китай\",\"Артикул\":\"10086\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.8, 47, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (461, 'Чашковый пакет INTEX к каркасному бассейну Prism Frame 4.57 x 1.07, артикул 12456A', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-prism-frame-4-57-x-1-07-artikul-12456a', '12456A', '<p>
 Запасная пленка (чашковый пакет) к каркасному сборному бассейну Intex 4,57 м х 1,07 м
</p>', 'Размер: 4.57 x 1.07 • Бренд: Intex', 17250.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"4.57\",\"Высота (м)\":\"1.07\",\"Страна-производитель\":\"Китай\",\"Артикул\":\"12456A\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.3, 61, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (460, 'Чашковый пакет INTEX к каркасному бассейну Prism Frame 6.10 x 1.32, артикул 10093', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-prism-frame-6-10-x-1-32-artikul-10093', '10093', '<p>
 Чаша для каркасного бассейна Intex Prism Frame&nbsp;10093&nbsp;выполнена по технологии SUPER-TOUGH из ПВХ. Это плотный армированный материал из трех спаенных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Толщина стенок полотна -&nbsp;0,58 мм.<br>
</p>
<ul>
	<li>Габариты 610 х 610&nbsp;х 132 см</li>
	<li>
	Глубина 132 см</li>
	<li>
	Вес в упаковке: 42 кг</li>
	<li>Высота упаковки 35 см</li>
	<li>Длина упаковки 96 см</li>
	<li>Ширина упаковки 52 см</li>
</ul>', 'Размер: 6.10 x 1.32 • Бренд: Intex', 28500.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"6.1\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"42\",\"Страна-производитель\":\"Китай\",\"Размер упаковки (см)\":\"96 х 35 х 52\",\"Артикул\":\"10093\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.6, 15, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (459, 'Чашковый пакет INTEX к каркасному бассейну Prism Frame 5.49 x 1.22, артикул 10092', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-prism-frame-5-49-x-1-22-artikul-10092', '10092', '<p>
 Чаша для каркасного бассейна Intex Prism Frame&nbsp;10092&nbsp;выполнена по технологии SUPER-TOUGH из ПВХ. Это плотный армированный материал из трех спаенных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Толщина стенок полотна -&nbsp;0,58 мм.<br>
</p>
<ul>
	<li>Габариты 549 х 549&nbsp;х 122 см</li>
	<li>
	Глубина 122 см</li>
	<li>
	Вес в упаковке: 32 кг</li>
	<li>Высота упаковки&nbsp;26 см</li>
	<li>Длина упаковки&nbsp;77 см</li>
	<li>Ширина упаковки 57 см</li>
</ul>', 'Размер: 5.49 x 1.22 • Бренд: Intex', 21750.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"5.49\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"32\",\"Страна-производитель\":\"Китай\",\"Размер упаковки (см)\":\"77 х 57 х 26\",\"Артикул\":\"10092\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.7, 21, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (458, 'Чашковый пакет INTEX к каркасному бассейну GreyWood Prism Frame 5.49 x 1.22, артикул 10092G', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-greywood-prism-frame-5-49-x-1-22-artikul-10092g', '10092G', '<p>
 Оригинальная чаша "Intex 10092G" для круглых каркасных бассейнов серии INTEX GreyWood Prism Frame размером 549 х 122 см.&nbsp;Оборудована отверстиями для подключения систем фильтрации и сливным клапаном.
</p>
<ul>
	<li>Габариты 549 х 549 х 122 см</li>
	<li>
	Глубина 122 см</li>
	<li>
	Вес в упаковке: 33 кг</li>
</ul>', 'Размер: 5.49 x 1.22 • Бренд: Intex', 22500.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"5.49\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"33\",\"Страна-производитель\":\"Китай\",\"Размер упаковки (см)\":\"77 х 56 х 27\",\"Артикул\":\"10092G\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 5.0, 42, true, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (457, 'Чашковый пакет INTEX к каркасному бассейну GreyWood Prism Frame 4.57 x 1.22, артикул 10090G', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-greywood-prism-frame-4-57-x-1-22-artikul-10090g', '10090G', '<p>
 Оригинальная чаша "Intex 10090G" для круглых каркасных бассейнов серии INTEX GreyWood Prism Frame размером 457 х 122 см.&nbsp;Оборудована отверстиями для подключения систем фильтрации и сливным клапаном.
</p>
<ul>
	<li>Габариты 457 х 457 х 122 см</li>
	<li>
	Глубина 122 см</li>
	<li>
	Вес в упаковке: 23 кг</li>
</ul>', 'Размер: 4.57 x 1.22 • Бренд: Intex', 17250.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"4.57\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"23\",\"Страна-производитель\":\"Китай\",\"Размер упаковки (см)\":\"70 х 30 х 51\",\"Артикул\":\"10090G\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.8, 5, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (456, 'Чашковый пакет INTEX к каркасному бассейну Prism Frame 3.66 x 1.22, артикул 10087', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-prism-frame-3-66-x-1-22-artikul-10087', '10087', '<p>
 Чаша для каркасного бассейна Intex Prism Frame 10087&nbsp;выполнена по технологии SUPER-TOUGH из ПВХ. Это плотный армированный материал из трех спаенных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Толщина стенок полотна -&nbsp;0,58 мм.<br>
</p>
<ul>
	<li>Габариты 366 х 366 х 122 см</li>
	<li>
	Глубина 122 см</li>
	<li>
	Вес в упаковке: 16.2 кг</li>
	<li>Высота упаковки&nbsp;63 см</li>
	<li>Длина упаковки&nbsp;36 см</li>
	<li>Ширина упаковки 26 см</li>
</ul>', 'Размер: 3.66 x 1.22 • Бренд: Intex', 12750.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"3.66\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"16.2\",\"Страна-производитель\":\"Китай\",\"Артикул\":\"10087\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.9, 30, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (455, 'Чашковый пакет INTEX к каркасному бассейну Ultra Frame 4.88 x 1.22, артикул 12434A', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-ultra-frame-4-88-x-1-22-artikul-12434a', '12434A', '<p>
 Запасная пленка ( чашковый пакет) к каркасно сборному бассейну&nbsp; Intex Ultra Frame 4,88 м х 1,22 м
</p>', 'Размер: 4.88 x 1.22 • Бренд: Intex', 30000.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"4.88\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"30\",\"Страна-производитель\":\"Китай\",\"Размер упаковки (см)\":\"51 x 24 x 91\",\"Артикул\":\"12434A\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.9, 43, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (454, 'Чашковый пакет INTEX к каркасному бассейну Metal Frame 5.49 x 1.22, артикул 12133', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-metal-frame-5-49-x-1-22-artikul-12133', '12133', 'Запасная пленка (чашковый пакет) к каркасному сборному бассейну Intex 5 ,49 м х 1,22 м', 'Размер: 5.49 x 1.22 • Бренд: Intex', 24375.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"5.49\",\"Высота (м)\":\"1.22\",\"Страна-производитель\":\"Китай\",\"Артикул\":\"12133\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.7, 22, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (453, 'Чашковый пакет INTEX к каркасному бассейну Prism Frame 5.49 x 1.22, артикул 12468A', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-prism-frame-5-49-x-1-22-artikul-12468a', '12468A', '<p>
 Запасная пленка (чашковый пакет) к каркасному сборному бассейну Intex 5 ,49 м х 1,22 м
</p>', 'Размер: 5.49 x 1.22 • Бренд: Intex', 18000.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"5.49\",\"Высота (м)\":\"1.22\",\"Страна-производитель\":\"Китай\",\"Артикул\":\"12468A\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.3, 11, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (452, 'Чашковый пакет INTEX к каркасному бассейну Prism Frame 6.10 x 1.32, артикул 12756A', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-prism-frame-6-10-x-1-32-artikul-12756a', '12756A', '<p>
 Запасная пленка (чашковый пакет) к каркасному сборному бассейну Intex 6,10 м х 1,32 м
</p>', 'Размер: 6.10 x 1.32 • Бренд: Intex', 27000.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"6.1\",\"Высота (м)\":\"1.32\",\"Страна-производитель\":\"Китай\",\"Артикул\":\"12756A\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.3, 36, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (451, 'Чашковый пакет INTEX к каркасному бассейну Ultra Frame 7.32 x 1.32, артикул 12439A', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-ultra-frame-7-32-x-1-32-artikul-12439a', '12439A', '<p>
 Запасная пленка (чашковый пакет) к каркасному сборному бассейну Intex 7,32 м х 1,32 м
</p>', 'Размер: 7.32 x 1.32 • Бренд: Intex', 30000.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"7.32\",\"Высота (м)\":\"1.32\",\"Страна-производитель\":\"Китай\",\"Артикул\":\"12439A\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.0, 17, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (450, 'Чашковый пакет INTEX к каркасному бассейну Prism Frame 7.32 x 1.32, артикул 12469A', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-prism-frame-7-32-x-1-32-artikul-12469a', '12469A', '<p>
 Запасная пленка (чашковый пакет) к каркасному сборному бассейну Intex 7 ,32 м х 1,32 м
</p>', 'Размер: 7.32 x 1.32 • Бренд: Intex', 30000.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"7.32\",\"Высота (м)\":\"1.32\",\"Страна-производитель\":\"Китай\",\"Артикул\":\"12469A\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 5.0, 33, true, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (449, 'Чашковый пакет INTEX к каркасному бассейну Ultra Frame 4.0 x 2.0 x 1.0, артикул 12135A', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-ultra-frame-4-0-x-2-0-x-1-0-artikul-12135a', '12135A', '<p>
Запасная пленка&nbsp; к каркасному бассейну Intex Rectangular Ultra Frame 4,0 м х 2,0 м х 1,0 м</p>', 'Размер: 4.0 x 2.0 x 1.0 • Бренд: Intex', 13500.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"4\",\"Ширина (м)\":\"2\",\"Высота (м)\":\"1\",\"Страна-производитель\":\"Китай\",\"Артикул\":\"12135A\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\"}"', 4.6, 50, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (448, 'Чашковый пакет INTEX к каркасному бассейну Prism Frame 4.88 x 2.44 x 1.07, артикул 12228A', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-prism-frame-4-88-x-2-44-x-1-07-artikul-12228a', '12228A', '<p>
 Чаша для каркасного бассейна Intex Prism Frame 12228 выполнена по технологии SUPER-TOUGH из ПВХ. Это плотный армированный материал из трех спаенных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Толщина стенок полотна - 0,58 мм.
</p>
<ul>
	<li>Габариты 244 х 488 х 107 см</li>
	<li>
	Глубина 107 см</li>
	<li>
	Вес в упаковке: 27 кг</li>
</ul>', 'Размер: 4.88 x 2.44 x 1.07 • Бренд: Intex', 15750.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"4.88\",\"Ширина (м)\":\"2.44\",\"Высота (м)\":\"1.07\",\"Страна-производитель\":\"Китай\",\"Артикул\":\"12228A\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\"}"', 4.2, 11, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (447, 'Чашковый пакет INTEX к каркасному бассейну Ultra Frame 7.32 x 3.66 x 1.32, артикул 12446A', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-ultra-frame-7-32-x-3-66-x-1-32-artikul-12446a', '12446A', '<p>
 Чаша для каркасного бассейна Intex Ultra Rectangular Frame 12446 выполнена по технологии SUPER-TOUGH из ПВХ. Это плотный армированный материал из трех спаенных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Толщина стенок полотна - 0,67 мм.
</p>
<ul>
	<li>Габариты 366 х 732 х 132 см</li>
	<li>
	Глубина 132 см</li>
	<li>
	Вес в упаковке: 49,6 кг</li>
</ul>', 'Размер: 7.32 x 3.66 x 1.32 • Бренд: Intex', 52500.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"7.32\",\"Ширина (м)\":\"3.66\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"50\",\"Страна-производитель\":\"Китай\",\"Размер упаковки (см)\":\"60 x 35 x 85\",\"Артикул\":\"12446A\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\"}"', 4.6, 35, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (446, 'Чашковый пакет INTEX к каркасному бассейну Ultra Frame 9.75 x 4.88 x 1.32, артикул 12447A', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-ultra-frame-9-75-x-4-88-x-1-32-artikul-12447a', '12447A', '<p>
	Чаша для каркасного бассейна Intex Ultra Rectangular Frame 12447 выполнена по технологии SUPER-TOUGH из ПВХ. Это плотный армированный материал из трех спаенных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Толщина стенок полотна - 0,67 мм.
</p>
<ul>
	<li>Габариты 488 х 975 х 132 см</li>
	<li>
	Глубина 132 см</li>
	<li>
	Вес в упаковке: 72,3 кг</li>
</ul>', 'Размер: 9.75 x 4.88 x 1.32 • Бренд: Intex', 56250.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"9.75\",\"Ширина (м)\":\"4.88\",\"Высота (м)\":\"1.32\",\"Страна-производитель\":\"Китай\",\"Артикул\":\"12447A\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\"}"', 4.6, 13, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (445, 'Чашковый пакет INTEX к каркасному бассейну Prism Frame Oval 6.1 x 3.05 x 1.22, артикул 12737', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-prism-frame-oval-6-1-x-3-05-x-1-22-artikul-12737', '12737', '<p>
 Чаша для каркасного бассейна Intex Prism Frame Oval 12737 выполнена по технологии SUPER-TOUGH из ПВХ. Это плотный армированный материал из трех спаенных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Толщина стенок полотна - 0,58 мм
</p>
<ul>
	<li>Габариты 305 х 610 х 122 см</li>
	<li>
	Глубина 122 см</li>
	<li>
	Вес в упаковке: 32,9 кг</li>
</ul>', 'Размер: 6.1 x 3.05 x 1.22 • Бренд: Intex', 21000.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"6.1\",\"Ширина (м)\":\"3.05\",\"Высота (м)\":\"1.22\",\"Страна-производитель\":\"Китай\",\"Артикул\":\"12737\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\"}"', 4.7, 22, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (444, 'Чашковый пакет INTEX к каркасному бассейну Metal Frame 4.57 x 1.22, артикул 11413 (10098)', 'chashkovyy-paket-intex-k-karkasnomu-basseynu-metal-frame-4-57-x-1-22-artikul-11413-10098', '10098', '<p>
 Чаша для каркасного бассейна Intex Metal Frame 10098 выполнена по технологии SUPER-TOUGH из ПВХ. Это плотный армированный материал из трех спаенных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Толщина стенок полотна - 0,58 мм.
</p>
<ul>
	<li>Вес - 23 кг</li>
	<li>Высота - 122 см</li>
	<li>Длина - 457 см</li>
	<li>Ширина - 457 см</li>
	<li>Высота упак. - 60 см</li>
	<li>Длина упак. - 27 см</li>
	<li>Ширина упак. - 16 см</li>
	<li>Страна происхождения - Китай</li>
</ul>', 'Размер: 4.57 x 1.22 • Бренд: Intex', 21000.00, NULL, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"4.57\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"21\",\"Страна-производитель\":\"Китай\",\"Размер упаковки (см)\":\"51 x 25 x 80\",\"Артикул\":\"10098\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\"}"', 4.5, 35, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (443, 'Чашковый пакет Bestway для каркасного бассейна 366 x 100 см, артикул P05302', 'chashkovyy-paket-bestway-dlya-karkasnogo-basseyna-366-x-100-sm-artikul-p05302', 'P05302', 'Чаша для каркасных бассейнов "Bestway Steel Pro Max" круглой формы размером 366 х 100 см.<br>
 "Steel Pro Max" - серия бассейнов с металлическим каркасом из соединительных уголков, трубок-перемычек и стоек.<br>
 <br>
 Материал чаши бассейна выполнен из высококачественного ПВХ. Это плотный армированный материал из трех спаянных слоев: два слоя плотного винила и сетка из полиэстера. Такое сочетание наделяет материал большим запасом прочности. Он не подвержен воздействию солнечных лучей, растягиванию и истиранию.<br>
 <br>
 Чаша бассейна имеет отверстия для подключения систем фильтрации и снизу оборудована сливным клапаном.<br>
 <br>
 Диаметр: 366 см<br>
 Материал чаши бассейна: 3-х слойный ПВХ, армированный сеткой из полиэстера<br>
 Цвет чаши: серый<br>
 <br>
 <br>', 'Размер: 366 x 100 • Бренд: Bestway', 10500.00, NULL, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Диаметр (м)\":\"3.66\",\"Вес (кг)\":\"13\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"366 x 100\",\"Размер упаковки (см)\":\"26 x 32 x 58\",\"Артикул\":\"P05302\",\"Форма бассейна\":\"Круглый\"}"', 4.0, 6, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (442, 'Чашковый пакет Bestway для каркасного бассейна 366 x 122 см, артикул P05304', 'chashkovyy-paket-bestway-dlya-karkasnogo-basseyna-366-x-122-sm-artikul-p05304', 'P05304', 'Чаша для каркасных бассейнов "Bestway Steel Pro Max" круглой формы размером 366 х 122 см.<br>
 "Steel Pro Max" - серия бассейнов с металлическим каркасом из соединительных уголков, трубок-перемычек и стоек.<br>
 <br>
 Материал чаши бассейна выполнен из высококачественного ПВХ. Это плотный армированный материал из трех спаянных слоев: два слоя плотного винила и сетка из полиэстера. Такое сочетание наделяет материал большим запасом прочности. Он не подвержен воздействию солнечных лучей, растягиванию и истиранию.<br>
 <br>
 Чаша бассейна имеет отверстия для подключения систем фильтрации и снизу оборудована сливным клапаном.<br>
 <br>
 Диаметр: 366 см<br>
 Материал чаши бассейна: 3-х слойный ПВХ, армированный сеткой из полиэстера<br>
 Цвет чаши: серый<br>
 <br>
 <br>', 'Размер: 366 x 122 • Бренд: Bestway', 15750.00, NULL, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Диаметр (м)\":\"3.66\",\"Вес (кг)\":\"14\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"366 x 122\",\"Размер упаковки (см)\":\"26 x 36 x 63\",\"Артикул\":\"P05304\",\"Форма бассейна\":\"Круглый\"}"', 4.5, 5, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (441, 'Чашковый пакет Bestway к каркасному бассейну 4,12 х 2,01 х 1,22 м, арт. P07311', 'chashkovyy-paket-bestway-k-karkasnomu-basseynu-4-12-h-2-01-h-1-22-m-art-p07311', 'P07311', 'Чаша для каркасных бассейнов "Bestway&nbsp;Power Steel Rectangular" прямоугольной&nbsp;формы размером 412 x 201 х 122 см.<br>
 <br>
 Материал чаши бассейна выполнен из высококачественного ПВХ. Это плотный армированный материал из трех спаянных слоев: два слоя плотного винила и сетка из полиэстера. Такое сочетание наделяет материал большим запасом прочности. Он не подвержен воздействию солнечных лучей, растягиванию и истиранию.<br>
 <br>
 Чаша бассейна имеет отверстия для подключения систем фильтрации и снизу оборудована сливным клапаном.<br>
 <br>
 Длина: 412 см<br>
 Ширина: 201 см<br>
 Материал чаши бассейна: 3-х слойный ПВХ, армированный сеткой из полиэстера<br>
 Цвет чаши: серый<br>
 <br>
 <br>', 'Размер: 4.12 x 2.01 x 1.22 • Бренд: Bestway', 14250.00, NULL, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"4.12 x 2.01\",\"Артикул\":\"P07311\",\"Форма бассейна\":\"Прямоугольный\"}"', 4.8, 64, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (440, 'Чашковый пакет Bestway к каркасному бассейну 4,88 х 2,44 х 1,22 м, арт. P07313', 'chashkovyy-paket-bestway-k-karkasnomu-basseynu-4-88-h-2-44-h-1-22-m-art-p07313', 'P07313', 'Чаша для каркасных бассейнов "Bestway&nbsp;Power Steel Rectangular" прямоугольной&nbsp;формы размером 488 x 244 х 122 см.<br>
 <br>
 Материал чаши бассейна выполнен из высококачественного ПВХ. Это плотный армированный материал из трех спаянных слоев: два слоя плотного винила и сетка из полиэстера. Такое сочетание наделяет материал большим запасом прочности. Он не подвержен воздействию солнечных лучей, растягиванию и истиранию.<br>
 <br>
 Чаша бассейна имеет отверстия для подключения систем фильтрации и снизу оборудована сливным клапаном.<br>
 <br>
 Длина: 488 см<br>
 Ширина: 244 см<br>
 Материал чаши бассейна: 3-х слойный ПВХ, армированный сеткой из полиэстера<br>
 Цвет чаши: серый<br>
 <br>
 <br>', 'Размер: 4.88 x 2.44 x 1.22 • Бренд: Bestway', 18750.00, NULL, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"4.88 x 2.44\",\"Артикул\":\"P07313\",\"Форма бассейна\":\"Прямоугольный\"}"', 4.5, 64, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (439, 'Чашковый пакет Bestway для каркасного бассейна 457 x 122 см, артикул P05466', 'chashkovyy-paket-bestway-dlya-karkasnogo-basseyna-457-x-122-sm-artikul-p05466', 'P05466', 'Чаша для каркасных бассейнов "Bestway Steel Pro Max" круглой формы размером 457 х 122 см.<br>
 "Steel Pro Max" - серия бассейнов с металлическим каркасом из соединительных уголков, трубок-перемычек и стоек.<br>
 <br>
 Материал чаши бассейна выполнен из высококачественного ПВХ. Это плотный армированный материал из трех спаянных слоев: два слоя плотного винила и сетка из полиэстера. Такое сочетание наделяет материал большим запасом прочности. Он не подвержен воздействию солнечных лучей, растягиванию и истиранию.<br>
 <br>
 Чаша бассейна имеет отверстия для подключения систем фильтрации и снизу оборудована сливным клапаном.<br>
 <br>
 Диаметр: 457 см<br>
 Материал чаши бассейна: 3-х слойный ПВХ, армированный сеткой из полиэстера<br>
 Цвет чаши: серый<br>
 <br>
 <br>', 'Размер: 457 x 122 • Бренд: Bestway', 15750.00, NULL, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Диаметр (м)\":\"4.57\",\"Вес (кг)\":\"25\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"457 x 122\",\"Размер упаковки (см)\":\"27 x 51 x 70\",\"Артикул\":\"P05466\",\"Форма бассейна\":\"Круглый\"}"', 4.6, 59, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (438, 'Чашковый пакет Bestway к каркасному бассейну 4.12 x 2.01 x 1.22, артикул 56241ASS12', 'chashkovyy-paket-bestway-k-karkasnomu-basseynu-4-12-x-2-01-x-1-22-artikul-56241ass12', '56241ASS12', '<p>
 Чаша для прямоугольного каркасного бассейна Bestway 56457, 56456 412 х 201 х 122 см. Выполнена из высококачественного трехслойного ПВХ: два слоя винила и внешний слой высокопрочный полиэстер. Отличается высокой прочностью, не подвержена растягиванию, истиранию, воздействию ультрафиолета. Чаша оборудована всем необходимым для подключения систем фильтрации, а также имеет сливной клапан.
</p>
<ul>
	<li>Габариты 412 х 201 х 122 см</li>
	<li>Глубина 122 см</li>
</ul>', 'Размер: 4.12 x 2.01 x 1.22 • Бренд: Bestway', 16500.00, NULL, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"4.12\",\"Ширина (м)\":\"2.01\",\"Высота (м)\":\"1.22\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"8124\",\"Артикул\":\"56241ASS12\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\"}"', 4.8, 30, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (437, 'Джакузи Bestway 60085, внешний размер: 180 x 66 см - 4 места', 'dzhakuzi-bestway-60085-vneshniy-razmer-180-x-66-sm-4-mesta', '60085', '<h3>
Гидромассажная ванна Bestway LAY-Z-SPA® Fiji AirJet™ Ø 180 x 66 см 60085 </h3>
<p>
 После долгого дня нет ничего более расслабляющего, чем окунуться в теплую бурлящую воду в собственном саду. LAY-Z-SPA® Fiji AirJet™ предлагает успокаивающий массаж для 4 человек, и при этом его легко и быстро настроить. Достигая температуры до 40°C, эта гидромассажная ванна обеспечивает полное расслабление, когда вы получаете мечтательный пузырьковый массаж от 120 форсунок AirJet™.
</p>
<h3>Система успокаивающего массажа:</h3>
<p>
 Система AirJet™ включает 120 воздушных форсунок, которые выпускают пузырьки воздуха из нижней части спа, создавая теплую игристую среду. Этот успокаивающий массаж поможет вам расслабиться и отдохнуть – и все это не выходя из собственного дома.
</p>
<h3>Прочная конструкция:</h3>
<p>
 Надувные стенки этой гидромассажной ванны изготовлены из прочного, устойчивого к разрывам материала DuraPlus™, который предотвращает повреждения. По сравнению с ПВХ трехслойный материал DuraPlus™ на 33% более устойчив к разрыву и на 56% более устойчив к растяжению. Усиленная, недавно разработанная конструкция внутренней опоры предотвращает расширение с течением времени, позволяя спа сохранять свою форму независимо от того, сколько раз его собирали или разбирали.
</p>
<h3>Инновационная технология зимовки:</h3>
<p>
 Включенная функция автоматического нагрева Freeze Shield™ предотвращает замерзание внутренних компонентов при низких температурах. Разработанная с использованием инновационной технологии подготовки к зиме, система поддерживает внутреннюю температуру от 6°C до 10°C для предотвращения повреждений.
</p>
<h3>Безопасность прежде всего:</h3>
<p>
 LAY-Z-SPA® — единственный бренд на рынке, имеющий систему обнаружения грунта . Это предотвращает риск возможного поражения электрическим током. Ваша безопасность – наш главный приоритет.
</p>
<h3>Объем поставки:</h3>
<p>
 Оснащенная насосом, который быстро надувает гидромассажную ванну, нагревает ее, управляет системой фильтрации и массажа, эта гидромассажная ванна одновременно проста и удобна. К насосу легко получить доступ изнутри спа, он имеет подстаканники и место для хранения. В комплект также входит дозатор химикатов ChemConnect™ , который обеспечивает чистую и полезную для здоровья воду за счет равномерного распределения нужного количества хлора. И последнее, но не менее важное: Fiji поставляется с усиленной крышкой , которая сохраняет тепло, когда она не используется, и предотвращает попадание пыли и грязи в воду.
</p>
<h3>Оригинал среди мобильных гидромассажных ванн:</h3>
<p>
 LAY-Z-SPA® является оригинальным производителем первой в мире мобильной высококачественной гидромассажной ванны. Чуть более десяти лет передовых технических инноваций создали имя, которому доверяют клиенты.
</p>
<p>
 Конструкция:
</p>
<ul>
	<li>Размер: Ø 180 х 66 см.</li>
	<li>Внутренние размеры: Ø 132 см.</li>
	<li>До 4 человек</li>
	<li>3-слойный материал DuraPlus™</li>
	<li>Усиленная, недавно разработанная конструкция внутренней опоры</li>
	<li>Емкость воды: 669 л / Вес наполнения: 696 кг</li>
</ul>
<p>
 Дизайн:
</p>
<ul>
	<li>Цвет: имитация дерева (серебряный дуб)</li>
	<li>Пол под мозаику из гальки</li>
</ul>
<p>
 Функции:
</p>
<ul>
	<li>Высокопроизводительный нагреватель (макс. 40°C, 220–240 В~ 50 Гц, 2050 Вт при 20°C)</li>
	<li>Технология контроля замерзания (автоматический подогрев при температуре воды 6°C)</li>
	<li>Пузырьковый массаж теплым воздухом (120 струй AirJet™)</li>
	<li>Картриджная фильтрационная система (пропускная способность 1325 л/ч)</li>
</ul>
<p>
 Особенности:
</p>
<ul>
	<li>Складная панель управления</li>
	<li>Таймер энергосбережения (планирование отопления до 40 дней вперед)</li>
	<li>Автоматическое отключение (через 72 часа)</li>
	<li>Подстаканник и место для хранения</li>
</ul>
<p>
 Безопасность:
</p>
<ul>
	<li>Сертификат GS (TÜV Rheinland)</li>
	<li>Система обнаружения земли + переключатель индивидуальной защиты</li>
	<li>Дверной замок</li>
	<li>Застежки-клипсы, безопасные для детей</li>
</ul>
<p>
 Сборка и разборка:
</p>
<ul>
	<li>Никаких инструментов не требуется</li>
	<li>Ручки для переноски</li>
	<li>Заполнение/удаление воздуха с помощью насосного агрегата</li>
	<li>Встроенная сливная труба + переходник для садового шланга</li>
</ul>
<p>
 Комплектация:
</p>
<ul>
	<li>Изоляционный термочехол из двух частей</li>
	<li>Дозатор химикатов ChemConnect™</li>
	<li>Фильтрующий картридж Flowclear™ размера № 60311. VI (10,6 х 8,0 см)</li>
	<li>2 ремонтных патча</li>
</ul>
<p>
 Предупреждения:
</p>
<p>
 Внимание! Гидромассажную ванну необходимо установить на абсолютно ровной поверхности. Дети могут входить в эту зону только под присмотром взрослых! Кроме того, бассейн должен быть надежно закреплен в соответствии с инструкциями по эксплуатации, а вход без присмотра должен быть предотвращен! По соображениям здоровья температура воды в гидромассажной ванне не должна превышать 40°C! Мы не рекомендуем прыгать в гидромассажную ванну, так как из-за мелководья это может привести к травмам.
</p>', 'Размер: 180 x 66 • Бренд: Bestway', 36750.00, 48750.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Диаметр (м)\":\"1.8\",\"Высота (м)\":\"0.66\",\"Вес (кг)\":\"49.3\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"180 x 66\",\"Объем (л)\":\"669\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"1325\",\"Напряжение (В)\":\"220-240\",\"Размер упаковки (см)\":\"47 x 74 x 62.5\",\"Мощность (кВт)\":\"2.05\",\"Артикул\":\"60085\",\"Тип бассейна\":\"Надувной\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"DuraPlus\",\"Тип установки\":\"Наземный\"}"', 4.5, 11, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (436, 'Джакузи Bestway 60059, внешний размер: 196 x 66 см - 6 мест', 'dzhakuzi-bestway-60059-vneshniy-razmer-196-x-66-sm-6-mest', '60059', '<p>
 LAY-Z-SPA® LED гидромассажная ванна Hollywood AirJet™ Ø 196 x 66 см, круглая
</p>
<p>
 После долгого дня нет ничего более расслабляющего, чем окунуться в теплую бурлящую воду в собственном саду. LAY -Z-SPA® Hollywood AirJet™ предлагает сеанс успокаивающего массажа для группы до 6 человек, при этом его легко и быстро настроить. Достигая температуры до 40°C, эта гидромассажная ванна обеспечивает полное расслабление, когда вы получаете мечтательный пузырьковый массаж от 140 форсунок AirJet™. Hollywood AirJet™ предлагает уникальные, инновационные ощущения от гидромассажной ванны. Входящая в комплект светодиодная подсветка, меняющая цвет, обеспечивает расслабляющее свечение внутри спа, а прозрачная облицовка создает захватывающий световой узор снаружи. семицветной светодиодной лентой можно управлять с помощью пульта дистанционного управления.
</p>
<h2>Система успокаивающего массажа:</h2>
<p>
 Система AirJet™ включает 140 воздушных форсунок, которые выпускают пузырьки воздуха из нижней части спа, создавая теплую, игристую среду. Этот успокаивающий массаж поможет вам расслабиться и отдохнуть – и все это не выходя из собственного дома.
</p>
<h2>Прочная конструкция:</h2>
<p>
 Надувные стенки этой гидромассажной ванны изготовлены из прочного, устойчивого к разрывам материала DuraPlus™, который предотвращает повреждения. По сравнению с ПВХ трехслойный материал DuraPlus™ на 33% более устойчив к разрыву и на 56% более устойчив к растяжению. Усиленная, недавно разработанная конструкция внутренней опоры предотвращает расширение с течением времени, позволяя спа сохранять свою форму независимо от того, сколько раз его собирали или разбирали.
</p>
<h2>Инновационная технология зимовки:</h2>
<p>
 Встроенная автоматическая функция подогрева Freeze Shield™ предотвращает замерзание внутренних компонентов при низких температурах. Эта инновационная технология поддерживает внутреннюю температуру от 6°C до 10°C, чтобы предотвратить повреждение от замерзания.
</p>
<h2>Безопасность прежде всего:</h2>
<p>
 LAY-Z-SPA® — единственный бренд на рынке, имеющий систему обнаружения грунта. Это предотвращает риск возможного поражения электрическим током. Ваша безопасность – наш главный приоритет.
</p>
<h2>Объем поставки:</h2>
<p>
 Оснащенная насосом, который быстро надувает гидромассажную ванну, нагревает ее, управляет системой фильтрации и массажа, эта гидромассажная ванна одновременно проста и удобна. К насосу легко получить доступ изнутри спа, он имеет подстаканники и место для хранения. В комплект также входит дозатор химикатов ChemConnect™, который обеспечивает чистую и полезную для здоровья воду за счет равномерного распределения нужного количества хлора. И последнее, но не менее важное: Hollywood оснащен усиленной крышкой, которая сохраняет тепло, когда он не используется, и предотвращает попадание пыли и грязи в воду.
</p>
<h2>Оригинал среди мобильных гидромассажных ванн:</h2>
<p>
 LAY-Z-SPA® является оригинальным производителем первой в мире мобильной высококачественной гидромассажной ванны. Чуть более десяти лет передовых технических инноваций создали имя, которому доверяют клиенты.
</p>
<h2>Информация о продукте</h2>
<p>
 Конструкция:
</p>
<ul>
	<li>Размер: Ø 196 х 66 см</li>
	<li>Внутренние размеры: Ø 148 см</li>
	<li>До 6 человек</li>
	<li>3-слойный материал DuraPlus™</li>
	<li>Усиленная, недавно разработанная конструкция внутренней опоры</li>
	<li>Емкость воды: 908 л</li>
	<li>Вес наполнения: 937 кг</li>
</ul>
<p>
 Дизайн:
</p>
<ul>
	<li>Цвет: светодиодный дизайн, меняющий цвет</li>
	<li>Пол под мозаику из гальки</li>
</ul>
<p>
 Функции:
</p>
<ul>
	<li>Высокопроизводительный нагрев (макс. 40°C, 220–240 В~ 50 Гц, 2050 Вт при 20°C, примерно 1,5–2,0°C/ч)</li>
	<li>Технология контроля замерзания (автоматический подогрев при температуре воды 6°C)</li>
	<li>Пузырьковый массаж теплым воздухом (140 струй AirJet™)</li>
	<li>Картриджная фильтрационная система (пропускная способность 1325 л/ч)</li>
</ul>
<p>
 Особенности:
</p>
<ul>
	<li>Складная панель управления</li>
	<li>Таймер энергосбережения (планирование отопления до 40 дней вперед)</li>
	<li>Автоматическое отключение (через 72 часа)</li>
	<li>Светодиодная лента с дистанционным управлением</li>
	<li>Подстаканник + место для хранения, встроенное в насосный агрегат</li>
</ul>
<p>
 Безопасность:
</p>
<ul>
	<li>Сертификат GS (TÜV Rheinland)</li>
	<li>Система обнаружения земли + переключатель индивидуальной защиты</li>
	<li>Дверной замок</li>
	<li>Застежки-клипсы, безопасные для детей.</li>
</ul>
<p>
 Сборка и разборка:
</p>
<ul>
	<li>Никаких инструментов не требуется</li>
	<li>Ручки для переноски</li>
	<li>Заполнение/удаление воздуха с помощью насосного агрегата</li>
	<li>Встроенная сливная труба + переходник для садового шланга</li>
</ul>
<p>
 Объем поставки:
</p>
<ul>
	<li>Изоляционный термочехол из двух частей</li>
	<li>Дозатор химикатов ChemConnect™</li>
	<li>Фильтрующий картридж Flowclear™ размера № 60311. VI (10,6 х 8,0 см)</li>
	<li>4 подушки для шеи</li>
	<li>2 ремонтных патча</li>
</ul>', 'Размер: 196 x 66 • Бренд: Bestway', 42000.00, 56250.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Диаметр (м)\":\"1.96\",\"Высота (м)\":\"0.66\",\"Вес (кг)\":\"40\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"196 x 66\",\"Объем (л)\":\"908\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"1325\",\"Напряжение (В)\":\"220-240\",\"Размер упаковки (см)\":\"55 x 77 x 57.5\",\"Мощность (кВт)\":\"2.05\",\"Артикул\":\"60059\",\"Тип бассейна\":\"Надувной\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"DuraPlus\",\"Тип установки\":\"Наземный\"}"', 5.0, 25, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (435, 'Джакузи INTEX 28442, внешний размер: 216 x 71 см - 6 мест', 'dzhakuzi-intex-28442-vneshniy-razmer-216-x-71-sm-6-mest', '28442', '<p>Надувная джакузи INTEX Greywood Deluxe 28442. Внешний размер: 216 x 71 см - 6 мест. Купить по выгодной цене.</p>
<p>
 Intex 28442 Надувной гидромассажный бассейн диаметром 2,16 метра с тепловым насосом и системой водоподготовки, удобный и элегантный, идеально подходит для отдыха в саду вашего дома. Благодаря глубоким знаниям и опыту Intex на рынке плавательных бассейнов и систем фильтрации воды был создан новый шедевр: надувной спа-бассейн Intex 28442 PureSpa ™, изготовленный по технологии FiberTech ™, то есть тысячи нитей, которые придают изделию исключительную устойчивость к ударам. Это означает, что по сравнению с другими подобными продуктами, надувные стенки намного более устойчивы и прочны при входе и выходе из бассейна. Еще одной важной особенностью является бесшумность гидромассажной системы, что очень важно для зоны отдыха.
</p>
<p>
 Как указано в технических характеристиках, запатентованная система против известковых отложений Intex гарантирует долгий срок службы. Спа может вместить до 6 человек и имеет 170 отверстий внизу, из которых производятся гидромассажные струи. Он также оснащен системой фильтрации, предназначенной для очистки воды (пропускная способность: 1741 л / час), ее нагрева (диапазон температур: 1-2 ° C / час) и создания вихревых струй с очень низким потреблением энергии (0,83 кВт / ч) !
</p>
<p>
 На верхней части надувного устройства имеется зажим, чтобы расположить панель управления в более удобном для пользователя положении. Одним нажатием кнопки активируются 170 бодрящих струйных диффузоров.
</p>
<h3>
Комплектация и характеристики </h3>
<ul>
	<li>Размер ванны: 216 х 71 см </li>
	<li>вместимость людей: 6 </li>
	<li>Объем воды: 1098 литров </li>
	<li>внутренний / наружный диаметр: 165см / 216см </li>
	<li>высота: 71см </li>
	<li>Толщина: 0,84 мм </li>
	<li>Материал: ПВХ тройной ламинат </li>
	<li>внутренняя структура: 48 Fiber-Tech Beams ™ </li>
	<li>Пузырьковый диффузор: 800 Вт / 220-240 В </li>
	<li>Нагреватель: 2200 Вт / 220-240 В </li>
	<li>температура: 20 ° - 40 ° C </li>
	<li>повышение температуры: 1 ° - 2 ° C / ч </li>
	<li>гидромассажные форсунки: 170 </li>
	<li>цвет: серое дерево </li>
	<h3>В комплект поставки джакузи входит:</h3>
 <br>
	<ul>
 <li>Надувная джакузи INTEX Greywood Deluxe 1.65 x 0.71 м</li>
 <li>Картриджный насос-фильтр 1741 л/ч</li>
 <li>Фильтрация</li>
 <li>Очистка от накипи</li>
 <li>Тент</li>
 <li>Светодиодная подсветка</li>
 <li>Прочные ручки для транспортировки</li>
 <li>Сумка для переноски и хранения</li>
 <li>2 подголовника</li>
	</ul>
</ul>', 'Размер: 216 x 71 • Бренд: Intex', 52500.00, 60000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Вес (кг)\":\"51.6\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"216 x 71\",\"Объем (л)\":\"1098\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"1741\",\"Размер упаковки (см)\":\"82 x 62 x 57\",\"Артикул\":\"28442\",\"Тип бассейна\":\"Надувной\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Тип установки\":\"Наземный\"}"', 4.0, 53, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (434, 'Джакузи INTEX 28440, внешний размер: 196 x 71 см - 4 места', 'dzhakuzi-intex-28440-vneshniy-razmer-196-x-71-sm-4-mesta', '28440', '<h2>Надувная джакузи INTEX PureSpa Bubble Massage Greywood Deluxe 28440. Внешний размер: 196 x 71 см - 4 места. Купить по выгодной цене.</h2>
<p>
 PureSpa Bubble Massage Greywood Deluxe от Intex была создана для пользователей, которые мечтают о частной зоне отдыха, например, в домашнем саду или внутри здания.
</p>
<p>
 Благодаря простой в использовании панели вы можете легко установить желаемую температуру и наслаждаться в собственной СПА-зоне. Остальным точно не помешает тихо работающий двигатель.
</p>
<p>
 Инновационные системы смягчения воды делают Intex Spa всегда чистым и гигиеничным.
</p>
<p>
 PureSpa Greywood Deluxe от Intex имеет 140 небольших аэрационных форсунок.
</p>
<p>
 Измерение в самом широком месте между внешними краями: 196 см, между внутренними краями: 145 см, высотой: 71 см. Объем: 795 литров.
</p>
<ul>
	<li>Размер ванны: 196 х 71 см </li>
	<li>вместимость людей: 4 </li>
	<li>объем воды: 795 литров </li>
	<li>внутренний / наружный диаметр: 145см / 196см </li>
	<li>высота: 71см </li>
	<li>Толщина: 0,84 мм </li>
	<li>Материал: ПВХ трехслойный </li>
	<li>внутренняя структура: 48 Fiber-Tech Beams ™ </li>
	<li>Пузырьковый диффузор: 800 Вт / 220-240 В </li>
	<li>Нагреватель: 2200 Вт / 220-240 В </li>
	<li>Расход насоса: 1741 л / час </li>
	<li>температура: 20 ° - 40 ° C </li>
	<li>повышение температуры: 1,5–2,5 ° C / ч </li>
	<li>гидромассажные форсунки: 140 </li>
	<li>цвет: серое дерево</li>
</ul>
<h3>В комплект поставки джакузи входит:</h3>
<ul>
	<li>Надувная джакузи INTEX Greywood Deluxe 1.45 x 0.75</li>
	<li>Картриджный насос-фильтр 1741 л/ч</li>
	<li>Фильтрация</li>
	<li>Система очистки воды</li>
	<li>Тент</li>
	<li>Прочные ручки для транспортировки</li>
	<li>Светодиодная подсветка</li>
	<li>Сумка для переноски и хранении</li>
	<li>2 подголовника</li>
</ul>', 'Размер: 196 x 71 • Бренд: Intex', 45000.00, 60000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Вес (кг)\":\"49.3\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"196 x 71\",\"Объем (л)\":\"795\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"1741\",\"Напряжение (В)\":\"220-240\",\"Размер упаковки (см)\":\"82 х 59 х 53\",\"Артикул\":\"28440\",\"Тип бассейна\":\"Надувной\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Тип установки\":\"Наземный\"}"', 4.9, 27, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (433, 'Джакузи INTEX 28476, внешний размер: 196 x 71 см - 4 места', 'dzhakuzi-intex-28476-vneshniy-razmer-196-x-71-sm-4-mesta', '28476', '<p>Надувная джакузи INTEX PureSpa Bubble Massage 28476. Внешний размер: 196 x 71 см - 4 места. Купить по выгодной цене.</p>
<p>
 Надувной SPA Intex 28476 с теплосберегающим покрытием Intex 28523. Данный тент сокращает потерю тепла надувного СПА-бассейна на 50%.<br>
 Это покрытие является инновационным и имеет 2 сильных стороны: защиту и теплосбережение. Его высокая термостойкость обеспечивает изоляцию, намного превосходящую обычные тенты, и сводит к минимуму потери тепла. Благодаря круглой форме, идеально подходящей для спа. Благодаря этому покрытию обогрев воды работает меньше, и ваш счет за электроэнергию уменьшается!<br>
 Надувной СПА-джакузи оснащен удобной панелью управления, очень практичной в использовании.<br>
 Надувное джакузи "Intex 28476 PureSpa Bubble Massage" вмещает до 4-х человек. Ее можно использовать в помещении или на открытом воздухе. Материал чаши выполнен из высококачественного плотного винила армированного сеткой полиэстера, а это сочетание прочности и устойчивости к действию солнечных лучей, деформации и износу.<br>
 Внутренняя конструкция чаши джакузи устроена из 48 перегородок с сотнями прочных полиэфирных волокон, что наделяет изделие особой жесткостью и стабильностью. Такие волокна не деформируются и устойчивы к разрыву.<br>
 Джакузи оснащена массажной системой "Bubble Massage", которая состоит из 120 форсунок по периметру дна бассейна. Форсунки подают воздушные пузырьковые струи с теплым воздухом. Такой спокойный и расслабляющий массаж снимает стресс, повысит тонус и улучшит кровообращение организма.<br>
 Система оборудована нагревом воды, что обеспечит комфортную температуру. Установка температуры возможна в интервале от 20 до 40 градусов. Система автоматизирована и сама адаптируется к установленной температуре. Скорость нагрева воды составляет от 1,5 до 2,5 градуса в час.<br>
 Для поддержания чистоты воды и очистки от мелкого засорения система оснащена картриджной фильтрацией. Картридж установлен непосредственно в водяном насосе и легко меняется.<br>
 Внешний размер: 196 x 71 см.
</p>
<p>
 <br>
</p>
<ul>
	<li>Внутренний диаметр: 145 см.</li>
	<li>
	Объем воды: 795 л (при заполнении на 75%).</li>
	<li>
	Вместимость: 4 взрослых.</li>
	<li>
	Материал: плотный ПВХ 0.84 мм.</li>
	<li>
	Fiber-Tech® - 48 внутренних перегородок состоящих из сотен прочных полиэфирных волокон.</li>
	<li>
	Стандарт CE.</li>
	<li>
	Система "Bubble Massage": по периметру дна джакузи находятся 120 массажных аэро-форсунок, которые подают тёплые пузыри воздуха.</li>
	<li>
	Производительность насоса фильтрации воды 1 741 л/час.</li>
	<li>
	Подогрев воды от 1.5°С до 2.5°С в час, максимум до 40°С.</li>
	<li>
	Регулятор нагрева: от 20 до 40°С.</li>
	<li>
	Hard Water Treatment System - система "смягчения" жесткости воды.</li>
	<li>
	Сеть 220-240В, потребление 3010 Вт: нагреватель - 2200 Вт, массажная система 800 Вт, система жесткости воды 10 Вт.</li>
	<li>
	Надувается воздушным насосом массажной системы.</li>
	<li>
	Цвет: бежевый.</li>
	<li>
	Вес: 53 кг.</li>
</ul>
 <br>
 <br>
 Комплектация:<br>
 <br>
<ul>
	<li>Теплосберегающий тент-чехол для СПА джакузи Intex 28523</li>
	<li>
	Встроенный фильтрующий насос</li>
	<li>
	Сменный картридж S1</li>
	<li>
	Дозатор для хлорных таблеток</li>
	<li>
	Термоизоляционная подстилка</li>
	<li>
	Сумка для хранения и переноски</li>
	<li>
	Ремкомплект</li>
	<li>
	Инструкция</li>
</ul>
 <br>', 'Размер: 196 x 71 • Бренд: Intex', 42000.00, 52500.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Вес (кг)\":\"53\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"196 x 71\",\"Объем (л)\":\"795\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"1741\",\"Напряжение (В)\":\"220-240\",\"Размер упаковки (см)\":\"81.2 х 57 х 84.3\",\"Артикул\":\"28476\",\"Тип бассейна\":\"Надувной\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Тип установки\":\"Наземный\"}"', 5.0, 33, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (432, 'Джакузи INTEX 28462, внешний размер: 211 x 71 см - 6 мест', 'dzhakuzi-intex-28462-vneshniy-razmer-211-x-71-sm-6-mest', '28462', '<h2>Надувная джакузи INTEX PureSpa Jet and Bubble Deluxe 28462. Внешний размер: 211 x 71 см - 6 мест. Купить по выгодной цене.</h2>
<p>
 Джакузи PureSpa Jet and Bubble Deluxe 28462 от Intex была создана для пользователей, которые мечтают о частной зоне отдыха, например, в домашнем саду или внутри здания.
</p>
<p>
 Благодаря простой в использовании беспроводной панели вы можете легко установить желаемую температуру и наслаждаться отдыхом в собственной СПА-зоне. Остальным точно не помешает тихо работающий двигатель.
</p>
<p>
 Инновационные системы смягчения и хлорирования воды делают Intex Spa всегда чистым и гигиеничным.
</p>
<p>
 PureSpa от Intex имеет 140 маленьких форсунок и 6 дополнительных форсунок для приятного массажа.
</p>
<p>
 Измерение в самом широком месте между внешними краями: 211 см, между внутренними краями: 160 см, высотой: 71 см.
</p>
<p>
 Объем: 1098 л, вес: 78,6 кг.
</p>
<ul>
	<li>Вместимость: 6 взрослых</li>
	<li>Материал: плотный ПВХ 0.84 мм</li>
	<li>Fiber-Tech® - 56 внутренних перегородок состоящих из сотен прочных полиэфирных волокон</li>
	<li>Стандарт CE</li>
	<li>Использованы 2 системы: "Bubble Massage" - по периметру дна джакузи находятся 140 массажных аэро-форсунок, которые подают тёплые пузыри воздуха; " Jet Massage" - на бортах джакузи установлены 6 форсунки с мощными струями воды, которые создают эффект настоящего массажа</li>
	<li>Подогрев воды от 1.5°С до 2.5°С в час, максимум до 40°С</li>
	<li>Регулятор нагрева: от 20 до 40°С</li>
	<li>Hard Water Treatment System - система "смягчения" жесткости воды</li>
	<li>Система Salt Water System - выработка хлора, обработка и дезинфекция воды</li>
	<li>Сеть 220-240В, потребление 3730 Вт: нагреватель - 2200 Вт, массажные системы 1500 Вт, система жесткости воды 10 Вт, хлоргенератор 20 Вт</li>
	<li>Надувается воздушным насосом массажной системы</li>
	<li>Цвет: чёрный</li>
</ul>
<h3>В комплект поставки джакузи входит:</h3>
<ul>
	<li>Надувная джакузи INTEX PureSpa Jet and Bubble Deluxe 2.11 x 0.71</li>
	<li>Картриджный насос-фильтр 1741 л/ч</li>
	<li>Фильтрующий картридж тип 29001 (S1)</li>
	<li>2 подголовника</li>
	<li>Тест-полоски для анализа воды</li>
	<li>Термоизоляционная надувная крышка</li>
	<li>Термоизоляционная подстилка</li>
	<li>Сумка для хранения и переноски</li>
	<li>Ремкомплект</li>
	<li>Инструкция</li>
</ul>', 'Размер: 211 x 71 • Бренд: Intex', 78750.00, 105000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Вес (кг)\":\"79\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"211 x 71\",\"Объем (л)\":\"1098\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"1741\",\"Напряжение (В)\":\"220-240\",\"Размер упаковки (см)\":\"76 х 54 х 107\",\"Артикул\":\"28462\",\"Тип бассейна\":\"Надувной\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Тип установки\":\"Наземный\"}"', 4.1, 37, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (431, 'Джакузи INTEX 28458, внешний размер: 180 x 71 см - 4 места', 'dzhakuzi-intex-28458-vneshniy-razmer-180-x-71-sm-4-mesta', '28458', '<p>
	Надувная джакузи INTEX PureSpa Jet and Bubble Deluxe 28458. Внешний размер: 180 x 71 см - 4 места. Купить по выгодной цене.
</p>
<p>
 Джакузи "Intex 28458 PureSpa Jet and Bubble Deluxe» устанавливается на воздухе, но при желании может также быть установлена и в помещении. Чаша отличается высокой устойчивостью, поэтому не поддается деформациям, износу, а также влиянию солнечных лучей. Все это благодаря крепкому материалу - винилу, армированного сеткой полиэстера, из которого сделана чаша. Состав внутренней чаши джакузи - это 48 перегородок с сотнями прочных полиэфирных волокон, что в свою очередь является еще одной гарантией долгого времени службы бассейна.
</p>
<p>
 В джакузи встроены две системы массажа: "PureSpa Jet Massage" и "PureSpa". Особенности их заключаются в том, что в бортовую часть бассейна встроены 4 форсунки, подающие струи воды, а еще 120 форсунок имеются по всему дну бассейна. Эти форсунки подают воздушные пузырьковые струи с теплым воздухом. Впоследствии, обеспечивается массаж, который снимает напряжение и тонизирует, а качественный гидромассаж снимет вялость организма и повышает общее самочувствие. Такое сочетание массажного оборудования доставит максимальное наслаждение.
</p>
<p>
 Джакузи оснащена нагревом воды. Температуру можно выбрать, начиная от 20 градусов, и по желанию увеличить до 40 градусов. Так, как система полностью автоматизирована, то приспособление к нужной температуре осуществляется автоматически. За час вода нагревается на 1,5 – 2,5 градуса.
</p>
<p>
 Картриджная фильтрация в джакузи обеспечит поддержание воды чистой от засорений. Картридж установлен в водяном насосе, при этом его замена происходит очень легко. При помощи встроенного хлоргенератора можно не беспокоится об вынужденном использовании химических средств, которые очень вредны организму. Дезинфекция генерацией хлора осуществляется при помощи соли, которую устройство преобразует посредством электролиза в хлор. Вода очищается от бактерий, становится более мягкой и светлой.
</p>
<ul>
	<li>Внешний размер: 180&nbsp;см</li>
	<li>Внутренний размер: 130 см</li>
	<li>Объем воды: 795 л (при заполнении на 75%)</li>
	<li>Вместимость: 4 взрослых</li>
	<li>Материал: плотный ПВХ 0.84 мм</li>
	<li>Fiber-Tech® - 48 внутренних перегородок состоящих из сотен прочных полиэфирных волокон</li>
	<li>Стандарт CE</li>
	<li>Использованы 2 системы: "PureSpa" - по периметру дна джакузи находятся 120 массажных аэро-форсунок, которые подают тёплые пузыри воздуха; "PureSpa Jet Massage" - на бортах джакузи установлены 4 форсунки с мощными струями воды, которые создают эффект настоящего массажа</li>
	<li>Подогрев воды от 1.5°С до 2.5°С в час, максимум до 40°С</li>
	<li>Регулятор нагрева: от 20 до 40°С</li>
	<li>Hard Water Treatment System - система "смягчения" жесткости воды</li>
	<li>Система Salt Water System - выработка хлора, обработка и дезинфекция воды</li>
	<li>Сеть 220-240В, потребление 3680 Вт: нагреватель - 2200 Вт, массажные системы 1450 Вт, система жесткости воды 10 Вт, хлоргенератор 20 Вт</li>
	<li>Надувается воздушным насосом массажной системы</li>
	<li>Цвет: чёрный</li>
</ul>
<h3>В комплект поставки джакузи входит:</h3>
<ul>
	<li>Надувная джакузи INTEX PureSpa Jet and Bubble Deluxe 1.5 x 0.71</li>
	<li>Картриджный насос-фильтр 1741 л/час</li>
	<li>Фильтрующий картридж тип 29001 (S1)</li>
	<li>Тест-полоски для анализа воды</li>
	<li>Термоизоляционная надувная крышка</li>
	<li>Термоизоляционная подстилка</li>
	<li>Сумка для хранения и переноски</li>
	<li>Ремкомплект</li>
	<li>Инструкция</li>
</ul>', 'Размер: 180 x 71 • Бренд: Intex', 67500.00, 105000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Вес (кг)\":\"70.4\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"180 x 71\",\"Объем (л)\":\"795\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"1741\",\"Напряжение (В)\":\"220-240\",\"Размер упаковки (см)\":\"76 х 54 х 102\",\"Артикул\":\"28458\",\"Тип бассейна\":\"Надувной\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Тип установки\":\"Наземный\"}"', 4.8, 55, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (430, 'Джакузи INTEX 28452, внешний размер: 196 x 71 см - 6 мест', 'dzhakuzi-intex-28452-vneshniy-razmer-196-x-71-sm-6-mest', '28452', '<h2>Надувная джакузи INTEX PureSpa Greystone Deluxe 28452. Внешний размер: 196 x 71 см - 6 мест. Купить по выгодной цене.</h2>
<p>
 Первый надувной спа с конструкцией Fiber-Tech® (сотни тысяч высокопрочных волокон), обеспечивающей превосходную устойчивость во время использования.&nbsp;Чрезвычайно прочный благодаря ламинированному ПВХ толщиной 0,7 мм.&nbsp;Надувной спа настолько прочен в надутом состоянии, что на его краю могут сидеть до 6&nbsp;человек, и он не развалится!&nbsp;Спа поставляется в комплекте с изолирующей нижней крышкой и изолирующей надувной крышкой.&nbsp;Эта модель также оснащена системой жесткой воды, которая, среди прочего, предотвращает кальцификацию.
</p>
<p>
 Беспроводная сенсорная панель управления активирует до 170 мощных пузырьковых форсунок внутри спа для освежающего массажа.&nbsp;Подголовники премиум-класса и светодиодное освещение обеспечивают максимальный комфорт и создают идеальную атмосферу для полного расслабления.
</p>
<h3>Система жесткой воды:&nbsp;</h3>
 Уникальная система жесткой воды Intex гарантирует, что известковый налет из воды нейтрализуется и, следовательно, становится мягче на коже, одежде и всей спа-системе.&nbsp;Это также предотвращает образование известкового налета в муфтах, нагревателе и трубах спа.
<h3>Управляйте своим спа через приложение Intex Link™!</h3>
 Используйте приложение Wi-Fi, чтобы легко управлять надувным джакузи с помощью телефона или планшета!&nbsp;С помощью приложения Intex Link™ Spa Management вы можете управлять всеми функциями джакузи, даже когда вас нет дома.&nbsp;Начните нагревать надувное джакузи, чтобы вы могли сразу же принять теплую ванну, как только вернетесь домой.&nbsp;Легко настройте график отопления, график фильтрации или график обслуживания воды, и вам не придется впоследствии об этом беспокоиться.<br>
 <br>
 <br>
 <span style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">Прочный внешний вид.&nbsp;</span><span style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">Устойчивый к проколам трехслойный ламинированный материал.<br>
 </span><span style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">
<h3>В комплект Intex PureSpa Bubble Therapy входят:<br>
 </h3>
<ul>
	<li>Мощный фильтр-насос производительностью 1741 литр в час.</li>
	<li>Панель управления (компьютер) со светодиодным дисплеем</li>
	<li>2x фильтркартриджа</li>
	<li>Хлорный поплавок</li>
	<li>2x подушка Intex Pure Spa Premium</li>
	<li>1x разноцветный светодиодный светильник</li>
	<li>Изоляционная нижняя крышка</li>
	<li>Изолирующий надувной чехол</li>
	<li>Сумка для хранения</li>
</ul>
<h3>Технические характеристики:</h3>
<ul>
	<li>Подходит для 6 человек</li>
	<li>170 пузырьковых двигателей</li>
	<li>48 балок Dura</li>
	<li>Внешние размеры примерно 195 x 71 см.</li>
	<li>Внутренние размеры примерно 145 x 71 см.</li>
	<li>Конструкция Dura Beam</li>
	<li>Емкость 1098 литров</li>
	<li>Вес 54 кг</li>
	<li>Цвет: серый камень</li>
	<li>Управляйте спа со своего смартфона через приложение Intex Link - Spa Management.</li>
	<li>Беспроводная зарядка панели управления (48 часов работы при полной зарядке)</li>
</ul>
<h3>Технические данные:</h3>
<ul>
	<li>Воздуходувка Bubble: 800 Вт/220-240 В</li>
	<li>Система жесткой воды: 10 Вт.</li>
	<li>Нагреватель: 2200 Вт/220-240 В</li>
	<li>Внешний насос с фильтром</li>
	<li>Производительность насоса: 1741 л/ч</li>
	<li>Нагрев регулируется от 20 ºC до 40 ºC.</li>
	<li>Скорость нагрева: 1,0-2,0 градуса в час.</li>
	<li>Рекомендуемое давление воздуха: 0,083 бар (1,2 фунта на квадратный дюйм).</li>
	<li>Подключите к заземленной розетке с помощью силового кабеля сечением не менее 3x1,5 мм2.</li>
	<li>Спа-насос 65 децибел.</li>
	<li>Пузыри 80 децибел</li>
</ul>
 </span>
<ul>
</ul>', 'Размер: 196 x 71 • Бренд: Intex', 52500.00, 71250.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Высота (м)\":\"0.71\",\"Вес (кг)\":\"54\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"196 x 71\",\"Объем (л)\":\"1098\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"1741\",\"Напряжение (В)\":\"220-240\",\"Размер упаковки (см)\":\"82 х 62 х 57\",\"Артикул\":\"28452\",\"Тип бассейна\":\"Надувной\",\"Форма бассейна\":\"Квадратный\",\"Материал чаши\":\"ПВХ\",\"Тип установки\":\"Наземный\"}"', 4.9, 40, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (429, 'Джакузи INTEX 28428, внешний размер: 216 x 71 см - 6 мест', 'dzhakuzi-intex-28428-vneshniy-razmer-216-x-71-sm-6-mest', '28428', '<p>Надувная джакузи INTEX PureSpa Bubble Massage 28428. Внешний размер: 216 x 71 см - 6 мест. Купить по выгодной цене.</p>
<p>Модель «Intex 28428 PureSpa Bubble Massage» предназначена для использования на открытых площадках и в помещениях. Чаша надувной джакузи изготовлена из винила, плотность которого усилена армированной полиэстеровой сеткой. Материал устойчив к деформированию, механическим повреждениям и воздействию ультрафиолета. Дополнительную жесткость надувному изделию придают 56 перегородок, выполненных из особо прочного полиэфирного волокна. Перегородки образуют внутреннюю конструкцию бассейна, обеспечивая его износостойкость, существенную устойчивость к разрыву.
</p>
<p>
 Техническое оснащение – массажная автоматизированная система "Bubble Massage". Для подачи пузырьковых струй с теплым воздухом в ней имеется 140 форсунок (равномерно расположены по периметру дна чаши). Воздушные струи оказывают мягкое массажное воздействие, улучшают кровоток, стимулируют работу лимфатической системы, повышают общий тонус организма. Также в системе имеется опция подогрева воды (допустимый интервал температур – 20°-40°; скорость нагрева – от 1,5° до 2° в час). Поддерживает чистоту воды в чаше и предотвращает засорение массажной системы посторонними частицами картриджная фильтрация. Сам картридж располагается в водяном насосе, по мере загрязнения требует замены.
</p>
<ul>
	<li>Внешний размер: 216 x 71 см</li>
	<li>Внутренний диаметр: 165 см</li>
	<li>Объем воды: 1 098 л (при заполнении на 75%)</li>
	<li>Вместимость: 6 взрослых</li>
	<li>Материал: плотный ПВХ 0.84 мм</li>
	<li>Fiber-Tech® - 56 внутренних перегородок состоящих из сотен прочных полиэфирных волокон</li>
	<li>Стандарт CE</li>
	<li>Система "Bubble Massage": по периметру дна джакузи находятся 140 массажных аэро-форсунок, которые подают тёплые пузыри воздуха</li>
	<li>Подогрев воды от 1.5°С до 2.5°С в час, максимум до 40°С</li>
	<li>Регулятор нагрева: от 20 до 40°С</li>
	<li>Hard Water Treatment System - система "смягчения" жесткости воды</li>
	<li>Сеть 220-240В, потребление 3010 Вт: нагреватель - 2200 Вт, массажная система 800 Вт, система жесткости воды 10 Вт</li>
	<li>Надувается воздушным насосом массажной системы</li>
	<li>Цвет: бежевый</li>
</ul>
<h3>В комплект поставки джакузи входит:</h3>
<ul>
	<li>Надувная джакузи INTEX PureSpa Bubble Massage 1.65 x 0.71</li>
	<li>Картриджный насос-фильтр 1741 л/час</li>
	<li>Фильтрующий картридж тип 29001 (S1)</li>
	<li>Дозатор для хлорных таблеток</li>
	<li>Тест-полоски для анализа воды</li>
	<li>Термоизоляционная надувная крышка</li>
	<li>Термоизоляционная подстилка</li>
	<li>Сумка для хранения и переноски</li>
	<li>Ремкомплект</li>
	<li>Инструкция</li>
</ul>', 'Размер: 216 x 71 • Бренд: Intex', 45000.00, 56250.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Вес (кг)\":\"51.6\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"216 x 71\",\"Объем (л)\":\"1098\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"1741\",\"Напряжение (В)\":\"220-240\",\"Размер упаковки (см)\":\"52 х 65 х 80\",\"Артикул\":\"28428\",\"Тип бассейна\":\"Надувной\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Тип установки\":\"Наземный\"}"', 4.8, 35, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (428, 'Джакузи INTEX 28450, внешний размер: 175 x 71 см - 4 места', 'dzhakuzi-intex-28450-vneshniy-razmer-175-x-71-sm-4-mesta', '28450', '<h2>Надувная джакузи INTEX PureSpa Greystone Deluxe 28450. Внешний размер: 175 x 71 см - 4 места. Купить по выгодной цене.</h2>
<p>
 Первый надувной спа с конструкцией Fiber-Tech® (сотни тысяч высокопрочных волокон), обеспечивающей превосходную устойчивость во время использования.&nbsp;Чрезвычайно прочный благодаря ламинированному ПВХ толщиной 0,7 мм.&nbsp;Надувной спа настолько прочен в надутом состоянии, что на его краю могут сидеть до 4 человек, и он не развалится!&nbsp;Спа поставляется в комплекте с изолирующей нижней крышкой и изолирующей надувной крышкой.&nbsp;Эта модель также оснащена системой жесткой воды, которая, среди прочего, предотвращает кальцификацию.
</p>
<p>
 Беспроводная сенсорная панель управления активирует до 140 мощных пузырьковых форсунок внутри спа для освежающего массажа.&nbsp;Подголовники премиум-класса и светодиодное освещение обеспечивают максимальный комфорт и создают идеальную атмосферу для полного расслабления.
</p>
<h3><span style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica)); font-size: 14px;">Система жесткой воды:&nbsp;</span><br>
 </h3>
 Уникальная система жесткой воды Intex гарантирует, что известковый налет из воды нейтрализуется и, следовательно, становится мягче на коже, одежде и всей спа-системе.&nbsp;Это также предотвращает образование известкового налета в муфтах, нагревателе и трубах спа.
<h3>Управляйте своим спа через приложение Intex Link™!</h3>
 Используйте приложение Wi-Fi, чтобы легко управлять надувным джакузи с помощью телефона или планшета!&nbsp;С помощью приложения Intex Link™ Spa Management вы можете управлять всеми функциями джакузи, даже когда вас нет дома.&nbsp;Начните нагревать надувное джакузи, чтобы вы могли сразу же принять теплую ванну, как только вернетесь домой.&nbsp;Легко настройте график отопления, график фильтрации или график обслуживания воды, и вам не придется впоследствии об этом беспокоиться.<br>
 <br>
 <span style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">Прочный внешний вид.&nbsp;</span><span style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">Устойчивый к проколам трехслойный ламинированный материал.<br>
 </span><span style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">
<h3>В комплект Intex PureSpa Bubble Therapy входят:<br>
 </h3>
<ul>
	<li>Мощный фильтр-насос производительностью 1741 литр в час.</li>
	<li>Улучшенная панель управления (компьютер) со светодиодным дисплеем</li>
	<li>2x фильтркартриджа</li>
	<li>2x подушка Intex Pure Spa Premium</li>
	<li>1x разноцветный светодиодный светильник</li>
	<li>Хлорный поплавок</li>
	<li>Изоляционная нижняя крышка</li>
	<li>Изолирующий надувной чехол</li>
	<li>Сумка для хранения</li>
</ul>
<h3>Технические характеристики:</h3>
<ul>
	<li>Подходит для 4 человек</li>
	<li>140 пузырьковых двигателей</li>
	<li>48 балок Dura</li>
	<li>Внешние размеры 175 x 71 см.</li>
	<li>Внутренние размеры 124 x 71 см.</li>
	<li>Конструкция Dura Beam</li>
	<li>Вместимость 795 литров</li>
	<li>Цвет: серый камень</li>
	<li>Управляйте спа со своего смартфона через приложение Intex Link - Spa Management.</li>
	<li>Беспроводная зарядка панели управления (48 часов работы при полной зарядке)</li>
</ul>
<h3>Технические данные:</h3>
<ul>
	<li>Воздуходувка Bubble: 0,9 л.с./220-240 В</li>
	<li>Система жесткой воды: 10 Вт.</li>
	<li>Нагреватель: 2200 Вт/220-240 В</li>
	<li>Внешний насос с фильтром</li>
	<li>Производительность насоса: 1741 л/ч</li>
	<li>Нагрев регулируется от 20 ºC до 40 ºC.</li>
	<li>Скорость нагрева: 1,5-2,5 градуса в час.</li>
	<li>Рекомендуемое давление воздуха: 0,083 бар (1,2 фунта на квадратный дюйм).</li>
	<li>Подключите к заземленной розетке с помощью силового кабеля сечением не менее 3x1,5 мм2.</li>
	<li>Спа-насос 65 децибел.</li>
	<li>Пузыри 80 децибел</li>
</ul>
 </span>
<ul>
</ul>', 'Размер: 175 x 71 • Бренд: Intex', 45000.00, 67500.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Вес (кг)\":\"51\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"175 x 71\",\"Объем (л)\":\"795\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"1741\",\"Напряжение (В)\":\"220-240\",\"Размер упаковки (см)\":\"82 х 60 х 53\",\"Артикул\":\"28450\",\"Тип бассейна\":\"Надувной\",\"Форма бассейна\":\"Квадратный\",\"Материал чаши\":\"ПВХ\",\"Тип установки\":\"Наземный\"}"', 5.0, 6, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (427, 'Джакузи INTEX 28446, внешний размер: 175 x 71 см - 4 места', 'dzhakuzi-intex-28446-vneshniy-razmer-175-x-71-sm-4-mesta', '28446', '<p>
	Надувная джакузи INTEX PureSpa Chevron Deluxe 28446. Внешний размер: 175 x 71 см - 4 места. Купить по выгодной цене.
</p>
<p>
 Расслабьтесь в современной PureSpa Chevron Intex 28446, элегантной и роскошной гидромассажной ванне, которая приносит расслабление прямо к вам домой. Просто нажмите кнопку, чтобы активировать 140 пузырьковых струй и расслабиться.
</p>
<p>
 Этот надувной спа, вмещающий до 4 человек, сочетает в себе дизайн и практичность. Этот новый элегантный полосатый дизайн идеально впишется в ваш сад. Современный и практичный продукт. Этнический дизайн спа Chevron дополняет ассортимент, придавая модный и уникальный вид.
</p>
<p>
 Вы можете самостоятельно регулировать нагрев вашего спа с помощью панели управления или совместимого приложения WIFI. Он также оснащен системой стерилизации солью, которая позволяет устранить неприятные запахи и нежелательные эффекты хлора, такие как раздражения или аллергии.
</p>
<p>
 Как и другие модели PureSpas, спа Chevron изготовлен с применением технологии Fiber Tech, что обеспечивает беспрецедентное качество и прочность: вы также можете сидеть на краю надувного спа.
</p>
<p>
 Технические характеристики:
</p>
<ul>
	<li>Размеры: 175 x 175 x 71 см</li>
	<li>Внутренние размеры: 124 x 124 см</li>
	<li>Внешние размеры: 175 x 175&nbsp;см</li>
	<li>Высота: 71 см</li>
	<li>Вместимость: 795 л</li>
	<li>Для 4 человек</li>
	<li>Форма: квадратная</li>
	<li>Технология Fiber-Tech</li>
	<li>Материал: сверхпрочный 3-слойный ПВХ</li>
	<li>Двойная система очистки жесткой и соленой воды (предотвращает образование известкового налета и оснащена генератором хлорного солевого раствора)</li>
	<li>Производительность насоса: 1,741 л/ч</li>
	<li>Нагреватель: 220-240 В | 1300 Вт</li>
	<li>Мощность системы защиты от накипи: 10 Вт</li>
	<li>Диапазон температур: 10°- 40°C</li>
	<li>Повышение температуры: 1,5°- 2,5°C</li>
	<li>140 струй воды</li>
	<li>Интегрированная беспроводная и съемная сенсорная панель управления</li>
	<li>Управление функциями через приложение</li>
	<li>Программирование: отложенный старт, нагрев, продолжительность</li>
</ul>
<p>
 Аксессуары, входящие в комплект:
</p>
<ul>
	<li>Термоизоляционная подстилка</li>
	<li>Термоизоляционная надувная крышка</li>
	<li>2 картриджа S1 #29001</li>
	<li>Сумка для переноски</li>
</ul>', 'Размер: 175 x 71 • Бренд: Intex', 45000.00, 75000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Высота (м)\":\"0.71\",\"Вес (кг)\":\"48.3\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"175 x 71\",\"Объем (л)\":\"795\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"1741\",\"Напряжение (В)\":\"220-240\",\"Размер упаковки (см)\":\"58 x 80 x 51\",\"Артикул\":\"28446\",\"Тип бассейна\":\"Надувной\",\"Форма бассейна\":\"Квадратный\",\"Материал чаши\":\"ПВХ\",\"Тип установки\":\"Наземный\"}"', 4.3, 52, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (426, 'Джакузи INTEX 28472, внешний размер: 196 x 71 см - 6 мест', 'dzhakuzi-intex-28472-vneshniy-razmer-196-x-71-sm-6-mest', '28472', '<p>
 Надувная джакузи INTEX PureSpa Chevron Deluxe 28472. Внешний размер: 196 x 71 см - 6 мест. Купить по выгодной цене.
	</p>
	<p>
 Расслабьтесь в современном PureSpa Chevron Intex 28472, элегантном и роскошном гидромассаже, который приносит расслабление прямо к вам домой, идеально подходит для 6 человек. Просто нажмите кнопку, чтобы активировать 170 пузырьковых струй и расслабиться.
	</p>
	<p>
 Этот надувной спа сочетает в себе дизайн и практичность. Этот новый элегантный полосатый дизайн идеально впишется в ваш сад. Современный и практичный продукт. Этнический дизайн спа Chevron дополняет ассортимент, придавая модный и уникальный вид.
	</p>
	<p>
 Вы можете самостоятельно регулировать нагрев вашего спа с помощью панели управления или совместимого приложения WIFI. Он также оснащен системой стерилизации солью, которая позволяет устранить неприятные запахи и нежелательные эффекты хлора, такие как раздражения или аллергии.
	</p>
	<p>
 Как и другие модели PureSpas, спа Chevron оснащен технологией Fiber Tech, что обеспечивает беспрецедентное качество и прочность: у вас также есть возможность сидеть на краю надувного спа.
	</p>', 'Размер: 196 x 71 • Бренд: Intex', 45000.00, 82500.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Высота (м)\":\"0.71\",\"Вес (кг)\":\"53\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"196 x 71\",\"Объем (л)\":\"1098\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"1741\",\"Напряжение (В)\":\"220-240\",\"Размер упаковки (см)\":\"80 x 60 x 55\",\"Артикул\":\"28472\",\"Тип бассейна\":\"Надувной\",\"Форма бассейна\":\"Квадратный\",\"Материал чаши\":\"ПВХ\",\"Тип установки\":\"Наземный\"}"', 4.8, 49, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (425, 'Джакузи INTEX 28426, внешний размер: 196 x 71 см - 4 места', 'dzhakuzi-intex-28426-vneshniy-razmer-196-x-71-sm-4-mesta', '28426', '<p>
 Надувная джакузи INTEX PureSpa Bubble Massage 28426. Внешний размер: 196 x 71 см - 4 места. Купить по выгодной цене.
</p>
<p>
 Модель «Intex 28426 PureSpa Bubble Massage» предназначена для использования на открытых площадках и в помещениях. Чаша надувной джакузи изготовлена из винила, плотность которого усилена армированной полиэстеровой сеткой. Материал устойчив к деформированию, механическим повреждениям и воздействию ультрафиолета. Дополнительную жесткость надувному изделию придают 48 перегородок, выполненных из особо прочного полиэфирного волокна. Перегородки образуют внутреннюю конструкцию бассейна, обеспечивая его износостойкость, существенную устойчивость к разрыву.
</p>
<p>
 Техническое оснащение – массажная автоматизированная система "Bubble Massage". Для подачи пузырьковых струй с теплым воздухом в ней имеется 120 форсунок (равномерно расположены по периметру дна чаши). Воздушные струи оказывают мягкое массажное воздействие, улучшают кровоток, стимулируют работу лимфатической системы, повышают общий тонус организма. Также в системе имеется опция подогрева воды (допустимый интервал температур – 20°-40°; скорость нагрева – от 1,5° до 2° в час). Поддерживает чистоту воды в чаше и предотвращает засорение массажной системы посторонними частицами картриджная фильтрация. Сам картридж располагается в водяном насосе, по мере загрязнения требует замены
</p>
<p>
</p>
<ul>
	<li>Внешний размер: 196 x 71 см</li>
	<li>Внутренний диаметр: 145 см</li>
	<li>Объем воды: 795 л (при заполнении на 75%)</li>
	<li>Вместимость: 4 взрослых</li>
	<li>Материал: плотный ПВХ 0.84 мм</li>
	<li>Fiber-Tech® - 48 внутренних перегородок состоящих из сотен прочных полиэфирных волокон</li>
	<li>Стандарт CE</li>
	<li>Система "PureSpa": по периметру дна джакузи находятся 120 массажных аэро-форсунок, которые подают тёплые пузыри воздуха</li>
	<li>Подогрев воды от 1.5°С до 2.5°С в час, максимум до 40°С</li>
	<li>Регулятор нагрева: от 20 до 40°С</li>
	<li>Hard Water Treatment System - система "смягчения" жесткости воды</li>
	<li>Сеть 220-240В, потребление 3010 Вт: нагреватель - 2200 Вт, массажная система 800 Вт, система жесткости воды 10 Вт</li>
	<li>Надувается воздушным насосом массажной системы</li>
	<li>Цвет: бежевый</li>
</ul>
<h3>В комплект поставки джакузи входит:</h3>
<ul>
	<li>Надувная джакузи INTEX PureSpa Bubble Massage 1.45 x 0.71 м</li>
	<li>Картриджный насос-фильтр 1 741 л/час</li>
	<li>Фильтрующий картридж тип 29001 (S1)</li>
	<li>Дозатор для хлорных таблеток</li>
	<li>Тест-полоски для анализа воды</li>
	<li>Термоизоляционная надувная крышка</li>
	<li>Термоизоляционная подстилка</li>
	<li>Сумка для хранения и переноски</li>
	<li>Ремкомплект</li>
	<li>Инструкция</li>
</ul>', 'Размер: 196 x 71 • Бренд: Intex', 37500.00, 52500.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Вес (кг)\":\"46\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"196 x 71\",\"Объем (л)\":\"795\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"1741\",\"Напряжение (В)\":\"220-240\",\"Размер упаковки (см)\":\"53 х 57 х 80\",\"Артикул\":\"28426\",\"Тип бассейна\":\"Надувной\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Тип установки\":\"Наземный\"}"', 4.0, 62, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (424, 'Каркасный бассейн GRE 3.5 x 1.32 (полная комплектация) артикул KITPR358WOMAGIN', 'karkasnyy-basseyn-gre-3-5-x-1-32-polnaya-komplektatsiya-artikul-kitpr358womagin', 'KITPR358WOMAGIN', '<p>
 Бассейны круглые GRE с металлической чащей под дерево в базовой комплектации оснащаются скиммером, обеспечивающим сбор мусора с зеркала воды, и форсункой, отвечающей за подачу воды. Для комфорта и удобства во время плаванья внутренняя поверхность резервуара покрыта пленкой ПВХ. Данные решения являются морозостойкими, что позволяет оставлять их на зиму на месте, не сливая содержимое.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (под дерево&nbsp;0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой&nbsp;0.6 мм)</li>
	<li>Форсунка подачи воды.</li>
	<li>Скиммер (устройство сбора грязевых частиц с поверхности воды)</li>
	<li>Песочный насос-фильтр&nbsp;INTEX&nbsp;для фильтрации воды -&nbsp;6000&nbsp;м3/час&nbsp;</li>
	<li>Cоединительные шланги</li>
	<li>Лестница&nbsp;&nbsp;INTEX&nbsp;132см&nbsp;с площадкой</li>
	<li>Кварцевый песок (25 кг) -&nbsp;1&nbsp;шт</li>
	<li>Инструкция по сборке бассейна (на русском языке)</li>
</ul>', 'Размер: 3.5 x 1.32 • Бренд: GRE', 116250.00, 150000.00, NULL, 'GRE', '[]', '"{\"Бренд\":\"GRE\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"175\",\"Страна-производитель\":\"Испания\",\"Объем (л)\":\"11250\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"40 x 77 x 166\",\"Артикул\":\"KITPR358WOMAGIN\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\"}"', 4.9, 53, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (423, 'Каркасный бассейн GRE 5.5 x 1.32 (полная комплектация), артикул KITPR558MAGIN', 'karkasnyy-basseyn-gre-5-5-x-1-32-polnaya-komplektatsiya-artikul-kitpr558magin', 'KITPR558MAGIN', '<p>
 Бассейны круглые GRE с металлической чащей в базовой комплектации оснащаются скиммером, обеспечивающим сбор мусора с зеркала воды, и форсункой, отвечающей за подачу воды. Для комфорта и удобства во время плаванья внутренняя поверхность резервуара покрыта пленкой ПВХ. Данные решения являются морозостойкими, что позволяет оставлять их на зиму на месте, не сливая содержимое.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый&nbsp;0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой&nbsp;0.6 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер (устройство сбора грязевых частиц с поверхности воды)</li>
	<li>Песочный насос-фильтр&nbsp;INTEX&nbsp;для фильтрации воды -&nbsp;10000&nbsp;м3/час&nbsp;</li>
	<li>Соединительные шланги</li>
	<li>Лестница&nbsp;INTEX&nbsp;132 см, с площадкой</li>
	<li>Кварцевый песок (25 кг) -&nbsp;3шт</li>
	<li>Инструкция по сборке бассейна на русском языке</li>
</ul>', 'Размер: 5.5 x 1.32 • Бренд: GRE', 157500.00, 187500.00, NULL, 'GRE', '[]', '"{\"Бренд\":\"GRE\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"270\",\"Страна-производитель\":\"Испания\",\"Объем (л)\":\"27800\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"10000\",\"Размер упаковки (см)\":\"77 x 87 x 169\",\"Артикул\":\"KITPR558MAGIN\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\"}"', 4.2, 37, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (422, 'Каркасный бассейн GRE 5.5 x 1.32 (полная комплектация) артикул KITPR558WOMAGIN', 'karkasnyy-basseyn-gre-5-5-x-1-32-polnaya-komplektatsiya-artikul-kitpr558womagin', 'KITPR558WOMAGIN', '<p>
 Бассейны круглые GRE с металлической чащей под дерево в базовой комплектации оснащаются скиммером, обеспечивающим сбор мусора с зеркала воды, и форсункой, отвечающей за подачу воды. Для комфорта и удобства во время плаванья внутренняя поверхность резервуара покрыта пленкой ПВХ. Данные решения являются морозостойкими, что позволяет оставлять их на зиму на месте, не сливая содержимое.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (под дерево&nbsp;0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой&nbsp;0.6 мм)</li>
	<li>Форсунка подачи воды.</li>
	<li>Скиммер (устройство сбора грязевых частиц с поверхности воды)</li>
	<li>Песочный насос-фильтр&nbsp;EMAUX&nbsp;для фильтрации воды -&nbsp;8000&nbsp;м3/час&nbsp;</li>
	<li>Cоединительные шланги</li>
	<li>Лестница&nbsp;&nbsp;INTEX&nbsp;132см&nbsp;с площадкой</li>
	<li>Кварцевый песок (25 кг) -&nbsp;2&nbsp;шт</li>
	<li>Инструкция по сборке бассейна (на русском языке)</li>
</ul>', 'Размер: 5.5 x 1.32 • Бренд: GRE', 177750.00, 217500.00, NULL, 'GRE', '[]', '"{\"Бренд\":\"GRE\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"270\",\"Страна-производитель\":\"Испания\",\"Объем (л)\":\"27800\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"77 x 87 x 169\",\"Артикул\":\"KITPR558WOMAGIN\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\"}"', 4.3, 25, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (421, 'Каркасный бассейн GRE 4.6 x 1.32 (полная комплектация) артикул KITPR458WOMAGIN', 'karkasnyy-basseyn-gre-4-6-x-1-32-polnaya-komplektatsiya-artikul-kitpr458womagin', 'KITPR458WOMAGIN', '<p>
 Бассейны круглые GRE с металлической чащей под дерево в базовой комплектации оснащаются скиммером, обеспечивающим сбор мусора с зеркала воды, и форсункой, отвечающей за подачу воды. Для комфорта и удобства во время плаванья внутренняя поверхность резервуара покрыта пленкой ПВХ. Данные решения являются морозостойкими, что позволяет оставлять их на зиму на месте, не сливая содержимое.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (под дерево&nbsp;0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой&nbsp;0.6 мм)</li>
	<li>Форсунка подачи воды.</li>
	<li>Скиммер (устройство сбора грязевых частиц с поверхности воды)</li>
	<li>Песочный насос-фильтр&nbsp;INTEX&nbsp;для фильтрации воды - 6000&nbsp;м3/час&nbsp;</li>
	<li>Cоединительные шланги</li>
	<li>Лестница&nbsp;&nbsp;INTEX&nbsp;132см&nbsp;с площадкой</li>
	<li>Кварцевый песок (25 кг) - 1 шт</li>
	<li>Инструкция по сборке бассейна (на русском языке)</li>
</ul>', 'Размер: 4.6 x 1.32 • Бренд: GRE', 144750.00, 172500.00, NULL, 'GRE', '[]', '"{\"Бренд\":\"GRE\",\"Диаметр (м)\":\"4.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"200\",\"Страна-производитель\":\"Испания\",\"Объем (л)\":\"19400\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"77 x 87 x 169\",\"Артикул\":\"KITPR458WOMAGIN\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\"}"', 4.5, 7, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (420, 'Каркасный бассейн GRE 4.6 x 1.32 (полная комплектация), артикул KITPR458MAGIN', 'karkasnyy-basseyn-gre-4-6-x-1-32-polnaya-komplektatsiya-artikul-kitpr458magin', 'KITPR458MAGIN', '<p>
 Бассейны круглые GRE с металлической чащей в базовой комплектации оснащаются скиммером, обеспечивающим сбор мусора с зеркала воды, и форсункой, отвечающей за подачу воды. Для комфорта и удобства во время плаванья внутренняя поверхность резервуара покрыта пленкой ПВХ. Данные решения являются морозостойкими, что позволяет оставлять их на зиму на месте, не сливая содержимое.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый&nbsp;0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой&nbsp;0.6 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер (устройство сбора грязевых частиц с поверхности воды)</li>
	<li>Песочный насос-фильтр&nbsp;INTEX&nbsp;для фильтрации воды - 6000&nbsp;м3/час&nbsp;</li>
	<li>Соединительные шланги</li>
	<li>Лестница&nbsp;INTEX&nbsp;132 см, с площадкой</li>
	<li>Кварцевый песок (25 кг) - 1шт</li>
	<li>Инструкция по сборке бассейна на русском языке</li>
</ul>', 'Размер: 4.6 x 1.32 • Бренд: GRE', 127500.00, 157500.00, NULL, 'GRE', '[]', '"{\"Бренд\":\"GRE\",\"Диаметр (м)\":\"4.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"220\",\"Страна-производитель\":\"Испания\",\"Объем (л)\":\"19400\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"77 x 87 x 169\",\"Артикул\":\"KITPR458MAGIN\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\"}"', 4.7, 51, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (419, 'Каркасный бассейн GRE 3.5 x 1.32 (полная комплектация), артикул KITPR358MAGIN', 'karkasnyy-basseyn-gre-3-5-x-1-32-polnaya-komplektatsiya-artikul-kitpr358magin', 'KITPR358MAGIN', '<p>
 Бассейны круглые GRE с металлической чащей в базовой комплектации оснащаются скиммером, обеспечивающим сбор мусора с зеркала воды, и форсункой, отвечающей за подачу воды. Для комфорта и удобства во время плаванья внутренняя поверхность резервуара покрыта пленкой ПВХ. Данные решения являются морозостойкими, что позволяет оставлять их на зиму на месте, не сливая содержимое.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый&nbsp;0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой&nbsp;0.6 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер (устройство сбора грязевых частиц с поверхности воды)</li>
	<li>Песочный насос-фильтр&nbsp;INTEX&nbsp;для фильтрации воды -&nbsp;6000&nbsp;м3/час&nbsp;</li>
	<li>Соединительные шланги</li>
	<li>Лестница&nbsp;INTEX&nbsp;132 см, с площадкой</li>
	<li>Кварцевый песок (25 кг) -&nbsp;1шт</li>
	<li>Инструкция по сборке бассейна на русском языке</li>
</ul>', 'Размер: 3.5 x 1.32 • Бренд: GRE', 108750.00, 135000.00, NULL, 'GRE', '[]', '"{\"Бренд\":\"GRE\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"175\",\"Страна-производитель\":\"Испания\",\"Объем (л)\":\"11250\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"40 x 77 x 166\",\"Артикул\":\"KITPR358MAGIN\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\"}"', 4.3, 25, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (418, 'Морозостойкий бассейн MAGIC POOL 3.0 x 1.32 м арт. PR3013 - белый', 'morozostoykiy-basseyn-magic-pool-3-0-x-1-32-m-art-pr3013-belyy', 'PR3013', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Соединительные шланги</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 3.0 x 1.32 • Бренд: MAGIC POOL', 57000.00, 67500.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"91\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"10000\",\"Размер упаковки (см)\":\"56 x 40 x 166\",\"Артикул\":\"PR3013\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.1, 32, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (417, 'Морозостойкий бассейн MAGIC POOL 3.0 x 1.32 м (полная комплектация) арт. KITPR3013 - белый', 'morozostoykiy-basseyn-magic-pool-3-0-x-1-32-m-polnaya-komplektatsiya-art-kitpr3013-belyy', 'KITPR3013', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер&nbsp;</li>
	<li>Песочный насос-фильтр INTEX - 6000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница&nbsp; INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 1 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 3.0 x 1.32 • Бренд: MAGIC POOL', 71250.00, 82500.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"150\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"10000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"56 x 40 x 166\",\"Артикул\":\"KITPR3013\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.6, 61, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (416, 'Морозостойкий бассейн MAGIC POOL 3.6 x 1.32 м арт. PR3613- белый', 'morozostoykiy-basseyn-magic-pool-3-6-x-1-32-m-art-pr3613-belyy', 'PR3613', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Соединительные шланги</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 3.6 x 1.32 • Бренд: MAGIC POOL', 64500.00, 78750.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"3.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"106\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"13000\",\"Размер упаковки (см)\":\"56 x 40 x 166\",\"Артикул\":\"PR3613\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.1, 47, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (415, 'Морозостойкий бассейн MAGIC POOL 3.6 x 1.32 м (полная комплектация) арт. KITPR3613 - белый', 'morozostoykiy-basseyn-magic-pool-3-6-x-1-32-m-polnaya-komplektatsiya-art-kitpr3613-belyy', 'KITPR3613', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер&nbsp;</li>
	<li>Песочный насос-фильтр INTEX - 6000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница&nbsp; INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 1 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 3.6 x 1.32 • Бренд: MAGIC POOL', 78750.00, 90000.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"3.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"160\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"13000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"56 x 40 x 166\",\"Артикул\":\"KITPR3613\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.6, 15, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (414, 'Морозостойкий бассейн MAGIC POOL 4.6 x 1.32 м арт. PR4613 - белый', 'morozostoykiy-basseyn-magic-pool-4-6-x-1-32-m-art-pr4613-belyy', 'PR4613', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Соединительные шланги</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 4.6 x 1.32 • Бренд: MAGIC POOL', 85875.00, 97500.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"4.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"131\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"21000\",\"Размер упаковки (см)\":\"58 x 40 x 156\",\"Артикул\":\"PR4613\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.9, 50, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (413, 'Морозостойкий бассейн MAGIC POOL 4.6 x 1.32 м (полная комплектация) арт. KITPR4613 - белый', 'morozostoykiy-basseyn-magic-pool-4-6-x-1-32-m-polnaya-komplektatsiya-art-kitpr4613-belyy', 'KITPR4613', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Песочный насос-фильтр INTEX - 6000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница&nbsp; INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 1 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 4.6 x 1.32 • Бренд: MAGIC POOL', 101250.00, 112500.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"4.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"190\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"21000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"58 x 40 x 156\",\"Артикул\":\"KITPR4613\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.7, 8, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (412, 'Морозостойкий бассейн MAGIC POOL 5.5 x 1.32 м арт. PR5513 - белый', 'morozostoykiy-basseyn-magic-pool-5-5-x-1-32-m-art-pr5513-belyy', 'PR5513', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Соединительные шланги</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 5.5 x 1.32 • Бренд: MAGIC POOL', 102000.00, 116250.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"159\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"30000\",\"Размер упаковки (см)\":\"60 x 40 x 166\",\"Артикул\":\"PR5513\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.4, 5, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (411, 'Морозостойкий бассейн MAGIC POOL 5.5 x 1.32 м (полная комплектация) арт. KITPR5513 - белый', 'morozostoykiy-basseyn-magic-pool-5-5-x-1-32-m-polnaya-komplektatsiya-art-kitpr5513-belyy', 'KITPR5513', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Песочный насос-фильтр INTEX - 8000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 2 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 5.5 x 1.32 • Бренд: MAGIC POOL', 120000.00, 135000.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"250\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"30000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"60 x 40 x 166\",\"Артикул\":\"KITPR5513\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.4, 63, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (410, 'Морозостойкий бассейн MAGIC POOL 3.0 x 1.32 м арт. PR3013R - ротанг', 'morozostoykiy-basseyn-magic-pool-3-0-x-1-32-m-art-pr3013r-rotang', 'PR3013R', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Соединительные шланги</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 3.0 x 1.32 • Бренд: MAGIC POOL', 69375.00, 82500.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"91\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"10000\",\"Размер упаковки (см)\":\"56 x 40 x 166\",\"Артикул\":\"PR3013R\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.8, 18, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (409, 'Морозостойкий бассейн MAGIC POOL 3.0 x 1.32 м (полная комплектация) арт. KITPR3013R - ротанг', 'morozostoykiy-basseyn-magic-pool-3-0-x-1-32-m-polnaya-komplektatsiya-art-kitpr3013r-rotang', 'KITPR3013R', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер&nbsp;</li>
	<li>Песочный насос-фильтр INTEX - 6000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница&nbsp; INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 1 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 3.0 x 1.32 • Бренд: MAGIC POOL', 82500.00, 93750.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"160\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"10000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"56 x 40 x 166\",\"Артикул\":\"KITPR3013R\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.4, 59, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (408, 'Морозостойкий бассейн MAGIC POOL 3.6 x 1.32 м арт. PR3613R - ротанг', 'morozostoykiy-basseyn-magic-pool-3-6-x-1-32-m-art-pr3613r-rotang', 'PR3613R', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Соединительные шланги</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 3.6 x 1.32 • Бренд: MAGIC POOL', 78750.00, 93750.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"3.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"101\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"13000\",\"Размер упаковки (см)\":\"56 x 40 x 166\",\"Артикул\":\"PR3613R\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.9, 38, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (407, 'Морозостойкий бассейн MAGIC POOL 3.6 x 1.32 м (полная комплектация) арт. KITPR3613R - ротанг', 'morozostoykiy-basseyn-magic-pool-3-6-x-1-32-m-polnaya-komplektatsiya-art-kitpr3613r-rotang', 'KITPR3613R', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер&nbsp;</li>
	<li>Песочный насос-фильтр INTEX - 6000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница&nbsp; INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 1 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 3.6 x 1.32 • Бренд: MAGIC POOL', 93750.00, 105000.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"3.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"160\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"13000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"56 x 40 x 166\",\"Артикул\":\"KITPR3613R\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 5.0, 6, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (406, 'Морозостойкий бассейн MAGIC POOL 4.6 x 1.32 м арт. PR4613R - ротанг', 'morozostoykiy-basseyn-magic-pool-4-6-x-1-32-m-art-pr4613r-rotang', 'PR4613R', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Соединительные шланги</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 4.6 x 1.32 • Бренд: MAGIC POOL', 106500.00, 123750.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"4.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"131\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"21000\",\"Размер упаковки (см)\":\"58 x 40 x 156\",\"Артикул\":\"PR4613R\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.2, 63, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (405, 'Морозостойкий бассейн MAGIC POOL 4.6 x 1.32 м (полная комплектация) арт. KITPR4613R - ротанг', 'morozostoykiy-basseyn-magic-pool-4-6-x-1-32-m-polnaya-komplektatsiya-art-kitpr4613r-rotang', 'KITPR4613R', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Песочный насос-фильтр INTEX - 6000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница&nbsp; INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 1 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 4.6 x 1.32 • Бренд: MAGIC POOL', 120000.00, 135000.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"4.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"190\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"21000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"58 x 40 x 156\",\"Артикул\":\"KITPR4613R\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 5.0, 16, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (404, 'Морозостойкий бассейн MAGIC POOL 5.5 x 1.32 м арт. PR5513R - ротанг', 'morozostoykiy-basseyn-magic-pool-5-5-x-1-32-m-art-pr5513r-rotang', 'PR5513R', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Соединительные шланги</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 5.5 x 1.32 • Бренд: MAGIC POOL', 123750.00, 142500.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"159\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"30000\",\"Размер упаковки (см)\":\"60 x 40 x 166\",\"Артикул\":\"PR5513R\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.0, 11, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (403, 'Морозостойкий бассейн MAGIC POOL 5.5 x 1.32 м (полная комплектация) арт. KITPR5513R - ротанг', 'morozostoykiy-basseyn-magic-pool-5-5-x-1-32-m-polnaya-komplektatsiya-art-kitpr5513r-rotang', 'KITPR5513R', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Песочный насос-фильтр INTEX - 8000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 2 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 5.5 x 1.32 • Бренд: MAGIC POOL', 138750.00, 165000.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"250\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"30000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"60 x 40 x 166\",\"Артикул\":\"KITPR5513R\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.7, 34, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (402, 'Морозостойкий бассейн MAGIC POOL 3.0 x 1.32 м арт. PR3013WB - дерево', 'morozostoykiy-basseyn-magic-pool-3-0-x-1-32-m-art-pr3013wb-derevo', 'PR3013WB', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Соединительные шланги</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 3.0 x 1.32 • Бренд: MAGIC POOL', 69375.00, 82500.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"91\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"10000\",\"Размер упаковки (см)\":\"56 x 40 x 166\",\"Артикул\":\"PR3013WB\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.5, 54, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (401, 'Морозостойкий бассейн MAGIC POOL 3.0 x 1.32 м (полная комплектация) арт. KITPR3013WB - дерево', 'morozostoykiy-basseyn-magic-pool-3-0-x-1-32-m-polnaya-komplektatsiya-art-kitpr3013wb-derevo', 'KITPR3013WB', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер&nbsp;</li>
	<li>Песочный насос-фильтр INTEX - 6000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница&nbsp; INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 1 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 3.0 x 1.32 • Бренд: MAGIC POOL', 82500.00, 93750.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"160\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"10000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"56 x 40 x 166\",\"Артикул\":\"KITPR3013WB\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.1, 52, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (400, 'Морозостойкий бассейн MAGIC POOL 3.6 x 1.32 м арт. PR3613WB - дерево', 'morozostoykiy-basseyn-magic-pool-3-6-x-1-32-m-art-pr3613wb-derevo', 'PR3613WB', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Соединительные шланги</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 3.6 x 1.32 • Бренд: MAGIC POOL', 78750.00, 93750.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"3.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"106\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"13000\",\"Размер упаковки (см)\":\"56 x 40 x 166\",\"Артикул\":\"PR3613WB\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.3, 60, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (399, 'Морозостойкий бассейн MAGIC POOL 3.6 x 1.32 м (полная комплектация) арт. KITPR3613WB - дерево', 'morozostoykiy-basseyn-magic-pool-3-6-x-1-32-m-polnaya-komplektatsiya-art-kitpr3613wb-derevo', 'KITPR3613WB', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер&nbsp;</li>
	<li>Песочный насос-фильтр INTEX - 6000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница&nbsp; INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 1 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 3.6 x 1.32 • Бренд: MAGIC POOL', 93750.00, 105000.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"3.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"160\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"13000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"56 x 40 x 166\",\"Артикул\":\"KITPR3613WB\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.3, 47, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (398, 'Морозостойкий бассейн MAGIC POOL 4.6 x 1.32 м арт. PR4613WB - дерево', 'morozostoykiy-basseyn-magic-pool-4-6-x-1-32-m-art-pr4613wb-derevo', 'PR4613WB', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Соединительные шланги</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 4.6 x 1.32 • Бренд: MAGIC POOL', 104250.00, 116250.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"4.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"131\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"21000\",\"Размер упаковки (см)\":\"58 x 40 x 156\",\"Артикул\":\"PR4613WB\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.9, 62, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (397, 'Морозостойкий бассейн MAGIC POOL 4.6 x 1.32 м (полная комплектация) арт. KITPR4613WB - дерево', 'morozostoykiy-basseyn-magic-pool-4-6-x-1-32-m-polnaya-komplektatsiya-art-kitpr4613wb-derevo', 'KITPR4613WB', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Песочный насос-фильтр INTEX - 6000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница&nbsp; INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 1 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 4.6 x 1.32 • Бренд: MAGIC POOL', 120000.00, 135000.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"4.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"190\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"21000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"58 x 40 x 156\",\"Артикул\":\"KITPR4613WB\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.5, 35, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (396, 'Морозостойкий бассейн MAGIC POOL 5.5 x 1.32 м (полная комплектация) арт. KITPR5513WB - дерево', 'morozostoykiy-basseyn-magic-pool-5-5-x-1-32-m-polnaya-komplektatsiya-art-kitpr5513wb-derevo', 'KITPR5513WB', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Песочный насос-фильтр INTEX - 8000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 2 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 5.5 x 1.32 • Бренд: MAGIC POOL', 138750.00, 165000.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"250\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"30000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"60 x 40 x 166\",\"Артикул\":\"KITPR5513WB\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.4, 23, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (395, 'Морозостойкий бассейн MAGIC POOL 3.0 x 1.32 м (полная комплектация) арт. KITPR3013G - графит', 'morozostoykiy-basseyn-magic-pool-3-0-x-1-32-m-polnaya-komplektatsiya-art-kitpr3013g-grafit', 'KITPR3013G', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер&nbsp;</li>
	<li>Песочный насос-фильтр INTEX - 6000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница&nbsp; INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 1 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 3.0 x 1.32 • Бренд: MAGIC POOL', 71250.00, 82500.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"150\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"10000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"56 x 40 x 166\",\"Артикул\":\"KITPR3013G\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.0, 36, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (394, 'Морозостойкий бассейн MAGIC POOL 3.6 x 1.32 м (полная комплектация) арт. KITPR3613G - графит', 'morozostoykiy-basseyn-magic-pool-3-6-x-1-32-m-polnaya-komplektatsiya-art-kitpr3613g-grafit', 'KITPR3613G', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер&nbsp;</li>
	<li>Песочный насос-фильтр INTEX - 6000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница&nbsp; INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 1 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 3.6 x 1.32 • Бренд: MAGIC POOL', 78750.00, 90000.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"3.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"160\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"13000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"56 x 40 x 166\",\"Артикул\":\"KITPR3613G\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.2, 44, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (393, 'Морозостойкий бассейн MAGIC POOL 4.6 x 1.32 м (полная комплектация) арт. KITPR4613G - графит', 'morozostoykiy-basseyn-magic-pool-4-6-x-1-32-m-polnaya-komplektatsiya-art-kitpr4613g-grafit', 'KITPR4613G', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Песочный насос-фильтр INTEX - 6000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница&nbsp; INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 1 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 4.6 x 1.32 • Бренд: MAGIC POOL', 101250.00, 112500.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"4.6\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"190\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"21000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"58 x 40 x 156\",\"Артикул\":\"KITPR4613G\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.0, 57, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (392, 'Морозостойкий бассейн MAGIC POOL 5.5 x 1.32 м (полная комплектация) арт. KITPR5513G - графит', 'morozostoykiy-basseyn-magic-pool-5-5-x-1-32-m-polnaya-komplektatsiya-art-kitpr5513g-grafit', 'KITPR5513G', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Песочный насос-фильтр INTEX - 8000 л/час</li>
	<li>Соединительные шланги</li>
	<li>Лестница INTEX 132см с площадкой</li>
	<li>Кварцевый песок (25кг) - 2 шт.</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 5.5 x 1.32 • Бренд: MAGIC POOL', 120000.00, 135000.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"250\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"30000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"60 x 40 x 166\",\"Артикул\":\"KITPR5513G\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.1, 64, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (391, 'Морозостойкий бассейн MAGIC POOL 5.5 x 1.32 м арт. PR5513WB - дерево', 'morozostoykiy-basseyn-magic-pool-5-5-x-1-32-m-art-pr5513wb-derevo', 'PR5513WB', '<p>
 Круглые бассейны от производителя MAGIC POOL с внешним белым покрытием и внутренней ПВХ плёнкой голубого цвета. Изготавливаются из прессованного гофрированного стального листа с высокими показателями прочности и выносливости. Вся крепёжная фурнитура обрабатывается специальным покрытием, которое защищает все элементы от неблагоприятного влияния окружающей среды. Виниловая ПВХ плёнка толщиной 0,50 мм не подвержена воздействию ультрафиолетовых лучей, выдерживает большое давление воды и является морозоустойчивой – не требует демонтажа и рассчитана на круглогодичное размещение.
</p>
<h3>Характеристики:</h3>
<ul>
	<li>Толщина металла 0.4 мм, двустороннее антикоррозийное покрытие. На лицевую сторону нанесена высокопрочная износостойкая пленка толщиной 235 мкм</li>
	<li>ПВХ толщиной 0.5 мм, обладает высокой эластичностью, прочностью и продолжительным сроком службы при правильной эксплуатации</li>
	<li>Комплект скиммера с форсункой и двумя заглушками. Подключение шлангов 32 и 38 мм, резьба для подключения ПВХ фитингов диаметром 50 мм. Возможность совмещения с оборудованием MAGIC® и других производителей (GRE®, Intex®, Bestway®, Emaux® и т.д.)</li>
	<li>Комплект вертикальных стоек и бортов под цвет бассейна, с декоративными накладками</li>
	<li>Комплект верхних и нижних направляющих</li>
	<li>Комплект из двух шлангов диаметром 38 мм, для подключения фильтровальной системы</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлическая чаша (цвет белый 0.4 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.5 мм)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Тент для бассейна</li>
	<li>Геотекстильная подложка</li>
	<li>Соединительные шланги</li>
	<li>Инструкция по сборке бассейна</li>
</ul>', 'Размер: 5.5 x 1.32 • Бренд: MAGIC POOL', 123750.00, 138750.00, NULL, 'MAGIC POOL', '[]', '"{\"Бренд\":\"MAGIC POOL\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"159\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"30000\",\"Размер упаковки (см)\":\"60 x 40 x 166\",\"Артикул\":\"PR5513WB\",\"Тип бассейна\":\"Морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Цвет чаши\":\"Голубой\",\"Толщина пленки\":\"0.5 мм\"}"', 4.4, 20, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (390, 'Каркасный бассейн Summer Fun 7.37 x 3.6 x 1.5 м (полный комплект) артикул 501010259KB', 'karkasnyy-basseyn-summer-fun-7-37-x-3-6-x-1-5-m-polnyy-komplekt-artikul-501010259kb', '501010259KB', '<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li> Металлический оцинкованный лист 0.8 мм</li>
	<li> Внутреннее покрытие (пленка ПВХ) 0.6 мм</li>
	<li> Алюминиевый профиль для соединения краев листа</li>
	<li> Верхний и нижний профиль ПВХ</li>
	<li>Песочный насос-фильтр для фильтрации воды - 8000 м3/час + cоединительные шланги</li>
	<li> Комплект переходников</li>
	<li> Кварцевый песок 75 кг</li>
	<li> Лестница на 4 ступени (нержавеющая сталь)</li>
	<li> Форсунка подачи воды</li>
	<li> Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
	<li> Инструкция по сборке</li>
</ul>', 'Размер: 7.37 x 3.6 x 1.5 • Бренд: Summer Fun', 252750.00, 300000.00, NULL, 'Summer Fun', '[]', '"{\"Бренд\":\"Summer Fun\",\"Длина (м)\":\"7.37\",\"Ширина (м)\":\"3.6\",\"Высота (м)\":\"1.5\",\"Вес (кг)\":\"180\",\"Страна-производитель\":\"Германия\",\"Объем (л)\":\"28000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"50 х 50 х 155\",\"Артикул\":\"501010259KB\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный / Вкапываемый\"}"', 5.0, 11, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (389, 'Каркасный бассейн Summer Fun 7.0 x 3.5 x 1.5 (полный комплект) артикул 501010248KB', 'karkasnyy-basseyn-summer-fun-7-0-x-3-5-x-1-5-polnyy-komplekt-artikul-501010248kb', '501010248KB', '<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлический оцинкованный лист 0.8 мм</li>
	<li>Внутреннее покрытие (пленка ПВХ) 0.6 мм</li>
	<li>Алюминиевый профиль для соединения краев листа</li>
	<li>Верхний и нижний профиль ПВХ</li>
	<li>Песочный насос-фильтр для фильтрации воды - 10000 м3/час + cоединительные шланги</li>
	<li>Комплект переходников</li>
	<li>Кварцевый песок 75 кг</li>
	<li>Лестница на 4 ступени (нержавеющая сталь)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
	<li>Инструкция по сборке</li>
</ul>', 'Размер: 7.0 x 3.5 x 1.5 • Бренд: Summer Fun', 247500.00, 277500.00, NULL, 'Summer Fun', '[]', '"{\"Бренд\":\"Summer Fun\",\"Длина (м)\":\"7\",\"Ширина (м)\":\"3.5\",\"Высота (м)\":\"1.5\",\"Страна-производитель\":\"Германия\",\"Объем (л)\":\"26000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"10000\",\"Размер упаковки (см)\":\"50 х 50 х 155\",\"Артикул\":\"501010248KB\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный / Вкапываемый\"}"', 4.9, 20, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (388, 'Каркасный бассейн Summer Fun 5.0 x 1.5 (круг) (полный комплект) артикул 501010130KB', 'karkasnyy-basseyn-summer-fun-5-0-x-1-5-krug-polnyy-komplekt-artikul-501010130kb', '501010130KB', '<p>
 Бассейн "Summer Fun (круг)" - самая легко монтируемая и простая в эксплуатации конструкция, обеспечивающая приятный, активный отдых Вам и Вашим близким. Бассейн по достоинству оценят его обладатели. Ведь главные качества этого бассейна простота и удобство в использовании. Бассейн устойчив к коррозии и низким температурам, что позволяет не сливать воду на зимний период.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li> Металлический оцинкованный лист 0.8 мм</li>
	<li> Внутреннее покрытие (пленка ПВХ) 0.6 мм</li>
	<li> Алюминиевый профиль для соединения краев листа</li>
	<li> Верхний и нижний профиль ПВХ</li>
	<li>Песочный насос-фильтр для фильтрации воды - 10000 м3/час + cоединительные шланги</li>
	<li> Комплект переходников</li>
	<li> Кварцевый песок 75 кг</li>
	<li> Лестница на 4 ступени (нержавеющая сталь)</li>
	<li> Форсунка подачи воды</li>
	<li> Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
	<li> Инструкция по сборке</li>
</ul>', 'Размер: 5.0 x 1.5 • Бренд: Summer Fun', 240000.00, 270000.00, NULL, 'Summer Fun', '[]', '"{\"Бренд\":\"Summer Fun\",\"Диаметр (м)\":\"5\",\"Высота (м)\":\"1.5\",\"Страна-производитель\":\"Германия\",\"Объем (л)\":\"26000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"10000\",\"Размер упаковки (см)\":\"50 х 50 х 155\",\"Артикул\":\"501010130KB\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный / Вкапываемый\"}"', 5.0, 40, true, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (387, 'Каркасный бассейн Summer Fun (круг) 4.2 x 1.2 м (полный комплект), артикул 501010125KB', 'karkasnyy-basseyn-summer-fun-krug-4-2-x-1-2-m-polnyy-komplekt-artikul-501010125kb', '501010125KB', '<p>
 Бассейн "Summer Fun (круг)" - самая легко монтируемая и простая в эксплуатации конструкция, обеспечивающая приятный, активный отдых Вам и Вашим близким. Бассейн по достоинству оценят его обладатели. Ведь главные качества этого бассейна простота и удобство в использовании. Бассейн устойчив к коррозии и низким температурам, что позволяет не сливать воду на зимний период.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлический оцинкованный лист&nbsp;0.8 мм</li>
	<li>Внутреннее покрытие (пленка ПВХ)&nbsp;0.6 мм</li>
	<li>Алюминиевый профиль для соединения краев листа</li>
	<li>Верхний и нижний профиль ПВХ</li>
	<li>Песочный насос-фильтр 6000 м3/час</li>
	<li>Соединительные шланги</li>
	<li>Комплект переходников</li>
	<li>Кварцевый песок&nbsp;25 кг</li>
	<li>Лестница с площадкой</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер</li>
	<li>Инструкция по сборке</li>
</ul>', 'Размер: 4.2 x 1.2 • Бренд: Summer Fun', 122250.00, 135000.00, NULL, 'Summer Fun', '[]', '"{\"Бренд\":\"Summer Fun\",\"Диаметр (м)\":\"4.2\",\"Высота (м)\":\"1.2\",\"Вес (кг)\":\"213\",\"Страна-производитель\":\"Германия\",\"Объем (л)\":\"15500\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"37 х 37 х 129\",\"Артикул\":\"501010125KB\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный / Вкапываемый\"}"', 4.5, 22, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (386, 'Каркасный бассейн Summer Fun 9.16 x 4.6 x 1.5 м (полный комплект) артикул 501010261KB', 'karkasnyy-basseyn-summer-fun-9-16-x-4-6-x-1-5-m-polnyy-komplekt-artikul-501010261kb', '501010261KB', '<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li> Металлический оцинкованный лист 0,8мм.</li>
	<li> Внутреннее покрытие (пленка ПВХ) 0,6мм.</li>
	<li> Алюминиевый профиль для соединения краев листа.</li>
	<li> Верхний и нижний профиль ПВХ.</li>
	<li>Песочный насос-фильтр для фильтрации воды - 10000 м3/час + cоединительные шланги.</li>
	<li> Комплект переходников.</li>
	<li> Кварцевый песок 75 кг.</li>
	<li> Лестница на 4 ступени (нержавеющая сталь).</li>
	<li> Форсунка подачи воды.</li>
	<li> Скиммер (устройство для сбора грязевых частиц с поверхности воды). </li>
	<li> Инструкция по сборке.</li>
</ul>
<p>
 Размер упаковки: 50 х 50 х 155 см
</p>
<p>
 Размер пленки: 51 х 42 х 42 см
</p>
<p>
 Объем&nbsp; упаковки: 0,37 m<sup>3</sup>&nbsp;
</p>
 <br>', 'Размер: 9.16 x 4.6 x 1.5 • Бренд: Summer Fun', 397500.00, 450000.00, NULL, 'Summer Fun', '[]', '"{\"Бренд\":\"Summer Fun\",\"Длина (м)\":\"9.16\",\"Ширина (м)\":\"4.6\",\"Высота (м)\":\"1.5\",\"Страна-производитель\":\"Германия\",\"Объем (л)\":\"40000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"10000\",\"Размер упаковки (см)\":\"50 х 50 х 155\",\"Артикул\":\"501010261KB\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный / Вкапываемый\"}"', 4.5, 44, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (385, 'Каркасный бассейн Summer Fun 9.16 x 4.6 x 1.2 м (полный комплект) артикул 501010247KB', 'karkasnyy-basseyn-summer-fun-9-16-x-4-6-x-1-2-m-polnyy-komplekt-artikul-501010247kb', '501010247KB', '<p>
 Бассейны серии "Summer Fun (овал)" рассчитаны на заглубление в грунт и укрепляются с помощью бетонных стенок. Такая конструкция не создает ощущения загроможденности и способна удачно гармонировать с окружающим ландшафтом. Каркас бассейна изготовлен из высокопрочной стали толщиной 0.6 мм и имеет защитное покрытие предотвращающее коррозию.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлический оцинкованный лист 0.6 мм</li>
	<li>Внутреннее покрытие (пленка ПВХ) 0.6 мм</li>
	<li>Алюминиевый профиль для соединения краев листа</li>
	<li>Верхний и нижний профиль ПВХ</li>
	<li>Песочный насос-фильтр для фильтрации воды - 10000 м3/час + cоединительные шланги</li>
	<li>Комплект переходников</li>
	<li>Кварцевый песок 75 кг</li>
	<li>Лестница на 3 ступени (нержавеющая сталь)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
	<li>Инструкция по сборке</li>
</ul>', 'Размер: 9.16 x 4.6 x 1.2 • Бренд: Summer Fun', 206250.00, 240000.00, NULL, 'Summer Fun', '[]', '"{\"Бренд\":\"Summer Fun\",\"Длина (м)\":\"9.16\",\"Ширина (м)\":\"4.6\",\"Высота (м)\":\"1.2\",\"Страна-производитель\":\"Германия\",\"Объем (л)\":\"38000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"10000\",\"Размер упаковки (см)\":\"37 х 37 х 129\",\"Артикул\":\"501010247KB\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный / Вкапываемый\"}"', 4.8, 63, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (384, 'Каркасный бассейн Summer Fun 8.0 x 4.2 x 1.5 м (полный комплект) артикул 501010249KB', 'karkasnyy-basseyn-summer-fun-8-0-x-4-2-x-1-5-m-polnyy-komplekt-artikul-501010249kb', '501010249KB', '<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li> Металлический оцинкованный лист 0.8 мм</li>
	<li> Внутреннее покрытие (пленка ПВХ) 0.6 мм</li>
	<li> Алюминиевый профиль для соединения краев листа</li>
	<li> Верхний и нижний профиль ПВХ</li>
	<li> Песочный насос-фильтр для фильтрации воды - 10000 м3/час + cоединительные шланги</li>
	<li> Комплект переходников</li>
	<li> Кварцевый песок 75 кг</li>
	<li> Лестница на 4 ступени (нержавеющая сталь)</li>
	<li> Форсунка подачи воды</li>
	<li> Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
	<li> Инструкция по сборке</li>
</ul>', 'Размер: 8.0 x 4.2 x 1.5 • Бренд: Summer Fun', 258750.00, 300000.00, NULL, 'Summer Fun', '[]', '"{\"Бренд\":\"Summer Fun\",\"Длина (м)\":\"8\",\"Ширина (м)\":\"4.2\",\"Высота (м)\":\"1.5\",\"Страна-производитель\":\"Германия\",\"Объем (л)\":\"35000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"10000\",\"Размер упаковки (см)\":\"50 х 50 х 155\",\"Артикул\":\"501010249KB\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный / Вкапываемый\"}"', 4.5, 22, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (383, 'Каркасный бассейн Summer Fun 8.0 x 4.2 x 1.2 м (полный комплект) артикул 501010244KB', 'karkasnyy-basseyn-summer-fun-8-0-x-4-2-x-1-2-m-polnyy-komplekt-artikul-501010244kb', '501010244KB', '<p>
 Бассейны серии "Summer Fun (овал)" рассчитаны на заглубление в грунт и укрепляются с помощью бетонных стенок. Такая конструкция не создает ощущения загроможденности и способна удачно гармонировать с окружающим ландшафтом. Каркас бассейна изготовлен из высокопрочной стали толщиной 0.6 мм и имеет защитное покрытие предотвращающее коррозию.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлический оцинкованный лист 0.6 мм</li>
	<li>Внутреннее покрытие (пленка ПВХ) 0.6 мм</li>
	<li>Алюминиевый профиль для соединения краев листа</li>
	<li>Верхний и нижний профиль ПВХ</li>
	<li>Песочный насос-фильтр для фильтрации воды - 10000 м3/час + cоединительные шланги</li>
	<li>Комплект переходников</li>
	<li>Кварцевый песок 75 кг</li>
	<li>Лестница на 3 ступени (нержавеющая сталь)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
	<li>Инструкция по сборке</li>
</ul>', 'Размер: 8.0 x 4.2 x 1.2 • Бренд: Summer Fun', 152250.00, 165000.00, NULL, 'Summer Fun', '[]', '"{\"Бренд\":\"Summer Fun\",\"Длина (м)\":\"8\",\"Ширина (м)\":\"4.2\",\"Высота (м)\":\"1.2\",\"Страна-производитель\":\"Германия\",\"Объем (л)\":\"28000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"10000\",\"Размер упаковки (см)\":\"37 х 37 х 129\",\"Артикул\":\"501010244KB\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный / Вкапываемый\"}"', 4.1, 46, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (382, 'Каркасный бассейн Summer Fun 7.0 x 3.5 x 1.2 (полный комплект) артикул 501010243KB', 'karkasnyy-basseyn-summer-fun-7-0-x-3-5-x-1-2-polnyy-komplekt-artikul-501010243kb', '501010243KB', '<p>
 Бассейны серии "Summer Fun (овал)" рассчитаны на заглубление в грунт и укрепляются с помощью бетонных стенок. Такая конструкция не создает ощущения загроможденности и способна удачно гармонировать с окружающим ландшафтом. Каркас бассейна изготовлен из высокопрочной стали толщиной 0.6 мм и имеет защитное покрытие предотвращающее коррозию.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлический оцинкованный лист 0.6 мм</li>
	<li>Внутреннее покрытие (пленка ПВХ) 0.6 мм</li>
	<li>Алюминиевый профиль для соединения краев листа</li>
	<li>Верхний и нижний профиль ПВХ</li>
	<li>Песочный насос-фильтр для фильтрации воды - 8000 м3/час + cоединительные шланги</li>
	<li>Комплект переходников</li>
	<li>Кварцевый песок 50 кг</li>
	<li>Лестница на 3 ступени (нержавеющая сталь)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
	<li>Инструкция по сборке</li>
</ul>', 'Размер: 7.0 x 3.5 x 1.2 • Бренд: Summer Fun', 133500.00, 150000.00, NULL, 'Summer Fun', '[]', '"{\"Бренд\":\"Summer Fun\",\"Длина (м)\":\"7\",\"Ширина (м)\":\"3.5\",\"Высота (м)\":\"1.2\",\"Страна-производитель\":\"Германия\",\"Объем (л)\":\"20000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"37 х 37 х 129\",\"Артикул\":\"501010243KB\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный / Вкапываемый\"}"', 4.8, 31, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (381, 'Каркасный бассейн Summer Fun 6.23 x 3.6 x 1.5 (полный комплект) артикул 501010258KB', 'karkasnyy-basseyn-summer-fun-6-23-x-3-6-x-1-5-polnyy-komplekt-artikul-501010258kb', '501010258KB', '<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li> Металлический оцинкованный лист 0.8 мм</li>
	<li> Внутреннее покрытие (пленка ПВХ) 0.6 мм</li>
	<li> Алюминиевый профиль для соединения краев листа</li>
	<li> Верхний и нижний профиль ПВХ</li>
	<li>Песочный насос-фильтр для фильтрации воды - 8000 м3/час + cоединительные шланги</li>
	<li> Комплект переходников</li>
	<li> Кварцевый песок 50 кг</li>
	<li> Лестница на 4 ступени (нержавеющая сталь)</li>
	<li> Форсунка подачи воды</li>
	<li> Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
	<li> Инструкция по сборке</li>
</ul>', 'Размер: 6.23 x 3.6 x 1.5 • Бренд: Summer Fun', 207000.00, 232500.00, NULL, 'Summer Fun', '[]', '"{\"Бренд\":\"Summer Fun\",\"Длина (м)\":\"6.23\",\"Ширина (м)\":\"3.6\",\"Высота (м)\":\"1.5\",\"Страна-производитель\":\"Германия\",\"Объем (л)\":\"24000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"50 х 50 х 155\",\"Артикул\":\"501010258KB\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный / Вкапываемый\"}"', 4.2, 51, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (380, 'Каркасный бассейн Summer Fun 6.0 x 3.2 x 1.5 (полный комплект) артикул 501010256KB', 'karkasnyy-basseyn-summer-fun-6-0-x-3-2-x-1-5-polnyy-komplekt-artikul-501010256kb', '501010256KB', '<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li> Металлический оцинкованный лист 0.8 мм</li>
	<li> Внутреннее покрытие (пленка ПВХ) 0.6 мм</li>
	<li> Алюминиевый профиль для соединения краев листа</li>
	<li> Верхний и нижний профиль ПВХ</li>
	<li>Песочный насос-фильтр для фильтрации воды - 6000 м3/час + cоединительные шланги</li>
	<li> Комплект переходников</li>
	<li> Кварцевый песок 25 кг</li>
	<li> Лестница на 4 ступени (нержавеющая сталь)</li>
	<li> Форсунка подачи воды</li>
	<li> Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
	<li> Инструкция по сборке</li>
</ul>', 'Размер: 6.0 x 3.2 x 1.5 • Бренд: Summer Fun', 209250.00, 232500.00, NULL, 'Summer Fun', '[]', '"{\"Бренд\":\"Summer Fun\",\"Длина (м)\":\"6\",\"Ширина (м)\":\"3.2\",\"Высота (м)\":\"1.5\",\"Страна-производитель\":\"Германия\",\"Объем (л)\":\"20000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"50 х 50 х 155\",\"Артикул\":\"501010256KB\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный / Вкапываемый\"}"', 4.9, 42, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (379, 'Каркасный бассейн Summer Fun 4.0 x 1.5 (круг) (полный комплект) артикул 501010171KB', 'karkasnyy-basseyn-summer-fun-4-0-x-1-5-krug-polnyy-komplekt-artikul-501010171kb', '501010171KB', '<p>
 Бассейн "Summer Fun (круг)" - самая легко монтируемая и простая в эксплуатации конструкция, обеспечивающая приятный, активный отдых Вам и Вашим близким. Бассейн по достоинству оценят его обладатели. Ведь главные качества этого бассейна простота и удобство в использовании. Бассейн устойчив к коррозии и низким температурам, что позволяет не сливать воду на зимний период.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Металлический оцинкованный лист 0.8 мм</li>
	<li>Внутреннее покрытие (пленка ПВХ) 0.6 мм</li>
	<li>Алюминиевый профиль для соединения краев листа</li>
	<li>Верхний и нижний профиль ПВХ</li>
	<li>Песочный насос-фильтр для фильтрации воды - 6000 м3/час + cоединительные шланги</li>
	<li>Комплект переходников</li>
	<li>Кварцевый песок 25 кг</li>
	<li>Лестница на 4 ступени (нержавеющая сталь)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
	<li>Инструкция по сборке</li>
</ul>', 'Размер: 4.0 x 1.5 • Бренд: Summer Fun', 209250.00, 225000.00, NULL, 'Summer Fun', '[]', '"{\"Бренд\":\"Summer Fun\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.5\",\"Страна-производитель\":\"Германия\",\"Объем (л)\":\"19000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"50 х 50 х 155\",\"Артикул\":\"501010171KB\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный / Вкапываемый\"}"', 4.0, 25, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (378, 'Бассейн Лагуна 5 х 1.25 м (полная комплектация) арт. 50014 / 1 - коричневый', 'basseyn-laguna-5-h-1-25-m-polnaya-komplektatsiya-art-50014-1-korichnevyy', '50014 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 23 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5 x 1.25 • Бренд: Лагуна', 76875.00, 90000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"175\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"23000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"50014 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 4.1, 19, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (377, 'Бассейн Лагуна 5.5 х 1.25 м (полная комплектация) арт. 55014 / 1 - коричневый', 'basseyn-laguna-5-5-h-1-25-m-polnaya-komplektatsiya-art-55014-1-korichnevyy', '55014 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 27.9 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5.5 x 1.25 • Бренд: Лагуна', 82500.00, 97500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"215\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"27900\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"55014 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 4.7, 38, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (376, 'Бассейн Лагуна 3 х 1.25 м (полная комплектация) арт. 30012 / 1 - платина', 'basseyn-laguna-3-h-1-25-m-polnaya-komplektatsiya-art-30012-1-platina', '30012 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 8.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3 x 1.25 • Бренд: Лагуна', 51750.00, 60000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"130\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"8200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"30012 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 5.0, 45, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (375, 'Бассейн Лагуна 3.5 х 1.25 м (полная комплектация) арт. 35012 / 1 - платина', 'basseyn-laguna-3-5-h-1-25-m-polnaya-komplektatsiya-art-35012-1-platina', '35012 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 11.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3.5 x 1.25 • Бренд: Лагуна', 57750.00, 67500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"145\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"11200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"35012 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 4.4, 28, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (374, 'Бассейн Лагуна 4 х 1.25 м (полная комплектация) арт. 40012 / 1 - платина', 'basseyn-laguna-4-h-1-25-m-polnaya-komplektatsiya-art-40012-1-platina', '40012 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 14.7 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : Платина</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4 x 1.25 • Бренд: Лагуна', 61875.00, 75000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"150\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"14700\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"40012 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 4.6, 9, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (373, 'Бассейн Лагуна 4.5 х 1.25 м (полная комплектация) арт. 45012 / 1 - платина', 'basseyn-laguna-4-5-h-1-25-m-polnaya-komplektatsiya-art-45012-1-platina', '45012 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 18.6 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Платина</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4.5 x 1.25 • Бренд: Лагуна', 69375.00, 78750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"165\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"18600\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"45012 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 4.2, 28, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (372, 'Бассейн Лагуна 5 х 1.25 м (полная комплектация) арт. 50012 / 1 - платина', 'basseyn-laguna-5-h-1-25-m-polnaya-komplektatsiya-art-50012-1-platina', '50012 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 23 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Платина</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5 x 1.25 • Бренд: Лагуна', 76875.00, 90000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"175\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"23000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"50012 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 4.3, 18, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (371, 'Бассейн Лагуна 5.5 х 1.25 м (полная комплектация) арт. 55012 / 1 - платина', 'basseyn-laguna-5-5-h-1-25-m-polnaya-komplektatsiya-art-55012-1-platina', '55012 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 27.9 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: платина</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5.5 x 1.25 • Бренд: Лагуна', 83250.00, 97500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"215\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"27900\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"55012 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 4.5, 47, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (370, 'Бассейн Лагуна 3 х 1.25 м (полная комплектация) арт. 30040 / 1 - дерево', 'basseyn-laguna-3-h-1-25-m-polnaya-komplektatsiya-art-30040-1-derevo', '30040 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 8.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Дерево</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3 x 1.25 • Бренд: Лагуна', 55500.00, 67500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"130\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"8200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"30040 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 5.0, 22, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (369, 'Бассейн Лагуна 3.5 х 1.25 м (полная комплектация) арт. 35040 / 1 - дерево', 'basseyn-laguna-3-5-h-1-25-m-polnaya-komplektatsiya-art-35040-1-derevo', '35040 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 11.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Дерево</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3.5 x 1.25 • Бренд: Лагуна', 61875.00, 75000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"145\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"11200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"35040 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 4.4, 32, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (368, 'Бассейн Лагуна 4 х 1.25 м (полная комплектация) арт. 40040 / 1 - дерево', 'basseyn-laguna-4-h-1-25-m-polnaya-komplektatsiya-art-40040-1-derevo', '40040 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 14.7 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Дерево</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4 x 1.25 • Бренд: Лагуна', 66375.00, 78750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"150\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"14700\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"40040 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 4.4, 50, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (367, 'Бассейн Лагуна 4.5 х 1.25 м (полная комплектация) арт. 45040 / 1 - дерево', 'basseyn-laguna-4-5-h-1-25-m-polnaya-komplektatsiya-art-45040-1-derevo', '45040 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 18.6 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Дерево</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4.5 x 1.25 • Бренд: Лагуна', 74250.00, 86250.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"165\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"18600\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"45040 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 5.0, 40, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (366, 'Бассейн Лагуна 5 х 1.25 м (полная комплектация) арт. 50040 / 1 - дерево', 'basseyn-laguna-5-h-1-25-m-polnaya-komplektatsiya-art-50040-1-derevo', '50040 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 23 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Голубая</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5 x 1.25 • Бренд: Лагуна', 82125.00, 93750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"175\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"23000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"50040 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 4.0, 24, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (365, 'Бассейн Лагуна 5.5 х 1.25 м (полная комплектация) арт. 55040 / 1 - дерево', 'basseyn-laguna-5-5-h-1-25-m-polnaya-komplektatsiya-art-55040-1-derevo', '55040 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 27.9 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Дерево</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5.5 x 1.25 • Бренд: Лагуна', 89625.00, 105000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"215\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"27900\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"55040 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 4.2, 55, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (364, 'Бассейн Лагуна 4.5 х 1.25 м (полная комплектация) арт. 45014 / 2 - коричневый', 'basseyn-laguna-4-5-h-1-25-m-polnaya-komplektatsiya-art-45014-2-korichnevyy', '45014 / 2', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 18.6 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4.5 x 1.25 • Бренд: Лагуна', 78000.00, 90000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"165\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"18600\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"45014 / 2\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.6 мм\"}"', 4.1, 31, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (363, 'Бассейн Лагуна 5.5 х 1.25 м (полная комплектация) арт. 55014 / 2 - коричневый', 'basseyn-laguna-5-5-h-1-25-m-polnaya-komplektatsiya-art-55014-2-korichnevyy', '55014 / 2', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 27.9 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5.5 x 1.25 • Бренд: Лагуна', 95250.00, 108750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"215\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"27900\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"55014 / 2\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.6 мм\"}"', 4.1, 49, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (362, 'Бассейн Гигабасс 6 х 1.5 м, морозоустойчивый вкапываемый (полный комплект) арт. ТМ600-01 - платина', 'basseyn-gigabass-6-h-1-5-m-morozoustoychivyy-vkapyvaemyy-polnyy-komplekt-art-tm600-01-platina', 'ТМ600-01', '<p>Круглый сборно-каркасный морозоустойчивый бассейн Гигабасс от российского производителя отлично подойдет для дачных участков и помещений. Бассейны Гигабасс предназначены для вкапывания в грунт на произвольную глубину, минимальное заглубление от 0,5 м. Особенностью эксплуатации бассейна является то, что после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью. Фактически бассейны Гигабасс - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).</p>
<p>Конструктивно бассейны Гигабасс выполнены из ламинированной листовой стали толщиной 0,8 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0,6 мм.</p>
<p>Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.</p>
<p>Приобретая бассейн Гигабасс, вы совершаете выгодное вложение на долгие годы!</p>
<h3>В комплект поставки бассейна входит:</h3>
 <br>
<ul>
<li>Металлическая чаша (цвет платина 0.8 мм)</li>
<li>Внутренняя пленка ПВХ (цвет голубой 0.6 мм)</li>
<li>Песочный насос-фильтр для фильтрации воды INTEX - 10000 л/час</li>
<li>Cоединительные шланги 6 метров</li>
<li>Кварцевый песок 25кг - 3 шт</li>
<li>Лестница на 4 ступени (нержавеющая сталь)</li>
<li>Форсунка подачи воды</li>
<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
<li>Инструкция по сборке бассейна (на русском языке)</li>
</ul>', 'Размер: 6 x 1.5 • Бренд: Лагуна', 153750.00, 180000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"6\",\"Высота (м)\":\"1.5\",\"Вес (кг)\":\"380\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"39000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"10000\",\"Размер упаковки (см)\":\"160 х 120 х 60\",\"Артикул\":\"ТМ600-01\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.3, 34, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (361, 'Бассейн Гигабасс 5 х 1.5 м, морозоустойчивый вкапываемый (полный комплект) арт. ТМ599-01 - платина', 'basseyn-gigabass-5-h-1-5-m-morozoustoychivyy-vkapyvaemyy-polnyy-komplekt-art-tm599-01-platina', 'ТМ599-01', '<p>Круглый сборно-каркасный морозоустойчивый бассейн Гигабасс от российского производителя отлично подойдет для дачных участков и помещений. Бассейны Гигабасс предназначены для вкапывания в грунт на произвольную глубину, минимальное заглубление от 0,5 м. Особенностью эксплуатации бассейна является то, что после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью. Фактически бассейны Гигабасс - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).</p>
<p>Конструктивно бассейны Гигабасс выполнены из ламинированной листовой стали толщиной 0,8 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0,6 мм.</p>
<p>Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.</p>
<p>Приобретая бассейн Гигабасс, вы совершаете выгодное вложение на долгие годы!</p>
<h3>В комплект поставки бассейна входит:</h3>
 <br>
<ul>
<li>Металлическая чаша (цвет платина 0.8 мм)</li>
<li>Внутренняя пленка ПВХ (цвет голубой 0.6 мм)</li>
<li>Песочный насос-фильтр для фильтрации воды INTEX - 8000 л/час</li>
<li>Cоединительные шланги 6 метров</li>
<li>Кварцевый песок 25кг - 2 шт</li>
<li>Лестница на 4 ступени (нержавеющая сталь)</li>
<li>Форсунка подачи воды</li>
<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
<li>Инструкция по сборке бассейна (на русском языке)</li>
</ul>', 'Размер: 5 x 1.5 • Бренд: Лагуна', 129375.00, 150000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5\",\"Высота (м)\":\"1.5\",\"Вес (кг)\":\"305\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"27000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"160 х 60 х 60\",\"Артикул\":\"ТМ599-01\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.4, 5, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (360, 'Бассейн Гигабасс 4.5 х 1.5 м, морозоустойчивый вкапываемый (полный комплект) арт. ТМ598-01 - платина', 'basseyn-gigabass-4-5-h-1-5-m-morozoustoychivyy-vkapyvaemyy-polnyy-komplekt-art-tm598-01-platina', 'ТМ598-01', '<p>Круглый сборно-каркасный морозоустойчивый бассейн Гигабасс от российского производителя отлично подойдет для дачных участков и помещений. Бассейны Гигабасс предназначены для вкапывания в грунт на произвольную глубину, минимальное заглубление от 0,5 м. Особенностью эксплуатации бассейна является то, что после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью. Фактически бассейны Гигабасс - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).</p>
<p>Конструктивно бассейны Гигабасс выполнены из ламинированной листовой стали толщиной 0,8 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0,6 мм.</p>
<p>Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.</p>
<p>Приобретая бассейн Гигабасс, вы совершаете выгодное вложение на долгие годы!</p>
<h3>В комплект поставки бассейна входит:</h3>
 <br>
<ul>
<li>Металлическая чаша (цвет платина 0.8 мм)</li>
<li>Внутренняя пленка ПВХ (цвет голубой 0.6 мм)</li>
<li>Песочный насос-фильтр для фильтрации воды INTEX - 8000 л/час</li>
<li>Cоединительные шланги 6 метров</li>
<li>Кварцевый песок 25кг - 2 шт</li>
<li>Лестница на 4 ступени (нержавеющая сталь)</li>
<li>Форсунка подачи воды</li>
<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
<li>Инструкция по сборке бассейна (на русском языке)</li>
</ul>', 'Размер: 4.5 x 1.5 • Бренд: Лагуна', 115500.00, 135000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.5\",\"Высота (м)\":\"1.5\",\"Вес (кг)\":\"280\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"22000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"160 х 60 х 60\",\"Артикул\":\"ТМ598-01\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.4, 40, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (359, 'Бассейн Гигабасс 4 х 1.5 м, морозоустойчивый вкапываемый (полный комплект) арт. ТМ597-01 - платина', 'basseyn-gigabass-4-h-1-5-m-morozoustoychivyy-vkapyvaemyy-polnyy-komplekt-art-tm597-01-platina', 'ТМ597-01', '<p>
 Круглый сборно-каркасный морозоустойчивый бассейн Гигабасс от российского производителя отлично подойдет для дачных участков и помещений. Бассейны Гигабасс предназначены для вкапывания в грунт на произвольную глубину, минимальное заглубление от 0,5 м. Особенностью эксплуатации бассейна является то, что после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью. Фактически бассейны Гигабасс - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).
</p>
<p>
 Конструктивно бассейны Гигабасс выполнены из ламинированной листовой стали толщиной 0,8 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0,6 мм.
</p>
<p>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.
</p>
<p>
 Приобретая бассейн Гигабасс, вы совершаете выгодное вложение на долгие годы!
</p>
<h3>В комплект поставки бассейна входит:</h3>
 <br>
<ul>
	<li>Металлическая чаша (цвет платина 0.8 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.6 мм)</li>
	<li>Песочный насос-фильтр для фильтрации воды INTEX - 8000 л/час</li>
	<li>Cоединительные шланги 6 метров</li>
	<li>Кварцевый песок 25кг - 2 шт</li>
	<li>Лестница на 4 ступени (нержавеющая сталь)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
	<li>Инструкция по сборке бассейна (на русском языке)</li>
</ul>', 'Размер: 4 x 1.5 • Бренд: Лагуна', 103500.00, 120000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.5\",\"Вес (кг)\":\"260\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"17200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"160 х 60 х 60\",\"Артикул\":\"ТМ597-01\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.4, 26, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (358, 'Бассейн Гигабасс 3.5 х 1.5 м, морозоустойчивый вкапываемый (полный комплект) арт. ТМ596-01 - платина', 'basseyn-gigabass-3-5-h-1-5-m-morozoustoychivyy-vkapyvaemyy-polnyy-komplekt-art-tm596-01-platina', 'ТМ596-01', '<p>
 Круглый сборно-каркасный морозоустойчивый бассейн Гигабасс от российского производителя отлично подойдет для дачных участков и помещений. Бассейны Гигабасс предназначены для вкапывания в грунт на произвольную глубину, минимальное заглубление от 0,5 м. Особенностью эксплуатации бассейна является то, что после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью. Фактически бассейны Гигабасс - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).
</p>
<p>
 Конструктивно бассейны Гигабасс выполнены из ламинированной листовой стали толщиной 0,8 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0,6 мм.
</p>
<p>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.
</p>
<p>
 Приобретая бассейн Гигабасс, вы совершаете выгодное вложение на долгие годы!
</p>
<h3>В комплект поставки бассейна входит:</h3>
 <br>
<ul>
	<li>Металлическая чаша (цвет платина 0.8 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.6 мм)</li>
	<li>Песочный насос-фильтр для фильтрации воды INTEX - 6000 л/час</li>
	<li>Cоединительные шланги 6 метров</li>
	<li>Кварцевый песок 25кг </li>
	<li>Лестница на 4 ступени (нержавеющая сталь)</li>
	<li>Форсунка подачи воды</li>
	<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
	<li>Инструкция по сборке бассейна (на русском языке)</li>
</ul>', 'Размер: 3.5 x 1.5 • Бренд: Лагуна', 93000.00, 112500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.5\",\"Вес (кг)\":\"205\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"13200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"160 х 60 х 60\",\"Артикул\":\"ТМ596-01\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.5, 25, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (357, 'Бассейн Гигабасс 3 х 1.5 м, морозоустойчивый вкапываемый (полный комплект) арт. ТМ595-01 - платина', 'basseyn-gigabass-3-h-1-5-m-morozoustoychivyy-vkapyvaemyy-polnyy-komplekt-art-tm595-01-platina', 'ТМ595-01', '<p>Круглый сборно-каркасный морозоустойчивый бассейн Гигабасс от российского производителя отлично подойдет для дачных участков и помещений. Бассейны Гигабасс предназначены для вкапывания в грунт на произвольную глубину, минимальное заглубление от 0,5 м. Особенностью эксплуатации бассейна является то, что после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью. Фактически бассейны Гигабасс - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).</p>
<p>Конструктивно бассейны Гигабасс выполнены из ламинированной листовой стали толщиной 0,8 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0,6 мм.</p>
<p>Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.</p>
<p>Приобретая бассейн Гигабасс, вы совершаете выгодное вложение на долгие годы!</p>
<h3>В комплект поставки бассейна входит:</h3>
 <br>
<ul>
<li>Металлическая чаша (цвет платина 0.8 мм)</li>
<li>Внутренняя пленка ПВХ (цвет голубой 0.6 мм)</li>
<li>Песочный насос-фильтр для фильтрации воды INTEX - 6000 л/час</li>
<li>Cоединительные шланги 6 метров</li>
<li>Кварцевый песок 25кг </li>
<li>Лестница на 4 ступени (нержавеющая сталь)</li>
<li>Форсунка подачи воды</li>
<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
<li>Инструкция по сборке бассейна (на русском языке)</li>
</ul>', 'Размер: 3 x 1.5 • Бренд: Лагуна', 80625.00, 97500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.5\",\"Вес (кг)\":\"190\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"9700\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"160 х 60 х 60\",\"Артикул\":\"ТМ595-01\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.4, 14, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (356, 'Бассейн Лагуна 3.5 х 1.25 м (полная комплектация) арт. 35012 / 2 - платина', 'basseyn-laguna-3-5-h-1-25-m-polnaya-komplektatsiya-art-35012-2-platina', '35012 / 2', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 11.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3.5 x 1.25 • Бренд: Лагуна', 63375.00, 73500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"145\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"11200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"35012 / 2\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.6 мм\"}"', 5.0, 53, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (355, 'Бассейн Лагуна 4 х 1.25 м (полная комплектация) арт. 40012 / 2 - платина', 'basseyn-laguna-4-h-1-25-m-polnaya-komplektatsiya-art-40012-2-platina', '40012 / 2', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 14.7 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Платина</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4 x 1.25 • Бренд: Лагуна', 68625.00, 78750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"150\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"14700\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"40012 / 2\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.6 мм\"}"', 4.6, 3, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (354, 'Бассейн Лагуна 4.5 х 1.25 м (полная комплектация) арт. 45012 / 2 - платина', 'basseyn-laguna-4-5-h-1-25-m-polnaya-komplektatsiya-art-45012-2-platina', '45012 / 2', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 18.6 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Платина</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4.5 x 1.25 • Бренд: Лагуна', 78000.00, 84000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"165\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"18600\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"45012 / 2\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.6 мм\"}"', 4.8, 22, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (353, 'Бассейн Лагуна 5.5 х 1.25 м (полная комплектация) арт. 55012 / 2 - платина', 'basseyn-laguna-5-5-h-1-25-m-polnaya-komplektatsiya-art-55012-2-platina', '55012 / 2', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 27.9 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : платина</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5.5 x 1.25 • Бренд: Лагуна', 95250.00, 103500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"215\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"27900\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"55012 / 2\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.6 мм\"}"', 4.2, 51, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (352, 'Бассейн Лагуна 3.5 х 1.25 м (полная комплектация) арт. 35040 / 2 - дерево', 'basseyn-laguna-3-5-h-1-25-m-polnaya-komplektatsiya-art-35040-2-derevo', '35040 / 2', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 11.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Дерево</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3.5 x 1.25 • Бренд: Лагуна', 67500.00, 77250.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"145\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"11200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"35040 / 2\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.6 мм\"}"', 4.4, 26, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (351, 'Бассейн Лагуна 4 х 1.25 м (полная комплектация) арт. 40040 / 2 - дерево', 'basseyn-laguna-4-h-1-25-m-polnaya-komplektatsiya-art-40040-2-derevo', '40040 / 2', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 14.7 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Дерево</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4 x 1.25 • Бренд: Лагуна', 73125.00, 82500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"150\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"14700\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"40040 / 2\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.6 мм\"}"', 4.7, 9, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (350, 'Бассейн Лагуна 3 х 1.25 м (полная комплектация) арт. 30014 / 3 - коричневый', 'basseyn-laguna-3-h-1-25-m-polnaya-komplektatsiya-art-30014-3-korichnevyy', '30014 / 3', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 8.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3 x 1.25 • Бренд: Лагуна', 55875.00, 63750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"130\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"8200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"30014 / 3\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.6 мм\"}"', 4.1, 19, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (349, 'Бассейн Лагуна 3.5 х 1.25 м (полная комплектация) арт. 35014 / 3 - коричневый', 'basseyn-laguna-3-5-h-1-25-m-polnaya-komplektatsiya-art-35014-3-korichnevyy', '35014 / 3', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 11.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3.5 x 1.25 • Бренд: Лагуна', 63375.00, 73500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"145\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"11200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"35014 / 3\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.6 мм\"}"', 4.6, 25, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (348, 'Бассейн Лагуна 4 х 1.25 м (полная комплектация) арт. 40014 / 3 - коричневый', 'basseyn-laguna-4-h-1-25-m-polnaya-komplektatsiya-art-40014-3-korichnevyy', '40014 / 3', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 14.7 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4 x 1.25 • Бренд: Лагуна', 68625.00, 78750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"150\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"14700\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"40014 / 3\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.6 мм\"}"', 4.3, 54, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (347, 'Бассейн Лагуна 4.5 х 1.25 м (полная комплектация) арт. 45014 / 3 - коричневый', 'basseyn-laguna-4-5-h-1-25-m-polnaya-komplektatsiya-art-45014-3-korichnevyy', '45014 / 3', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 18.6 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4.5 x 1.25 • Бренд: Лагуна', 78000.00, 90000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"165\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"18600\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"45014 / 3\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.6 мм\"}"', 5.0, 60, true, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (346, 'Бассейн Лагуна 5 х 1.25 м (полная комплектация) арт. 50014 / 3 - коричневый', 'basseyn-laguna-5-h-1-25-m-polnaya-komplektatsiya-art-50014-3-korichnevyy', '50014 / 3', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 23 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5 x 1.25 • Бренд: Лагуна', 86625.00, 97500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"175\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"23000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"50014 / 3\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.6 мм\"}"', 4.3, 38, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (345, 'Бассейн Лагуна 5.5 х 1.25 м (полная комплектация) арт. 55014 / 3 - коричневый', 'basseyn-laguna-5-5-h-1-25-m-polnaya-komplektatsiya-art-55014-3-korichnevyy', '55014 / 3', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 27.9 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5.5 x 1.25 • Бренд: Лагуна', 95250.00, 108750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"215\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"27900\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"55014 / 3\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.6 мм\"}"', 4.4, 55, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (344, 'Бассейн Лагуна 3 х 1.25 м (полная комплектация) арт. 30012 / 3 - платина', 'basseyn-laguna-3-h-1-25-m-polnaya-komplektatsiya-art-30012-3-platina', '30012 / 3', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 8.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3 x 1.25 • Бренд: Лагуна', 55875.00, 63750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"130\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"8200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"30012 / 3\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.6 мм\"}"', 4.7, 54, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (343, 'Бассейн Лагуна 3.5 х 1.25 м (полная комплектация) арт. 35012 / 3 - платина', 'basseyn-laguna-3-5-h-1-25-m-polnaya-komplektatsiya-art-35012-3-platina', '35012 / 3', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 11.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3.5 x 1.25 • Бренд: Лагуна', 63375.00, 73500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"145\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"11200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"35012 / 3\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.6 мм\"}"', 4.1, 41, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (342, 'Бассейн Лагуна 4 х 1.25 м (полная комплектация) арт. 40012 / 3 - платина', 'basseyn-laguna-4-h-1-25-m-polnaya-komplektatsiya-art-40012-3-platina', '40012 / 3', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 14.7 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : Платина</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4 x 1.25 • Бренд: Лагуна', 68625.00, 78750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"150\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"14700\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"40012 / 3\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.6 мм\"}"', 4.1, 7, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (341, 'Бассейн Лагуна 4.5 х 1.25 м (полная комплектация) арт. 45012 / 3 - платина', 'basseyn-laguna-4-5-h-1-25-m-polnaya-komplektatsiya-art-45012-3-platina', '45012 / 3', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 18.6 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Платина</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4.5 x 1.25 • Бренд: Лагуна', 78000.00, 84000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"165\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"18600\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"45012 / 3\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.6 мм\"}"', 5.0, 5, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (340, 'Бассейн Лагуна 5.5 х 1.25 м (полная комплектация) арт. 55012 / 3 - платина', 'basseyn-laguna-5-5-h-1-25-m-polnaya-komplektatsiya-art-55012-3-platina', '55012 / 3', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 27.9 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: платина</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5.5 x 1.25 • Бренд: Лагуна', 95250.00, 103500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"215\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"27900\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"55012 / 3\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.6 мм\"}"', 4.0, 16, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (339, 'Бассейн Лагуна 3 х 1.25 м (полная комплектация) арт. 30040 / 3 - дерево', 'basseyn-laguna-3-h-1-25-m-polnaya-komplektatsiya-art-30040-3-derevo', '30040 / 3', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 8.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Дерево</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3 x 1.25 • Бренд: Лагуна', 59625.00, 69000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"130\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"8200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"30040 / 3\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.6 мм\"}"', 4.3, 52, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (338, 'Бассейн Лагуна 3.5 х 1.25 м (полная комплектация) арт. 35040 / 3 - дерево', 'basseyn-laguna-3-5-h-1-25-m-polnaya-komplektatsiya-art-35040-3-derevo', '35040 / 3', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 11.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Дерево</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3.5 x 1.25 • Бренд: Лагуна', 67500.00, 77250.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"145\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"11200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"35040 / 3\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.6 мм\"}"', 4.4, 58, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (337, 'Бассейн Лагуна 4 х 1.25 м (полная комплектация) арт. 40040 / 3 - дерево', 'basseyn-laguna-4-h-1-25-m-polnaya-komplektatsiya-art-40040-3-derevo', '40040 / 3', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 14.7 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Дерево</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4 x 1.25 • Бренд: Лагуна', 73125.00, 75000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"150\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"14700\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"40040 / 3\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.6 мм\"}"', 4.2, 14, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (336, 'Бассейн Лагуна 5 х 1.25 м (полная комплектация) арт. 50040 / 3 - дерево', 'basseyn-laguna-5-h-1-25-m-polnaya-komplektatsiya-art-50040-3-derevo', '50040 / 3', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 23 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: Голубая</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.6 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5 x 1.25 • Бренд: Лагуна', 91875.00, 99000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"175\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"23000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"50040 / 3\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.6 мм\"}"', 4.0, 50, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (335, 'Бассейн Лагуна 6 х 4 х 1.25 м, морозоустойчивый (скиммер+форсунка) арт. 60040001', 'basseyn-laguna-6-h-4-h-1-25-m-morozoustoychivyy-skimmer-forsunka-art-60040001', '60040001', '<h2>Морозоустойчивый бассейн Лагуна овальный</h2>
<p>
 ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.<br>
 <br>
 Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину. Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) .<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0,5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки от 0,4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
</p>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>
	Форма: овал</li>
	<li>
	Размер: 6 х 4 х 1.25 м</li>
	<li>
	Глубина: 1.25 м</li>
	<li>
	Объем: 24.14 куб.м</li>
	<li>
	Морозоустойчивость: да</li>
	<li>
	Фильтр в комплекте: нет</li>
	<li>
	Лестница в комплекте: нет</li>
	<li>
	Установка на поверхности: да</li>
	<li>
	Заглубление в грунт: да</li>
	<li>
	Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>
	Толщина каркаса: 0.5 мм</li>
	<li>
	Цвет каркаса: коричневый</li>
	<li>
	Материал пакета: ПВХ </li>
	<li>
	Толщина пакета: 0.4/0.4 мм</li>
	<li>
	Цвет пакета: мрамор</li>
</ul>
<p>
 Размеры и вес в упакованном виде
</p>
<ul>
	<li>
	Вес 120 кг</li>
	<li>
	Ширина 410 мм</li>
	<li>
	Длина 410 мм</li>
	<li>
	Высота 1370 мм</li>
</ul>', 'Размер: 6 x 4 x 1.25 • Бренд: Лагуна', 74625.00, 86250.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"6\",\"Ширина (м)\":\"4\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"120\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"24140\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"41 х 41 х 137\",\"Артикул\":\"60040001\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 5.0, 64, true, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (334, 'Бассейн Лагуна 6 х 3.5 х 1.25 м, морозоустойчивый (скиммер+форсунка) арт. 60035001', 'basseyn-laguna-6-h-3-5-h-1-25-m-morozoustoychivyy-skimmer-forsunka-art-60035001', '60035001', '<h2>Морозоустойчивый бассейн Лагуна овальный</h2>
<p>
 ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.<br>
 <br>
 Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину. Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) .<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0,5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки от 0,4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
</p>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>
	Форма: овал</li>
	<li>
	Размер: 6 х 3.5 х 1.25 м</li>
	<li>
	Глубина: 1.25 м</li>
	<li>
	Объем: 21.53 куб.м</li>
	<li>
	Морозоустойчивость: да</li>
	<li>
	Фильтр в комплекте: нет</li>
	<li>
	Лестница в комплекте: нет</li>
	<li>
	Установка на поверхности: да</li>
	<li>
	Заглубление в грунт: да</li>
	<li>
	Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>
	Толщина каркаса: 0.5 мм</li>
	<li>
	Цвет каркаса: коричневый</li>
	<li>
	Материал пакета: ПВХ </li>
	<li>
	Толщина пакета: 0.4/0.4 мм</li>
	<li>
	Цвет пакета: мрамор</li>
</ul>
<p>
 Размеры и вес в упакованном виде
</p>
<ul>
	<li>
	Вес 114 кг</li>
	<li>
	Ширина 410 мм</li>
	<li>
	Длина 410 мм</li>
	<li>
	Высота 1370 мм</li>
</ul>', 'Размер: 6 x 3.5 x 1.25 • Бренд: Лагуна', 72750.00, 82500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"6\",\"Ширина (м)\":\"3.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"114\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"21530\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"41 х 41 х 137\",\"Артикул\":\"60035001\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.1, 62, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (333, 'Бассейн Лагуна 6 х 3 х 1.25 м, морозоустойчивый (скиммер+форсунка) арт. 60030001', 'basseyn-laguna-6-h-3-h-1-25-m-morozoustoychivyy-skimmer-forsunka-art-60030001', '60030001', '<h2>Морозоустойчивый бассейн Лагуна овальный</h2>
<p>
 ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.<br>
 <br>
 Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину. Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) .<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0,5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки от 0,4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
</p>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>
	Форма: овал</li>
	<li>
	Размер: 6 х 3 х 1.25 м</li>
	<li>
	Глубина: 1.25 м</li>
	<li>
	Объем: 18.82 куб.м</li>
	<li>
	Морозоустойчивость: да</li>
	<li>
	Фильтр в комплекте: нет</li>
	<li>
	Лестница в комплекте: нет</li>
	<li>
	Установка на поверхности: да</li>
	<li>
	Заглубление в грунт: да</li>
	<li>
	Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>
	Толщина каркаса: 0.5 мм</li>
	<li>
	Цвет каркаса: коричневый</li>
	<li>
	Материал пакета: ПВХ </li>
	<li>
	Толщина пакета: 0.4/0.4</li>
	<li>
	Цвет пакета: мрамор</li>
</ul>
<p>
 Размеры и вес в упакованном виде
</p>
<ul>
	<li>
	Вес 110 кг</li>
	<li>
	Ширина 410 мм</li>
	<li>
	Длина 410 мм</li>
	<li>
	Высота 1370 мм</li>
</ul>', 'Размер: 6 x 3 x 1.25 • Бренд: Лагуна', 70125.00, 78750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"6\",\"Ширина (м)\":\"3\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"110\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"18820\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"41 х 41 х 137\",\"Артикул\":\"60030001\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.0, 10, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (332, 'Бассейн Лагуна 5 х 3 х 1.25 м, морозоустойчивый (скиммер+форсунка) арт. 50030001', 'basseyn-laguna-5-h-3-h-1-25-m-morozoustoychivyy-skimmer-forsunka-art-50030001', '50030001', '<h2>Морозоустойчивый бассейн Лагуна овальный</h2>
<p>
 ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.<br>
 <br>
 Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину. Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) .<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0,5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки от 0,4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
</p>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>
	Форма: овал</li>
	<li>
	Размер: 5 х 3 х 1.25 м</li>
	<li>
	Глубина: 1.25 м</li>
	<li>
	Объем: 15.28 куб.м</li>
	<li>
	Морозоустойчивость: да</li>
	<li>
	Фильтр в комплекте: нет</li>
	<li>
	Лестница в комплекте: нет</li>
	<li>
	Установка на поверхности: да</li>
	<li>
	Заглубление в грунт: да</li>
	<li>
	Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>
	Толщина каркаса: 0.5 мм</li>
	<li>
	Цвет каркаса: коричневый</li>
	<li>
	Материал пакета: ПВХ </li>
	<li>
	Толщина пакета: 0.4/0.4</li>
	<li>
	Цвет пакета: мрамор</li>
</ul>
<p>
 Размеры и вес в упакованном виде
</p>
<ul>
	<li>
	Вес 95 кг</li>
	<li>
	Ширина 410 мм</li>
	<li>
	Длина 410 мм</li>
	<li>
	Высота 1370 мм</li>
</ul>', 'Размер: 5 x 3 x 1.25 • Бренд: Лагуна', 59625.00, 71250.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"5\",\"Ширина (м)\":\"3\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"95\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"15280\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"41 х 41 х 137\",\"Артикул\":\"50030001\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.3, 52, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (331, 'Бассейн Лагуна 5 х 2.5 х 1.25 м, морозоустойчивый (скиммер+форсунка) арт. 50025001', 'basseyn-laguna-5-h-2-5-h-1-25-m-morozoustoychivyy-skimmer-forsunka-art-50025001', '50025001', '<h2>Морозоустойчивый бассейн Лагуна овальный</h2>
<p>
 ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.<br>
 <br>
 Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину. Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) .<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0,5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки от 0,4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
</p>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>
	Форма: овал</li>
	<li>
	Размер: 5 х 2.5 х 1.25 м</li>
	<li>
	Глубина: 1.25 м</li>
	<li>
	Объем: 12.1 куб.м</li>
	<li>
	Морозоустойчивость: да</li>
	<li>
	Фильтр в комплекте: нет</li>
	<li>
	Лестница в комплекте: нет</li>
	<li>
	Установка на поверхности: да</li>
	<li>
	Заглубление в грунт: да</li>
	<li>
	Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>
	Толщина каркаса: 0.5 мм</li>
	<li>
	Цвет каркаса: коричневый</li>
	<li>
	Материал пакета: ПВХ </li>
	<li>
	Толщина пакета: 0.4/0.4</li>
	<li>
	Цвет пакета: мрамор</li>
</ul>
<p>
 Размеры и вес в упакованном виде
</p>
<ul>
	<li>
	Вес 92 кг</li>
	<li>
	Ширина 410 мм</li>
	<li>
	Длина 410 мм</li>
	<li>
	Высота 1370 мм</li>
</ul>', 'Размер: 5 x 2.5 x 1.25 • Бренд: Лагуна', 57375.00, 67500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"5\",\"Ширина (м)\":\"2.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"92\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"12100\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"41 х 41 х 137\",\"Артикул\":\"50025001\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 5.0, 15, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (330, 'Бассейн Лагуна 4 х 3 х 1.25 м, морозоустойчивый (скиммер+форсунка) арт. 40030001', 'basseyn-laguna-4-h-3-h-1-25-m-morozoustoychivyy-skimmer-forsunka-art-40030001', '40030001', '<h2>Морозоустойчивый бассейн Лагуна овальный</h2>
<p>
 ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.<br>
 <br>
 Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину. Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) .<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0,5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки от 0,4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
</p>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>
	Форма: овал</li>
	<li>
	Размер: 4 х 3 х 1.25 м</li>
	<li>
	Глубина: 1.25 м</li>
	<li>
	Объем: 11.74 куб.м</li>
	<li>
	Морозоустойчивость: да</li>
	<li>
	Фильтр в комплекте: нет</li>
	<li>
	Лестница в комплекте: нет</li>
	<li>
	Установка на поверхности: да</li>
	<li>
	Заглубление в грунт: да</li>
	<li>
	Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>
	Толщина каркаса: 0.5 мм</li>
	<li>
	Цвет каркаса: коричневый</li>
	<li>
	Материал пакета: ПВХ </li>
	<li>
	Толщина пакета: 0.4/0.4 мм</li>
	<li>
	Цвет пакета: мрамор</li>
</ul>
<p>
 Размеры и вес в упакованном виде
</p>
<ul>
	<li>
	Вес 81 кг</li>
	<li>
	Ширина 410 мм</li>
	<li>
	Длина 410 мм</li>
	<li>
	Высота 1370 мм</li>
</ul>', 'Размер: 4 x 3 x 1.25 • Бренд: Лагуна', 52500.00, 63750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"4\",\"Ширина (м)\":\"3\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"81\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"8200\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"41 х 41 х 137\",\"Артикул\":\"40030001\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.6, 23, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (329, 'Бассейн Лагуна 4 х 2 х 1.25 м, морозоустойчивый (скиммер+форсунка) арт. 40020001', 'basseyn-laguna-4-h-2-h-1-25-m-morozoustoychivyy-skimmer-forsunka-art-40020001', '40020001', '<h2>Морозоустойчивый бассейн Лагуна овальный</h2>
<p>
 ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.<br>
 <br>
 Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину. Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) .<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0,5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки от 0,4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
</p>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>
	Форма: овал</li>
	<li>
	Размер: 4 х 2 х 1.25 м</li>
	<li>
	Глубина: 1.25 м</li>
	<li>
	Объем: 8.2 куб.м</li>
	<li>
	Морозоустойчивость: да</li>
	<li>
	Фильтр в комплекте: нет</li>
	<li>
	Лестница в комплекте: нет</li>
	<li>
	Установка на поверхности: да</li>
	<li>
	Заглубление в грунт: да</li>
	<li>
	Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>
	Толщина каркаса: 0.5 мм</li>
	<li>
	Цвет каркаса: коричневый</li>
	<li>
	Материал пакета: ПВХ </li>
	<li>
	Толщина пакета: 0.4/0.4</li>
	<li>
	Цвет пакета: мрамор</li>
</ul>
<p>
 Размеры и вес в упакованном виде
</p>
<ul>
	<li>
	Вес 77 кг</li>
	<li>
	Ширина 410 мм</li>
	<li>
	Длина 410 мм</li>
	<li>
	Высота 1370 мм</li>
</ul>', 'Размер: 4 x 2 x 1.25 • Бренд: Лагуна', 47250.00, 56250.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"4\",\"Ширина (м)\":\"2\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"77\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"8200\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"41 х 41 х 137\",\"Артикул\":\"40020001\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.1, 7, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (328, 'Бассейн Лагуна 3 х 2 х 1.25 м, морозоустойчивый (скиммер+форсунка) арт. 30020001', 'basseyn-laguna-3-h-2-h-1-25-m-morozoustoychivyy-skimmer-forsunka-art-30020001', '30020001', '<h2>Морозоустойчивый бассейн Лагуна овальный</h2>
<p>
 ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.<br>
 <br>
 Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину. Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) .<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0,5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки от 0,4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
</p>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>
	Форма: овал</li>
	<li>
	Размер: 3 х 2 х 1.25 м</li>
	<li>
	Глубина: 1.25 м</li>
	<li>
	Объем: 6 куб.м</li>
	<li>
	Морозоустойчивость: да</li>
	<li>
	Фильтр в комплекте: нет</li>
	<li>
	Лестница в комплекте: нет</li>
	<li>
	Установка на поверхности: да</li>
	<li>
	Заглубление в грунт: да</li>
	<li>
	Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>
	Толщина каркаса: 0.5 мм</li>
	<li>
	Цвет каркаса: коричневый</li>
	<li>
	Материал пакета: ПВХ </li>
	<li>
	Толщина пакета: 0.4/0.4 мм</li>
	<li>
	Цвет пакета: мрамор</li>
</ul>
<p>
 Размеры и вес в упакованном виде
</p>
<ul>
	<li>
	Вес 62 кг</li>
	<li>
	Ширина 410 мм</li>
	<li>
	Длина 410 мм</li>
	<li>
	Высота 1370 мм</li>
</ul>', 'Размер: 3 x 2 x 1.25 • Бренд: Лагуна', 39000.00, 48750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"3\",\"Ширина (м)\":\"2\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"62\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"6000\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"41 х 41 х 137\",\"Артикул\":\"30020001\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.0, 24, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (327, 'Бассейн Гигабасс 8 х 3 х 1.5 м, морозоустойчивый вкапываемый (скиммер+форсунка) арт. ТМ876 - платина', 'basseyn-gigabass-8-h-3-h-1-5-m-morozoustoychivyy-vkapyvaemyy-skimmer-forsunka-art-tm876-platina', 'ТМ876', '<p>ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.</p>

<p>Бассейны Гигабасс предназначены для вкапывания в грунт на произвольную глубину, минимальное заглубление от 0,5 м. у каждой модели бассейна свои требования.
Особенностью эксплуатации бассейна является то, что после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.</p>

<p>Фактически бассейны Гигабасс - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) .
Конструктивно бассейны Гигабасс выполнены из ламинированной листовой стали толщиной 0,8 мм и чашкового ПВХ пакета с толщиной 0,6 мм. и ( 0,7 мм армированный )
Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.
Приобретая бассейн Гигабасс, вы совершаете выгодное вложение на долгие годы!</p>

<h3>В комплект поставки бассейна входит:</h3>
 <br>
<ul>
<li>Металлическая чаша (цвет платина 0.8 мм)</li>
<li>Внутренняя пленка ПВХ (цвет голубой 0.6 мм)</li>
<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды) - 2 шт</li>
<li>Форсунка подачи воды</li>
<li>Набор соединительных элементов (крепеж, декор) </li>
<li>Верхний и нижний профиль ПВХ</li>
<li>Инструкция для круглого бассейна</li>
</ul>', 'Размер: 8 x 3 x 1.5 • Бренд: Лагуна', 150000.00, 172500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"8\",\"Ширина (м)\":\"3\",\"Высота (м)\":\"1.5\",\"Вес (кг)\":\"269\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"30400\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"160 х 120 х 60\",\"Артикул\":\"ТМ876\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.2, 25, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (326, 'Бассейн Гигабасс 6 х 3 х 1.5 м, морозоустойчивый вкапываемый (скиммер+форсунка) арт. ТМ606 - платина', 'basseyn-gigabass-6-h-3-h-1-5-m-morozoustoychivyy-vkapyvaemyy-skimmer-forsunka-art-tm606-platina', 'ТМ606', '<p>ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.</p>

<p>Бассейны Гигабасс предназначены для вкапывания в грунт на произвольную глубину, минимальное заглубление от 0,5 м. у каждой модели бассейна свои требования.
Особенностью эксплуатации бассейна является то, что после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.</p>

<p>Фактически бассейны Гигабасс - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) .
Конструктивно бассейны Гигабасс выполнены из ламинированной листовой стали толщиной 0,8 мм и чашкового ПВХ пакета с толщиной 0,6 мм. и ( 0,7 мм армированный )
Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.
Приобретая бассейн Гигабасс, вы совершаете выгодное вложение на долгие годы!</p>

<h3>В комплект поставки бассейна входит:</h3>
 <br>
<ul>
<li>Металлическая чаша (цвет платина 0.8 мм)</li>
<li>Внутренняя пленка ПВХ (цвет голубой 0.6 мм)</li>
<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды) - 2 шт</li>
<li>Форсунка подачи воды</li>
<li>Набор соединительных элементов (крепеж, декор) </li>
<li>Верхний и нижний профиль ПВХ</li>
<li>Инструкция для круглого бассейна</li>
</ul>', 'Размер: 6 x 3 x 1.5 • Бренд: Лагуна', 120750.00, 135000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"6\",\"Ширина (м)\":\"3\",\"Высота (м)\":\"1.5\",\"Вес (кг)\":\"207\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"22000\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"160 х 60 х 60\",\"Артикул\":\"ТМ606\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.8, 41, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (325, 'Бассейн Гигабасс 5 х 3 х 1.5 м, морозоустойчивый вкапываемый (скиммер+форсунка) арт. ТМ605 - платина', 'basseyn-gigabass-5-h-3-h-1-5-m-morozoustoychivyy-vkapyvaemyy-skimmer-forsunka-art-tm605-platina', 'ТМ605', '<p>
 ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.
</p>
<p>
 Бассейны Гигабасс предназначены для вкапывания в грунт на произвольную глубину, минимальное заглубление от 0,5 м. у каждой модели бассейна свои требования. Особенностью эксплуатации бассейна является то, что после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.
</p>
<p>
 Фактически бассейны Гигабасс - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) . Конструктивно бассейны Гигабасс выполнены из ламинированной листовой стали толщиной 0,8 мм и чашкового ПВХ пакета с толщиной 0,6 мм. и ( 0,7 мм армированный ) Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна. Приобретая бассейн Гигабасс, вы совершаете выгодное вложение на долгие годы!
</p>
<h3>В комплект поставки бассейна входит:</h3>
 <br>
<ul>
	<li>Металлическая чаша (цвет платина 0.8 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.6 мм)</li>
	<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
	<li>Форсунка подачи воды</li>
	<li>Набор соединительных элементов (крепеж, декор) </li>
	<li>Верхний и нижний профиль ПВХ</li>
	<li>Инструкция для круглого бассейна</li>
</ul>', 'Размер: 5 x 3 x 1.5 • Бренд: Лагуна', 108375.00, 120000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"5\",\"Ширина (м)\":\"3\",\"Высота (м)\":\"1.5\",\"Вес (кг)\":\"180\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"17900\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"160 x 60 x 60\",\"Артикул\":\"ТМ605\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.8, 34, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (324, 'Бассейн Гигабасс 5 х 2 х 1.5 м, морозоустойчивый вкапываемый (скиммер+форсунка) арт. ТМ871 - платина', 'basseyn-gigabass-5-h-2-h-1-5-m-morozoustoychivyy-vkapyvaemyy-skimmer-forsunka-art-tm871-platina', 'ТМ871', '<p>ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.</p>

<p>Бассейны Гигабасс предназначены для вкапывания в грунт на произвольную глубину, минимальное заглубление от 0,5 м. у каждой модели бассейна свои требования.
Особенностью эксплуатации бассейна является то, что после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.</p>

<p>Фактически бассейны Гигабасс - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) .
Конструктивно бассейны Гигабасс выполнены из ламинированной листовой стали толщиной 0,8 мм и чашкового ПВХ пакета с толщиной 0,6 мм. и ( 0,7 мм армированный )
Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.
Приобретая бассейн Гигабасс, вы совершаете выгодное вложение на долгие годы!</p>

<h3>В комплект поставки бассейна входит:</h3>
 <br>
<ul>
<li>Металлическая чаша (цвет платина 0.8 мм)</li>
<li>Внутренняя пленка ПВХ (цвет голубой 0.6 мм)</li>
<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
<li>Форсунка подачи воды</li>
<li>Набор соединительных элементов (крепеж, декор) </li>
<li>Верхний и нижний профиль ПВХ</li>
<li>Инструкция для круглого бассейна</li>
</ul>', 'Размер: 5 x 2 x 1.5 • Бренд: Лагуна', 90000.00, 101250.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"5\",\"Ширина (м)\":\"2\",\"Высота (м)\":\"1.5\",\"Вес (кг)\":\"167\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"12600\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"160 х 60 х 60\",\"Артикул\":\"ТМ871\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.2, 47, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (323, 'Бассейн Гигабасс 4 х 3 х 1.5 м, морозоустойчивый вкапываемый (скиммер+форсунка) арт. ТМ870 - платина', 'basseyn-gigabass-4-h-3-h-1-5-m-morozoustoychivyy-vkapyvaemyy-skimmer-forsunka-art-tm870-platina', 'ТМ870', '<p>ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.</p>

<p>Бассейны Гигабасс предназначены для вкапывания в грунт на произвольную глубину, минимальное заглубление от 0,5 м. у каждой модели бассейна свои требования.
Особенностью эксплуатации бассейна является то, что после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.</p>

<p>Фактически бассейны Гигабасс - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) .
Конструктивно бассейны Гигабасс выполнены из ламинированной листовой стали толщиной 0,8 мм и чашкового ПВХ пакета с толщиной 0,6 мм. и ( 0,7 мм армированный )
Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.
Приобретая бассейн Гигабасс, вы совершаете выгодное вложение на долгие годы!</p>

<h3>В комплект поставки бассейна входит:</h3>
 <br>
<ul>
<li>Металлическая чаша (цвет платина 0.8 мм)</li>
<li>Внутренняя пленка ПВХ (цвет голубой 0.6 мм)</li>
<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
<li>Форсунка подачи воды</li>
<li>Набор соединительных элементов (крепеж, декор) </li>
<li>Верхний и нижний профиль ПВХ</li>
<li>Инструкция для круглого бассейна</li>
</ul>', 'Размер: 4 x 3 x 1.5 • Бренд: Лагуна', 83250.00, 97500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"4\",\"Ширина (м)\":\"3\",\"Высота (м)\":\"1.5\",\"Вес (кг)\":\"158\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"13800\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"160 х 60 х 60\",\"Артикул\":\"ТМ870\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.6, 30, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (322, 'Бассейн Гигабасс 4 х 2 х 1.5 м, морозоустойчивый вкапываемый (скиммер+форсунка) арт. ТМ869 - платина', 'basseyn-gigabass-4-h-2-h-1-5-m-morozoustoychivyy-vkapyvaemyy-skimmer-forsunka-art-tm869-platina', 'ТМ869', '<p>ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.</p>

<p>Бассейны Гигабасс предназначены для вкапывания в грунт на произвольную глубину, минимальное заглубление от 0,5 м. у каждой модели бассейна свои требования.
Особенностью эксплуатации бассейна является то, что после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.</p>

<p>Фактически бассейны Гигабасс - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) .
Конструктивно бассейны Гигабасс выполнены из ламинированной листовой стали толщиной 0,8 мм и чашкового ПВХ пакета с толщиной 0,6 мм. и ( 0,7 мм армированный )
Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.
Приобретая бассейн Гигабасс, вы совершаете выгодное вложение на долгие годы!</p>

<h3>В комплект поставки бассейна входит:</h3>
 <br>
<ul>
<li>Металлическая чаша (цвет платина 0.8 мм)</li>
<li>Внутренняя пленка ПВХ (цвет голубой 0.6 мм)</li>
<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
<li>Форсунка подачи воды</li>
<li>Набор соединительных элементов (крепеж, декор) </li>
<li>Верхний и нижний профиль ПВХ</li>
<li>Инструкция для круглого бассейна</li>
</ul>', 'Размер: 4 x 2 x 1.5 • Бренд: Лагуна', 73875.00, 82500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"4\",\"Ширина (м)\":\"2\",\"Высота (м)\":\"1.5\",\"Вес (кг)\":\"141\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"9800\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"160 х 60 х 60\",\"Артикул\":\"ТМ869\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.2, 52, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (321, 'Бассейн Гигабасс 3 х 2 х 1.5 м, морозоустойчивый вкапываемый (скиммер+форсунка) арт. ТМ868 - платина', 'basseyn-gigabass-3-h-2-h-1-5-m-morozoustoychivyy-vkapyvaemyy-skimmer-forsunka-art-tm868-platina', 'ТМ868', '<p>
 ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.
</p>
<p>
 Бассейны Гигабасс предназначены для вкапывания в грунт на произвольную глубину, минимальное заглубление от 0,5 м. у каждой модели бассейна свои требования. Особенностью эксплуатации бассейна является то, что после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.
</p>
<p>
 Фактически бассейны Гигабасс - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) . Конструктивно бассейны Гигабасс выполнены из ламинированной листовой стали толщиной 0,8 мм и чашкового ПВХ пакета с толщиной 0,6 мм. и ( 0,7 мм армированный ) Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна. Приобретая бассейн Гигабасс, вы совершаете выгодное вложение на долгие годы!
</p>
<h3>В комплект поставки бассейна входит:</h3>
 <br>
<ul>
	<li>Металлическая чаша (цвет платина 0.8 мм)</li>
	<li>Внутренняя пленка ПВХ (цвет голубой 0.6 мм)</li>
	<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды)</li>
	<li>Форсунка подачи воды</li>
	<li>Набор соединительных элементов (крепеж, декор) </li>
	<li>Верхний и нижний профиль ПВХ</li>
	<li>Инструкция для круглого бассейна</li>
</ul>', 'Размер: 3 x 2 x 1.5 • Бренд: Лагуна', 60375.00, 71250.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"3\",\"Ширина (м)\":\"2\",\"Высота (м)\":\"1.5\",\"Вес (кг)\":\"115\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"7100\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"160 x 60 x 60\",\"Артикул\":\"ТМ868\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 4.0, 15, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (320, 'Бассейн Лагуна 5 х 1.25 м (полная комплектация) арт. 50012 - платина', 'basseyn-laguna-5-h-1-25-m-polnaya-komplektatsiya-art-50012-platina', '50012', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 23 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5 x 1.25 • Бренд: Лагуна', 76875.00, 90000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"175\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"23000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"50012\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.6, 41, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (319, 'Бассейн Гигабасс 7 х 3.5 х 1.5 м, морозоустойчивый вкапываемый (скиммер+форсунка) арт. ТМ607 - платина', 'basseyn-gigabass-7-h-3-5-h-1-5-m-morozoustoychivyy-vkapyvaemyy-skimmer-forsunka-art-tm607-platina', 'ТМ607', '<p>ВНИМАНИЕ: необходим предварительный монтаж опорных стен из двуполого блока или бетона.</p>

<p>Бассейны Гигабасс предназначены для вкапывания в грунт на произвольную глубину, минимальное заглубление от 0,5 м. у каждой модели бассейна свои требования.
Особенностью эксплуатации бассейна является то, что после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.</p>

<p>Фактически бассейны Гигабасс - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева) .
Конструктивно бассейны Гигабасс выполнены из ламинированной листовой стали толщиной 0,8 мм и чашкового ПВХ пакета с толщиной 0,6 мм. и ( 0,7 мм армированный )
Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.
Приобретая бассейн Гигабасс, вы совершаете выгодное вложение на долгие годы!</p>

<h3>В комплект поставки бассейна входит:</h3>
 <br>
<ul>
<li>Металлическая чаша (цвет платина 0.8 мм)</li>
<li>Внутренняя пленка ПВХ (цвет голубой 0.6 мм)</li>
<li>Скиммер (устройство для сбора грязевых частиц с поверхности воды) - 2 шт</li>
<li>Форсунка подачи воды</li>
<li>Набор соединительных элементов (крепеж, декор) </li>
<li>Верхний и нижний профиль ПВХ</li>
<li>Инструкция для круглого бассейна</li>
</ul>', 'Размер: 7 x 3.5 x 1.5 • Бренд: Лагуна', 143625.00, 165000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Длина (м)\":\"7\",\"Ширина (м)\":\"3.5\",\"Высота (м)\":\"1.5\",\"Вес (кг)\":\"241\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"30000\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"160 х 120 х 60\",\"Артикул\":\"ТМ607\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Вкапываемый\"}"', 5.0, 6, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (318, 'Бассейн Лагуна 2.5 х 1.25 м (полная комплектация) арт. 25014 - коричневый', 'basseyn-laguna-2-5-h-1-25-m-polnaya-komplektatsiya-art-25014-korichnevyy', '25014', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 2.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 5.7 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 2.5 x 1.25 • Бренд: Лагуна', 45375.00, 60000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"2.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"115\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"5700\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"25014\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.3, 7, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (317, 'Бассейн Лагуна 3 х 1.25 м (полная комплектация) арт. 30014 - коричневый', 'basseyn-laguna-3-h-1-25-m-polnaya-komplektatsiya-art-30014-korichnevyy', '30014', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 8.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3 x 1.25 • Бренд: Лагуна', 51750.00, 60000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"130\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"8200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"30014\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.6, 29, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (316, 'Бассейн Лагуна 3.5 х 1.25 м (полная комплектация) арт. 35014 - коричневый', 'basseyn-laguna-3-5-h-1-25-m-polnaya-komplektatsiya-art-35014-korichnevyy', '35014', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 11.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3.5 x 1.25 • Бренд: Лагуна', 57750.00, 67500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"145\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"11200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"35014\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 5.0, 38, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (315, 'Бассейн Лагуна 4 х 1.25 м (полная комплектация) арт. 40014 - коричневый', 'basseyn-laguna-4-h-1-25-m-polnaya-komplektatsiya-art-40014-korichnevyy', '40014', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 14.7 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4 x 1.25 • Бренд: Лагуна', 61875.00, 75000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"150\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"14700\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"40014\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.4, 55, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (314, 'Бассейн Лагуна 4.5 х 1.25 м (полная комплектация) арт. 45014 - коричневый', 'basseyn-laguna-4-5-h-1-25-m-polnaya-komplektatsiya-art-45014-korichnevyy', '45014', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 18.6 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4.5 x 1.25 • Бренд: Лагуна', 69375.00, 82500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"165\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"18600\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"45014\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.9, 58, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (313, 'Бассейн Лагуна 5 х 1.25 м (полная комплектация) арт. 50014 - коричневый', 'basseyn-laguna-5-h-1-25-m-polnaya-komplektatsiya-art-50014-korichnevyy', '50014', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 23 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5 x 1.25 • Бренд: Лагуна', 76875.00, 90000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"175\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"23000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"50014\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.6, 18, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (312, 'Бассейн Лагуна 5.5 х 1.25 м (полная комплектация) арт. 55014 - коричневый', 'basseyn-laguna-5-5-h-1-25-m-polnaya-komplektatsiya-art-55014-korichnevyy', '55014', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 27.9 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5.5 x 1.25 • Бренд: Лагуна', 83250.00, 97500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"215\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"27900\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"55014\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.3, 61, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (311, 'Бассейн Лагуна 2.5 х 1.25 м (полная комплектация) арт. 25012 - платина', 'basseyn-laguna-2-5-h-1-25-m-polnaya-komplektatsiya-art-25012-platina', '25012', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 2.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 5.7 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 2.5 x 1.25 • Бренд: Лагуна', 45375.00, 60000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"2.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"115\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"5700\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"25012\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.4, 38, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (310, 'Бассейн Лагуна 3 х 1.25 м (полная комплектация) арт. 30012 - платина', 'basseyn-laguna-3-h-1-25-m-polnaya-komplektatsiya-art-30012-platina', '30012', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 8.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3 x 1.25 • Бренд: Лагуна', 51750.00, 60000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"130\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"8200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"30012\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.8, 51, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (309, 'Бассейн Лагуна 3.5 х 1.25 м (полная комплектация) арт. 35012 - платина', 'basseyn-laguna-3-5-h-1-25-m-polnaya-komplektatsiya-art-35012-platina', '35012', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 11.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса: коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3.5 x 1.25 • Бренд: Лагуна', 57750.00, 67500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"145\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"11200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"35012\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.9, 43, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (308, 'Бассейн Лагуна 4 х 1.25 м (полная комплектация) арт. 40012 - платина', 'basseyn-laguna-4-h-1-25-m-polnaya-komplektatsiya-art-40012-platina', '40012', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 14.7 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4 x 1.25 • Бренд: Лагуна', 61875.00, 75000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"150\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"14700\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"40012\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.0, 64, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (307, 'Бассейн Лагуна 4.5 х 1.25 м (полная комплектация) арт. 45012 - платина', 'basseyn-laguna-4-5-h-1-25-m-polnaya-komplektatsiya-art-45012-platina', '45012', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 18.6 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4.5 x 1.25 • Бренд: Лагуна', 69375.00, 78750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"165\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"18600\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"45012\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.5, 41, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (306, 'Бассейн Лагуна 5.5 х 1.25 м (полная комплектация) арт. 55012 - платина', 'basseyn-laguna-5-5-h-1-25-m-polnaya-komplektatsiya-art-55012-platina', '55012', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 27.9 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : платина</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5.5 x 1.25 • Бренд: Лагуна', 83250.00, 97500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"215\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"27900\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"55012\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.6, 44, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (305, 'Бассейн Лагуна 2.5 х 1.25 м (полная комплектация) арт. 25040 - дерево', 'basseyn-laguna-2-5-h-1-25-m-polnaya-komplektatsiya-art-25040-derevo', '25040', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 2.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 5.7 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 2.5 x 1.25 • Бренд: Лагуна', 48375.00, 60000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"2.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"115\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"5700\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"25040\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.7, 30, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (304, 'Бассейн Лагуна 3 х 1.25 м (полная комплектация) арт. 30040 - дерево', 'basseyn-laguna-3-h-1-25-m-polnaya-komplektatsiya-art-30040-derevo', '30040', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 8.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3 x 1.25 • Бренд: Лагуна', 55500.00, 67500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"130\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"8200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"30040\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.7, 44, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (303, 'Бассейн Лагуна 3.5 х 1.25 м (полная комплектация) арт. 35040 - дерево', 'basseyn-laguna-3-5-h-1-25-m-polnaya-komplektatsiya-art-35040-derevo', '35040', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 11.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3.5 x 1.25 • Бренд: Лагуна', 61875.00, 75000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"145\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"11200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"35040\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.0, 27, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (302, 'Бассейн Лагуна 4 х 1.25 м (полная комплектация) арт. 40040 - дерево', 'basseyn-laguna-4-h-1-25-m-polnaya-komplektatsiya-art-40040-derevo', '40040', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 14.7 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4 x 1.25 • Бренд: Лагуна', 66375.00, 78750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"150\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"14700\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"40040\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 5.0, 37, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (301, 'Бассейн Лагуна 4.5 х 1.25 м (полная комплектация) арт. 45040 - дерево', 'basseyn-laguna-4-5-h-1-25-m-polnaya-komplektatsiya-art-45040-derevo', '45040', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 18.6 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4.5 x 1.25 • Бренд: Лагуна', 74250.00, 86250.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"165\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"18600\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"45040\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.8, 49, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (300, 'Бассейн Лагуна 5.5 х 1.25 м (полная комплектация) арт. 55040 - дерево', 'basseyn-laguna-5-5-h-1-25-m-polnaya-komplektatsiya-art-55040-derevo', '55040', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 27.9 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : дерево</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5.5 x 1.25 • Бренд: Лагуна', 89625.00, 105000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"215\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"27900\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"55040\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.4, 50, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (299, 'Бассейн Лагуна 3 х 1.25 м (полная комплектация) арт. 30014 / 1 - коричневый', 'basseyn-laguna-3-h-1-25-m-polnaya-komplektatsiya-art-30014-1-korichnevyy', '30014 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 8.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3 x 1.25 • Бренд: Лагуна', 51750.00, 60000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"130\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"8200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"30014 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 4.6, 42, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (298, 'Бассейн Лагуна 3.5 х 1.25 м (полная комплектация) арт. 35014 / 1 - коричневый', 'basseyn-laguna-3-5-h-1-25-m-polnaya-komplektatsiya-art-35014-1-korichnevyy', '35014 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 3.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 11.2 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 3.5 x 1.25 • Бренд: Лагуна', 57750.00, 67500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"3.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"145\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"11200\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"35014 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 4.9, 12, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (297, 'Бассейн Лагуна 4 х 1.25 м (полная комплектация) арт. 40014 / 1 - коричневый', 'basseyn-laguna-4-h-1-25-m-polnaya-komplektatsiya-art-40014-1-korichnevyy', '40014 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 14.7 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4 x 1.25 • Бренд: Лагуна', 61875.00, 75000.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"150\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"14700\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"40014 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 4.8, 45, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (296, 'Бассейн Лагуна 4.5 х 1.25 м (полная комплектация) арт. 45014 / 1 - коричневый', 'basseyn-laguna-4-5-h-1-25-m-polnaya-komplektatsiya-art-45014-1-korichnevyy', '45014 / 1', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 4.5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 18.6 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: Голубая</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 4.5 x 1.25 • Бренд: Лагуна', 69375.00, 82500.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"4.5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"165\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"18600\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"45014 / 1\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Голубая\",\"Толщина пленки\":\"0.4 мм\"}"', 4.0, 43, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (295, 'Бассейн Лагуна 5 х 1.25 м (полная комплектация) арт. 50040 - дерево', 'basseyn-laguna-5-h-1-25-m-polnaya-komplektatsiya-art-50040-derevo', '50040', 'Бассейны ЛАГУНА предназначены как для наземного исполнения, так и для вкапывания в грунт на произвольную глубину.<br>
 Особенностью эксплуатации бассейна является, то после окончания сезона бассейн не надо разбирать на зиму. Также не рекомендуется сливать воду из бассейна полностью.<br>
 <br>
 Фактически бассейны ЛАГУНА - стационарные морозоустойчивые бассейны всесезонной эксплуатации (при наличии эффективной системы подогрева).<br>
 Конструктивно бассейны ЛАГУНА выполнены из ламинированной листовой стали толщиной 0.5 мм армированной поперечным профилем и чашкового PVC пакета с толщиной стенки 0.4 мм.<br>
 Многослойный полимерный ламинат позволяет продлить срок эксплуатации бассейна до 20-25 лет при периодической (раз 7-10 лет) замене чашкового пакета. Замена чашкового пакета производится без демонтажа бассейна.<br>
 Приобретая бассейн ЛАГУНА, вы совершаете выгодное вложение на долгие годы!<br>
 <br>
 Характеристики:<br>
<ul>
	<li>Производитель: Россия (г. Самара)</li>
	<li>Форма: круг</li>
	<li>Диаметр: 5 м</li>
	<li>Глубина: 1.25 м</li>
	<li>Объем: 23 куб.м</li>
	<li>Морозоустойчивость: да</li>
	<li>Фильтр в комплекте: да</li>
	<li>Лестница в комплекте: да</li>
	<li>Установка на поверхности : да</li>
	<li>Заглубление в грунт: да</li>
	<li>Материал каркаса: стальной лист, оцинковка, полимер</li>
	<li>Толщина каркаса: 0.5 мм</li>
	<li>Цвет каркаса : коричневый</li>
	<li>Материал пакета: ПВХ</li>
	<li>Толщина пакета: 0.4 мм</li>
	<li>Цвет пакета: мрамор</li>
	<li>Гарантия: 1 год</li>
</ul>', 'Размер: 5 x 1.25 • Бренд: Лагуна', 82125.00, 93750.00, NULL, 'Лагуна', '[]', '"{\"Бренд\":\"Лагуна\",\"Диаметр (м)\":\"5\",\"Высота (м)\":\"1.25\",\"Вес (кг)\":\"175\",\"Страна-производитель\":\"Россия\",\"Объем (л)\":\"23000\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6000\",\"Размер упаковки (см)\":\"41 х 41 х 126\",\"Артикул\":\"50040\",\"Тип бассейна\":\"Каркасный морозостойкий\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный / Вкапываемый\",\"Цвет чаши\":\"Мрамор\",\"Толщина пленки\":\"0.4 мм\"}"', 4.3, 59, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (294, 'Каркасный бассейн Bestway Steel Pro MAX 366 x 122 см, артикул 56420', 'karkasnyy-basseyn-bestway-steel-pro-max-366-x-122-sm-artikul-56420', '56420', '<h2>Каркасный бассейн Bestway Steel Pro MAX 366 x 122 см, артикул 56420</h2><p>
 Каркасный бассейн Steel Pro Max Bestway с самым востребованным размером 366x122 см. Укомплектован лестницей, тентом, и фильтрующим насосом. Металлический каркас состоит из соединительных уголков, трубок-перемычек и стоек. Все детали окрашены и устойчивы к истиранию. Каркасные сборные бассейны - это простая и недорогая альтернатива стационарным дорогостоящим бассейнам.
</p>
<p>
 Бассейн снизу оборудован сливным клапаном. Для того, чтобы слить воду, необходимо присоединить к любому садовому шлангу переходник, который идёт в комплекте с бассейном. Откручиваете заглушку клапана и вворачиваете переходник, при этом сливной клапан откроется сам. Слить воду можно в любое удобное для Вас место
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн Bestway Steel Pro Max 3.66 x 1.22 м</li>
	<li>Картриджный насос-фильтр 2006 л/ч</li>
	<li>Фильтрующий картридж тип II</li>
	<li>Лестница без площадки</li>
	<li>Тент для бассейна</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 366 x 122 • Бренд: Bestway', 19500.00, 26250.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Диаметр (м)\":\"3.66\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"47.8\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"366 x 122\",\"Объем (л)\":\"10250\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"2006\",\"Размер упаковки (см)\":\"55.5 х 32.5 х 124\",\"Артикул\":\"56420\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.0, 24, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (293, 'Каркасный бассейн Bestway Power Steel 412 x 201 x 122 см, артикул 56456', 'karkasnyy-basseyn-bestway-power-steel-412-x-201-x-122-sm-artikul-56456', '56456', '<h2>Каркасный бассейн Bestway Power Steel 412 x 201 x 122 см, артикул 56456</h2><p>
 Каркасный бассейн Power Steel Bestway 56456 412x201x122 гарантирует вам прекрасный отдых в кругу семьи. Основной особенностью этого бассейна является простая и быстрая установка, которая не займет у вас много времени и сил. Каркас бассейна изготовлен из нержавеющей стали, а сама чаша выполнена из трех прочных слоев – два слоя плотного винила и один из полиэстера. Плотный винил имеет высокую устойчивость к растягиванию и стиранию, а так же воздействиям ультрафиолетовых лучей и ударам.
</p>
<p>
 Прямоугольная конструкция каркасного бассейна не имеет острых углов, что обеспечивает безопасную эксплуатацию. Предусмотрен сливной клапан, который подсоединяется к садовому шлангу. В комплект поставки включена лестница, которая обеспечивает удобный вход в бассейн. Бассейн Bestway 56456 станет лучшим приобретением для незабываемого время провождения, которое подарит вам массу положительных эмоций.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн Bestway Power Steel 4.12 x 2.01 x 1.22 м</li>
	<li>Картриджный насос-фильтр 2006 л/ч</li>
	<li>Фильтрующий картридж тип II</li>
	<li>Лестница без площадки</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 412 x 201 x 122 • Бренд: Bestway', 31500.00, 37500.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"4.12\",\"Ширина (м)\":\"2.01\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"74\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"412 x 201 x 122\",\"Объем (л)\":\"8124\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"2006\",\"Размер упаковки (см)\":\"43 х 60 х 148\",\"Артикул\":\"56456\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 5.0, 21, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (292, 'Каркасный бассейн Bestway Steel Pro MAX 366 x 100 см, артикул 56418', 'karkasnyy-basseyn-bestway-steel-pro-max-366-x-100-sm-artikul-56418', '56418', '<h2>Каркасный бассейн Bestway Steel Pro MAX 366 x 100 см, артикул 56418</h2><p>
 Сборный каркасный бассейн Bestway 56418 круглой формы с фильтр-насосом и лестницей.
</p>
<p>
 Чаша бассейна выполнена из высококачественного трехслойного ПВХ: два слоя плотного винила и один - полиэстер для особой прочности. Каркас металлический нержавеющий, устойчивый к погодным воздействиям и повышенной влажности.
</p>
<p>
 Установка простая, не требуется бетонирования и подготовки площадки, необходима только плоская горизонтальная площадка. Сезонный бассейн (рекомендуется разбирать на холодное время года)&nbsp;&nbsp;- может быть легко разобран и собран заново. Время сборки и подключения основных узлов бассейна не более 1-2 часов.
</p>
<p>
 Имеется удобный сливной клапан, подключается к садовому шлангу, что дает возможность слить воду в любое удобное место.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн Bestway Steel Pro Max 3.66 x 1.0 м</li>
	<li>Картриджный насос-фильтр 2006 л/ч</li>
	<li>Фильтрующий картридж тип II</li>
	<li>Лестница без площадки</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 366 x 100 • Бренд: Bestway', 14250.00, 18750.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Диаметр (м)\":\"3.66\",\"Высота (м)\":\"1\",\"Вес (кг)\":\"38\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"366 x 100\",\"Объем (л)\":\"9150\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"2006\",\"Размер упаковки (см)\":\"44 х 35 х 113\",\"Артикул\":\"56418\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.4, 52, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (291, 'Каркасный бассейн Bestway Power Steel 488 x 244 x 122 см, артикул 56670', 'karkasnyy-basseyn-bestway-power-steel-488-x-244-x-122-sm-artikul-56670', '56670', '<h2>Каркасный бассейн Bestway Power Steel 488 x 244 x 122 см, артикул 56670</h2><p>
 Сборка и установка бассейна Bestway занимает 30 минут. Специальных инструментов и технических средств - не требуется. Для монтажа лестницы и фильтра достаточно отвертки.
</p>
<p>
 Бассейны Bestway обладают тройной прочностью, благодаря современной технологии SUPER-TOUGH.Бассейны Bestway опоясаны полипропиленовой лентой, которая поддерживает форму бассейна. Помимо ленты, прочность бассейна обеспечивает стальной каркас. Именно благодаря каркасу в бассейне могут одновременно купаться несколько человек взрослых и детей. Вода в бассейне сливается с помощью садового шланга, подключенного к сливному клапану. Для установки каркасно-сборного бассейна специальной подготовки грунта не требуется - все достаточно просто и быстро.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн Bestway Power Steel 4.88 x 2.44 x 1.22 м</li>
	<li>Картриджный насос-фильтр 3028 л/ч.</li>
	<li>Картридж тип II</li>
	<li>Лестница без площадки</li>
	<li>Тент для бассейна</li>
	<li>Руководство по эксплуатации.</li>
</ul>', 'Размер: 488 x 244 x 122 • Бренд: Bestway', 37500.00, 52500.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"4.88\",\"Ширина (м)\":\"2.44\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"96\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"488 x 244 x 122\",\"Объем (л)\":\"11532\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"3028\",\"Размер упаковки (см)\":\"62.5 х 51.5 х 145\",\"Артикул\":\"56670\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.5, 15, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (290, 'Каркасный бассейн Bestway Power Steel 488 x 244 x 122 см, артикул 56671', 'karkasnyy-basseyn-bestway-power-steel-488-x-244-x-122-sm-artikul-56671', '56671', '<h2>Каркасный бассейн Bestway Power Steel 488 x 244 x 122 см, артикул 56671</h2>
<p>
 Каркасный бассейн Bestway 56671 отличается высокой прочностью и устойчивостью. Чаша выполнена из высококачественного трехслойного ПВХ: два слоя плотного винила и один - полиэстер для особой прочности. Каркас металлический нержавеющий оцинкованный.
</p>
<p>
 Не требует бетонирования и подготовки ямы, все, что нужно, это плоская, горизонтальная площадка. Сезонный бассейн (рекомендуется разбирать на холодное время года) обладает простой конструкцией - может быть легко разобран и собран заново. Время сборки и подключения бассейна не более 1-2 часов.
</p>
<p>
 Удобный сливной клапан позволяет присоединить садовый шланг, что дает возможность слить воду в любое место.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн Bestway Power Steel 4.88 x 2.44 x 1.22 м</li>
	<li>Песочный насос-фильтр 3596 л/ч</li>
	<li>Лестница без площадки</li>
	<li>Тент для бассейна</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 488 x 244 x 122 • Бренд: Bestway', 42000.00, 52500.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"4.88\",\"Ширина (м)\":\"2.44\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"107\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"488 x 244 x 122\",\"Объем (л)\":\"11532\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"3596\",\"Размер упаковки (см)\":\"71 х 63 х 142\",\"Артикул\":\"56671\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.3, 16, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (289, 'Каркасный бассейн Bestway Power Steel 412 x 201 x 122 см, артикул 56457', 'karkasnyy-basseyn-bestway-power-steel-412-x-201-x-122-sm-artikul-56457', '56457', '<h2>Каркасный бассейн Bestway Power Steel 412 x 201 x 122 см, артикул 56457</h2>
<p>
 Каркасный бассейн Power Steel Bestway 56457 412x201x122 обновленная модель порадует всю вашу семью. Небольшой размер при максимальной высоте сэкономит место на вашем участке. Основной особенностью этого бассейна является простая и быстрая установка, которая не займет у вас много времени и сил. Каркас изготовлен из нержавеющей стали, а сама чаша выполнена из трех прочных слоев два слоя плотного винила и один из полиэстера. Плотный винил имеет высокую устойчивость к растягиванию и стиранию, а так же воздействиям ультрафиолетовых лучей и ударам.
</p>
<p>
 Прямоугольная конструкция каркасного бассейна не имеет острых углов, что обеспечивает безопасную эксплуатацию. Предусмотрен сливной клапан, который подсоединяется к садовому шлангу. В комплект поставки включена лестница и песочный фильтр. Бассейн Bestway 56457 станет лучшим приобретением для незабываемого время провождения, которое подарит вам массу положительных эмоций.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн Bestway Power Steel 4.12 x 2.01 x 1.22 м</li>
	<li>Песочный насос-фильтр 3596 л/ч</li>
	<li>Лестница без площадки</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 412 x 201 x 122 • Бренд: Bestway', 33750.00, 45000.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"4.12\",\"Ширина (м)\":\"2.01\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"81\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"412 x 201 x 122\",\"Объем (л)\":\"8124\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"3596\",\"Размер упаковки (см)\":\"78 х 59 х 137\",\"Артикул\":\"56457\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.2, 11, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (288, 'Каркасный бассейн Bestway Steel Pro MAX ротанг 366 x 100 см, артикул 56709', 'karkasnyy-basseyn-bestway-steel-pro-max-rotang-366-x-100-sm-artikul-56709', '56709', '<h2>Каркасный бассейн Bestway Steel Pro MAX ротанг 366 x 100 см, артикул 56709</h2><p>
 Каркасный бассейн Bestway 56709 отличается высокой прочностью и устойчивостью. Чаша выполнена из высококачественного трехслойного ПВХ: два слоя плотного винила и между ними сетка из полиэстера для особой прочности. Цвет чаши бассейна снаружи имитирует ротанг, внутренняя поверхность имеет расцветку под мозаику. Каркас металлический, покрытый предотвращающим появление коррозии слоем пластика.
</p>
<p>
 Не требует бетонирования и подготовки ямы, все, что нужно, это плоская, горизонтальная площадка. Сезонный бассейн (рекомендуется разбирать на холодное время года) обладает простой конструкцией - может быть легко разобран и собран заново. Время сборки и подключения бассейна составляет около 45 мин.
</p>
<p>
 Удобный сливной клапан позволяет присоединить садовый шланг, что дает возможность слить воду в любое место.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн&nbsp;Bestway Steel Pro Max</li>
	<li>Картриджный насос-фильтр 2006 л/ч</li>
	<li>Лестница без площадки</li>
	<li>Фильтрующий картридж тип&nbsp;II</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 366 x 100 • Бренд: Bestway', 15000.00, 22500.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"3.66\",\"Высота (м)\":\"1\",\"Вес (кг)\":\"38\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"366 x 100\",\"Объем (л)\":\"9150\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"2006\",\"Размер упаковки (см)\":\"44 х 33 х 113\",\"Артикул\":\"56709\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Ротанг\"}"', 4.6, 41, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (287, 'Каркасный бассейн Bestway Power Steel 427 x 250 x 100 см, артикул 56620', 'karkasnyy-basseyn-bestway-power-steel-427-x-250-x-100-sm-artikul-56620', '56620', '<h2>Каркасный бассейн Bestway Power Steel 427 x 250 x 100 см, артикул 56620</h2><p>
 Каркасный бассейн Bestway 56620 Power Steel овальной формы отличается высокой прочностью и устойчивостью. Чаша выполнена из высококачественного трехслойного ПВХ: два слоя плотного винила и один - полиэстер для особой прочности. Каркас металлический, нержавеющий, оцинкованный.
</p>
<p>
 Не требует бетонирования и подготовки ямы, все, что нужно, это плоская, горизонтальная площадка. Сезонный бассейн (рекомендуется разбирать на холодное время года) обладает простой конструкцией - может быть легко разобран и собран заново. Время сборки и подключения бассейна не более 2-3 часов.
</p>
<p>
 Удобный сливной клапан позволяет присоединить садовый шланг, что дает возможность слить воду в любое место.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн Bestway Power Steel 4.27 x 2.50 x 1.0 м</li>
	<li>Картриджный насос-фильтр 2006 л/ч</li>
	<li>Фильтрующий картридж тип II</li>
	<li>Лестница без площадки</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 427 x 250 x 100 • Бренд: Bestway', 28500.00, 37500.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"4.27\",\"Ширина (м)\":\"2.5\",\"Высота (м)\":\"1\",\"Вес (кг)\":\"55\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"427 x 250 x 100\",\"Объем (л)\":\"7250\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"2006\",\"Размер упаковки (см)\":\"62 х 43 х 129.5\",\"Артикул\":\"56620\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.0, 49, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (286, 'Каркасный бассейн Bestway Power Steel 404 x 201 x 100 см, артикул 56721', 'karkasnyy-basseyn-bestway-power-steel-404-x-201-x-100-sm-artikul-56721', '56721', '<h2>Каркасный бассейн Bestway Power Steel 404 x 201 x 100 см, артикул 56721</h2>
<p>Погрузитесь в непревзойденное удовольствие от бассейна с набором для бассейна Bestway® Power Steel™ Frame Set! Этот бассейн впечатляющих размеров 404 x 201 x 100 см и объемом воды 6478 литров (90%) предлагает бесконечное развлечение для всей семьи. Прочная конструкция: покрытие бассейна изготовлено из прочного трехслойного материала TriTech ™, который на 15 % более устойчив к разрыву, на 33 % более устойчив к растяжению и на 83 % более устойчив к проколам, чем традиционный ПВХ. Наша устойчивая к коррозии стальная рама, оснащенная системой Seal &amp; Lock System™, обеспечивает стабильное и надежное соединение отдельных элементов. Внешний вид внешней стены, выполненный из сланцево-серого мрамора, органично вписывается в ваш сад и придает ему элегантность. Комплект поставки: Благодаря входящему в комплект фильтр-насосу, обеспечивающему производительность 2006 литров в час, вы всегда сможете поддерживать кристально чистую воду. А благодаря дозатору химикатов ChemConnect™ необходимое количество химикатов для бассейна распределяется равномерно, чтобы гарантировать вам чистую и здоровую воду в бассейне. Монтаж и демонтаж этого бассейна очень прост и не требует никаких инструментов. В комплект также входят прочные защитные лестницы для облегчения входа и выхода. Наслаждайтесь летом и превратите свой сад в эксклюзивный бассейн!</p>
<p>Информация о товаре:</p>
<ul>
<li>Размер: 404 х 201 х 100 см</li>
<li>Макс. размеры сборки: 441 х 241 см</li>
<li>Вместимость воды (90%): 6478 литров</li>
<li>Прочный трехслойный материал TriTech™</li>
<li>Возможность подключения фильтрующей системы (Ø 32 мм)</li>
<li>Соединение через систему Seal &amp; Lock System™</li>
<li>Гибкие C-разъемы по углам</li>
<li>Защита от коррозии</li>
<li>Антипригарное покрытие (матовый каркас)</li>
<li>Цвет: имитация мрамора (шиферно-серый)</li>
<li>Легко собрать без инструментов</li>
<li>Встроенный сливной клапан с переходником для садового шланга</li>
</ul>

<h3>В комплект поставки бассейна входит:</h3>

<ul>
<li>Каркасный бассейн Bestway Power Steel/li&gt;
</li><li>Картриджный насос-фильтр 2006 л/ч/li&gt;
</li><li>Лестница без площадки/li&gt;
</li><li></li><li>Фильтрующий картридж тип II/li&gt;
Руководство по эксплуатации/li&gt;
</li></ul>', 'Размер: 404 x 201 x 100 • Бренд: Bestway', 27000.00, 37500.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"4.04\",\"Ширина (м)\":\"2.01\",\"Высота (м)\":\"1\",\"Вес (кг)\":\"62\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"404 x 201 x 100\",\"Объем (л)\":\"6478\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"2006\",\"Размер упаковки (см)\":\"37 х 58 х 129\",\"Артикул\":\"56721\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый ротанг\"}"', 4.0, 44, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (285, 'Каркасный бассейн Bestway Power Steel 640 x 274 x 132 см, артикул 5612B', 'karkasnyy-basseyn-bestway-power-steel-640-x-274-x-132-sm-artikul-5612b', '5612B', '<h2>Каркасный бассейн Bestway Power Steel 640 x 274 x 132 см, артикул 5612B</h2>
<p>
 С каркасными прямоугольными бассейнами 5612B от известного производителя Bestway вы создадите прекрасный и незабываемый отдых в кругу семьи или друзей. Они быстро и легко устанавливаются, не займут у вас много сил и времени. Каркас бассейнов изготавливается из прочной нержавеющей стали, осуществляет надежную фиксацию чаши, сама чаша бассейнов выполнена из трех прочных слоев армированного ПВХ. Один слой из полиэстера и два слоя из плотного винила. Винил имеет высокую стойкость к стиранию и растягиванию, а также устойчив к воздействию окружающей среды и ультрафиолетовых лучей.
</p>
<p>
 Бассейн Bestway 5612B комплектуется песочным фильтр-насосом, который обеспечит качественную очистку воды от всевозможных загрязнений, а также тентом и лестницей. Прямоугольная конструкция не имеет острых углов, что дополнительно обеспечивает безопасную эксплуатацию. Бассейн 5612B станет отличным приобретением для вас и ваших детей.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн Bestway Power Steel 6.40 x 2.74 x 1.32 м</li>
	<li>Песочный насос-фильтр 6056 л/ч</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Поплавок-дозатор</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 640 x 274 x 132 • Бренд: Bestway', 67500.00, 90000.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"6.4\",\"Ширина (м)\":\"2.74\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"146\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"640 x 274 x 132\",\"Объем (л)\":\"19281\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6056\",\"Артикул\":\"5612B\",\"Тип бассейна\":\"Каркасный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.0, 26, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (284, 'Каркасный бассейн Bestway Power Steel 549 x 274 x 122 см, артикул 56466', 'karkasnyy-basseyn-bestway-power-steel-549-x-274-x-122-sm-artikul-56466', '56466', '<h2>Каркасный бассейн Bestway Power Steel 549 x 274 x 122 см, артикул 56466</h2>
<p>
 Каркасный бассейн BestWay 56466 отличается высокой прочностью и устойчивостью. Чаша выполнена из высококачественного трехслойного ПВХ: два слоя плотного винила и один - полиэстер для особой прочности. Каркас металлический нержавеющий оцинкованный.
</p>
<p>
 Не требует бетонирования и подготовки ямы, все, что нужно, это плоская, горизонтальная площадка. Сезонный бассейн (рекомендуется разбирать на холодное время года) обладает простой конструкцией - может быть легко разобран и собран заново. Время сборки и подключения бассейна не более 1-2 часов.
</p>
<p>
 Удобный сливной клапан позволяет присоединить садовый шланг, что дает возможность слить воду в любое место.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн Bestway Power Steel 5.49 x 2.74 x 1.22 м</li>
	<li>Песочный насос-фильтр 6056 л/ч</li>
	<li>Лестница без площадки</li>
	<li>Тент для бассейна</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 549 x 274 x 122 • Бренд: Bestway', 52500.00, 67500.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"5.49\",\"Ширина (м)\":\"2.74\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"115\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"549 x 274 x 122\",\"Объем (л)\":\"14812\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"6056\",\"Размер упаковки (см)\":\"68 х 63 х 145\",\"Артикул\":\"56466\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.0, 47, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (283, 'Каркасный бассейн Bestway APX 365, 956 x 488 x 132 см, артикул 561KJ', 'karkasnyy-basseyn-bestway-apx-365-956-x-488-x-132-sm-artikul-561kj', '561KJ', '<h3>Зимостойкость без демонтажа</h3>
 Благодаря инновационной круглогодичной защите Polar-Shield™ вы можете оставить свой бассейн на улице зимой - нет необходимости его демонтировать! В зимние месяцы все, что вам нужно сделать, это понизить уровень воды и соответствующим образом подготовить бассейн к зиме. 3-слойный материал TriTech® также придает облицовке бассейна чрезвычайно прочные свойства.
<h3>Рама из высококачественной стали</h3>
 Устойчивая рама из стали с антипригарным покрытием гарантирует долговечность и максимальную устойчивость. Инновационная 8-сторонняя конструкция и система™ ClickConnect с пластиковыми&nbsp; соединителями гарантируют, что ваш бассейн будет настроен быстро и без инструментов.
<h3>Обширный комплект поставки</h3>
 Полный комплект включает в себя мощную систему фильтрации песка (8327л/ч) с таймером и возможностью работы как с фильтрующим песком, так и с фильтрующими шарами Polysphere™, входящими в комплект поставки. Кроме того, вы получите оцинкованную лестницу (132 см), тент и ремонтные заплатки - все необходимое для вашего бассейна!
<h3>Характеристики:</h3>
<ul>
	<li>Размер: 956 x 488 x 132 см</li>
	<li>
	Максимальный размер при сборке: 1012 x 534 x 132 см</li>
	<li>
	Вместимость воды (90%):52 231 литров</li>
	<li>
	Прочный 3-слойный материал TriTech®</li>
	<li>
	Встроенная всесезонная защита Polar-Shield™</li>
	<li>
	Возможность подключения фильтрующей системы (Ø 38 мм)</li>
	<li>
	Стальной каркас из оцинкованной стали с антипригарным покрытием устойчивый к коррозии</li>
	<li>
	Подключение к системе™ ClickConnect</li>
	<li>
	Внутренний цвет чаши под голубой мрамор</li>
	<li>
	Простой монтаж без инструментов</li>
	<li>
	Встроенный сливной клапан с переходником для садового шланга</li>
</ul>
<h3>Комплектация:</h3>
<ul>
	<li>Каркасный бассейн Bestway APX 365</li>
	<li>
	Песочный насос-фильтр 8327 л/ч</li>
	<li>
	Лестница с площадкой</li>
	<li>
	Тент для бассейна</li>
	<li>
	Наполнитель Bestway Polysphere</li>
	<li>
	Руководство по эксплуатации</li>
</ul>
 <br>', 'Размер: 956 x 488 x 132 • Бренд: Bestway', 112500.00, 150000.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"9.56\",\"Ширина (м)\":\"4.88\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"245\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"956 x 488 x 132\",\"Объем (л)\":\"52231\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8327\",\"Размер упаковки (см)\":\"105 x 62 x 165\",\"Артикул\":\"561KJ\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Темный мрамор\"}"', 4.0, 9, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (282, 'Каркасный бассейн Bestway Power Steel 412 x 201 x 122 см, артикул 56722', 'karkasnyy-basseyn-bestway-power-steel-412-x-201-x-122-sm-artikul-56722', '56722', '<h2>Каркасный бассейн Bestway Power Steel 412 x 201 x 122, артикул 56722</h2><p>
 Материал для изготовления каркаса - прочная нержавеющая сталь надежной фиксации. Чаша выполнена из 3-ех прочных слоев: один слой - прочный полиэстер, 2 других - армированный поливинилхлорид, устойчивый к растягиванию, истиранию, воздействию ультрафиолета из окружающей среды. Модель – прямоугольная, не имеет острых углов для обеспечения безопасной эксплуатации.<br>
 <br>
 Особенность - наличие ступенек, выполненных из пластика и стойки для лестницы&nbsp;&nbsp;со специальными наконечниками для защиты дна бассейна. Для установки не нужно бетонировать площадку и подготавливать яму, достаточно подобрать горизонтальную плоскую поверхность.
</p>
<h3>Характеристики</h3>
 • Размер: 412 х 201 х 122 см.<br>
 • Максимальные монтажные размеры: 462 x 254 см.<br>
 • Объем при 90% заполнении бассейна: 8,124 литра<br>
 • Внутренняя чаша бассейна из прочного трехслойного материала TriTech™.<br>
 • Цвет: имитация ротанга (серый)<br>
 • Возможна простая сборка без инструментов<br>
 • Чрезвычайно жесткая конструкция рамы с защитой от коррозии для повышения прочности и долговечности<br>
 • Система соединения стальной рамы Seal &amp; Lock ™ для защиты от попадания воды в стрелу.<br>
 • Повышенное сопротивление благодаря гибким С-образным соединителям на углах бассейна<br>
 • Встроенный сливной клапан с адаптером для садового шланга<br>
 • вес с упаковкой - 71 кг;<br>
<h3>Комплектация</h3>
<ul>
	<li>Бассейн</li>
	<li>
	Фильтр-насос 2006 л / ч</li>
	<li>
	Картридж фильтра тип II</li>
	<li>
	Лестница 122 см</li>
	<li>
	Поплавок-дозатор</li>
</ul>
<p>
 Характеристики и комплектация могут быть изменены производителем без предварительного уведомления.
</p>
<ul>
</ul>', 'Размер: 412 x 201 x 122 • Бренд: Bestway', 31500.00, 41250.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"4.12\",\"Ширина (м)\":\"2.01\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"74\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"412 x 201 x 122\",\"Объем (л)\":\"8124\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"2006\",\"Размер упаковки (см)\":\"43 х 60 х 148\",\"Артикул\":\"56722\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый ротанг\"}"', 4.5, 50, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (281, 'Каркасный бассейн Bestway APX 365, 610 x 132 см, артикул 561KE', 'karkasnyy-basseyn-bestway-apx-365-610-x-132-sm-artikul-561ke', '561KE', '<h3>Идеальный бассейн для теплого времени года</h3>
 Устойчивая к коррозии стальная рама и устойчивая 8-гранная конструкция гарантируют безопасное и стабильное использование летом. Практичная система™ ClickConnect позволяет быстро настроить бассейн, а прочные пластиковые Т-образные соединители обеспечивают дополнительную безопасность.<br>
<h3>Легкая установка</h3>
 Бассейн Bestway® APX365™ не только прост в настройке, но и очень практичен! Фильтрующие шарики Polysphere™ в качестве фильтрующего материала обеспечивают кристально чистую воду. Мощная система фильтрации песка с производительностью 8 327 л/ч сертифицирована GS и гарантирует наилучшее качество воды.<br>
<h3>Все необходимое в наборе</h3>
 В комплектацию входит оцинкованная лестница, тент для защиты от грязи. Так что вы хорошо подготовлены к любой ситуации!<br>
<h3>Благодаря круглогодичной защите</h3>
 Polar-Shield™ бассейн остается стоять зимой. Однако использовать его не представляется возможным, а уровень воды приходится понижать. Таким образом, ваш бассейн остается защищенным даже в холодное время года и готов к следующему лету.
<h3>Характеристики:</h3>
<ul>
	<li>Размер: 610 x 132 см </li>
	<li>
	Вместимость воды (90%): 33 240 литров </li>
	<li>
	Прочный&nbsp;3-слойный материал TriTech® </li>
	<li>
	Встроенная всесезонная защита Polar-Shield™ </li>
	<li>
	Возможность подключения фильтрующей системы (Ø 38 мм)</li>
	<li>Стальной каркас&nbsp;из оцинкованной стали с антипригарным покрытием устойчивый к коррозии</li>
	<li>
	8-гранная конструкция столбов </li>
	<li>
	Подключение к системе™ ClickConnect </li>
	<li>
	Пластиковый Т-образный соединитель</li>
	<li>
	Внутренний цвет чаши под голубой мрамор</li>
	<li>
	Простой монтаж без инструментов </li>
	<li>
	Встроенный сливной клапан с переходником для садового шланга</li>
</ul>
 <span style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">
<h3>Комплектация:</h3>
 </span>
<ul>
</ul>
<ul>
	<li>Каркасный бассейн Bestway APX 365</li>
	<li>Песочный насос-фильтр 8327&nbsp; л/ч<br>
 </li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Наполнитель&nbsp;Bestway Polysphere</li>
	<li>Руководство по эксплуатации</li>
</ul>
 <br>', 'Размер: 610 x 132 • Бренд: Bestway', 61500.00, 90000.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Диаметр (м)\":\"6.1\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"132\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"610 x 132\",\"Объем (л)\":\"33240\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8327\",\"Размер упаковки (см)\":\"99 x 57 x 116\",\"Артикул\":\"561KE\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Темный мрамор\"}"', 4.1, 23, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (280, 'Каркасный бассейн Bestway APX 365, 671 x 132 см, артикул 561JZ', 'karkasnyy-basseyn-bestway-apx-365-671-x-132-sm-artikul-561jz', '561JZ', '<h3>Зимостойкость без демонтажа</h3>
 Благодаря инновационной круглогодичной защите Polar-Shield™ вы&nbsp;можете оставить свой бассейн на улице зимой - нет необходимости его демонтировать! В зимние месяцы все, что вам нужно сделать, это понизить уровень воды и соответствующим образом подготовить бассейн к зиме. 3-слойный материал TriTech® также придает облицовке бассейна чрезвычайно прочные свойства.<br>
<h3>Рама из высококачественной стали</h3>
 Устойчивая рама из стали с антипригарным покрытием гарантирует долговечность и максимальную устойчивость. Инновационная 8-сторонняя конструкция и система™ ClickConnect с пластиковыми Т-образными соединителями гарантируют, что ваш бассейн будет настроен быстро и без инструментов.<br>
<h3>Обширный комплект поставки</h3>
 <span style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">Полный комплект включает в себя мощную систему фильтрации песка (8327 л/ч) с таймером и возможностью работы как с фильтрующим песком, так и с фильтрующими шарами Polysphere™, входящими в комплект поставки.&nbsp;Кроме того, вы получите оцинкованную лестницу (132 см), тент и ремонтные заплатки - все необходимое для вашего бассейна!</span><br>
<h3><span style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">Характеристики:</span></h3>
<ul>
	<li>Размер: 671 x 132 см </li>
	<li>
	Вместимость воды (90%): 40 377 литров </li>
	<li>
	Прочный 3-слойный материал TriTech® </li>
	<li>
	Встроенная всесезонная защита Polar-Shield™ </li>
	<li>
	Возможность подключения фильтрующей системы (Ø 38 мм) </li>
	<li>
	Стальной каркас из оцинкованной стали с антипригарным покрытием устойчивый к коррозии </li>
	<li>
	8-гранная конструкция столбов </li>
	<li>
	Подключение к системе™ ClickConnect </li>
	<li>
	Пластиковый Т-образный соединитель </li>
	<li>
	Внутренний цвет чаши под голубой мрамор </li>
	<li>
	Простой монтаж без инструментов </li>
	<li>
	Встроенный сливной клапан с переходником для садового шланга</li>
</ul>
 <span style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">
<h3>Комплектация:</h3>
 </span>
<h3>
<ul>
</ul>
 </h3>
<ul>
	<li>Каркасный бассейн Bestway APX 365 </li>
	<li>
	Песочный насос-фильтр 8327 л/ч </li>
	<li>
	Лестница с площадкой </li>
	<li>
	Тент для бассейна </li>
	<li>
	Наполнитель Bestway Polysphere </li>
	<li>
	Руководство по эксплуатации</li>
</ul>
 <br>', 'Размер: 671 x 132 • Бренд: Bestway', 66000.00, 97500.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Диаметр (м)\":\"6.71\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"144\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"671 x 132\",\"Объем (л)\":\"40377\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"8327\",\"Размер упаковки (см)\":\"101 x 57 x 116\",\"Артикул\":\"561JZ\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Темный мрамор\"}"', 4.3, 28, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (279, 'Каркасный бассейн Bestway Power Steel 282 x 196 x 84 см, артикул 56629', 'karkasnyy-basseyn-bestway-power-steel-282-x-196-x-84-sm-artikul-56629', '56629', '<h2>Каркасный бассейн Bestway Power Steel 282 x 196 x 84 см, артикул 56629</h2><p>
 Прямоугольный каркасный бассейн Bestway 56629 отличается высокой прочностью и устойчивостью. Чаша выполнена из высококачественного трехслойного ПВХ: два слоя плотного винила и между ними сетка из полиэстера для особой прочности. Цвет чаши бассейна снаружи светло-серый, внутренняя поверхность имеет расцветку под мозаику. Каркас металлический, покрытый предотвращающим появление коррозии слоем пластика.<br>
 <br>
 Не требует бетонирования и подготовки ямы, все, что нужно, это плоская, горизонтальная площадка. Сезонный бассейн (рекомендуется разбирать на холодное время года) обладает простой конструкцией - может быть легко разобран и собран заново. Время сборки и подключения бассейна составляет около 30 мин.<br>
 <br>
 Удобный сливной клапан позволяет присоединить садовый шланг, что дает возможность слить воду в любое место.<br>
 <br>
 В комплект поставки входят фильтр-насос производительностью 1249 л/ч для очистки и циркуляции воды, картридж, шланги и хомуты, необходимые для подключения к бассейну и поплавок-дозатор.<br>
 <br>
</p>
<h3>Характеристики</h3>
 • Размер: 282 х 196 х 84 см.<br>
 • Максимальные монтажные размеры: 323 x 229 см.<br>
 • Объем&nbsp;&nbsp;при 90% заполнения бассейна: 3662 литра<br>
 • Внутренняя чаша бассейна из прочного трехслойного материала TriTech™.<br>
 • Цвет серый<br>
 • Облицовка интерьера мозаикой из гальки<br>
 • Возможна простая сборка без инструментов<br>
 • Чрезвычайно жесткая конструкция рамы с защитой от коррозии для повышения прочности и долговечности<br>
 • Система соединения стальной рамы Seal &amp; Lock ™ для защиты от попадания воды в стрелу.<br>
 • Повышенное сопротивление благодаря гибким С-образным соединителям на углах бассейна<br>
 • Встроенный сливной клапан с адаптером для садового шланга<br>
 <br>
 Вес упаковки: 39.44 кг<br>
 Размер упаковки (см): 129х59х26см<br>
 Объем упаковки (м³): 0.198
<h3>Комплектация</h3>
<ul>
	<li>Металлический каркас</li>
	<li>
	Чаша бассейна</li>
	<li>
	Фильтрационный насос 1249 л / ч</li>
	<li>
	Картридж (тип I)</li>
	<li>
	Шланги и хомуты для подключения фильтр-насоса</li>
	<li>
	Поплавок-дозатор</li>
	<li>
	Ремкомплект</li>
	<li>
	Инструкция</li>
</ul>
 <br>
<p>
 Характеристики и комплектация могут быть изменены производителем без предварительного уведомления.
</p>', 'Размер: 282 x 196 x 84 • Бренд: Bestway', 18750.00, 22500.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"2.82\",\"Ширина (м)\":\"1.96\",\"Высота (м)\":\"0.84\",\"Вес (кг)\":\"39\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"282 x 196 x 84\",\"Объем (л)\":\"3662\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"1250\",\"Размер упаковки (см)\":\"130 х 58 х 25\",\"Артикул\":\"56629\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.4, 59, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (278, 'Каркасный бассейн Bestway Power Steel 404 x 201 x 100 см, артикул 56442', 'karkasnyy-basseyn-bestway-power-steel-404-x-201-x-100-sm-artikul-56442', '56442', '<h2>Каркасный бассейн Bestway Power Steel 404 x 201 x 100 см, артикул 56442</h2><p>
 Прямоугольный каркасный бассейн Bestway 56442 отличается высокой прочностью и устойчивостью. Чаша выполнена из высококачественного трехслойного ПВХ: два слоя плотного винила и между ними сетка из полиэстера для особой прочности. Цвет чаши бассейна снаружи светло-серый, внутренняя поверхность имеет расцветку под мозаику. Каркас металлический, покрытый предотвращающим появление коррозии слоем.<br>
 <br>
 Не требует бетонирования и подготовки ямы, все, что нужно, это плоская, горизонтальная площадка. Сезонный бассейн (рекомендуется разбирать на холодное время года) обладает простой конструкцией - может быть легко разобран и собран заново. Время сборки и подключения бассейна составляет около 60 мин.<br>
 <br>
 Удобный сливной клапан позволяет присоединить садовый шланг, что дает возможность слить воду в любое место.<br>
 <br>
 В комплект поставки входят песочный фильтр-насос производительностью 3028 л/ч для очистки и циркуляции воды, шланги и хомуты, необходимые для подключения к бассейну, лестница и поплавок-дозатор для химии.<br>
 Для работы фильтр-насоса необходим песок кварцевый 0.4-0.8 мм или стеклянный 0.5-1.0 мм (в комплект поставки не входит, необходимо докупать отдельно).<br>
 <br>
</p>
<h3>Характеристики</h3>
 • Размер: 404 х 201 х 100 см.<br>
 • Максимальные монтажные размеры: 441 x 241 см.<br>
 • Объем при 90% заполнении бассейна: 6478 литров<br>
 • Внутренняя чаша бассейна из прочного трехслойного материала TriTech™.<br>
 • Цвет: серый<br>
 • Облицовка интерьера мозаикой из гальки<br>
 • Возможна простая сборка без инструментов<br>
 • Чрезвычайно жесткая конструкция рамы с защитой от коррозии для повышения прочности и долговечности<br>
 • Система соединения стальной рамы Seal &amp; Lock ™ для защиты от попадания воды в стрелу.<br>
 • Повышенное сопротивление благодаря гибким С-образным соединителям на углах бассейна<br>
 • Встроенный сливной клапан с адаптером для садового шланга<br>
 • Производительность песочного фильтр-насоса: 3028 л/ч.<br>
 <br>
 Вес упаковки: 66.93 кг.<br>
 Размер упаковки: 39х 59.5х165 см<br>
 Объем упаковки: 0,383 м3
<h3>Комплектация</h3>
<ul>
	<li>Металлический каркас</li>
	<li>
	Чаша бассейна</li>
	<li>
	Песочный фильтр-насос</li>
	<li>
	Шланги и хомуты для подключения фильтр-насоса</li>
	<li>
	Лестница</li>
	<li>
	Поплавок-дозатор</li>
	<li>
	Ремкомплект</li>
	<li>
	Инструкция</li>
</ul>
<p>
 Характеристики и комплектация могут быть изменены производителем без предварительного уведомления.
</p>', 'Размер: 404 x 201 x 100 • Бренд: Bestway', 30000.00, 37500.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"4.04\",\"Ширина (м)\":\"2.01\",\"Высота (м)\":\"1\",\"Вес (кг)\":\"67\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"404 x 201 x 100\",\"Объем (л)\":\"6478\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"3028\",\"Размер упаковки (см)\":\"37 х 58 х 129\",\"Артикул\":\"56442\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.5, 36, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (277, 'Каркасный бассейн Bestway Steel Pro MAX 457 x 122 см, артикул 56438', 'karkasnyy-basseyn-bestway-steel-pro-max-457-x-122-sm-artikul-56438', '56438', '<h2>Каркасный бассейн Bestway Steel Pro MAX 457 x 122 см, артикул 56438</h2><p>
 Каркасный бассейн Steel Pro Max Bestway 56438 457x122&nbsp;- недорогая качественная модель. Быстро и легко устанавливается. Процесс сборки бассейна до наполнения водой занимает всего 30 минут.
</p>
<p>
 Каркас бассейна Bestway Steel Pro Frame Pool состоит из высокопрочной стали, что обеспечивает высокую устойчивость. Материал защищен от коррозии. Чаша изготовлена из трехслойного поливинилхлорида, что гарантирует долгую службу, при правильной эксплуатации. Поддержанию формы бассейна Bestway способствует лента из полипропилена, опоясывающая весь бассейн.
</p>
<p>
 Выбор серии Steel Pro Max будет идеальным решением для тех, кто хочет организовать на своем участке полноценный бассейн на весь летний сезон.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн Bestway Steel Pro Max 4.57 x 1.22 м</li>
	<li>Картриджный насос-фильтр 3028 л/ч</li>
	<li>Фильтрующий картридж тип II</li>
	<li>Лестница без площадки</li>
	<li>Тент для бассейна</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 457 x 122 • Бренд: Bestway', 25500.00, 33750.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Диаметр (м)\":\"4.57\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"64\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"457 x 122\",\"Объем (л)\":\"16015\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"3028\",\"Размер упаковки (см)\":\"61 х 39 х 123\",\"Артикул\":\"56438\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 5.0, 64, true, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (276, 'Каркасный бассейн Bestway Steel Pro MAX 366 x 133 см, артикул 15427', 'karkasnyy-basseyn-bestway-steel-pro-max-366-x-133-sm-artikul-15427', '15427', '<h2>Каркасный бассейн Bestway Steel Pro MAX 366 x 133 см, артикул 15427</h2><p>Каркасный бассейн Bestway 15427 размером 366x133 см отличается высокой прочностью и устойчивостью. Чаша выполнена из высококачественного трехслойного ПВХ: два слоя плотного винила и один - полиэстер для особой прочности.</p>

<p>Не требует бетонирования и подготовки ямы, все, что нужно, это плоская, горизонтальная площадка. Сезонный бассейн (рекомендуется разбирать на холодное время года) обладает простой конструкцией - может быть легко разобран и собран заново. Время сборки и подключения бассейна не более 1-2 часов.</p>

<p>Удобный сливной клапан позволяет присоединить садовый шланг, что дает возможность слить воду в любое место.
</p>
<h3>В комплект поставки бассейна входит</h3>
 <br>
<ul>
	<li>Каркасный бассейн Bestway Steel Pro Max 3.66 x 1.33 м</li>
	<li>Картриджный насос-фильтр 2006 л/ч</li>
 <li>Лестница без площадки</li>
	<li>Фильтрующий картридж тип II</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 366 x 133 • Бренд: Bestway', 23250.00, 30000.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Диаметр (м)\":\"3.66\",\"Высота (м)\":\"1.33\",\"Вес (кг)\":\"48\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"366 x 133\",\"Объем (л)\":\"11174\",\"Насос-фильтр (л/ч)\":\"2006\",\"Размер упаковки (см)\":\"59 х 41 х 116\",\"Артикул\":\"15427\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Синий\"}"', 4.7, 24, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (275, 'Каркасный бассейн Bestway Steel Pro MAX 488 x 122 см, артикул 5612Z', 'karkasnyy-basseyn-bestway-steel-pro-max-488-x-122-sm-artikul-5612z', '5612Z', '<h2>Каркасный бассейн Bestway Steel Pro MAX 488 x 122 см, артикул 5612Z</h2>
<p>Нет ничего лучше, чем собственный бассейн в собственном саду! Каркасный бассейн Steel Pro MAX™ от Bestway® предлагает чрезвычайно прочное и недорогое решение для этой цели. Прочная конструкция: прочная стальная рама обеспечивает устойчивость и абсолютную долговечность. Наша инновационная система ClickConnect System™ обеспечивает надежное соединение отдельных элементов и упрощает настройку бассейна без использования дополнительных инструментов. Разъемы также предотвращают контакт металла с металлом, обеспечивая устойчивость к коррозии и ржавчине. Облицовка бассейна изготовлена из прочного трехслойного материала DuraPlus™, который на 15&nbsp;% более устойчив к разрывам, на 33&nbsp;% более эластичен и на 83&nbsp;% более устойчив к проколам, чем традиционный ПВХ. Благодаря этому вы сможете наслаждаться бассейном летом за летом. . Комплект поставки: В комплект также входят фильтр-насос, страховочная лестница и брезент. Этот бассейн также можно легко разобрать и хранить, чтобы сэкономить место вне купального сезона. Для контролируемого слива воды можно просто подсоединить садовый шланг к встроенному сливному клапану. Лето может начаться с каркасного бассейна Steel Pro MAX™ от Bestway®!</p>

<p>Инфрмация о товаре:</p>
<ul>
<li>Размер: Ø 488 х 122 см</li>
<li>Вместимость воды (90%): 19 480 литров</li>
<li>Прочный трехслойный материал DuraPlus™</li>
<li>Лента ПВХ для дополнительной устойчивости боковых стенок</li>
<li>Возможность подключения фильтрующей системы (Ø 38 мм)</li>
<li>Соединение с системой ClickConnect™</li>
<li>Т-образный соединитель из пластика</li>
<li>Защита от коррозии</li>
<li>Антипригарное покрытие (матовый каркас)</li>
<li>Цвет: светло-серый</li>
<li>Внутренняя облицовка под мозаику из гальки</li>
<li>Легко собрать без инструментов</li>
<li>Встроенный сливной клапан с переходником для садового шланга</li>
</ul>

<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн Bestway Round Steel Pro MAX</li>
	<li>Картриджный насос-фильтр 5678 л/ч</li>
	<li>Лестница без площадки</li>
	<li>Тент для бассейна</li>
	<li>Фильтрующий картридж тип III</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 488 x 122 • Бренд: Bestway', 32250.00, 45000.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Диаметр (м)\":\"4.88\",\"Высота (м)\":\"1.2\",\"Вес (кг)\":\"69.51\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"488 x 122\",\"Объем (л)\":\"19480\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"5678\",\"Размер упаковки (см)\":\"58 х 46 х 125\",\"Артикул\":\"5612Z\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.6, 41, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (274, 'Каркасный бассейн Bestway Steel Pro MAX 427 x 122 см, артикул 5612X', 'karkasnyy-basseyn-bestway-steel-pro-max-427-x-122-sm-artikul-5612x', '5612X', '<h2>Каркасный бассейн Bestway Steel Pro MAX 427 x 122 см, артикул 5612X</h2><p>
 Каркасный бассейн от производителя Bestway 5612X гарантирует вам прекрасный отдых в кругу семьи. Основной особенностью этого бассейна является простая и быстрая установка, которая не займет у вас много времени и сил, а также новая расцветка.
</p>
<p>
 Каркасные бассейны&nbsp;Bestway Steel Pro Max&nbsp;являются улучшенной версией моделей серии Steel Pro. Усиленный каркас повышает жесткость изделия, делая его еще долговечнее и устойчивее. В отличие от прошлых моделей Steel Pro с круглыми трубками, серия MAX имеет каркас из овальных трубок увеличенной площади. Покрытие Framelink защищает каркас от ржавчины, гарантирует высокую надежность и долговечность всей конструкции. Система Seal and Lock System обеспечивает надежную фиксацию всех элементов. Чаша бассейнов&nbsp;выполнена из трехслойного армированного поливинилхлорида повышенной прочности Tritech.
</p>
<p>
 Предусмотрен сливной клапан, который подсоединяется к садовому шлангу. В комплектацию данного бассейна входит картриджный фильтр и лестница, которая обеспечивает удобный вход в бассейн. Бассейн Bestway 5612X станет лучшим приобретением для незабываемого время провождения, которое подарит вам массу положительных эмоций.
</p>
<h3>Особенности:</h3>
<ul>
	<li>Быстрый монтаж</li>
	<li>Большая вместительность</li>
	<li>Безопасная устойчивая конструкция</li>
	<li>Три прочных слоя стенки</li>
	<li>Сливной клапан</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн Bestway "Round Steel Pro MAX"</li>
	<li>Картриджный насос-фильтр 3028 л/ч </li>
	<li>Лестница без площадки </li>
	<li>Тент для бассейна</li>
	<li>Фильтрующий картридж тип II</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 427 x 122 • Бренд: Bestway', 27750.00, 37500.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Диаметр (м)\":\"4.27\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"58\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"427 x 122\",\"Объем (л)\":\"15232\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"3028\",\"Размер упаковки (см)\":\"61 х 39 х 123\",\"Артикул\":\"5612X\",\"Тип бассейна\":\"Каркасный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.8, 30, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (273, 'Каркасный бассейн Bestway Steel Pro MAX 549 x 122 см, артикул 56462', 'karkasnyy-basseyn-bestway-steel-pro-max-549-x-122-sm-artikul-56462', '56462', '<h2>Каркасный бассейн Bestway Steel Pro MAX 549 x 122 см, артикул 56462</h2><p>
	Каркасный бассейн от производителя Bestway гарантирует вам прекрасный отдых в кругу семьи. Основной особенностью этого бассейна является простая и быстрая установка, которая не займет у вас много времени и сил.
</p>
<p>
	Каркасные бассейны&nbsp;Bestway Steel Pro Max&nbsp;являются улучшенной версией моделей серии Steel Pro. Усиленный каркас повышает жесткость изделия, делая его еще долговечнее и устойчивее. В отличие от прошлых моделей Steel Pro с круглыми трубками, серия MAX имеет каркас из овальных трубок увеличенной площади. Покрытие Framelink защищает каркас от ржавчины, гарантирует высокую надежность и долговечность всей конструкции. Система Seal and Lock System обеспечивает надежную фиксацию всех элементов. Чаша бассейнов&nbsp;выполнена из трехслойного армированного поливинилхлорида повышенной прочности Tritech.
</p>
<p>
	Конструкция каркасного бассейна не имеет острых углов, что обеспечивает безопасную эксплуатацию. Предусмотрен сливной клапан, который подсоединяется к садовому шлангу. В комплектацию данного бассейна входит картриджный фильтр и лестница, которая обеспечивает удобный вход в бассейн. Бассейн Bestway 56462 станет лучшим приобретением для незабываемого время провождения, которое подарит вам массу положительных эмоций.
</p>
<h3>Особенности:</h3>
<ul>
	<li>Быстрый монтаж</li>
	<li>Большая вместительность</li>
	<li>Безопасная устойчивая конструкция</li>
	<li>Три прочных слоя стенки</li>
	<li>Сливной клапан</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн&nbsp;Bestway Steel Pro&nbsp;Max Pool</li>
	<li>Картриджный насос-фильтр 5678 л/ч</li>
	<li>Лестница без площадки)</li>
	<li>Тент для бассейна</li>
	<li>Фильтрующий картридж тип III</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 549 x 122 • Бренд: Bestway', 39750.00, 45000.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Диаметр (м)\":\"5.49\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"78\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"549 x 122\",\"Объем (л)\":\"24311\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"5678\",\"Размер упаковки (см)\":\"58 х 46 х 125\",\"Артикул\":\"56462\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.9, 44, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (272, 'Каркасный бассейн Bestway Power Steel Frame 640 x 274 x 132 см, артикул 5611Z', 'karkasnyy-basseyn-bestway-power-steel-frame-640-x-274-x-132-sm-artikul-5611z', '5611Z', '<h2>Каркасный бассейн Bestway Power Steel Frame 640 x 274 x 132 см, артикул 5611Z</h2><p>
 С каркасными прямоугольными бассейнами&nbsp;5611Z от известного производителя Bestway вы создадите прекрасный и незабываемый отдых в кругу семьи или друзей. Основной особенностью этого бассейна является простая и быстрая установка, которая не займет у вас много времени и сил. Каркас имеет повышенную прочность, которая достигается применением гибких С-образных соединителей стержней на углах бассейна. Покрытие Framelink защищает каркас от ржавчины, гарантирует высокую надежность и долговечность всей конструкции. Система Seal and Lock System обеспечивает надежную фиксацию всех элементов. Чаша бассейнов&nbsp;выполнена из трехслойного армированного поливинилхлорида повышенной прочности Tritech.
</p>
<p>
 Встроенный дозатор - уникальная особенность&nbsp;бассейнов.
</p>
<p>
 Встроенный дозатор&nbsp;используется для равномерного дозирования хлора, что позволяет сохранять воду чистой и безопасной, предотвращая размножение вредоносных бактерий и микроорганизмов.
</p>
<p>
 Предусмотрен сливной клапан, который подсоединяется к садовому шлангу. Бассейн Power Steel Set 5611Z станет отличным приобретением для вас и ваших детей.
</p>
<h3>Особенности:</h3>
<ul>
	<li>Встроенный дозатор хлора</li>
	<li>Внутренняя отделка чаши под голубую мозаику</li>
	<li>Быстрый монтаж</li>
	<li>Безопасная конструкция</li>
	<li>Большая вместительность</li>
	<li>Безопасная устойчивая конструкция</li>
	<li>Трехслойный ПВХ с армированной сеткой из полиэстера</li>
	<li>Сливной клапан</li>
</ul>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн Bestway Rectangular Frame Pool</li>
	<li>Картриджный насос-фильтр 5678 л/ч</li>
	<li>Фильтрующий картридж тип III</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 640 x 274 x 132 • Бренд: Bestway', 69000.00, 75000.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"6.4\",\"Ширина (м)\":\"2.74\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"136\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"640 x 274 x 132\",\"Объем (л)\":\"19281\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"5678\",\"Размер упаковки (см)\":\"67 х 63 х 167\",\"Артикул\":\"5611Z\",\"Тип бассейна\":\"Каркасный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.0, 61, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (271, 'Каркасный бассейн Bestway Power Steel 305 x 200 x 84 см, артикул 5614A', 'karkasnyy-basseyn-bestway-power-steel-305-x-200-x-84-sm-artikul-5614a', '5614a', '<h2>Каркасный бассейн Bestway Power Steel 305 x 200 x 84 см, артикул 5614A</h2><p>
 Сборный каркасный бассейн овальной формы "Bestway 5614A Power Steel Oval Frame Pool" с простой, стабильной и надёжной конструкцией. Даже при больших нагрузках металлический каркас бассейна обеспечит необходимый запас прочности. Всего 30 минут потребуется на сборку и установку конструкции. Материал прочный, стойкий к ударам, воздействию солнечного света, растягиваниям и стираниям. Каркасные бассейны удобны в хранении и в сложенном виде не займут много места. В чаше бассейна установлен клапан для слива воды и разъемы для подключения фильтрующего насоса.<br>
 <br>
</p>
<h3>Характеристики</h3>
<ul>
	<li>Серия Power Steel</li>
	<li>Трехслойный ПВХ с армировочной сеткой из полиэстера</li>
	<li>Класс ПВХ премиальный</li>
	<li>Жесткий трехслойный фиксирующий пояс</li>
	<li>Повышенная защита от механического и UV воздействия</li>
	<li>Общая толщина стенок 0.60-0.90 мм</li>
	<li>Металлический каркас с антикоррозийным покрытием</li>
	<li>Внутренняя отделка чаши под голубую мозаику</li>
	<li>Сливной клапан</li>
	<li>Размер: 305 х 200 х 84 см.</li>
	<li>Максимальные монтажные размеры: 305 x 233 см.</li>
	<li>Объем при 90% заполнения бассейна: 3668 литров</li>
	<li>Внутренняя чаша бассейна из прочного трехслойного материала TriTech™.</li>
	<li>Цвет серый</li>
	<li>Облицовка интерьера мозаикой из гальки</li>
	<li>Возможна простая сборка без инструментов</li>
	<li>Чрезвычайно жесткая конструкция рамы с защитой от коррозии для повышения прочности и долговечности</li>
	<li>Система соединения стальной рамы Seal &amp; Lock ™ для защиты от попадания воды в стрелу.</li>
	<li>Лента ПВХ обеспечивает дополнительную устойчивость боковых стенок.</li>
	<li>Встроенный сливной клапан с адаптером для садового шланга<br>
 </li>
</ul>
<h3>Комплектация</h3>
<ul>
	<li>Насос с фильтром 1249 л / ч</li>
	<li>Картридж фильтра</li>
	<li>Дозатор химикатов</li>
	<li>Самоклеящаяся заплатка для ремонта<br>
 </li>
</ul>
<p>
 Характеристики и комплектация могут быть изменены производителем без предварительного уведомления.
</p>', 'Размер: 305 x 200 x 84 • Бренд: Bestway', 18750.00, 22500.00, NULL, 'Bestway', '[]', '"{\"Бренд\":\"Bestway\",\"Длина (м)\":\"3.05\",\"Ширина (м)\":\"2\",\"Высота (м)\":\"0.84\",\"Вес (кг)\":\"32\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"305 x 200 x 84\",\"Объем (л)\":\"3668\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"1250\",\"Размер упаковки (см)\":\"57 x 33 x 102\",\"Артикул\":\"5614a\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Металлический\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.4, 36, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (270, 'Каркасный бассейн INTEX Ultra Frame XTR 549 x 274 x 132 см, артикул 26356', 'karkasnyy-basseyn-intex-ultra-frame-xtr-549-x-274-x-132-sm-artikul-26356', '26356', '<h2>Каркасный бассейн INTEX Ultra Frame XTR 549 x 274 x 132 см, артикул 26356</h2><p>
 Каркасный бассейн&nbsp;Intex&nbsp;Ultra&nbsp;XTR&nbsp;Frame&nbsp;26356&nbsp;из линейки бассейнов класса премиум, сочетающий в себе высокое качество и невысокую цену, по сравнению со стационарными бассейнами.&nbsp;Материал чаши бассейна выполнен по технологии SUPER-TOUGH из высококачественного ПВХ. Это плотный армированный материал из трех спаянных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Он не подвержен воздействию солнечных лучей, растягиванию и истиранию. Толщина стенок полотна -&nbsp;0,67 мм. Прочность бассейна обеспечивает усиленный стальной каркас. Благодаря такому каркасу в бассейне могу находиться несколько людей сразу, как взрослых так и детей. По сравнению с круглыми большими бассейнами прямоугольные позволяют более компактно и полноценно использовать личный участок. Более того, прямоугольная форма дает возможность устроить заплыв в длину или командную игру в мяч.
</p>
<p>
 Песочный фильтрующий насос обеспечивает рециркуляцию и очистку воды, что позволяет менять воду не чаще 1 раза в месяц. Удобный сливной клапан присоединяется к садовому шлангу. Таким образом, воду можно слить в любое удобное место или, например, полить сад.&nbsp; &nbsp;
</p>
<p>
 Каркасный бассейн&nbsp;Intex&nbsp;Ultra&nbsp;XTR&nbsp;Frame&nbsp;быстро и легко устанавливается. Процесс сборки бассейна до наполнения водой занимает всего около 60 минут.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Ultra Frame XTR 5.49 x 2.74 x 1.32 м</li>
	<li>Песочный насос-фильтр 5700 л/ч</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>
 <br>
 <br>
<blockquote>
	<h2><span style="color: #d3115a;">Обратите внимание!</span></h2>
	<ul>
 <li>Производительность насоса в режиме фильтрации - 4000 литров в час</li>
 <li>Засыпка кварцевого песка - 12 кг (покупается отдельно)</li>
	</ul>
 <br>
</blockquote>
<p>
 Купить кварцевый песок (мешок 25 кг)
</p>
 <br>
 <br>', 'Размер: 549 x 274 x 132 • Бренд: Intex', 51000.00, 82500.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"5.49\",\"Ширина (м)\":\"2.74\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"130\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"549 x 274 x 132\",\"Объем (л)\":\"17203\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"5700\",\"Размер упаковки (см)\":\"62 х 66 х 151\",\"Артикул\":\"26356\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.7, 10, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (269, 'Каркасный бассейн INTEX Prism Frame 457 x 122 см, артикул 26726', 'karkasnyy-basseyn-intex-prism-frame-457-x-122-sm-artikul-26726', '26726', '<h2>Каркасный бассейн INTEX Prism Frame 457 x 122 см, артикул 26726</h2><p>
 Все бассейны серии Prism Frame имеют усиленный каркас!
</p>
<p>
 Сборный каркасный бассейн серии Intex Prism Frame круглой формы с фильтр-насосом и лестницей. Запатентованная технология SUPER-TOUGH обеспечивает надежность и долговечность бассейна.
</p>
<p>
 Стенки бассейна сделаны из трех отдельных особо прочных слоев: два слоя плотного винила и один - полиэстр для особой прочности. Поддержанию формы бассейна Prism Frame Pool способствует лента из полипропилена, «опоясывающая» весь бассейн. Также прочность бассейна Prism Frame Pool обуславливается его стальным каркасом, благодаря которому бассейн выдерживает большие нагрузки, в нем одновременно могут купаться несколько человек. Не требует подготовки грунта, насыпке песка и т.п., все, что нужно, это плоская, горизонтальная площадка.
</p>
<p>
 Процесс сборки бассейна до наполнения водой занимает 45-60 минут.
</p>
<h3>
В комплект поставки бассейна входит: </h3>
<ul>
	<li>Каркасный бассейн Intex Prism Frame Pool.</li>
	<li>Картриджный насос-фильтр 3785 л/ч</li>
	<li>Фильтрующий картридж тип А </li>
	<li>Лестница с площадкой.</li>
	<li>Тент для бассейна.</li>
	<li>Подстилка под бассейн.</li>
	<li>Руководство по эксплуатации.</li>
</ul>
<p>
 Размер упаковки: 40 х 70 х 130 см<br>
 Объем упаковки: 0,36 m<sup>3</sup><br>
 Вес: 73.4 кг
</p>', 'Размер: 457 x 122 • Бренд: Intex', 25500.00, 33750.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"4.57\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"73.4\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"457 x 122\",\"Объем (л)\":\"16805\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"3785\",\"Размер упаковки (см)\":\"40 х 70 х 130\",\"Артикул\":\"26726\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.9, 21, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (268, 'Каркасный бассейн INTEX Ultra Frame XTR 549 x 132 см, артикул 26330', 'karkasnyy-basseyn-intex-ultra-frame-xtr-549-x-132-sm-artikul-26330', '26330', '<h2>Каркасный бассейн INTEX Ultra Frame XTR 549 x 132 см, артикул 26330</h2><p>
 Каркасный бассейн Intex Ultra XTR Frame 26330 из линейки бассейнов класса премиум, сочетающий в себе высокое качество и невысокую цену, по сравнению со стационарными бассейнами.
</p>
<p>
 Стенки бассейна сделаны из трех отдельных слоев: два слоя плотного винила и один - полиэстр для особой прочности. Толщина стенок полотна -0,64 мм. Поддержанию формы бассейна способствует лента из полипропилена, опоясывающая весь бассейн. Уникально разработанный каркас сочетает высококачественную оцинкованную сталь с высокоточной системой запирания, повышая общее качество, долговечность и надежность бассейнов. Инкапсулирующее внутреннее и наружное порошковое покрытие обеспечивает максимальную стойкость к ржавчине. Простота сборки каркасаEasy Lock System- элементы просто защелкиваются между собой без необходимости фиксации штифтами. Благодаря этому каркасу, сборно-разборные бассейны выдерживают большие нагрузки.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Ultra Frame XTR 5.49 x 1.32 м</li>
	<li>Песочный насос-фильтр 7900 л/ч</li>
	<li>Лестница с площадкой)</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>
 <br>
 <br>
<blockquote>
	<h2><span style="color: #d3115a;">Обратите внимание!</span></h2>
	<ul>
 <li>Производительность насоса в режиме фильтрации - 6000 литров в час</li>
 <li>Засыпка кварцевого песка - 23 кг (покупается отдельно)</li>
	</ul>
 <br>
</blockquote>
<p>
 Купить кварцевый песок (мешок 25 кг)
</p>
 <br>
 <br>', 'Размер: 549 x 132 • Бренд: Intex', 51000.00, 75000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"5.49\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"128.1\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"549 x 132\",\"Объем (л)\":\"24426\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"7900\",\"Размер упаковки (см)\":\"53 х 94 х 129\",\"Артикул\":\"26330\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.7, 22, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (267, 'Каркасный бассейн INTEX Prism Frame 366 x 99 см, артикул 26716', 'karkasnyy-basseyn-intex-prism-frame-366-x-99-sm-artikul-26716', '26716', '<h2>Каркасный бассейн INTEX Prism Frame 366 x 99 см, артикул 26716</h2><p>
 Чтобы установить&nbsp;каркасный бассейн intex 26716 достаточно внимательно прочитать инструкцию - специальное&nbsp; техническое оборудование не потребуется, для установки лестницы и фильтра достаточно обычной отвертки.
</p>
<p>
 При производстве бассейнов Intex используется современная технология SUPER-TOUGH, которая придает бассейнам особую прочность.&nbsp;Каркасно-сборные бассейны Intex опоясаны полипропиленовой лентой, которая поддерживает форму бассейна. Прочность бассейну придает и стальной каркас. Именно благодаря ему в бассейне могут одновременно находится несколько человек, как взрослых, так и детей. Для установки бассейна Intex специальной подготовки грунта не требуется - все достаточно просто и быстро. Когда появится необходимость слить воду, достаточно подсоединить садовый шланг к сливному клапану бассейна.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Prism Frame 3.66 x 0.99 м</li>
	<li>Картриджный насос-фильтр 2006 л/ч</li>
	<li>Фильтрующий картридж тип A</li>
	<li>Лестница без площадки</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 366 x 99 • Бренд: Intex', 14250.00, 18750.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"3.66\",\"Высота (м)\":\"0.99\",\"Вес (кг)\":\"40.8\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"366 x 99\",\"Объем (л)\":\"8592\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"2006\",\"Размер упаковки (см)\":\"40 х 50 х 117\",\"Артикул\":\"26716\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.2, 59, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (266, 'Каркасный бассейн INTEX Metal Frame 457 x 122 см, артикул 28242', 'karkasnyy-basseyn-intex-metal-frame-457-x-122-sm-artikul-28242', '28242', '<h2>Каркасный бассейн INTEX Metal Frame 457 x 122 см, артикул 28242</h2><p>
 Каркасный бассейн Intex 28242 Metal Frame Pool 457x122&nbsp;очень удачная модуль, продается в огромном количестве, благодаря своей низкой цене и высокому качеству. Металлический каркас состоит из соединительных уголков, трубок-перемычек и стоек. Все детали окрашены и устойчивы к истиранию. Каркасные сборные бассейны - это простая и недорогая альтернатива стационарным дорогостоящим бассейнам. Для установки не потребуется дополнительных инструментов и специальной подготовки площадки.
</p>
<p>
 Материал чаши бассейна выполнен по технологии SUPER-TOUGH из высококачественного ПВХ. Это плотный армированный материал из трех спаянных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Он не подвержен воздействию солнечных лучей, растягиванию и истиранию. Толщина стенок полотна -&nbsp;0,58 мм.
</p>
<p>
 Примерно в 3 сантиметрах от нижней кромки бассейна находится сливной клапан, он позволит вам подключить садовый шланг и слить воду из бассейна куда удобно. Сливной клапан поставляется в комплекте, он хранится в пакете с тремя черными заглушками 32 мм.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Metal Frame 4.57 x 1.22 м</li>
	<li>Картриджный насос-фильтр 3785 л/ч</li>
	<li>Фильтрующий картридж&nbsp;тип А</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 457 x 122 • Бренд: Intex', 24000.00, 33750.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"4.57\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"73.4\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"457 x 122\",\"Объем (л)\":\"16805\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"3785\",\"Размер упаковки (см)\":\"52 х 56 х 130\",\"Артикул\":\"28242\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Синий\"}"', 4.8, 23, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (265, 'Каркасный бассейн INTEX Prism Frame 400 x 200 x 122 см, артикул 26790', 'karkasnyy-basseyn-intex-prism-frame-400-x-200-x-122-sm-artikul-26790', '26790', '<h2>Каркасный бассейн INTEX Prism Frame 400 x 200 x 122 см, артикул 26790</h2><p>
 Сборный каркасный бассейн серии Intex Prism Frame прямоугольной формы в DELUXE комплектации с фильтр-насосом, лестницей.
</p>
<p>
 Запатентованная технология SUPER-TOUGH обеспечивает надежность и долговечность бассейна. Стенки бассейна сделаны из трех отдельных особо прочных слоев: два слоя плотного винила и один - полиэстр для особой прочности. Поддержанию формы бассейна Prism Frame Pool способствует лента из полипропилена, «опоясывающая» весь бассейн. Также прочность бассейна Prism Frame Pool обуславливается его стальным каркасом, благодаря которому бассейн выдерживает большие нагрузки, в нем одновременно могут купаться несколько человек.
</p>
<p>
 Не требует подготовки грунта, насыпке песка и т.п., все, что нужно, это плоская, горизонтальная площадка.
</p>
<p>
 Процесс сборки бассейна до наполнения водой занимает 45 минут.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Prism Frame Rectangular 4.0 x 2.0 x 1.22 м</li>
	<li>Картриджный насос-фильтр 2006 л/ч</li>
	<li>Фильтрующий картридж тип А </li>
	<li>Лестница с площадкой</li>
	<li>Ремкомплект</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 400 x 200 x 122 • Бренд: Intex', 34500.00, 48750.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"4\",\"Ширина (м)\":\"2\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"87\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"400 x 200 x 122\",\"Объем (л)\":\"8418\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"2006\",\"Размер упаковки (см)\":\"59 х 53 х 138\",\"Артикул\":\"26790\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.7, 47, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (264, 'Каркасный бассейн INTEX Ultra Frame XTR 488 x 122 см, артикул 26326', 'karkasnyy-basseyn-intex-ultra-frame-xtr-488-x-122-sm-artikul-26326', '26326', '<h2>Каркасный бассейн INTEX Ultra Frame XTR 488 x 122 см, артикул 26326</h2><p>
 Каркасный бассейн Intex&nbsp;Ultra&nbsp;XTR&nbsp;Frame&nbsp;26326 из линейки бассейнов класса премиум, сочетающий в себе высокое качество и невысокую цену, по сравнению со стационарными бассейнами.
</p>
<p>
 Стенки бассейна сделаны из трех отдельных слоев: два слоя плотного винила и один - полиэстр для особой прочности. Толщина стенок полотна - 0,64 мм. Поддержанию формы бассейна&nbsp;способствует лента из полипропилена, опоясывающая весь бассейн. Уникально разработанный каркас сочетает высококачественную оцинкованную сталь с высокоточной системой запирания, повышая общее качество, долговечность и надежность бассейнов. Инкапсулирующее внутреннее и наружное порошковое покрытие обеспечивает максимальную стойкость к ржавчине.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Ultra Frame XTR 4.88 x 1.22 м</li>
	<li>Песочный насос-фильтр 5700 л/ч</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна 488 см</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>
 <br>
 <br>
<blockquote>
	<h2><span style="color: #d3115a;">Обратите внимание!</span></h2>
	<ul>
 <li>Производительность насоса в режиме фильтрации - 4000 литров в час</li>
 <li>Засыпка кварцевого песка - 12 кг (покупается отдельно)</li>
	</ul>
 <br>
</blockquote>
<p>
 Купить кварцевый песок (мешок 25 кг)
</p>
 <br>
 <br>', 'Размер: 488 x 122 • Бренд: Intex', 43500.00, 52500.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"4.88\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"103.3\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"488 x 122\",\"Объем (л)\":\"19156\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"5700\",\"Размер упаковки (см)\":\"54 x 75 x 130\",\"Артикул\":\"26326\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.5, 50, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (263, 'Каркасный бассейн INTEX GreyWood Prism Frame 457 x 122 см, артикул 26742', 'karkasnyy-basseyn-intex-greywood-prism-frame-457-x-122-sm-artikul-26742', '26742', '<h2>Каркасный бассейн INTEX GreyWood Prism Frame 457 x 122 см, артикул 26742</h2><p>
 Каркасный бассейн Intex GreyWood Prism Frame Premium - особенностью этого бассейна является премиальное полотно с принтом под дерево. А также усиленный металический каркас Prism Frame последнего поколения с антикорозийным слоем. Размер: 457x122 см.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX GreyWood Prism Frame Premium 4.57 x 1.22 м</li>
	<li>Картриджный насос-фильтр 3785 л/ч</li>
	<li>Картридж тип А</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 457 x 122 • Бренд: Intex', 27000.00, 37500.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"4.57\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"73\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"457 x 122\",\"Объем (л)\":\"16806\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"3785\",\"Размер упаковки (см)\":\"40 х 70 х 130\",\"Артикул\":\"26742\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серое дерево\"}"', 4.8, 20, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (261, 'Каркасный бассейн INTEX Prism Frame 400 x 200 x 100 см, артикул 26788', 'karkasnyy-basseyn-intex-prism-frame-400-x-200-x-100-sm-artikul-26788', '26788', '<h2>Каркасный бассейн INTEX Prism Frame 400 x 200 x 100 см, артикул 26788</h2><p>
 Каркасный бассейн Intex 26788 Rectangular Prism Frame Pool 400x200x100 - совмещает в себе следующие качества: надежность, гарантия долговременной службы (более прочный каркас нежели у Metal Frame Pool), привлекательный внешний вид, большой размер, хорошая комплектация. Прямоугольная форма позволяет ему с легкостью вписаться в узкий сад или двор. Материал чаши&nbsp;выполнен по технологии SUPER-TOUGH из высококачественного ПВХ. Это плотный армированный материал из трех спаянных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Он не подвержен воздействию солнечных лучей, растягиванию и истиранию. Прочность обеспечивает усиленный стальной каркас. Благодаря такому каркасу в бассейне могу находиться несколько людей сразу, как взрослых так и детей.
</p>
<p>
 При необходимости вы можете слить воду в любое удобное для вас место, для этого нужно подключить садовый шланг к сливному клапану. Специальной подготовки грунта для установки бассейна не требуется.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Prism Frame 4.00 x 2.00 x 1.00 м</li>
	<li>Картриджный насос-фильтр 2006 л/ч</li>
	<li>Фильтрующий картридж тип&nbsp;А</li>
	<li>Лестница без площадки</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 400 x 200 x 100 • Бренд: Intex', 25500.00, 37500.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"4\",\"Ширина (м)\":\"2\",\"Высота (м)\":\"1\",\"Вес (кг)\":\"68.9\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"400 x 200 x 100\",\"Объем (л)\":\"6836\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"2006\",\"Размер упаковки (см)\":\"51 х 55 х 117\",\"Артикул\":\"26788\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.6, 39, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (260, 'Каркасный бассейн INTEX Prism Frame 427 x 107 см, артикул 26720', 'karkasnyy-basseyn-intex-prism-frame-427-x-107-sm-artikul-26720', '26720', '<h2>Каркасный бассейн INTEX Prism Frame 427 x 107 см, артикул 26720</h2><p>
 Каркасный бассейн Intex 26720. Укомплектован лестницей, тентом, подстилкой и фильтрующим насосом. Металлический каркас состоит из соединительных уголков, трубок-перемычек и стоек. Все детали окрашены и устойчивы к истиранию. Каркасные сборные бассейны - это простая и недорогая альтернатива стационарным дорогостоящим бассейнам.
</p>
<p>
 Бассейн снизу оборудован сливным клапаном. Для того, чтобы слить воду, необходимо присоединить к любому садовому шлангу переходник, который идёт в комплекте с бассейном. Откручиваете заглушку клапана и вворачиваете переходник, при этом сливной клапан откроется сам. Слить воду можно в любое удобное для Вас место.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Prism Frame 4.27 x 1.07 м</li>
	<li>Картриджный насос-фильтр 3785 л/ч</li>
	<li>Фильтрующий картридж тип A</li>
	<li>Лестница без площадки</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 427 x 107 • Бренд: Intex', 21000.00, 26250.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"4.27\",\"Высота (м)\":\"1.07\",\"Вес (кг)\":\"61.7\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"427 x 107\",\"Объем (л)\":\"12706\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"3785\",\"Размер упаковки (см)\":\"42 х 116 х 62\",\"Артикул\":\"26720\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 5.0, 44, true, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (259, 'Каркасный бассейн INTEX Ultra Frame XTR 732 x 366 x 132 см, артикул 26364', 'karkasnyy-basseyn-intex-ultra-frame-xtr-732-x-366-x-132-sm-artikul-26364', '26364', '<h2>Каркасный бассейн INTEX Ultra Frame XTR 732 x 366 x 132 см, артикул 26364</h2><p>
 Каркасный бассейн&nbsp;Intex&nbsp;Ultra&nbsp;XTR&nbsp;Frame&nbsp;26364&nbsp;из линейки бассейнов класса премиум, сочетающий в себе высокое качество и невысокую цену, по сравнению со стационарными бассейнами.&nbsp;Материал чаши бассейна выполнен по технологии SUPER-TOUGH из высококачественного ПВХ. Это плотный армированный материал из трех спаянных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Он не подвержен воздействию солнечных лучей, растягиванию и истиранию. Толщина стенок полотна -&nbsp;0,67 мм. Прочность бассейна обеспечивает усиленный стальной каркас. Благодаря такому каркасу в бассейне могу находиться несколько людей сразу, как взрослых так и детей. По сравнению с круглыми большими бассейнами прямоугольные позволяют более компактно и полноценно использовать личный участок. Более того, прямоугольная форма дает возможность устроить заплыв в длину или командную игру в мяч.
</p>
<p>
 Песочный фильтрующий насос обеспечивает рециркуляцию и очистку воды, что позволяет менять воду не чаще 1 раза в месяц. Удобный сливной клапан присоединяется к садовому шлангу. Таким образом, воду можно слить в любое удобное место или, например, полить сад.&nbsp;
</p>
<p>
 Каркасный бассейн&nbsp;Intex&nbsp;Ultra&nbsp;XTR&nbsp;Frame&nbsp;быстро и легко устанавливается. Процесс сборки бассейна до наполнения водой занимает всего около 60 минут.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Ultra Frame XTR 7.32 x 3.66 x 1.32 м</li>
	<li>Песочный насос-фильтр 7900 л/ч</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>
 <br>
 <br>
<blockquote>
	<h2><span style="color: #d3115a;">Обратите внимание!</span></h2>
	<ul>
 <li>Производительность насоса в режиме фильтрации - 6000 литров в час</li>
 <li>Засыпка кварцевого песка - 23 кг (покупается отдельно)</li>
	</ul>
 <br>
</blockquote>
<p>
 Купить кварцевый песок (мешок 25 кг)
</p>
 <br>
 <br>', 'Размер: 732 x 366 x 132 • Бренд: Intex', 78750.00, 105000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"7.32\",\"Ширина (м)\":\"3.66\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"184.4\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"732 x 366 x 132\",\"Объем (л)\":\"31805\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"7900\",\"Размер упаковки (см)\":\"62 х 93 х 153\",\"Артикул\":\"26364\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.0, 40, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (258, 'Каркасный бассейн INTEX Frame 450 x 220 x 84 см, артикул 28273', 'karkasnyy-basseyn-intex-frame-450-x-220-x-84-sm-artikul-28273', '28273', '<h2>Каркасный бассейн INTEX Frame 450 x 220 x 84 см, артикул 28273</h2><p>
 Каркасный бассейн Intex 28273 Rectangular Frame Pool 4.50 x 2.20 x 0.84 м прекрасно подходит, как для отдыха с семьёй, так и для совместного отдыха с вашими друзьями. Материал чаши бассейна выполнен по технологии SUPER-TOUGH из высококачественного ПВХ. Это плотный армированный материал из трех слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Он не подвержен воздействию солнечных лучей, растягиванию и истиранию.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Rectangular Frame 4.50 x 2.20 x 0.84 м</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 450 x 220 x 84 • Бренд: Intex', 10500.00, 18750.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"4.5\",\"Ширина (м)\":\"2.2\",\"Высота (м)\":\"0.84\",\"Вес (кг)\":\"40\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"450 x 220 x 84\",\"Объем (л)\":\"7127\",\"Насос-фильтр\":\"Без фильтра\",\"Размер упаковки (см)\":\"108 x 37 x 30\",\"Артикул\":\"28273\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Синий\"}"', 4.8, 6, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (256, 'Каркасный бассейн INTEX Prism Frame 503 x 274 x 122 см, артикул 26796', 'karkasnyy-basseyn-intex-prism-frame-503-x-274-x-122-sm-artikul-26796', '26796', '<h2>Каркасный бассейн INTEX Prism Frame 503 x 274 x 122 см, артикул 26796</h2><p>
 Intex 26796 Prism Frame Pool 503x274x122 см. Отличительная черта данных бассейнов – овальная форма каркаса, обеспечивающая отличное сочетание размера бассейна и объема воды, а также легкость и простота сборки, благодаря инновационной технологии каркаса. Приобретая бассейн Интекс, Вы и Ваша семья будете наслаждаться купанием в нем не один год.
</p>
<ul>
	<li>Стенки бассейнов изготавливаются с применением технологии SUPER-TOUGH и имеют три прочных слоя из высококачественного материала. Два наружных слоя изготовлены из плотного высококачественного ПВХ, которые как бы ламинируют слой из прочного полиэстра.</li>
	<li>Бассейн имеет удобный сливной клапан, через который можно аккуратно слить воду, а, присоединив садовый шланг, полить при этом еще и садовую растительность.</li>
</ul>
<p>
 Сборный каркасный бассейн Intex Prism&nbsp;Oval&nbsp;Frame Pool легко и быстро устанавливается. Процесс сборки до наполнения водой занимает 50 минут. Первая сборка, возможно, займет времени побольше.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Prism Frame 5.03 x 2.74 x 1.22 м</li>
	<li>Картриджный насос-фильтр 5678 л/ч</li>
	<li>Фильтрующий картридж тип A</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 503 x 274 x 122 • Бренд: Intex', 42000.00, 60000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"5.03\",\"Ширина (м)\":\"2.74\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"114\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"503 x 274 x 122\",\"Объем (л)\":\"13365\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"5678\",\"Размер упаковки (см)\":\"67 х 60 х 138\",\"Артикул\":\"26796\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.4, 60, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (255, 'Каркасный бассейн INTEX Prism Frame 300 x 175 x 80 см, артикул 26784', 'karkasnyy-basseyn-intex-prism-frame-300-x-175-x-80-sm-artikul-26784', '26784', '<h2>Каркасный бассейн INTEX Prism Frame 300 x 175 x 80 см, артикул 26784</h2><p>
 Каркасный бассейн Intex 26784 легко и быстро устанавливается c применением минимальных технических средств. Красивый, компактный, функциональный, удобный в эксплуатации - это просто идеальный бассейн для дачи, который подарит всей семье много радости. Благодаря своим размерам: длине 3 метра, ширине 1.7 метров и высоте 80 см прямоугольный бассейн Интекс станет идеальным водоемом для обучения детей плаванию в летнее время прямо на дачном участке. Такие достаточно большие размеры каркасного бассейна позволят семье или небольшой компании друзей весело провести время на улице. Можно просто позагорать, плавая на надувном матрасе, или устроить веселые игры с мячом. Процесс сборки, до наполнения бассейна водой, занимает менее часа.
</p>
<p>
 Прочность прямоугольного бассейна обуславливается его стальным каркасом с усиленным порошковым покрытием стальных труб, благодаря которому бассейн выдерживает большие нагрузки. Запатентованная технология Super-Tough обеспечивает надежность и долговечность дачного бассейна. Стенки бассейна изготавливаются из трех отдельных слоев: два слоя сделаны из плотного ПВХ, стойкого к ударам, растягиваниям, стираниям и воздействию солнечных лучей, один слой - из особо прочного полиэстера, укрепляющего стенки бассейна.
</p>
<p>
 Установка бассейна не требует специальной подготовки грунта. Землю нужно тщательно очистить от камушков и веток, которые могут повредить материал чаши и подстилки.
</p>
<p>
 Не устанавливайте бассейн на деревянный настил или тротуарную плитку (даже с использованием подстилки) - они могут повредить дно бассейна.
</p>
<p>
 Характеристики бассейна:
</p>
<ul>
	<li>Размер: длина 300 см, ширина 175 см, высота 80 см.</li>
	<li>Объем: 3539 литров при наполнении на 90%.</li>
	<li>Диаметр отверстия для подключения шлангов:&nbsp;32 мм.</li>
	<li>Цвет чаши бассейна: серый.</li>
	<li>Вес: 48.3 кг.</li>
</ul>
<ol>
</ol>
<p>
 Рекомендован для взрослых и детей от 6 лет.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Prism Frame Rectangular 3.0 x 1.75 x 0.8 м</li>
	<li>Картриджный насос-фильтр 2006 л/ч</li>
	<li>Лестница без площадки</li>
	<li>Фильтрующий картридж тип&nbsp;А</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 300 x 175 x 80 • Бренд: Intex', 18750.00, 26250.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"3\",\"Ширина (м)\":\"1.75\",\"Высота (м)\":\"0.8\",\"Вес (кг)\":\"48.3\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"300 x 175 x 80\",\"Объем (л)\":\"3539\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"2006\",\"Размер упаковки (см)\":\"52 х 45 х 111\",\"Артикул\":\"26784\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.6, 18, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (254, 'Каркасный бассейн INTEX Prism Frame 488 x 244 x 107 см, артикул 26792', 'karkasnyy-basseyn-intex-prism-frame-488-x-244-x-107-sm-artikul-26792', '26792', '<h2>Каркасный бассейн INTEX Prism Frame 488 x 244 x 107 см, артикул 26792</h2><p>
 Каркасный бассейн Intex&nbsp;26792&nbsp;Rectangular Prism Frame Pool 488x244x107&nbsp;- идеальный вариант для создания искусственного водоема на вашем участке. Этот бассейн способен порадовать в жаркий день, не только ваших детей, но и вас самих. Вам очень понравиться качество материалов и простота сборки бассейна.
</p>
<p>
 Материал чаши бассейна&nbsp;выполнен по технологии SUPER-TOUGH из высококачественного ПВХ. Это плотный армированный материал из трех спаянных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Он не подвержен воздействию солнечных лучей, растягиванию и истиранию. Прочность бассейна обеспечивает усиленный стальной каркас. Благодаря такому каркасу в нем могу находиться несколько людей сразу, как взрослых так и детей.
</p>
<p>
 При необходимости вы можете слить воду в любое удобное для вас место, для этого нужно подключить садовый шланг к сливному клапану. Специальной подготовки грунта для установки бассейна не требуется.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн Intex Prism Frame Pool 4.88 x 2.44 x 1.07 м</li>
	<li>Картриджный насос-фильтр 3785 л/ч </li>
	<li>Фильтрующий картридж тип А</li>
	<li>Лестница без площадки</li>
	<li>Тент для бассейна.</li>
	<li>Подстилка под бассейн.</li>
</ul>', 'Размер: 488 x 244 x 107 • Бренд: Intex', 34500.00, 48750.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"4.88\",\"Ширина (м)\":\"2.44\",\"Высота (м)\":\"1.07\",\"Вес (кг)\":\"88\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"488 x 244 x 107\",\"Объем (л)\":\"10874\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"3785\",\"Размер упаковки (см)\":\"60 х 58 х 129\",\"Артикул\":\"26792\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.8, 59, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (253, 'Каркасный бассейн INTEX Ultra Frame XTR 732 x 366 x 132 см, артикул 26368', 'karkasnyy-basseyn-intex-ultra-frame-xtr-732-x-366-x-132-sm-artikul-26368', '26368', '<h2>Каркасный бассейн INTEX Ultra Frame XTR 732 x 366 x 132 см, артикул 26368</h2><p>
 Каркасный бассейн&nbsp;Intex&nbsp;Ultra&nbsp;XTR&nbsp;Frame&nbsp;26368 из линейки бассейнов класса премиум, сочетающий в себе высокое качество и невысокую цену, по сравнению со стационарными бассейнами.&nbsp;Материал чаши бассейна выполнен по технологии SUPER-TOUGH из высококачественного ПВХ. Это плотный армированный материал из трех спаянных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Он не подвержен воздействию солнечных лучей, растягиванию и истиранию. Толщина стенок полотна -&nbsp;0,67 мм. Прочность бассейна обеспечивает усиленный стальной каркас. Благодаря такому каркасу в бассейне могу находиться несколько людей сразу, как взрослых так и детей. По сравнению с круглыми большими бассейнами прямоугольные позволяют более компактно и полноценно использовать личный участок. Более того, прямоугольная форма дает возможность устроить заплыв в длину или командную игру в мяч.
</p>
<p>
 Песочный фильтрующий насос обеспечивает рециркуляцию и очистку воды, что позволяет менять воду не чаще 1 раза в месяц. Удобный сливной клапан присоединяется к садовому шлангу. Таким образом, воду можно слить в любое удобное место или, например, полить сад.&nbsp;
</p>
<p>
 Каркасный бассейн&nbsp;Intex&nbsp;Ultra&nbsp;XTR&nbsp;Frame&nbsp;быстро и легко устанавливается. Процесс сборки бассейна до наполнения водой занимает всего около 60 минут.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Ultra Frame XTR 7.32 x 3.66 x 1.32 м</li>
	<li>Песочный насос-фильтр 7900 л/ч</li>
	<li>Хлорогенератор</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Скиммер</li>
	<li>Набор для чистки</li>
	<li>Волейбольная сетка</li>
	<li>Руководство по эксплуатации</li>
</ul>
 <br>
 <br>
<blockquote>
	<h2><span style="color: #d3115a;">Обратите внимание!</span></h2>
	<ul>
 <li>Производительность насоса в режиме фильтрации - 6000 литров в час</li>
 <li>Засыпка кварцевого песка - 23 кг (покупается отдельно)</li>
	</ul>
 <br>
</blockquote>
<p>
 Купить кварцевый песок (мешок 25 кг)
</p>
 <br>
 <br>', 'Размер: 732 x 366 x 132 • Бренд: Intex', 90000.00, 105000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"7.32\",\"Ширина (м)\":\"3.66\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"200.7\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"732 x 366 x 132\",\"Объем (л)\":\"31805\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"7900\",\"Размер упаковки (см)\":\"62 х 106 х 153\",\"Артикул\":\"26368\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.7, 25, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (252, 'Каркасный бассейн INTEX Ultra Frame XTR 732 x 132 см, артикул 26340', 'karkasnyy-basseyn-intex-ultra-frame-xtr-732-x-132-sm-artikul-26340', '26340', '<h2>Каркасный бассейн INTEX Ultra Frame XTR 732 x 132 см, артикул 26340</h2><p>
 Каркасный бассейн&nbsp;Intex&nbsp;Ultra&nbsp;XTR&nbsp;Frame&nbsp;26340 из линейки бассейнов класса премиум, сочетающий в себе высокое качество и невысокую цену, по сравнению со стационарными бассейнами.
</p>
<p>
 Стенки бассейна сделаны из трех отдельных слоев: два слоя плотного винила и один - полиэстр для особой прочности. Толщина стенок полотна -&nbsp;0,64 мм. Поддержанию формы бассейна&nbsp;способствует лента из полипропилена, опоясывающая весь бассейн.Уникально разработанный каркас сочетает высококачественную оцинкованную сталь с высокоточной системой запирания, повышая общее качество, долговечность и надежность бассейнов. Инкапсулирующее внутреннее и наружное порошковое покрытие обеспечивает максимальную стойкость к ржавчине. Простота сборки каркаса&nbsp;Easy Lock System&nbsp;- элементы просто защелкиваются между собой без необходимости фиксации штифтами. Благодаря этому каркасу, сборно-разборные бассейны выдерживают большие нагрузки.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Ultra Frame XTR 7.32 x 1.32 м</li>
	<li>Песочный насос-фильтр 10500 л/ч</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>
 <br>
 <br>
<blockquote>
	<h2><span style="color: #d3115a;">Обратите внимание!</span></h2>
	<ul>
 <li>Производительность насоса в режиме фильтрации - 8000 литров в час</li>
 <li>Засыпка кварцевого песка - 35 кг (покупается отдельно)</li>
	</ul>
 <br>
</blockquote>
<p>
 Купить кварцевый песок (мешок 25 кг)
</p>
 <br>
 <br>', 'Размер: 732 x 132 • Бренд: Intex', 69000.00, 90000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"7.32\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"172.3\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"732 x 132\",\"Объем (л)\":\"47241\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"10500\",\"Размер упаковки (см)\":\"55 х 107 х 130\",\"Артикул\":\"26340\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 5.0, 56, true, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (251, 'Каркасный бассейн INTEX Ultra Frame XTR 610 x 122 см, артикул 26334', 'karkasnyy-basseyn-intex-ultra-frame-xtr-610-x-122-sm-artikul-26334', '26334', '<h2>Каркасный бассейн INTEX Ultra Frame XTR 610 x 122 см, артикул 26334</h2><p>
 Каркасный бассейн&nbsp;Intex&nbsp;Ultra&nbsp;XTR&nbsp;Frame&nbsp;26334 из линейки бассейнов класса премиум, сочетающий в себе высокое качество и невысокую цену, по сравнению со стационарными бассейнами.
</p>
<p>
 Стенки бассейна сделаны из трех отдельных слоев: два слоя плотного винила и один - полиэстр для особой прочности. Толщина стенок полотна -&nbsp;0,64 мм. Поддержанию формы бассейна&nbsp;способствует лента из полипропилена, опоясывающая весь бассейн.Уникально разработанный каркас сочетает высококачественную оцинкованную сталь с высокоточной системой запирания, повышая общее качество, долговечность и надежность бассейнов. Инкапсулирующее внутреннее и наружное порошковое покрытие обеспечивает максимальную стойкость к ржавчине. Простота сборки каркаса&nbsp;Easy Lock System&nbsp;- элементы просто защелкиваются между собой без необходимости фиксации штифтами. Благодаря этому каркасу, сборно-разборные бассейны выдерживают большие нагрузки.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Ultra Frame XTR 6.10 x 1.22 м</li>
	<li>Песочный насос-фильтр 7900 л/ч</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна 610 см</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>
 <br>
 <br>
<blockquote>
	<h2><span style="color: #d3115a;">Обратите внимание!</span></h2>
	<ul>
 <li>Производительность насоса в режиме фильтрации - 6000 литров в час</li>
 <li>Засыпка кварцевого песка - 23 кг (покупается отдельно)</li>
	</ul>
 <br>
</blockquote>
<p>
 Купить кварцевый песок (мешок 25 кг)
</p>
 <br>
 <br>', 'Размер: 610 x 122 • Бренд: Intex', 54000.00, 75000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"6.1\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"133.7\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"610 x 122\",\"Объем (л)\":\"30079\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"7900\",\"Размер упаковки (см)\":\"53 х 98 х 129\",\"Артикул\":\"26334\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.3, 16, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (250, 'Каркасный бассейн INTEX GreyWood Prism Frame 549 x 122 см, артикул 26744', 'karkasnyy-basseyn-intex-greywood-prism-frame-549-x-122-sm-artikul-26744', '26744', '<h2>Каркасный бассейн INTEX GreyWood Prism Frame 549 x 122 см, артикул 26744</h2><p>
 Каркасный бассейн Intex Prism Frame Grey Wood Premium - особенностью этого бассейна является премиальное полотно с принтом под дерево. А также усиленный металлический каркас Prism Frame последнего поколения с антикорозийным слоем. Размер: 549x122 см.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Prism Frame Grey Wood Premium 5.49 x 1.22 м</li>
	<li>Картриджный насос-фильтр 5678 л/ч</li>
	<li>Фильтрующий картридж тип А</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 549 x 122 • Бренд: Intex', 37500.00, 48750.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"5.49\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"100\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"549 x 122\",\"Объем (л)\":\"24311\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"5678\",\"Размер упаковки (см)\":\"67 х 59 х 130\",\"Артикул\":\"26744\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серое дерево\"}"', 4.7, 44, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (249, 'Каркасный бассейн INTEX Prism Frame 610 x 305 x 122 см, артикул 26798', 'karkasnyy-basseyn-intex-prism-frame-610-x-305-x-122-sm-artikul-26798', '26798', '<h2>Каркасный бассейн INTEX Prism Frame 610 x 305 x 122 см, артикул 26798</h2><p>
 Intex 26798 Prism Frame Pool 610x305x122 см, модель выделяется своей необычной формой в виде ромба. Предназначен для отдыха в жаркий летний день. Функциональный, удобный в эксплуатации бассейн подарит семье и друзьям много радости.
</p>
<ul>
	<li>Стенки бассейнов изготавливаются с применением технологии&nbsp;SUPER-TOUGH&nbsp;и имеют три прочных слоя из высококачественного материала. Два наружных слоя изготовлены из плотного высококачественного ПВХ, которые как бы ламинируют слой из прочного полиэстра.</li>
	<li>Бассейн имеет удобный сливной клапан, через который можно аккуратно слить воду, а, присоединив садовый шланг, полить при этом еще и садовую растительность.</li>
</ul>
<p>
 Сборный каркасный бассейн Intex Prism&nbsp;Oval&nbsp;Frame Pool легко и быстро устанавливается. Процесс сборки до наполнения водой занимает 50 минут. Первая сборка, возможно, займет времени побольше.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Prism Frame (ромб) 6.10 x 3.05 x 1.22 м</li>
	<li>Картриджный насос-фильтр 5678 л/ч</li>
	<li>Фильтрующий картридж тип А</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна.</li>
	<li>Подстилка под бассейн.</li>
	<li>Ремкомплект</li>
	<li>Руководство по эксплуатации</li>
	<li>DVD-диск с инструкциями</li>
</ul>', 'Размер: 610 x 305 x 122 • Бренд: Intex', 48750.00, 63750.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"6.1\",\"Ширина (м)\":\"3.05\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"130.4\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"610 x 305 x 122\",\"Объем (л)\":\"18202\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"5678\",\"Размер упаковки (см)\":\"71 х 60 х 138\",\"Артикул\":\"26798\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Овальный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.7, 3, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (248, 'Каркасный бассейн INTEX Prism Frame 457 x 107 см, артикул 26724', 'karkasnyy-basseyn-intex-prism-frame-457-x-107-sm-artikul-26724', '26724', '<h2>Каркасный бассейн INTEX Prism Frame 457 x 107 см, артикул 26724</h2><p>
 Каркасный бассейн Intex 26724. Укомплектован лестницей, тентом, подстилкой и фильтрующим насосом. Металлический каркас состоит из соединительных уголков, трубок-перемычек и стоек. Все детали окрашены и устойчивы к истиранию. Каркасные сборные бассейны - это простая и недорогая альтернатива стационарным дорогостоящим бассейнам.
</p>
<p>
 Бассейн снизу оборудован сливным клапаном. Для того, чтобы слить воду, необходимо присоединить к любому садовому шлангу переходник, который идёт в комплекте с бассейном. Откручиваете заглушку клапана и вворачиваете переходник, при этом сливной клапан откроется сам. Слить воду можно в любое удобное для Вас место.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Prism Frame 4.57 x 1.07 м</li>
	<li>Картриджный насос-фильтр 3785 л/ч</li>
	<li>Фильтрующий картридж тип A</li>
	<li>Лестница без площадки</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 457 x 107 • Бренд: Intex', 22500.00, 30000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"4.57\",\"Высота (м)\":\"1.07\",\"Вес (кг)\":\"66.4\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"427 x 107\",\"Объем (л)\":\"14614\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"3785\",\"Размер упаковки (см)\":\"122 х 68 х 39\",\"Артикул\":\"26724\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.5, 48, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (247, 'Каркасный бассейн INTEX Prism Frame 549 x 122 см, артикул 26732', 'karkasnyy-basseyn-intex-prism-frame-549-x-122-sm-artikul-26732', '26732', '<p>
 Каркасный бассейн Intex 26732 Prism Frame Pool -&nbsp;особенностью этого бассейна является обновленный каркас с овальными стойками. Размер: 549x122 см.
</p>
<ul>
	<li>Стенки бассейнов изготавливаются с применением технологии SUPER-TOUGH и имеют три прочных слоя из высококачественного материала. Два наружных слоя изготовлены из плотного высококачественного ПВХ, которые как бы ламинируют слой из прочного полиэстра.</li>
	<li>Отдельная широкая ламинированная лента как пояс обрамляет бассейн снаружи, придавая дополнительную поддержку.</li>
	<li>Бассейн имеет удобный сливной клапан, через который можно аккуратно слить воду, а, присоединив садовый шланг, полить при этом еще и садовую растительность.</li>
</ul>
<p>
 Сборный каркасный бассейн Intex Prism Frame Pool легко и быстро устанавливается. Процесс сборки до наполнения водой занимает 60 минут. Первая сборка, возможно, займет времени побольше.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Prism Frame 5.49 x 1.22 м</li>
	<li>Картриджный насос-фильтр 5678 л/ч</li>
	<li>Фильтрующий картридж тип A</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 549 x 122 • Бренд: Intex', 36000.00, 41250.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"5.49\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"99.7\",\"Страна-производитель\":\"Китай\",\"Объем (л)\":\"24311\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"5678\",\"Размер упаковки (см)\":\"67 х 59 х 130\",\"Артикул\":\"26732\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.7, 3, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (245, 'Каркасный бассейн INTEX Prism Frame, 366 x 122 см, артикул 26718', 'karkasnyy-basseyn-intex-prism-frame-366-x-122-sm-artikul-26718', '26718', '<h2>Каркасный бассейн INTEX Prism Frame, 366 x 122 см, артикул 26718</h2><p>
	Каркасный бассейн Intex 26718 с самым востребованным размером 366x122 см. Укомплектован лестницей и фильтрующим насосом. Металлический каркас состоит из соединительных уголков, трубок-перемычек и стоек. Все детали окрашены и устойчивы к истиранию. Каркасные сборные бассейны - это простая и недорогая альтернатива стационарным дорогостоящим бассейнам.
</p>
<p>
	Бассейн снизу оборудован сливным клапаном. Для того, чтобы слить воду, необходимо присоединить к любому садовому шлангу переходник, который идёт в комплекте с бассейном. Откручиваете заглушку клапана и вворачиваете переходник, при этом сливной клапан откроется сам. Слить воду можно в любое удобное для Вас место.
</p>
<h3>В комплект поставки бассейна входит</h3>
 <br>
<ul>
	<li>Каркасный бассейн Intex Prism Frame</li>
	<li>Картриджный насос-фильтр 3785 л/ч</li>
	<li>Фильтрующий картридж тип A</li>
	<li>Лестница с площадкой</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 366 x 122 • Бренд: Intex', 18750.00, 26250.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"3.66\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"48\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"366 x 122\",\"Объем (л)\":\"10685\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"3785\",\"Размер упаковки (см)\":\"52 x 42 x 129\",\"Артикул\":\"26718\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.7, 44, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (244, 'Каркасный бассейн INTEX Prism Frame 305 x 99 см, артикул 26706', 'karkasnyy-basseyn-intex-prism-frame-305-x-99-sm-artikul-26706', '26706', '<h2>Каркасный бассейн INTEX Prism Frame 305 x 99 см, артикул 26706</h2>
<p>
 Каркасный бассейн Intex&nbsp;26706&nbsp;интересная новинка, диаметр всего 3 метра при метровой высоте. Укомплектован лестницей и фильтрующим насосом. Металлический каркас состоит из соединительных уголков, трубок-перемычек и стоек. Все детали окрашены и устойчивы к истиранию. Каркасные сборные бассейны - это простая и недорогая альтернатива стационарным дорогостоящим бассейнам.
</p>
<p>
 Бассейн снизу оборудован сливным клапаном. Для того, чтобы слить воду, необходимо присоединить к любому садовому шлангу переходник, который идёт в комплекте с бассейном. Откручиваете заглушку клапана и вворачиваете переходник, при этом сливной клапан откроется сам. Слить воду можно в любое удобное для Вас место.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Prism Frame 3.05 x 0.99 м</li>
	<li>Картриджный насос-фильтр 2006 л/ч</li>
	<li>Фильтрующий картридж тип A</li>
	<li>Лестница без площадки</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 305 x 99 • Бренд: Intex', 13500.00, 16500.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"3.05\",\"Высота (м)\":\"0.99\",\"Вес (кг)\":\"22\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"305 x 99\",\"Объем (л)\":\"5927\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"2006\",\"Размер упаковки (см)\":\"110 x 45 x 25\",\"Артикул\":\"26706\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.5, 35, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (238, 'Каркасный бассейн INTEX Frame 450 x 220 x 84 см, артикул 28274', 'karkasnyy-basseyn-intex-frame-450-x-220-x-84-sm-artikul-28274', '28274', '<h2>Каркасный бассейн INTEX Frame 450 x 220 x 84 см, артикул 28274</h2><h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Rectangular Frame 4.5 x 2.2 x 0.84 м</li>
	<li>Картриджный насос-фильтр 2006 л/ч</li>
	<li>Фильтрующий картридж тип&nbsp;А</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 450 x 220 x 84 • Бренд: Intex', 12750.00, 18750.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"4.5\",\"Ширина (м)\":\"2.2\",\"Высота (м)\":\"0.84\",\"Вес (кг)\":\"42.4\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"450 x 220 x 84\",\"Объем (л)\":\"7127\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"2006\",\"Размер упаковки (см)\":\"108 x 40 x 32\",\"Артикул\":\"28274\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Синий\"}"', 4.7, 57, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (237, 'Каркасный бассейн INTEX Ultra Frame XTR 975 x 488 x 132 см, артикул 26378', 'karkasnyy-basseyn-intex-ultra-frame-xtr-975-x-488-x-132-sm-artikul-26378', '26378', '<h2>Каркасный бассейн INTEX Ultra Frame XTR 975 x 488 x 132 см, артикул 26378</h2><p>
 Каркасный бассейн&nbsp;Intex&nbsp;Ultra&nbsp;XTR&nbsp;Frame&nbsp;975x488x132 26378&nbsp;- самый большой прямоугольный бассейн Intex с премиум комплектацией.
</p>
<p>
 Уникально разработанный каркас сочетает высококачественную оцинкованную сталь с высокоточной системой запирания, повышая общее качество, долговечность и надежность бассейнов. Инкапсулирующее внутреннее и наружное порошковое покрытие обеспечивает максимальную стойкость к ржавчине. Простота сборки каркаса Easy Lock System - элементы просто защелкиваются между собой без необходимости фиксации штифтами. Благодаря этому каркасу, сборно-разборные бассейны выдерживают большие нагрузки.
</p>
<p>
 Материал чаши выполнен по технологии SUPER-TOUGH из высококачественного ПВХ. Это плотный армированный материал из трех спаянных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Он не подвержен воздействию солнечных лучей, растягиванию и истиранию. Толщина стенок полотна -&nbsp;0,67 мм. Прочность обеспечивает усиленный стальной каркас. Благодаря такому каркасу в бассейне могу находиться несколько людей сразу, как взрослых так и детей. По сравнению с круглыми большими бассейнами прямоугольные позволяют более компактно и полноценно использовать личный участок. Более того, прямоугольная форма дает возможность устроить заплыв в длину или командную игру в мяч.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Ultra Frame XTR 9.75 x 4.88 x 1.32 м</li>
	<li>Песчаный насос-фильтр 10030 л/ч</li>
	<li>Хлорогенератор Intex</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Скиммер</li>
	<li>Сеть для волейбола</li>
	<li>Подстилка под бассейн</li>
	<li>Набор для чистки</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 975 x 488 x 132 • Бренд: Intex', 127500.00, 172500.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"9.75\",\"Ширина (м)\":\"4.88\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"269.4\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"975 x 488 x 132\",\"Объем (л)\":\"54368\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"10030\",\"Размер упаковки (см)\":\"110 х 84 х 153\",\"Артикул\":\"26378\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.7, 15, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (236, 'Каркасный бассейн INTEX Ultra Frame XTR 975 x 488 x 132 см, артикул 26374', 'karkasnyy-basseyn-intex-ultra-frame-xtr-975-x-488-x-132-sm-artikul-26374', '26374', '<h2>Каркасный бассейн INTEX Ultra Frame XTR 975 x 488 x 132 см, артикул 26374</h2><p>
 Каркасный бассейн&nbsp;Intex&nbsp;Ultra&nbsp;XTR&nbsp;Frame&nbsp;975x488x132 26374&nbsp;- самый большой прямоугольный бассейн Intex.
</p>
<p>
 Уникально разработанный каркас сочетает высококачественную оцинкованную сталь с высокоточной системой запирания, повышая общее качество, долговечность и надежность бассейнов. Инкапсулирующее внутреннее и наружное порошковое покрытие обеспечивает максимальную стойкость к ржавчине. Простота сборки каркаса Easy Lock System - элементы просто защелкиваются между собой без необходимости фиксации штифтами. Благодаря этому каркасу, сборно-разборные бассейны выдерживают большие нагрузки.
</p>
<p>
 Материал чаши выполнен по технологии SUPER-TOUGH из высококачественного ПВХ. Это плотный армированный материал из трех спаянных слоев: два слоя плотного винила и сетка из полиэстра. Такое сочетание наделяет материал огромным запасом прочности. Он не подвержен воздействию солнечных лучей, растягиванию и истиранию. Толщина стенок полотна -&nbsp;0,67 мм. Прочность обеспечивает усиленный стальной каркас. Благодаря такому каркасу в бассейне могу находиться несколько людей сразу, как взрослых так и детей. По сравнению с круглыми большими бассейнами прямоугольные позволяют более компактно и полноценно использовать личный участок. Более того, прямоугольная форма дает возможность устроить заплыв в длину или командную игру в мяч.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Ultra Frame XTR 9.75 x 4.88 x 1.32 м</li>
	<li>Песчаный насос-фильтр 10030 л/ч</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 975 x 488 x 132 • Бренд: Intex', 112500.00, 150000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"9.75\",\"Ширина (м)\":\"4.88\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"247.4\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"975 x 488 x 132\",\"Объем (л)\":\"54368\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"10030\",\"Размер упаковки (см)\":\"63 х 114 х 153\",\"Артикул\":\"26374\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Тёмно-серый\"}"', 4.7, 38, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (235, 'Каркасный бассейн INTEX Prism Frame 610 x 132 см, артикул 26756', 'karkasnyy-basseyn-intex-prism-frame-610-x-132-sm-artikul-26756', '26756', '<h2>Каркасный бассейн INTEX Prism Frame 610 x 132 см, артикул 26756</h2><p>
 Каркасный бассейн Intex 26756 Prism Frame Pool&nbsp;- новинка с уникальным размером 610x132 см.&nbsp;Отличительная черта моделей серии Prism Frame - усовершенствованный каркас, благодаря которому сборка бассейна занимает еще меньше времени. Приобретая бассейн Интекс, Вы и Ваша семья будете наслаждаться купанием в нем не один год.
</p>
<ul>
	<li>Стенки бассейнов изготавливаются с применением технологии&nbsp;SUPER-TOUGH&nbsp;и имеют три прочных слоя из высококачественного материала. Два наружных слоя изготовлены из плотного высококачественного ПВХ, которые как бы ламинируют слой из прочного полиэстра.</li>
	<li>Отдельная широкая ламинированная лента как пояс обрамляет бассейн снаружи, придавая дополнительную поддержку.</li>
	<li>Бассейн имеет удобный сливной клапан, через который можно аккуратно слить воду, а, присоединив садовый шланг, полить при этом еще и садовую растительность.</li>
</ul>
<p>
 Сборный каркасный бассейн Intex Prism Frame Pool легко и быстро устанавливается. Процесс сборки до наполнения водой занимает 60 минут. Первая сборка, возможно, займет времени побольше.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Prism Frame 6.10 x 1.32 м</li>
	<li>Картриджный насос-фильтр 5678 л/ч</li>
	<li>Фильтрующий картридж тип A</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 610 x 132 • Бренд: Intex', 48750.00, 60000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"6.1\",\"Высота (м)\":\"1.32\",\"Вес (кг)\":\"117.8\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"610 x 132\",\"Объем (л)\":\"32695\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"5678\",\"Размер упаковки (см)\":\"81 х 53 х 130\",\"Артикул\":\"26756\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.9, 50, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (234, 'Каркасный бассейн INTEX Graphite Gray Panel 478 x 124 см, артикул 26384', 'karkasnyy-basseyn-intex-graphite-gray-panel-478-x-124-sm-artikul-26384', '26384', '<h2>Каркасный бассейн INTEX Graphite Gray Panel 478 x 124 см, артикул 26384</h2><p>
 Каркасный бассейн 26384 Intex имеет уникальную конструкцию, которая превосходит по прочности и устойчивости классические каркасные бассейны.
</p>
<p>
 Запатентованная технология SUPER-TOUGH обеспечивает тройную прочность и надежность бассейну: стенки выполнены из трех отдельных слоев: два слоя плотного винила и один - полиэстр для особой прочности. Также надежность и безопасность бассейна Graphite Panel обуславливается его стальным каркасом, благодаря которому бассейн выдерживает большие нагрузки, в нем одновременно могут купаться несколько человек.
</p>
<p>
 Внешние части бассейна закрыты декоративными панелями "под графит", которые придают бассейну красивый и изысканный вид.
</p>
<p>
 Не требует подготовки грунта, насыпке песка и т.п., все, что нужно, это плоская, горизонтальная площадка.
</p>
<h3>В комплект поставки бассейна входит:</h3>
<ul>
	<li>Каркасный бассейн INTEX Graphite Gray Panel Pools 4.78 x 1.24 м</li>
	<li>Песочный насос-фильтр 5700 л/ч</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>
 <br>
 <br>
<blockquote>
	<h2><span style="color: #d3115a;">Обратите внимание!</span></h2>
	<ul>
 <li>Производительность насоса в режиме фильтрации - 4000 литров в час</li>
 <li>Засыпка кварцевого песка - 12 кг (покупается отдельно)</li>
	</ul>
 <br>
</blockquote>
<p>
 Купить кварцевый песок (мешок 25 кг)
</p>
 <br>
 <br>', 'Размер: 478 x 124 • Бренд: Intex', 90000.00, 127500.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"4.78\",\"Высота (м)\":\"1.24\",\"Вес (кг)\":\"226\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"478 x 124\",\"Объем (л)\":\"16805\",\"Насос-фильтр\":\"Песочный\",\"Насос-фильтр (л/ч)\":\"5700\",\"Размер упаковки (см)\":\"99 х 84 х 131\",\"Артикул\":\"26384\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Цвет чаши\":\"Графит\"}"', 4.2, 51, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (233, 'Каркасный бассейн INTEX Prism Frame 488 x 122 см, артикул 26730', 'karkasnyy-basseyn-intex-prism-frame-488-x-122-sm-artikul-26730', '26730', '<h2>Каркасный бассейн INTEX Prism Frame 488 x 122 см, артикул 26730</h2><p>
	С бассейном Clearview Prism Frame Intex 26730 веселье гарантировано! Очень простой в установке, этот бассейн подходит для всей семьи и позволит вам провести жаркие летние дни наилучшим образом.
</p>
<p>
	В отличие от других бассейнов, Clearview раскрывает свое очарование благодаря прозрачному окну высотой 15 см, которое проходит по всей конструкции. Панорамное окно придает этому бассейну явно забавный и современный вид и позволяет детям исследовать внешний мир изнутри бассейна.
</p>
<ul>
	<li>Стенки бассейнов изготавливаются с применением технологии SUPER-TOUGH и имеют три прочных слоя из высококачественного материала. Два наружных слоя изготовлены из плотного высококачественного ПВХ, которые как бы ламинируют слой из прочного полиэстра.</li>
	<li>Отдельная широкая ламинированная лента как пояс обрамляет бассейн снаружи, придавая дополнительную поддержку.</li>
	<li>Бассейн имеет удобный сливной клапан, через который можно аккуратно слить воду, а, присоединив садовый шланг, полить при этом еще и садовую растительность.</li>
</ul>
<h3>В комплект поставки бассейна входит</h3>
 <br>
<ul>
	<li>Каркасный бассейн Intex Prism Frame</li>
	<li>Картриджный насос-фильтр 5678 л/ч</li>
	<li>Фильтрующий картридж тип A</li>
	<li>Лестница с площадкой</li>
	<li>Тент для бассейна</li>
	<li>Подстилка под бассейн</li>
	<li>Руководство по эксплуатации</li>
</ul>', 'Размер: 488 x 122 • Бренд: Intex', 31500.00, 45000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"4.88\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"90\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"488 x 122\",\"Объем (л)\":\"19156\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"5678\",\"Размер упаковки (см)\":\"77 х 57 х 130\",\"Артикул\":\"26730\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Серый\"}"', 4.1, 38, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (232, 'Каркасный бассейн INTEX Prism Frame Chevron 488 x 122 см, артикул 26746', 'karkasnyy-basseyn-intex-prism-frame-chevron-488-x-122-sm-artikul-26746', '26746', '<h2>Каркасный бассейн INTEX Prism Frame Chevron 488 x 122 см, артикул 26746</h2><p>
 Новый бассейн Chevron Prism Frame™ Intex 26746 представляет собой идеальное сочетание практичности и стиля.&nbsp;Бассейны Prism Frame™ стали еще более особенными благодаря узору «елочка» на внешней облицовке.<br>
</p>
<p>
 Построенный из устойчивого к кормам материала и трехслойного покрытия, это идеальный бассейн для любого сада и для любых нужд.&nbsp;Бассейн состоит из металлической конструкции, состоящей из независимых частей, которые, соединенные друг с другом практичными Т-образными крючками, образуют жесткий и прочный каркас.
</p>
<p>
 Технические характеристики
</p>
<ul>
	<li>Размеры: 488 x 122см.</li>
	<li>Объем: 19156 л</li>
	<li>Трехслойная ПВХ-подкладка Super-Tough™.</li>
	<li>Т-образные соединения – инструменты не требуются</li>
	<li>Размер упаковки: 62.2 x 51.1 x 129.2 см.</li>
	<li>Вес упаковки: 84.3 кг.</li>
</ul>
<p>
 Аксессуары в комплекте
</p>
<ul>
	<li>Картриджный фильтрующий насос производительностью 5678 л/ч </li>
	<li>Тент для бассейна</li>
	<li>Подстилка</li>
	<li>Лестница</li>
</ul>', 'Размер: 488 x 122 • Бренд: Intex', 31500.00, 45000.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Диаметр (м)\":\"4.88\",\"Высота (м)\":\"1.22\",\"Вес (кг)\":\"84.3\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"488 x 122\",\"Объем (л)\":\"19156\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"5678\",\"Размер упаковки (см)\":\"62.2 x 51.1 x 129.2\",\"Артикул\":\"26746\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Круглый\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Голубой с принтом\"}"', 4.2, 48, false, true, 0);
INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES (231, 'Каркасный бассейн INTEX Prism Frame Chevron 400 x 200 x 100 см, артикул 26780', 'karkasnyy-basseyn-intex-prism-frame-chevron-400-x-200-x-100-sm-artikul-26780', '26780', '<h2>Каркасный бассейн INTEX Prism Frame Chevron 400 x 200 x 100 см, артикул 26780</h2><p>
 Каркасный бассейн INTEX Prism Frame Chevron&nbsp;400 x 200 x 100 см
</p>
<p>
 Новый прямоугольный бассейн Chevron Prism Frame™ INTEX&nbsp;26780 идеально подходит для придания свежего и современного вида вашему саду. Чаша бассейна из трехслойного прочного ПВХ имеет рисунок «елочка».
</p>
<p>
 Бассейн устойчив к&nbsp;разрывам и ударам благодаря тройному слою ПВХ: развлекайтесь без мыслей!
</p>
<p>
 Технические характеристики
</p>
<ul>
	<li>Размеры: 400 х 200 х 100 см.</li>
	<li>Объем: 6836 л</li>
	<li>Общие размеры бассейна: 465х259 см.</li>
	<li>Трехслойная ПВХ-подкладка Super-Tough™.</li>
	<li>Т-образные соединения – инструменты не требуются</li>
	<li>Размер упаковки: 53.9 x 49.8 x 116.2 см.</li>
	<li>Вес упаковки: 68.5 кг.</li>
</ul>
<p>
 Аксессуары в комплекте
</p>
<ul>
	<li>Картриджный фильтрующий насос производительностью 2006 л/ч</li>
	<li>Лестница</li>
</ul>
<ul>
</ul>', 'Размер: 400 x 200 x 100 • Бренд: Intex', 25500.00, 37500.00, NULL, 'Intex', '[]', '"{\"Бренд\":\"INTEX\",\"Длина (м)\":\"4\",\"Ширина (м)\":\"2\",\"Высота (м)\":\"1\",\"Вес (кг)\":\"68.5\",\"Страна-производитель\":\"Китай\",\"Размеры (см)\":\"400 x 200 x 100\",\"Объем (л)\":\"6836\",\"Насос-фильтр\":\"Картриджный\",\"Насос-фильтр (л/ч)\":\"2006\",\"Размер упаковки (см)\":\"53.9 x 49.8 x 116.2\",\"Артикул\":\"26780\",\"Тип бассейна\":\"Каркасный\",\"Форма бассейна\":\"Прямоугольный\",\"Материал чаши\":\"ПВХ\",\"Каркас\":\"Стальной каркас\",\"Тип установки\":\"Наземный\",\"Цвет чаши\":\"Голубой с принтом\"}"', 4.0, 13, false, true, 0);

SELECT setval('products_id_seq', 538);

-- Обновление временных меток
UPDATE categories SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP;
UPDATE products SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP;
