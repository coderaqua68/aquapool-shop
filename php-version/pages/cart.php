<?php
require_once 'config.php';

$pageTitle = 'Корзина - AquaPool';
$pageDescription = 'Корзина товаров в интернет-магазине AquaPool. Оформите заказ и получите бесплатную доставку.';

include 'includes/header.php';
?>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-8">Корзина</h1>
    
    <!-- Cart Content -->
    <div id="cart-content">
        <!-- Loading state -->
        <div id="cart-loading" class="text-center py-8">
            <div class="text-gray-600">Загрузка корзины...</div>
        </div>
        
        <!-- Empty cart -->
        <div id="empty-cart" class="text-center py-16 hidden">
            <div class="text-6xl mb-4">🛒</div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">Корзина пуста</h2>
            <p class="text-gray-600 mb-6">Добавьте товары в корзину, чтобы оформить заказ</p>
            <a href="/catalog" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Перейти в каталог
            </a>
        </div>
        
        <!-- Cart items -->
        <div id="cart-items" class="hidden">
            <div class="bg-white rounded-lg shadow-md">
                <div class="p-6">
                    <div class="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 border-b pb-4 mb-4">
                        <div class="col-span-6">Товар</div>
                        <div class="col-span-2 text-center">Цена</div>
                        <div class="col-span-2 text-center">Количество</div>
                        <div class="col-span-2 text-center">Итого</div>
                    </div>
                    
                    <div id="cart-items-list">
                        <!-- Cart items will be inserted here -->
                    </div>
                </div>
                
                <!-- Cart summary -->
                <div class="border-t bg-gray-50 p-6">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-lg font-semibold">Итого к оплате:</span>
                        <span id="cart-total" class="text-2xl font-bold text-gray-900">0₽</span>
                    </div>
                    
                    <!-- Free delivery notice -->
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <div class="flex items-center text-green-800">
                            <span class="text-lg mr-2">🎉</span>
                            <div>
                                <div class="font-semibold">Бесплатная доставка до 31 июля!</div>
                                <div class="text-sm">Доставим ваш заказ абсолютно бесплатно</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex gap-4">
                        <button onclick="clearCart()" 
                                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Очистить корзину
                        </button>
                        <a href="/checkout" 
                           class="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors text-center font-semibold">
                            Оформить заказ
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Recommended products -->
    <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Рекомендуем также</h2>
        <div id="recommended-products" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Products will be loaded here -->
        </div>
    </div>
</div>

<script>
function renderCart() {
    const cartLoading = document.getElementById('cart-loading');
    const emptyCart = document.getElementById('empty-cart');
    const cartItems = document.getElementById('cart-items');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    
    cartLoading.classList.add('hidden');
    
    if (cart.length === 0) {
        emptyCart.classList.remove('hidden');
        cartItems.classList.add('hidden');
        return;
    }
    
    emptyCart.classList.add('hidden');
    cartItems.classList.remove('hidden');
    
    let total = 0;
    cartItemsList.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemHtml = `
            <div class="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-100 last:border-b-0">
                <div class="col-span-6">
                    <div class="flex items-center space-x-4">
                        <img src="${item.image || 'https://via.placeholder.com/80x60?text=Нет+фото'}" 
                             alt="${item.name}" 
                             class="w-16 h-12 object-cover rounded">
                        <div>
                            <h3 class="font-medium text-gray-900">${item.name}</h3>
                            <p class="text-sm text-gray-600">Артикул: ${item.sku}</p>
                        </div>
                    </div>
                </div>
                <div class="col-span-2 text-center">
                    <span class="font-medium">${formatPrice(item.price)}</span>
                </div>
                <div class="col-span-2 text-center">
                    <div class="flex items-center justify-center space-x-2">
                        <button onclick="changeQuantity(${index}, -1)" 
                                class="w-8 h-8 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center">
                            −
                        </button>
                        <span class="w-8 text-center font-medium">${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)" 
                                class="w-8 h-8 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center">
                            +
                        </button>
                    </div>
                </div>
                <div class="col-span-1 text-center">
                    <span class="font-bold">${formatPrice(itemTotal)}</span>
                </div>
                <div class="col-span-1 text-center">
                    <button onclick="removeFromCart(${index})" 
                            class="text-red-500 hover:text-red-700 transition-colors">
                        🗑️
                    </button>
                </div>
            </div>
        `;
        cartItemsList.innerHTML += itemHtml;
    });
    
    cartTotal.textContent = formatPrice(total);
}

function changeQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem('aquapool_cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('aquapool_cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
    showNotification('Товар удален из корзины');
}

function clearCart() {
    if (confirm('Вы уверены, что хотите очистить корзину?')) {
        cart = [];
        localStorage.setItem('aquapool_cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
        showNotification('Корзина очищена');
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', { 
        style: 'currency', 
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(price);
}

// Load recommended products
async function loadRecommendedProducts() {
    try {
        const response = await fetch('/api/products/popular');
        const products = await response.json();
        
        const container = document.getElementById('recommended-products');
        container.innerHTML = '';
        
        products.slice(0, 4).forEach(product => {
            const images = product.images ? JSON.parse(product.images) : [];
            const mainImage = images[0] || 'https://via.placeholder.com/300x225?text=Нет+фото';
            
            const productHtml = `
                <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div class="aspect-w-4 aspect-h-3 rounded-t-lg overflow-hidden">
                        <img src="${mainImage}" alt="${product.name}" class="w-full h-48 object-cover">
                    </div>
                    <div class="p-4">
                        <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                            <a href="/product/${product.slug}" class="hover:text-blue-600">
                                ${product.name}
                            </a>
                        </h3>
                        <div class="text-lg font-bold text-gray-900 mb-3">
                            ${formatPrice(product.price)}
                        </div>
                        <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.sku}', '${mainImage}')"
                                class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-sm">
                            В корзину
                        </button>
                    </div>
                </div>
            `;
            container.innerHTML += productHtml;
        });
    } catch (error) {
        console.error('Error loading recommended products:', error);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    loadRecommendedProducts();
});
</script>

<?php include 'includes/footer.php'; ?>