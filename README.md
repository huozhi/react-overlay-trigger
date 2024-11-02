# React Overlay Trigger
> Small and simple popover library for React

[![npm version](https://img.shields.io/npm/v/react-overlay-trigger.svg?style=flat-square)](https://www.npmjs.com/package/react-overlay-trigger)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-overlay-trigger?style=flat-square)](https://bundlephobia.com/result?p=react-overlay-trigger)

Checkout [Website](https://react-overlay-trigger.vercel.app) for more details.

## Installation

```sh
npm i -S react-overlay-trigger
```

## Usage

```js
import { usePopover } from 'react-overlay-trigger'

const App = () => {
  const { popover, triggerProps } = usePopover({
    overlay: <div>hello</div>,
    hoverToggle: true,
    placement: 'top',
  })

  return (
    <div>
      {popover}
      <button {...triggerProps}>hover me</button>
    </div>
  )
}
```

## API

```tsx
usePopover(
  popover: ReactNode,
  options: {    
    clickToggle?: boolean
    hoverToggle?: boolean
    focusToggle?: boolean
    container?: HTMLElement
    placement: PlacementType
    arrowProps?: { size: number }
    defaultOpen?: boolean
    delayDuration?: number
  }
): {
  popover: ReactNode
  isOpen: boolean
  triggerProps: {
    ref: RefCallback<any>
    onMouseEnter?: (e: MouseEvent) => void
    onMouseLeave?: (e: MouseEvent) => void
    onPointerEnter?: (e: PointerEvent) => void
    onPointerLeave?: (e: PointerEvent) => void
    onFocus?: (e: FocusEvent) => void
    onBlur?: (e: FocusEvent) => void
    onClick?: (e: MouseEvent) => void
  }
}
```

## License

MIT
