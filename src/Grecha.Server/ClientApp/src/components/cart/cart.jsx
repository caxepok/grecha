import React, { useEffect, useState } from "react";
import { ReactComponent as CartImage } from "./cart.svg";
import { qualityColors } from "../../consts";
import * as Markup from "./cart.styles";

export const Cart = React.memo((props) => {
  const { number, quality, qualityLevel, isAnimated = false } = props;
  const [hasMargin, setHasMargin] = useState(isAnimated);

  useEffect(() => {
    setTimeout(() => setHasMargin(false), 1);
  }, []);

  return (
    <Markup.Wrapper {...{ hasMargin }}>
      <CartImage fill={qualityColors[qualityLevel]} />
      <Markup.Number>{number}</Markup.Number>
      <Markup.Quality>{quality}%</Markup.Quality>
    </Markup.Wrapper>
  );
});
