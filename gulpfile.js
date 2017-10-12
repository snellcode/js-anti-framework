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

gulp.task('es6', () => browserify({entries: 'src/main.es6', extensions: ['.es6'], debug: true})
	.transform(babelify)
	.bundle().on('error', jsError)
	.pipe(source('main.js'))
	.pipe(gulp.dest('dist/js')));

gulp.task('scss', () => gulp.src('src/main.scss')
	.pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 10 versions'], cascade: false}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css')));

gulp.task('build', ['clean'], () => gulp.start('es6', 'scss'));

gulp.task('watch', ['build'], () => ['es6', 'scss']
	.map(x => gulp.watch(`src/**/*.${x}`, [x])));

gulp.task('default', ['watch']);
