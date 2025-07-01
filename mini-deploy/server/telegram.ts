import TelegramBot from 'node-telegram-bot-api';
import { storage } from './storage';

// Конфигурация бота
const BOT_TOKEN = '7550930591:AAHZHqOnklv8EFkID5XaTkgzCrGwhY3Ex7M';

// Создаем экземпляр бота
const bot = new TelegramBot(BOT_TOKEN, { polling: false });

// Функция для получения активных администраторов из базы данных
async function getActiveAdminChatIds(): Promise<string[]> {
  try {
    const admins = await storage.getTelegramAdmins();
    return admins
      .filter(admin => admin.isActive)
      .map(admin => admin.chatId);
  } catch (error) {
    console.error('Ошибка получения администраторов из БД:', error);
    // Fallback на переменную окружения, если БД недоступна
    const ADMIN_CHAT_IDS = process.env.TELEGRAM_ADMIN_CHAT_IDS || '5696137293';
    return ADMIN_CHAT_IDS.split(',').map(id => id.trim()).filter(Boolean);
  }
}

// Функция для отправки сообщения всем администраторам
async function sendToAllAdmins(message: string, options?: TelegramBot.SendMessageOptions) {
  const adminChatIds = await getActiveAdminChatIds();
  const results = [];
  
  for (const chatId of adminChatIds) {
    try {
      await bot.sendMessage(chatId, message, options);
      results.push({ chatId, success: true });
      console.log(`Сообщение успешно отправлено в чат ${chatId}`);
      
      // Обновляем время последнего уведомления в базе данных
      await storage.updateLastNotified(chatId);
    } catch (error) {
      console.error(`Ошибка отправки сообщения в чат ${chatId}:`, error);
      results.push({ chatId, success: false, error });
    }
  }
  
  return results;
}

// Функция для отправки заявки на обратную связь
export async function sendConsultationRequest(data: {
  name: string;
  phone: string;
  message: string;
}) {
  try {
    const messageText = `
🔔 <b>Новая заявка на обратную связь</b>

👤 <b>Имя:</b> ${data.name}
📞 <b>Телефон:</b> ${data.phone}
💬 <b>Сообщение:</b> ${data.message}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })} МСК
    `;

    await sendToAllAdmins(messageText, {
      parse_mode: 'HTML'
    });

    return { success: true };
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    return { success: false, error: error };
  }
}

// Функция для отправки информации о заказе
export async function sendOrderNotification(orderData: {
  orderId: number;
  customerName: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  items: Array<{
    name: string;
    sku: string;
    quantity: number;
    price: string;
  }>;
  totalAmount: string | number;
  paymentMethod: string;
  deliveryMethod: string;
}) {
  try {
    // Формируем список товаров
    const itemsList = orderData.items.map((item, index) => 
      `${index + 1}. <b>${item.name}</b>\n   📦 Артикул: ${item.sku}\n   📊 Количество: ${item.quantity} шт.\n   💰 Цена: ${item.price} ₽`
    ).join('\n\n');

    const messageText = `
🛒 <b>НОВЫЙ ЗАКАЗ #${orderData.orderId}</b>

👤 <b>Покупатель:</b>
• Имя: ${orderData.customerName}
• Телефон: ${orderData.phone}
• Email: ${orderData.email}

📦 <b>Товары:</b>
${itemsList}

💵 <b>Общая сумма:</b> ${orderData.totalAmount} ₽

🚚 <b>Доставка:</b> ${orderData.deliveryMethod}
📍 <b>Адрес:</b> ${orderData.deliveryAddress}

💳 <b>Оплата:</b> ${orderData.paymentMethod}

⏰ <b>Время заказа:</b> ${new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })} МСК

📞 <b>Действие:</b> Свяжитесь с клиентом для подтверждения заказа
    `;

    await sendToAllAdmins(messageText, {
      parse_mode: 'HTML'
    });

    return { success: true };
  } catch (error) {
    console.error('Ошибка отправки заказа в Telegram:', error);
    return { success: false, error: error };
  }
}

// Функция для тестирования соединения с ботом
export async function testTelegramBot() {
  try {
    const me = await bot.getMe();
    const adminChatIds = await getActiveAdminChatIds();
    console.log('Telegram бот успешно подключен:', me.username);
    console.log(`Настроено ${adminChatIds.length} получателей уведомлений:`, adminChatIds.join(', '));
    
    return { 
      success: true, 
      botInfo: me,
      adminChatIds: adminChatIds,
      adminCount: adminChatIds.length
    };
  } catch (error) {
    console.error('Ошибка подключения к Telegram боту:', error);
    return { success: false, error: error };
  }
}

// Функция для получения списка администраторов
export async function getAdminChatIds() {
  const adminChatIds = await getActiveAdminChatIds();
  return {
    chatIds: adminChatIds,
    count: adminChatIds.length,
    source: 'database'
  };
}