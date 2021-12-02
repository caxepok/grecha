import React, { useMemo } from "react";
import { TableRow } from "./table-row";
import * as Markup from "./table.styles";
import { AutoSizer } from "react-virtualized";
import format from "date-fns/format";

export const Table = React.memo((props) => {
  const { data, threshold, isCompare } = props;
  const headData = useMemo(() => {
    if (!data || !data.length) return null;

    return data[0].values.map((x) => x.date);
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <AutoSizer>
      {(style) => (
        <Markup.Table style={style}>
          <Markup.Head>
            <span />
            {headData.map((item, index) => (
              <Markup.Value key={index}>{format(new Date(item), "dd/MM")}</Markup.Value>
            ))}
          </Markup.Head>
          <Markup.Body>
            {data.map((item) => (
              <TableRow key={`${item.name}${item.id}`} {...item} threshold={threshold} isCompare={isCompare} />
            ))}
          </Markup.Body>
        </Markup.Table>
      )}
    </AutoSizer>
  );
});
