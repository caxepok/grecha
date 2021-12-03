import styled, { css } from "styled-components";

export const Wrapper = styled.span`
  min-width: 170px;
  height: 65px;
  margin-left: -5px;
  margin-right: ${(p) => (p.hasMargin ? -170 : 0)}px;
  position: relative;
  transition: margin 1s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 20px 30px;
  color: #000;

  > svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export const Number = styled.span(
  ({ theme: { typography } }) => css`
    font-size: ${typography.fontSize};
    font-weight: 700;
    text-transform: uppercase;
    position: relative;
  `,
);

export const Quality = styled.span(
  ({ theme: { typography } }) => css`
    font-size: ${typography.fontSize};
    font-weight: 700;
    margin-left: auto;
    margin-top: 10px;
    position: relative;
  `,
);

export const Lock = styled.span`
  position: absolute;
  width: 20px;
  height: 3px;
  right: 100%;
  background: silver;
  bottom: 4px;

  *:first-child > & {
    display: none;
  }
`;

export const Wheels = styled.span`
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
