/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://z-oobastik-s.github.io/Ozero',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}; 