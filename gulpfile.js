var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var server = require('gulp-server-livereload');

gulp.task('webserver',function()
{
  gulp.src('./')
      .pipe(server({
        livereload:true,
        directoryListing:false,
        defaultFile:'index.html',
        open:true
      }));
});
 

gulp.task('compress', function (cb) {
  pump([
        gulp.src(['app/*.js','app/*/*.js']),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});