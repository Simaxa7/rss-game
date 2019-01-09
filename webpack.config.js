const path = require('path');
const webpack = require('webpack');

const conf = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: 'dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // loader: 'babel-loader',
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.jpg$|\.png$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
  ],
  resolve: {
    alias: {
      'jquery-ui': 'jquery-ui/ui/widgets',
      modules: path.join(__dirname, 'node_modules'),
    },
  },
  devtool: 'eval-sourcemap',
  devServer: {
    compress: true,
    port: 9888,
    overlay: true,
  },
};
module.exports = (env, options) => {
  const production = options.mode === 'production';
  conf.devtool = production ? 'source-map' : 'eval-sourcemap';

  return conf;
};
