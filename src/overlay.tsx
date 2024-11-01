import { useLayoutEffect, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { combineRef, position } from './utils'
import { useDomObserver } from './dom-observer'

function useOverlay({
  onClose,
  getTrigger,
  placement,
  overlayRef,
  Overlay: OverlayComponent,
  container: ctr,
  arrowProps = { size: 0 },
  adjustOverlayRef,
  visible,
}: {
  onClose: () => void
  getTrigger: () => HTMLElement | null
  placement: string
  overlayRef: any
  Overlay: any
  container: HTMLElement | null
  arrowProps?: { size: number }
  adjustOverlayRef: any
  visible: boolean
}): JSX.Element | null {
  const [container, setContainer] = useState(ctr)

  const [state, setState] = useState({
    offsetTop: 0,
    offsetLeft: 0,
  })

  useLayoutEffect(() => {
    if (container !== ctr) {
      setContainer(ctr)
    }
  }, [ctr])

  useLayoutEffect(() => {
    adjustPosition()
  }, [])

  useLayoutEffect(() => {
    adjustPosition()
  }, [container, placement, arrowProps])

  const getStyle = () => {
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

  if (!container || !OverlayComponent || !visible) return null
  
  return createPortal(
    <OverlayComponent
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
