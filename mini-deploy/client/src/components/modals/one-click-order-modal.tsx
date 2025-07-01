import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Product } from "@shared/schema";

interface OneClickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function OneClickOrderModal({ isOpen, onClose, product }: OneClickOrderModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
      setFormData({ customerName: "", customerPhone: "", customerEmail: "" });
      onClose();
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
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
      deliveryMethod: "courier",
      paymentMethod: "manual",
      items: JSON.stringify([{
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1
      }]),
      totalAmount: (parseFloat(product.price) + 2000).toString(),
      notes: "Заказ в 1 клик",
    };
    
    orderMutation.mutate(orderData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2 text-[hsl(207,90%,54%)]" />
            Купить в 1 клик
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Product Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-xl font-bold text-[hsl(207,90%,54%)]">
                  {parseInt(product.price).toLocaleString()} ₽
                </p>
                <p className="text-sm text-gray-600">+ 2 000 ₽ доставка</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="quick-name">Ваше имя *</Label>
              <Input
                id="quick-name"
                type="text"
                placeholder="Введите имя"
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="quick-phone">Телефон *</Label>
              <Input
                id="quick-phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={formData.customerPhone}
                onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="quick-email">Email</Label>
              <Input
                id="quick-email"
                type="email"
                placeholder="your@email.com"
                value={formData.customerEmail}
                onChange={(e) => handleInputChange("customerEmail", e.target.value)}
              />
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <p className="text-gray-700">
                <strong>Условия заказа:</strong>
              </p>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Доставка курьером по Москве и области</li>
                <li>• Оплата после подтверждения менеджером</li>
                <li>• Мы свяжемся с вами в течение 15 минут</li>
              </ul>
            </div>
            
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Итого к оплате:</span>
              <span className="text-[hsl(207,90%,54%)]">
                {(parseFloat(product.price) + 2000).toLocaleString()} ₽
              </span>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)]"
              disabled={orderMutation.isPending}
            >
              {orderMutation.isPending ? "Оформление..." : "Оформить заказ"}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}