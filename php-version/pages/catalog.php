<?php
require_once 'config.php';
require_once 'classes/Database.php';
require_once 'classes/Product.php';
require_once 'classes/Category.php';

$pageTitle = 'Каталог товаров - AquaPool';
$pageDescription = 'Каталог бассейнов и оборудования: каркасные, морозоустойчивые бассейны, джакузи. Более 300 товаров с доставкой.';

// Получаем параметры фильтрации
$filters = [
    'category' => $_GET['category'] ?? '',
    'search' => $_GET['search'] ?? '',
    'min_price' => $_GET['min_price'] ?? '',
    'max_price' => $_GET['max_price'] ?? '',
    'dimensions' => $_GET['dimensions'] ?? '',
    'sort_by' => $_GET['sort_by'] ?? 'name'
];

// Получаем данные
$productModel = new Product();
$categoryModel = new Category();

$products = $productModel->getAll($filters);
$categories = $categoryModel->getAll();

include 'includes/header.php';
?>

<div class="container mx-auto px-4 py-8">
    <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar с фильтрами -->
        <aside class="lg:w-64 flex-shrink-0">
            <div class="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 class="text-lg font-semibold mb-4">Фильтры</h2>
                
                <form method="GET" action="/catalog" id="filter-form">
                    <!-- Категории -->
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Категория</label>
                        <select name="category" class="w-full border border-gray-300 rounded-md px-3 py-2" onchange="this.form.submit()">
                            <option value="">Все категории</option>
                            <?php foreach ($categories as $category): ?>
                                <option value="<?= $category['slug'] ?>" <?= $filters['category'] === $category['slug'] ? 'selected' : '' ?>>
                                    <?= escape($category['name']) ?> (<?= $category['product_count'] ?>)
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    
                    <!-- Цена -->
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Цена, ₽</label>
                        <div class="flex gap-2">
                            <input type="number" name="min_price" placeholder="От" 
                                   value="<?= escape($filters['min_price']) ?>"
                                   class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                            <input type="number" name="max_price" placeholder="До"
                                   value="<?= escape($filters['max_price']) ?>"
                                   class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                        </div>
                    </div>
                    
                    <!-- Размеры -->
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Размеры</label>
                        <input type="text" name="dimensions" placeholder="Например: 488x122"
                               value="<?= escape($filters['dimensions']) ?>"
                               class="w-full border border-gray-300 rounded-md px-3 py-2">
                    </div>
                    
                    <!-- Сортировка -->
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Сортировка</label>
                        <select name="sort_by" class="w-full border border-gray-300 rounded-md px-3 py-2" onchange="this.form.submit()">
                            <option value="name" <?= $filters['sort_by'] === 'name' ? 'selected' : '' ?>>По названию</option>
                            <option value="price_asc" <?= $filters['sort_by'] === 'price_asc' ? 'selected' : '' ?>>Цена: по возрастанию</option>
                            <option value="price_desc" <?= $filters['sort_by'] === 'price_desc' ? 'selected' : '' ?>>Цена: по убыванию</option>
                            <option value="rating" <?= $filters['sort_by'] === 'rating' ? 'selected' : '' ?>>По рейтингу</option>
                        </select>
                    </div>
                    
                    <!-- Скрытые поля для сохранения поиска -->
                    <input type="hidden" name="search" value="<?= escape($filters['search']) ?>">
                    
                    <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        Применить фильтры
                    </button>
                    
                    <?php if (array_filter($filters)): ?>
                        <a href="/catalog" class="block w-full text-center text-sm text-gray-600 hover:text-gray-800 mt-2">
                            Сбросить фильтры
                        </a>
                    <?php endif; ?>
                </form>
            </div>
        </aside>
        
        <!-- Основной контент -->
        <main class="flex-1">
            <!-- Заголовок и результаты -->
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">
                        <?php if ($filters['search']): ?>
                            Результаты поиска: "<?= escape($filters['search']) ?>"
                        <?php elseif ($filters['category']): ?>
                            <?php 
                            $currentCategory = array_filter($categories, fn($c) => $c['slug'] === $filters['category']);
                            echo $currentCategory ? escape(reset($currentCategory)['name']) : 'Каталог товаров';
                            ?>
                        <?php else: ?>
                            Каталог товаров
                        <?php endif; ?>
                    </h1>
                    <p class="text-gray-600">Найдено товаров: <?= count($products) ?></p>
                </div>
            </div>
            
            <!-- Товары -->
            <?php if (empty($products)): ?>
                <div class="text-center py-12">
                    <div class="text-6xl mb-4">🔍</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">Товары не найдены</h3>
                    <p class="text-gray-600 mb-4">Попробуйте изменить параметры поиска или фильтры</p>
                    <a href="/catalog" class="text-blue-600 hover:underline">Сбросить все фильтры</a>
                </div>
            <?php else: ?>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <?php foreach ($products as $product): ?>
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
                                
                                <!-- Category -->
                                <div class="text-xs text-blue-600 mb-2">
                                    <?= escape($product['category_name']) ?>
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
                                
                                <!-- Quick Buy -->
                                <button onclick="quickBuy(<?= $product['id'] ?>, '<?= escape($product['name']) ?>', <?= $product['price'] ?>, '<?= escape($product['sku']) ?>')"
                                        class="w-full mt-2 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors">
                                    Купить в один клик
                                </button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </main>
    </div>
</div>

<script>
function quickBuy(productId, name, price, sku) {
    // Очищаем корзину и добавляем один товар
    cart = [{
        id: productId,
        name: name,
        price: price,
        sku: sku,
        quantity: 1
    }];
    localStorage.setItem('aquapool_cart', JSON.stringify(cart));
    updateCartCount();
    
    // Перенаправляем на оформление заказа
    window.location.href = '/checkout';
}

// Задержка для поиска по размерам
let dimensionsTimeout;
document.querySelector('input[name="dimensions"]').addEventListener('input', function() {
    clearTimeout(dimensionsTimeout);
    dimensionsTimeout = setTimeout(() => {
        this.form.submit();
    }, 800);
});

// Задержка для ввода цены
let priceTimeout;
document.querySelectorAll('input[name="min_price"], input[name="max_price"]').forEach(input => {
    input.addEventListener('input', function() {
        clearTimeout(priceTimeout);
        priceTimeout = setTimeout(() => {
            this.form.submit();
        }, 1000);
    });
});
</script>

<?php include 'includes/footer.php'; ?>