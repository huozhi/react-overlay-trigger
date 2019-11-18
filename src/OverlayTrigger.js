import React from 'react'
import ReactDOM from 'react-dom'
import Overlay from './Overlay'

class RefHolder extends React.Component {
  render() {
    return this.props.children
  }
}

class OverlayTrigger extends React.Component {
  constructor(props) {
    super(props)
    this.triggerRef = React.createRef()
    this.state = {
      visible: false,
    }
  }

  safeCall = (fn) => {
    if (typeof fn === 'function') {
      fn()
    }
  }

  getChildProps() {
    return this.props.children.props
  }

  handleMouseEnter = () => {
    this.safeCall(this.getChildProps().onMouseEnter)
    this.open()
  }

  handleMouseLeave = () => {
    this.safeCall(this.getChildProps().onMouseLeave)
    this.close()
  }

  handleClick = () => {
    this.safeCall(this.getChildProps().onClick)
    if (this.state.visible) {
      this.close()
    } else {
      this.open()
    }
  }

  getTarget = () => {
    return ReactDOM.findDOMNode(this.triggerRef.current)
  }

  getTriggerProps = () => {
    const {triggers} = this.props;
    const triggerProps = {};
    if (triggers.indexOf('hover') !== -1) {
      triggerProps.onMouseEnter = this.handleMouseEnter
      triggerProps.onMouseLeave = this.handleMouseLeave
    }
    if (triggers.indexOf('focus') !== -1) {
      triggerProps.onFocus = this.open
      triggerProps.onBlur = this.close
    }
    if (triggers.indexOf('click') !== -1) {
      triggerProps.onClick = this.handleClick
    }
    return triggerProps
  }

  open = () => {
    this.setState({visible: true})
  }

  close = () => {
    this.setState({visible: false})
  }

  render() {
    const {children, container, overlay, arrowProps, placement} = this.props
    const child = React.Children.only(children)
    return (
      <React.Fragment>
        <RefHolder ref={this.triggerRef}>
          {(child != null && child !== false) && React.cloneElement(child, this.getTriggerProps())}
        </RefHolder>
        {this.state.visible &&
          <Overlay
            arrowProps={arrowProps}
            container={container}
            placement={placement}
            target={this.getTarget}
          >
            {overlay}
          </Overlay>
        }
      </React.Fragment>
    )
  }
}

OverlayTrigger.defaultProps = {
  placement: 'right',
  container: document.body,
}

export default OverlayTrigger
