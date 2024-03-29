export const contains = (x, y) => {
  const xBcr = x.getBoundingClientRect()
  const yBcr = y.getBoundingClientRect()

  return yBcr.top >= xBcr.top && yBcr.left >= xBcr.left && yBcr.bottom <= xBcr.bottom && yBcr.right <= xBcr.right
}

function attachRef(ref, node) {
  if (typeof ref === 'function') {
    ref(node)
  } else if (typeof ref === 'object') {
    ref.current = node
  }
}

export function combineRef(...args) {
  return function functionalRef(node) {
    args.filter((arg) => arg != null).forEach((ref) => attachRef(ref, node))
  }
}

export const position = (placement, overlay, trigger, offsetParent, arrowSize = 0) => {
  const overlayBcr = overlay.getBoundingClientRect()
  const triggerBcr = trigger.getBoundingClientRect()
  const offsetBcr = offsetParent.getBoundingClientRect()

  const style = { top: 0, left: 0 }
  const offsetTop = triggerBcr.top - offsetBcr.top
  const offsetLeft = triggerBcr.left - offsetBcr.left

  switch (placement) {
    case 'top': {
      style.top = offsetTop - overlayBcr.height - arrowSize
      style.left = offsetLeft + (triggerBcr.width - overlayBcr.width) / 2
      break
    }
    case 'bottom': {
      style.top = offsetTop + triggerBcr.height + arrowSize
      style.left = offsetLeft + (triggerBcr.width - overlayBcr.width) / 2
      break
    }
    case 'left': {
      style.top = offsetTop + (triggerBcr.height - overlayBcr.height) / 2
      style.left = offsetLeft - overlayBcr.width - arrowSize
      break
    }
    case 'right': {
      style.top = offsetTop + (triggerBcr.height - overlayBcr.height) / 2
      style.left = offsetLeft + triggerBcr.width + arrowSize
      break
    }
    case 'center': {
      style.top = offsetTop + (triggerBcr.height - overlayBcr.height) / 2
      style.left = offsetLeft + (triggerBcr.width - overlayBcr.width) / 2
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
