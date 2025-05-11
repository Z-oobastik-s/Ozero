import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ServicePage = () => {
  const router = useRouter();
  const { service } = router.query;
  
  // Базовая информация об услугах
  const servicesInfo: Record<string, { title: string, description: string, icon: string }> = {
    'fishing': {
      title: 'Рыбалка',
      description: 'Богатый улов и всё необходимое для комфортной рыбалки. На озере Михайлына водятся карп, амур, щука и сом.',
      icon: '🎣'
    },
    'accommodation': {
      title: 'Отдых',
      description: 'Уютные домики и беседки для вашего комфорта. У нас есть всё необходимое для приятного времяпровождения на природе.',
      icon: '🏡'
    },
    'cafe': {
      title: 'Кафе',
      description: 'Вкусные блюда из свежей рыбы и другие деликатесы. Приятная атмосфера и отличное обслуживание.',
      icon: '🍲'
    }
  };
  
  // Получаем информацию о текущей услуге
  const currentService = typeof service === 'string' ? servicesInfo[service] : null;
  
  if (!currentService) {
    return (
      <main className="pt-16 md:pt-24 pb-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Услуга не найдена</h1>
          <p className="mb-8">Запрошенная услуга не существует</p>
          
          <Link href="/" className="btn-primary">
            Вернуться на главную
          </Link>
        </div>
      </main>
    );
  }
  
  return (
    <>
      <Head>
        <title>{currentService.title} | Озеро Михайлына</title>
        <meta name="description" content={currentService.description} />
      </Head>
      
      <main className="pt-16 md:pt-24 pb-16">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-8">
            <div className="text-4xl">{currentService.icon}</div>
            <h1 className="text-3xl md:text-4xl font-bold">{currentService.title}</h1>
          </div>
          
          <div className="bg-light p-6 rounded-xl mb-8">
            <p className="text-lg">{currentService.description}</p>
          </div>
          
          <p className="mb-8">Страница услуги "{currentService.title}" находится в разработке</p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="btn-primary">
              Вернуться на главную
            </Link>
            <Link href="/booking" className="btn-secondary">
              Забронировать
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ServicePage; 