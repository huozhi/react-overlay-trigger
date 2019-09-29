import React from 'react'
import {render} from 'react-dom'
import Tooltip from 'reactip'
import './app.css'

const usageDescription = `
<Tooltip placement="left" trigger="hover" overlay={<Overlay>something</Overlay>}>
  <button className="Toggler">hover [left]</button>
</Tooltip>

<Tooltip placement="right" trigger="hover" overlay={<Overlay>something</Overlay>}>
  <Button className="Toggler">hover [right]</Button>
</Tooltip>

<Tooltip placement="top" trigger="click" overlay={<Overlay>something</Overlay>}>
  <button className="Toggler">click [top]</button>
</Tooltip>

<Tooltip placement="bottom" trigger="click" overlay={<Overlay>something</Overlay>}>
  <button className="Toggler">click [bottom]</button>
</Tooltip>
`

const Button = ({children, ...rest}) => (
  <button {...rest}>{children}</button>
)

const Overlay = ({children, style}) => {
  return <span style={{...style, padding: 10}}>{children}</span>
}


const App = () => {
  const tooltip = <Overlay>something</Overlay>
  return (
    <div className="App">
      <div className="App-titile">
        REACTIP
        <small style={{fontSize: 22, marginLeft: 30}}>Easy Tooltip Component for React</small>
        <div className="App-github">
          <iframe src={`https://ghbtns.com/github-btn.html?user=huozhi&repo=reactip&type=star`} frameBorder="0" scrolling="0" width="60px" height="20px" />
        </div>
      </div>
      <p className="App-subtitle">Examples</p>

      <div className="Demo">
        <Tooltip placement="left" trigger="hover" overlay={tooltip}>
          <button className="Toggler">hover [left]</button>
        </Tooltip>

        <Tooltip placement="right" trigger="hover" overlay={tooltip}>
          <Button className="Toggler">hover [right]</Button>
        </Tooltip>

        <Tooltip placement="top" trigger="click" overlay={tooltip}>
          <button className="Toggler">click [top]</button>
        </Tooltip>

        <Tooltip placement="bottom" trigger="click" overlay={tooltip}>
          <button className="Toggler">click [bottom]</button>
        </Tooltip>
      </div>

      <pre>
        <code className="App-code language-javascript">
          {usageDescription}
        </code>
      </pre>
    </div>
  )
}

render(
  <App />,
  document.getElementById('root')
)
