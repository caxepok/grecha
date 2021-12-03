import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components";
import styled from "styled-components";
import { loadPhoto } from "../process/process.reducer";

export const CartDetailsPhoto = React.memo((props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const photo = useSelector(({ process }) => process.measuresPhoto[id]);
  console.log(photo);

  const handleLoadPhoto = useCallback(() => {
    dispatch(loadPhoto(0, id));
  }, [id, dispatch]);

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
