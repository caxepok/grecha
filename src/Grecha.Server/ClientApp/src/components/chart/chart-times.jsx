import React, { useEffect, useMemo, useRef, useState } from "react";
import format from "date-fns/format";
import subMinutes from "date-fns/subMinutes";
import * as Markup from "./chart.styles";

export const ChartTimes = React.memo((props) => {
  const { values } = props;
  const [params, setParams] = useState();
  const blockRef = useRef(null);
  const count = useMemo(() => {
    if (!values) return 0;
    let end = values[values.length - 1];
    let res = 1;
    for (let i = 1; i < values.length; i++) {
      if (subMinutes(end, 1) > values[0]) {
        res++;
      }
    }

    return res;
  }, [values]);

  useEffect(() => {
    if (count) {
      if (!blockRef.current) return;
      const width = blockRef.current.offsetWidth;
      let multiplier = 1;
      let itemWidth = 200 / (count / multiplier);
      while ((itemWidth / 200) * width < 30) {
        multiplier++;
        itemWidth = 200 / (count / multiplier);
      }

      setParams({ itemWidth, multiplier, count: Math.ceil(count / multiplier) });
    }
  }, [blockRef, count]);

  return (
    <Markup.Dates ref={blockRef}>
      {params &&
        [...new Array(params.count)].map((x, index) => (
          <span key={index} style={{ maxWidth: `${params.itemWidth}%`, minWidth: `${params.itemWidth}%` }}>
            {format(subMinutes(values[values.length - 1], index * params.multiplier), "hh:mm")}
          </span>
        ))}
    </Markup.Dates>
  );
});
