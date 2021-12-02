import React, { useMemo, useState } from "react";
import { v4 } from "uuid";
import ReactTooltip from "react-tooltip";
import { ReactComponent as ExpandIcon } from "../../assets/shevron.svg";
import * as Markup from "./table.styles";
import { colors } from "../../consts";

const getCellStyles = (item, threshold, isCompare) => {
  if (isCompare) {
    const { diff } = item;
    if (typeof diff === "number" && diff > 0) return { background: `${colors.success}44` };
    if (typeof diff === "number" && diff < 0)
      return { background: `${colors.danger}`, color: "#FFFFFF", fontWeight: 700 };
    return { background: `${colors.warning}` };
  }

  const { value } = item;
  if (value > 100) return { background: `#660000`, color: "#FFFFFF", fontWeight: 700 };
  if (value < threshold - 5) return { background: `${colors.danger}`, color: "#FFFFFF", fontWeight: 700 };
  if (value > threshold + 5) return { background: `${colors.success}44` };
  return { background: `${colors.warning}` };
};

const getValueLabel = (item, isCompare = false) => {
  return isCompare
    ? item.destValue
      ? `${item.destValue.toFixed(0)}% (${item.diff.toFixed(1)}%)`
      : "—"
    : `${item.value.toFixed(0)}%`;
};

export const TableRow = React.memo((props) => {
  const { name, childs, values, threshold, depth = 0, isCompare } = props;
  const [isExpanded, setExpanded] = useState(false);
  const hasChildren = useMemo(() => Boolean(childs && childs.length), [childs]);
  const onClick = useMemo(() => {
    return hasChildren ? () => setExpanded((value) => !value) : undefined;
  }, [hasChildren]);

  return (
    <>
      <Markup.Row>
        <Markup.Title depth={depth} onClick={onClick}>
          {hasChildren && (
            <Markup.Shevron isExpanded={isExpanded}>
              <ExpandIcon />
            </Markup.Shevron>
          )}
          {name}
        </Markup.Title>
        {values.map((item, index) => {
          const id = `tooltip-${v4()}`;

          return (
            <Markup.Value
              key={index}
              data-tip
              data-for={id}
              {...getCellStyles(item, threshold, isCompare)}
              hasWarning={item.warning}>
              {getValueLabel(item, isCompare)}
              {item.warning && (
                <ReactTooltip id={id} aria-haspopup="true">
                  <Markup.Tip>{item.warning}</Markup.Tip>
                </ReactTooltip>
              )}
            </Markup.Value>
          );
        })}
      </Markup.Row>
      {hasChildren &&
        isExpanded &&
        childs.map((item) => (
          <TableRow
            depth={depth + 1}
            key={`${item.name}${item.id}`}
            {...item}
            threshold={threshold}
            isCompare={isCompare}
          />
        ))}
    </>
  );
});
