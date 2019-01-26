import React from 'react'
import Arrow from './Arrow'

class Popup extends React.Component {
  static defaultProps = {
    arrowSize: 5,
    placement: 'left',
  }

  getDefaultStyle(style) {
    return Object.assign({
      position: 'absolute',
      padding: '2px 10px',
      lineHeight: 1.7,
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#fff',
      backgroundColor: '#fff',
      fontSize: 13,
      color: '#354052',
      boxShadow: '0 5px 20px 0 rgba(0, 34, 20, .5)',
    }, style)
  }

  render() {
    const {children, style, pos, placement} = this.props

    return (
      <div
        ref={(ref) => this.ref = ref}
        css={`
          top: ${pos.top}px;
          left: ${pos.left}px;
          ${this.getDefaultStyle(style)}
        `}
      >
        <div
          css={`
            position: relative;
            max-width: 300px;
          `}
        >
          {children}
        </div>
        <Arrow placement={placement} />
      </div>
    )
  }
}

export default Popup
