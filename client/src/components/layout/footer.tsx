import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="pool-gradient p-2 rounded-lg mr-3">
                <div className="text-white text-xl">🏊</div>
              </div>
              <div>
                <h3 className="text-xl font-bold">AquaPool</h3>
                <p className="text-gray-400 text-sm">Бассейны и аксессуары</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Качественные бассейны для вашего дома. Быстрая доставка по всей России.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-[hsl(207,90%,54%)] p-3 rounded-lg transition-colors">
                📞
              </a>
              <a href="#" className="bg-gray-800 hover:bg-[hsl(207,90%,54%)] p-3 rounded-lg transition-colors">
                ✈️
              </a>
              <a href="#" className="bg-gray-800 hover:bg-[hsl(207,90%,54%)] p-3 rounded-lg transition-colors">
                💬
              </a>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Каталог</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog/frame-pools" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  Каркасные бассейны
                </Link>
              </li>
              <li>
                <Link href="/catalog/pumps-filters" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  Насосы и фильтры
                </Link>
              </li>
              <li>
                <Link href="/catalog/ladders" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  Лестницы
                </Link>
              </li>
              <li>
                <Link href="/catalog/covers-underlays" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  Подстилки и тенты
                </Link>
              </li>
              <li>
                <Link href="/catalog/accessories" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  Аксессуары
                </Link>
              </li>
              <li>
                <Link href="/catalog/chemicals" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  Химия и уход
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Информация</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  Гарантия
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  Монтаж
                </a>
              </li>
              <li>
                <Link href="/contacts" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="mr-3 text-[hsl(188,83%,70%)]">📞</span>
                <span className="text-gray-300">8 (800) 123-45-67</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-[hsl(188,83%,70%)]">✉️</span>
                <span className="text-gray-300">info@aquapool.ru</span>
              </div>
              <div className="flex items-start">
                <span className="mr-3 mt-1 text-[hsl(188,83%,70%)]">📍</span>
                <span className="text-gray-300">
                  г. Химки, ул. Складская, 15<br />
                  Пн-Вс: 9:00-21:00
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 AquaPool. Все права защищены.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-[hsl(188,83%,70%)] transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-gray-400 hover:text-[hsl(188,83%,70%)] transition-colors">
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
