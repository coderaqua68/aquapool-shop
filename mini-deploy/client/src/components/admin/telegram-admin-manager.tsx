import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, MessageSquare, Clock, User, Shield } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { TelegramAdmin, InsertTelegramAdmin } from "@shared/schema";

export default function TelegramAdminManager() {
  const [isAdding, setIsAdding] = useState(false);
  const [newAdmin, setNewAdmin] = useState<InsertTelegramAdmin>({
    chatId: "",
    name: "",
    username: "",
    isActive: true,
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Получаем список администраторов
  const { data: admins = [], isLoading } = useQuery<TelegramAdmin[]>({
    queryKey: ["/api/admin/telegram-admins"],
  });

  // Мутация для добавления администратора
  const addAdminMutation = useMutation({
    mutationFn: async (admin: InsertTelegramAdmin) => {
      return await apiRequest("/api/admin/telegram-admins", "POST", admin);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/telegram-admins"] });
      setNewAdmin({
        chatId: "",
        name: "",
        username: "",
        isActive: true,
      });
      setIsAdding(false);
      toast({
        title: "Администратор добавлен",
        description: "Новый администратор успешно добавлен в систему",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось добавить администратора",
        variant: "destructive",
      });
    },
  });

  // Мутация для удаления администратора
  const deleteAdminMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/admin/telegram-admins/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/telegram-admins"] });
      toast({
        title: "Администратор удален",
        description: "Администратор успешно удален из системы",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось удалить администратора",
        variant: "destructive",
      });
    },
  });

  // Мутация для переключения статуса администратора
  const toggleAdminMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      return await apiRequest(`/api/admin/telegram-admins/${id}/toggle`, "PATCH", { isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/telegram-admins"] });
      toast({
        title: "Статус обновлен",
        description: "Статус администратора успешно изменен",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось изменить статус",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.chatId || !newAdmin.name) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните обязательные поля",
        variant: "destructive",
      });
      return;
    }
    addAdminMutation.mutate(newAdmin);
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить этого администратора?")) {
      deleteAdminMutation.mutate(id);
    }
  };

  const handleToggle = (id: number, isActive: boolean) => {
    toggleAdminMutation.mutate({ id, isActive });
  };

  const formatDate = (date: string | null) => {
    if (!date) return "Никогда";
    return new Date(date).toLocaleString("ru-RU");
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Загрузка...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Telegram Администраторы</h2>
          <p className="text-muted-foreground">
            Управление администраторами для получения уведомлений о заказах
          </p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить админа</span>
        </Button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Всего админов</p>
                <p className="text-2xl font-bold">{admins.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Активных</p>
                <p className="text-2xl font-bold">{admins.filter(a => a.isActive).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Неактивных</p>
                <p className="text-2xl font-bold">{admins.filter(a => !a.isActive).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Форма добавления */}
      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Добавить нового администратора</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="chatId">Telegram ID *</Label>
                  <Input
                    id="chatId"
                    type="text"
                    value={newAdmin.chatId}
                    onChange={(e) => setNewAdmin({ ...newAdmin, chatId: e.target.value })}
                    placeholder="123456789"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Получите ID через @userinfobot в Telegram
                  </p>
                </div>
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                    placeholder="Иван Иванов"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="username">Username Telegram (необязательно)</Label>
                <Input
                  id="username"
                  type="text"
                  value={newAdmin.username || ""}
                  onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value || undefined })}
                  placeholder="@username"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={newAdmin.isActive}
                  onCheckedChange={(checked) => setNewAdmin({ ...newAdmin, isActive: checked })}
                />
                <Label htmlFor="isActive">Активен (получает уведомления)</Label>
              </div>
              <div className="flex space-x-2">
                <Button
                  type="submit"
                  disabled={addAdminMutation.isPending}
                >
                  {addAdminMutation.isPending ? "Добавление..." : "Добавить"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                >
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Список администраторов */}
      <Card>
        <CardHeader>
          <CardTitle>Список администраторов</CardTitle>
        </CardHeader>
        <CardContent>
          {admins.length === 0 ? (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Нет администраторов. Добавьте первого администратора для получения уведомлений.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {admins.map((admin) => (
                <div
                  key={admin.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${admin.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <div>
                        <h3 className="font-semibold">{admin.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ID: {admin.chatId}
                          {admin.username && ` • @${admin.username}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Добавлен: {formatDate(admin.addedAt)}
                          {admin.lastNotified && ` • Последнее уведомление: ${formatDate(admin.lastNotified)}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={admin.isActive}
                      onCheckedChange={(checked) => handleToggle(admin.id, checked)}
                      disabled={toggleAdminMutation.isPending}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(admin.id)}
                      disabled={deleteAdminMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Справка */}
      <Card>
        <CardHeader>
          <CardTitle>Как получить Telegram ID?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">1. Откройте Telegram и найдите бота @userinfobot</p>
          <p className="text-sm">2. Отправьте боту команду /start</p>
          <p className="text-sm">3. Бот покажет ваш ID - это числовое значение вида 123456789</p>
          <p className="text-sm">4. Скопируйте этот ID и вставьте в поле "Telegram ID" выше</p>
          <p className="text-sm text-muted-foreground mt-4">
            Только активные администраторы будут получать уведомления о новых заказах и консультациях.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}