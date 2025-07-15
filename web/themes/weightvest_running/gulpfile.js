const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");

function buildStyles() {
  return src("simple-scss-utilities/**/*.scss")
    .pipe(sass())
    .pipe(
      purgecss({
        content: ["../../modules/custom/react_components/**/*.js"],
        defaultExtractor: (content) => {
          const defaultSelectors = content.match(/[A-Za-z0-9_-]+/g) || [];
          const extendedSelectors = content.match(/[^<>"=\s]+/g) || [];
          return defaultSelectors.concat(extendedSelectors);
        },
      })
    )
    .pipe(dest("src/css"));
}

function watchTask() {
  watch(["simple-scss-utilities/**/*.scss", "*.html"], buildStyles);
}

exports.default = series(buildStyles, watchTask);
