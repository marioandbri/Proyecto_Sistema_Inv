const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
   entry: './src/app/index.js',
   output:{
      path: __dirname + '/src/public',
      filename: 'bundle.js'
   },
   module: {
      rules: [
         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use:["babel-loader"]
         },
         {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          }
      ],
     
   },
   plugins: [
      new NodePolyfillPlugin()
   ],
   resolve: {
      fallback: {
        util: require.resolve("util/")
      }
  }
}