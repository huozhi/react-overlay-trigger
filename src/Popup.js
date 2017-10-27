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
    const {placement, target, onRef} = this.props
    // TODO: default bcr
    // console.log('this.ref', this.ref)
    let rect = position(placement, this.ref, target)
    let finalPlacement = placement
    console.log('origin rect', rect)
    if (!isInViewport(rect)) {
      finalPlacement = getOppositePlacement(placement)
      rect = position(finalPlacement, this.ref, target)
      console.log('getOppositePlacement rect', rect)
    }
    this.setState({style: rect, placement: finalPlacement})
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
        ref={node => (this.ref = node)}
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
        >
          {children}
        </div>
        <Arrow placement={placement} />
      </div>
    )
  }
}

export default Popup
