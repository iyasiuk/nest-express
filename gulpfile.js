const { series, src, dest } = require('gulp');
const clean = require('gulp-clean');

function clearPublic() {
  return src(['public/**/*.js', 'public/**/*.map', 'public/**/*.css', 'public/assets/*', '!public/main.css'], { read: false })
    .pipe(clean())
}
function copyClientBuildToPublic() {
  return src(['client/build/*','client/build/**/*']).pipe(dest('public/'));
}
exports.default = series(clearPublic, copyClientBuildToPublic);