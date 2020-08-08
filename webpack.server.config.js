const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')

module.exports = (env, argv) => {
  const SERVER_PATH = argv.mode === 'production' ?
  './src/server/server-prod.js' :
  './src/server/server-dev.js' 
  return {
    entry: {
      server: SERVER_PATH
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
}