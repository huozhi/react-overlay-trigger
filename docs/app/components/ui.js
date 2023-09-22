'use client'

import React, { useState, forwardRef } from 'react'
import OverlayTrigger from 'react-overlay-trigger'

export { OverlayTrigger }

export const Overlay = forwardRef(function Overlay({ style, placement, ...props }, ref) {
  return (
    <div ref={ref} {...props} style={{ padding: placement === 'vertical' ? '0px 8px' : '8px 0px', ...style}}>
      <span
        className="Overlay"
        style={{
          padding: '4px 8px',
          backgroundColor: 'var(--theme-background--dark)',
          color: '#ccc',
          lineHeight: 1,
          fontWeight: 500,
          borderRadius: '2px',
        }}
      >
        Tooltip
      </span>
    </div>
  )
})

export const Dialog = forwardRef(function Dialog({ style, onClose, ...props }, ref) {
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
      className="Dialog"
    >
      <h2>{`Hello world!`}</h2>
      <button className="Trigger" onClick={onClose}>
        close
      </button>
    </div>
  )
})

export const ReflowButton = forwardRef(({ children, vertical, onClick, ...rest }, ref) => {
  const [g, setG] = useState(true)
  const style = {}
  if (vertical) {
    style.height = g ? 300 : 150
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
      ref={ref}
      style={style}
    >
      {children}
    </button>
  )
})

export const Button = forwardRef((props, ref) => <button {...props} ref={ref} />)
