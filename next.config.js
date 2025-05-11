/** @type {import('next').NextConfig} */
// Временно отключаем PWA для тестирования
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === 'development'
// });

const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Для статического экспорта
  images: {
    unoptimized: true, // Необходимо для экспорта статичного сайта
  },
  webpack(config) {
    // Поддержка аудио-файлов
    config.module.rules.push({
      test: /\.(mp3|wav|ogg|mpe?g)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]'
      }
    });

    // Поддержка видео-файлов
    config.module.rules.push({
      test: /\.(mp4|webm|ogv|mov)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]'
      }
    });

    return config;
  },
  // Для GitHub Pages
  basePath: '/Ozero', // Имя репозитория
  assetPrefix: '/Ozero/', // Необходимо для корректной загрузки ресурсов
  trailingSlash: true,
};

// module.exports = withPWA(nextConfig);
module.exports = nextConfig; 