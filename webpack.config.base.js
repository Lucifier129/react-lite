var webpack = require('webpack');
var path = require('path')

module.exports = {
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/
        }]
    },
    output: {
        library: 'React',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['', '.js']
    }
};
