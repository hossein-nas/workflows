var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	compass = require('gulp-compass'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
];
var sassSources = ['components/sass/style.scss'];

gulp.task('coffee',function(){
	gulp.src(coffeeSources)
		.pipe(coffee({bare:true}).on('error',gutil.log))
		.pipe(gulp.dest('components/scripts'));
});

gulp.task('js',function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))

});

gulp.task('compass',function(){
	gulp.src(sassSources)
		.pipe(compass({
			css: 'builds/development/css',
			style: 'expanded',
			sass: 'components/sass',
			image: 'builds/development/images',
		})
			.on('error',gutil.log)
		)
		.pipe(gulp.dest('builds/development/css'))
});

gulp.task('watch',function(){
	gulp.watch(coffeeSources,['coffee']);
	gulp.watch(jsSources,['js']);
	gulp.watch('components/sass/*.scss',['compass']);
	
});

gulp.task('all',['coffee','js','compass']);
gulp.task('default',['all','watch']);