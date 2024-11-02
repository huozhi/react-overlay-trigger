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
  const { overlayProps, triggerProps } = usePopover({
    overlay: <div>hello</div>,
    triggers: ['hover'],
    placement: 'top',
  })

  return (
    <div {...triggerProps}>
      <button>hover me</button>
      {overlayProps}
    </div>
  )
}
```

## API

```tsx
usePopover(
  popover: ReactNode,
  options: {    
    triggers: TriggerType[]
    container?: HTMLElement
    placement: PlacementType
    arrowProps?: { size: number }
  }
)
```

## License

MIT
