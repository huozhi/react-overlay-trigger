# Reactip
> tooltip component for react.

### Usage

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

### Props

- position

- tooltip
  - anyth

### Limitations

**Notice** that the wrapped component must be stateful react component or a dom node.
That means you have to `extends React.Component` if you use react component instead.
