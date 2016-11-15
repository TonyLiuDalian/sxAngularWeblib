var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyJs = require('gulp-uglify');
var usemin = require('gulp-usemin');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var Q = require('q');
/**
*01-1  path
*/
var paths = {
  index: './www/views/index.html',
  venderJs:'./eduproject/vender/lib/**/*.js',  //to vender.js
  venderCss:'./eduproject/vender/lib/**/*.css', //to vender.css
  venderImages:'./eduproject/vender/lib/**/*.{jpg,png}', // to www/styles/images
  bowersJs: './bower_components/**/*.min.js', // to bowers.js
  bowersCss:'./bower_components/**/*.min.css', // to bowers.css
  bowersFont:'./bower_components/**/*.{ttf,woff,woff2,eof,svg,eot}', // to www/styles/font
  appJs: './eduproject/scripts/**/*.*', //to app.js
  appCss:'./eduproject/styles/css/**/*.css' // to app.css
};

/**
 * 02-1 vender .js concat
 */
 gulp.task('venderjsConcat',function(){
    return gulp.src(paths.venderJs)
    .pipe(concat('vender.js'))
    .pipe(gulp.dest('www/scripts'))
 });
 /**
 * 02-2 vender .css concat
 */
gulp.task('vendercssConcat',function(){
    return gulp.src(paths.venderCss)
    .pipe(concat('vender.css'))
    .pipe(gulp.dest('www/styles/css'))
 });
 /**
 * 02-3 vender image collection
 */
gulp.task('venderImagesCellection',function(){
  return gulp.src(paths.venderImages)
         //.pipe(rename({dirname:'/images'}))
         .pipe(gulp.dest('www/styles/images'));
});

/*
*03-1 bowers .min.js concat
*/
 /*gulp.task('bowersJsConcat',['venderjsConcat','vendercssConcat'],function(){
     return gulp.src(paths.bowersJs)
    .pipe(concat('bowers.js'))
    .pipe(gulp.dest('www/scripts/'))
 });*/
 gulp.task('bowersJsConcat',function(){
     var deferred = Q.defer();
     
     gulp.src(paths.bowersJs)
    .pipe(concat('sxAngularWebJslib.js'))
    .pipe(gulp.dest(''))

    return deferred.promise;
 });
/**
*04
*/
//测试自定义压缩文件
gulp.task('bowersJsMinifyjs',function(){

 return  gulp.src('sxAngularWebJslib.js')
  .pipe(concat('sxAngularWebJslib.min.js'))
  .pipe(minifyJs())
  .pipe(gulp.dest(''));

})


/*
* 03-2 bowers .css concat
*/
gulp.task('bowersCssConcat',['bowersCssMinifycss'],function(){
  
  var deferred = Q.defer();

   return gulp.src(paths.bowersCss)
    .pipe(concat('sxAngularWebCsslib.css'))
    .pipe(gulp.dest(''));

   return deferred.promise;
});


gulp.task('bowersCssMinifycss',function(){
   return gulp.src('sxAngularWebCsslib.css')
    .pipe(concat('sxAngularWebCsslib.min.css'))
    .pipe(minifyCss({
      keepSpecialComments: 0
     }))
    .pipe(gulp.dest(''));
});



/*03-3  move all font file fo bower model to www/styles/font/ */
gulp.task('bowersFontCellection',function(){
  return gulp.src(paths.bowersFont)
         .pipe(rename({dirname:'/fonts'}))
         .pipe(gulp.dest(''));
});

//main
gulp.task('build',['bowersJsConcat','bowersCssConcat','bowersFontCellection'],function(){
});

gulp.task('buildMin',['bowersJsMinifyjs','bowersCssMinifycss'],function(){
});

