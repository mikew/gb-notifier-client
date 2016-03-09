var fs = require('fs')
var menubar = require('menubar')

var mbOpts = {
  'preload-window': true,
}

if (!fs.existsSync(process.resourcesPath + '/app.asar')) {
  mbOpts.index = 'http://localhost:3000/'
}

var mb = menubar(mbOpts)
var ipcMain = require('electron').ipcMain

ipcMain.on('quit', function () {
  mb.app.quit()
})

//mb.on('ready', function () {
  //console.log('app is ready')
//})

//mb.on('after-create-window', function () {
  //if (fs.existsSync(process.resourcesPath + '/app.asar')) {
    //mb.window.loadUrl('file://' + __dirname + '/index.html')
  //} else {
    //mb.window.loadUrl('http://localhost:3000/')
  //}
//})
