export const contains = (x, y) => {
  const xBcr = x.getBoundingClientRect()
  const yBcr = y.getBoundingClientRect()

  return (
    yBcr.top >= xBcr.top &&
    yBcr.left >= xBcr.left &&
    yBcr.bottom <= xBcr.bottom &&
    yBcr.right <= xBcr.right
  )
}

const oppositePlacements = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
}

export const getOppositePlacement = (placement) => {
  return oppositePlacements[placement]
}

export const isHorizontal = (placement) => ['left', 'right'].indexOf(placement) >= 0


function attachRef(ref, node) {
  if (typeof ref === 'function') {
    ref(node)
  } else {
    ref.current = node
  }
}

export function combineRef(refX, refY) {
  return function functionalRef(node) {
    attachRef(refX, node)
    attachRef(refY, node)
  }
}

export const position = (placement, overlay, trigger, offsetParent, arrowSize = 0) => {
  const overlayBcr = overlay.getBoundingClientRect()
  const triggertBcr = trigger.getBoundingClientRect()
  const offsetBcr = offsetParent.getBoundingClientRect()

  const style = {top: 0, left: 0}
  const offsetTop = triggertBcr.top - offsetBcr.top
  const offsetLeft = triggertBcr.left - offsetBcr.left

  switch (placement) {
    case 'top': {
      style.top = offsetTop - overlayBcr.height - arrowSize
      style.left = offsetLeft + (triggertBcr.width - overlayBcr.width) / 2
      break
    }
    case 'bottom': {
      style.top = offsetTop + triggertBcr.height + arrowSize
      style.left = offsetLeft + (triggertBcr.width - overlayBcr.width) / 2
      break
    }
    case 'left': {
      style.top = offsetTop + (triggertBcr.height - overlayBcr.height) / 2
      style.left = offsetLeft - overlayBcr.width - arrowSize
      break
    }
    case 'right': {
      style.top = offsetTop + (triggertBcr.height - overlayBcr.height) / 2
      style.left = offsetLeft + triggertBcr.width + arrowSize
      break
    }
    default:
      break
  }

  const offset = {
    top: style.top,
    left: style.left,
    bottom: style.top,
    right: style.left,
  }

  const popupRect = {
    top: offset.top + offsetBcr.top,
    left: offset.left + offsetBcr.left,
    bottom: offset.top + offsetBcr.top,
    right: offset.left + offsetBcr.left,
  }

  return {
    offset,
    rect: popupRect,
  }
}
