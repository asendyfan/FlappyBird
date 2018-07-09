var path=require('path')
module.exports={
	entry:'./game.js',
	output:{
		path:path.resolve(__dirname,'./dist'),
		filename:'bundle.js'
	},
	module:{
		loaders:[
		{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader:'babel-loader'
		}]
	},
}