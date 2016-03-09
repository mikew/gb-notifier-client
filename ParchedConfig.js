var Parched = require('parched')
var gulp = require('gulp')
var electron = require('electron-connect').server.create({
  path: 'public'
})
var hasBuiltOnce = false

function startElectronConnect (done) {
  if (!global.isWatching) {
    done()
    return
  }

  if (hasBuiltOnce) {
    done()
    return
  }

  // Start electron process
  electron.start()

  // Restart electron process
  gulp.watch([
    'app/assets/electron-main.js',
    'Parched-config.js',
    'Gulpfile.js',
  ], electron.restart)

  hasBuiltOnce = true
  done()
}

module.exports = {
  gulp: gulp,

  parchedDidBuild: function (doneParched) {
    startElectronConnect(doneParched)
  },

  webapp: {
    files: {
      order: {
        before: [
          /jquery\.js/,
          /bootstrap\.js/,
        ],
      },
    },
  },

  plugins: {
    'parched-babel': {
      stage: 0,
    },

    'parched-sass': {
      indentedSyntax: true,
    }
  }
}
