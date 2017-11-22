var webpack = require('webpack')
var path = require('path')

var AppDirectory = path.resolve(__dirname, 'app')
var BinDirectory = path.resolve(__dirname, 'public/build')

var config = {
    entry: AppDirectory + '/main.js',
    output: {
        path: BinDirectory,
        filename: 'bundle.js'
    },
    watch: true,
    module: {
        loaders: [{
            test: /.js?$/,
            include: AppDirectory,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
}

module.exports = config
