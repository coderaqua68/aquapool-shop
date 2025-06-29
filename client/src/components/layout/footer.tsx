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
                <Link href="/catalog/karkasnye-basseyny" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  Каркасные бассейны
                </Link>
              </li>
              <li>
                <Link href="/catalog/morozostojkie-basseyny" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  Морозоустойчивые бассейны
                </Link>
              </li>
              <li>
                <Link href="/catalog/naduvnye-basseyny" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  Надувные бассейны
                </Link>
              </li>
              <li>
                <Link href="/catalog/dzjakuzi-intex" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  Джакузи INTEX
                </Link>
              </li>
              <li>
                <Link href="/catalog/chashi" className="text-gray-300 hover:text-[hsl(188,83%,70%)] transition-colors">
                  Чаши
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
                <span className="text-gray-300">+7 928 566‑87‑29</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-[hsl(188,83%,70%)]">✉️</span>
                <span className="text-gray-300">info@aquapool.ru</span>
              </div>
              <div className="flex items-start">
                <span className="mr-3 mt-1 text-[hsl(188,83%,70%)]">🕒</span>
                <span className="text-gray-300">
                  Пн-Вс: 9:00-21:00
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 AquaPool. Все права защищены.
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
