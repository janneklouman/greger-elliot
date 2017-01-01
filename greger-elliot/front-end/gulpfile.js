var gulp            = require( 'gulp' );
var browserify      = require( 'browserify' );
var babelify        = require( 'babelify' );
var source          = require( 'vinyl-source-stream' );
var sass            = require( 'gulp-sass' );
var rename          = require( 'gulp-rename' );

// Compile sass
gulp.task('sass', function () {

    return gulp.src([
        './sass/app.scss'
    ])
        .pipe(sass())
        .pipe(rename('bundle.css'))
        .pipe(gulp.dest('dist/css'));

});

// Compile JS
gulp.task('browserify', function() {

    return browserify('./javascript/boot.js')
        .transform(babelify, { stage: 0 })
        .bundle()
        .on('error', function(e){
            console.log(e.message);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/javascript'));

});

gulp.task('watch', function() {

    gulp.watch('./javascript/**/*.js', ['browserify']);
    gulp.watch('./sass/**/*.scss', ['sass']);

});