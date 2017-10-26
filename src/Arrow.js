import React from 'react'
import {css} from 'emotion'
import styled from 'react-emotion'
import {isHorizontal, getOppositePlacement} from './utils'

;
`
&:before, &:after {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
}

&.Tooltip--top {
  transform: translate(-50%, calc(-100% - 5px));

  &:after {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #fff;
    transform: translateX(-50%);
    bottom: -5px;
    left: 50%;
  }
}

&.Tooltip--bottom {
  transform: translate(-50%, 5px);

  &:after {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #fff;
    transform: translateX(-50%);
    top: -5px;
    left: 50%;
  }
}

&.Tooltip--left {
  transform: translate(calc(-100% - 5px), -50%);

  &:after {
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #fff;
    transform: translateY(-50%);
    right: -5px;
    top: 50%;
  }
}

&.Tooltip--right {
  transform: translate(5px, -50%);

  &:after {
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid #fff;
    transform: translateY(-50%);
    left: -5px;
    top: 50%;
  }
}
`

const Arrow = ({placement, arrowColor = '#fff'}) => (
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
      ${getOppositePlacement(placement)}: -5px;
      ${isHorizontal(placement) ? 'top' : 'left'}: 50%;
    `}
  />
)

export default Arrow
