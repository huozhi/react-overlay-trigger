const path = require('path')
const pkg = require('../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const joinPath = path.join.bind(null, __dirname)
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  mode: process.env.NODE_ENV || 'none',
  entry: {
    app: [joinPath('app.js')],
  },
  output: {
    path: joinPath('dist'),
    publicPath: isProduction ? `/${pkg.name}` : '/',
    filename: isProduction ? 'app.[hash].js' : 'app.js',
  },
  devtool: !isProduction && 'inline-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
    ],
  },
  plugins: ([
    new HtmlWebpackPlugin({
      template: joinPath('index.html'),
    }),
  ]),
  devServer: {
    hot: true,
    inline: true,
    stats: 'minimal',
    host: '0.0.0.0',
  },
}
