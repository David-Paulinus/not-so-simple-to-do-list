const path = require('path');

module.exports = {
  entry: {
    app: './frontend/js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './frontend/js/app.js',
  },
};
