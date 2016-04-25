var path    = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
  entry: './src/index.js',

  output: {
    path:          path.resolve( __dirname, 'lib/' ),
    filename:      'index.js',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' }
    ]
  },

  externals: {
    'react':       'react',
    'react-dom':   'react-dom'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize:   true,
      compressor: { warnings: false }
    })
  ]
};