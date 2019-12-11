import React, {useState} from 'react'
import {render} from 'react-dom'
import OverlayTrigger from '..'
import './app.css'

const usageDescription = `
function Overlay({style, ...rest}) {
  return <span style={{...style, padding: 10, backgroundColor: 'rgba(255, 255, 255, .3)'}}>tooltip</span>
}

const overlay = <Overlay>tooltip</Overlay>

<OverlayTrigger placement="left" triggers={['hover']} overlay={overlay}>
  <button className="Trigger">hover [left]</button>
</OverlayTrigger>

<OverlayTrigger placement="right" triggers={['hover']} overlay={overlay}>
  <button className="Trigger">hover [right]</button>
</OverlayTrigger>

<OverlayTrigger placement="top" triggers={['click']} overlay={overlay}>
  <button className="Trigger">click [top]</button>
</OverlayTrigger>

<OverlayTrigger placement="bottom" triggers={['click']} overlay={overlay}>
  <button className="Trigger">click [bottom]</button>
</OverlayTrigger>
`

const Overlay = React.forwardRef(({style, ...rest}, ref) => {
  return (
    <span
      {...rest}
      ref={ref}
      style={{
        ...style,
        padding: '2px 8px',
        backgroundColor: '#000',
        color: '#fff',
        lineHeight: 1,
        fontWeight: 500,
        borderRadius: 3,
      }}
    >
      tooltip
    </span>
  )
})

const ReflowButton = React.forwardRef(({children, onClick, ...rest}, ref) => {
  const [g, setG] = useState(true)
  return (
    <button
      {...rest}
      onClick={(e) => {
        onClick && onClick(e)
        setG(!g)
      }}
      ref={ref}
    >
      {g ? children : '>>> ' + children + ' <<<'}
    </button>
  )
})

const Button = React.forwardRef((props, ref) => <button {...props} ref={ref} /> )

const App = () => {
  const overlay = <Overlay>yep</Overlay>
  return (
    <div className="App">
      <div className="App-titile">
        <h2 style={{margin: '0.2em 0'}}>React Overlay Trigger</h2>
        <small style={{fontSize: 22}}>Positioned overlay Component for React</small>
        <div className="App-github">
          <iframe src={`https://ghbtns.com/github-btn.html?user=huozhi&repo=react-overlay-trigger&type=star`} frameBorder="0" scrolling="0" width="60px" height="20px" />
        </div>
      </div>
      <p className="App-subtitle">Examples</p>

      <div className="Demo">
        <div>click the following buttons will reisze button, hover and focus will trigger tooltips</div>
        <div className="Demo-item">
          <OverlayTrigger placement="top" triggers={['hover', 'focus']} overlay={overlay}>
            <ReflowButton className="Trigger">hover/focus [top]</ReflowButton>
          </OverlayTrigger>

          <OverlayTrigger placement="bottom" triggers={['hover', 'focus']} overlay={overlay}>
            <ReflowButton className="Trigger">hover/focus [bottom]</ReflowButton>
          </OverlayTrigger>
        </div>

        <div>click the following buttons will trigger tooltips</div>
        <div className="Demo-item">
          <OverlayTrigger placement="left" triggers={['click']} overlay={overlay}>
            <Button className="Trigger">click [left]</Button>
          </OverlayTrigger>

          <OverlayTrigger placement="right" triggers={['click']} overlay={overlay}>
            <Button className="Trigger">click [right]</Button>
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
