# React Overlay Trigger
> zero dependencies overlay positioning component for react.

[![npm version](https://img.shields.io/npm/v/react-overlay-trigger.svg?style=flat-square)](https://www.npmjs.com/package/react-overlay-trigger)

[react-overlay-trigger.vercel.app](https://react-overlay-trigger.vercel.app)
## Usage

```sh
npm i -S react-overlay-trigger
```

```js
import React from 'react'
import OverlayTrigger from 'react-overlay-trigger'

const Overlay = ({style, ...rest}) => <span {...rest}>{children}</span>

const overlay = <Overlay>yep</Overlay>

const Button = <div {...props} ref={ref} />

const Demo = () => (
  <div>
    <OverlayTrigger placement="right" overlay={overlay} triggers={["hover"]}>
      <Button className="Button">right</Button>
    </OverlayTrigger>

    <OverlayTrigger placement="top" overlay={overlay} triggers={["click"]}>
      <button className="Button">top</button>
    </OverlayTrigger>
  <div>
)
```

## Development

```sh
pnpm install
pnpm dev
```

## API

```tsx
type TriggerType = 'hover' | 'click' | 'focus';
type PlacementType = 'top' | 'bottom' | 'left' | 'right' | 'center';
type OverlayTriggerProps = {
  overlay?: React.ReactNode;
  triggers: TriggerType[];
  container?: HTMLElement;
  placement: PlacementType;
  arrowProps?: {
    size: number;
  };
};
```

## License

MIT
