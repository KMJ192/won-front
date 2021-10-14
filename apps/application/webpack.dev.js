const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const config = {
  devServer: {
    open: true,
    historyApiFallback: true,
    port: 3000,
  },
  mode: 'development',
  devtool: 'eval',
};

module.exports = merge(common, config);
