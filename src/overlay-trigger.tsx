import React, { Children, useEffect, useRef, useState, cloneElement } from 'react'
import Overlay from './overlay'
import DomObserver from './dom-observer'
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

function useDocumentClick(condition, callback) {
  const handleClick = (e) => {
    if (condition(e)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [condition, callback])
}

type TriggerType = 'hover' | 'click' | 'focus'
type PlacementType = 'top' | 'bottom' | 'left' | 'right' | 'center'

export type OverlayTriggerProps = {
  overlay?: React.ReactNode
  triggers: TriggerType[]
  container?: HTMLElement
  placement: PlacementType
  arrowProps?: { size: number }
}

type Props = React.PropsWithRef<React.PropsWithChildren<OverlayTriggerProps>>

function OverlayTrigger(props: Props): React.ReactNode {
  const triggerRef = useRef<HTMLElement>()
  const overlayRef = useRef<HTMLElement>()
  const adjustOverlayRef = useRef(() => {})
  const [visible, setVisible] = useState(false)

  function getChildProps() {
    return (props.children as React.ReactElement).props
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
    const passedProps: any = {}
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

  const {
    children, 
    container = defaultContainer,
    overlay,
    arrowProps,
    placement,
    // @ts-expect-error ref existed in react 19
    ref
  } = props
  const child = Children.only(children) as React.ReactElement

  const trigger = getTrigger()
  const overlayNode = overlayRef.current
  useEffect(() => {
    // attach popoverTargetElement and popoverAction
    if (trigger && overlayNode) {
      // @ts-expect-error `popoverTargetElement` API
      trigger.popoverTargetElement = overlayNode
      // @ts-expect-error `popoverAction` API
      trigger.popoverAction = 'toggle'
      overlayNode.popover = 'auto'
      scheduleUpdate()
    }
  }, [trigger, overlayNode])


  useDocumentClick(isClickOutside, close)

  return (
    <>
      <DomObserver ref={combineRef(triggerRef, ref)} onMeasure={scheduleUpdate}>
        {child != null
          ? cloneElement(child , getTriggerProps())
          : null
        }
      </DomObserver>
      {visible ? (
        <Overlay
          onClose={close}
          arrowProps={arrowProps}
          container={container}
          placement={placement}
          getTrigger={getTrigger}
          ref={overlayRef}
          adjustOverlayRef={adjustOverlayRef}
        >
          {overlay}
        </Overlay>
      ) : null}
    </>
  )
}

export default OverlayTrigger
