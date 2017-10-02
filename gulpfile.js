const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const clean = require('gulp-clean');

const jsError = function(err) {console.log('JS SyntaxError', err.message);this.emit('end');};

gulp.task('clean', () => gulp.src('dist', {read: false}).pipe(clean()));

gulp.task('js', () => browserify({entries: 'src/js/main.es6', extensions: ['.es6'], debug: true})
	.transform(babelify)
	.bundle().on('error', jsError)
	.pipe(source('main.js'))
	.pipe(gulp.dest('dist/js')));

gulp.task('css', () => gulp.src('src/css/main.scss')
	.pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 10 versions'], cascade: false}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css')));

gulp.task('build', ['clean'], () => gulp.start('js', 'css'));

gulp.task('watch', ['build'], () => [['css', 'scss'], ['js', 'es6']]
    .map(x => gulp.watch(`src/${x[0]}/**/*.${x[1]}`, [x[0]])));

gulp.task('default', ['watch']);
