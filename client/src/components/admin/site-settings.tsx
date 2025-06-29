import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Save, Trash2, Eye, EyeOff } from "lucide-react";

interface SiteSetting {
  id: number;
  key: string;
  value: string | null;
  description: string | null;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SettingFormData {
  key: string;
  value: string;
  description: string;
  category: string;
  isActive: boolean;
}

export default function SiteSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingSetting, setEditingSetting] = useState<SiteSetting | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<SettingFormData>({
    key: "",
    value: "",
    description: "",
    category: "tracking",
    isActive: true,
  });

  const { data: settings = [] } = useQuery<SiteSetting[]>({
    queryKey: ["/api/admin/settings"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: SettingFormData) => {
      return await apiRequest("/api/admin/settings", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      setIsCreating(false);
      setFormData({
        key: "",
        value: "",
        description: "",
        category: "tracking",
        isActive: true,
      });
      toast({
        title: "Настройка создана",
        description: "Новая настройка успешно добавлена",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось создать настройку",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: SettingFormData }) => {
      return await apiRequest(`/api/admin/settings/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      setEditingSetting(null);
      toast({
        title: "Настройка обновлена",
        description: "Изменения успешно сохранены",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить настройку",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/admin/settings/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      toast({
        title: "Настройка удалена",
        description: "Настройка успешно удалена",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить настройку",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSetting) {
      updateMutation.mutate({ id: editingSetting.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const startEdit = (setting: SiteSetting) => {
    setEditingSetting(setting);
    setFormData({
      key: setting.key,
      value: setting.value || "",
      description: setting.description || "",
      category: setting.category,
      isActive: setting.isActive,
    });
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingSetting(null);
    setFormData({
      key: "",
      value: "",
      description: "",
      category: "tracking",
      isActive: true,
    });
  };

  const cancelEdit = () => {
    setEditingSetting(null);
    setIsCreating(false);
    setFormData({
      key: "",
      value: "",
      description: "",
      category: "tracking",
      isActive: true,
    });
  };

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, SiteSetting[]>);

  const presetSettings = [
    {
      key: "yandex_metrica_id",
      description: "ID счетчика Яндекс.Метрики",
      placeholder: "Например: 12345678"
    },
    {
      key: "google_analytics_id",
      description: "ID Google Analytics",
      placeholder: "Например: G-XXXXXXXXXX"
    },
    {
      key: "yandex_direct_pixel",
      description: "Код пикселя Яндекс.Директ",
      placeholder: "Вставьте полный код пикселя"
    },
    {
      key: "facebook_pixel_id",
      description: "ID Facebook Pixel",
      placeholder: "Например: 123456789012345"
    },
    {
      key: "custom_head_code",
      description: "Дополнительный код в <head>",
      placeholder: "HTML код для вставки в head"
    },
    {
      key: "custom_body_code",
      description: "Дополнительный код в <body>",
      placeholder: "HTML код для вставки в body"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Настройки сайта</h2>
        <Button onClick={startCreate} disabled={isCreating || !!editingSetting}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить настройку
        </Button>
      </div>

      <Tabs defaultValue="tracking" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tracking">Отслеживание</TabsTrigger>
          <TabsTrigger value="general">Общие</TabsTrigger>
          <TabsTrigger value="custom">Пользовательские</TabsTrigger>
        </TabsList>

        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Коды отслеживания и аналитики</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Здесь вы можете добавить коды отслеживания для Яндекс.Метрики, Google Analytics, 
                пиксели рекламных систем и другие скрипты аналитики.
              </p>
              
              {/* Быстрые пресеты */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {presetSettings.map((preset) => (
                  <Card key={preset.key} className="p-4">
                    <h4 className="font-medium mb-2">{preset.description}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFormData({
                          key: preset.key,
                          value: "",
                          description: preset.description,
                          category: "tracking",
                          isActive: true,
                        });
                        setIsCreating(true);
                      }}
                    >
                      Добавить
                    </Button>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                {groupedSettings.tracking?.map((setting) => (
                  <Card key={setting.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{setting.key}</h4>
                            <Badge variant={setting.isActive ? "default" : "secondary"}>
                              {setting.isActive ? "Активно" : "Отключено"}
                            </Badge>
                          </div>
                          {setting.description && (
                            <p className="text-sm text-gray-600 mb-2">{setting.description}</p>
                          )}
                          <div className="bg-gray-50 p-2 rounded text-xs font-mono max-h-20 overflow-y-auto">
                            {setting.value || "Значение не задано"}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEdit(setting)}
                          >
                            Изменить
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteMutation.mutate(setting.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Общие настройки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groupedSettings.general?.map((setting) => (
                  <Card key={setting.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{setting.key}</h4>
                            <Badge variant={setting.isActive ? "default" : "secondary"}>
                              {setting.isActive ? "Активно" : "Отключено"}
                            </Badge>
                          </div>
                          {setting.description && (
                            <p className="text-sm text-gray-600 mb-2">{setting.description}</p>
                          )}
                          <div className="bg-gray-50 p-2 rounded text-sm">
                            {setting.value || "Значение не задано"}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEdit(setting)}
                          >
                            Изменить
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteMutation.mutate(setting.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Пользовательские настройки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groupedSettings.custom?.map((setting) => (
                  <Card key={setting.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{setting.key}</h4>
                            <Badge variant={setting.isActive ? "default" : "secondary"}>
                              {setting.isActive ? "Активно" : "Отключено"}
                            </Badge>
                          </div>
                          {setting.description && (
                            <p className="text-sm text-gray-600 mb-2">{setting.description}</p>
                          )}
                          <div className="bg-gray-50 p-2 rounded text-sm">
                            {setting.value || "Значение не задано"}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEdit(setting)}
                          >
                            Изменить
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteMutation.mutate(setting.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Форма создания/редактирования */}
      {(isCreating || editingSetting) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingSetting ? "Редактировать настройку" : "Добавить настройку"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="key">Ключ настройки *</Label>
                  <Input
                    id="key"
                    value={formData.key}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                    placeholder="например: yandex_metrica_id"
                    required
                    disabled={!!editingSetting}
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Категория</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="tracking">Отслеживание</option>
                    <option value="general">Общие</option>
                    <option value="custom">Пользовательские</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Описание</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Краткое описание настройки"
                />
              </div>

              <div>
                <Label htmlFor="value">Значение</Label>
                <Textarea
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="Введите значение (код, ID или другие данные)"
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <Label htmlFor="isActive">Активировать настройку</Label>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingSetting ? "Сохранить изменения" : "Создать настройку"}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}