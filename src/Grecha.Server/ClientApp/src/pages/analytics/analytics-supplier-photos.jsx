import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadMeasurePhoto } from "../process/process.reducer";
import styled from "styled-components";

export const AnalyticsSupplierPhotos = React.memo((props) => {
  const { measures } = props;
  const dispatch = useDispatch();
  const measurePhotos = useSelector(({ process }) => measures.map(({ id }) => process.measurePhotos[id]), shallowEqual);

  useEffect(() => {
    measures.forEach(({ id, cartId }) => {
      dispatch(loadMeasurePhoto(cartId, id));
    });
  }, [measures, dispatch]);

  return (
    <Wrapper>
      {measurePhotos.map(
        (obj) =>
          obj && (
            <>
              <a href={obj.up} target={"_blank"} rel={"noreferrer"}>
                <Image src={obj.up} key={obj.up} />
              </a>
              <a href={obj.side} target={"_blank"} rel={"noreferrer"}>
                <Image src={obj.side} key={obj.side} />
              </a>
            </>
          ),
      )}
    </Wrapper>
  );
});

const Wrapper = styled.span`
  display: flex;
  gap: 4px;
  margin: -6px 0;
  flex-wrap: wrap;
`;

const Image = styled.img`
  height: 40px;
  display: block;
`;
