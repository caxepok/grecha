import React, { useEffect, useState } from "react";
import { ReactComponent as CartImage } from "./cart.svg";
import * as Markup from "./cart.styles";

export const Cart = React.memo((props) => {
  const { number, quality, qualityLevel, supplier, weight, isAnimated = false } = props;
  const [hasMargin, setHasMargin] = useState(isAnimated);

  useEffect(() => {
    setTimeout(() => setHasMargin(false), 1);
  }, []);

  return (
    <Markup.Wrapper {...{ hasMargin, isAnimated }} qualityLevel={qualityLevel}>
      <CartImage />
      {supplier && <Markup.Supplier>{supplier.name}</Markup.Supplier>}
      <Markup.Number>{number}</Markup.Number>
      <Markup.Quality>{quality}%</Markup.Quality>
      <Markup.Weight>{weight}</Markup.Weight>
    </Markup.Wrapper>
  );
});
