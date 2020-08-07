const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    server: './server.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this __dirname 
    __filename: false,  // and/or __filename, is return blank.
  },
  externals: [webpackNodeExternals()], // Need this to avoid error when working with Express

  module : {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: '/\.js$/',
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader'
        }
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins 
        test: '/\.html$/',
        use: [{loader: 'html-loader'}]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
      excludeChunks: ['server']
    })   
  ]
}