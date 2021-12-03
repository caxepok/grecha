import React from "react";
import { TableRow } from "./table-row";
import * as Markup from "./table.styles";

export const Table = React.memo((props) => {
  const { head, data, parser } = props;

  if (!data) {
    return null;
  }

  return (
    <div style={{ width: "100%" }}>
      <Markup.Table>
        <Markup.Head>
          <Markup.Row>
            {head.map((item, index) => (
              <Markup.Cell key={index}>{item}</Markup.Cell>
            ))}
          </Markup.Row>
        </Markup.Head>
        <Markup.Body>
          {data.map((item, index) => (
            <TableRow key={index} data={item} parser={parser} />
          ))}
        </Markup.Body>
      </Markup.Table>
    </div>
  );
});
