import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Facebook,
  Instagram
} from "lucide-react";

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const consultationMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/consultations", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Сообщение отправлено!",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      setFormData({ name: "", phone: "", email: "", message: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/consultations"] });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте еще раз.",
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Контакты</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь с выбором 
          и ответить на все ваши вопросы о бассейнах и оборудовании.
        </p>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Как с нами связаться</h2>
            
            <div className="space-y-6">
              {/* Phone */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[hsl(207,90%,54%)] text-white p-3 rounded-lg">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Телефон WhatsApp</h3>
                      <p className="text-[hsl(207,90%,54%)] font-semibold text-lg">
                        +7 928 566‑87‑29
                      </p>
                      <p className="text-gray-600 text-sm">Только сообщения в WhatsApp</p>
                      <div className="mt-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => window.open('https://wa.me/79285668729', '_blank')}
                        >
                          Написать в WhatsApp
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[hsl(207,90%,54%)] text-white p-3 rounded-lg">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                      <p className="text-[hsl(207,90%,54%)] font-semibold">
                        aquapoolshop@yandex.ru
                      </p>
                      <p className="text-gray-600 text-sm">Отвечаем в течение 1 часа</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[hsl(207,90%,54%)] text-white p-3 rounded-lg">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Наш склад</h3>
                      <p className="text-gray-700 font-medium">
                        г. Химки
                      </p>
                      <p className="text-gray-600 text-sm">Работаем только с доставкой</p>
                      <div className="mt-2 p-2 bg-orange-50 rounded-md">
                        <p className="text-orange-700 text-xs">
                          ⚠️ Самовывоз временно недоступен
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Working Hours */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[hsl(207,90%,54%)] text-white p-3 rounded-lg">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Режим работы</h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-700">Понедельник - Воскресенье: 9:00 - 21:00</p>
                        <p className="text-gray-600">Без выходных и праздников</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Мы в социальных сетях</h3>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center space-x-2 border-[hsl(207,90%,54%)] text-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,54%)] hover:text-white"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Telegram</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center space-x-2 border-[hsl(207,90%,54%)] text-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,54%)] hover:text-white"
                onClick={() => window.open('https://wa.me/79001234567', '_blank')}
              >
                <Phone className="w-5 h-5" />
                <span>WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Напишите нам</CardTitle>
              <p className="text-gray-600">
                Оставьте сообщение, и мы свяжемся с вами в ближайшее время
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name">Ваше имя *</Label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="Введите имя"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Телефон *</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="contact-message">Сообщение *</Label>
                  <Textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Опишите ваш вопрос или что вас интересует..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)] text-white"
                  size="lg"
                  disabled={consultationMutation.isPending}
                >
                  {consultationMutation.isPending ? (
                    "Отправка..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Отправить сообщение
                    </>
                  )}
                </Button>

                <p className="text-sm text-gray-500">
                  * Обязательные поля для заполнения
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Additional Information */}
      <section className="pool-gradient rounded-xl p-8 md:p-12 text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Быстрые способы связи</h2>
          <p className="text-xl opacity-90">
            Выберите наиболее удобный для вас способ связи
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl mb-4">
              <Phone className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Написать в WhatsApp</h3>
            <p className="opacity-90 mb-4">
              Получите быструю консультацию в мессенджере
            </p>
            <Button
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-[hsl(207,90%,54%)]"
              onClick={() => window.open('https://wa.me/79285668729', '_blank')}
            >
              +7 928 566‑87‑29
            </Button>
          </div>

          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl mb-4">
              <MessageCircle className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Написать в Telegram</h3>
            <p className="opacity-90 mb-4">
              Быстрые ответы на ваши вопросы в мессенджере
            </p>
            <Button
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-[hsl(207,90%,54%)]"
              onClick={() => window.open('https://t.me/aquapool_manager', '_blank')}
            >
              @aquapool_manager
            </Button>
          </div>

          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl mb-4">
              <Mail className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Написать на email</h3>
            <p className="opacity-90 mb-4">
              Отправьте подробный запрос на электронную почту
            </p>
            <Button
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-[hsl(207,90%,54%)]"
              onClick={() => window.open('mailto:info@aquapool.ru', '_blank')}
            >aquapoolshop@yandex.ru</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
