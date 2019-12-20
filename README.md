# React Overlay Trigger
> zero dependencies overlay positioning component for react.


[![npm version](https://img.shields.io/npm/v/react-overlay-trigger.svg?style=flat-square)](https://www.npmjs.com/package/react-overlay-trigger)
[![npm downloads](https://img.shields.io/npm/dm/react-overlay-trigger.svg?style=flat-square)](https://www.npmjs.com/package/react-overlay-trigger)


## Examples

checkout https://huozhi.github.io/react-overlay-trigger

## Usage

```sh
npm i -S react-overlay-trigger
```

Wrap the trigger with `OverlayTrigger` component

```js
import React from 'react'
import OverlayTrigger from 'react-overlay-trigger'

const Overlay = ({style, ...rest}) => <span {...rest}>{children}</span>

const overlay = <Overlay>yep</Overlay>

const Button = React.forwardRef((props, ref) => <div {...props} ref={ref} />)

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

## Development 

```sh
npm install
npm start # then goto http://localhost:8080
```

## API

| props     | type     | default | description |
| :-------: | :------: | :-----: | :---------: |
| placement | string   | x       | placement direction: `top | right | bottom | left]` |
| overlay   | React.ReactNode \| React.RefForwardingComponent | null    | overlay content, you can pass DOM node or react component |
| children | React.ReactNode \| RefForwardingComponent | x | the trigger element |
| triggers     | array   | null   | trigger events: `[hover, click, focus]` |
| container | HTMLElement | document.body | position will be calculated relative to this node |


# IMPORTANT 💥

**react-overlay-trigger** supports `<React.StrictMode>` 🎉, we didn't use any `findDOMNode` API inside the library. So it requires you only pass the children as ReactNode (like `<div />`) or RefForwardingComponent (like `React.forwardRef((props, ref) => ...)` component with ref accessing an actual DOM node). Then it could position the DOM nodes with correct positions and sizes.


## License

`React Overlay Trigger` is released under the MIT license.
