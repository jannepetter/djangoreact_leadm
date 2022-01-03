const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['./leadmanager/frontend/src/index.js'],
    output: {
        filename: 'main.js',
        // filename: 'main.[contenthash].js',
        clean: true,
        path: path.resolve(__dirname, 'leadmanager/frontend/static/frontend/'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
        ]

    },
    // devServer: {
    //     static: {
    //         directory: path.resolve(__dirname, 'leadmanager/frontend/static/frontend/')
    //     },
    //     compress: true,
    //     port: 9000,
    // },
    plugins: [
        new htmlWebpackPlugin({
            template: './leadmanager/frontend/templates/frontend/index.html',
            clear: true
        })
    ]
};