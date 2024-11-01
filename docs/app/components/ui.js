'use client'

import React, { useState, cloneElement } from 'react'
import { useOverlayTrigger } from 'react-overlay-trigger'

export function OverlayTrigger({ children, ...props }) {
  const {
    overlay: overlayElement,
    triggerProps,
  } = useOverlayTrigger(props)
  
  return (
    <>
      {cloneElement(children, triggerProps)}
      {overlayElement}
    </>
  )
}

export function VerticalOverlay({ style, ...props }) {
  return <Overlay placement={'vertical'} style={style} {...props} />
}

export function HorizontalOverlay({ style, ...props }) {
  return <Overlay placement={'horizontal'} style={style} {...props} />
}

export function Overlay({ style, placement, ...props }) {
  return (
    <div {...props} style={{ padding: placement === 'vertical' ? '0px 8px' : '8px 0px', ...style }}>
      <span
        className="Overlay"
        style={{
          padding: '4px 8px',
          backgroundColor: 'var(--theme-background--dark)',
          color: '#ccc',
          lineHeight: 1,
          fontWeight: 500,
          borderRadius: '12px',
        }}
      >
        Tooltip
      </span>
    </div>
  )
}

export function Dialog({ style, onClose, ...props }) {
  return (
    <div
      {...props}
      style={{
        ...style,
        backgroundColor: '#efefe5',
        color: 'var(theme-text-color)',
        lineHeight: 1,
        fontWeight: 500,
        borderRadius: '6px',
      }}
      className="Dialog"
    >
      <h2>{`Confirmation`}</h2>
      <button className="Trigger" onClick={onClose}>
        close
      </button>
    </div>
  )
}

export const ReflowButton = (({ children, vertical, onClick, ...rest }) => {
  const [g, setG] = useState(true)
  const style = {}
  if (vertical) {
    style.height = g ? 40 : 300
  } else {
    style.width = g ? 160 : 300
  }
  return (
    <button
      {...rest}
      onClick={(e) => {
        onClick && onClick(e)
        setG(!g)
      }}
      style={style}
    >
      {children}
    </button>
  )
})

export const Button = ((props, ref) => <button {...props} />)
