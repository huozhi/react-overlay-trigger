import React from 'react'
import {render} from 'react-dom'
import Tooltip from 'reactip'
import './app.css'

class Button extends React.Component {
  render() {
    const {children, ...rest} = this.props
    return <button {...rest}>{children}</button>
  }
}

const App = () => {
  return (
    <div className="App">
      <div className="App-titile">
        Reactip -- Easy Tooltip Component for React
      </div>
      <p className="App-subtitle">click the buttons below</p>

      <div className="Demo">
        <Tooltip position="right" tooltip="something">
          <Button className="Toggler">right</Button>
        </Tooltip>

        <Tooltip position="top" tooltip="something">
          <button className="Toggler">top</button>
        </Tooltip>

        <Tooltip position="left" tooltip="something">
          <button className="Toggler">left</button>
        </Tooltip>

        <Tooltip position="bottom" tooltip="something">
          <button className="Toggler">bottom</button>
        </Tooltip>
      </div>
    </div>
  )
}

render(
  <App />,
  document.getElementById('root')
)
