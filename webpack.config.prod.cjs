const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'frontend/img', to: 'frontend/img' },
        { from: 'frontend/css', to: 'frontend/css' },
        { from: 'frontend/icon.svg', to: 'frontend/icon.svg' },
        { from: 'frontend/favicon.ico', to: 'frontend/favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'frontend/icon.png', to: 'frontend/icon.png' },
        { from: 'frontend/404.html', to: 'frontend/404.html' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
  ],
});
