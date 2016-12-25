import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
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

  handleMouseEnter = (e) => {
    handleMouseOverOut(() => {
      this.setState({show: true})
    }, e)
  }

  handleMouseLeave = (e) => {
    handleMouseOverOut(() => {
      this.setState({show: false})
    }, e)
  }

  handleClick = () => {
    this.setState({show: !this.state.show})
  }

  getOffset = (node) => {
    if (node) {
      const dom = typeof node === 'function' ? findDOMNode(node) : node
      return dom.getBoundingClientRect()
    }
    return {}
  }

  getPositionStyle = (position) => {
    const bodyRect = document.body.getBoundingClientRect()
    const targetOffset = this.getOffset(this.target)

    const style = {}

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
    const {children, component: Component='span', position, tooltip, ...rest} = this.props
    const triggerProps = {
      // onMouseOver: this.handleMouseEnter,
      // onMouseOut: this.handleMouseLeave,
      onClick: this.handleClick,
    }

    const style = this.getPositionStyle(position)

    return (
      <Component
        {...rest}
        {...triggerProps}
      >
        {React.cloneElement(children, {ref: (node) => { this.target = node } })}
        {this.state.show &&
          <Portal className={cx('Tooltip', `Tooltip--${position}`)} style={style}>
            <div className="Tooltip-content" ref={(node) => { this.tooltip = node }}>
              {tooltip}
            </div>
          </Portal>
        }
      </Component>
    )
  }
}

Tooltip.defaultProps = {
  position: 'right'
}
