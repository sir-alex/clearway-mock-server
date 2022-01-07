const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = () => {
    return merge(common, {
        mode: 'development',
        devtool: 'inline-source-map',
        stats: 'errors-only',
        module: {},
        optimization: {},
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development'),
            }),
            new WebpackShellPlugin({onBuildEnd:['nodemon --inspect-brk ./dist/server.js']})
        ],
    })
}
