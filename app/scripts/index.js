// Electron module paths get confused when loading a page over HTTP
function injectModulesPath () {
  const path = electronRequire('path')
  const globalPaths = electronRequire('module').globalPaths
  var appModulesPath = path.join(window.electron.remote.app.getAppPath(), 'node_modules')
  if (globalPaths.indexOf(appModulesPath) === -1) {
    globalPaths.push(appModulesPath)
  }
}

injectModulesPath()

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import EventEmitter from 'events'

const { ipcRenderer } = window.electron
const notifier = window.electronRequire('node-notifier')
const path = window.electronRequire('path')
const appPath = window.electron.remote.app.getAppPath()

notifier.notify({
  title: 'GiantBomb',
  message: 'new stream, yo',
  icon: path.join(appPath, 'IconTemplate@2x.png'),
  //icon: 'http://static.giantbomb.com/uploads/scale_super/0/39/2832532-screenhunter_1109+mar.jpg',
})

class Vent extends EventEmitter {
  constructor () {
    super()
    const events = [
      'setSettingsVisible',
    ]

    events.forEach((eventName) => {
      this[eventName] = this.emit.bind(this, eventName)
      this[`${eventName}Changed`] = this.on.bind(this, eventName)
    })
  }
}

const vent = new Vent()

class App extends Component {
  render () {
    return <div>
      <Promo />
      <SettingsButton />
    </div>
  }
}

class SettingsButton extends Component {
  state = {
    isVisible: false,
  }

  render () {
    return <button className="SettingsButton" onClick={this.handleClick}>
      Settings
    </button>
  }

  handleClick = event => {
    event.preventDefault()
    const isVisible = !this.state.isVisible
    vent.setSettingsVisible(isVisible)
    this.setState({ isVisible })
  }
}

class Promo extends Component {
  state = {
    data: null,
    isMuted: false,
  }

  componentDidMount () {
    vent.setSettingsVisibleChanged((isVisible) => {
      this.setState({
        isMuted: isVisible,
      })
    })

    //fetch('http://localhost:5000/')
    fetch('http://gb-notifier-server.herokuapp.com')
        .then(res => res.json())
        .then(data => this.setState({ data }))
  }

  render () {
    if (this.state.data === null) {
      return <div>Loading</div>
    }

    const containerStyle = {
      backgroundImage: `url(${this.state.data.image})`,
    }

    let className = 'Promo'
    if (this.state.isMuted) {
      className += ' isMuted'
    }

    return <div className={className} style={containerStyle}>
      <div className="Promo__gradient" />
      <div className="Promo__contents">
        <img src="images/logo.png" />
        <br />
        Latest Content
        <br />
        {this.state.data.title}
      </div>
      <div className="Promo__overlay" />
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('cosmos'))
