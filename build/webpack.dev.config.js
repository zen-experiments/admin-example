'use strict';

const PATH = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const ROOT = '../';

const CACHE_DIR_PATH = PATH.resolve(__dirname, ROOT, '.cache/');

const SRC_DIR_PATH = PATH.resolve(__dirname, ROOT, 'src/client/app/');
const INDEX_JS_FILE = PATH.resolve(SRC_DIR_PATH, 'index.js');
const INDEX_HTML_FILE = PATH.resolve(SRC_DIR_PATH, 'index.html');

const WEBPACK_PUBLIC_DIR = '/';
const JS_ASSETS_DIR = 'assets/js/';
const PUBLIC_DIR_PATH = PATH.resolve(__dirname, ROOT, 'dist/public/');

const config = {
    devtool: 'source-map',
    cache: true,
    entry: [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        INDEX_JS_FILE
    ],
    output: {
        filename: `${JS_ASSETS_DIR}app.js`, // hack for WDS
        path: PUBLIC_DIR_PATH,
        publicPath: WEBPACK_PUBLIC_DIR
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter',
        'react-router-dom': 'ReactRouterDOM',
        'prop-types': 'PropTypes'
    },
    performance: {
        maxEntrypointSize: 1000000,
        maxAssetSize: 1000000,
        hints: 'warning'
    },
    devServer: {
        stats: {
            assets: true,
            cached: false,
            cachedAssets: false,
            children: false,
            chunks: false,
            chunkModules: false,
            colors: true,
            hash: false,
            modules: false,
            reasons: false,
            source: false,
            timings: false,
            version: true
        },
        hot: true,
        overlay: true,
        contentBase: PUBLIC_DIR_PATH,
        publicPath: WEBPACK_PUBLIC_DIR,
        compress: true,
        watchOptions: {
            ignored: [/node_modules/]
        },
        inline: true,
        port: 3000,
        historyApiFallback: true,
        watchContentBase: true
    },
    plugins: [
        // new WriteFilePlugin({
        //     test: /\.html$/,
        //     log: false
        // }),
        new HtmlWebpackPlugin({
            hash: false,
            filename: 'index.html',
            cache: true,
            inject: false,
            template: INDEX_HTML_FILE
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: SRC_DIR_PATH,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: CACHE_DIR_PATH
                }
            }
        ]
    }
};

module.exports = config;
