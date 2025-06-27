import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CartItem from "@/components/cart/cart-item";
import { useCart } from "@/hooks/use-cart";
import { ShoppingBag, ArrowLeft, Truck, Shield, CreditCard, Trash2 } from "lucide-react";

export default function Cart() {
  const { items, getTotal, getItemCount, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/catalog" className="inline-flex items-center text-[hsl(207,90%,54%)] hover:text-[hsl(207,89%,40%)]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться в каталог
          </Link>
        </div>
        
        <div className="text-center py-16">
          <div className="bg-gray-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Корзина пуста</h1>
          <p className="text-gray-600 mb-8 text-lg">Добавьте товары в корзину, чтобы оформить заказ</p>
          <Link href="/catalog">
            <Button size="lg" className="bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)]">
              Перейти в каталог
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with breadcrumb */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/catalog" className="inline-flex items-center text-[hsl(207,90%,54%)] hover:text-[hsl(207,89%,40%)] mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться в каталог
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
          <p className="text-gray-600 mt-1">
            {getItemCount()} {getItemCount() === 1 ? 'товар' : getItemCount() < 5 ? 'товара' : 'товаров'} на сумму {getTotal().toLocaleString()} ₽
          </p>
        </div>
        
        {items.length > 0 && (
          <Button 
            variant="outline" 
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Очистить корзину
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <CartItem item={item} />
              </CardContent>
            </Card>
          ))}
          
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
