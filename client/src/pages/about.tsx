import { Card, CardContent } from "@/components/ui/card";
import { Truck, Shield, Headphones, ShoppingCart, Users, Award } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">О компании AquaPool</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Мы специализируемся на продаже качественных бассейнов и сопутствующего оборудования уже более 10 лет. 
          Наша миссия — сделать отдых у воды доступным для каждой семьи.
        </p>
      </section>

      {/* Company Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardContent className="text-center p-6">
            <div className="text-3xl font-bold text-[hsl(207,90%,54%)] mb-2">15,000+</div>
            <div className="text-gray-600">Довольных клиентов</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-6">
            <div className="text-3xl font-bold text-[hsl(207,90%,54%)] mb-2">10</div>
            <div className="text-gray-600">Лет опыта</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-6">
            <div className="text-3xl font-bold text-[hsl(207,90%,54%)] mb-2">500+</div>
            <div className="text-gray-600">Товаров в каталоге</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-6">
            <div className="text-3xl font-bold text-[hsl(207,90%,54%)] mb-2">85</div>
            <div className="text-gray-600">Регионов доставки</div>
          </CardContent>
        </Card>
      </section>

      {/* Our Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша история</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Компания AquaPool была основана в 2014 году с простой идеей — сделать качественные 
              бассейны доступными для каждой семьи. Мы начинали как интернет-магазин в Химках, 
              но благодаря доверию наших клиентов выросли в крупнейшего онлайн-поставщика бассейнов 
              и оборудования в России.
            </p>
            <p>
              Сегодня мы предлагаем широкий ассортимент товаров от ведущих мировых производителей, 
              обеспечиваем быструю доставку по всей России и предоставляем профессиональные 
              консультации по выбору оборудования.
            </p>
            <p>
              Наша команда состоит из опытных специалистов, которые знают все о бассейнах и 
              готовы помочь вам создать идеальное место для отдыха.
            </p>
          </div>
        </div>
        <div>
          <div className="bg-gray-50 rounded-lg shadow-lg p-8 flex items-center justify-center">
            <img
              src="/attached_assets/ChatGPT Image 29 июн. 2025 г., 16_45_15_1751204798609.png"
              alt="Логотип AquaPool"
              className="w-80 h-auto"
            />
          </div>  
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Наши ценности</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-[hsl(207,90%,54%)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Клиентоориентированность</h3>
              <p className="text-gray-600">
                Каждый клиент важен для нас. Мы всегда стремимся превзойти ожидания и 
                обеспечить лучший сервис.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-[hsl(207,90%,54%)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Качество</h3>
              <p className="text-gray-600">
                Мы работаем только с проверенными производителями и гарантируем 
                высокое качество всех товаров.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-[hsl(207,90%,54%)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Надежность</h3>
              <p className="text-gray-600">
                Мы ценим доверие наших клиентов и всегда выполняем свои обязательства 
                в полном объеме.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Advantages */}
      <section className="pool-gradient rounded-xl p-8 md:p-12 text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Почему выбирают нас</h2>
          <p className="text-xl opacity-90">
            Мы предоставляем полный комплекс услуг для создания идеального места отдыха
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <Truck className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Доставка по России</h3>
            <p className="text-sm opacity-90">
              Быстрая доставка по всей России через надежные транспортные компании
            </p>
          </div>
          
          <div className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Гарантия качества</h3>
            <p className="text-sm opacity-90">
              Официальная гарантия на все товары от 1 до 3 лет
            </p>
          </div>
          
          <div className="text-center">
            <Headphones className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Консультации экспертов</h3>
            <p className="text-sm opacity-90">
              Помощь в выборе подходящего бассейна и оборудования
            </p>
          </div>
          
          <div className="text-center">
            <ShoppingCart className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Удобные покупки</h3>
            <p className="text-sm opacity-90">
              Простое оформление заказов онлайн и удобные способы оплаты
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
