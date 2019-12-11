import React, {useEffect, useRef} from 'react'
import {combineRef} from './utils'

const defaultObserverOption = {
  subtree: true,
  attributes: true,
  characterData: true,
};

const DomObserver = React.forwardRef(
  ({children, observeOption: originObserverOption, onMutate}, ref) => {
    const innerRef = useRef(null)
    // when `originObserverOption` is true, use default option
    // when `originObserverOption` is false or others, use itself
    // and when `originObserverOption` is object only, it will be applied to MutationObserver
    const observeOption = originObserverOption === true ? defaultObserverOption : originObserverOption

    useEffect(() => {
      const node = innerRef.current
      let ob = null
      if (node && typeof observeOption === 'object') {
        ob = new MutationObserver(onMutate)
        ob.observe(node, observeOption)
      }
      return () => {
        if (ob) {
          ob.disconnect()
        }
      }
    }, [])

    return React.cloneElement(children, {
      ref: combineRef(innerRef, ref)
    })
  }
)

DomObserver.defaultProps = {
  onMutate() {},
  observeOption: defaultObserverOption,
}

export default DomObserver
