# GiantBomb Notifier

A menubar application to notify you of live streams on
[GiantBomb](http://www.giantbomb.com/)

## Development

This app is built on Electron and Parched. The base is a standard
Parched app, and when built Electron runs `public/`.

The root `package.json` is for Parched, and `app/assets/package.json` is
for Electron. Use `window.electronRequire` to require things from
`app/assets/node_modules/`.
