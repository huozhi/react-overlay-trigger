import React from 'react'
import {css} from 'emotion'
import Arrow from './Arrow'
import {position, isInViewport, getOppositePlacement} from './utils'

class Popup extends React.Component {
  static defaultProps = {
    onRef() {},
    arrowSize: 5,
    placement: 'left',
  }

  state = {
    style: {top: 0, left: 0},
    placement: this.props.placement,
  }

  componentDidMount() {
    this.adjustPosition()
    window.addEventListener('resize', this.handleScroll)
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScroll)
    window.removeEventListener('scroll', this.handleScroll)
  }

  adjustPosition = () => {
    const {target, arrowSize, offsetParent, placement} = this.props
    // TODO: default bcr

    let expected = position(placement, this.ref, target, offsetParent, arrowSize)
    let finalPlacement = placement

    if (!isInViewport(expected.rect)) {
      finalPlacement = getOppositePlacement(placement)
      expected = position(finalPlacement, this.ref, target, offsetParent, arrowSize)
    }

    this.setState({style: expected.offset, placement: finalPlacement})
  }

  handleScroll = () => {
    requestAnimationFrame(this.adjustPosition)
  }

  handleRef = (node) => {
    this.ref = node
    this.props.onRef(node)
  }

  render() {
    const {arrowSize, children} = this.props
    const {style, placement} = this.state

    return (
      <div
        ref={this.handleRef}
        // TODO: customized style
        css={`
          position: absolute;
          top: ${style.top}px;
          left: ${style.left}px;
          padding: 2px 10px;
          line-height: 1.7;
          border-radius: 4px;
          border: 1px solid #fff;
          background-color: #fff;
          font-size: 13px;
          color: #354052;
          box-shadow: 0 5px 20px 0 rgba(0, 34, 20, .5);
        `}
      >
        <div
          css={`
            position: relative;
            max-width: 300px;
          `}
        >
          {children}
        </div>
        <Arrow placement={placement} />
      </div>
    )
  }
}

export default Popup
