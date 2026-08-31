const { description } = require('../../package')

module.exports = {
  base: process.env.VUEPRESS_BASE || '/',
  title: 'Puna - Documentation',
  description: description,

  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#2F6EA9' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  themeConfig: {
    logo: '/img/logo_puna_doc.png',
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      { text: 'Démarrage', link: '/demarrage/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'MCP & IA', link: '/mcp/' },
      { text: 'FAQ', link: '/faq/' },
    ],
    sidebar: {
      '/demarrage/': [
        {
          title: 'Démarrage',
          collapsable: false,
          children: [
            '',
            'prerequis',
            'installation-dev',
            'installation-production',
            'configuration',
          ]
        }
      ],
      '/guide/': [
        {
          title: "Guide d'utilisation",
          collapsable: false,
          children: [
            '',
            'connexion',
            'sites',
            'formulaires',
            'soumissions',
            'profil',
            'administration',
          ]
        }
      ],
      '/api/': [
        {
          title: 'Intégration API',
          collapsable: false,
          children: [
            '',
            'authentification',
            'endpoints',
            'format-donnees',
            'codes-erreur',
          ]
        },
        {
          title: 'Exemples',
          collapsable: false,
          children: [
            'exemples/javascript',
            'exemples/php',
            'exemples/python',
          ]
        }
      ],
      '/mcp/': [
        {
          title: 'MCP & IA',
          collapsable: false,
          children: [
            '',
            'connexion',
            'outils',
            'exemples',
          ]
        }
      ],
      '/faq/': [
        {
          title: 'FAQ & Dépannage',
          collapsable: false,
          children: [
            '',
            'depannage',
            'contribuer',
          ]
        }
      ],
    }
  },

  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
