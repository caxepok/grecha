import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components";
import styled from "styled-components";
import { loadMeasurePhoto } from "../process/process.reducer";

export const CartDetailsPhoto = React.memo((props) => {
  const { id, cartId } = props;
  const dispatch = useDispatch();
  const photo = useSelector(({ process }) => process.measurePhotos[id]);

  const handleLoadPhoto = useCallback(() => {
    dispatch(loadMeasurePhoto(cartId, id));
  }, [id, cartId, dispatch]);

  return photo ? (
    <>
      <a href={photo.up} target="_blank" rel="noreferrer">
        <Image src={photo.up} />
      </a>
      <a href={photo.side} target="_blank" rel="noreferrer">
        <Image src={photo.side} />
      </a>
    </>
  ) : (
    <Button onClick={handleLoadPhoto}>См. фото</Button>
  );
});

const Image = styled.img`
  height: 70px;
  margin-left: 4px;
`;
