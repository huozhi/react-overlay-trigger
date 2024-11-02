import React, { useState } from 'react'

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

export function ReflowButton({
  vertical,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  vertical?: boolean
}): JSX.Element {
  const [g, setG] = useState(true)
  const style: any = {}
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
    />
  )
}

export const Button = (props) => <button {...props} />
