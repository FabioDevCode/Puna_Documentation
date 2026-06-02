const { description } = require('../../package')

module.exports = {
  base: '/Puna_Documentation/',
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
      { text: 'Guide', link: '/guide/' },
      { text: 'Intégration', link: '/integration/' },
      // { text: 'Sécurité', link: '/security/' },
      { text: 'FAQ', link: '/faq/' },
      // { text: 'Changelog', link: '/changelog/' }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'getting-started',
            'dashboard',
            'sites',
            'forms',
            'inbox',
            'exports',
            'tokens',
            'beta-limits'
          ]
        }
      ],
      '/integration/': [
        {
          title: 'Intégration',
          collapsable: false,
          children: [
            '',
            'api-reference',
            'html-form',
            'javascript-fetch',
            'file-upload',
            'rate-limiting'
          ]
        }
      ],
      '/security/': [
        {
          title: 'Sécurité',
          collapsable: false,
          children: [
            '',
            'authentication',
            'api-auth',
            'file-validation',
            'csrf-xss'
          ]
        }
      ],
      '/faq/': [
        {
          title: 'FAQ',
          collapsable: false,
          children: [
            ''
          ]
        }
      ],
      '/changelog/': [
        {
          title: 'Changelog',
          collapsable: false,
          children: [
            ''
          ]
        }
      ]
    }
  },

  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
