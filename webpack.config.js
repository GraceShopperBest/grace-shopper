const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
     module: {
       rules: [
         {
           test: /\.js$/,
           loader: 'babel-loader',
           exclude: /node_modules/
         }
       ]
     },
     output: {
      filename: 'bundle.js',
      path: path.join(__dirname, './dist'),
    }
   };