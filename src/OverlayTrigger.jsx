import React, {forwardRef, useEffect} from 'react'
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

function DocumentClick({condition, callback}) {
  const handleClick = e => {
    if (condition(e)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [condition, callback])

  return null
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

  isClickOutside = (e) => {
    const { target } = e
    const overlay = this.overlayRef.current
    const trigger = this.triggerRef.current
    // outside of the trigger or overlay
    return (
      (trigger && !trigger.contains(target)) && 
      (overlay && overlay.overlayRef.current && !overlay.overlayRef.current.contains(target))
    )
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
    const props = {}
    if (triggers.indexOf('hover') !== -1) {
      props.onMouseEnter = this.handleMouseEnter
      props.onMouseLeave = this.handleMouseLeave
      props.onPointerEnter = this.handlePointerEnter
      props.onPointerLeave = this.handlePointerLeave
    }
    if (triggers.indexOf('focus') !== -1) {
      props.onFocus = this.handleFocus
      props.onBlur = this.handleBlur
    }
    if (triggers.indexOf('click') !== -1) {
      props.onClick = this.handleClick
    }
    return props
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
    const overlayInstance = this.overlayRef.current
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
        <DocumentClick
          condition={this.isClickOutside}
          callback={this.close}
        />
        {this.state.visible &&
          <Overlay
            arrowProps={arrowProps}
            container={container}
            placement={placement}
            getTrigger={this.getTrigger}
            ref={this.overlayRef}
            onClose={this.close}
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
