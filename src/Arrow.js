import React from 'react'
import {css} from 'emotion'
import styled from 'react-emotion'
import {isHorizontal, getOppositePlacement} from './utils'

const Arrow = ({placement, arrowColor = '#fff', arrowSize = 5}) => (
  <span
    css={`
      position: absolute;
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-${placement}: 5px solid ${arrowColor};
      transform: ${isHorizontal(placement) ? 'translateY(-50%)' : 'translateX(-50%)'};
      ${getOppositePlacement(placement)}: -${arrowSize * 2}px;
      ${isHorizontal(placement) ? 'top' : 'left'}: 50%;
    `}
  />
)

export default Arrow
