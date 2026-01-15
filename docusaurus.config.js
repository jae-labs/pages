const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'JAE',
  tagline: 'Just Another Engineer',
  url: 'https://justanother.engineer/',
  trailingSlash: false,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'jae',
  projectName: 'jae',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.dev/jae-labs/pages',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-N556PF9XWK',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{name: 'keywords', content: 'AWS, Linux, Terraform, Packer, databases, infrastructure management, Vault, Consul, cheatsheets, cheatsheet, DevOps, SysAdmin, SRE, Engineering, CLI cheatsheet, terminal commands, CLI arguments, parameters, tech topics, command line interface'}],
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      algolia: {
        apiKey: '902a872ced32cf57b778bddafda5c656',
        indexName: 'jae',
	      searchParameters: {},
        contextualSearch: false,
        appId: 'WHPHTCRDVW',
      },
      navbar: {
        title: '',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'introduction',
            position: 'left',
            label: 'Cheatsheets',
          },
          {
            to: 'contributing',
            position: 'left',
            label: 'Contributing',
          },
          {
            type: 'dropdown',
            label: 'Community',
            position: 'left',
            items: [
		    {
       		        href: 'https://join.slack.com/t/justanotherengineer/shared_invite/zt-23m74nwgy-STbP1b2nskLTz5Ql3NRtTQ',
			    label: 'Slack'
		    },
	    ],
          },
          {
            to: 'about',
            position: 'left',
            label: 'About',
          },
          {
            href: 'https://www.buymeacoffee.com/luiz1361',
            label: 'Buy me a ☕',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Contributing',
                to: 'contributing',
              },
              {
                label: 'GitHub Issues',
                href: 'https://github.com/jae-labs/pages/issues',
              },
              {
                label: 'Source Code',
                href: 'https://github.com/jae-labs/pages',
              },
              {
                label: 'Slack',
                href: 'https://join.slack.com/t/justanotherengineer/shared_invite/zt-23m74nwgy-STbP1b2nskLTz5Ql3NRtTQ',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Privacy Policy',
                to: 'privacy',
              },
              {
                label: 'Cookie Policy',
                to: 'cookie_policy',
              },
              {
                label: 'Comment Policy',
                to: 'comment_policy',
              },
              {
                label: 'Code of Conduct',
                href: 'https://github.com/jae-labs/pages?tab=coc-ov-file',
              },
              {
                label: 'License',
                href: 'https://github.com/jae-labs/pages?tab=MIT-1-ov-file',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Pingdom',
                href: 'http://stats.pingdom.com/ieq3v42yov76?_gl=1*1073t62*_gcl_au*MTI2MDgwMDc0My4xNjk1MTU3NTc1',
              },
              {
                label: 'Sitemap',
                href: 'https://justanother.engineer/sitemap.xml',
              },
              {
                label: 'About',
                to: 'about',
              },
            ],
          },
          {
            title: 'Credit',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/',
              },
              {
                label: 'Algolia',
                href: 'https://www.algolia.com/',
              },
              {
                label: 'Cloudflare',
                href: 'https://www.cloudflare.com/',
              },
              {
                label: 'Disqus',
                href: 'https://disqus.com/',
              },
              {
                label: 'Docusaurus',
                href: 'https://docusaurus.io/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Just Another Engineer.`,
      },
      prism: {
        theme: lightCodeTheme,
	additionalLanguages: ['powershell','php'],
        darkTheme: darkCodeTheme,
      },
    }),
});
