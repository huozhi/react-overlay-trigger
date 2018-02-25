# Reactip
> tooltip component for react.

## Examples

visist https://huozhi.github.io/reactip

## Usage

```sh
npm i -S react react-dom emotion # for dependencies
npm i -S reactip
```

> NOTICE: If you don't have these dependencies above, it won't work!

Wrapp the trigger with `Tooltip` component

```js
import React from 'react'
import Tooltip from 'reactip'

const Button = ({children, ...rest}) => (
  <button {...rest}>{children}</button>
)

const Demo = () => (
  <div>
    <Tooltip placement="right" tooltip="something" event="hover">
      <Button className="Button">right</Button>
    </Tooltip>

    <Tooltip placement="top" tooltip="something" event="click">
      <button className="Button">top</button>
    </Tooltip>
  <div>
)
```

## API

| props     | type     | default | description |
| :-------: | :------: | :-----: | :---------: |
| placement | string   | x       | placement tooltip showup: `[top, right, bottom, left]` |
| tooltip   | anything | null    | tooltip content, you can pass DOM node or react component |
| event     | string   | hover   | trigger event: `[hover, click]` |
| offsetParent | node | document.body | position will be calculated relative to this node |
| popupStyle | object | undefined | popup style object |

## License

`Reactip` is released under the MIT license.
