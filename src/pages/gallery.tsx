import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const GalleryPage = () => {
  return (
    <>
      <Head>
        <title>Фотогалерея | Озеро Михайлына</title>
        <meta name="description" content="Фотографии озера Михайлына, мест отдыха и рыбалки" />
      </Head>
      
      <main className="pt-16 md:pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Фотогалерея</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="aspect-square relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-blue-300">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                  Фото {item}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="mb-8">Полная галерея находится в разработке</p>
            <Link href="/" className="btn-primary">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default GalleryPage; 