const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')
module.exports = {
  entry: {
    server: './src/server/server.js'
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
  
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: '/\.js$',
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
