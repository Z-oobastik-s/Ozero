import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const AdminPanel: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // В реальном приложении здесь был бы API-запрос
      setTimeout(() => {
        if (username === 'admin' && password === 'password') {
          setIsLoggedIn(true);
        } else {
          setError('Неверное имя пользователя или пароль');
        }
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Произошла ошибка при входе');
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-4">Статистика</h2>
                <p>Эта страница находится в разработке</p>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  // Login form
  return (
    <>
      <Head>
        <title>Вход в админ-панель | Озеро Михайлына</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Вход в админ-панель
            </h1>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}
            
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Имя пользователя
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Имя пользователя"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {isLoading ? 'Загрузка...' : 'Войти'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminPanel; 