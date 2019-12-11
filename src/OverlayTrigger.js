import React from 'react'
import Overlay from './Overlay'
import DomObserver from './DomObserver'

const safeCall = (fn, ...args) => {
  if (typeof fn === 'function') {
    fn(...args)
  }
}

class OverlayTrigger extends React.Component {
  constructor(props) {
    super(props)
    this.triggerRef = React.createRef()
    this.overlayRef = React.createRef()
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

  handleFocus = (e) => {
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

  scheduleUpdate = () => {
    const {current: overlayInstance} = this.overlayRef
    if (overlayInstance) {
      overlayInstance.adjustPosition()
    }
  }

  render() {
    const {children, observer, container, overlay, arrowProps, placement} = this.props
    const child = React.Children.only(children)
    return (
      <React.Fragment>
        <DomObserver ref={this.triggerRef} observerOption={observer} onMutate={this.scheduleUpdate}>
          {(child != null && child !== false) && React.cloneElement(child, this.getTriggerProps())}
        </DomObserver>
        {this.state.visible &&
          <Overlay
            arrowProps={arrowProps}
            container={container}
            placement={placement}
            targetRef={this.triggerRef}
            ref={this.overlayRef}
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
  observer: false,
}

export default OverlayTrigger
