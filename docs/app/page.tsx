'use client'

import { highlight } from 'sugar-high'
import { ReflowButton, Dialog, HorizontalOverlay, VerticalOverlay } from './components/ui'
import { usePopover } from 'react-overlay-trigger'

const basicExampleCode = highlight(`\
import React from 'react'
import { usePopover } from 'react-overlay-trigger'

const Popover = ({ style, ...rest }) => <span {...rest}>{children}</span>

const { popover, triggerProps } = usePopover(Popover, {
  placement: 'right',
  clickToggle: true,
})

return (
  <>
    {popover}
    <button {...triggerProps}>click</button>
  </>
)
`)

function Example({ children, code, title }) {
  const codeHtml = highlight(code)
  return (
    <div className="Example">
      <div className="Example-title" tabIndex={0}>
        {title}
      </div>
      <div className="Example-instance">{children}</div>
      <div className="Example-code">
        <pre className="language-javascript">
          <code className="App-code" dangerouslySetInnerHTML={{ __html: codeHtml }} />
        </pre>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="App">
      <div className="App-title">
        <h2>React Overlay Trigger</h2>
        <small>
          <span>Positioned overlay Component for React</span>

          <span className="App-github">
            <a target={`_blank`} href={`https://github.com/huozhi/react-overlay-trigger`}>
              <svg
                width="20"
                height="20"
                fill="var(--theme-text-color)"
                aria-hidden="true"
                viewBox="0 0 16 16"
                version="1.1"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
            </a>
          </span>
        </small>
      </div>

      <p className="App-description">
        The `usePopover` hook can help you position an overlay popover relative to the trigger element.
        You can use it to create tooltips, popovers, and other overlays.
      </p>

      <h2 className="App-subtitle">Getting Started</h2>

      <div className="App-sample">
        <h3>Install</h3>
        <pre className="language-javascript">
          <code className="App-code">{`npm i -S react-overlay-trigger`}</code>
        </pre>
        <pre className="language-javascript">
          <code className="App-code" dangerouslySetInnerHTML={{ __html: basicExampleCode }} />
        </pre>
      </div>

      <DemoSection />
    </div>
  )
}

function DemoSection() {
  return (
    <>
      <h2 className="App-subtitle">Examples</h2>
      <div className="Demo">
        <DemoClick />
        <DemoHover />
        <DemoConfirm />
      </div>
    </>
  )
}

function DemoClick() {
  const {
    popover: popoverRightClick, 
    triggerProps: triggerPropsRightClick
  } = usePopover(VerticalOverlay, {
    placement: 'right',
    clickToggle: true,
  })

  const {
    popover: popoverBottomClick, 
    triggerProps: triggerPropsBottomClick
  } = usePopover(HorizontalOverlay, {
    placement: 'bottom',
    clickToggle: true,
  })

  return (
    <>
    <h3>Clickable Popover</h3>
        <Example
          title="Tooltip: click, tooltip show on bottom and right"
          code={`\
const { popover, triggerProps } = usePopover(Dialog, {
  placement: 'right',
  clickToggle: true,
})

return (
  <>
    {popover}
    <button {...triggerProps}>click to toggle tips</button>
  </>
)
`}
        >
          <div>
            {popoverRightClick}
            <button {...triggerPropsRightClick} className="Trigger">
              click to toggle tips
            </button>

            {popoverBottomClick}
            <button {...triggerPropsBottomClick} className="Trigger">
              click to toggle tips
            </button>
            
          </div>
        </Example>
        </>
  )
}

function DemoHover() {
  const {
    popover: popoverTop, 
    triggerProps: triggerPropsTop,
  } = usePopover(HorizontalOverlay, {
    placement: 'top',
    focusToggle: true,
    hoverToggle: true,
  })

  const {
    popover: popoverRight, 
    triggerProps: triggerPropsRight,
  } = usePopover(VerticalOverlay, {
    placement: 'right',
    focusToggle: true,
    hoverToggle: true,
  })

  return (
    <>
      <h3>Hover Popover</h3>
      <Example
        title={'Tooltip: Mouse hover and tab focus will trigger tooltips. They will show on top and left'}
        code={`\
  function Tooltip({style, onClose, ...props}, ref) {
    return (
      <div>
        <div>Tooltip content....</div>
        <button onClick={onClose}>close</button>
      </div>
    )
  }

  const { popover, triggerProps } = usePopover(Dialog, {
    placement="top"
    toggleHover: true,
    toggleFocus: true,
  })

  return (
    <>
      {popover}
      <button {...triggerProps}>click to open dialog</button>
    </>
  )`}
      >
        {popoverTop}
        <ReflowButton vertical={false} {...triggerPropsTop} className='Trigger'>
          horizontal resize
        </ReflowButton>

        {popoverRight}
        <ReflowButton vertical={true} {...triggerPropsRight} className='Trigger'>
          vertical resize
        </ReflowButton>
      </Example>
    </>
  )
}


function DemoConfirm() {
  const { popover, triggerProps } = usePopover(Dialog, {
    placement: 'center',
    clickToggle: true,
  })

  return (
    <Example
          title={'Dialog: Open a dialog flowing over the trigger button.'}
          code={`\
function Dialog({style, onClose, ...props}, ref) {
  return (
    <div>
      <div>Dialog content....</div>
      <button onClick={onClose}>close</button>
    </div>
  )
}

const { popover, triggerProps } = usePopover(Dialog, {
  placement: 'center',
  clickToggle: true,
})

return (
  <>
    {popover}
    <button {...triggerProps}>click to open dialog</button>
  </>
)`}

        >
          {popover}
          <button {...triggerProps} className='Trigger'>Confirm</button>
        </Example>
  )
}