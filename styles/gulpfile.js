// You'll need to (in THIS directory - yes, really)
// npm install gulp gulp-sass
// Then, to start gulp watching (while developing), rung
// gulp default
// in a command prompt and leave it going in the background

// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(cb) {
    gulp
        .src('*.scss')
        .pipe(sass())
        .pipe(
            gulp.dest(function(f) {
                return f.base;
            })
        );
    cb();
});

gulp.task(
    'default',
    gulp.series('sass', function(cb) {
        gulp.watch('*.scss', gulp.series('sass'));
        cb();
    })
);