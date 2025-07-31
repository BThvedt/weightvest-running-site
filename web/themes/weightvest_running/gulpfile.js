const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const cached = require("gulp-cached");

// Build raw utility styles without purging
function buildSSU() {
  return src("simple-scss-utilities/**/*.scss")
    .pipe(cached("build")) // cache unpurged build
    .pipe(sass())
    .pipe(concat("ssu.css"))
    .pipe(dest("css"));
}

// SCSS for global styles
function buildGlobalStyles() {
  return (
    src("scss/**/*.scss") // <-- your second folder
      // .pipe(cached("global")) // only changed files
      .pipe(sass())
      .pipe(concat("style.css"))
      .pipe(cleanCSS())
      .pipe(dest("css"))
  );
}

// SCSS with PurgeCSS
function buildPurgedStyles() {
  return src("simple-scss-utilities/**/*.scss")
    .pipe(cached("styles")) // only changed files
    .pipe(sass())
    .pipe(
      purgecss({
        content: [
          "../../modules/custom/react_components/**/*.js",
          "./templates/**/*.twig",
        ],
        defaultExtractor: (content) => {
          const defaultSelectors = content.match(/[A-Za-z0-9_-]+/g) || [];
          const extendedSelectors = content.match(/[^<>"=\s]+/g) || [];
          return defaultSelectors.concat(extendedSelectors);
        },
      })
    )
    .pipe(concat("ssu.css"))
    .pipe(dest("css"));
}

exports.build = parallel(buildSSU, buildGlobalStyles);
exports.watch = () => {
  watch("scss/**/*.scss", buildGlobalStyles);
};
exports.purge = buildPurgedStyles;
