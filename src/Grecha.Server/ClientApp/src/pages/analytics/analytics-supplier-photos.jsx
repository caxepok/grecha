import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadPhoto } from "../process/process.reducer";
import styled from "styled-components";

export const AnalyticsSupplierPhotos = React.memo((props) => {
  const { measures } = props;
  const dispatch = useDispatch();
  const photos = useSelector(({ process }) => measures.map(({ id }) => process.measuresPhoto[id]), shallowEqual);

  useEffect(() => {
    measures.forEach(({ id, cartId }) => dispatch(loadPhoto(cartId, id)));
  }, [measures, dispatch]);

  return (
    <Wrapper>
      {photos.map((url) => (
        <a href={url} target={"_blank"} rel={"noreferrer"}>
          <Image src={url} key={url} />
        </a>
      ))}
    </Wrapper>
  );
});

const Wrapper = styled.span`
  display: flex;
  gap: 4px;
  margin: -6px 0;
`;

const Image = styled.img`
  width: 40px;
  height: 30px;
  display: block;
`;
