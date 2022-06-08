
const path = require('path');

module.exports = {
  entry: './js/main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        // use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/js'),
    clean: true
  },
  mode: "production",
};

