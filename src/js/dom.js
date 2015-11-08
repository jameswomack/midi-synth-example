const listen = (emitter, type, handler) => {
  emitter.addEventListener(type, handler)

  return () =>
    emitter.removeEventListener(type, handler)
}

const listenm = (emitter, type, handler, mapper) =>
  listen(emitter, type, e => handler(mapper(e)))

module.exports = {
  // Use me to experiment with HMR
  foo: 'barxxxx',

  listenm,

  listen
}
