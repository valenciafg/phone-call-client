const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'public');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: {
        main: path.join(__dirname, '/src/index.jsx')
    },
    output: {
        path: buildPath, // Path of output file
        filename: 'app.js', // Name of output file
    },
    externals: ['bindings','serialport'],
    module:{
        loaders: [
            {
                test: /\.jsx?$/, // All .js files
                loaders: ['babel-loader','eslint-loader'],
                exclude: [nodeModulesPath]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.png$/,
                loader: 'url-loader',
                options: { limit: 100000 } ,
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    plugins: [
        // Define production build to allow React to strip out unnecessary checks
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin("main.css")
        // Minify the bundle
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                // suppresses warnings, usually from module minification
                warnings: false,
            },
        })*/
    ]
};

module.exports = config;
