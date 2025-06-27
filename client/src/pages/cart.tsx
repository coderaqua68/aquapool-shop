import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CartItem from "@/components/cart/cart-item";
import { useCart } from "@/hooks/use-cart";
import { ShoppingBag } from "lucide-react";

export default function Cart() {
  const { items, getTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Корзина пуста</h1>
          <p className="text-gray-600 mb-6">Добавьте товары в корзину, чтобы оформить заказ</p>
          <Link href="/catalog">
            <Button className="bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)]">
              Перейти в каталог
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Корзина</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Товары в корзине ({items.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-4 flex justify-between">
            <Button variant="outline" onClick={clearCart}>
              Очистить корзину
            </Button>
            <Link href="/catalog">
              <Button variant="outline">
                Продолжить покупки
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Итого</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Товары:</span>
                  <span>{getTotal().toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span>{getTotal() >= 50000 ? 'Бесплатно' : '2 000 ₽'}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>К оплате:</span>
                <span className="text-[hsl(207,90%,54%)]">
                  {(getTotal() + (getTotal() >= 50000 ? 0 : 2000)).toLocaleString()} ₽
                </span>
              </div>
              
              <Link href="/checkout">
                <Button className="w-full bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)]" size="lg">
                  Оформить заказ
                </Button>
              </Link>
              
              <div className="text-sm text-gray-500">
                <p>✓ Безопасная оплата</p>
                <p>✓ Бесплатная доставка от 50 000 ₽</p>
                <p>✓ Гарантия качества</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
