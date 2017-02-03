var webpack = require('webpack');
const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
var config = require('./webpack.config.base.js');

if (process.env.NODE_ENV !== 'test') {
  config.entry = [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server' //Tries HRM but doesn't reload the browser upon errors
    //'webpack/hot/dev-server'  //Tries HRM and reloads the browser upon errors
  ].concat(config.entry);
}

config.devtool = '#cheap-module-eval-source-map';

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin()
]);

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.jsx?$/, 
    loaders: [ 'react-hot', 'babel'], 
    exclude: [nodeModulesPath]
  }
]);

config.devServer = {
  hot:true,
  contentBase: './public',//Serve files on this folder
  stats: 'errors-only',//Doesn't show build messages
  colors: true,
  headers:{
      'Access-Control-Allow-Origin': '*'
  },
}
module.exports = config;