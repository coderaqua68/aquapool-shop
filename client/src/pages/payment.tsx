import { CreditCard, Wallet, Banknote, Shield } from "lucide-react";

export default function Payment() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Способы оплаты</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Онлайн оплата */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="w-8 h-8 text-[hsl(207,90%,54%)] mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Онлайн оплата</h2>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li>• Банковские карты Visa, MasterCard, МИР</li>
              <li>• Яндекс.Деньги, WebMoney</li>
              <li>• QIWI кошелек</li>
              <li>• СБП (Система быстрых платежей)</li>
            </ul>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-700 font-medium">
                ⏳ Временно недоступно
              </p>
            </div>
          </div>

          {/* Сервис безопасных сделок Наложка */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Сервис безопасных сделок Наложка</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li>• Безопасная сделка с гарантией</li>
              <li>• Оплата через проверенный сервис</li>
              <li>• Защита покупателя и продавца</li>
              <li>• Возврат средств при проблемах</li>
            </ul>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700 font-medium">
                ✓ Рекомендуемый способ оплаты
              </p>
            </div>
          </div>

          {/* Безналичный расчет */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Wallet className="w-8 h-8 text-[hsl(207,90%,54%)] mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Безналичный расчет</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li>• Банковский перевод для юридических лиц</li>
              <li>• Счет на оплату</li>
              <li>• Переводы для физических лиц</li>
            </ul>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-700 font-medium">
                ⏰ Обработка заказа после поступления средств
              </p>
            </div>
          </div>

          {/* Безопасность */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-[hsl(207,90%,54%)] mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Безопасность</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li>• SSL-шифрование всех платежей</li>
              <li>• Соответствие стандарту PCI DSS</li>
              <li>• Защита персональных данных</li>
            </ul>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 font-medium">
                🔒 Ваши данные надежно защищены
              </p>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Важная информация</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Условия оплаты</h4>
              <ul className="space-y-1">
                <li>• Все цены указаны в рублях</li>
                <li>• Предоплата 100% при онлайн заказе</li>
                <li>• Возможна рассрочка для крупных заказов</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Возврат средств</h4>
              <ul className="space-y-1">
                <li>• Возврат в течение 14 дней</li>
                <li>• На тот же способ оплаты</li>
                <li>• Сроки зависят от платежной системы</li>
                <li>• Банковские карты: 3-5 рабочих дней</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Контакты для вопросов по оплате */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Вопросы по оплате?</h3>
          <p className="text-gray-600 mb-4">Наши менеджеры помогут выбрать удобный способ оплаты</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <span className="text-[hsl(207,89%,40%)] font-semibold text-lg">+7 928 566‑87‑29</span>
            <span className="text-gray-500">или</span>
            <span className="text-[hsl(207,89%,40%)]">info@aquapool.ru</span>
          </div>
        </div>
      </div>
    </div>
  );
}