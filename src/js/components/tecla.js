import React, { Component, PropTypes } from 'react'

class Tecla extends Component {
  constructor (props, context) {
    super(props, context)
  }

  handleTouchStart () {
    const event = new Event('ng:note:play')
    event.note = this.props.note
    document.dispatchEvent(event)
    setTimeout(() => this.handleTouchEnd(), 200)
  }

  handleTouchEnd () {
    const event = new Event('ng:note:stop')
    event.note = this.props.note
    document.dispatchEvent(event)
  }

  render () {
    const { note } = this.props

    return (
      <li onClick={this.handleTouchStart.bind(this)}>
        {note}
      </li>
    )
  }
}

Tecla.propTypes = {
  note: PropTypes.string.isRequired
}

module.exports = Tecla
