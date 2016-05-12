var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var WebpackDevServer = require('webpack-dev-server');

function startWebpackDevServer (config) {
  config.devtool = "sourcemap";
  config.debug = true;
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    stats: {
        cached: false,    // HERE!
        colors: true
    }
  }).listen(8080, 'localhost', function(err) {
    if(err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    };

    gutil.log('[webpack-dev-server]', 'http://localhost:8080');
  });
}

gulp.task('webpack-dev-server', function() {
	gutil.log('Begin to start webpack-dev-server', webpackConfig);
 	startWebpackDevServer(webpackConfig);
 	gutil.log('Webpack-dev-server start successfully');
});

gulp.task('dev', ['webpack-dev-server']);