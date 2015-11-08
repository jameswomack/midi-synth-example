const listen = (emitter, type, handler, mapper) => {
  emitter.addEventListener(type, e => handler(mapper(e)))

  return () =>
    emitter.removeEventListener(type, e => handler(mapper(e)))
}

module.exports = {
  // Use me to experiment with HMR
  foo: 'barxxxx',

  listen
}
