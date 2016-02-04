var webpack = require('webpack');
var path = require('path');

module.exports = {
    watch: true,
    entry: {
        simple: './examples/simple/'
    },
    output: {
        path: './examples/',
        filename: '[name]/app.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            query: {
                stage: 0
            },
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['', '.js'],
        root: __dirname
    }
};
