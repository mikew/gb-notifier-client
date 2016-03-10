var Parched = require('parched')
Parched.setup(require('./ParchedConfig'))

var gulp = require('gulp')
var buildPromise = require('electron-builder/out/builder').build
var exec = require('child_process').exec

gulp.task('build-icons', false, (done) => {
  exec('script/build-icons', (err) => {
    done(err)
  })
})

gulp.task('build-electron', 'Build and package Electron app', ['build-icons'], (done) => {
  return buildPromise({
    appDir: 'public',
    out: 'dist',
    dist: true,
    platform: ['all'],
    arch: 'all',
  })
})
