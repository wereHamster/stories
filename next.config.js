const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  images: {
    domains: ['storage.googleapis.com'],
  },
});
