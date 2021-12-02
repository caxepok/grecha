import styled, { css } from "styled-components";
import { colors } from "../../consts";

export const Table = styled.div`
  flex-basis: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

export const Body = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  overflow: auto;
`;

export const Head = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  font-size: 12px;
  font-weight: 700;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  margin: 1px 0;
  font-size: ${(p) => p.theme.typography.fontSize};
  color: ${(p) => p.theme.colors.primary};
  position: relative;
`;

export const Title = styled.span`
  min-width: 300px;
  flex-grow: 2;
  display: flex;
  align-items: center;
  padding: 8px 6px;
  padding-left: ${(p) => p.depth * 10 + 30}px;
  cursor: ${(p) => (p.onClick ? "pointer" : "default")};
  box-shadow: 0 1px 0 ${(p) => p.theme.colors.quarternary};
  font-weight: 700;
`;

export const Value = styled.span`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
  color: ${(p) => p.color || "inherit"};
  background: ${(p) => p.background};
  font-weight: ${(p) => p.fontWeight || "inherit"};
  margin-left: 2px;
  border-radius: 3px;
  position: relative;
  cursor: default;

  ${(p) =>
    p.hasWarning &&
    css`
      &:before {
        content: "";
        position: absolute;
        top: -2px;
        right: -2px;
        width: 8px;
        height: 8px;
        border-radius: 5px;
        background: ${colors.danger};
        display: inline-block;
        border: 1px solid #ffffff;
      }
    `};
`;

export const Tip = styled.span`
  white-space: pre;
  font-weight: 400;
`;

export const Shevron = styled.span`
  width: 12px;
  height: 12px;
  position: absolute;
  top: 50%;
  margin-left: -22px;
  transform: translateY(-50%) rotate(${(p) => (p.isExpanded ? 270 : 180)}deg);
  fill: ${(p) => p.theme.colors.secondary};
`;
