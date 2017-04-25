# Reactip
> tooltip component for react.

## Examples

visist https://huozhi.github.io/reactip

## Usage

```
npm i --save reactip
```

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

## License

`Reactip` is released under the MIT license.
