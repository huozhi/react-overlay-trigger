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

export const position = (placement, node, target, offsetParent, arrowSize = 0) => {
  const nodeBcr = node.getBoundingClientRect()
  const targetBcr = target.getBoundingClientRect()
  const offsetBcr = offsetParent.getBoundingClientRect()

  const style = {top: 0, left: 0}
  // TODO: fixed and absolute
  const offsetTop = targetBcr.top - offsetBcr.top
  const offsetLeft = targetBcr.left - offsetBcr.left

  switch (placement) {
    case 'top': {
      style.top = offsetTop - nodeBcr.height - arrowSize
      style.left = offsetLeft + (targetBcr.width - nodeBcr.width) / 2
      break
    }
    case 'bottom': {
      style.top = offsetTop + targetBcr.height + arrowSize
      style.left = offsetLeft + (targetBcr.width - nodeBcr.width) / 2
      break
    }
    case 'left': {
      style.top = offsetTop + (targetBcr.height - nodeBcr.height) / 2
      style.left = offsetLeft - nodeBcr.width - arrowSize
      break
    }
    case 'right': {
      style.top = offsetTop + (targetBcr.height - nodeBcr.height) / 2
      style.left = offsetLeft + targetBcr.width + arrowSize
      break
    }
    default:
      break
  }

  const offset = {
    top: style.top,
    left: style.left,
    bottom: style.top + nodeBcr.height,
    right: style.left + nodeBcr.width,
  }

  const popupRect = {
    top: offset.top + offsetBcr.top,
    left: offset.left + offsetBcr.left,
    bottom: offset.top + offsetBcr.top + nodeBcr.height,
    right: offset.left + offsetBcr.left + nodeBcr.width,
  }

  return {
    offset,
    rect: popupRect,
  }
}

export const isInViewport = (rect) => (
  rect.top >= 0 &&
  rect.left >= 0 &&
  rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
  rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
)
