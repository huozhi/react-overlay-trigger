import React, {forwardRef} from 'react'
import Overlay from './Overlay'
import DomObserver from './DomObserver'
import { combineRef } from './utils'

const isPointerEventSupported = !!window.PointerEvent
const isTouchEventSupported = !!window.TouchEvent

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
    if (!isPointerEventSupported && !isTouchEventSupported) {
      this.open()
    }
  }

  handleMouseLeave = (e) => {
    safeCall(this.getChildProps().onMouseLeave, e)
    if (!isPointerEventSupported && !isTouchEventSupported) {
      this.close()
    }
  }

  handlePointerEnter = (e) => {
    safeCall(this.getChildProps().onPointerEnter, e)
    if (e.pointerType === 'mouse') {
      this.open()
    }
  }

  handlePointerLeave = (e) => {
    safeCall(this.getChildProps().onPointerLeave, e)
    if (e.pointerType === 'mouse') {
      this.close()
    }
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
    this.open()
  }

  handleBlur = (e) => {
    safeCall(this.getChildProps().onBlur, e)
    this.close()
  }

  getTriggerProps = () => {
    const {triggers} = this.props
    const triggerProps = {}
    if (triggers.indexOf('hover') !== -1) {
      triggerProps.onMouseEnter = this.handleMouseEnter
      triggerProps.onMouseLeave = this.handleMouseLeave
      triggerProps.onPointerEnter = this.handlePointerEnter
      triggerProps.onPointerLeave = this.handlePointerLeave
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

  getTrigger = () => {
    return this.triggerRef.current
  }

  scheduleUpdate = () => {
    const {current: overlayInstance} = this.overlayRef
    if (overlayInstance) {
      overlayInstance.adjustPosition()
    }
  }

  render() {
    const {children, forwardRef, container, overlay, arrowProps, placement} = this.props
    const child = React.Children.only(children)

    return (
      <React.Fragment>
        <DomObserver ref={combineRef(this.triggerRef, forwardRef)} onMeasure={this.scheduleUpdate}>
          {(child != null && child !== false) && React.cloneElement(child, this.getTriggerProps())}
        </DomObserver>
        {this.state.visible &&
          <Overlay
            arrowProps={arrowProps}
            container={container}
            placement={placement}
            getTrigger={this.getTrigger}
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
}

export default forwardRef((props, ref) => {
  return <OverlayTrigger {...props} forwardRef={ref} />
})
