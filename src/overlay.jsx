import React, { useLayoutEffect, cloneElement, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { combineRef, position } from './utils'
import DomObserver from './dom-observer'

function Overlay({
  children,
  onClose,
  getTrigger,
  placement,
  ref,
  container: ctr,
  arrowProps = { size: 0 },
  adjustOverlayRef,
  visible,
}) {
  const overlayRef = useRef()
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

  if (!container || !children) return null
  return createPortal(
    <DomObserver ref={combineRef(overlayRef, ref)} onMeasure={adjustPosition}>
      {cloneElement(children, {
        style: { ...children.props.style, ...getStyle() },
        onClose,
      })}
    </DomObserver>,
    container
  )
}

export default Overlay
