import React from 'react'
import Overlay from './Overlay'

const safeCall = (fn, ...args) => {
  if (typeof fn === 'function') {
    fn(...args)
  }
}

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

  getChildProps() {
    return this.props.children.props
  }

  handleMouseEnter = (e) => {
    safeCall(this.getChildProps().onMouseEnter, e)
    this.open()
  }

  handleMouseLeave = (e) => {
    safeCall(this.getChildProps().onMouseLeave, e)
    this.close()
  }

  handleClick = (e) => {
    safeCall(this.getChildProps().onClick, e)
    if (this.state.visible) {
      this.close()
    } else {
      this.open()
    }
  }

  handleFocus = () => {
    safeCall(this.getChildProps().onFocus, e)
  }

  handleBlur = (e) => {
    safeCall(this.getChildProps().onBlur, e)
  }

  getTriggerProps = () => {
    const {triggers} = this.props;
    const triggerProps = {};
    if (triggers.indexOf('hover') !== -1) {
      triggerProps.onMouseEnter = this.handleMouseEnter
      triggerProps.onMouseLeave = this.handleMouseLeave
    }
    if (triggers.indexOf('focus') !== -1) {
      triggerProps.onFocus = this.handleFocus
      triggerProps.onBlur = this.handleBlur
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
            target={this.triggerRef}
          >
            {overlay}
          </Overlay>
        }
      </React.Fragment>
    )
  }
}

OverlayTrigger.defaultProps = {
  container: document.body,
}

export default OverlayTrigger
