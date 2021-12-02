import React from "react";
import * as Markup from "./chart.styles";

export const ChartHorizontalGrid = React.memo(() => {
  return (
    <Markup.HorizontalGrid>
      {[25, 50, 75, 100].map((value) => (
        <span key={value} data-value={`${value}%`} />
      ))}
    </Markup.HorizontalGrid>
  );
});
