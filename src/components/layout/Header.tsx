import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: 'Главная', path: '/' },
    { name: 'Рыбалка', path: '/services/fishing' },
    { name: 'Отдых', path: '/services/accommodation' },
    { name: 'Кафе', path: '/services/cafe' },
    { name: 'Галерея', path: '/gallery' }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className={`text-2xl font-bold ${isScrolled ? 'text-primary' : 'text-white'}`}>
            Озеро Михайлына
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  router.pathname === item.path ? 'text-primary font-bold' : isScrolled ? 'text-dark' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/booking" className="btn-primary text-sm py-2 px-4">
              Забронировать
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Меню"
          >
            <svg className={`w-6 h-6 ${isScrolled ? 'text-dark' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-custom py-4">
            <nav className="flex flex-col">
              {menuItems.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`py-3 text-dark hover:text-primary transition-colors ${
                    router.pathname === item.path ? 'text-primary font-bold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="/booking" 
                className="btn-primary text-center mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Забронировать
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header; 