const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
   entry: path.join(__dirname, '/src/app/index.js'),
   output: {
      path: path.join(__dirname, '/src/public'),
      filename: 'bundle.js',
      publicPath: '/'
   },
   devServer: {
      historyApiFallback: true
   },
   module: {
      rules: [
         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
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
   },
   optimization: {
      moduleIds: 'deterministic'
   },
   watch: true
}