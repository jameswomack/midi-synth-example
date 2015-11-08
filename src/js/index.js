const $       = require('domready')
const partial = require('lodash.partial')
const Synth   = require('midi-synth')

const s = new Synth({
  // print info messages
  debug         : true,

  bindToInputs  : false
})

const listen = (emitter, type, handler, mapper) =>
  emitter.addEventListener(type, e => handler(mapper(e)))

const mapk = (k)    => (e) => e[k]
const bynd = (o, k) => o[k].bind(o)

const mapKeyCode = mapk('keyCode')
const _          = partial.placeholder

$(() => {
  const listenk = partial(listen, document.body, _, _, mapKeyCode)
  listenk('keydown', bynd(s, 'noteOn'))
  listenk('keyup',   bynd(s, 'noteOff'))
})
