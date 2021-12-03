import React, { useCallback, useEffect, useState } from "react";
import { ReactComponent as CartImage } from "./cart.svg";
import * as Markup from "./cart.styles";
import { useDispatch } from "react-redux";
import { loadCart } from "../../pages/process/process.reducer";

export const Cart = React.memo((props) => {
  const { id, number, quality, qualityLevel, supplier, weight, isAnimated = false } = props;
  const [hasMargin, setHasMargin] = useState(isAnimated);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => setHasMargin(false), 1);
  }, []);

  const handleLoadDetails = useCallback(() => {
    dispatch(loadCart(id));
  }, [id, dispatch]);

  return (
    <Markup.Wrapper onClick={handleLoadDetails} {...{ hasMargin, isAnimated }} qualityLevel={qualityLevel}>
      <CartImage />
      {supplier && <Markup.Supplier>{supplier.name}</Markup.Supplier>}
      <Markup.Number>{number}</Markup.Number>
      <Markup.Quality>{quality}%</Markup.Quality>
      <Markup.Weight>{weight}</Markup.Weight>
    </Markup.Wrapper>
  );
});
