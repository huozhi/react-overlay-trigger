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

const Button = React.forwardRef((props, ref) => <div {...props} ref={ref} />)

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

| props      | description |
| :------    | :--------   |
| placement  | placement position: `"top"` \| `"right"` \| `"bottom"` \| `"left"` \| `"center"` |
| overlay    | overlay content, you can pass DOM node or react component |
| children   | the trigger element |
| triggers   | trigger events: "hover", "click", "focus" (default: `[]`) |
| container  | parent element position will be calculated relative to this node (default: `document.body`) |

## License

MIT
