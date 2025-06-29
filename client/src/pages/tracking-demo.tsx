import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Code, Settings, CheckCircle } from "lucide-react";

interface TrackingSetting {
  id: number;
  key: string;
  value: string | null;
  description: string | null;
  category: string;
  isActive: boolean;
}

export default function TrackingDemo() {
  const { data: settings = [], isLoading } = useQuery<TrackingSetting[]>({
    queryKey: ["/api/tracking-settings"],
  });

  const getTrackingTypeTitle = (key: string) => {
    const titles = {
      'yandex_metrica': 'Яндекс.Метрика',
      'google_analytics': 'Google Analytics',
      'google_tag_manager': 'Google Tag Manager',
      'facebook_pixel': 'Facebook Pixel',
      'yandex_direct_pixel': 'Яндекс.Директ',
      'vk_pixel': 'ВКонтакте Pixel',
      'custom_tracking': 'Пользовательский код'
    };
    return titles[key] || key;
  };

  const getTrackingTypeDescription = (key: string) => {
    const descriptions = {
      'yandex_metrica': 'Анализ поведения пользователей, отчеты о конверсиях',
      'google_analytics': 'Статистика посещений и поведения пользователей',
      'google_tag_manager': 'Управление всеми тегами через единый интерфейс',
      'facebook_pixel': 'Ретаргетинг и отслеживание конверсий в Facebook',
      'yandex_direct_pixel': 'Отслеживание эффективности рекламы Яндекс.Директ',
      'vk_pixel': 'Ретаргетинг и аналитика ВКонтакте',
      'custom_tracking': 'Произвольные коды отслеживания'
    };
    return descriptions[key] || 'Настраиваемое отслеживание';
  };

  const checkIfCodeInjected = (key: string) => {
    const scriptIds = {
      'yandex_metrica': 'yandex-metrica',
      'google_analytics': 'google-analytics',
      'google_tag_manager': 'google-tag-manager',
      'facebook_pixel': 'facebook-pixel',
      'yandex_direct_pixel': 'yandex-direct-pixel',
      'vk_pixel': 'vk-pixel'
    };
    
    const scriptId = scriptIds[key];
    return scriptId ? !!document.getElementById(scriptId) : false;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Загрузка настроек отслеживания...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Демо: Система рекламных пикселей
          </h1>
          <p className="text-lg text-gray-600">
            Проверьте, как настройки из админ-панели внедряются на сайт
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Статус системы отслеживания
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {settings.length}
                  </div>
                  <div className="text-sm text-gray-600">Всего настроек</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {settings.filter(s => s.isActive).length}
                  </div>
                  <div className="text-sm text-gray-600">Активных</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {settings.filter(s => s.isActive && checkIfCodeInjected(s.key)).length}
                  </div>
                  <div className="text-sm text-gray-600">Внедрено на сайт</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Настроенные трекинг-коды
              </CardTitle>
            </CardHeader>
            <CardContent>
              {settings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Пока нет настроенных кодов отслеживания</p>
                  <p className="text-sm">
                    Перейдите в админ-панель (/admin) → вкладка "Настройки" и добавьте ваши рекламные пиксели
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {settings.map((setting) => {
                    const isInjected = checkIfCodeInjected(setting.key);
                    return (
                      <div 
                        key={setting.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">
                              {getTrackingTypeTitle(setting.key)}
                            </h3>
                            <Badge 
                              variant={setting.isActive ? "default" : "secondary"}
                            >
                              {setting.isActive ? "Активен" : "Отключен"}
                            </Badge>
                            {setting.isActive && isInjected && (
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Внедрен
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {getTrackingTypeDescription(setting.key)}
                          </p>
                          {setting.value && (
                            <div className="text-xs font-mono bg-gray-100 p-2 rounded">
                              ID: {setting.value}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Как использовать систему</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">1. Добавление кодов</h4>
                  <p className="text-sm text-gray-600">
                    В админ-панели (/admin) перейдите на вкладку "Настройки" и добавьте ваши рекламные пиксели
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">2. Автоматическое внедрение</h4>
                  <p className="text-sm text-gray-600">
                    Коды автоматически добавляются на все страницы сайта при загрузке
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">3. Поддерживаемые системы</h4>
                  <p className="text-sm text-gray-600">
                    Яндекс.Метрика, Google Analytics, Facebook Pixel, Яндекс.Директ и другие
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">4. Управление статусом</h4>
                  <p className="text-sm text-gray-600">
                    Включайте и отключайте коды без удаления настроек
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}