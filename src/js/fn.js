const mapk = (k)    => (e) => e[k]
const bynd = (o, k) => o[k].bind(o)

module.exports = {
  bynd,
  mapk
}
