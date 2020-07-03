const { useBabelRc, override, addWebpackAlias } = require('customize-cra')

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    ['react-redux']: process.env.NODE_ENV === 'development' ? 'react-redux/lib' : 'react-redux'
  }),
);
