const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: './'
    },
    devServer: {
        overlay: true,
        contentBase: path.resolve(__dirname, './dist'),
        watchContentBase: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                resolve: {
                    extensions: ['.js'],
                },
                loader: 'babel-loader',
                exclude: '/node-modules/'
            },
            {
                test: /\.css$/,
                use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
            },
            {
                test: /\.less$/i,
                use: extractLESS.extract([ 'css-loader', 'less-loader' ])
            },
        ]
    },
    plugins: [
        extractCSS,
        extractLESS,
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'editBook.html',
            template: './src/editBook.html',
        }),
        new CopyWebpackPlugin([
            {from:'src/img',to:'img'}
        ]),
    ]
};

module.exports = (env, options) => {
    let production = options.mode === 'production';
    config.devtool = production ? false : 'eval-sourcemap';
    return config;
};