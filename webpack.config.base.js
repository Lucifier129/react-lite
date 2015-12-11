var webpack = require('webpack');
var path = require('path')
var isEs3 = process.env.BROWSER_ENV === 'es3'
var utilPath = path.join(__dirname, isEs3 ? 'src/util.jquery' : 'src/util')
var externals = !isEs3 ? {} : {
  'jquery': {
    root: 'jQuery',
    commonjs2: 'jquery',
    commonjs: 'jquery',
    amd: 'jquery'
  }
}

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
    externals: externals,
    resolve: {
        extensions: ['', '.js'],
        alias: {
            util: utilPath
        }
    }
};
