import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface LoginForm {
  email: string;
  password: string;
}

const AdminPanel: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in production this would call a real API
    if (form.email === 'admin@ozero-mikhailyna.com' && form.password === 'admin123') {
      setIsLoggedIn(true);
      setError(null);
      // In production, store JWT in localStorage or HttpOnly cookies
      localStorage.setItem('adminToken', 'mock-jwt-token');
    } else {
      setError('Неверный email или пароль');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminToken');
  };

  // Simple admin dashboard UI
  if (isLoggedIn) {
    return (
      <>
        <Head>
          <title>Административная панель | Озеро Михайлына</title>
        </Head>
        <div className="bg-gray-100 min-h-screen">
          <header className="bg-white shadow">
            <div className="container-custom py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-primary">Административная панель</h1>
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
              >
                Выйти
              </button>
            </div>
          </header>
          
          <main className="container-custom py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Content Management */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Управление контентом</h2>
                <ul className="space-y-2">
                  <li>
                    <button className="text-primary hover:underline">Редактировать тексты</button>
                  </li>
                  <li>
                    <button className="text-primary hover:underline">Управление новостями</button>
                  </li>
                  <li>
                    <button className="text-primary hover:underline">Загрузка изображений</button>
                  </li>
                  <li>
                    <button className="text-primary hover:underline">Цены и правила</button>
                  </li>
                </ul>
              </div>
              
              {/* User Management */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Пользователи</h2>
                <ul className="space-y-2">
                  <li>
                    <button className="text-primary hover:underline">Управление пользователями</button>
                  </li>
                  <li>
                    <button className="text-primary hover:underline">Роли и разрешения</button>
                  </li>
                  <li>
                    <button className="text-primary hover:underline">Активные сессии</button>
                  </li>
                </ul>
              </div>
              
              {/* Analytics */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Аналитика</h2>
                <ul className="space-y-2">
                  <li>
                    <button className="text-primary hover:underline">Статистика посещений</button>
                  </li>
                  <li>
                    <button className="text-primary hover:underline">Популярные страницы</button>
                  </li>
                  <li>
                    <button className="text-primary hover:underline">Отчеты</button>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Последние действия</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Действие
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Пользователь
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Дата
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Обновление цен на рыбалку</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">admin@ozero-mikhailyna.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">10.04.2025 14:30</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Добавление новой новости</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">editor@ozero-mikhailyna.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">09.04.2025 11:15</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Загрузка новых фотографий</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">content@ozero-mikhailyna.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">08.04.2025 16:45</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  // Login form UI
  return (
    <>
      <Head>
        <title>Вход в админ-панель | Озеро Михайлына</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Вход в админ-панель
            </h2>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Пароль
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Пароль"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminPanel; 