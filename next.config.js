module.exports = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
    ];
  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.armogroup.tech',
      },
      {
        protocol: 'https',
        hostname: 'armogroup.storage.iran.liara.space',
      },
    ],
  },
};
