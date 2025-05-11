import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Placeholder for translations
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'navigation.fishing': 'Рыбалка',
      'navigation.accommodation': 'Отдых',
      'navigation.cafe': 'Кафе',
      'navigation.news': 'Новости',
      'navigation.gallery': 'Галерея',
      'navigation.contacts': 'Контакты',
      'footer.about': 'О нас',
      'footer.rules': 'Правила',
      'footer.prices': 'Цены',
      'footer.privacy': 'Политика конфиденциальности',
      'footer.terms': 'Условия использования',
      'footer.copyright': 'Все права защищены',
      'footer.address': 'Украина, Киевская область',
      'footer.phone': 'Телефон',
      'footer.email': 'Email',
      'footer.subscribe': 'Подписаться на новости',
      'footer.subscribeText': 'Получайте последние новости и специальные предложения',
      'footer.yourEmail': 'Ваш email',
      'footer.social': 'Социальные сети',
      'footer.subscribeButton': 'Подписаться'
    };
    return translations[key] || key;
  };

  const links = [
    { category: 'Услуги', items: [
      { title: t('navigation.fishing'), href: '/fishing' },
      { title: t('navigation.accommodation'), href: '/accommodation' },
      { title: t('navigation.cafe'), href: '/cafe' }
    ]},
    { category: 'Информация', items: [
      { title: t('footer.about'), href: '/about' },
      { title: t('footer.rules'), href: '/rules' },
      { title: t('footer.prices'), href: '/prices' }
    ]},
    { category: 'Документы', items: [
      { title: t('footer.privacy'), href: '/privacy' },
      { title: t('footer.terms'), href: '/terms' }
    ]}
  ];

  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div>
            <Link href="/" className="text-2xl font-bold text-white mb-4 inline-block">
              Озеро Михайлына
            </Link>
            <p className="text-gray-400 mb-6">
              Комфортный отдых на природе, рыбалка и вкусная еда в живописном месте Киевской области.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors" aria-label="YouTube">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:col-span-2">
            {links.map(linkGroup => (
              <div key={linkGroup.category}>
                <h3 className="text-lg font-bold mb-4">{linkGroup.category}</h3>
                <ul className="space-y-2">
                  {linkGroup.items.map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Subscribe Form */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.subscribe')}</h3>
            <p className="text-gray-400 mb-4">{t('footer.subscribeText')}</p>
            <form className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder={t('footer.yourEmail')}
                  className="input-field bg-gray-800 text-white border-gray-700 flex-grow"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary whitespace-nowrap py-2"
                  type="submit"
                >
                  {t('footer.subscribeButton')}
                </motion.button>
              </div>
            </form>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">{t('footer.address')}</h4>
              <p className="text-gray-400">Киевская обл., Киево-Святошинский район, с. Михайловка-Рубежовка</p>
            </div>
            
            <div className="mt-4 space-y-2">
              <a href="tel:+380991234567" className="flex items-center text-gray-400 hover:text-white">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +380 99 123 45 67
              </a>
              <a href="mailto:info@ozero-mikhailyna.com" className="flex items-center text-gray-400 hover:text-white">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                info@ozero-mikhailyna.com
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Озеро Михайлына. {t('footer.copyright')}.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/privacy" className="text-gray-500 hover:text-white text-sm">
                {t('footer.privacy')}
              </Link>
              <span className="text-gray-700">|</span>
              <Link href="/terms" className="text-gray-500 hover:text-white text-sm">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 