<?php
// Простая тестовая версия сайта для проверки работоспособности
require_once 'config.php';
require_once 'classes/Database.php';
require_once 'classes/Product.php';

try {
    $database = new Database();
    $pdo = $database->getConnection();
    $productManager = new Product($pdo);
    
    // Проверяем подключение
    $testQuery = $pdo->query("SELECT COUNT(*) as count FROM products");
    $productCount = $testQuery->fetch(PDO::FETCH_ASSOC)['count'];
    
} catch (Exception $e) {
    $error = $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AquaPool - Тест сайта</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-lg shadow-lg p-8">
                <div class="text-center mb-8">
                    <i class="fas fa-swimming-pool text-6xl text-blue-500 mb-4"></i>
                    <h1 class="text-4xl font-bold text-gray-800">AquaPool</h1>
                    <p class="text-gray-600">Интернет-магазин бассейнов</p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="space-y-4">
                        <h2 class="text-2xl font-bold text-gray-800">Статус системы</h2>
                        
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div class="flex items-center">
                                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                                <span class="text-green-800">PHP 8.2 работает</span>
                            </div>
                        </div>
                        
                        <?php if (isset($error)): ?>
                            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div class="flex items-center">
                                    <i class="fas fa-times-circle text-red-500 mr-3"></i>
                                    <span class="text-red-800">Ошибка БД: <?php echo htmlspecialchars($error); ?></span>
                                </div>
                            </div>
                        <?php else: ?>
                            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div class="flex items-center">
                                    <i class="fas fa-database text-green-500 mr-3"></i>
                                    <span class="text-green-800">База данных подключена</span>
                                </div>
                            </div>
                            
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div class="flex items-center">
                                    <i class="fas fa-box text-blue-500 mr-3"></i>
                                    <span class="text-blue-800">Товаров в базе: <?php echo $productCount; ?></span>
                                </div>
                            </div>
                        <?php endif; ?>
                        
                        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div class="flex items-center">
                                <i class="fas fa-globe text-gray-500 mr-3"></i>
                                <span class="text-gray-800">Домен: aquapool-shop.ru</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <h2 class="text-2xl font-bold text-gray-800">Навигация</h2>
                        
                        <div class="space-y-2">
                            <a href="http://aquapool-shop.ru/" class="block bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition">
                                <i class="fas fa-home mr-2"></i>Главная страница
                            </a>
                            
                            <a href="http://aquapool-shop.ru/catalog" class="block bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition">
                                <i class="fas fa-th-large mr-2"></i>Каталог товаров
                            </a>
                            
                            <a href="http://aquapool-shop.ru/contact" class="block bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition">
                                <i class="fas fa-phone mr-2"></i>Контакты
                            </a>
                        </div>
                        
                        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                            <h3 class="font-bold text-yellow-800 mb-2">Контакты</h3>
                            <div class="space-y-1 text-sm text-yellow-700">
                                <p><i class="fas fa-envelope mr-2"></i>aquapoolshop@yandex.ru</p>
                                <p><i class="fab fa-whatsapp mr-2"></i>WhatsApp: +7 916 123-45-67</p>
                                <p><i class="fab fa-telegram mr-2"></i>@aquapool_manager</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-8 text-center">
                    <div class="text-sm text-gray-500">
                        <p>Время сервера: <?php echo date('Y-m-d H:i:s'); ?></p>
                        <p>Версия PHP: <?php echo phpversion(); ?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>