var webpack = require('webpack');
var production = process.env.NODE_ENV === 'production';
var ExtractPlugin = require('extract-text-webpack-plugin');

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name:      'main', // Move dependencies to our main file
        children:  true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
    }),
    new webpack.optimize.UglifyJsPlugin({
        mangle:   true,
        compress: {
            warnings: false, // Suppress uglification warnings
        },
    }),
    new ExtractPlugin('bundle.css', {allChunks: true}),
];

if (production) {
    plugins = plugins.concat([

        // This plugin looks for similar chunks and files
        // and merges them for better caching by the user
        new webpack.optimize.DedupePlugin(),

        // This plugins optimizes chunks and modules by
        // how much they are used in your app
        new webpack.optimize.OccurenceOrderPlugin(),

        // This plugin prevents Webpack from creating chunks
        // that would be too small to be worth loading separately
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200, // ~50kb
        }),

        // This plugin minifies all the Javascript code of the final bundle
        new webpack.optimize.UglifyJsPlugin({
            mangle:   true,
            compress: {
                warnings: false, // Suppress uglification warnings
            },
        }),

        // This plugins defines various variables that we can set to false
        // in production to avoid code related to them from being compiled
        // in our final bundle
        new webpack.DefinePlugin({
            __SERVER__:      !production,
            __DEVELOPMENT__: !production,
            __DEVTOOLS__:    !production,
            'process.env':   {
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),

    ]);
}

module.exports = {
    debug:   false,
    devtool: production ? false : 'eval',
    entry: [
        //'webpack-dev-server/client?http://1.0.0.1:8080', // WebpackDevServer host and port
        //'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './src'
      ],
    output: {
    	path: __dirname + "/builds",
        filename: 'bundle.js',
        publicPath: 'builds/'
    },
    module:{
    	loaders: [
    		{
    			test: /\.js/,
    			loader: 'babel',
    			exclude: /node_modules/,
				query: {
					presets: ['es2015']
				},
				include: __dirname + '/src',
    		},
			{
                test:   /\.scss/,
                loader: ExtractPlugin.extract('style', 'css!sass', { publicPath: './' })
            },
			{
			    test:   /\.html/,
			    loader: 'html',
			},
            {
                test:   /\.(png|gif|jpe?g|svg)$/i,
                loader: 'url',
                query: {
                  limit: 10000,
                }
            }
    	],
        preLoaders: [
            {
                test: /\.js/,
                loader: 'eslint',
            }
        ],
    },
    plugins: plugins,
};