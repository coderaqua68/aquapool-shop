import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import CartItem from "./cart-item";
import { useCart } from "@/hooks/use-cart";
import { ShoppingBag } from "lucide-react";

export default function CartSidebar() {
  const { items, getTotal, isOpen, setIsOpen } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-left">
            Корзина ({items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-500 text-center">Корзина пуста</p>
              <p className="text-sm text-gray-400 text-center mt-2">
                Добавьте товары для оформления заказа
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Товары:</span>
                <span>{getTotal().toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Доставка:</span>
                <span>{getTotal() >= 50000 ? 'Бесплатно' : '2 000 ₽'}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Итого:</span>
                <span className="text-[hsl(207,90%,54%)]">
                  {(getTotal() + (getTotal() >= 50000 ? 0 : 2000)).toLocaleString()} ₽
                </span>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <Link href="/checkout">
                <Button 
                  className="w-full bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)]"
                  onClick={() => setIsOpen(false)}
                >
                  Оформить заказ
                </Button>
              </Link>
              <Link href="/cart">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Перейти в корзину
                </Button>
              </Link>
            </div>

            <div className="text-xs text-gray-500 mt-4 space-y-1">
              <p>✓ Бесплатная доставка до 31 июля</p>
              <p>✓ Безопасная оплата</p>
              <p>✓ Гарантия качества</p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}