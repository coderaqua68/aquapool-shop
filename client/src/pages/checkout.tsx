import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Checkout() {
  const { items, getTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    deliveryAddress: "",
    deliveryMethod: "pickup",
    paymentMethod: "manual",
    notes: "",
  });

  const orderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: (order) => {
      toast({
        title: "Заказ оформлен!",
        description: `Заказ №${order.id} принят в обработку. Мы свяжемся с вами в ближайшее время.`,
      });
      clearCart();
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось оформить заказ. Попробуйте еще раз.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderData = {
      ...formData,
      items: JSON.stringify(items),
      totalAmount: (getTotal() + (getTotal() >= 50000 ? 0 : 2000)).toString(),
    };
    
    orderMutation.mutate(orderData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Корзина пуста</h1>
          <p className="text-gray-600">Добавьте товары в корзину, чтобы оформить заказ</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Оформление заказа</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Method */}
            <Card>
              <CardHeader>
                <CardTitle>Способ доставки</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.deliveryMethod}
                  onValueChange={(value) => handleInputChange("deliveryMethod", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup">Самовывоз (г. Химки) - Бесплатно</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="courier" id="courier" />
                    <Label htmlFor="courier">Курьер по Москве и области - 2 000 ₽</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="transport" id="transport" />
                    <Label htmlFor="transport">Транспортная компания - по тарифам ТК</Label>
                  </div>
                </RadioGroup>
                
                {formData.deliveryMethod !== "pickup" && (
                  <div className="mt-4">
                    <Label htmlFor="address">Адрес доставки *</Label>
                    <Textarea
                      id="address"
                      value={formData.deliveryAddress}
                      onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
                      placeholder="Укажите полный адрес доставки"
                      required={formData.deliveryMethod !== "pickup"}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Способ оплаты</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manual" id="manual" />
                    <Label htmlFor="manual">Оплата после подтверждения менеджером</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Наличными при получении</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Дополнительная информация</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="notes">Комментарий к заказу</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Укажите дополнительные пожелания или комментарии"
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>{(parseFloat(item.price) * item.quantity).toLocaleString()} ₽</span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Товары:</span>
                    <span>{getTotal().toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка:</span>
                    <span>
                      {formData.deliveryMethod === "pickup" 
                        ? "Бесплатно" 
                        : getTotal() >= 50000 
                          ? "Бесплатно" 
                          : "2 000 ₽"}
                    </span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-[hsl(207,90%,54%)]">
                    {(() => {
                      let total = getTotal();
                      if (formData.deliveryMethod !== "pickup" && total < 50000) {
                        total += 2000;
                      }
                      return total.toLocaleString();
                    })()} ₽
                  </span>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)]" 
                  size="lg"
                  disabled={orderMutation.isPending}
                >
                  {orderMutation.isPending ? "Оформление..." : "Оформить заказ"}
                </Button>
                
                <div className="text-xs text-gray-500">
                  <p>Нажимая кнопку "Оформить заказ", вы соглашаетесь с условиями обработки персональных данных и пользовательским соглашением.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
