const oppositePlacements = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
}

export const getOppositePlacement = (placement) => {
  return oppositePlacements[placement]
}

export const position = (placement, anchorRect) => {
  const style = {}
  const {
    top,
    right,
    bottom,
    left,
    width,
    height,
  } = anchorRect

  switch (placement) {
    case 'top': {
      style.top = top
      style.left = left + width / 2
      break
    }
    case 'bottom': {
      style.top = bottom
      style.left = left + width / 2
      break
    }
    case 'left': {
      style.left = left
      style.top = top + height / 2
      break
    }
    case 'right': {
      style.left = right
      style.top = top + height / 2
      break
    }
    default:
      break
  }
  return style
}

const viewportRect = {
  top: 0,
  left: 0,
  bottom: (window.innerHeight || document.documentElement.clientHeight),
  right: (window.innerWidth || document.documentElement.clientWidth),
}

export const isInViewport = (rect) => {
  // console.debug(rect, viewportRect)
  return (
    rect.top >= viewportRect.top &&
    rect.left >= viewportRect.left &&
    rect.bottom <= viewportRect.bottom &&
    rect.right <= viewportRect.right
  )
}
