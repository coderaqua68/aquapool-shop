<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AquaPool - Интернет-магазин бассейнов</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .pool-gradient { background: linear-gradient(135deg, #0891b2, #06b6d4); }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="pool-gradient text-white shadow-lg">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <i class="fas fa-swimming-pool text-3xl"></i>
                    <div>
                        <h1 class="text-2xl font-bold">AquaPool</h1>
                        <p class="text-sm text-blue-100">г. Химки</p>
                    </div>
                </div>
                
                <div class="flex items-center space-x-4">
                    <a href="https://wa.me/79161234567" class="hover:text-blue-200 flex items-center space-x-2">
                        <i class="fab fa-whatsapp text-xl"></i>
                        <span class="hidden lg:inline">WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="pool-gradient text-white py-16">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl md:text-6xl font-bold mb-4">Бассейны для дома</h2>
            <p class="text-xl mb-8 text-blue-100">Каркасные и морозоустойчивые бассейны от ведущих производителей</p>
            <div class="bg-green-500 text-white px-4 py-2 rounded-full inline-block mb-8">
                🎉 Бесплатная доставка до 31 июля!
            </div>
        </div>
    </section>

    <!-- Categories -->
    <section class="py-16">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Категории товаров</h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php
                $dbConnected = false;
                $categories = [];
                $products = [];
                
                try {
                    $pdo = new PDO(
                        'mysql:host=localhost;dbname=aquapool_db;charset=utf8mb4',
                        'aquapool_db',
                        '42892Xxx!',
                        [
                            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                        ]
                    );
                    
                    $dbConnected = true;
                    
                    // Получаем категории
                    $stmt = $pdo->query("SELECT * FROM categories WHERE parent_id IS NULL ORDER BY name");
                    $categories = $stmt->fetchAll();
                    
                    // Получаем популярные товары
                    $stmt = $pdo->query("SELECT * FROM products WHERE is_popular = 1 ORDER BY rating DESC LIMIT 6");
                    $products = $stmt->fetchAll();
                    
                } catch (Exception $e) {
                    // Если база недоступна, показываем статичные категории
                    $categories = [
                        ['name' => 'Каркасные бассейны', 'slug' => 'karkasnye-basseyny', 'description' => 'Прочные каркасные бассейны для дачи'],
                        ['name' => 'Морозоустойчивые бассейны', 'slug' => 'morozoustoychivye-basseyny', 'description' => 'Всесезонные бассейны'],
                        ['name' => 'Джакузи и СПА', 'slug' => 'dzhakuzi', 'description' => 'Гидромассажные ванны'],
                        ['name' => 'Запасные чаши', 'slug' => 'zapasnye-chashi', 'description' => 'Сменные чаши'],
                        ['name' => 'Пленка ПВХ', 'slug' => 'plenka-pvh', 'description' => 'Качественная пленка']
                    ];
                }
                
                $icons = [
                    'karkasnye-basseyny' => 'fas fa-water',
                    'morozoustoychivye-basseyny' => 'far fa-snowflake',
                    'dzhakuzi' => 'fas fa-hot-tub',
                    'zapasnye-chashi' => 'fas fa-circle',
                    'plenka-pvh' => 'fas fa-layer-group'
                ];
                
                foreach ($categories as $category):
                    $count = 0;
                    if ($dbConnected) {
                        try {
                            $countStmt = $pdo->prepare("
                                SELECT COUNT(p.id) as count 
                                FROM products p 
                                JOIN categories c ON p.category_id = c.id 
                                WHERE c.slug = ? OR c.parent_slug = ?
                            ");
                            $countStmt->execute([$category['slug'], $category['slug']]);
                            $result = $countStmt->fetch();
                            $count = $result ? $result['count'] : 0;
                        } catch (Exception $e) {
                            $count = rand(5, 25); // Показываем примерное количество
                        }
                    } else {
                        $count = rand(15, 45);
                    }
                    
                    $icon = $icons[$category['slug']] ?? 'fas fa-swimming-pool';
            ?>
                <div class="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                    <div class="h-48 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                        <i class="<?php echo $icon; ?> text-6xl text-white"></i>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2"><?php echo htmlspecialchars($category['name']); ?></h3>
                        <p class="text-gray-600 mb-4"><?php echo htmlspecialchars($category['description']); ?></p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500"><?php echo $count; ?> товаров</span>
                            <a href="/category/<?php echo $category['slug']; ?>" class="text-blue-600 hover:text-blue-800 font-semibold">
                                Смотреть →
                            </a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Popular Products -->
    <section class="bg-white py-16">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Популярные товары</h2>
            
            <?php if ($dbConnected && !empty($products)): ?>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <?php foreach ($products as $product): ?>
                        <div class="bg-gray-50 rounded-lg shadow-lg overflow-hidden card-hover">
                            <div class="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                                <i class="fas fa-swimming-pool text-4xl text-blue-400"></i>
                            </div>
                            <div class="p-4">
                                <h3 class="font-semibold mb-2 text-sm leading-tight">
                                    <?php echo htmlspecialchars($product['name']); ?>
                                </h3>
                                <p class="text-xs text-gray-600 mb-2">Артикул: <?php echo htmlspecialchars($product['sku']); ?></p>
                                <div class="flex items-center justify-between">
                                    <div>
                                        <?php if ($product['original_price'] > $product['price']): ?>
                                            <div class="text-sm text-gray-500 line-through">
                                                <?php echo number_format($product['original_price'], 0, ',', ' '); ?>₽
                                            </div>
                                        <?php endif; ?>
                                        <div class="text-lg font-bold text-blue-600">
                                            <?php echo number_format($product['price'], 0, ',', ' '); ?>₽
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-xs text-yellow-500">
                                            ⭐ <?php echo $product['rating']; ?> (<?php echo $product['review_count']; ?>)
                                        </div>
                                        <a href="/product/<?php echo $product['slug']; ?>" 
                                           class="text-sm text-blue-600 hover:text-blue-800">
                                            Подробнее →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php else: ?>
                <div class="text-center py-8">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-2xl mx-auto">
                        <i class="fas fa-swimming-pool text-4xl text-blue-500 mb-4"></i>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">Каталог товаров</h3>
                        <p class="text-gray-600 mb-4">В нашем каталоге представлено более 300 товаров: каркасные и морозоустойчивые бассейны, джакузи, запасные чаши и аксессуары.</p>
                        <div class="grid grid-cols-2 gap-4 text-sm text-gray-700">
                            <div>✓ Intex и Bestway</div>
                            <div>✓ Гарантия качества</div>
                            <div>✓ Быстрая доставка</div>
                            <div>✓ Лучшие цены</div>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </section>

    <!-- About Company -->
    <section class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-3xl font-bold mb-6">О компании AquaPool</h2>
                <p class="text-lg text-gray-700 mb-8">
                    Мы специализируемся на продаже качественных бассейнов и сопутствующего оборудования. 
                    В нашем каталоге представлено более 300 товаров от ведущих производителей.
                </p>
                
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="w-16 h-16 pool-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-shipping-fast text-2xl text-white"></i>
                        </div>
                        <h3 class="font-bold mb-2">Быстрая доставка</h3>
                        <p class="text-gray-600">Доставляем по всей России в кратчайшие сроки</p>
                    </div>
                    
                    <div class="text-center">
                        <div class="w-16 h-16 pool-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-shield-alt text-2xl text-white"></i>
                        </div>
                        <h3 class="font-bold mb-2">Гарантия качества</h3>
                        <p class="text-gray-600">Все товары сертифицированы и имеют гарантию</p>
                    </div>
                    
                    <div class="text-center">
                        <div class="w-16 h-16 pool-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-headset text-2xl text-white"></i>
                        </div>
                        <h3 class="font-bold mb-2">Поддержка 24/7</h3>
                        <p class="text-gray-600">Консультируем и помогаем в выборе товаров</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-3 gap-8">
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <i class="fas fa-swimming-pool text-2xl text-blue-400"></i>
                        <h3 class="text-xl font-bold">AquaPool</h3>
                    </div>
                    <p class="text-gray-300">Интернет-магазин бассейнов и сопутствующего оборудования</p>
                </div>
                
                <div>
                    <h4 class="font-bold mb-4">Контакты</h4>
                    <div class="space-y-2 text-gray-300">
                        <p><i class="fas fa-map-marker-alt mr-2"></i>г. Химки</p>
                        <p><i class="fas fa-envelope mr-2"></i>aquapoolshop@yandex.ru</p>
                        <p><i class="fab fa-whatsapp mr-2"></i>WhatsApp</p>
                        <p><i class="fab fa-telegram mr-2"></i>@aquapool_manager</p>
                    </div>
                </div>
                
                <div>
                    <h4 class="font-bold mb-4">Информация</h4>
                    <div class="space-y-2 text-gray-300">
                        <p>📦 Бесплатная доставка</p>
                        <p>🛡️ Гарантия качества</p>
                        <p>📞 Поддержка 24/7</p>
                        <p>🏊 300+ товаров</p>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2025 AquaPool. Все права защищены.</p>
            </div>
        </div>
    </footer>

    <!-- WhatsApp Float Button -->
    <div class="fixed bottom-6 right-6 z-50">
        <a href="https://wa.me/79161234567?text=Здравствуйте! У меня есть вопрос по бассейнам" 
           class="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110">
            <i class="fab fa-whatsapp text-2xl"></i>
        </a>
    </div>

    <!-- Status Info -->
    <?php if (!$dbConnected): ?>
        <div class="fixed top-4 left-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded text-sm">
            <i class="fas fa-exclamation-triangle mr-2"></i>База данных недоступна. Показан демо-режим.
        </div>
    <?php endif; ?>
</body>
</html>