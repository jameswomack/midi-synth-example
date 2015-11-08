const partial  = require('lodash.partial')
const domready = require('domready')

const synth = require('./synth')
const { listen, foo } = require('./dom')
const { mapk, bynd } = require('./fn')

const mapKeyCode = mapk('keyCode')
const _          = partial.placeholder

let listenk
let keydownListener
let keyupListener

const onDomready = () => {
  document.write(foo)
  listenk = partial(listen, document.body, _, _, mapKeyCode)
  keydownListener = listenk('keydown', bynd(synth, 'noteOn'))
  keyupListener   = listenk('keyup',   bynd(synth, 'noteOff'))
}

domready(onDomready)

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => {
    keydownListener()
    keyupListener()
    onDomready()
  })
}
