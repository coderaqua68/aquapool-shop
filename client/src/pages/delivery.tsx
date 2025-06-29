import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, CreditCard, MapPin, Clock, Shield, CheckCircle } from "lucide-react";

export default function Delivery() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Доставка и оплата</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Подробная информация о способах доставки и оплаты заказов. 
          Мы предлагаем удобные и выгодные условия для всех клиентов.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Delivery Methods */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Truck className="w-8 h-8 mr-3 text-[hsl(207,90%,54%)]" />
            Способы доставки
          </h2>
          
          <div className="space-y-6">
            {/* Pickup */}
            <Card className="opacity-60">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                  Самовывоз
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-500">Статус:</span>
                    <span className="text-orange-600 font-bold">Временно недоступно</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>AquaPool — интернет-магазин без шоурума.</p>
                    <p>Мы работаем только с доставкой по всей России курьером прямо по адресу.</p>
                    <p className="mt-2">Для заказа используйте курьерскую доставку или транспортные компании.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Courier Delivery */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-[hsl(207,90%,54%)]" />
                  Доставка по всей России
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Стоимость:</span>
                    <div className="text-right">
                      <span className="text-red-500 line-through">2 000 ₽</span>
                      <span className="text-green-600 font-bold ml-2">Бесплатно от 50 000 ₽</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Сроки:</span>
                    <span>1-7 дней</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Курьерская доставка прямо по адресу в любой город России.</p>
                    <p>Курьер предварительно свяжется с вами для уточнения времени доставки.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transport Company */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-[hsl(207,90%,54%)]" />
                  Транспортные компании
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Стоимость:</span>
                    <span>По тарифам ТК</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Сроки:</span>
                    <span>2-7 дней</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><strong>Партнер:</strong> НАЛОЖКА — сервис безопасных сделок</p>
                    <p>Доставка до терминала ТК или до двери по всей России.</p>
                    <p>Стоимость рассчитывается индивидуально в зависимости от веса, габаритов и региона.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <CreditCard className="w-8 h-8 mr-3 text-[hsl(207,90%,54%)]" />
            Способы оплаты
          </h2>
          
          <div className="space-y-6">
            {/* Manual Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-[hsl(207,90%,54%)]" />
                  После подтверждения менеджером
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• Менеджер свяжется с вами в течение 15 минут после оформления заказа</p>
                  <p>• Уточнит детали заказа и способ доставки</p>
                  <p>• Оплата производится при оформлении заказа</p>
                  
                </div>
              </CardContent>
            </Card>



            {/* Bank Transfer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-[hsl(207,90%,54%)]" />
                  Безналичный расчет
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• Банковским переводом для юридических лиц</p>
                  <p>• Переводом на карту для физических лиц</p>
                  <p>• Выставляем счет на оплату</p>
                  <p>• Предоставляем все необходимые документы</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-12 h-12 text-[hsl(207,90%,54%)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Быстрая обработка</h3>
            <p className="text-gray-600 text-sm">
              Заказы обрабатываются в течение 1 часа в рабочее время
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="w-12 h-12 text-[hsl(207,90%,54%)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Гарантия качества</h3>
            <p className="text-gray-600 text-sm">
              Проверяем каждый товар перед отправкой покупателю
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-[hsl(207,90%,54%)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Надежная упаковка</h3>
            <p className="text-gray-600 text-sm">
              Используем прочные материалы для защиты товара при транспортировке
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Truck className="w-12 h-12 text-[hsl(207,90%,54%)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Отслеживание</h3>
            <p className="text-gray-600 text-sm">
              Предоставляем трек-номер для отслеживания посылки
            </p>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section className="pool-gradient rounded-xl p-8 md:p-12 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">Часто задаваемые вопросы</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">О доставке</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Можно ли доставить крупногабаритный товар?</h4>
                <p className="text-sm opacity-90">
                  Да, мы доставляем товары любых размеров. Для крупногабаритных товаров 
                  используем специальный транспорт.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Что если меня не будет дома?</h4>
                <p className="text-sm opacity-90">
                  Курьер предварительно свяжется с вами и согласует удобное время доставки.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Об оплате</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Можно ли оплатить при получении?</h4>
                <p className="text-sm opacity-90">
                  Нет, мы не работаем с оплатой при получении. Оплата производится 
                  заранее при оформлении заказа для обеспечения гарантий с обеих сторон.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Предоставляете ли документы?</h4>
                <p className="text-sm opacity-90">
                  Да, мы предоставляем все необходимые документы: чеки, накладные, 
                  гарантийные талоны.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}