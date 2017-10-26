import React, {Component, cloneElement} from 'react'
import {
  findDOMNode,
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer
} from 'react-dom'
import cx from 'classnames'
import {position, getOppositePlacement, isInViewport, transformSelf} from './utils'
import {css} from 'emotion'
import styled from 'react-emotion'
import Arrow from './Arrow'
// import './index.css'

class Tooltip extends Component {
  static defaultProps = {
    offsetParent: document.body,
    event: 'hover',
    arrowSize: 5,
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

  get positionStyle() {

  }

  get offset() {
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

  renderOverlay = () => {
    const {placement, tooltip, arrowSize} = this.props
    const targetOffset = this.offset
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
      <div
        // className={cx('Tooltip', `Tooltip--${finalPlacement}`)}
        // style={style}
        css={`
          position: absolute;
          border-radius: 4px;
          border: 1px solid #fff;
          background-color: #fff;
          font-size: 13px;
          line-height: 1.7;
          color: #354052;
          font-weight: 400;
          box-shadow: 0 5px 20px 0 rgba(0, 34, 20, .5);
          transform: ${transformSelf(placement, arrowSize)};
          top: ${style.top}px;
          left: ${style.left}px;
        `}
      >
        <div
          css={`
            position: relative;
            max-width: 300px;
            padding: 2px 10px;
          `}
          // className="Tooltip-content"
          ref={(node) => { this.tooltip = node }}
        >
          {tooltip}
        </div>
        <Arrow placement={finalPlacement} />
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
    renderSubtreeIntoContainer(this, this.renderOverlay(), this.mountDom)
  }

  close = () => {
    // unmountComponentAtNode(this.mountDom)
    // renderSubtreeIntoContainer(this, <noscript />, this.mountDom)
  }

  render() {
    return cloneElement(this.props.children, this.triggerProps)
  }
}

export default Tooltip
