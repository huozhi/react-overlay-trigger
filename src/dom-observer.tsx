import React, { useEffect, useRef } from 'react'

const mutationObserverOption = {
  subtree: true,
  childList: true,
  attributes: true,
  characterData: true,
}

function createObserver(node, onMeasure) {
  const cachedSize = { width: 0, height: 0 }
  function handleMutate() {
    const { width, height } = node.getBoundingClientRect()
    if (cachedSize.width !== width || cachedSize.height !== height) {
      cachedSize.width = width
      cachedSize.height = height
      onMeasure()
    }
  }
  
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => onMeasure())
    ro.observe(node)
    return ro
  } else {
    
    
    const mob = new MutationObserver(handleMutate)
    mob.observe(node, mutationObserverOption)
    return mob
  }
}

function useDomObserver({ 
  onMeasure
}) {
  const innerRef: React.RefObject<HTMLElement | null> = useRef(null)

  useEffect(() => {
    if (!innerRef.current) {
      return
    }
    const node = innerRef.current
    let observer = null
    if (node) {
      observer = createObserver(node, onMeasure)
    }
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [
    // onMeasure, 
    // innerRef.current
  ])

  return innerRef
}

export { useDomObserver }
