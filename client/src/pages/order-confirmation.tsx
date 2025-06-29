import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Truck, MessageCircle, ArrowLeft, Package } from "lucide-react";
import type { Order } from "@shared/schema";

export default function OrderConfirmation() {
  const [location, setLocation] = useLocation();
  const [orderId, setOrderId] = useState<string | null>(null);

  // Получаем ID заказа из URL параметров
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('orderId');
    setOrderId(id);
  }, [location]);

  // Загружаем данные заказа
  const { data: order, isLoading } = useQuery<Order>({
    queryKey: ["/api/orders", orderId],
    queryFn: async () => {
      if (!orderId) throw new Error("No order ID");
      const response = await fetch(`/api/orders/${orderId}`);
      if (!response.ok) throw new Error("Order not found");
      return response.json();
    },
    enabled: !!orderId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(207,90%,54%)] mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка информации о заказе...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">Заказ не найден</p>
            <Link href="/">
              <Button>На главную</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Парсим элементы заказа
  const orderItems = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
  const totalAmount = orderItems.reduce((sum: number, item: any) => sum + (parseFloat(item.price) * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header с успешным статусом */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Заказ успешно оформлен!
          </h1>
          <p className="text-lg text-gray-600">
            Номер заказа: <span className="font-semibold">#{order.id}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Детали заказа */}
          <div className="lg:col-span-2 space-y-6">
            {/* Информация о заказе */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Детали заказа
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderItems.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Артикул: {item.sku} • Количество: {item.quantity} шт.
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {(parseFloat(item.price) * item.quantity).toLocaleString()} ₽
                        </p>
                        <p className="text-sm text-gray-500">
                          {parseFloat(item.price).toLocaleString()} ₽ за шт.
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Итого к оплате:</span>
                      <span>{totalAmount.toLocaleString()} ₽</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      🚚 Бесплатная доставка до 31 июля
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Информация о доставке */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Доставка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">Курьером до двери</p>
                    <p className="text-sm text-gray-600">Бесплатная доставка по акции</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Адрес доставки:</p>
                    <p className="text-gray-600">{order.deliveryAddress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar с контактами и следующими шагами */}
          <div className="space-y-6">
            {/* Контактная информация */}
            <Card>
              <CardHeader>
                <CardTitle>Ваши контакты</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Телефон:</p>
                  <p className="font-medium">{order.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email:</p>
                  <p className="font-medium">{order.customerEmail}</p>
                </div>
              </CardContent>
            </Card>

            {/* Что дальше */}
            <Card>
              <CardHeader>
                <CardTitle>Что дальше?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[hsl(207,90%,54%)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Обработка заказа</p>
                    <p className="text-sm text-gray-600">Мы получили ваш заказ и обрабатываем его</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Связь с менеджером</p>
                    <p className="text-sm text-gray-600">Наш менеджер свяжется с вами для уточнения деталей и оплаты</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Доставка</p>
                    <p className="text-sm text-gray-600">Доставим ваш заказ в течение 1-3 дней</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Контакты для связи */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Есть вопросы?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  Свяжитесь с нами любым удобным способом:
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Telegram:</span> @aquapool_manager
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> info@aquapool.ru
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Кнопки навигации */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              На главную
            </Button>
          </Link>
          <Link href="/catalog">
            <Button className="bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,48%)]">
              Продолжить покупки
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}