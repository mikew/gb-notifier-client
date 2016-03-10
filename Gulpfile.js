var Parched = require('parched')
Parched.setup(require('./ParchedConfig'))

var gulp = require('gulp')
var buildPromise = require('electron-builder/out/builder').build

gulp.task('build-electron', 'Build and package Electron app', (done) => {
  return buildPromise({
    appDir: 'public',
    out: 'dist',
    dist: true,
    platform: ['all'],
    arch: 'all',
  })
})
