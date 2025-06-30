<?php
require_once 'config.php';
require_once 'classes/Database.php';
require_once 'classes/Product.php';
require_once 'classes/Category.php';

$productModel = new Product();
$product = $productModel->getBySlug($slug);

if (!$product) {
    http_response_code(404);
    require_once 'pages/404.php';
    exit;
}

$pageTitle = escape($product['name']) . ' - AquaPool';
$pageDescription = escape($product['short_description'] ?: $product['description']);

// Получаем похожие товары
$relatedProducts = $productModel->getAll(['category' => $product['category_slug']]);
$relatedProducts = array_filter($relatedProducts, fn($p) => $p['id'] !== $product['id']);
$relatedProducts = array_slice($relatedProducts, 0, 4);

include 'includes/header.php';
?>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <nav class="text-sm mb-6">
        <ol class="flex items-center space-x-2">
            <li><a href="/" class="text-blue-600 hover:underline">Главная</a></li>
            <li class="text-gray-400">/</li>
            <li><a href="/catalog" class="text-blue-600 hover:underline">Каталог</a></li>
            <li class="text-gray-400">/</li>
            <li><a href="/category/<?= $product['category_slug'] ?>" class="text-blue-600 hover:underline"><?= escape($product['category_name']) ?></a></li>
            <li class="text-gray-400">/</li>
            <li class="text-gray-700"><?= escape($product['name']) ?></li>
        </ol>
    </nav>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Images -->
        <div>
            <?php 
            $images = json_decode($product['images'], true) ?: [];
            $mainImage = $images[0] ?? 'https://via.placeholder.com/600x450?text=Нет+фото';
            ?>
            
            <!-- Main Image -->
            <div class="mb-4">
                <img id="main-image" src="<?= escape($mainImage) ?>" 
                     alt="<?= escape($product['name']) ?>"
                     class="w-full rounded-lg shadow-lg">
            </div>
            
            <!-- Thumbnail Images -->
            <?php if (count($images) > 1): ?>
                <div class="flex gap-2 overflow-x-auto">
                    <?php foreach ($images as $index => $image): ?>
                        <img src="<?= escape($image) ?>" 
                             alt="<?= escape($product['name']) ?> - фото <?= $index + 1 ?>"
                             class="w-20 h-20 object-cover rounded cursor-pointer border-2 <?= $index === 0 ? 'border-blue-500' : 'border-gray-200' ?>"
                             onclick="changeMainImage('<?= escape($image) ?>', this)">
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
        
        <!-- Product Info -->
        <div>
            <!-- Rating -->
            <div class="flex items-center mb-4">
                <div class="flex text-yellow-400">
                    <?php for ($i = 1; $i <= 5; $i++): ?>
                        <?= $i <= $product['rating'] ? '⭐' : '☆' ?>
                    <?php endfor; ?>
                </div>
                <span class="text-gray-600 ml-2">(<?= $product['review_count'] ?> отзывов)</span>
            </div>
            
            <!-- Product Name -->
            <h1 class="text-3xl font-bold text-gray-900 mb-4"><?= escape($product['name']) ?></h1>
            
            <!-- SKU -->
            <div class="text-gray-600 mb-4">
                Артикул: <span class="font-medium"><?= escape($product['sku']) ?></span>
            </div>
            
            <!-- Price -->
            <div class="mb-6">
                <div class="text-3xl font-bold text-gray-900 mb-2">
                    <?= format_price($product['price']) ?>
                </div>
                <?php if ($product['original_price'] && $product['original_price'] > $product['price']): ?>
                    <div class="flex items-center gap-2">
                        <span class="text-lg text-gray-500 line-through">
                            <?= format_price($product['original_price']) ?>
                        </span>
                        <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                            Скидка <?= round((1 - $product['price'] / $product['original_price']) * 100) ?>%
                        </span>
                    </div>
                <?php endif; ?>
            </div>
            
            <!-- Short Description -->
            <?php if ($product['short_description']): ?>
                <div class="text-gray-600 mb-6">
                    <?= nl2br(escape($product['short_description'])) ?>
                </div>
            <?php endif; ?>
            
            <!-- Actions -->
            <div class="space-y-4 mb-8">
                <div class="flex gap-4">
                    <button onclick="addToCart(<?= $product['id'] ?>, '<?= escape($product['name']) ?>', <?= $product['price'] ?>, '<?= escape($product['sku']) ?>', '<?= escape($mainImage) ?>')"
                            class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                        Добавить в корзину
                    </button>
                    <button onclick="toggleFavorite(<?= $product['id'] ?>, '<?= escape($product['name']) ?>', '<?= $product['slug'] ?>')"
                            class="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        ❤️
                    </button>
                </div>
                
                <button onclick="quickBuy(<?= $product['id'] ?>, '<?= escape($product['name']) ?>', <?= $product['price'] ?>, '<?= escape($product['sku']) ?>')"
                        class="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                    Купить в один клик
                </button>
                
                <a href="<?= whatsapp_link('Здравствуйте! Интересует товар: ' . $product['name'] . ' (Артикул: ' . $product['sku'] . ') ' . SITE_URL . '/product/' . $product['slug']) ?>"
                   class="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold text-center block">
                    📱 Заказать в WhatsApp
                </a>
            </div>
            
            <!-- Delivery Info -->
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div class="flex items-center text-green-800">
                    <span class="text-lg mr-2">🎉</span>
                    <div>
                        <div class="font-semibold">Бесплатная доставка до 31 июля!</div>
                        <div class="text-sm">Доставим курьером до двери абсолютно бесплатно</div>
                    </div>
                </div>
            </div>
            
            <!-- Specifications Preview -->
            <?php if ($product['specifications']): ?>
                <?php $specs = json_decode($product['specifications'], true) ?: []; ?>
                <?php if (!empty($specs)): ?>
                    <div class="border-t pt-6">
                        <h3 class="text-lg font-semibold mb-4">Основные характеристики</h3>
                        <div class="space-y-2">
                            <?php 
                            $mainSpecs = array_slice($specs, 0, 5, true);
                            foreach ($mainSpecs as $key => $value): 
                            ?>
                                <div class="flex justify-between py-1">
                                    <span class="text-gray-600"><?= escape($key) ?>:</span>
                                    <span class="font-medium"><?= escape($value) ?></span>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php endif; ?>
            <?php endif; ?>
        </div>
    </div>
    
    <!-- Detailed Information -->
    <div class="mt-16">
        <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
                <button class="tab-button active py-4 px-1 border-b-2 border-blue-500 font-medium text-blue-600" 
                        onclick="showTab('description')">
                    Описание
                </button>
                <?php if ($product['specifications']): ?>
                    <button class="tab-button py-4 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700" 
                            onclick="showTab('specifications')">
                        Характеристики
                    </button>
                <?php endif; ?>
                <button class="tab-button py-4 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700" 
                        onclick="showTab('delivery')">
                    Доставка и оплата
                </button>
            </nav>
        </div>
        
        <!-- Tab Content -->
        <div class="py-8">
            <!-- Description Tab -->
            <div id="description-tab" class="tab-content">
                <div class="prose max-w-none">
                    <?= nl2br(escape($product['description'])) ?>
                </div>
            </div>
            
            <!-- Specifications Tab -->
            <?php if ($product['specifications']): ?>
                <div id="specifications-tab" class="tab-content hidden">
                    <div class="bg-white rounded-lg border">
                        <?php foreach ($specs as $key => $value): ?>
                            <div class="flex justify-between py-3 px-4 border-b border-gray-100 last:border-b-0">
                                <span class="text-gray-600"><?= escape($key) ?></span>
                                <span class="font-medium text-right"><?= escape($value) ?></span>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>
            
            <!-- Delivery Tab -->
            <div id="delivery-tab" class="tab-content hidden">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-lg font-semibold mb-4">🚚 Доставка</h3>
                        <div class="space-y-3 text-sm">
                            <div class="flex items-center space-x-2">
                                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span>Курьером до двери - БЕСПЛАТНО до 31 июля</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span>Доставка по Москве и области</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span>Срок доставки: 1-3 рабочих дня</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold mb-4">💳 Оплата</h3>
                        <div class="space-y-3 text-sm">
                            <div class="flex items-center space-x-2">
                                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span>Оплата через менеджера (безопасно)</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span>Наложенный платеж при получении</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Related Products -->
    <?php if (!empty($relatedProducts)): ?>
        <div class="mt-16">
            <h2 class="text-2xl font-bold text-gray-900 mb-8">Похожие товары</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <?php foreach ($relatedProducts as $relatedProduct): ?>
                    <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <?php 
                        $relatedImages = json_decode($relatedProduct['images'], true) ?: [];
                        $relatedMainImage = $relatedImages[0] ?? 'https://via.placeholder.com/300x225?text=Нет+фото';
                        ?>
                        
                        <div class="aspect-w-4 aspect-h-3 rounded-t-lg overflow-hidden">
                            <img src="<?= escape($relatedMainImage) ?>" 
                                 alt="<?= escape($relatedProduct['name']) ?>"
                                 class="w-full h-48 object-cover">
                        </div>
                        
                        <div class="p-4">
                            <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                                <a href="/product/<?= $relatedProduct['slug'] ?>" class="hover:text-blue-600">
                                    <?= escape($relatedProduct['name']) ?>
                                </a>
                            </h3>
                            
                            <div class="text-lg font-bold text-gray-900 mb-3">
                                <?= format_price($relatedProduct['price']) ?>
                            </div>
                            
                            <button onclick="addToCart(<?= $relatedProduct['id'] ?>, '<?= escape($relatedProduct['name']) ?>', <?= $relatedProduct['price'] ?>, '<?= escape($relatedProduct['sku']) ?>', '<?= escape($relatedMainImage) ?>')"
                                    class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-sm">
                                В корзину
                            </button>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    <?php endif; ?>
</div>

<script>
function changeMainImage(src, thumbnail) {
    document.getElementById('main-image').src = src;
    
    // Update active thumbnail
    document.querySelectorAll('[onclick*="changeMainImage"]').forEach(img => {
        img.classList.remove('border-blue-500');
        img.classList.add('border-gray-200');
    });
    thumbnail.classList.remove('border-gray-200');
    thumbnail.classList.add('border-blue-500');
}

function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active', 'border-blue-500', 'text-blue-600');
        button.classList.add('border-transparent', 'text-gray-500');
    });
    
    // Show selected tab content
    document.getElementById(tabName + '-tab').classList.remove('hidden');
    
    // Add active class to selected tab button
    event.target.classList.add('active', 'border-blue-500', 'text-blue-600');
    event.target.classList.remove('border-transparent', 'text-gray-500');
}

function quickBuy(productId, name, price, sku) {
    cart = [{
        id: productId,
        name: name,
        price: price,
        sku: sku,
        quantity: 1
    }];
    localStorage.setItem('aquapool_cart', JSON.stringify(cart));
    updateCartCount();
    window.location.href = '/checkout';
}
</script>

<?php include 'includes/footer.php'; ?>