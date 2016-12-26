import React, {Component} from 'react'
import {
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer
} from 'react-dom'

class Portal extends Component {
  componentDidMount() {
    this.element = document.createElement('div')
    document.body.appendChild(this.element)
    this.renderPortal(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.renderPortal(nextProps)
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.element)
    document.body.removeChild(this.element)
  }

  renderPortal({domRef, ...rest}) {
    renderSubtreeIntoContainer(this, <div ref={domRef} {...rest} />, this.element)
  }

  render() {
    return null
  }
}

export default Portal
