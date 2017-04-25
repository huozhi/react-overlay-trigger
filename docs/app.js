import React from 'react'
import {render} from 'react-dom'
import Tooltip from 'reactip'
import './app.css'

const Button = ({children, ...rest}) => (
  <button {...rest}>{children}</button>
)

const App = () => {
  return (
    <div className="App">
      <div className="App-titile">
        Reactip -- Easy Tooltip Component for React
        <div className="App-github">
          <iframe src={`https://ghbtns.com/github-btn.html?user=huozhi&repo=reactip&type=star`} frameBorder="0" scrolling="0" width="60px" height="20px" />
        </div>
      </div>
      <p className="App-subtitle">click buttons below</p>

      <div className="Demo">
        <Tooltip placement="right" event="hover" tooltip="something">
          <Button className="Toggler">right</Button>
        </Tooltip>

        <Tooltip placement="top" event="hover" tooltip="something">
          <button className="Toggler">top</button>
        </Tooltip>

        <Tooltip placement="left" event="click" tooltip="something">
          <button className="Toggler">left</button>
        </Tooltip>

        <Tooltip placement="bottom" event="click" tooltip="something">
          <button className="Toggler">bottom</button>
        </Tooltip>
      </div>

      <pre className="App-code">
        {`
          <Tooltip placement="right" event="hover" tooltip="something">
            <Button className="Toggler">right</Button>
          </Tooltip>

          <Tooltip placement="top" event="hover" tooltip="something">
            <button className="Toggler">top</button>
          </Tooltip>

          <Tooltip placement="left" event="click" tooltip="something">
            <button className="Toggler">left</button>
          </Tooltip>

          <Tooltip placement="bottom" event="click" tooltip="something">
            <button className="Toggler">bottom</button>
          </Tooltip>
        `}
      </pre>
    </div>
  )
}

render(
  <App />,
  document.getElementById('root')
)
