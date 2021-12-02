import React, { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { colors } from "../../consts";

export const Wagon = (props) => {
  const { number, clarity, isAnimated = false, isActive, capacity } = props;
  const [hasMargin, setHasMargin] = useState(isAnimated);

  useEffect(() => {
    setTimeout(() => setHasMargin(false), 1);
  }, []);

  const style = useMemo(() => {
    const height = `${(1 - capacity) * 100}%`;
    if (clarity < 0.9) return { color: "#FFFFFF", background: colors.danger, height };
    if (clarity < 0.95) return { color: "#000000", background: colors.warning, height };
    return { color: "#FFFFFF", background: colors.success, height };
  }, [clarity, capacity]);

  return (
    <Wrapper {...{ hasMargin, isActive }}>
      <Truck style={style}>
        <Number>{number}</Number>
        <Clarity>{clarity * 100}%</Clarity>
      </Truck>
      <Number>{number}</Number>
      <Clarity>{clarity * 100}%</Clarity>
      <Lock />
      <Wheels />
      <Wheels />
    </Wrapper>
  );
};

const Wrapper = styled.span`
  min-width: 120px;
  height: 50px;
  margin-right: ${(p) => (p.hasMargin ? -140 : 0)}px;
  position: relative;
  margin-bottom: 10px;
  transition: margin 2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: silver;
  color: #ffffff;
  padding: ${(p) => p.theme.spacing.small};

  ${(p) =>
    p.isActive &&
    css`
      &:before {
        content: "";
        left: -5px;
        right: -5px;
        bottom: -5px;
        top: -5px;
        position: absolute;
        border: 3px solid #0055aacc;
        z-index: 2;
        border-radius: 4px;
      }
    `}
`;

const Truck = styled.span`
  z-index: 1;
  width: 100%;
  background: silver;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${(p) => p.theme.spacing.small};
  border-radius: 2px;
  position: absolute;
  height: 50%;
  overflow: hidden;
  min-height: 5px;
  top: 0;
  left: 0;
`;

const Number = styled.span(
  ({ theme: { typography } }) => css`
    font-size: ${typography.fontSize};
    font-weight: 700;
    text-transform: uppercase;
  `,
);

const Clarity = styled.span(
  ({ theme: { typography } }) => css`
    font-size: ${typography.fontSize};
    font-weight: 700;
    margin-left: auto;
    margin-top: 10px;
  `,
);

const Lock = styled.span`
  position: absolute;
  width: 20px;
  height: 3px;
  right: 100%;
  background: silver;
  bottom: 4px;

  *:last-child > & {
    display: none;
  }
`;

const Wheels = styled.span`
  &,
  &:before {
    position: absolute;
    bottom: -6px;
    left: 4px;
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: silver;
  }

  &:before {
    content: "";
    bottom: 0;
    left: 12px;
  }

  & + & {
    left: auto;
    right: 16px;
  }
`;
