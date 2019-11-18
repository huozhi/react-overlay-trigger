# React Overlay Trigger
> positioned overlay component for react.

## Examples

visist https://huozhi.github.io/react-overlay-trigger

## Usage

```sh
npm i -S react-overlay-trigger
```

> NOTICE: If you don't have these dependencies above, it won't work!

Wrapp the trigger with `OverlayTrigger` component

```js
import React from 'react'
import OverlayTrigger from 'react-overlay-trigger'

const Overlay = ({style, ...rest}) => <span {...rest}>{children}</span>

const overlay = <Overlay>yep</Overlay>

const Demo = () => (
  <div>
    <OverlayTrigger placement="right" overlay={overlay} trigger="hover">
      <Button className="Button">right</Button>
    </OverlayTrigger>

    <OverlayTrigger placement="top" overlay={overlay} trigger="click">
      <button className="Button">top</button>
    </OverlayTrigger>
  <div>
)
```

## API

| props     | type     | default | description |
| :-------: | :------: | :-----: | :---------: |
| placement | string   | x       | placement direction: `top | right | bottom | left]` |
| overlay   | anything | null    | overlay content, you can pass DOM node or react component |
| triggers     | array   | null   | trigger events: `[hover, click, focus]` |
| container | node | document.body | position will be calculated relative to this node |

## License

`React Overlay Trigger` is released under the MIT license.
