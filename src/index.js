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

  componentDidUpdate() {
    console.log('componentDidUpdate', this.tooltip)
    if (this.tooltip) {
      const bcr = this.tooltip.getBoundingClientRect()
      if (!isInViewport(bcr)) {
        const oppositePlacement = getOppositePlacement(placement)
        console.log('not in', bcr, 'oppositePlacement', oppositePlacement)
        const style = position(oppositePlacement, this.offset)
        // finalPlacement = oppositePlacement
        renderSubtreeIntoContainer(this, this.renderOverlay(oppositePlacement), this.mountDom)
      } else {
        console.log('in viewportRect')
      }
    }
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

  renderOverlay = (placement = this.props.placement) => {
    const {tooltip, arrowSize} = this.props
    const style = position(placement, this.offset)
    // this.setState({style})
    // let finalPlacement = placement
    // console.log('this.tooltip', Boolean(this.tooltip))
    // let bcr
    // if (this.tooltip) {
    //   bcr = this.tooltip.getBoundingClientRect()
    // } else {
      // const delta = {
      //   left: -targetOffset.width,
      //   right: targetOffset.width,
      //   top: -targetOffset.height,
      //   bottom: targetOffset.height,
      // }
      // bcr = {...style, bottom: style.top, right: style.left}
      // // console.log('bcr', bcr, 'placement', placement, 'bcr[placement]', bcr[placement], 'delta[placement]', delta[placement])
      // bcr[placement] += delta[placement]
    // }

    return (
      <div
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
          ref={(node) => { this.tooltip = node }}
        >
          {tooltip}
        </div>
        <Arrow placement={placement} />
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
    renderSubtreeIntoContainer(this, <noscript />, this.mountDom)
  }

  render() {
    return cloneElement(this.props.children, this.triggerProps)
  }
}

export default Tooltip
