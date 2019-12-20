import React, {useState} from 'react'
import {render} from 'react-dom'
import OverlayTrigger from '..'

function Example({children, code, title}) {
  return (
    <div className='Example'>
      <div className='Example-title' tabIndex={0}>{title}</div>
      <div className='Example-instance'>
        {children}
      </div>
      <div className='Example-code'>
        <pre className='language-javascript'>
          <code className='App-code'>
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}

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
      Tooltip
    </span>
  )
})

const ReflowButton = React.forwardRef(({children, vertical, onClick, ...rest}, ref) => {
  const [g, setG] = useState(true)
  const style = {}
  if (vertical) {
    style.height = g ? 'auto' : 200
  }
  return (
    <button
      {...rest}
      onClick={(e) => {
        onClick && onClick(e)
        setG(!g)
      }}
      ref={ref}
      style={style}
    >
      {!vertical && (g ? children : '>>> ' + children + ' <<<')}
      {vertical && children}
    </button>
  )
})

const Button = React.forwardRef((props, ref) => <button {...props} ref={ref} /> )

const App = () => {
  const overlay = <Overlay />
  return (
    <div className="App">
      <div className="App-title">
        <h2 style={{margin: '0.2em 0'}}>React Overlay Trigger</h2>
        <small style={{fontSize: 22}}>Positioned overlay Component for React</small>
        <span className="App-github">
          <iframe src={`https://ghbtns.com/github-btn.html?user=huozhi&repo=react-overlay-trigger&type=star`} frameBorder="0" scrolling="0" width="60px" height="20px" />
        </span>
      </div>
      <p className="App-subtitle">Examples</p>

      <div className="Demo">
        <Example
          title='click, tooltip show on bottom and right'
          code={`
<OverlayTrigger placement="right" triggers={['click']} overlay={overlay}>
  <Button className="Trigger">....</Button>
</OverlayTrigger>

<OverlayTrigger placement="bottom" triggers={['click']} overlay={overlay}>
  <Button className="Trigger">....</Button>
</OverlayTrigger>
            `}
          >
            <div>
              <OverlayTrigger placement="right" triggers={['click']} overlay={overlay}>
                <Button className="Trigger">click to toggle tips</Button>
              </OverlayTrigger>

              <OverlayTrigger placement="bottom" triggers={['click']} overlay={overlay}>
                <Button className="Trigger">click to toggle tips</Button>
              </OverlayTrigger>
            </div>
          </Example>

          <Example
            title='Only mouse hover will trigger tooltips. they will show on top and left'
            code={`
<OverlayTrigger placement="top" triggers={['hover']} overlay={overlay}>
  <button className="Trigger">....</button>
</OverlayTrigger>

<OverlayTrigger placement="right" triggers={['hover']} overlay={overlay}>
  <button className="Trigger">....</button>
</OverlayTrigger>
            `}
          >
            <div>
              <OverlayTrigger placement="top" triggers={['hover']} overlay={overlay}>
                <ReflowButton className="Trigger">click to resize</ReflowButton>
              </OverlayTrigger>
              <OverlayTrigger placement="right" triggers={['hover']} overlay={overlay}>
                <ReflowButton vertical className="Trigger">click to resize</ReflowButton>
              </OverlayTrigger>
            </div>
          </Example>

          <Example
            title='focus and tooltip show on top and left'
            code={`
<OverlayTrigger placement="top" triggers={['focus']} overlay={overlay}>
  <button className="Trigger">....</button>
</OverlayTrigger>
            `}
          >
            <OverlayTrigger placement="right" triggers={['focus']} overlay={overlay}>
              <Button className="Trigger">focus here</Button>
            </OverlayTrigger>
          </Example>
      </div>
    </div>
  )
}

render((
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ),
  document.getElementById('root')
)
