<?php
require_once 'config.php';

$pageTitle = 'Доставка и оплата - AquaPool';
$pageDescription = 'Условия доставки и оплаты в интернет-магазине AquaPool. Бесплатная доставка до 31 июля.';

include 'includes/header.php';
?>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Доставка и оплата</h1>
    
    <!-- Free Delivery Banner -->
    <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
        <div class="flex items-center">
            <div class="text-2xl mr-3">🎉</div>
            <div>
                <h2 class="text-xl font-bold text-green-800 mb-2">Акция! Бесплатная доставка до 31 июля</h2>
                <p class="text-green-700">
                    На все товары действует бесплатная доставка курьером до двери. 
                    Успейте оформить заказ и сэкономьте на доставке!
                </p>
            </div>
        </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Доставка -->
        <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">🚚 Доставка</h2>
            
            <div class="space-y-6">
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Курьерская доставка</h3>
                    <ul class="space-y-2 text-gray-700">
                        <li class="flex items-start">
                            <span class="text-green-500 mr-2">✓</span>
                            Доставка курьером до двери
                        </li>
                        <li class="flex items-start">
                            <span class="text-green-500 mr-2">✓</span>
                            Москва и Московская область
                        </li>
                        <li class="flex items-start">
                            <span class="text-green-500 mr-2">✓</span>
                            Срок доставки: 1-3 рабочих дня
                        </li>
                        <li class="flex items-start">
                            <span class="text-green-500 mr-2">✓</span>
                            <strong>БЕСПЛАТНО до 31 июля 2025</strong>
                        </li>
                    </ul>
                </div>
                
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-blue-900 mb-3">Как происходит доставка</h3>
                    <ol class="space-y-2 text-blue-800">
                        <li class="flex items-start">
                            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                            Обработка заказа (до 24 часов)
                        </li>
                        <li class="flex items-start">
                            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                            Менеджер свяжется для подтверждения
                        </li>
                        <li class="flex items-start">
                            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                            Доставка в удобное время
                        </li>
                        <li class="flex items-start">
                            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                            Проверка товара при получении
                        </li>
                    </ol>
                </div>
            </div>
        </div>
        
        <!-- Оплата -->
        <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">💳 Оплата</h2>
            
            <div class="space-y-6">
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Способы оплаты</h3>
                    <ul class="space-y-2 text-gray-700">
                        <li class="flex items-start">
                            <span class="text-green-500 mr-2">✓</span>
                            Оплата через менеджера (банковская карта)
                        </li>
                        <li class="flex items-start">
                            <span class="text-green-500 mr-2">✓</span>
                            Наложенный платеж при получении
                        </li>
                        <li class="flex items-start">
                            <span class="text-green-500 mr-2">✓</span>
                            Безналичный расчет для организаций
                        </li>
                    </ul>
                </div>
                
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-yellow-800 mb-3">Безопасность платежей</h3>
                    <ul class="space-y-2 text-yellow-700">
                        <li class="flex items-start">
                            <span class="text-yellow-600 mr-2">🔒</span>
                            Защищенные платежные системы
                        </li>
                        <li class="flex items-start">
                            <span class="text-yellow-600 mr-2">🔒</span>
                            Шифрование данных SSL
                        </li>
                        <li class="flex items-start">
                            <span class="text-yellow-600 mr-2">🔒</span>
                            Возможность проверки товара перед оплатой
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
    <!-- FAQ Section -->
    <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Часто задаваемые вопросы</h2>
        
        <div class="space-y-4">
            <details class="bg-white border border-gray-200 rounded-lg">
                <summary class="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
                    Можно ли изменить адрес доставки после оформления заказа?
                </summary>
                <div class="p-4 pt-0 text-gray-700">
                    Да, вы можете изменить адрес доставки до момента отправки товара. 
                    Свяжитесь с нашим менеджером по телефону или WhatsApp.
                </div>
            </details>
            
            <details class="bg-white border border-gray-200 rounded-lg">
                <summary class="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
                    Что делать, если товар пришел поврежденным?
                </summary>
                <div class="p-4 pt-0 text-gray-700">
                    Обязательно проверьте товар при получении. Если обнаружены повреждения, 
                    сообщите об этом курьеру и нашему менеджеру. Мы заменим товар или вернем деньги.
                </div>
            </details>
            
            <details class="bg-white border border-gray-200 rounded-lg">
                <summary class="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
                    Есть ли доставка в другие регионы?
                </summary>
                <div class="p-4 pt-0 text-gray-700">
                    В настоящее время мы доставляем только по Москве и Московской области. 
                    Доставка в другие регионы планируется в ближайшем будущем.
                </div>
            </details>
            
            <details class="bg-white border border-gray-200 rounded-lg">
                <summary class="p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
                    Можно ли оплатить заказ частями?
                </summary>
                <div class="p-4 pt-0 text-gray-700">
                    Для крупных заказов возможна оплата частями. 
                    Обсудите этот вопрос с менеджером при оформлении заказа.
                </div>
            </details>
        </div>
    </div>
    
    <!-- Contact Section -->
    <div class="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-8">
        <h2 class="text-2xl font-bold text-blue-900 mb-4">Остались вопросы?</h2>
        <p class="text-blue-800 mb-6">
            Наши менеджеры готовы ответить на все ваши вопросы о доставке и оплате
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
            <a href="<?= whatsapp_link('Здравствуйте! У меня вопрос по доставке и оплате') ?>" 
               class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors text-center font-semibold">
                📱 Написать в WhatsApp
            </a>
            <a href="mailto:aquapoolshop@yandex.ru" 
               class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold">
                📧 Написать на email
            </a>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>