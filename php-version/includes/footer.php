    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white mt-16">
        <div class="container mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- Logo & Description -->
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                            <span class="text-white text-lg font-bold">🏊‍♂️</span>
                        </div>
                        <span class="text-xl font-bold">AquaPool</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Интернет-магазин бассейнов и оборудования. 300+ товаров в каталоге.
                    </p>
                    <div class="text-green-400 text-sm font-medium">
                        🎉 Бесплатная доставка до 31 июля
                    </div>
                </div>
                
                <!-- Каталог -->
                <div>
                    <h3 class="text-lg font-semibold mb-4">Каталог</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/category/karkasnye-basseyny" class="text-gray-300 hover:text-white">Каркасные бассейны</a></li>
                        <li><a href="/category/morozostojkie-basseyny" class="text-gray-300 hover:text-white">Морозоустойчивые</a></li>
                        <li><a href="/category/dzjakuzi-intex" class="text-gray-300 hover:text-white">Джакузи Intex</a></li>
                        <li><a href="/category/dzjakuzi-bestway" class="text-gray-300 hover:text-white">Джакузи Bestway</a></li>
                        <li><a href="/category/zapasnye-chashi" class="text-gray-300 hover:text-white">Запасные чаши</a></li>
                    </ul>
                </div>
                
                <!-- Информация -->
                <div>
                    <h3 class="text-lg font-semibold mb-4">Информация</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/delivery" class="text-gray-300 hover:text-white">Доставка</a></li>
                        <li><a href="/about" class="text-gray-300 hover:text-white">О компании</a></li>
                        <li><a href="/contact" class="text-gray-300 hover:text-white">Контакты</a></li>
                        <li><a href="/privacy-policy" class="text-gray-300 hover:text-white">Политика конфиденциальности</a></li>
                    </ul>
                </div>
                
                <!-- Контакты -->
                <div>
                    <h3 class="text-lg font-semibold mb-4">Контакты</h3>
                    <div class="space-y-3 text-sm">
                        <div>
                            <div class="text-gray-300">Email:</div>
                            <a href="mailto:aquapoolshop@yandex.ru" class="text-blue-400 hover:text-blue-300">
                                aquapoolshop@yandex.ru
                            </a>
                        </div>
                        <div>
                            <div class="text-gray-300">WhatsApp:</div>
                            <a href="<?= whatsapp_link('Здравствуйте! Интересует информация о товарах') ?>" 
                               class="text-green-400 hover:text-green-300">
                                Написать в WhatsApp
                            </a>
                        </div>
                        <div>
                            <div class="text-gray-300">Адрес:</div>
                            <div class="text-gray-400">г. Химки</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Copyright -->
            <div class="border-t border-gray-700 mt-8 pt-8 text-center">
                <div class="text-sm text-gray-400">
                    © <?= date('Y') ?> AquaPool. Все права защищены.
                </div>
            </div>
        </div>
    </footer>
    
    <!-- Floating WhatsApp Button -->
    <div class="fixed bottom-6 right-6 z-50">
        <a href="<?= whatsapp_link('Здравствуйте! Хочу получить консультацию') ?>" 
           class="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg animate-pulse hover:animate-none transition-all duration-300">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
            </svg>
        </a>
    </div>
    
    <!-- JavaScript -->
    <script src="/assets/js/app.js"></script>
    
    <!-- Cart & Favorites functionality -->
    <script>
        // Cart management
        let cart = JSON.parse(localStorage.getItem('aquapool_cart') || '[]');
        let favorites = JSON.parse(localStorage.getItem('aquapool_favorites') || '[]');
        
        function updateCartCount() {
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            const countEl = document.getElementById('cart-count');
            if (count > 0) {
                countEl.textContent = count;
                countEl.classList.remove('hidden');
            } else {
                countEl.classList.add('hidden');
            }
        }
        
        function updateFavoritesCount() {
            const count = favorites.length;
            const countEl = document.getElementById('favorites-count');
            if (count > 0) {
                countEl.textContent = count;
                countEl.classList.remove('hidden');
            } else {
                countEl.classList.add('hidden');
            }
        }
        
        function addToCart(productId, name, price, sku, image) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: productId,
                    name: name,
                    price: price,
                    sku: sku,
                    image: image,
                    quantity: 1
                });
            }
            localStorage.setItem('aquapool_cart', JSON.stringify(cart));
            updateCartCount();
            showNotification('Товар добавлен в корзину');
        }
        
        function toggleFavorite(productId, name, slug) {
            const index = favorites.findIndex(item => item.id === productId);
            if (index >= 0) {
                favorites.splice(index, 1);
                showNotification('Товар удален из избранного');
            } else {
                favorites.push({
                    id: productId,
                    name: name,
                    slug: slug
                });
                showNotification('Товар добавлен в избранное');
            }
            localStorage.setItem('aquapool_favorites', JSON.stringify(favorites));
            updateFavoritesCount();
        }
        
        function showNotification(message) {
            // Simple notification
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
            notification.textContent = message;
            document.body.appendChild(notification);
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 3000);
        }
        
        // Initialize counts
        updateCartCount();
        updateFavoritesCount();
    </script>
</body>
</html>