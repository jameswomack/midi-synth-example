import React, { Component } from 'react'
import Tecla from '../components/tecla'

// TODO ~ constants file
const NOTE_PLAYED  = 'ng:note:played'
const NOTE_STOPPED = 'ng:note:stopped'

let _notePlayed  = null
let _noteStopped = null

class App extends Component {
  getOnNotePlayed () {
    if (!_notePlayed) {
      const self = this
      _notePlayed = (e) => {
        self.setState({
          notes : self.state.notes.add(e.note)
        })
      }
    }

    return _notePlayed
  }

  getOnNoteStopped () {
    if (!_noteStopped) {
      const self = this
      _noteStopped = (e) => {
        if (self.state.notes.delete(e.note)) {
          const notes = new Set()
          Object.assign(notes, self.state.notes)
          self.setState({
            notes : notes
          })
        } else {
          const notes = new Set()
          e.note && self.state.notes.add(e.note)
          Object.assign(notes, self.state.notes)
          self.setState({
            notes : notes
          })

        }
      }
    }

    return _noteStopped
  }

  componentDidMount () {
    // TODO ~ Use listen...
    document.addEventListener(NOTE_PLAYED, this.getOnNotePlayed())
    document.addEventListener(NOTE_STOPPED, this.getOnNoteStopped())
  }

  componentWillUnmount () {
    // TODO ~ Use listen...
    document.removeEventListener(NOTE_PLAYED, this.getOnNotePlayed())
    document.removeEventListener(NOTE_STOPPED, this.getOnNoteStopped())
  }

  render () {
    if (!(this.state && this.state.notes)) {
      this.state = { }
      this.state.notes = new Set()
    }

    return (
      <div>
        {Array.from(this.state.notes).map(note =>
          <Tecla key={note} note={note} />
        )}
      </div>
    )
  }
}

module.hot && module.hot.accept()

module.exports = App
