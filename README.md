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
    <Tooltip position="right" tooltip="something">
      <Button className="Button">right</Button>
    </Tooltip>

    <Tooltip position="top" tooltip="something">
      <button className="Button">top</button>
    </Tooltip>
  <div>
)
```

## API

| props    | type   | default | description |
| :------: | :----: | :-----: | :---------: |
| position | string | "right" | position which tooltip will point to and show up at that side |
| tooltip  | anything | null | tooltip content, you can pass DOM node or react component |

## License

`Reactip` is released under the MIT license.
