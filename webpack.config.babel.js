import webpack from 'webpack';
import path from 'path';

export default {
    context: path.resolve(__dirname, 'client'),
    entry: ['whatwg-fetch', './main.js'],
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'client.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    resolve: {
        extensions: ['.js']
    }
};
