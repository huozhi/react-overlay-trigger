import React, {useEffect, useRef} from 'react'
import {combineRef} from './utils'

const mutationObserverOption = {
  subtree: true,
  childList: true,
  attributes: true,
  characterData: true,
}

function createObserver(node, onMeasure) {
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => onMeasure())
    ro.observe(node)
    return ro
  } else {
    const cachedSize = {width: 0, height: 0}
    function handleMutate() {
      const {width, height} = node.getBoundingClientRect()
      if (cachedSize.width !== width || cachedSize.height !== height) {
        cachedSize.width = width
        cachedSize.height = height
        onMeasure()
      }
    }
    const mob = new MutationObserver(handleMutate)
    mob.observe(node, mutationObserverOption)
    return mob
  }
}

const DomObserver = React.forwardRef(
  ({children, onMeasure}, ref) => {
    const innerRef = useRef(null)

    useEffect(() => {
      const node = innerRef.current
      let observer = null
      if (node) {
        observer = createObserver(node, onMeasure)
        // ob = new MutationObserver(onMeasure)
        // ob.observe(node, observeOption)
      }
      return () => {
        if (observer) {
          observer.disconnect()
        }
      }
    }, [])

    return React.cloneElement(children, {
      ref: combineRef(innerRef, ref)
    })
  }
)

DomObserver.defaultProps = {
  onMeasure() {},
}

export default DomObserver
