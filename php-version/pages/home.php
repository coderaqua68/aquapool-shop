<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AquaPool - Интернет-магазин бассейнов</title>
    <meta name="description" content="Каркасные и морозоустойчивые бассейны, джакузи, запасные чаши. Доставка по России. 300+ товаров в каталоге.">
    
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    
    <style>
        .pool-gradient { background: linear-gradient(135deg, #0891b2, #06b6d4); }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
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
                
                <nav class="hidden md:flex space-x-6">
                    <a href="/" class="hover:text-blue-200 text-blue-200 font-semibold">Главная</a>
                    <a href="/catalog" class="hover:text-blue-200">Каталог</a>
                    <a href="/delivery" class="hover:text-blue-200">Доставка</a>
                    <a href="/contact" class="hover:text-blue-200">Контакты</a>
                </nav>
                
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
            <div class="space-x-4">
                <a href="/catalog" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                    Смотреть каталог
                </a>
                <a href="https://wa.me/79161234567?text=Здравствуйте! Хочу получить консультацию по бассейнам" 
                   class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                    Получить консультацию
                </a>
            </div>
        </div>
    </section>

    <!-- Categories -->
    <section class="py-16">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Категории товаров</h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php
                try {
                    require_once 'classes/Database.php';
                    require_once 'classes/Product.php';
                    
                    $database = new Database();
                    $pdo = $database->getConnection();
                    $productManager = new Product($pdo);
                    
                    $categories = [
                        [
                            'name' => 'Каркасные бассейны',
                            'slug' => 'karkasnye-basseyny',
                            'description' => 'Прочные каркасные бассейны Intex и Bestway',
                            'image' => 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop',
                            'icon' => 'fas fa-water'
                        ],
                        [
                            'name' => 'Морозоустойчивые бассейны',
                            'slug' => 'morozoustoychivye-basseyny',
                            'description' => 'Всесезонные бассейны для круглогодичного использования',
                            'image' => 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop',
                            'icon' => 'far fa-snowflake'
                        ],
                        [
                            'name' => 'Джакузи и СПА',
                            'slug' => 'dzhakuzi',
                            'description' => 'Гидромассажные ванны и джакузи для релаксации',
                            'image' => 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop',
                            'icon' => 'fas fa-hot-tub'
                        ],
                        [
                            'name' => 'Запасные чаши',
                            'slug' => 'zapasnye-chashi',
                            'description' => 'Сменные чаши для каркасных бассейнов',
                            'image' => 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop',
                            'icon' => 'fas fa-circle'
                        ],
                        [
                            'name' => 'Пленка ПВХ',
                            'slug' => 'plenka-pvh',
                            'description' => 'Качественная пленка для облицовки бассейнов',
                            'image' => 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop',
                            'icon' => 'fas fa-layer-group'
                        ]
                    ];
                    
                    foreach ($categories as $category): ?>
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                            <div class="h-48 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                                <i class="<?php echo $category['icon']; ?> text-6xl text-white"></i>
                            </div>
                            <div class="p-6">
                                <h3 class="text-xl font-bold mb-2"><?php echo $category['name']; ?></h3>
                                <p class="text-gray-600 mb-4"><?php echo $category['description']; ?></p>
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-gray-500">
                                        <?php
                                        $count = $productManager->getCategoryProductCount($category['slug']);
                                        echo $count . ' товаров';
                                        ?>
                                    </span>
                                    <a href="/category/<?php echo $category['slug']; ?>" 
                                       class="text-blue-600 hover:text-blue-800 font-semibold">
                                        Смотреть →
                                    </a>
                                </div>
                            </div>
                        </div>
                    <?php endforeach;
                } catch (Exception $e) {
                    echo '<div class="col-span-full text-center text-red-600">Ошибка загрузки категорий</div>';
                }
                ?>
            </div>
        </div>
    </section>

    <!-- Popular Products -->
    <section class="bg-white py-16">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Популярные товары</h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <?php
                try {
                    $popularProducts = $productManager->getPopularProducts(4);
                    foreach ($popularProducts as $product): ?>
                        <div class="bg-gray-50 rounded-lg shadow-lg overflow-hidden card-hover">
                            <div class="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                                <?php if ($product['image_url']): ?>
                                    <img src="<?php echo htmlspecialchars($product['image_url']); ?>" 
                                         alt="<?php echo htmlspecialchars($product['name']); ?>"
                                         class="w-full h-full object-cover">
                                <?php else: ?>
                                    <i class="fas fa-swimming-pool text-4xl text-blue-400"></i>
                                <?php endif; ?>
                            </div>
                            <div class="p-4">
                                <h3 class="font-semibold mb-2 text-sm leading-tight">
                                    <?php echo htmlspecialchars($product['name']); ?>
                                </h3>
                                <div class="flex items-center justify-between">
                                    <div class="text-lg font-bold text-blue-600">
                                        <?php echo number_format($product['price'], 0, ',', ' '); ?>₽
                                    </div>
                                    <a href="/product/<?php echo $product['slug']; ?>" 
                                       class="text-sm text-blue-600 hover:text-blue-800">
                                        Подробнее →
                                    </a>
                                </div>
                            </div>
                        </div>
                    <?php endforeach;
                } catch (Exception $e) {
                    echo '<div class="col-span-full text-center text-red-600">Ошибка загрузки товаров</div>';
                }
                ?>
            </div>
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
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <i class="fas fa-swimming-pool text-2xl text-blue-400"></i>
                        <h3 class="text-xl font-bold">AquaPool</h3>
                    </div>
                    <p class="text-gray-300">Интернет-магазин бассейнов и сопутствующего оборудования</p>
                </div>
                
                <div>
                    <h4 class="font-bold mb-4">Каталог</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="/category/karkasnye-basseyny" class="hover:text-white">Каркасные бассейны</a></li>
                        <li><a href="/category/morozoustoychivye-basseyny" class="hover:text-white">Морозоустойчивые</a></li>
                        <li><a href="/category/dzhakuzi" class="hover:text-white">Джакузи</a></li>
                        <li><a href="/category/zapasnye-chashi" class="hover:text-white">Запасные чаши</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="font-bold mb-4">Информация</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="/delivery" class="hover:text-white">Доставка</a></li>
                        <li><a href="/about" class="hover:text-white">О компании</a></li>
                        <li><a href="/contact" class="hover:text-white">Контакты</a></li>
                        <li><a href="/privacy-policy" class="hover:text-white">Политика конфиденциальности</a></li>
                    </ul>
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
</body>
</html>