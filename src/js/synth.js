const Synth   = require('midi-synth')

const s = new Synth({
  // print info messages
  debug         : true,

  bindToInputs  : false
})

module.exports = s
