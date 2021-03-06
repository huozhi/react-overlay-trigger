import React from 'react'
import ReactDOM from 'react-dom'
import {position} from './utils'
import DomObserver from './DomObserver'

class Overlay extends React.Component {
  constructor(props) {
    super(props)
    this.overlayRef = React.createRef()
    this.state = {
      offsetTop: 0,
      offsetLeft: 0,
      container: props.container,
    }
  }

  static getDerivedStateFromProps(props, state) {
    // resolve dom node change
    if (props.container !== state.container) {
      return {
        container: props.container
      }
    }
    return null
  }

  componentDidMount() {
    this.adjustPosition()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.container !== this.state.container ||
      prevProps.placement !== this.props.placement ||
      prevProps.arrowProps !== this.props.arrowProps
    ) {
      this.adjustPosition()
    }
  }

  getStyle = () => {
    const {offsetTop, offsetLeft} = this.state
    const transforms = `translate3d(${offsetLeft}px, ${offsetTop}px, 0)`

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
    const {getTrigger, placement, arrowProps} = this.props
    const triggerNode = getTrigger()
    const overlayNode = this.overlayRef.current
    if (!triggerNode || !overlayNode || !container) { return }
    const expected = position(placement, overlayNode, triggerNode, container, arrowProps.size)
    const {top, left} = expected.offset
    const {offsetTop, offsetLeft} = this.state
    if (top !== offsetTop || left !== offsetLeft) {
      this.setState({offsetTop: top, offsetLeft: left})
    }
  }

  render() {
    const {children} = this.props
    const {container} = this.state
    if (!container || !children) return null
    return (
      ReactDOM.createPortal((
        <DomObserver
          ref={this.overlayRef}
          onMeasure={this.adjustPosition}
        >
          {React.cloneElement(children, {
            style: {...children.props.style, ...this.getStyle()},
          })}
        </DomObserver>
      ),
      container
    ))
  }
}

Overlay.defaultProps = {
  arrowProps: {
    size: 0,
  },
}

export default Overlay