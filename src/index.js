import React, {Component, cloneElement} from 'react'
import {
  findDOMNode,
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer
} from 'react-dom'
import cx from 'classnames'
import Portal from './Portal'
import {position, getOppositePlacement, isInViewport} from './utils'
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
    this.targetOffset = this.getOffset()
    this.setState({show: !show})
  }

  getOffset = () => {
    return findDOMNode(this).getBoundingClientRect()
  }

  makeOverlay = () => {
    const {placement, tooltip} = this.props
    let style = position(placement, this.targetOffset)
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
      style = position(oppositePlacement, this.targetOffset)
      finalPlacement = oppositePlacement
    }

    const popup = (
      <div className={cx('Tooltip', `Tooltip--${finalPlacement}`)} style={style}>
        <div className="Tooltip-content" ref={(node) => { this.tooltip = node }}>
          {tooltip}
        </div>
      </div>
    )

    return this.state.show ? (
      <Portal>
         {popup}
      </Portal>
    ) : <noscript />
  }

  renderOverlay = () => {
    renderSubtreeIntoContainer(this, this.overlay, this.mountDom)
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
