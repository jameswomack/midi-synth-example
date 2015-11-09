const partial  = require('lodash.partial')
const domready = require('domready')
const noteFromMIDI = require('music.note.from-midi')
const midiFromNote = require('music.note.midi')

import React from 'react'
const { render } = require('react-dom')

let App = require('./containers/app')

const synth = require('./synth')
const { listen, listenm } = require('./dom')
const { mapk } = require('./fn')

const mapKeyCode = mapk('keyCode')
const _          = partial.placeholder

// TODO ~ constants file
const NOTE_PLAYED  = 'ng:note:played'
const NOTE_STOPPED = 'ng:note:stopped'
const NOTE_PLAY  = 'ng:note:play'
const NOTE_STOP = 'ng:note:stop'

let listenk
let listend
let playListener
let stopListener
let keydownListener
let keyupListener

const _render = () => {
  render(
    <div><App /></div>,
    document.getElementById('keys')
  )
}

const onDomready = () => {
  playListener && playListener()
  stopListener && stopListener()
  keydownListener &&  keydownListener()
  keyupListener && keyupListener()

  listenk = partial(listenm, document.body, _, _, mapKeyCode)

  // TODO ~ DRY
  playListener = listen(document, NOTE_PLAY, (e) => {
    const note = e.note

    if (!note) {
      return
    }

    synth.noteOn(midiFromNote(note))

    const event = new Event(NOTE_PLAYED)
    event.note = note
    document.dispatchEvent(event)
  })

  stopListener = listen(document, NOTE_STOP, (e) => {
    const note = e.note

    if (!note) {
      return
    }

    synth.noteOff(midiFromNote(note))

    const event = new Event(NOTE_STOPPED)
    event.note = note
    document.dispatchEvent(event)
  })

  keydownListener = listenk('keydown', (keyCode) => {
    synth.noteOn(keyCode)
    const note = noteFromMIDI(keyCode)
    if (!note) {
      return
    }

    const event = new Event(NOTE_PLAYED)
    event.note = note
    document.dispatchEvent(event)
  })

  keyupListener = listenk('keyup', (keyCode) => {
    synth.noteOff(keyCode)
    const note = noteFromMIDI(keyCode)
    if (!note) {
      return
    }

    const event = new Event(NOTE_PLAYED)
    event.note = note
    document.dispatchEvent(event)
  })

  listen(document, 'visibilitychange', () =>
      document.hidden && synth.activeFrequencies.forEach(synth.frequencyOff.bind(synth)))

  _render()
}

domready(onDomready)

if (module.hot) {
  module.hot.accept()
  module.hot.accept('./containers/app', () => {
    App = require('./containers/app')
    _render()
  })
  module.hot.dispose(onDomready)
}
