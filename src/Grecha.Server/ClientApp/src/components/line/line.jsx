import React, { useEffect, useState } from "react";
import { Layout } from "../layout";
import { ReactComponent as CraneImage } from "./crane.svg";
import { Cart } from "../cart/cart";
import * as Markup from "./line.styles";

export const Line = React.memo((props) => {
  const { title, data } = props;
  const [isAnimated, setAnimated] = useState(false);

  useEffect(() => {
    data && setAnimated(true);
  }, [data]);

  return (
    <Layout.Card align="center" title={title}>
      <Layout.Row sizes={["500px", 1]}>
        <Markup.Carts>
          <Markup.Crane>
            <CraneImage />
          </Markup.Crane>
          {data && data.map((item) => <Cart key={item.number} {...item} isAnimated={isAnimated} />)}
        </Markup.Carts>
        <Markup.Info>Какая-то полезная информация и картинки</Markup.Info>
      </Layout.Row>
    </Layout.Card>
  );
});
