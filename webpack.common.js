const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    entry: path.join(process.cwd(), 'src/' , 'server.ts'),
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    externals: [
        {
            formidable: 'commonjs formidable'
        },
        nodeExternals({
            modulesFromFile: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.MODE': JSON.stringify('server'),
        }),
    ],
}
