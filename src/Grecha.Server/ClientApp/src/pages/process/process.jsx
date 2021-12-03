import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Line, Layout } from "../../components";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadCarts, addMeasure } from "./process.reducer";
import { API_URL } from "../../consts";

export const Process = React.memo(() => {
  const dispatch = useDispatch();
  const [lines, setLines] = useState(null);
  const carts = useSelector(({ process }) => process?.carts, shallowEqual);

  useEffect(() => !carts && dispatch(loadCarts()), [carts, dispatch]);

  useEffect(() => {
    if (carts) {
      setLines([
        carts.filter((cart) => cart.line === 1),
        carts.filter((cart) => cart.line === 2),
        carts.filter((cart) => cart.line === 3),
      ]);
    }
  }, [carts]);

  const handleUpdateCart = useCallback((data) => dispatch(addMeasure(data)), [dispatch]);

  useEffect(() => {
    const hubConnection = new HubConnectionBuilder().withUrl(`${API_URL}/hub`).withAutomaticReconnect().build();
    hubConnection.on("Measured", handleUpdateCart);
    hubConnection.start();

    return () => hubConnection?.stop();
  }, [handleUpdateCart]);

  return (
    <Layout.Page title="Процесс">
      {lines ? (
        <Lines>
          <Line id={1} title={"Площадка №1"} data={lines[0]} />
          <Line id={2} title={"Площадка №2"} data={lines[1]} />
          <Line id={3} title={"Площадка №3"} data={lines[2]} />
        </Lines>
      ) : (
        <Layout.Row>
          <Layout.Card align="center">Загрузка...</Layout.Card>
        </Layout.Row>
      )}
    </Layout.Page>
  );
});

const Lines = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  width: 100%;
`;
