const path = require('path');

module.exports = {
  entry: {
    app: './frontend.js/server.frontend.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './frontend.js/server.frontend.js',
  },
};
