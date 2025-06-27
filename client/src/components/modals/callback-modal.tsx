import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Phone, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface CallbackModalState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

let callbackModalState: CallbackModalState = {
  isOpen: false,
  setIsOpen: () => {},
};

export function openCallbackModal() {
  callbackModalState.setIsOpen(true);
}

export default function CallbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Update global state reference
  callbackModalState = { isOpen, setIsOpen };

  const consultationMutation = useMutation({
    mutationFn: async (data: { name: string; phone: string }) => {
      const response = await apiRequest("POST", "/api/consultations", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в течение 15 минут",
      });
      setFormData({ name: "", phone: "" });
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/consultations"] });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте еще раз.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      consultationMutation.mutate(formData);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-[hsl(207,90%,54%)]" />
              Обратный звонок
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Ваше имя</Label>
              <Input
                id="name"
                type="text"
                placeholder="Введите имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)]"
              disabled={consultationMutation.isPending}
            >
              {consultationMutation.isPending ? "Отправка..." : "Заказать звонок"}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Мы перезвоним в течение 15 минут
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-40"
        size="lg"
      >
        <Phone className="w-6 h-6" />
      </Button>
    </>
  );
}
