const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@common': path.resolve(__dirname, 'src/common/'),
      '@layout': path.resolve(__dirname, 'src/layout/'),
      '@images': path.resolve(__dirname, 'src/images/'),
      '@pages': path.resolve(__dirname, 'src/pages/')
    }
  }
};
