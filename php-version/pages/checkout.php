<?php
require_once 'config.php';
require_once 'classes/Database.php';
require_once 'classes/Order.php';

$pageTitle = 'Оформление заказа - AquaPool';
$pageDescription = 'Оформите заказ в интернет-магазине AquaPool. Бесплатная доставка до 31 июля.';

$orderSuccess = false;
$orderId = null;

// Обработка отправки формы
if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf($_POST['csrf_token'])) {
    try {
        $orderModel = new Order();
        
        // Получаем данные корзины из POST (отправленные JavaScript)
        $cartData = json_decode($_POST['cart_data'], true);
        
        if (empty($cartData)) {
            throw new Exception('Корзина пуста');
        }
        
        // Подготавливаем данные заказа
        $orderData = [
            'customer_name' => trim($_POST['customer_name']),
            'customer_phone' => trim($_POST['customer_phone']),
            'customer_email' => trim($_POST['customer_email']),
            'delivery_address' => trim($_POST['delivery_address']),
            'delivery_method' => 'Курьером до двери',
            'payment_method' => 'Оплата через менеджера',
            'notes' => trim($_POST['notes'] ?? ''),
            'total_amount' => 0,
            'items' => []
        ];
        
        // Валидация
        if (empty($orderData['customer_name'])) {
            throw new Exception('Укажите ФИО');
        }
        if (empty($orderData['customer_phone'])) {
            throw new Exception('Укажите номер телефона');
        }
        if (empty($orderData['customer_email'])) {
            throw new Exception('Укажите email');
        }
        if (empty($orderData['delivery_address'])) {
            throw new Exception('Укажите адрес доставки');
        }
        
        // Подготавливаем товары и рассчитываем сумму
        foreach ($cartData as $item) {
            $orderData['items'][] = [
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price']
            ];
            $orderData['total_amount'] += $item['price'] * $item['quantity'];
        }
        
        // Создаем заказ
        $order = $orderModel->create($orderData);
        $orderSuccess = true;
        $orderId = $order['id'];
        
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}

include 'includes/header.php';
?>

<div class="container mx-auto px-4 py-8">
    <?php if ($orderSuccess): ?>
        <!-- Order Success -->
        <div class="max-w-2xl mx-auto text-center">
            <div class="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
                <div class="text-6xl mb-4">✅</div>
                <h1 class="text-2xl font-bold text-green-800 mb-4">Заказ успешно оформлен!</h1>
                <p class="text-green-700 mb-4">
                    Ваш заказ №<?= $orderId ?> принят в обработку. 
                    Наш менеджер свяжется с вами в ближайшее время для подтверждения.
                </p>
                <div class="bg-white border border-green-200 rounded-lg p-4 mb-6">
                    <h3 class="font-semibold mb-2">Что дальше?</h3>
                    <ul class="text-sm text-gray-700 space-y-1 text-left">
                        <li>• Менеджер свяжется с вами для подтверждения заказа</li>
                        <li>• Мы согласуем удобное время доставки</li>
                        <li>• Доставим товар курьером до двери</li>
                        <li>• Доставка БЕСПЛАТНА до 31 июля!</li>
                    </ul>
                </div>
                <div class="flex gap-4 justify-center">
                    <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        На главную
                    </a>
                    <a href="/catalog" class="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                        Продолжить покупки
                    </a>
                </div>
            </div>
        </div>
    <?php else: ?>
        <!-- Checkout Form -->
        <h1 class="text-2xl font-bold text-gray-900 mb-8">Оформление заказа</h1>
        
        <?php if (isset($error)): ?>
            <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <?= escape($error) ?>
            </div>
        <?php endif; ?>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Order Form -->
            <div class="lg:col-span-2">
                <form method="POST" id="checkout-form" class="space-y-6">
                    <input type="hidden" name="csrf_token" value="<?= csrf_token() ?>">
                    <input type="hidden" name="cart_data" id="cart_data">
                    
                    <!-- Customer Information -->
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h2 class="text-lg font-semibold mb-4">Контактная информация</h2>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    ФИО <span class="text-red-500">*</span>
                                </label>
                                <input type="text" name="customer_name" required
                                       value="<?= escape($_POST['customer_name'] ?? '') ?>"
                                       class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Телефон <span class="text-red-500">*</span>
                                </label>
                                <input type="tel" name="customer_phone" required
                                       value="<?= escape($_POST['customer_phone'] ?? '') ?>"
                                       placeholder="+7 (999) 123-45-67"
                                       class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            </div>
                            
                            <div class="md:col-span-2">
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Email <span class="text-red-500">*</span>
                                </label>
                                <input type="email" name="customer_email" required
                                       value="<?= escape($_POST['customer_email'] ?? '') ?>"
                                       placeholder="example@email.com"
                                       class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Delivery Information -->
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h2 class="text-lg font-semibold mb-4">Доставка</h2>
                        
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <div class="flex items-center text-green-800">
                                <span class="text-lg mr-2">🎉</span>
                                <div>
                                    <div class="font-semibold">Бесплатная доставка до 31 июля!</div>
                                    <div class="text-sm">Доставим курьером до двери абсолютно бесплатно</div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Адрес доставки <span class="text-red-500">*</span>
                            </label>
                            <textarea name="delivery_address" required rows="3"
                                      placeholder="Укажите полный адрес: город, улица, дом, квартира"
                                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"><?= escape($_POST['delivery_address'] ?? '') ?></textarea>
                        </div>
                        
                        <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div class="text-sm text-blue-800">
                                <strong>Способ доставки:</strong> Курьером до двери<br>
                                <strong>Срок доставки:</strong> 1-3 рабочих дня
                            </div>
                        </div>
                    </div>
                    
                    <!-- Payment Information -->
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h2 class="text-lg font-semibold mb-4">Оплата</h2>
                        
                        <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                            <div class="text-sm text-gray-700">
                                <strong>Способ оплаты:</strong> Оплата через менеджера<br>
                                <span class="text-xs text-gray-600">
                                    Менеджер свяжется с вами и предложит удобный способ оплаты
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Additional Notes -->
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h2 class="text-lg font-semibold mb-4">Комментарий к заказу</h2>
                        
                        <textarea name="notes" rows="3"
                                  placeholder="Дополнительная информация, пожелания по доставке..."
                                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"><?= escape($_POST['notes'] ?? '') ?></textarea>
                    </div>
                    
                    <!-- Submit Button -->
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <button type="submit" id="submit-order" 
                                class="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg">
                            Оформить заказ
                        </button>
                        
                        <p class="text-xs text-gray-600 mt-3 text-center">
                            Нажимая кнопку "Оформить заказ", вы соглашаетесь с 
                            <a href="/privacy-policy" class="text-blue-600 hover:underline">политикой конфиденциальности</a>
                        </p>
                    </div>
                </form>
            </div>
            
            <!-- Order Summary -->
            <div class="lg:col-span-1">
                <div class="bg-white rounded-lg shadow-md p-6 sticky top-24">
                    <h2 class="text-lg font-semibold mb-4">Ваш заказ</h2>
                    
                    <div id="order-summary">
                        <div id="order-loading" class="text-center py-4">
                            <div class="text-gray-600">Загрузка...</div>
                        </div>
                        
                        <div id="order-empty" class="text-center py-4 hidden">
                            <div class="text-gray-600">Корзина пуста</div>
                            <a href="/catalog" class="text-blue-600 hover:underline text-sm">Перейти в каталог</a>
                        </div>
                        
                        <div id="order-items" class="hidden">
                            <div id="order-items-list" class="space-y-3 mb-4">
                                <!-- Order items will be inserted here -->
                            </div>
                            
                            <div class="border-t pt-4">
                                <div class="flex justify-between text-lg font-bold">
                                    <span>Итого:</span>
                                    <span id="order-total">0₽</span>
                                </div>
                                <div class="text-sm text-green-600 mt-1">
                                    Доставка: БЕСПЛАТНО
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?php endif; ?>
</div>

<script>
function renderOrderSummary() {
    const orderLoading = document.getElementById('order-loading');
    const orderEmpty = document.getElementById('order-empty');
    const orderItems = document.getElementById('order-items');
    const orderItemsList = document.getElementById('order-items-list');
    const orderTotal = document.getElementById('order-total');
    const submitButton = document.getElementById('submit-order');
    
    orderLoading.classList.add('hidden');
    
    if (cart.length === 0) {
        orderEmpty.classList.remove('hidden');
        orderItems.classList.add('hidden');
        if (submitButton) submitButton.disabled = true;
        return;
    }
    
    orderEmpty.classList.add('hidden');
    orderItems.classList.remove('hidden');
    if (submitButton) submitButton.disabled = false;
    
    let total = 0;
    orderItemsList.innerHTML = '';
    
    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemHtml = `
            <div class="flex items-center space-x-3 text-sm">
                <img src="${item.image || 'https://via.placeholder.com/50x40?text=Нет+фото'}" 
                     alt="${item.name}" 
                     class="w-12 h-10 object-cover rounded">
                <div class="flex-1">
                    <div class="font-medium text-gray-900">${item.name}</div>
                    <div class="text-gray-600">${item.quantity} × ${formatPrice(item.price)}</div>
                </div>
                <div class="font-medium">${formatPrice(itemTotal)}</div>
            </div>
        `;
        orderItemsList.innerHTML += itemHtml;
    });
    
    orderTotal.textContent = formatPrice(total);
    
    // Update hidden form field with cart data
    document.getElementById('cart_data').value = JSON.stringify(cart);
}

function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', { 
        style: 'currency', 
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(price);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    <?php if (!$orderSuccess): ?>
        renderOrderSummary();
        
        // Clear cart after successful order submission
        document.getElementById('checkout-form').addEventListener('submit', function() {
            setTimeout(() => {
                cart = [];
                localStorage.setItem('aquapool_cart', JSON.stringify(cart));
                updateCartCount();
            }, 100);
        });
    <?php endif; ?>
});
</script>

<?php include 'includes/footer.php'; ?>