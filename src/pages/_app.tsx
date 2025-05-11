import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  // Check if the current page is the admin page
  const isAdminPage = Component.displayName === 'AdminPanel';
  
  // Исправление проблемы с высотой вьюпорта на мобильных устройствах
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVh();
    window.addEventListener('resize', setVh);
    
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Озеро Михайлына - комфортный отдых и рыбалка в Киевской области. Аренда домиков, рыбалка, кафе, пикник на природе." />
        <meta name="keywords" content="рыбалка, отдых, озеро, карп, щука, сом, природа, кафе, домики, беседки, Киевская область, Михайлына" />
        <meta name="author" content="Озеро Михайлына" />
        
        <meta property="og:title" content="Озеро Михайлына - комфортный отдых и рыбалка" />
        <meta property="og:description" content="Идеальное место для комфортного отдыха и рыбалки в Киевской области. Приезжайте насладиться природой!" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://ozero-mikhailyna.com" />
        <meta property="og:type" content="website" />
        
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        <meta name="theme-color" content="#0066CC" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {isAdminPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}

export default MyApp; 