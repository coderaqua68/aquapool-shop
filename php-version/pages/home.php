<?php
require_once 'config.php';
require_once 'classes/Database.php';
require_once 'classes/Product.php';
require_once 'classes/Category.php';

$pageTitle = 'AquaPool - Интернет-магазин бассейнов и оборудования';
$pageDescription = 'Интернет-магазин AquaPool: каркасные и морозоустойчивые бассейны, джакузи Intex и Bestway. 300+ товаров, бесплатная доставка до 31 июля.';

// Получаем данные
$productModel = new Product();
$categoryModel = new Category();

$popularProducts = $productModel->getPopular(8);
$mainCategories = $categoryModel->getMain();

include 'includes/header.php';
?>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-20">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Content -->
            <div>
                <h1 class="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    Бассейны для <span class="text-cyan-300">идеального</span> лета
                </h1>
                <p class="text-xl mb-8 text-blue-100">
                    300+ товаров в каталоге. Каркасные и морозоустойчивые бассейны, джакузи премиум-класса.
                </p>
                
                <!-- Features -->
                <div class="grid grid-cols-2 gap-4 mb-8">
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">✓</div>
                        <span>300+ товаров</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">✓</div>
                        <span>Быстрая доставка</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">✓</div>
                        <span>Гарантия качества</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">✓</div>
                        <span>WhatsApp поддержка</span>
                    </div>
                </div>
                
                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="/catalog" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center">
                        Смотреть каталог
                    </a>
                    <a href="<?= whatsapp_link('Здравствуйте! Хочу получить консультацию по выбору бассейна') ?>" 
                       class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center">
                        Получить консультацию
                    </a>
                </div>
            </div>
            
            <!-- Image -->
            <div class="relative">
                <div class="relative z-10">
                    <img src="https://images.unsplash.com/photo-1586282391129-76a6df230f37?w=600&h=400&fit=crop&crop=center" 
                         alt="Каркасный бассейн" 
                         class="rounded-lg shadow-2xl w-full">
                </div>
                <!-- Decorative elements -->
                <div class="absolute -top-6 -left-6 w-32 h-32 bg-cyan-400 rounded-full opacity-20"></div>
                <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-300 rounded-full opacity-30"></div>
            </div>
        </div>
    </div>
</section>

<!-- Free Delivery Banner -->
<section class="bg-green-50 border-t-4 border-green-400 py-4">
    <div class="container mx-auto px-4">
        <div class="text-center">
            <div class="text-green-600 text-lg font-semibold">
                🎉 Акция! Бесплатная доставка до 31 июля на все товары
            </div>
            <div class="text-green-700 text-sm mt-1">
                Успейте оформить заказ и получите доставку абсолютно бесплатно!
            </div>
        </div>
    </div>
</section>

<!-- Categories Section -->
<section class="py-16 bg-white">
    <div class="container mx-auto px-4">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Категории товаров</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">
                Выберите подходящий тип бассейна для вашего участка и наслаждайтесь летом
            </p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <?php foreach ($mainCategories as $category): ?>
                <a href="/category/<?= $category['slug'] ?>" 
                   class="group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border">
                    <div class="p-6 text-center">
                        <!-- Category Image -->
                        <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl">
                            <?php
                            $icons = [
                                'karkasnye-basseyny' => '🏊‍♂️',
                                'morozostojkie-basseyny' => '❄️',
                                'dzjakuzi-intex' => '🛁',
                                'dzjakuzi-bestway' => '🏊‍♀️',
                                'zapasnye-chashi' => '🔧'
                            ];
                            echo $icons[$category['slug']] ?? '💧';
                            ?>
                        </div>
                        
                        <h3 class="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                            <?= escape($category['name']) ?>
                        </h3>
                        
                        <div class="text-sm text-gray-600">
                            <?= $category['product_count'] ?> товаров
                        </div>
                        
                        <?php if ($category['min_price']): ?>
                            <div class="text-sm text-green-600 font-medium mt-1">
                                от <?= format_price($category['min_price']) ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Popular Products -->
<section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Популярные товары</h2>
            <p class="text-gray-600">Самые востребованные бассейны и аксессуары</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <?php foreach ($popularProducts as $product): ?>
                <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <!-- Product Image -->
                    <div class="aspect-w-4 aspect-h-3 rounded-t-lg overflow-hidden">
                        <?php 
                        $images = json_decode($product['images'], true) ?: [];
                        $mainImage = $images[0] ?? 'https://via.placeholder.com/300x225?text=Нет+фото';
                        ?>
                        <img src="<?= escape($mainImage) ?>" 
                             alt="<?= escape($product['name']) ?>"
                             class="w-full h-48 object-cover">
                    </div>
                    
                    <div class="p-4">
                        <!-- Rating -->
                        <div class="flex items-center mb-2">
                            <div class="flex text-yellow-400">
                                <?php for ($i = 1; $i <= 5; $i++): ?>
                                    <?= $i <= $product['rating'] ? '⭐' : '☆' ?>
                                <?php endfor; ?>
                            </div>
                            <span class="text-sm text-gray-600 ml-2">
                                (<?= $product['review_count'] ?>)
                            </span>
                        </div>
                        
                        <!-- Product Name -->
                        <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">
                            <a href="/product/<?= $product['slug'] ?>" class="hover:text-blue-600">
                                <?= escape($product['name']) ?>
                            </a>
                        </h3>
                        
                        <!-- SKU -->
                        <div class="text-sm text-gray-500 mb-2">
                            Артикул: <?= escape($product['sku']) ?>
                        </div>
                        
                        <!-- Price -->
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <div class="text-xl font-bold text-gray-900">
                                    <?= format_price($product['price']) ?>
                                </div>
                                <?php if ($product['original_price'] && $product['original_price'] > $product['price']): ?>
                                    <div class="text-sm text-gray-500 line-through">
                                        <?= format_price($product['original_price']) ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                            
                            <button onclick="toggleFavorite(<?= $product['id'] ?>, '<?= escape($product['name']) ?>', '<?= $product['slug'] ?>')"
                                    class="p-2 text-gray-400 hover:text-red-500">
                                ❤️
                            </button>
                        </div>
                        
                        <!-- Actions -->
                        <div class="flex gap-2">
                            <button onclick="addToCart(<?= $product['id'] ?>, '<?= escape($product['name']) ?>', <?= $product['price'] ?>, '<?= escape($product['sku']) ?>', '<?= escape($mainImage) ?>')"
                                    class="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                                В корзину
                            </button>
                            <a href="/product/<?= $product['slug'] ?>" 
                               class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                👁️
                            </a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        
        <div class="text-center mt-8">
            <a href="/catalog" class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Смотреть весь каталог
            </a>
        </div>
    </div>
</section>

<!-- About Section -->
<section class="py-16 bg-white">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h2 class="text-3xl font-bold text-gray-900 mb-6">О компании AquaPool</h2>
                <p class="text-gray-600 mb-6">
                    Мы специализируемся на продаже качественных бассейнов и оборудования для дома и дачи. 
                    В нашем каталоге представлено более 300 товаров от ведущих мировых производителей.
                </p>
                
                <div class="grid grid-cols-2 gap-6 mb-6">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-blue-600">300+</div>
                        <div class="text-sm text-gray-600">товаров в каталоге</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-blue-600">5</div>
                        <div class="text-sm text-gray-600">лет на рынке</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-blue-600">100%</div>
                        <div class="text-sm text-gray-600">качественные товары</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-blue-600">24/7</div>
                        <div class="text-sm text-gray-600">поддержка клиентов</div>
                    </div>
                </div>
                
                <a href="/about" class="inline-block text-blue-600 font-semibold hover:underline">
                    Узнать больше о компании →
                </a>
            </div>
            
            <div>
                <img src="https://images.unsplash.com/photo-1566736928306-93bf0ad25b6b?w=600&h=400&fit=crop&crop=center" 
                     alt="О нас" 
                     class="rounded-lg shadow-lg w-full">
            </div>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>