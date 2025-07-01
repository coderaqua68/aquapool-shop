<?php
require_once 'config.php';
require_once 'classes/Database.php';
require_once 'classes/Product.php';

$query = $_GET['q'] ?? '';
$pageTitle = $query ? "Поиск: \"$query\" - AquaPool" : 'Поиск товаров - AquaPool';
$pageDescription = "Результаты поиска по запросу \"$query\" в каталоге AquaPool";

$products = [];
if ($query) {
    $productModel = new Product();
    $products = $productModel->getAll(['search' => $query]);
}

include 'includes/header.php';
?>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-2">
        <?php if ($query): ?>
            Результаты поиска: "<?= escape($query) ?>"
        <?php else: ?>
            Поиск товаров
        <?php endif; ?>
    </h1>
    
    <?php if ($query): ?>
        <p class="text-gray-600 mb-6">Найдено товаров: <?= count($products) ?></p>
        
        <?php if (empty($products)): ?>
            <div class="text-center py-12">
                <div class="text-6xl mb-4">🔍</div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Ничего не найдено</h3>
                <p class="text-gray-600 mb-4">Попробуйте изменить поисковый запрос</p>
                <div class="space-y-2">
                    <p class="text-sm text-gray-500">Предложения:</p>
                    <ul class="text-sm text-gray-500 space-y-1">
                        <li>• Проверьте правильность написания</li>
                        <li>• Используйте более общие термины</li>
                        <li>• Попробуйте поиск по артикулу</li>
                    </ul>
                </div>
                <a href="/catalog" class="inline-block mt-4 text-blue-600 hover:underline">Перейти в каталог</a>
            </div>
        <?php else: ?>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <?php foreach ($products as $product): ?>
                    <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <?php 
                        $images = json_decode($product['images'], true) ?: [];
                        $mainImage = $images[0] ?? 'https://via.placeholder.com/300x225?text=Нет+фото';
                        ?>
                        
                        <div class="aspect-w-4 aspect-h-3 rounded-t-lg overflow-hidden">
                            <img src="<?= escape($mainImage) ?>" 
                                 alt="<?= escape($product['name']) ?>"
                                 class="w-full h-48 object-cover">
                        </div>
                        
                        <div class="p-4">
                            <!-- Rating -->
                            <div class="flex items-center mb-2">
                                <div class="flex text-yellow-400 text-sm">
                                    <?php for ($i = 1; $i <= 5; $i++): ?>
                                        <?= $i <= $product['rating'] ? '⭐' : '☆' ?>
                                    <?php endfor; ?>
                                </div>
                                <span class="text-xs text-gray-600 ml-2">
                                    (<?= $product['review_count'] ?>)
                                </span>
                            </div>
                            
                            <!-- Product Name -->
                            <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                                <a href="/product/<?= $product['slug'] ?>" class="hover:text-blue-600">
                                    <?= escape($product['name']) ?>
                                </a>
                            </h3>
                            
                            <!-- SKU -->
                            <div class="text-xs text-gray-500 mb-2">
                                Артикул: <?= escape($product['sku']) ?>
                            </div>
                            
                            <!-- Price -->
                            <div class="flex items-center justify-between mb-3">
                                <div>
                                    <div class="text-lg font-bold text-gray-900">
                                        <?= format_price($product['price']) ?>
                                    </div>
                                    <?php if ($product['original_price'] && $product['original_price'] > $product['price']): ?>
                                        <div class="text-xs text-gray-500 line-through">
                                            <?= format_price($product['original_price']) ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                                
                                <button onclick="toggleFavorite(<?= $product['id'] ?>, '<?= escape($product['name']) ?>', '<?= $product['slug'] ?>')"
                                        class="p-1 text-gray-400 hover:text-red-500 text-sm">
                                    ❤️
                                </button>
                            </div>
                            
                            <!-- Actions -->
                            <div class="flex gap-2">
                                <button onclick="addToCart(<?= $product['id'] ?>, '<?= escape($product['name']) ?>', <?= $product['price'] ?>, '<?= escape($product['sku']) ?>', '<?= escape($mainImage) ?>')"
                                        class="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                                    В корзину
                                </button>
                                <a href="/product/<?= $product['slug'] ?>" 
                                   class="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
                                    👁️
                                </a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    <?php else: ?>
        <div class="text-center py-12">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Введите поисковый запрос</h3>
            <p class="text-gray-600 mb-6">Найдите нужный товар по названию, артикулу или характеристикам</p>
            <div class="max-w-md mx-auto">
                <form action="/search" method="GET" class="flex gap-2">
                    <input type="text" name="q" placeholder="Поиск товаров..." 
                           class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Найти
                    </button>
                </form>
            </div>
        </div>
    <?php endif; ?>
</div>

<?php include 'includes/footer.php'; ?>