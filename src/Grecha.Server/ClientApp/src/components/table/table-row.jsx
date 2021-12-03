import React, { useMemo } from "react";
import * as Markup from "./table.styles";

export const TableRow = React.memo((props) => {
  const { data, parser } = props;
  const values = useMemo(
    () => Object.keys(data).map((k) => (parser && parser[k] ? parser[k](data[k]) : data[k])),
    [data, parser],
  );

  return (
    <>
      <Markup.Row>
        {values.map((item, index) => {
          return <Markup.Cell key={index}>{item}</Markup.Cell>;
        })}
      </Markup.Row>
    </>
  );
});
