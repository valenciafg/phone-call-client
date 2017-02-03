const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('./webpack.config.base.js');

config.module.loaders = config.module.loaders.concat([
    {
        test: /\.jsx?$/, // All .js files
        loaders: ['babel-loader','eslint-loader'],
        exclude: [nodeModulesPath]
    },
]);

module.exports = config;
