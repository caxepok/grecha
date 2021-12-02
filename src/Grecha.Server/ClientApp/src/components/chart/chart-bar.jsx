import React, { useMemo } from "react";
import * as Markup from "./chart.styles";
import { ChartHorizontalGrid } from "./chart-horizontal-grid";

export const ChartBar = React.memo((props) => {
  const { values } = props;
  const legends = useMemo(() => (values ? values.map((item) => item.name) : []), [values]);

  const [threshold, thresholdDirection] = useMemo(() => {
    if (!values || !values[0]) return [null, false];
    return [values[0].threshold, values[0].thresholdDirection];
  }, [values]);

  return (
    <Markup.Wrapper>
      <Markup.Chart threshold={threshold} thresholdDirection={thresholdDirection}>
        <ChartHorizontalGrid />
        <Markup.Bars>
          {values &&
            values.map((item, key) => (
              <Markup.Bar key={key} value={item.value} type={item.value >= threshold ? "success" : "danger"}>
                <span>{item.value.toFixed(0)}%</span>
              </Markup.Bar>
            ))}
        </Markup.Bars>
      </Markup.Chart>

      <Markup.Legend>
        {legends.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </Markup.Legend>
    </Markup.Wrapper>
  );
});
