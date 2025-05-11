import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const BookingPage = () => {
  return (
    <>
      <Head>
        <title>Бронирование | Озеро Михайлына</title>
        <meta name="description" content="Забронируйте место для рыбалки или отдыха на озере Михайлына" />
      </Head>
      
      <main className="pt-16 md:pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Бронирование</h1>
          <p className="mb-8">Страница находится в разработке</p>
          
          <Link href="/" className="btn-primary">
            Вернуться на главную
          </Link>
        </div>
      </main>
    </>
  );
};

export default BookingPage; 