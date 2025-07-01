import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SEOHead from "@/components/seo/seo-head";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Политика конфиденциальности - AquaPool"
        description="Политика конфиденциальности интернет-магазина AquaPool. Информация о сборе, использовании и защите персональных данных покупателей."
        canonical="https://aquapool-shop.ru/privacy-policy"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Политика конфиденциальности
          </h1>

          <div className="space-y-8">
            {/* Общие положения */}
            <Card>
              <CardHeader>
                <CardTitle>1. Общие положения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Настоящая Политика конфиденциальности персональных данных (далее — Политика) 
                  действует в отношении всей информации, которую интернет-магазин AquaPool 
                  (далее — Магазин) может получить о Пользователе во время использования 
                  им сайта aquapool-shop.ru.
                </p>
                <p className="text-gray-700">
                  Использование сайта означает безоговорочное согласие Пользователя с настоящей 
                  Политикой и указанными в ней условиями обработки его персональной информации.
                </p>
              </CardContent>
            </Card>

            {/* Сбор персональных данных */}
            <Card>
              <CardHeader>
                <CardTitle>2. Сбор персональных данных</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 font-semibold">
                  Мы собираем следующие персональные данные:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>ФИО при оформлении заказа</li>
                  <li>Номер телефона для связи</li>
                  <li>Email адрес (при указании)</li>
                  <li>Адрес доставки</li>
                  <li>Информация о заказанных товарах</li>
                </ul>
                <p className="text-gray-700">
                  Данные собираются только при добровольном предоставлении их Пользователем 
                  через формы на сайте для оформления заказов и получения консультаций.
                </p>
              </CardContent>
            </Card>

            {/* Цели использования */}
            <Card>
              <CardHeader>
                <CardTitle>3. Цели использования персональных данных</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 font-semibold">
                  Персональные данные используются исключительно для:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Обработки и выполнения заказов</li>
                  <li>Связи с покупателем по вопросам заказа</li>
                  <li>Организации доставки товаров</li>
                  <li>Предоставления консультаций по товарам</li>
                  <li>Улучшения качества обслуживания</li>
                </ul>
              </CardContent>
            </Card>

            {/* Передача третьим лицам */}
            <Card>
              <CardHeader>
                <CardTitle>4. Передача данных третьим лицам</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Мы не продаем, не обмениваем и не передаем персональные данные третьим лицам, 
                  за исключением случаев:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Передачи курьерским службам для организации доставки</li>
                  <li>Требований законодательства Российской Федерации</li>
                  <li>Получения явного согласия Пользователя</li>
                </ul>
              </CardContent>
            </Card>

            {/* Защита данных */}
            <Card>
              <CardHeader>
                <CardTitle>5. Защита персональных данных</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Для защиты персональных данных мы применяем:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>SSL-шифрование при передаче данных</li>
                  <li>Ограниченный доступ к персональным данным сотрудников</li>
                  <li>Регулярное обновление систем безопасности</li>
                  <li>Резервное копирование и защиту серверов</li>
                </ul>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle>6. Использование Cookie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Наш сайт использует файлы cookie для:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Сохранения товаров в корзине</li>
                  <li>Анализа посещаемости сайта</li>
                  <li>Улучшения работы сайта</li>
                  <li>Персонализации контента</li>
                </ul>
                <p className="text-gray-700">
                  Вы можете отключить cookie в настройках браузера, но это может повлиять 
                  на функциональность сайта.
                </p>
              </CardContent>
            </Card>

            {/* Права пользователей */}
            <Card>
              <CardHeader>
                <CardTitle>7. Права пользователей</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  В соответствии с законодательством РФ, Вы имеете право:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Получать информацию о обработке своих данных</li>
                  <li>Требовать уточнения, блокирования или удаления данных</li>
                  <li>Отзывать согласие на обработку персональных данных</li>
                  <li>Обращаться с жалобами в уполномоченный орган</li>
                </ul>
              </CardContent>
            </Card>

            {/* Хранение данных */}
            <Card>
              <CardHeader>
                <CardTitle>8. Сроки хранения данных</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Персональные данные хранятся в течение:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Данные заказов — 3 года с момента последнего заказа</li>
                  <li>Контактные данные — до отзыва согласия пользователем</li>
                  <li>Данные консультаций — 1 год с момента обращения</li>
                </ul>
              </CardContent>
            </Card>

            {/* Изменения политики */}
            <Card>
              <CardHeader>
                <CardTitle>9. Изменения в Политике</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Магазин оставляет за собой право вносить изменения в данную Политику. 
                  При внесении изменений в актуальной редакции указывается дата последнего обновления.
                </p>
                <p className="text-gray-700">
                  Новая редакция Политики вступает в силу с момента размещения на сайте.
                </p>
              </CardContent>
            </Card>

            {/* Контакты */}
            <Card>
              <CardHeader>
                <CardTitle>10. Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  По всем вопросам, связанным с обработкой персональных данных, 
                  Вы можете обратиться к нам:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> aquapoolshop@yandex.ru
                  </p>
                  <p className="text-gray-700">
                    <strong>Telegram:</strong> @aquapool_manager
                  </p>
                  <p className="text-gray-700">
                    <strong>WhatsApp:</strong> +7 928 566‑87‑29
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Дата последнего обновления:</strong> 29 июня 2025 года
            </p>
            <p className="text-sm text-blue-800 mt-2">
              Используя наш сайт, Вы соглашаетесь с условиями данной Политики конфиденциальности.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}