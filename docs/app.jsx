import React, {useState} from 'react'
import {render} from 'react-dom'
import OverlayTrigger from 'react-overlay-trigger'

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

const Overlay = React.forwardRef(function Overlay({style, ...props}, ref) {
  return (
    <span
      {...props}
      ref={ref}
      className='Overlay'
      style={{
        ...style,
        padding: '2px 8px',
        backgroundColor: 'var(--theme-background--dark)',
        color: '#ccc',
        lineHeight: 1,
        fontWeight: 500,
        borderRadius: '8px',
      }}
    >
      Tooltip
    </span>
  )
})

const Dialog = React.forwardRef(function Dialog({style, onClose, ...props}, ref) {
  return (
    <div
      {...props}
      style={{
        ...style,
        backgroundColor: '#afd8df',
        color: 'var(theme-text-color)',
        lineHeight: 1,
        fontWeight: 500,
        borderRadius: '8px',
      }}
      ref={ref}
      className='Dialog'
    >
      <h2>{`Hello world!`}</h2>
      <button className='Trigger' onClick={onClose}>close</button>
    </div>
  )
})

const ReflowButton = React.forwardRef(({children, vertical, onClick, ...rest}, ref) => {
  const [g, setG] = useState(true)
  const style = {}
  if (vertical) {
    style.height = g ? 'auto' : 150
  } else {
    style.width = g ? 'auto': 300
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
      {children}
    </button>
  )
})

const Button = React.forwardRef((props, ref) => <button {...props} ref={ref} /> )

const App = () => {
  const overlay = <Overlay />
  return (
    <div className='App'>
      <div className='App-title'>
        <h2>React Overlay Trigger</h2>
        <small>
          <span>Positioned overlay Component for React</span>

          <span className='App-github'>
            <a target={`_blank`} href={`https://github.com/huozhi/react-overlay-trigger`}>
              <svg width='20' height='20' fill='var(--theme-text-color)' aria-hidden='true' viewBox='0 0 16 16' version='1.1'>
                <path fill-rule='evenodd' d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'></path>
              </svg>
            </a>
          </span>
        </small>
      </div>

      <p className='App-description'>
        The `react-overlay-trigger` component helps you position an overlay component relative to the target element.
        You can use it to create tooltips, popovers, and other overlays.
      </p>



      <p className='App-subtitle'>Examples</p>

      <div className='Demo'>
        <Example
          title='Tooltip: click, tooltip show on bottom and right'
          code={`
<OverlayTrigger placement='right' triggers={['click']} overlay={overlay}>
  <Button className='Trigger'>....</Button>
</OverlayTrigger>

<OverlayTrigger placement='bottom' triggers={['click']} overlay={overlay}>
  <Button className='Trigger'>....</Button>
</OverlayTrigger>
            `}
        >
          <div>
            <OverlayTrigger 
              placement='right' 
              triggers={['click']} 
              overlay={overlay}
            >
              <Button className='Trigger'>click to toggle tips</Button>
            </OverlayTrigger>

            <OverlayTrigger placement='bottom' triggers={['click']} overlay={overlay}>
              <Button className='Trigger'>click to toggle tips</Button>
            </OverlayTrigger>
          </div>
        </Example>

        <Example
          title='Tooltip: Mouse hover and tab focus will trigger tooltips. They will show on top and left'
          code={`
<OverlayTrigger placement='top' triggers={['hover', 'focus']} overlay={overlay}>
  <Button className='Trigger'>....</Button>
</OverlayTrigger>

<OverlayTrigger placement='right' triggers={['hover', 'focus']} overlay={overlay}>
  <Button className='Trigger'>....</Button>
</OverlayTrigger>

`
          }
        >
          <div>
            <OverlayTrigger placement='top' triggers={['hover', 'focus']} overlay={overlay}>
              <ReflowButton className='Trigger'>click to resize</ReflowButton>
            </OverlayTrigger>
            <OverlayTrigger placement='right' triggers={['hover', 'focus']} overlay={overlay}>
              <ReflowButton vertical className='Trigger'>click to resize</ReflowButton>
            </OverlayTrigger>
          </div>
        </Example>

        <Example
          title={'Dialog: Open a dialog flowing over the trigger button.'}
          code={`
const Dialog = React.forwardRef(function Dialog({style, onClose, ...props}, ref) {
  return (
    <div>
      <div>Dialog content....</div>
      <button onClick={onClose}>close</button>
    </div>
  )
})

<OverlayTrigger
  placement='center'
  triggers={['click']}
  overlay={<Dialog />}
>
  <button className='Trigger'>Open the dialog</button>
</OverlayTrigger>

`
        }
        >
          <OverlayTrigger
            placement='center'
            triggers={['click']}
            overlay={<Dialog />}
          >
            <button className='Trigger'>Open the dialog</button>
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
