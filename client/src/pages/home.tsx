import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/product/product-card";
import { Truck, Shield, Headphones, Wrench } from "lucide-react";
import type { Product, Category } from "@shared/schema";

interface CategoryWithStats {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  productCount: number;
  minPrice: number;
}

export default function Home() {
  const { data: popularProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products/popular"],
  });

  // Главные категории с изображениями
  const staticCategories = [
    {
      id: 1,
      name: "Каркасные бассейны",
      slug: "karkasnye-basseyny",
      imageUrl: "https://intex-basseiny-krasnodar.ru/upload/iblock/0b1/s4syl35quv4xuyphoxfg3f0v64yd6msv.jpg"
    },
    {
      id: 2,
      name: "Морозоустойчивые бассейны",
      slug: "morozoustojchivye-basseyny",
      imageUrl: "https://intex-bassein.ru/upload/iblock/66a/j1psn0j08u4cf15jvvx123oewb70tbh2.png"
    },
    {
      id: 3,
      name: "Надувные бассейны",
      slug: "naduvnye-basseyny",
      imageUrl: "https://cdn1.ozone.ru/s3/multimedia-f/6364934463.jpg"
    },
    {
      id: 4,
      name: "Джакузи INTEX",
      slug: "dzhakuzi-intex",
      imageUrl: "https://intexopt.ru/wa-data/public/shop/products/60/06/660/images/636/636.970.jpg"
    },
    {
      id: 5,
      name: "Джакузи Bestway",
      slug: "dzhakuzi-bestway",
      imageUrl: "https://avatars.mds.yandex.net/get-mpic/4303532/img_id5353389577744090768.jpeg/orig"
    },
    {
      id: 6,
      name: "Запасные чаши",
      slug: "zapasnye-chashi",
      imageUrl: "https://egorevsk.intexregion.ru/files/products/blue-mozaik.800x600w.jpg?8a38fb231ebff153539a039f63d79fc7"
    }
  ];

  // Загружаем статистику для каждой категории
  const categoryQueries = staticCategories.map(category =>
    useQuery<{ count: number; minPrice: number }>({
      queryKey: [`/api/categories/${category.slug}/stats`],
      retry: false
    })
  );

  // Объединяем статическую информацию с данными из API
  const categories: CategoryWithStats[] = staticCategories.map((category, index) => {
    const stats = categoryQueries[index].data;
    return {
      ...category,
      productCount: stats?.count || 0,
      minPrice: stats?.minPrice || 0
    };
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div
          className="h-96 md:h-[500px] bg-cover bg-center relative"
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3), rgba(14, 165, 233, 0.3)), url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Создайте свой идеальный бассейн
              </h2>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                Широкий выбор каркасных и композитных бассейнов с доставкой по всей России
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link href="/catalog">
                  <Button size="lg" className="bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)] text-white px-8 py-4">
                    Смотреть каталог
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 px-8 py-4"
                >
                  Получить консультацию
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Banner */}
        <div className="pool-gradient text-white py-3">
          <div className="container mx-auto px-4 text-center">
            <p className="font-medium">
              🔥 Скидка до 25% на все бассейны до конца месяца! Бесплатная доставка от 50 000 ₽
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Категории товаров
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Всё необходимое для создания и обслуживания вашего бассейна
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/catalog/${category.slug}`}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      src={category.imageUrl || "https://images.unsplash.com/photo-1544551763-46a013bb70d5"}
                      alt={category.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">
                        {category.minPrice > 0 ? `От ${category.minPrice.toLocaleString()} ₽` : "от 1 500 ₽"} • {category.productCount > 0 ? `${category.productCount} товаров` : "товары"}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Популярные товары
            </h2>
            <p className="text-xl text-gray-600">
              Самые покупаемые товары в этом месяце
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/catalog">
              <Button
                variant="outline"
                size="lg"
                className="border-[hsl(207,90%,54%)] text-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,54%)] hover:text-white px-8 py-3"
              >
                Смотреть все товары
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наши преимущества
            </h2>
            <p className="text-xl text-gray-600">Почему выбирают AquaPool</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="pool-gradient-light p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Truck className="text-white text-2xl w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">
                Доставка по Москве в день заказа. По России — через ТК за 2-5 дней
              </p>
            </div>

            <div className="text-center group">
              <div className="pool-gradient-light p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="text-white text-2xl w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Гарантия качества</h3>
              <p className="text-gray-600">
                Официальная гарантия на все товары от 1 до 3 лет
              </p>
            </div>

            <div className="text-center group">
              <div className="pool-gradient-light p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Headphones className="text-white text-2xl w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Поддержка 24/7</h3>
              <p className="text-gray-600">
                Консультации по выбору и установке бассейнов в любое время
              </p>
            </div>

            <div className="text-center group">
              <div className="pool-gradient-light p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wrench className="text-white text-2xl w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Профессиональный монтаж</h3>
              <p className="text-gray-600">
                Услуги по установке и обслуживанию бассейнов опытными мастерами
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 pool-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">О компании AquaPool</h2>
              <p className="text-xl mb-6">
                Мы специализируемся на продаже качественных бассейнов и сопутствующего
                оборудования уже более 10 лет.
              </p>
              <p className="text-lg mb-8">
                Наша миссия — сделать отдых у воды доступным для каждой семьи. Мы предлагаем
                только проверенные товары от ведущих производителей и гарантируем высокое
                качество обслуживания.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">15 000+</div>
                  <div className="text-sm">Довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">10</div>
                  <div className="text-sm">Лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-sm">Товаров в каталоге</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">85</div>
                  <div className="text-sm">Регионов доставки</div>
                </div>
              </div>

              <Link href="/about">
                <Button className="bg-white text-[hsl(207,90%,54%)] hover:bg-gray-100 px-8 py-3">
                  Подробнее о нас
                </Button>
              </Link>
            </div>

            <div className="relative">
              <img
                src="https://pixabay.com/get/gea4a12bd3c6dd70d6c185eaad46df15df7b4b786ceb5814722863f8807a9951a85eee1063824a928bd8ad66de12fb8e5b1c74ee4cd76ab543b58b9da6afa62cf_1280.jpg"
                alt="Семья у бассейна"
                className="rounded-xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-2">
                    ⭐⭐⭐⭐⭐
                  </div>
                  <span className="font-bold text-gray-900">4.9/5</span>
                </div>
                <p className="text-sm text-gray-600">
                  "Отличное качество и быстрая доставка!" - Анна М.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Нужна консультация?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Наши эксперты помогут подобрать идеальный бассейн для вашего участка
            </p>

            <Card className="p-8 md:p-12">
              <CardContent>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input id="name" type="text" placeholder="Введите имя" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="message">Ваш вопрос (необязательно)</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Расскажите о ваших потребностях..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,89%,40%)] text-white px-8 py-4"
                    >
                      Получить консультацию
                    </Button>
                    <p className="text-sm text-gray-500 mt-3">
                      Нажимая кнопку, вы соглашаетесь с{" "}
                      <a href="#" className="text-[hsl(207,90%,54%)] hover:underline">
                        политикой конфиденциальности
                      </a>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="bg-[hsl(207,90%,54%)] text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  📞
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Позвоните нам</h3>
                <p className="text-[hsl(207,90%,54%)] font-semibold">8 (800) 123-45-67</p>
              </div>

              <div className="text-center">
                <div className="bg-[hsl(207,90%,54%)] text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  ✈️
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Напишите в Telegram</h3>
                <p className="text-[hsl(207,90%,54%)] font-semibold">@aquapool_bot</p>
              </div>

              <div className="text-center">
                <div className="bg-[hsl(207,90%,54%)] text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  ✉️
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Отправьте email</h3>
                <p className="text-[hsl(207,90%,54%)] font-semibold">info@aquapool.ru</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
