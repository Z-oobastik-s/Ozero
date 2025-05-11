import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('fishing');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // We'll use hardcoded text for now until translations are properly set up
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'homepage.title': 'Главная',
      'homepage.description': 'Озеро Михайлына — идеальное место для комфортного отдыха и рыбалки.',
      'homepage.hero.title': 'Озеро Михайлына',
      'homepage.hero.subtitle': 'Комфортный отдых и рыбалка',
      'homepage.hero.cta': 'Узнать больше',
      'homepage.hero.secondaryCta': 'Забронировать',
      'homepage.services.title': 'Наши услуги',
      'homepage.services.fishing.title': 'Рыбалка',
      'homepage.services.fishing.description': 'Богатый улов и всё необходимое для комфортной рыбалки',
      'homepage.services.accommodation.title': 'Отдых',
      'homepage.services.accommodation.description': 'Уютные домики и беседки для вашего комфорта',
      'homepage.services.cafe.title': 'Кафе',
      'homepage.services.cafe.description': 'Вкусные блюда из свежей рыбы и другие деликатесы',
      'homepage.lakeFeatures.title': 'Характеристики озера',
      'homepage.lakeFeatures.area.title': 'Площадь',
      'homepage.lakeFeatures.area.value': '15 гектаров',
      'homepage.lakeFeatures.depth.title': 'Глубина',
      'homepage.lakeFeatures.depth.value': 'до 8 метров',
      'homepage.lakeFeatures.fish.title': 'Виды рыб',
      'homepage.lakeFeatures.fish.value': 'карп, амур, щука, сом',
      'homepage.lakeFeatures.environment.title': 'Окружение',
      'homepage.lakeFeatures.environment.value': 'лес, чистый воздух',
      'homepage.testimonials.title': 'Отзывы посетителей',
      'homepage.testimonials.subtitle': 'Что говорят о нас наши гости',
      'homepage.feedback.author1': 'Иван Петров',
      'homepage.feedback.text1': 'Замечательное место! Прекрасная рыбалка, уютные домики, вкусная еда в кафе. Обязательно приеду ещё раз!',
      'homepage.feedback.author2': 'Сергей Сидоров',
      'homepage.feedback.text2': 'Отличное место для отдыха с семьей. Дети в восторге от природы и возможности покормить рыбок. Спасибо за чудесные выходные!',
      'homepage.feedback.author3': 'Андрей Иванов',
      'homepage.feedback.text3': 'Регулярно приезжаем с друзьями на выходные. Отличное обслуживание, хороший клёв, приятная атмосфера.',
      'homepage.gallery.title': 'Фотогалерея',
      'homepage.gallery.viewAll': 'Смотреть все фото',
      'homepage.video.title': 'Видео о нашем озере',
      'homepage.video.description': 'Посмотрите краткий видеообзор нашего озера и отдыха',
      'common.learnMore': 'Узнать больше',
      'common.readMore': 'Читать полностью',
      'common.bookNow': 'Забронировать сейчас'
    };
    return translations[key] || key;
  };

  const testimonials = [
    {
      id: 1,
      author: t('homepage.feedback.author1'),
      text: t('homepage.feedback.text1'),
      avatar: '/images/avatar1.jpg'
    },
    {
      id: 2,
      author: t('homepage.feedback.author2'),
      text: t('homepage.feedback.text2'),
      avatar: '/images/avatar2.jpg'
    },
    {
      id: 3,
      author: t('homepage.feedback.author3'),
      text: t('homepage.feedback.text3'),
      avatar: '/images/avatar3.jpg'
    }
  ];

  const services = [
    {
      id: 'fishing',
      title: t('homepage.services.fishing.title'),
      description: t('homepage.services.fishing.description'),
      icon: '🎣',
      image: '/images/fishing.jpg'
    },
    {
      id: 'accommodation',
      title: t('homepage.services.accommodation.title'),
      description: t('homepage.services.accommodation.description'),
      icon: '🏡',
      image: '/images/accommodation.jpg'
    },
    {
      id: 'cafe',
      title: t('homepage.services.cafe.title'),
      description: t('homepage.services.cafe.description'),
      icon: '🍲',
      image: '/images/cafe.jpg'
    }
  ];

  const features = [
    {
      id: 'area',
      title: t('homepage.lakeFeatures.area.title'),
      value: t('homepage.lakeFeatures.area.value'),
      icon: '💧'
    },
    {
      id: 'depth',
      title: t('homepage.lakeFeatures.depth.title'),
      value: t('homepage.lakeFeatures.depth.value'),
      icon: '🌊'
    },
    {
      id: 'fish',
      title: t('homepage.lakeFeatures.fish.title'),
      value: t('homepage.lakeFeatures.fish.value'),
      icon: '🐟'
    },
    {
      id: 'environment',
      title: t('homepage.lakeFeatures.environment.title'),
      value: t('homepage.lakeFeatures.environment.value'),
      icon: '🏞️'
    }
  ];

  return (
    <React.Fragment>
      <Head>
        <title>{t('homepage.title')} | Озеро Михайлына</title>
        <meta name="description" content={t('homepage.description')} />
      </Head>
      
      <main className="pt-16 md:pt-0">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
            {/* Заменяем видео на цветной фон */}
            <div className="bg-blue-900 w-full h-full"></div>
          </div>
          
          <div className="container-custom relative z-10 text-white">
            <div className="max-w-3xl">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {t('homepage.hero.title')}
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {t('homepage.hero.subtitle')}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <a href="#services" className="btn-primary">
                  {t('homepage.hero.cta')}
                </a>
                <Link href="/booking" className="btn-secondary">
                  {t('homepage.hero.secondaryCta')}
                </Link>
              </motion.div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <a 
              href="#services" 
              className="flex flex-col items-center text-white animate-bounce"
            >
              <span className="mb-2 text-sm font-medium">Прокрутите вниз</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-light" id="features">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {features.map((feature) => (
                  <motion.div 
                    key={feature.id}
                    className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-700">{feature.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 bg-white" id="services">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title inline-block">{t('homepage.services.title')}</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Выберите интересующее вас направление и узнайте больше о наших услугах</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {services.map(service => (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === service.id 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {service.icon}
                  {service.title}
                </button>
              ))}
            </div>
            
            <div className="mt-8">
              <AnimatePresence mode="wait">
                {services.map(service => (
                  activeTab === service.id && (
                    <motion.div 
                      key={service.id}
                      className="flex flex-col md:flex-row gap-8 items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="md:w-1/2">
                        {/* Заменяем изображение на цветной блок */}
                        <div className="aspect-video bg-blue-200 rounded-xl w-full"></div>
                      </div>
                      <div className="md:w-1/2">
                        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                        <p className="text-gray-700 mb-6">{service.description}</p>
                        <Link href={`/services/${service.id}`} className="btn-primary inline-flex items-center">
                          {t('common.learnMore')}
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
        
        {/* Video Section - заменяем на элемент с текстом */}
        <section className="py-16 bg-light">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title inline-block">{t('homepage.video.title')}</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{t('homepage.video.description')}</p>
            </div>
            
            <div className="relative aspect-video max-w-4xl mx-auto shadow-2xl rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-blue-300 flex items-center justify-center text-white">
                <div className="text-center">
                  <p className="text-xl font-bold mb-4">Скоро здесь будет видео!</p>
                  <p>Видеопрезентация нашего озера находится в разработке</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title inline-block">{t('homepage.testimonials.title')}</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{t('homepage.testimonials.subtitle')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <motion.div 
                  key={testimonial.id}
                  className="bg-light p-6 rounded-xl"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="mb-6 text-gray-700">{testimonial.text}</p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-blue-500 flex items-center justify-center text-white">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-dark">{testimonial.author}</h4>
                      <p className="text-sm text-gray-500">Постоянный клиент</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Gallery Preview Section */}
        <section className="py-16 bg-light">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <h2 className="section-title">{t('homepage.gallery.title')}</h2>
              <Link href="/gallery" className="btn-primary mt-4 md:mt-0">
                {t('homepage.gallery.viewAll')}
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-blue-200 to-blue-400">
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                    Фото {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Готовы отдохнуть на озере Михайлына?</h2>
              <p className="text-lg mb-8 text-white/80">Забронируйте место для рыбалки или отдыха уже сегодня и получите незабываемые впечатления!</p>
              <Link href="/booking" className="btn-secondary bg-white text-primary hover:bg-white/90 hover:text-primary">
                {t('common.bookNow')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'ru', ['common'])),
    },
  };
};

export default HomePage; 