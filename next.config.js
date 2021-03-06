const visit = require('unist-util-visit')

const withCSS = require("@zeit/next-css");
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      () => (tree) => {
        visit(tree, 'jsx', node => {
          if (node.value.match(/<Image/)) {
            node.value = node.value.replace(/src="([^"]*)"/g, (...args) => `image={importImage("${args[1]}")}`)
          }
        })
      }
    ]
  }
});

module.exports = withCSS(withMDX({
  webpack5: true,

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  images: {
    domains: ['storage.googleapis.com'],
  },

  async rewrites() {
    return [
      {
        source: '/feed',
        destination: '/api/feed',
      },
    ]
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.(js|ts)x?$/,
      use: [
        {
          loader: "@linaria/webpack-loader",
          options: { sourceMap: true }
        }
      ]
    });

    return config;
  }
}));
