<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $pageTitle ?? 'AquaPool - Интернет-магазин бассейнов' ?></title>
    <meta name="description" content="<?= $pageDescription ?? SITE_DESCRIPTION ?>">
    
    <!-- Open Graph -->
    <meta property="og:title" content="<?= $pageTitle ?? 'AquaPool - Интернет-магазин бассейнов' ?>">
    <meta property="og:description" content="<?= $pageDescription ?? SITE_DESCRIPTION ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?= SITE_URL . $_SERVER['REQUEST_URI'] ?>">
    
    <!-- Favicon -->
    <link rel="icon" href="/assets/favicon.ico">
    
    <!-- Styles -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="/assets/css/style.css" rel="stylesheet">
    
    <!-- Yandex.Metrika -->
    <script type="text/javascript">
        (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(98765432, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
        });
    </script>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-4">
            <!-- Top bar -->
            <div class="border-b border-gray-200 py-2">
                <div class="flex justify-between items-center text-sm">
                    <div class="text-gray-600">
                        📍 г.Химки
                    </div>
                    <div class="flex items-center space-x-4">
                        <span class="text-green-600 font-medium">🎉 Бесплатная доставка до 31 июля</span>
                        <a href="<?= whatsapp_link('Здравствуйте! Хочу получить консультацию по бассейнам') ?>" 
                           class="text-blue-600 hover:underline">📱 WhatsApp консультация</a>
                    </div>
                </div>
            </div>
            
            <!-- Main header -->
            <div class="py-4">
                <div class="flex items-center justify-between">
                    <!-- Logo -->
                    <div class="flex items-center">
                        <a href="/" class="flex items-center space-x-2">
                            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                                <span class="text-white text-xl font-bold">🏊‍♂️</span>
                            </div>
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900">AquaPool</h1>
                                <p class="text-sm text-gray-500">Интернет-магазин бассейнов</p>
                            </div>
                        </a>
                    </div>
                    
                    <!-- Search -->
                    <div class="flex-1 max-w-lg mx-8">
                        <form action="/search" method="GET" class="relative">
                            <input type="text" name="q" placeholder="Поиск товаров..." 
                                   value="<?= escape($_GET['q'] ?? '') ?>"
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <button type="submit" class="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
                                🔍
                            </button>
                        </form>
                    </div>
                    
                    <!-- Actions -->
                    <div class="flex items-center space-x-4">
                        <a href="/favorites" class="relative p-2 text-gray-600 hover:text-red-500">
                            ❤️
                            <span id="favorites-count" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hidden">0</span>
                        </a>
                        <a href="/cart" class="relative p-2 text-gray-600 hover:text-blue-600">
                            🛒
                            <span id="cart-count" class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hidden">0</span>
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Navigation -->
            <nav class="border-t border-gray-200 py-3">
                <div class="flex items-center space-x-8">
                    <a href="/" class="text-gray-600 hover:text-blue-600 <?= $_SERVER['REQUEST_URI'] === '/' ? 'text-blue-600 font-medium' : '' ?>">
                        Главная
                    </a>
                    <a href="/catalog" class="text-gray-600 hover:text-blue-600 <?= strpos($_SERVER['REQUEST_URI'], '/catalog') === 0 ? 'text-blue-600 font-medium' : '' ?>">
                        Каталог
                    </a>
                    <a href="/delivery" class="text-gray-600 hover:text-blue-600 <?= $_SERVER['REQUEST_URI'] === '/delivery' ? 'text-blue-600 font-medium' : '' ?>">
                        Доставка
                    </a>
                    <a href="/contact" class="text-gray-600 hover:text-blue-600 <?= $_SERVER['REQUEST_URI'] === '/contact' ? 'text-blue-600 font-medium' : '' ?>">
                        Контакты
                    </a>
                    <a href="/about" class="text-gray-600 hover:text-blue-600 <?= $_SERVER['REQUEST_URI'] === '/about' ? 'text-blue-600 font-medium' : '' ?>">
                        О нас
                    </a>
                </div>
            </nav>
        </div>
    </header>

    <main class="min-h-screen">