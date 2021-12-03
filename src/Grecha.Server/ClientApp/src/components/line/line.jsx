import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../layout";
import { ReactComponent as CraneImage } from "./crane.svg";
import { Cart } from "../cart/cart";
import * as Markup from "./line.styles";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadPhoto } from "../../pages/process/process.reducer";

export const Line = React.memo((props) => {
  const { title, data } = props;
  const [isAnimated, setAnimated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    data && setAnimated(true);

    return () => setAnimated(false);
  }, [data]);

  const [lastCartId, lastMeasureId] = useMemo(() => {
    if (!data || !data.length) return [0, 0];
    const measures = data[data.length - 1].measures;
    if (!measures || !measures.length) return [0, 0];

    return [data[data.length - 1].id, measures[measures.length - 1]];
  }, [data]);

  useEffect(() => {
    lastMeasureId && dispatch(loadPhoto(lastCartId, lastMeasureId));
  }, [lastCartId, lastMeasureId, dispatch]);

  const photo = useSelector(({ process }) => process.measuresPhoto[lastMeasureId], shallowEqual);
  const [images, setImages] = useState([photo]);
  useEffect(() => {
    photo && setImages((images) => [images[images.length - 1], photo]);
  }, [photo]);

  return (
    <Layout.Card align="center" title={title}>
      <Layout.Row sizes={[1, "260px"]}>
        <Markup.Carts>
          <Markup.Crane>
            <CraneImage />
          </Markup.Crane>
          {data && data.map((item) => <Cart key={item.number} {...item} isAnimated={isAnimated} />)}
        </Markup.Carts>
        <Markup.Photo>{images.map((image) => image && <img src={image} key={image} alt="" />)}</Markup.Photo>
      </Layout.Row>
    </Layout.Card>
  );
});
