import styled, { css } from "styled-components";
import { colors } from "../../consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-basis: 100%;
`;

export const Chart = styled.div`
  display: flex;
  flex-basis: 100%;
  margin: 10px 10px 0;
  position: relative;
  box-shadow: inset 0 -2px 0 #00000009, inset 0 -1px 0 #0000001f;

  ${(p) =>
    p.threshold &&
    css`
      &:after {
        font-size: 11px;
        content: "${p.threshold}%";
        position: absolute;
        left: -10px;
        bottom: ${p.threshold}%;
        transform: translateY(50%);
        padding: 0 3px;
        color: ${colors.danger};
      }

      &:before {
        position: absolute;
        content: "";
        left: 0;
        right: 0;
        bottom: ${p.thresholdDirection ? 0 : p.threshold}%;
        height: ${p.thresholdDirection ? p.threshold : 100 - p.threshold}%;
        background: ${colors.danger}11;
        border-${p.thresholdDirection ? "top" : "bottom"}: 1px dashed ${colors.danger};
        z-index: 1;
      }
    `}

  .rv-xy-plot__inner {
    position: relative;
    z-index: 1;
  }

  svg {
    text {
      font-size: 10px;
      fill: #999;
    }

    .rv-xy-plot__series--line {
      fill: none;
      stroke-width: 3px;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .rv-xy-plot__axis__line {
      stroke: #0000001f;
    }

    .rv-xy-plot__grid-lines {
      stroke: #0000001f;
    }
  }
`;

export const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  flex-basis: 100%;
  position: relative;
  z-index: 1;
`;

export const Bar = styled.div(
  (p) => css`
    height: ${p.value}%;
    flex-basis: 100%;
    position: relative;

    > span {
      border-radius: 3px 3px 0 0;
      text-align: center;
      padding-top: 8px;
      font-size: 12px;
      font-weight: 700;
      color: #fff;
      position: absolute;
      min-width: 30px;
      max-width: 60px;
      width: 40%;
      left: 50%;
      top: 0;
      height: 100%;
      transform: translateX(-50%);
      background: linear-gradient(to bottom, ${colors[p.type]} 40%, ${colors[p.type]}99 100%);
    }
  `,
);

export const Round = styled.div`
  flex-basis: 100%;
  position: relative;
`;

export const RoundDiagram = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  > svg {
    transform: rotate(-90deg);
  }
`;

export const RoundValue = styled.span`
  ${(p) => p.theme.typography.title.h2};
  color: ${(p) => p.color};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding-left: 0.2em;
`;

export const HorizontalGrid = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column-reverse;
  font-size: 11px;
  color: ${(p) => p.theme.colors.tertiary};

  > span {
    flex-basis: 100%;
    border-top: 1px solid #00000010;

    &:before {
      position: absolute;
      right: -10px;
      content: attr(data-value);
      background: #fff;
      transform: translateY(-50%);
      padding: 0 3px;
    }
  }
`;

export const Legend = styled.div`
  display: flex;
  margin: 0 10px;
  min-height: 20px;

  > span {
    color: ${(p) => p.theme.colors.secondary};
    display: flex;
    flex-basis: 100%;
    font-size: 11px;
    min-height: 20px;
    align-items: center;
    justify-content: center;
  }
`;

export const Dates = styled.div`
  display: flex;
  margin: 0 10px;
  min-height: 20px;
  justify-content: flex-start;
  flex-direction: row-reverse;
  overflow: hidden;
  font-size: 11px;
  color: ${(p) => p.theme.colors.tertiary};

  > span {
    display: flex;
    flex-basis: 100%;
    min-height: 20px;
    align-items: center;
    justify-content: flex-start;
  }
`;
