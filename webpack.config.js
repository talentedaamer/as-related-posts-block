const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * css extractions for editor and block styles
 */
const BlocksCSSPlugin = new ExtractTextPlugin({
    filename: './assets/css/styles.blocks.css',
});
const EditorCSSPlugin = new ExtractTextPlugin({
    filename: './assets/css/styles.editor.css',
});

/**
 * extract plugin configurations
 */
const extractConfig = {
    use: [
        {loader: 'raw-loader'},
        {
            loader : 'postcss-loader',
            options: {
                plugins: [require('autoprefixer')],
            },
        },
        {
            loader: 'sass-loader',
            query : {
                outputStyle:
                    'production' === process.env.NODE_ENV ? 'compressed' : 'nested',
            },
        },
    ],
};

module.exports = {
    entry  : { './assets/js/editor.blocks': './blocks/index.js' },
    output : {
        path    : path.resolve(__dirname),
        filename: '[name].js',
    },
    watch  : true,
    module : {
        rules: [
            {
                test   : /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use    : {
                    loader: 'babel-loader',
                },
            },
            {
                test: /style\.s?css$/,
                use : BlocksCSSPlugin.extract(extractConfig),
            },
            {
                test: /editor\.s?css$/,
                use : EditorCSSPlugin.extract(extractConfig),
            },
        ],
    },
    plugins: [
        BlocksCSSPlugin,
        EditorCSSPlugin,
    ],
};

// module.exports = {
//     entry  : {
//         './assets/js/editor.blocks': './blocks/index.js',
//     },
//     output : {
//         path    : path.resolve(__dirname),
//         filename: '[name].js',
//     },
//     watch  : true,
//     module : {
//         rules: [
//             {
//                 test   : /\.js$/,
//                 exclude: /(node_modules|bower_components)/,
//                 use    : {
//                     loader: 'babel-loader',
//                 },
//             }
//         ],
//     },
// };
