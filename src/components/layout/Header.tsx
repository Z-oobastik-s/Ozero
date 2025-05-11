import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Эффект для отслеживания скролла
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрыть меню при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (submenu: string) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  // Закрыть меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Translation placeholders
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'navigation.fishing': 'Рыбалка',
      'navigation.accommodation': 'Отдых',
      'navigation.cafe': 'Кафе',
      'navigation.news': 'Новости',
      'navigation.gallery': 'Галерея',
      'navigation.contacts': 'Контакты',
      'navigation.fishingSubmenu.vip': 'VIP-рыбалка',
      'navigation.fishingSubmenu.instructor': 'Инструктор',
      'navigation.fishingSubmenu.corporate': 'Корпоратив',
      'navigation.fishingSubmenu.certificates': 'Сертификаты',
      'navigation.fishingSubmenu.lakeMap': 'Схема озера',
      'navigation.fishingSubmenu.prices': 'Цены',
      'navigation.fishingSubmenu.rules': 'Правила',
      'navigation.accommodationSubmenu.cabins': 'Домики',
      'navigation.accommodationSubmenu.gazebo': 'Беседка',
      'common.phone': 'Телефон',
      'common.email': 'Email'
    };
    return translations[key] || key;
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      {/* Top Contact Bar - only visible on medium screens and up */}
      <div className="hidden md:block bg-primary text-white py-2">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm">
            <a href="tel:+380991234567" className="flex items-center hover:text-accent transition-colors">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>+380 99 123 45 67</span>
            </a>
            <a href="mailto:info@ozero-mikhailyna.com" className="flex items-center hover:text-accent transition-colors">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>info@ozero-mikhailyna.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-3">
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
            <div className="flex space-x-2 text-sm">
              <button className="hover:text-accent">RU</button>
              <span>|</span>
              <button className="hover:text-accent">UKR</button>
              <span>|</span>
              <button className="hover:text-accent">EN</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className={`py-3 md:py-4 ${isScrolled || isMenuOpen ? 'bg-white' : 'md:bg-white/80 md:backdrop-blur-md'}`}>
        <div className="container-custom flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <h1 className="text-xl font-bold text-primary md:text-2xl">
              Озеро Михайлына
            </h1>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="menu-button relative z-10 p-2 md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Меню навигации"
          >
            <div className="block w-6 relative">
              <span 
                className={`block absolute h-0.5 w-6 bg-primary transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1.5'}`}
              />
              <span 
                className={`block absolute h-0.5 w-6 bg-primary transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span 
                className={`block absolute h-0.5 w-6 bg-primary transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 translate-y-1.5' : 'translate-y-1.5'}`}
              />
            </div>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {[
              { key: 'fishing', text: t('navigation.fishing'), submenu: [
                { key: 'vip', text: t('navigation.fishingSubmenu.vip'), href: '/fishing/vip' },
                { key: 'instructor', text: t('navigation.fishingSubmenu.instructor'), href: '/fishing/instructor' },
                { key: 'corporate', text: t('navigation.fishingSubmenu.corporate'), href: '/fishing/corporate' },
                { key: 'certificates', text: t('navigation.fishingSubmenu.certificates'), href: '/fishing/certificates' },
                { key: 'lakeMap', text: t('navigation.fishingSubmenu.lakeMap'), href: '/fishing/lake-map' },
                { key: 'prices', text: t('navigation.fishingSubmenu.prices'), href: '/fishing/prices' },
                { key: 'rules', text: t('navigation.fishingSubmenu.rules'), href: '/fishing/rules' },
              ]},
              { key: 'accommodation', text: t('navigation.accommodation'), submenu: [
                { key: 'cabins', text: t('navigation.accommodationSubmenu.cabins'), href: '/accommodation/cabins' },
                { key: 'gazebo', text: t('navigation.accommodationSubmenu.gazebo'), href: '/accommodation/gazebo' },
              ]},
              { key: 'cafe', text: t('navigation.cafe'), href: '/cafe' },
              { key: 'news', text: t('navigation.news'), href: '/news' },
              { key: 'gallery', text: t('navigation.gallery'), href: '/gallery' },
              { key: 'contacts', text: t('navigation.contacts'), href: '/contacts' },
            ].map(item => (
              <div key={item.key} className="relative group">
                {'submenu' in item ? (
                  <>
                    <button 
                      onClick={() => toggleSubmenu(item.key)}
                      className={`flex items-center space-x-1 text-dark hover:text-primary transition-colors py-2 font-medium ${activeSubmenu === item.key ? 'text-primary' : ''}`}
                    >
                      <span>{item.text}</span>
                      <svg className={`w-4 h-4 transition-transform ${activeSubmenu === item.key ? 'rotate-180 text-primary' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {activeSubmenu === item.key && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-20"
                      >
                        {item.submenu.map(subItem => (
                          <Link 
                            key={subItem.key}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                          >
                            {subItem.text}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className="text-dark hover:text-primary transition-colors py-2 font-medium">
                    {item.text}
                  </Link>
                )}
              </div>
            ))}

            {/* Контактный телефон - только на мобильных */}
            <a href="tel:+380991234567" className="md:hidden flex items-center text-primary font-medium">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +380 99 123 45 67
            </a>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              key="mobile-menu"
              className="mobile-menu fixed inset-0 pt-20 bg-white z-0 overflow-y-auto md:hidden"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="container-custom py-6">
                {/* Контактная информация */}
                <div className="mb-8 border-b border-gray-100 pb-6">
                  <h3 className="text-sm font-semibold text-gray-400 mb-4">Контакты</h3>
                  <div className="space-y-4">
                    <a href="tel:+380991234567" className="flex items-center text-primary font-medium">
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      +380 99 123 45 67
                    </a>
                    <a href="mailto:info@ozero-mikhailyna.com" className="flex items-center text-dark">
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      info@ozero-mikhailyna.com
                    </a>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Facebook">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="YouTube">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Меню */}
                <div className="space-y-6">
                  {[
                    { key: 'fishing', text: t('navigation.fishing'), submenu: [
                      { key: 'vip', text: t('navigation.fishingSubmenu.vip'), href: '/fishing/vip' },
                      { key: 'instructor', text: t('navigation.fishingSubmenu.instructor'), href: '/fishing/instructor' },
                      { key: 'corporate', text: t('navigation.fishingSubmenu.corporate'), href: '/fishing/corporate' },
                      { key: 'certificates', text: t('navigation.fishingSubmenu.certificates'), href: '/fishing/certificates' },
                      { key: 'lakeMap', text: t('navigation.fishingSubmenu.lakeMap'), href: '/fishing/lake-map' },
                      { key: 'prices', text: t('navigation.fishingSubmenu.prices'), href: '/fishing/prices' },
                      { key: 'rules', text: t('navigation.fishingSubmenu.rules'), href: '/fishing/rules' },
                    ]},
                    { key: 'accommodation', text: t('navigation.accommodation'), submenu: [
                      { key: 'cabins', text: t('navigation.accommodationSubmenu.cabins'), href: '/accommodation/cabins' },
                      { key: 'gazebo', text: t('navigation.accommodationSubmenu.gazebo'), href: '/accommodation/gazebo' },
                    ]},
                    { key: 'cafe', text: t('navigation.cafe'), href: '/cafe' },
                    { key: 'news', text: t('navigation.news'), href: '/news' },
                    { key: 'gallery', text: t('navigation.gallery'), href: '/gallery' },
                    { key: 'contacts', text: t('navigation.contacts'), href: '/contacts' },
                  ].map(item => (
                    <div key={item.key} className="border-b border-gray-100 pb-4">
                      {'submenu' in item ? (
                        <>
                          <button 
                            onClick={() => toggleSubmenu(item.key)}
                            className="flex justify-between items-center w-full py-2 text-lg font-medium text-dark"
                          >
                            <span>{item.text}</span>
                            <svg 
                              className={`w-5 h-5 transition-transform duration-300 ${activeSubmenu === item.key ? 'rotate-180' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {activeSubmenu === item.key && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden pl-4 mt-2"
                              >
                                <div className="space-y-3 py-2">
                                  {item.submenu.map(subItem => (
                                    <Link 
                                      key={subItem.key}
                                      href={subItem.href}
                                      className="block text-gray-600 hover:text-primary transition-colors"
                                    >
                                      {subItem.text}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link 
                          href={item.href}
                          className="block py-2 text-lg font-medium text-dark hover:text-primary transition-colors"
                        >
                          {item.text}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Выбор языка */}
                <div className="mt-8 flex space-x-4 justify-center">
                  <button className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors">RU</button>
                  <button className="text-sm font-medium px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors">UKR</button>
                  <button className="text-sm font-medium px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors">EN</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header; 