import React from 'react'
import ReactDOM from 'react-dom'
import Popup from './Popup'
import {position, isInViewport, getOppositePlacement} from './utils'

const isFunction = fn => typeof fn === 'function'

class Tooltip extends React.Component {
  static defaultProps = {
    offsetParent: document && document.body,
    event: 'hover',
    arrowSize: 5,
    placement: 'left',
  }
  
  state = {
    pos: {top: 0, left: 0},
    visible: false,
  }

  handleScroll = () => requestAnimationFrame(this.adjustPosition)

  componentDidMount() {
    this.mountNode = document.createElement('div')
    document.body.appendChild(this.mountNode)
    this.target = ReactDOM.findDOMNode(this)

    this.adjustPosition()
    window.addEventListener('resize', this.handleScroll)
    window.addEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(prevProps, prevState) {
    this.target = ReactDOM.findDOMNode(this)
    if (this.state.visible && !prevState.visible) {
      this.adjustPosition()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScroll)
    window.removeEventListener('scroll', this.handleScroll)
    document.body.removeChild(this.mountNode)
    this.mountNode = null
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

  handleClick = () => {
    this.ensureExcuteChildMethod('onClick')
    if (this.state.visible) {
      this.close()
    } else {
      this.open()
    }
  }

  adjustPosition = () => {
    if (!this.popup) { return; }
    const {arrowSize, offsetParent, placement} = this.props
    const target = this.target
    const overlay = ReactDOM.findDOMNode(this.popup)
    let expected = position(placement, overlay, target, offsetParent, arrowSize)
    let finalPlacement = placement

    if (!isInViewport(expected.rect)) {
      finalPlacement = getOppositePlacement(placement)
      expected = position(finalPlacement, overlay, target, offsetParent, arrowSize)
    }

    this.setState({pos: expected.offset, placement: finalPlacement})
  }

  renderOverlay = () => {
    const {tooltip, arrowSize, popupStyle} = this.props
    const {pos, placement} = this.state
    const popup = (
      <Popup
        pos={pos}
        style={popupStyle}
        arrowSize={arrowSize}
        placement={placement}
        ref={ref => this.popup = ref}
      >
        {tooltip}
      </Popup>
    )

    return ReactDOM.createPortal(popup, this.mountNode)
  }

  get triggerProps() {
    switch (this.props.event) {
      case 'hover':
        return {
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
        }
      case 'click':
        return {
          onClick: this.handleClick,
        }
      default:
        return {}
    }
  }

  open = () => {
    this.setState({visible: true})
  }

  close = () => {
    this.setState({visible: false})
  }

  render() {
    return (
      <React.Fragment>
        {React.cloneElement(this.props.children, this.triggerProps)}
        {this.state.visible && this.renderOverlay()}
      </React.Fragment>
    )
  }
}

export default Tooltip
