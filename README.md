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

class Button extends React.Component {
  render() {
    const {children, ...rest} = this.props
    return <button {...rest}>{children}</button>
  }
}

const Demo = () => (
  <div>
    <Tooltip position="right" tooltip="something">
      <Button className="Toggler">right</Button>
    </Tooltip>

    <Tooltip position="top" tooltip="something">
      <button className="Toggler">top</button>
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
