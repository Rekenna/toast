const { src, dest, parallel, series, watch } = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const babel = require("gulp-babel");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const zip = require("gulp-zip");
const size = require("gulp-size");
const imagemin = require("gulp-imagemin");
const clean = require("gulp-clean");
const browserSync = require("browser-sync").create();
const config = require("./config.js");

// Error Handler
function errorHandler(error) {
  notify.onError({
    title: error.title,
    message: error.code + ": " + error.name,
    sound: "Sosumi"
  })(error);
  // Display full error to console
  console.log(error);
  // this.emit(end);
}

// JavaScript
function js() {
  src("src/js/**/*.js")
    .pipe(plumber({ errorHandler }))
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(concat("app.min.js"))
    .pipe(dest("./dist/js", { sourcemaps: true }));

  // We have to do this so live/hot reloading works with Browser Sync
  browserSync.reload();
  return Promise.resolve("JS");
}

// Styles
function css() {
  src("src/scss/**/*.scss")
    .pipe(plumber({ errorHandler }))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./dist/css", { sourcemaps: true }))
    .pipe(browserSync.stream());

  // We have to do this so live/hot reloading works with Browser Sync
  // browserSync.reload();
  return Promise.resolve("CSS");
}

// Twig Templates
function twig() {
  src("src/views/**/*.twig")
    .pipe(plumber({ errorHandler }))
    .pipe(dest("./dist/views"));

  // We have to do this so live/hot reloading works with Browser Sync
  browserSync.reload();
  return Promise.resolve("TWIG");
}

// Image/Asset Handling
function img() {
  src("src/img/**/*.{png,svg,jpg,gif}")
    .pipe(plumber({ errorHandler }))
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        // don't remove IDs from SVGs, they are often used
        // as hooks for embedding and styling
        svgoPlugins: [{ cleanupIDs: false }]
      })
    )
    .pipe(dest("./dist/img"));

  // We have to do this so live/hot reloading works with Browser Sync
  browserSync.reload();
  return Promise.resolve("IMG");
}

// PHP File Watcher
// TODO: Add Code Sniffing?
function php() {
  // We have to do this so live/hot reloading works with Browser Sync
  browserSync.reload();
  return Promise.resolve("PHP");
}

// Copy Compiled Files into Build
function copyDist() {
  src("./dist/**/*").pipe(dest("./build/dist"));
  return Promise.resolve("Copied /dist/ into /build/");
}

// Build into `./build/`
function build() {
  src("vendor/**/*").pipe(dest("build/vendor"));
  src("lib/**/*").pipe(dest("build/lib"));
  src("./*.{png,gif,jpg,php,css}").pipe(dest("build"));
  return Promise.resolve("Created Build");
}

// Compress into a .zip for Upload if Needed
function compress() {
  src("build/*").pipe(zip("template.zip").pipe(dest("./")));
  return Promise.resolve("Compress Completed");
}

// Clean working/generated files
function cleanFiles() {
  src(["dist", "build", "*.zip"], { read: false, allowEmpty: true }).pipe(
    clean()
  );
  return Promise.resolve("Clean Completed");
}

// Watch for Changes + Live Reload
function develop() {
  browserSync.init({
    proxy: config.proxy
  });

  watch("src/js/**/*.js", js);
  watch("src/scss/**/*.scss", css);
  watch("src/views/**/*.twig", twig);
  watch("src/img/**/*", img);
  watch(["**/*.php", "!vendor/**/*.*"], php);
}

const compile = parallel(css, js, twig, img);

module.exports = {
  js,
  css,
  twig,
  img,
  php,
  compile: compile,
  watch: series(compile, develop),
  clean: cleanFiles,
  copyDist: copyDist,
  build: series(copyDist, build),
  zip: compress
};
