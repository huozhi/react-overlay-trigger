import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Overlay from './Overlay'
import DomObserver from './DomObserver'
import { combineRef } from './utils'

const isBrowser = typeof window !== 'undefined'
const isPointerEventSupported = isBrowser ? !!window.PointerEvent : false
const isTouchEventSupported = isBrowser ? !!window.TouchEvent : false
const defaultContainer = isBrowser ? document.body : null

const safeCall = (fn, ...args) => {
  if (typeof fn === 'function') {
    fn(...args)
  }
}

function DocumentClick({ condition, callback }) {
  const handleClick = (e) => {
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

function OverlayTrigger(props) {
  const triggerRef = useRef()
  const overlayRef = useRef()
  const adjustOverlayRef = useRef(() => {})
  const [visible, setVisible] = useState(false)

  function getChildProps() {
    return props.children.props
  }

  function handleMouseEnter(e) {
    safeCall(getChildProps().onMouseEnter, e)
    if (!isPointerEventSupported && !isTouchEventSupported) {
      open()
    }
  }

  function handleMouseLeave(e) {
    safeCall(getChildProps().onMouseLeave, e)
    if (!isPointerEventSupported && !isTouchEventSupported) {
      close()
    }
  }

  function handlePointerEnter(e) {
    safeCall(getChildProps().onPointerEnter, e)
    if (e.pointerType === 'mouse') {
      open()
    }
  }

  function handlePointerLeave(e) {
    safeCall(getChildProps().onPointerLeave, e)
    if (e.pointerType === 'mouse') {
      close()
    }
  }

  function handleClick(e) {
    safeCall(getChildProps().onClick, e)
    if (visible) {
      close()
    } else {
      open()
    }
  }

  function isClickOutside(e) {
    const { target } = e
    const overlay = overlayRef.current
    const trigger = triggerRef.current
    // outside of the trigger or overlay
    return (
      trigger &&
      !trigger.contains(target) &&
      overlay &&
      !overlay.contains(target)
    )
  }

  function handleFocus(e) {
    safeCall(getChildProps().onFocus, e)
    open()
  }

  function handleBlur(e) {
    safeCall(getChildProps().onBlur, e)
    close()
  }

  function getTriggerProps() {
    const { triggers } = props
    const passedProps = {}
    if (triggers.indexOf('hover') !== -1) {
      passedProps.onMouseEnter = handleMouseEnter
      passedProps.onMouseLeave = handleMouseLeave
      passedProps.onPointerEnter = handlePointerEnter
      passedProps.onPointerLeave = handlePointerLeave
    }
    if (triggers.indexOf('focus') !== -1) {
      passedProps.onFocus = handleFocus
      passedProps.onBlur = handleBlur
    }
    if (triggers.indexOf('click') !== -1) {
      passedProps.onClick = handleClick
    }
    return passedProps
  }

  function open() {
    setVisible(true)
  }

  function close() {
    setVisible(false)
  }

  function getTrigger() {
    return triggerRef.current
  }

  function scheduleUpdate() {
    const adjustOverlay = adjustOverlayRef.current
    adjustOverlay()
  }

  const { children, container = defaultContainer, overlay, arrowProps, placement, innerRef } = props
  const child = React.Children.only(children)

  return (
    <>
      <DomObserver ref={combineRef(triggerRef, innerRef)} onMeasure={scheduleUpdate}>
        {child != null && child !== false && React.cloneElement(child, getTriggerProps())}
      </DomObserver>
      <DocumentClick condition={isClickOutside} callback={close} />
      {visible && (
        <Overlay
          onClose={close}
          arrowProps={arrowProps}
          container={container}
          placement={placement}
          getTrigger={getTrigger}
          innerRef={overlayRef}
          adjustOverlayRef={adjustOverlayRef}
        >
          {overlay}
        </Overlay>
      )}
    </>
  )
}



export default forwardRef((props, ref) => {
  return <OverlayTrigger {...props} innerRef={ref} />
})
