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

export const isInViewport = (rect) => {
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
