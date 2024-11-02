import { useEffect, useRef, useState } from 'react'
import { useOverlay, type PopoverProps } from './overlay'
import { useDomObserver } from './dom-observer'
import { combineRef } from './utils'

type TriggerProps = {
  ref: React.RefCallback<any>
  onMouseEnter?: (e: React.MouseEvent) => void
  onMouseLeave?: (e: React.MouseEvent) => void
  onPointerEnter?: (e: React.PointerEvent) => void
  onPointerLeave?: (e: React.PointerEvent) => void
  onFocus?: (e: React.FocusEvent) => void
  onBlur?: (e: React.FocusEvent) => void
  onClick?: (e: React.MouseEvent) => void
}

const isBrowser = typeof window !== 'undefined'
const isPointerEventSupported = isBrowser ? !!window.PointerEvent : false
const isTouchEventSupported = isBrowser ? !!window.TouchEvent : false
const defaultContainer = isBrowser ? document.body : null

function useDocumentClick(
  condition: (e: MouseEvent) => boolean,
  callback: () => void
) {
  const handleClick = (e: MouseEvent) => {
    if (condition(e)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [condition, callback])
}

type PlacementType = 'top' | 'bottom' | 'left' | 'right' | 'center'

export type PopoverOptions = {
  clickToggle?: boolean
  hoverToggle?: boolean
  focusToggle?: boolean
  container?: HTMLElement
  placement: PlacementType
  arrowProps?: { size: number }
}

function usePopover(
  Popover: React.ComponentType<PopoverProps>,
  {
    container = defaultContainer,
    arrowProps,
    placement,
    clickToggle,
    hoverToggle,
    focusToggle,
  }: PopoverOptions
) {
  const triggerRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLElement>(null)
  const adjustOverlayRef = useRef(() => {})
  const [visible, setVisible] = useState(false)


  function handleMouseEnter() {
    if (!isPointerEventSupported && !isTouchEventSupported) {
      open()
    }
  }

  function handleMouseLeave() {
    if (!isPointerEventSupported && !isTouchEventSupported) {
      close()
    }
  }

  function handlePointerEnter(e: React.PointerEvent) {
    if (e.pointerType === 'mouse') {
      open()
    }
  }

  function handlePointerLeave(e: React.PointerEvent) {
    if (e.pointerType === 'mouse') {
      close()
    }
  }

  function handleClick() {
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

  function getTriggerProps(ref: React.RefCallback<any>): TriggerProps {
    const passedProps: TriggerProps = {
      ref,
    }
    if (hoverToggle) {
      passedProps.onMouseEnter = handleMouseEnter
      passedProps.onMouseLeave = handleMouseLeave
      passedProps.onPointerEnter = handlePointerEnter
      passedProps.onPointerLeave = handlePointerLeave
    }
    if (focusToggle) {
      passedProps.onFocus = open
      passedProps.onBlur = close
    }
    if (clickToggle) {
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

  useDocumentClick(isClickOutside, close)

  const childObserverRef = useDomObserver({ onMeasure: scheduleUpdate })  
  const triggerProps = getTriggerProps(
    combineRef(triggerRef, childObserverRef)
  )
  const overlay = useOverlay({
    visible,
    container,
    placement,
    arrowProps,
    getTrigger,
    overlayRef,
    Popover,
    adjustOverlayRef,
    onClose: close,
  })

  return {
    popover: overlay,
    triggerProps,
  }
}

export { usePopover }
