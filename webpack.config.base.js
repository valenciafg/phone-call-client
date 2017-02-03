var path = require('path');
var webpack = require('webpack');
const buildPath = path.resolve(__dirname, 'public');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

var NODE_ENV = process.env.NODE_ENV;

var env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined'
};

Object.assign(env, {
  build: (env.production || env.staging)
});

module.exports = {
    entry: [
        path.join(__dirname, '/src/index.jsx')
    ],
    output: {
        path: buildPath, // Path of output file
        filename: 'app.js', // Name of output file
    },
    externals: ['bindings','serialport'],
    module:{
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
                /*loader: ExtractTextPlugin.
                extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader'
                })*/
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
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=fonts/[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    plugins: [
        // Define production build to allow React to strip out unnecessary checks
        /*new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),*/
        //new ExtractTextPlugin('public/main.css')
        // Minify the bundle
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                // suppresses warnings, usually from module minification
                warnings: false,
            },
        })*/
    ]
}