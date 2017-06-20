const debug = process.env.NODE_ENV !== "production";
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [
  new HtmlWebpackPlugin({
      template: './index.html',
      inject: true,
    }),
]

if(!debug) {
  plugins = plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ])
}

module.exports = {
  context: path.join(__dirname, 'client'),
  entry: './app.js',
  output: {
    path: __dirname + '/public',
    filename: "app.js"
  },
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /(node_modules)/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader?localIdentName=[path][name]---[local]---[hash:base64:5]&modules&sourceMap' }
    ]
  },
  resolve: {
    modulesDirectories: ['client', 'node_modules']
  },
  devtool: debug ? "source-map" : null,
  plugins,
};
