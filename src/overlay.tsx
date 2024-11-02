import { useLayoutEffect, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { combineRef, position } from './utils'
import { useDomObserver } from './dom-observer'

export type PopoverProps = {
  ref: React.RefCallback<HTMLElement>
  style: React.CSSProperties
  onClose: () => void
}

function useOverlay({
  onClose,
  getTrigger,
  placement,
  overlayRef,
  Popover,
  container,
  arrowProps = { size: 0 },
  adjustOverlayRef,
  visible,
}: {
  onClose: () => void
  getTrigger: () => HTMLElement | null
  placement: string
  overlayRef: React.RefObject<HTMLElement | null>
  Popover: React.ComponentType<PopoverProps>
  container: HTMLElement | null
  arrowProps?: { size: number }
  adjustOverlayRef: any
  visible: boolean
}): JSX.Element | null {
  const [state, setState] = useState({
    offsetTop: 0,
    offsetLeft: 0,
  })

  useLayoutEffect(() => {
    adjustPosition()
  }, [])

  useLayoutEffect(() => {
    adjustPosition()
  }, [container, placement, arrowProps])

  function getStyle(): React.CSSProperties {
    const { offsetTop, offsetLeft } = state
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

  const adjustPosition = () => {
    const triggerNode = getTrigger()
    const overlayNode = overlayRef.current
    if (!triggerNode || !overlayNode || !container) {
      return
    }
    const expected = position(placement, overlayNode, triggerNode, container, arrowProps.size)
    const { top, left } = expected.offset
    const { offsetTop, offsetLeft } = state
    if (top !== offsetTop || left !== offsetLeft) {
      setState({ offsetTop: top, offsetLeft: left })
    }
  }
  
  useEffect(() => {
    adjustOverlayRef.current = adjustPosition
  })

  const domObserverRef = useDomObserver({ onMeasure: adjustPosition })

  if (!container || !Popover || !visible) return null
  
  return createPortal(
    <Popover
      ref={combineRef(overlayRef, domObserverRef)}
      style={getStyle()}
      onClose={onClose}
    />,
    container
  )
}

export {
  useOverlay
}
