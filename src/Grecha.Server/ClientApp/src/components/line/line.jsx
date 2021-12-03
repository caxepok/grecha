import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../layout";
import { ReactComponent as CraneImage } from "./crane.svg";
import { Cart } from "../cart/cart";
import * as Markup from "./line.styles";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadPhoto } from "../../pages/process/process.reducer";

export const Line = React.memo((props) => {
  const { id, title, data } = props;
  const [isAnimated, setAnimated] = useState(false);
  const dispatch = useDispatch();
  const photo = useSelector(({ process }) => process.photos[id], shallowEqual);

  useEffect(() => {
    data && setAnimated(true);
  }, [data]);

  const [lastCartId, lastMeasureId] = useMemo(() => {
    if (!data || !data.length) return [0, 0];
    const measures = data[data.length - 1].measures;
    if (!measures || !measures.length) return [0, 0];

    return [data[data.length - 1].id, measures[measures.length - 1]];
  }, [data]);

  useEffect(() => {
    lastMeasureId && dispatch(loadPhoto(id, lastCartId, lastMeasureId));
  }, [lastCartId, lastMeasureId, id, dispatch]);

  console.log(photo);

  return (
    <Layout.Card align="center" title={title}>
      <Layout.Row sizes={["500px", 1]}>
        <Markup.Carts>
          <Markup.Crane>
            <CraneImage />
          </Markup.Crane>
          {data && data.map((item) => <Cart key={item.number} {...item} isAnimated={isAnimated} />)}
        </Markup.Carts>
        <Markup.Photo>{photo && <img src={photo} alt={""} height={130} />}</Markup.Photo>
      </Layout.Row>
    </Layout.Card>
  );
});
