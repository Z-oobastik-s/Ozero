import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ 
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex flex-col min-h-screen bg-light">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout; 