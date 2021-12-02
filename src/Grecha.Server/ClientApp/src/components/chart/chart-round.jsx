import React from "react";
import * as Markup from "./chart.styles";
import { AutoSizer } from "react-virtualized";
import { useTheme } from "styled-components";

export const ChartRound = React.memo(
  React.forwardRef((props, ref) => {
    const { value, color, ...other } = props;
    const length = 36 * Math.PI;
    const placeholderColor = useTheme().colors.quarternary;
    const percent = value / 100;

    return (
      <Markup.Round>
        <AutoSizer>
          {({ height }) => (
            <Markup.RoundDiagram ref={ref} {...other}>
              <Markup.RoundValue color={color}>{value}%</Markup.RoundValue>
              <svg width={`${height}px`} height={`${height}px`} viewBox="0 0 43 43" xmlns="http://www.w3.org/2000/svg">
                <circle
                  strokeOpacity={0.5}
                  stroke={placeholderColor}
                  strokeWidth="4.4"
                  fill="none"
                  cx="22"
                  cy="22"
                  r="18"
                />
                <circle
                  stroke={color}
                  strokeWidth="4.4"
                  fill="none"
                  strokeDasharray={`${length * percent} ${length * (1 - percent)}`}
                  cx="22"
                  cy="22"
                  r="18"
                />
              </svg>
            </Markup.RoundDiagram>
          )}
        </AutoSizer>
      </Markup.Round>
    );
  }),
);
