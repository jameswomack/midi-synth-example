const partial  = require('lodash.partial')
const domready = require('domready')

const synth = require('./synth')
const { listen, listenm } = require('./dom')
const { mapk, bynd } = require('./fn')

const mapKeyCode = mapk('keyCode')
const _          = partial.placeholder

let listenk
let keydownListener
let keyupListener
let keyupWriteListener

const onDomready = () => {
  keydownListener &&  keydownListener()
  keyupListener && keyupListener()
  keyupWriteListener && keyupWriteListener()

  listenk = partial(listenm, document.body, _, _, mapKeyCode)
  keydownListener = listenk('keydown', bynd(synth, 'noteOn'))
  keyupListener = listenk('keyup', bynd(synth, 'noteOff'))
  keyupWriteListener = listen(document.body, 'keyup', (e) => { e.currentTarget.innerHTML = String('!' + e.keyCode) })
}

domready(onDomready)

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(onDomready)
}
