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
    switch (this.props.trigger) {
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
  trigger: 'hover',
  placement: 'right',
  container: document.body,
}

export default OverlayTrigger
