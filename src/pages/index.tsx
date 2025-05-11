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
      'homepage.lakeFeatures.depth.value': 'до 6 метров',
      'homepage.lakeFeatures.fish.title': 'Зарыбление',
      'homepage.lakeFeatures.fish.value': 'Постоянное',
      'homepage.lakeFeatures.environment.title': 'Экология',
      'homepage.lakeFeatures.environment.value': 'Чистая вода и природа',
      'homepage.history.title': 'История озера Михайлына',
      'homepage.history.description': 'Озеро Михайлына имеет богатую историю, которая уходит корнями в далекое прошлое. Изначально это был природный водоем, который со временем был облагорожен и превращен в идеальное место для рыбалки и отдыха...',
      'homepage.video.title': 'Посмотрите видео о нашем озере',
      'homepage.video.description': 'Узнайте больше о прекрасном озере Михайлына и услугах, которые мы предлагаем для наших гостей',
      'homepage.feedback.title': 'Что о нас говорят',
      'homepage.feedback.author1': 'Алексей П.',
      'homepage.feedback.text1': 'Отличное место для рыбалки и отдыха! Был уже несколько раз, каждый раз уезжаю с хорошим уловом и отличным настроением.',
      'homepage.feedback.author2': 'Мария К.',
      'homepage.feedback.text2': 'Прекрасное место для семейного отдыха. Чисто, уютно, вкусная еда в кафе. Дети в восторге от природы и животных.',
      'homepage.feedback.author3': 'Виктор С.',
      'homepage.feedback.text3': 'Регулярно приезжаем с друзьями на выходные. Отличное обслуживание, хороший клёв, приятная атмосфера.',
      'homepage.gallery.title': 'Фотогалерея',
      'homepage.gallery.viewAll': 'Смотреть все фото',
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
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 4.5C10 3.12 8.88 2 7.5 2S5 3.12 5 4.5 6.12 7 7.5 7 10 5.88 10 4.5zM5 20c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2H5zm7.48-8.48A2 2 0 0 0 12 13c-.4 0-.77.12-1.08.32l1.96 1.96c.2-.31.32-.68.32-1.08a2 2 0 0 0-2-2c-.4 0-.77.12-1.08.32l7.76 7.76c.85.82 2.05 1.28 3.29 1.28H22c-.67-5.21-5.13-9.36-9.52-9.76zm7.39 5.04l-4.05-4.05c.9-1.18 1.39-2.69 1.25-4.27-.33-3.41-3.27-6.19-6.96-6.24-3.13-.04-5.86 2.05-6.71 4.99-.92 3.23.97 6.54 4.3 7.49.66.18 1.37.29 2.07.29 1.17 0 2.4-.27 3.43-.83l4.01 4.01c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06z" />
        </svg>
      ),
      image: '/images/fishing.jpg',
      link: '/fishing'
    },
    {
      id: 'accommodation',
      title: t('homepage.services.accommodation.title'),
      description: t('homepage.services.accommodation.description'),
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 5.5l6 4.5v9H6v-9l6-4.5M12 3L4 9v12h16V9l-8-6zm3 9h-3.5v3H15v3h-3.5v-3H8v-3h3.5V9H15v3z" />
        </svg>
      ),
      image: '/images/cabins.jpg',
      link: '/accommodation'
    },
    {
      id: 'cafe',
      title: t('homepage.services.cafe.title'),
      description: t('homepage.services.cafe.description'),
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4v-2z" />
        </svg>
      ),
      image: '/images/cafe.jpg',
      link: '/cafe'
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
            <video 
              className="w-full h-full object-cover" 
              autoPlay 
              muted 
              loop 
              playsInline
              poster="/images/lake-hero.jpg"
            >
              <source src="/videos/lake-hero.mp4" type="video/mp4" />
              {/* Fallback for browsers that don't support video */}
              <img src="/images/lake-hero.jpg" alt="Озеро Михайлына" className="w-full h-full object-cover" />
            </video>
          </div>
          
          <div className="container-custom relative z-20 text-white">
            <motion.div 
              className="max-w-lg mx-auto md:mx-0 text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{t('homepage.hero.title')}</h1>
              <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-white/90">{t('homepage.hero.subtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/about" className="btn-primary">
                  {t('homepage.hero.cta')}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link href="/booking" className="btn-secondary">
                  {t('homepage.hero.secondaryCta')}
                </Link>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
            </svg>
          </div>
        </section>

        {/* Services Tabs Section */}
        <section className="py-16 bg-white">
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
              {services.map(service => (
                <AnimatePresence key={service.id} initial={false}>
                  {activeTab === service.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                    >
                      <div className="order-2 md:order-1">
                        <h3 className="text-2xl font-bold mb-4 text-dark">{service.title}</h3>
                        <p className="text-gray-600 mb-6">{service.description}</p>
                        <Link href={service.link} className="btn-primary">
                          {t('common.learnMore')}
                        </Link>
                      </div>
                      <div className="order-1 md:order-2">
                        <div className="rounded-2xl overflow-hidden shadow-xl aspect-video">
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </div>
        </section>
        
        {/* YouTube Video Section */}
        <section className="py-16 bg-light">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title inline-block">{t('homepage.video.title')}</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{t('homepage.video.description')}</p>
            </div>
            
            <div className="relative aspect-video max-w-4xl mx-auto shadow-2xl rounded-2xl overflow-hidden">
              {!isVideoPlaying ? (
                <div className="absolute inset-0 cursor-pointer" onClick={() => setIsVideoPlaying(true)}>
                  <img 
                    src="/images/video-thumbnail.jpg" 
                    alt="Видео о озере Михайлына" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-primary flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              ) : (
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0" 
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </section>
        
        {/* Lake Features Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title inline-block">{t('homepage.lakeFeatures.title')}</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature) => (
                <motion.div 
                  key={feature.id}
                  className="card p-6 text-center"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold mb-2 text-dark">{feature.title}</h3>
                  <p className="text-gray-700">{feature.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-light">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title inline-block">{t('homepage.feedback.title')}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <motion.div 
                  key={testimonial.id}
                  className="card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: testimonial.id * 0.1 }}
                >
                  <svg className="w-10 h-10 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                  </svg>
                  <p className="text-gray-600 mb-4 italic">{testimonial.text}</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&background=0066CC&color=fff`} 
                        alt={testimonial.author}
                        className="w-full h-full object-cover" 
                      />
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
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <h2 className="section-title">{t('homepage.gallery.title')}</h2>
              <Link href="/gallery" className="btn-primary mt-4 md:mt-0">
                {t('homepage.gallery.viewAll')}
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="relative aspect-square overflow-hidden rounded-lg">
                  <img 
                    src={`/images/gallery-${item}.jpg`} 
                    alt={`Галерея ${item}`} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                  />
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

// Temporary disable server-side props for development
const getStaticProps = async ({ locale }: { locale?: string }) => {
  return {
    props: {
      // ...(await serverSideTranslations(locale || 'ru', ['common'])),
    },
  };
};

export { getStaticProps };
export default HomePage; 