import React, { useMemo } from "react";
import * as Markup from "./numbers.styles";

export const Numbers = React.memo((props) => {
  const { todayValue, yesterdayValue, threshold } = props;

  const todayType = useMemo(() => (todayValue >= threshold ? "success" : "danger"), [todayValue, threshold]);
  const difference = useMemo(
    () => (typeof yesterdayValue === "number" ? todayValue - yesterdayValue : null),
    [todayValue, yesterdayValue],
  );
  const differenceType = useMemo(
    () => (typeof difference === "number" ? (difference >= 0 ? "success" : "danger") : null),
    [difference],
  );

  return (
    <Markup.Wrapper>
      <Markup.Number type={todayType}>{todayValue}%</Markup.Number>
      {difference !== null && <Markup.Number type={differenceType}>{difference}%</Markup.Number>}
    </Markup.Wrapper>
  );
});
