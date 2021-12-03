import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components";
import styled from "styled-components";
import { loadPhoto } from "../process/process.reducer";

export const CartDetailsPhoto = React.memo((props) => {
  const { id, cartId } = props;
  const dispatch = useDispatch();
  const photo = useSelector(({ process }) => process.measuresPhoto[id]);

  const handleLoadPhoto = useCallback(() => {
    dispatch(loadPhoto(cartId, id));
  }, [id, cartId, dispatch]);

  return photo ? (
    <a href={photo} target="_blank" rel="noreferrer">
      <Image src={photo} />
    </a>
  ) : (
    <Button onClick={handleLoadPhoto}>См. фото</Button>
  );
});

const Image = styled.img`
  width: 100px;
  height: 70px;
`;
