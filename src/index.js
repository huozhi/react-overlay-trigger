import React, {Component, cloneElement} from 'react'
import {
  findDOMNode,
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer
} from 'react-dom'
import cx from 'classnames'
import Portal from './Portal'
import './index.css'

const handleMouseOverOut = (handler, e) => {
  // Simple implementation of mouseEnter and mouseLeave.
  // React's built version is broken: https://github.com/facebook/react/issues/4251
  // for cases when the trigger is disabled and mouseOut/Over can cause flicker
  // moving from one child element to another.
  const target = e.currentTarget
  const related = e.relatedTarget || e.nativeEvent.toElement

  if (!related || related !== target && !target.contains(related)) {
    handler(e)
  }
}

export default class Tooltip extends Component {
  state = {
    show: false
  }

  overlay = null
  mountDom = null
  targetOffset = {}

  componentDidMount() {
    this.mountDom = document.createElement('div')
    this.renderOverlay()
    this.targetOffset = this.getOffset()
  }

  componentDidUpdate() {
    this.renderOverlay()
    this.targetOffset = this.getOffset()
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.mountDom)
    this.mountDom = null
  }

  handleMouseEnter = (e) => {
    handleMouseOverOut(() => {
      this.targetOffset = this.getOffset()
      this.setState({show: true})
    }, e)
  }

  handleMouseLeave = (e) => {
    handleMouseOverOut(() => {
      this.setState({show: false})
    }, e)
  }

  handleClick = () => {
    const {show} = this.state
    if (!show) {
      this.targetOffset = this.getOffset()
    }
    this.setState({show: !show})
  }

  getOffset = () => {
    return findDOMNode(this).getBoundingClientRect()
  }

  makeOverlay = () => {
    const {position, tooltip} = this.props
    const style = this.getPositionStyle(position)
    return (
      <Portal>
        {this.state.show &&
          <div className={cx('Tooltip', `Tooltip--${position}`)} style={style}>
            <div className="Tooltip-content" ref={(node) => { this.tooltip = node }}>
              {tooltip}
            </div>
          </div>
        }
      </Portal>
    )
  }

  renderOverlay = () => {
    renderSubtreeIntoContainer(this, this.overlay, this.mountDom)
  }

  getPositionStyle = (position) => {
    const style = {}
    const targetOffset = this.targetOffset
    const bodyRect = document.body.getBoundingClientRect()

    const offsetTop = targetOffset.top - bodyRect.top
    const offsetBottom = targetOffset.bottom - bodyRect.top

    switch (position) {
      case 'top': {
        style.top = `${offsetTop}px`
        style.left = `${targetOffset.left + targetOffset.width / 2}px`
        break
      }
      case 'bottom': {
        style.top = `${offsetBottom}px`
        style.left = `${targetOffset.left + targetOffset.width / 2}px`
        break
      }
      case 'left': {
        style.left = `${targetOffset.left}px`
        style.top = `${offsetTop + targetOffset.height / 2}px`
        break
      }
      case 'right': {
        style.left = `${targetOffset.right}px`
        style.top = `${offsetTop + targetOffset.height / 2}px`
        break
      }
      default:
        break
    }
    return style
  }

  render() {
    const triggerProps = {
      onMouseOver: this.handleMouseEnter,
      onMouseOut: this.handleMouseLeave,
      onClick: this.handleClick,
    }

    this.overlay = this.makeOverlay()
    return cloneElement(this.props.children, triggerProps)
  }
}

Tooltip.defaultProps = {
  position: 'right'
}
