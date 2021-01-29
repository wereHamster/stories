const { Headphones } = require('react-feather');
const visit = require('unist-util-visit')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      () => (tree) => {
        visit(tree, 'jsx', node => {
          if (node.value.match(/<Image/)) {
            node.value = node.value.replace(/src="(.*)"/g, (...args) => `image={importImage("${args[1]}")}`)
          }
        })
      }
    ]
  }
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  images: {
    domains: ['storage.googleapis.com'],
  },
});
