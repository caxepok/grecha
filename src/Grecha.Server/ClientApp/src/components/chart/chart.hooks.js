import { useMemo } from "react";

export const useChartLine = (values) => {
  const data = useMemo(() => {
    if (!values) return [];
    return values
      .map((item) => ({ x: new Date(item.date.substr(0, 19)), y: item.value }))
      .sort((a, b) => (a.x > b.x ? 1 : -1));
  }, [values]);

  const limits = useMemo(() => {
    if (!data) return [];
    return [
      { x: data[0].x, y: 0 },
      { x: data[data.length - 1].x, y: 100 },
    ];
  }, [data]);

  return [data, limits];
};
