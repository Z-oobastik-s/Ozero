import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    service: 'fishing', // По умолчанию выбрана рыбалка
    persons: 1,
    comments: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Проверка данных перед отправкой
      if (!formData.name || !formData.phone || !formData.date) {
        throw new Error('Пожалуйста, заполните все обязательные поля');
      }

      // Адаптивный URL для API - использует Netlify Function в продакшене или локальный API в разработке
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/.netlify/functions/sendBooking' 
        : '/api/sendBooking';

      // Отправка данных в API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Произошла ошибка при отправке данных');
      }
      
      // Если все прошло успешно
      setSubmitSuccess(true);
      // Сбросить форму
      setFormData({
        name: '',
        phone: '',
        date: '',
        service: 'fishing',
        persons: 1,
        comments: ''
      });
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError('Произошла неизвестная ошибка');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Получаем сегодняшнюю дату и максимальную дату (1 год вперед) в формате YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0];

  return (
    <>
      <Head>
        <title>Бронирование | Озеро Михайлына</title>
        <meta name="description" content="Забронируйте место для рыбалки или отдыха на озере Михайлына" />
      </Head>
      
      <main className="pt-16 md:pt-24 pb-16 bg-light min-h-screen">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Бронирование</h1>
            <p className="mb-8 text-center text-gray-700">
              Заполните форму ниже, чтобы забронировать место для рыбалки или отдыха на озере Михайлына
            </p>
            
            {submitSuccess ? (
              <motion.div 
                className="bg-green-100 border border-green-400 text-green-700 px-6 py-8 rounded-xl text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold mb-4">Спасибо за вашу заявку!</h2>
                <p className="mb-6">Мы получили вашу заявку на бронирование и свяжемся с вами в ближайшее время для подтверждения.</p>
                <button 
                  onClick={() => setSubmitSuccess(false)}
                  className="btn-primary mx-auto"
                >
                  Создать новое бронирование
                </button>
              </motion.div>
            ) : (
              <motion.div 
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-primary px-6 py-4 text-white">
                  <h2 className="text-xl font-semibold">Детали бронирования</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                  {submitError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                      <span className="block sm:inline">{submitError}</span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Имя */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Ваше имя <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Иван Иванов"
                      />
                    </div>
                    
                    {/* Телефон */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Номер телефона <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="+38 (067) 123-45-67"
                      />
                    </div>
                    
                    {/* Дата */}
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Дата <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={today}
                        max={maxDate}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    {/* Услуга */}
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                        Услуга
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="fishing">Рыбалка</option>
                        <option value="accommodation">Отдых в домике</option>
                        <option value="gazebo">Беседка</option>
                        <option value="cafe">Кафе</option>
                      </select>
                    </div>
                    
                    {/* Количество людей */}
                    <div>
                      <label htmlFor="persons" className="block text-sm font-medium text-gray-700 mb-1">
                        Количество человек
                      </label>
                      <input
                        type="number"
                        id="persons"
                        name="persons"
                        value={formData.persons}
                        onChange={handleChange}
                        min="1"
                        max="20"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Комментарии */}
                  <div className="mb-6">
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                      Дополнительные комментарии
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      rows={4}
                      value={formData.comments}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Укажите дополнительные пожелания или вопросы..."
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <div className="flex items-center justify-between">
                    <Link href="/" className="text-primary hover:underline">
                      Вернуться на главную
                    </Link>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {/* Дополнительная информация */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Дополнительная информация</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>После отправки заявки мы свяжемся с вами для подтверждения бронирования</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Предоплата составляет 30% от общей стоимости</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>При отмене бронирования менее чем за 48 часов, предоплата не возвращается</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BookingPage; 