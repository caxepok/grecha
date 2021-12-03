import styled, { css, keyframes } from "styled-components";
import { qualityColors } from "../../consts";

const flicker = keyframes`
  0% {
    fill: black;
  }
  50% {
    fill: ${qualityColors[4]};
  }
  100% {
    fill: black
  }
`;

export const Wrapper = styled.span(
  ({ theme: { typography }, hasMargin, qualityLevel, isAnimated }) => css`
    min-width: 170px;
    height: 65px;
    margin-left: -5px;
    margin-right: ${hasMargin ? -165 : 0}px;
    position: relative;
    transition: margin 1s;
    padding: 5px 20px 30px;
    color: #000;
    font-size: ${typography.fontSize};
    line-height: ${typography.lineHeight};
    fill: ${qualityColors[qualityLevel]};

    ${qualityLevel === 4 &&
    isAnimated &&
    css`
      &:last-child {
        animation: ${flicker} 1s infinite;
        color: #ffffff;
      }
    `};

    > svg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  `,
);

export const Number = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  position: relative;
  display: block;
`;

export const Supplier = styled.span`
  font-weight: 700;
  position: relative;
  width: 100%;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  text-overflow: ellipsis;
`;

export const Quality = styled.span`
  font-weight: 700;
  margin-left: auto;
  position: absolute;
  right: 17px;
  bottom: 17px;
`;

export const Weight = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -10px;
  text-align: center;
  z-index: 10;
  font-weight: 700;
  color: ${(p) => p.theme.colors.secondary};
`;
