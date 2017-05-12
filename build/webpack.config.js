'use strict';

const {NODE_ENV = 'development'} = process.env;

const PATH = require('path');

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
// const StatsPlugin = require('stats-webpack-plugin');

// ------ Paths ------ //

const ROOT = '../';
const IS_DEV_SERVER = process.argv.find(v => v.includes('webpack-dev-server'));

const APP_SRC_DIR = PATH.resolve(__dirname, ROOT, 'src/client/');
const APP_JS_FILE = PATH.resolve(APP_SRC_DIR, 'index.js');
const APP_HTML_FILE = PATH.resolve(APP_SRC_DIR, 'index.html');

const PUBLIC_PATH = IS_DEV_SERVER ? '/' : '/assets/js/';
const PUBLIC_DIR = PATH.resolve(__dirname, ROOT, 'dist/public/');
const JS_ASSETS_DIR = PATH.resolve(PUBLIC_DIR, 'assets/js/');

const CACHE_DIR = PATH.resolve(__dirname, ROOT, '.cache/');

// ------ Configuration ------ //

const ENTRY = {
    app: APP_JS_FILE
};

const DEV_SERVER_ENTRY = [
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    APP_JS_FILE
];

const EXTERNALS = {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    // 'prop-types': 'PropTypes'
};

const STATS = {
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
};

const DEV_SERVER = {
    stats: STATS,
    hot: true,
    contentBase: PUBLIC_DIR,
    publicPath: PUBLIC_PATH,
    compress: true,
    watchOptions: {
        ignored: /node_modules/
    },
    inline: true,
    port: 3000,
    historyApiFallback: true,
    watchContentBase: true,
    // proxy: {
    //     '/': 'http://localhost:4000'
    // }
};

const HTML_PLUGIN = new HtmlWebpackPlugin({
    hash: false,
    filename: IS_DEV_SERVER ? 'index.html' : '../../index.html',
    cache: true,
    inject: false,
    template: APP_HTML_FILE
});

const COMMON_CHUNKS_PLUGIN = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.js',
    minChunks: Infinity,
    // minChunks({context}) {
    //     return context &&
    //         context.indexOf('node_modules') >= 0 &&
    //         context.match(/\.js$/);
    // }
});

const PLUGINS = [
    HTML_PLUGIN,
    // COMMON_CHUNKS_PLUGIN,
    // new StatsPlugin('stats.json', {
    //     chunkModules: true
    // })
    // new UglifyJSPlugin({sourceMap: true})
];

const DEV_SERVER_PLUGINS = [
    HTML_PLUGIN,
    // COMMON_CHUNKS_PLUGIN,
    // new BundleAnalyzerPlugin({generateStatsFile: true, analyzerMode: 'disabled'}),
    // new WriteFilePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
];

const config = {
    devtool: 'source-map',
    cache: true,
    entry: IS_DEV_SERVER ? DEV_SERVER_ENTRY : ENTRY,
    output: {
        filename: 'app.js',
        path: JS_ASSETS_DIR,
        publicPath: PUBLIC_PATH
    },
    externals: IS_DEV_SERVER ? EXTERNALS : [nodeExternals()],
    performance: {
        hints: NODE_ENV === 'production' ? 'warning' : false
    },
    devServer: DEV_SERVER,
    plugins: IS_DEV_SERVER ? DEV_SERVER_PLUGINS : PLUGINS,
    module: {
        rules: [
            {
                test: /\.js$/,
                include: APP_SRC_DIR,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: CACHE_DIR
                }
            }
        ]
    },
    stats: STATS
};

module.exports = config;
