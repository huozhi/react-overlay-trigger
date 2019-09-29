import React from 'react'
import ReactDOM from 'react-dom'
import {position} from './utils'

class Overlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      offsetTop: 0,
      offsetLeft: 0,
    }
  }

  componentDidMount() {
    this.adjustPosition()
  }

  getStyle = () => {
    const {offsetTop, offsetLeft} = this.state
    const transform3dValue = `translate3d(${Math.round(offsetLeft)}px, ${Math.round(offsetTop)}px, 0)`
    return {
      position: 'absolute',
      left: 0,
      top: 0,
      transform: transform3dValue,
      WebkitTransform: transform3dValue,
      MozTransform: transform3dValue,
      msTransform: transform3dValue,
    }
  }

  adjustPosition = () => {
    const triggerNode = this.props.target()
    if (!triggerNode) { return; }
    const overlayNode = ReactDOM.findDOMNode(this)
    const {container, placement} = this.props
    const expected = position(placement, overlayNode, triggerNode, container)
    const {top, left} = expected.offset
    this.setState({offsetTop: top, offsetLeft: left})
  }

  render() {
    const {container, children} = this.props
    if (!(children && container)) return null
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

export default Overlay