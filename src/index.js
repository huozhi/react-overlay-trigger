import React, {Component, cloneElement} from 'react'
import {
  findDOMNode,
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer
} from 'react-dom'
import {defaultBcr} from './consts'
import Popup from './Popup'

const isFunction = fn => typeof fn === 'function'

class Tooltip extends Component {
  static defaultProps = {
    offsetParent: document.body,
    event: 'hover',
    arrowSize: 5,
  }

  state = {
    visible: false,
  }

  componentDidMount() {
    this.mountDom = document.createElement('div')
    document.body.appendChild(this.mountDom)
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.mountDom)
    document.body.removeChild(this.mountDom)
    this.mountDom = null
  }

  ensureExcuteChildMethod = (method) => {
    const child = this.props.children
    if (child && isFunction(child.props[method])) {
      child.props[method]()
    }
  }

  handleMouseEnter = () => {
    this.ensureExcuteChildMethod('onMouseEnter')
    this.open()
  }

  handleMouseLeave = () => {
    this.ensureExcuteChildMethod('onMouseLeave')
    this.close()
  }

  handlePupupRef = (node) => {
    this.tooltip = node
  }

  handleClick = () => {
    this.ensureExcuteChildMethod('onClick')
    if (this.state.visible) {
      this.close()
    } else {
      this.open()
    }
  }

  renderOverlay = () => {
    const element = findDOMNode(this)
    const {placement, tooltip, arrowSize, offsetParent} = this.props

    return (
      <Popup onRef={this.handlePupupRef} target={element} placement={placement} offsetParent={offsetParent}>
        {tooltip}
      </Popup>
    )
  }

  get triggerProps() {
    switch (this.props.event) {
      case 'hover':
        return {
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
        }
        break
      case 'click':
        return {
          onClick: this.handleClick,
        }
        break
      default:
        return {}
    }
  }

  open = () => {
    renderSubtreeIntoContainer(this, this.renderOverlay(), this.mountDom)
    this.setState({visible: true})
  }

  close = () => {
    renderSubtreeIntoContainer(this, <noscript />, this.mountDom)
    this.setState({visible: false})
  }

  render() {
    return cloneElement(this.props.children, this.triggerProps)
  }
}

export default Tooltip
