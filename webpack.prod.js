const webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    devtool: "source-map",

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            parallel: true,
        }),
    ]
});
