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

export const position = (placement, target, offsetParent, arrowSize = 0) => {
  const targetBcr = target.getBoundingClientRect()
  const offsetBcr = offsetParent.getBoundingClientRect()

  const style = {top: 0, left: 0}
  const offsetTop = targetBcr.top - offsetBcr.top
  const offsetLeft = targetBcr.left - offsetBcr.left

  switch (placement) {
    case 'top': {
      style.top = offsetTop - arrowSize
      style.left = offsetLeft + (targetBcr.width) / 2
      break
    }
    case 'bottom': {
      style.top = offsetTop + targetBcr.height + arrowSize
      style.left = offsetLeft + (targetBcr.width) / 2
      break
    }
    case 'left': {
      style.top = offsetTop + (targetBcr.height) / 2
      style.left = offsetLeft - arrowSize
      break
    }
    case 'right': {
      style.top = offsetTop + (targetBcr.height) / 2
      style.left = offsetLeft + targetBcr.width + arrowSize
      break
    }
    default:
      break
  }

  const offset = {
    top: style.top,
    left: style.left,
    bottom: style.top + overlayBcr.height,
    right: style.left + overlayBcr.width,
  }

  const popupRect = {
    top: offset.top + offsetBcr.top,
    left: offset.left + offsetBcr.left,
    bottom: offset.top + offsetBcr.top + overlayBcr.height,
    right: offset.left + offsetBcr.left + overlayBcr.width,
  }

  return {
    offset,
    rect: popupRect,
  }
}
