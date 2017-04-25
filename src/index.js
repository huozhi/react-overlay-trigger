import React, {Component, cloneElement} from 'react'
import {
  findDOMNode,
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer
} from 'react-dom'
import cx from 'classnames'
import {position, getOppositePlacement, isInViewport} from './utils'
import './index.css'


class Tooltip extends Component {
  static defaultProps = {
    offsetParent: document.body,
    event: 'hover',
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

  handleMouseEnter = () => {
    this.open()
  }

  handleMouseLeave = () => {
    this.close()
  }

  handleClick = () => {
    if (this.tooltip) {
      this.close()
    } else {
      this.open()
    }
    const {children} = this.props
    if (children && children.props.onClick) {
      children.props.onClick()
    }
  }

  getOffset = () => {
    const parentBcr = this.props.offsetParent.getBoundingClientRect()
    const bcr = findDOMNode(this).getBoundingClientRect()
    return {
      left: bcr.left,
      right: bcr.right,
      width: bcr.width,
      height: bcr.height,
      top: bcr.top - parentBcr.top,
      bottom: bcr.bottom - parentBcr.top,
    }
  }

  makeOverlay = () => {
    const {placement, tooltip} = this.props
    const targetOffset = this.getOffset()
    let style = position(placement, targetOffset)
    let finalPlacement = placement

    const popupRect = this.tooltip
      ? this.tooltip.getBoundingClientRect()
      : {bottom: style.top, right: style.left}
    const bcr = {
      ...style,
      bottom: popupRect.bottom,
      right: popupRect.right,
    }

    if (!isInViewport(bcr)) {
      const oppositePlacement = getOppositePlacement(placement)
      style = position(oppositePlacement, targetOffset)
      finalPlacement = oppositePlacement
    }

    return (
      <div className={cx('Tooltip', `Tooltip--${finalPlacement}`)} style={style}>
        <div className="Tooltip-content" ref={(node) => { this.tooltip = node }}>
          {tooltip}
        </div>
      </div>
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
    renderSubtreeIntoContainer(this, this.makeOverlay(), this.mountDom)
  }

  close = () => {
    renderSubtreeIntoContainer(this, <noscript />, this.mountDom)
  }

  render() {
    return cloneElement(this.props.children, this.triggerProps)
  }
}

export default Tooltip
