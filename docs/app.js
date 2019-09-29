import React from 'react'
import {render} from 'react-dom'
import OverlayTrigger from 'react-overlay-trigger'
import './app.css'

const usageDescription = `
function Overlay({style, ...rest}) {
  return <span style={{...style, padding: 10, backgroundColor: 'rgba(255, 255, 255, .3)'}}>tooltip</span>
}

const overlay = <Overlay>tooltip</Overlay>

<OverlayTrigger placement="left" trigger="hover" overlay={overlay}>
  <button className="Toggler">hover [left]</button>
</OverlayTrigger>

<OverlayTrigger placement="right" trigger="hover" overlay={overlay}>
  <button className="Toggler">hover [right]</button>
</OverlayTrigger>

<OverlayTrigger placement="top" trigger="click" overlay={overlay}>
  <button className="Toggler">click [top]</button>
</OverlayTrigger>

<OverlayTrigger placement="bottom" trigger="click" overlay={overlay}>
  <button className="Toggler">click [bottom]</button>
</OverlayTrigger>
`

function Overlay({style, ...rest}) {
  return (
    <span
      style={{
        ...style,
        padding: '2px 8px',
        backgroundColor: 'rgba(255, 255, 255, .05)'
      }}
    >
      tooltip
    </span>
  )
}

const App = () => {
  const overlay = <Overlay>yep</Overlay>
  return (
    <div className="App">
      <div className="App-titile">
        React Overlay Trigger
        <small style={{fontSize: 22, marginLeft: 30}}>Positioned overlay Component for React</small>
        <div className="App-github">
          <iframe src={`https://ghbtns.com/github-btn.html?user=huozhi&repo=react-overlay-trigger&type=star`} frameBorder="0" scrolling="0" width="60px" height="20px" />
        </div>
      </div>
      <p className="App-subtitle">Examples</p>

      <div className="Demo">
        <div className="Demo-item">
          <OverlayTrigger placement="left" trigger="hover" overlay={overlay}>
            <button className="Toggler">hover [left]</button>
          </OverlayTrigger>

          <OverlayTrigger placement="right" trigger="hover" overlay={overlay}>
            <button className="Toggler">hover [right]</button>
          </OverlayTrigger>
        </div>
        <div className="Demo-item">
          <OverlayTrigger placement="top" trigger="click" overlay={overlay}>
            <button className="Toggler">click [top]</button>
          </OverlayTrigger>

          <OverlayTrigger placement="bottom" trigger="click" overlay={overlay}>
            <button className="Toggler">click [bottom]</button>
          </OverlayTrigger>
        </div>
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
