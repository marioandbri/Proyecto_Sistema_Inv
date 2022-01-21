const path = require("path");
const webpack = require("webpack");
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
	entry: path.join(__dirname, "/src/app/index.js"),
	output: {
		path: path.join(__dirname, "/src/public"),
		filename: "bundle.js",
		publicPath: "/",
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "/src/public"),
		},
		compress: true,
		port: 8080,
		historyApiFallback: true,
		// hot: true,
		// inline: true,
		proxy: {
			"*": {
				target: "http://localhost:4000/",
				secure: false,
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: [
					/node_modules/,
					/\.dpr\.js$/,
					/controllers/,
					/model/,
					/config/,
					/paswordUtil.js/,
					/routes/,
					/public/,
				],
				use: ["babel-loader"],
			},
			{
				test: /\.m?jsx$/,
				exclude: [/node_modules/],
				use: ["babel-loader"],
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
		],
	},
	plugins: [
		new NodePolyfillPlugin(),
		new webpack.HotModuleReplacementPlugin({ multistep: true }),
	],
	resolve: {
		fallback: {
			util: require.resolve("util/"),
		},
		extensions: [".jsx", "..."],
	},
	optimization: {
		minimizer: [new TerserPlugin({})],
		moduleIds: "deterministic",
	},
};
