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
    pos: {top: 0, left: 0},
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

    this.setState({pos: expected.offset, placement: finalPlacement})
  }

  handleScroll = () => {
    requestAnimationFrame(this.adjustPosition)
  }

  handleRef = (node) => {
    this.ref = node
    this.props.onRef(node)
  }

  getDefaultStyle(style) {
    return Object.assign({
      position: 'absolute',
      padding: '2px 10px',
      lineHeight: 1.7,
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#fff',
      backgroundColor: '#fff',
      fontSize: 13,
      color: '#354052',
      boxShadow: '0 5px 20px 0 rgba(0, 34, 20, .5)',
    }, style)
  }

  render() {
    const {arrowSize, children, style} = this.props
    const {pos, placement} = this.state
    
    return (
      <div
        ref={this.handleRef}
        css={`
          top: ${pos.top}px;
          left: ${pos.left}px;
          ${this.getDefaultStyle(style)}
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
