import React, { useMemo } from "react";
import { Popup, Table } from "../../components";
import { loadCart } from "../process/process.reducer";
import { useDispatch } from "react-redux";
import format from "date-fns/format";
import styled from "styled-components";
import { CartDetailsPhoto } from "./cart-details-photo";

export const CartDetails = React.memo((props) => {
  const { number, measures } = props;
  const dispatch = useDispatch();

  const data = useMemo(() => {
    if (!measures || !measures.length) return null;

    return measures.map((item) => ({
      timestamp: item.timestamp,
      quality: item.quality,
      weight: item.weight,
      id: item.id,
    }));
  }, [measures]);

  const head = useMemo(() => ["Дата", "Качество", "Вес", "Фото"], []);

  const parser = useMemo(
    () => ({
      timestamp: (t) => format(new Date(t), "dd.MM.yyyy HH:mm"),
      quality: (q) => `${q}%`,
      id: (id) => <CartDetailsPhoto id={id} />,
    }),
    [],
  );

  return (
    <Popup title={`Вагон №${number}`} onClose={() => dispatch(loadCart())}>
      {data ? <Table {...{ head, data, parser }} /> : <Empty>Нет данных</Empty>}
    </Popup>
  );
});

const Empty = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
