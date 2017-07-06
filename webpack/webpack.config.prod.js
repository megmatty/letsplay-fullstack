var path = require("path")
var webpack = require("webpack")
var assetsPath = path.join(__dirname, "..", "public", "assets")
var publicPath = "/assets/"

module.exports = {
	// The configuration for the client
	name: "browser",		

	devtool: "source-map",

	// The base directory (absolute path!) for resolving the entry option.
	context: path.join(__dirname, "..", "src", "client"),

	entry: {
		app: "./client"
	},

	output: {
		path: assetsPath,
		filename: "[name].min.js",
		publicPath: publicPath
	},

	resolve: {
		extensions: ["", ".js", "jsx"],
		modulesDirectories: [
			"src",
			"node_modules"
		]
	},

	module: {		
		loaders: [
			{
				test: /\.jsx?/,
				loaders: ["babel"],
				exclude: /node_modules/
			}    		
		]
	},

	plugins: [
	    // Order the modules and chunks by occurrence.
	    // This saves space, because often referenced modules
	    // and chunks get smaller ids.
	    new webpack.optimize.OccurenceOrderPlugin(),	
	    new webpack.optimize.UglifyJsPlugin({
	    	compressor: {
	    		warnings:false
	    	}
	    }),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}			
		})
	]
}