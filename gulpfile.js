const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("gulp-autoprefixer");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

gulp.task("default", function () {
    gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
    gulp.watch("src/ejs/**/*.ejs", gulp.series("ejs"));
});

// Sass
gulp.task("sass", function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./static-sample/assets/css'));
});

// EJS
gulp.task("ejs", function () {
    return gulp.src(["src/ejs/**/*.ejs", '!' + "src/ejs/**/_*.ejs"])
        .pipe(ejs({}, {}, { ext: '.html' }))
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(gulp.dest("./static-sample"));
});


// browser-sync
gulp.task('build-server', function (done) {
    browserSync.init({
        server: {
            baseDir: "./static-sample"
        }
    });
    done();
    console.log('Server was launched');
});

// ブラウザのリロード
gulp.task('browser-reload', function (done) {
    browserSync.reload();
    done();
    console.log('Browser reload completed');
});

// 監視ファイル
gulp.task('watch-files', function (done) {
    gulp.watch("./static-sample*/*.html", gulp.task('browser-reload'));
    gulp.watch("./static-sample*/*/*.css", gulp.task('browser-reload'));
    done();
    console.log('gulp watch started');
})

gulp.task('bs', gulp.series('build-server', 'watch-files', function (done) {
    done();
    console.log('Default all task done!');
}));