//module.exports = process.env.NODE_ENV === 'production' ? require('./webpack.config.production.js') : require('./webpack.config.development.js');
/* Dependencies */
const path = require('path');
const webpack = require('webpack');
const buildPath = path.resolve(__dirname, 'public');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const env = process.env.NODE_ENV
/* Plugins */
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssCssnext = require('postcss-cssnext')

function loaders(){
    var common = [
        {
            test: /\.json$/,
            loader: 'json-loader'
        },        
        {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        },
        {
            test: /\.png$/,
            loader: 'url-loader',
            options: { limit: 100000 } ,
        },
        {
            test: /\.jpg$/,
            loader: 'file-loader'
        },
        {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        },
        {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file'
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml'
        }
    ]
    if(env === 'production'){
        common = common.concat([
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader','eslint-loader'],
                exclude: [nodeModulesPath]
            },
            {
                test: /\.css$/i,
                loader: ExtractTextPlugin.extract('style',
                    `css?modules&localIdentName=[name]_[local]__[hash:base64:5]!postcss`),
            }
        ])
    }else{
        common = common.concat([
            {
                test: /\.jsx?$/,
                loaders: [ 'react-hot-loader', 'babel-loader','eslint-loader'],
                exclude: [nodeModulesPath]
            },
            {
                test: /\.css$/i,
                loader: 'style-loader!css-loader'
            }
        ])
    }
    return common
}

function entry(){
    if(env === 'production'){
        return {
            app: path.join(__dirname, '/src/index.jsx'),
            vendor: [ 
                'react', 
                'react-dom', 
                'react-redux', 
                'react-router', 
                'react-router-redux', 
                'redux'
            ]
        }
    }
    return [
        path.join(__dirname, '/src/index.jsx'),
        'webpack-dev-server/client?http://localhost:8081',
        'webpack/hot/only-dev-server'
    ]
}

function output(){
    if(env === 'production'){
        return {
            path: buildPath, // Path of output file
            filename: 'bundle.js', // Name of output file
            publicPath: '/public/'
        }
    }
    return {
        path: buildPath, // Path of output file
        filename: 'bundle.js', // Name of output file
        publicPath: '/'
    }
}

function plugins(){
    if(env === 'production'){
        return [
            new ExtractTextPlugin('style.css', { allChunks: true }),
            new webpack.DefinePlugin({ 'process.env':{ 'NODE_ENV': JSON.stringify('production')} }),
            new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),
            new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        ]
    }else{
        return [
            new webpack.HotModuleReplacementPlugin(),
            new ExtractTextPlugin('style.css', { allChunks: true }),
            new webpack.DefinePlugin({ 'process.env':{ 'NODE_ENV': JSON.stringify('development')} }),
        ]
    }
}

function devServer(){
    return {
        hot:true,
        contentBase: './public',//Serve files on this folder
        stats: 'errors-only',//Doesn't show build messages
        colors: true,
        headers:{
            'Access-Control-Allow-Origin': 'http://172.24.10.3:8080',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        proxy: [
            {
                context: [
                    '/lastcalls/**',
                    '/phonedirectory/**',
                    '/call/**',
                    '/calls/**',
                    '/scpost/**',
                    '/updatephone/**'
                ],
                target: 'http://172.24.10.3:8080',
                secure: false
            }
        ],
        historyApiFallback: true,
    }
}

var devtool = 'inline-source-map'
if(env === 'production'){ devtool = 'hidden-sourcemap' }

/* config */
module.exports = {
  devtool: devtool,
  entry: entry(),
  output: output(),
  externals: ['bindings','serialport'],
  module: { loaders: loaders() },
  postcss: [ postcssCssnext({ browsers: ['last 2 versions'] }) ],
  devServer: devServer(),
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },  
  plugins: plugins()
}