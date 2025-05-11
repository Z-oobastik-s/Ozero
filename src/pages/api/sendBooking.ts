import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

// Токен бота Telegram и ID чата
const TELEGRAM_BOT_TOKEN = '6578981613:AAGAQIS_-PEkRRxum0sR6guPN8jmRuE21pM';
const TELEGRAM_CHAT_ID = '@ozerovaco'; // ID чата, куда будут приходить сообщения

// Переводы названий услуг на русский
const serviceTranslations: Record<string, string> = {
  'fishing': 'Рыбалка',
  'accommodation': 'Отдых в домике',
  'gazebo': 'Беседка',
  'cafe': 'Кафе'
};

// Функция форматирования даты из YYYY-MM-DD в DD.MM.YYYY
const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  return `${day}.${month}.${year}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Получаем данные из запроса
    const { name, phone, date, service, persons, comments } = req.body;

    // Проверяем обязательные поля
    if (!name || !phone || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Форматируем сообщение для Telegram
    const formattedDate = formatDate(date);
    const serviceName = serviceTranslations[service] || service;

    let message = `🔔 <b>Новое бронирование на озере Михайлына</b>\n\n`;
    message += `👤 <b>Имя:</b> ${name}\n`;
    message += `📱 <b>Телефон:</b> ${phone}\n`;
    message += `📅 <b>Дата:</b> ${formattedDate}\n`;
    message += `🧩 <b>Услуга:</b> ${serviceName}\n`;
    message += `👥 <b>Количество человек:</b> ${persons}\n`;
    
    if (comments) {
      message += `\n📝 <b>Комментарии:</b> ${comments}\n`;
    }

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    const telegramData = await telegramResponse.json();

    // Проверяем успешность отправки в Telegram
    if (!telegramData.ok) {
      console.error('Telegram error:', telegramData);
      return res.status(500).json({ message: 'Failed to send message to Telegram' });
    }

    // Отправляем успешный ответ
    return res.status(200).json({ message: 'Booking request sent successfully' });
  } catch (error) {
    console.error('Error sending booking request:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 