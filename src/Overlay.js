import React from 'react'
import ReactDOM from 'react-dom'
import {position} from './utils'

const overlayTranslations = {
  left: ['-100%', '-50%'],
  right: ['0', '-50%'],
  top: ['-50%', '-100%'],
  bottom: ['-50%', '0'],
}

class Overlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      offsetTop: 0,
      offsetLeft: 0,
      container: props.container,
    }
  }

  componentDidMount() {
    this.adjustPosition()
  }

  getStyle = () => {
    const {offsetTop, offsetLeft} = this.state
    const {placement} = this.props
    const diff = overlayTranslations[placement]
    const transforms = `translate3d(${offsetLeft}px, ${offsetTop}px, 0) translate(${diff[0]}, ${diff[1]})`

    return {
      position: 'absolute',
      left: 0,
      top: 0,
      transform: transforms,
      WebkitTransform: transforms,
      MozTransform: transforms,
      msTransform: transforms,
    }
  }

  adjustPosition = () => {
    const {container} = this.state
    const triggerReference = this.props.target.current
    if (!triggerReference || !container) { return }
    const targetNode = ReactDOM.findDOMNode(triggerReference)
    const {placement, arrowProps} = this.props
    const expected = position(placement, targetNode, container, arrowProps.size)
    const {top, left} = expected.offset
    this.setState({offsetTop: top, offsetLeft: left})
  }

  componentDidUpdate(prevProps) {
    // resolve dom node change
    if (prevProps.container !== this.props.container) {
      this.setState({container: this.props.container})
    }
  }

  render() {
    const {children} = this.props
    const {container} = this.state
    if (!container || !children) return null
    return (
      ReactDOM.createPortal(
        React.cloneElement(children, {
            style: {...children.props.style, ...this.getStyle()}
          }
        ),
       container
      )
    )
  }
}

Overlay.defaultProps = {
  arrowProps: {
    size: 0,
  },
}

export default Overlay