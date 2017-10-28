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

export const position = (placement, node, target, arrowSize = 0) => {
  const nodeBcr = node.getBoundingClientRect()
  const targetBcr = target.getBoundingClientRect()

  const style = {top: 0, left: 0}
  // TODO: fixed and absolute
  const offsetTop = targetBcr.top
  const offsetLeft = targetBcr.left

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

  return {
    top: style.top,
    left: style.left,
    bottom: nodeBcr.bottom,
    right: nodeBcr.right,
  }
}


export const isInViewport = (rect) => {
  const viewportRect = {
    top: 0,
    left: 0,
    bottom: (window.innerHeight || document.documentElement.clientHeight),
    right: (window.innerWidth || document.documentElement.clientWidth),
  }

  return (
    rect.top >= viewportRect.top &&
    rect.left >= viewportRect.left &&
    rect.bottom <= viewportRect.bottom &&
    rect.right <= viewportRect.right
  )
}
