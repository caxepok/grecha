import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../layout";
import styled, { css } from "styled-components";
import { Wagon } from "../wagon/wagon";

export const Area = (props) => {
  const { title, id } = props;
  const [isAnimated, setAnimated] = useState(false);
  const [wagons, setWagons] = useState([
    { number: "234ФВФЫ23", clarity: 0.95, capacity: 0 },
    { number: "Ч23БФЫ3ЫФ", clarity: 0.97, capacity: 0 },
    { number: "67ЦКЬ123Б", clarity: 0.82, capacity: 0.5, isActive: true },
    { number: "КЛА21СПП1", clarity: 0.9, capacity: 0 },
    { number: "А2178СПП1", clarity: 0.9, capacity: 0 },
  ]);

  useEffect(() => {
    setTimeout(
      () => setWagons((wagons) => [{ number: "234АБВГ23", clarity: 0.95, capacity: 0.99, isActive: true }, ...wagons]),
      1000,
    );
  }, []);

  useEffect(() => {
    wagons && setAnimated(true);
  }, [wagons]);

  return (
    <Layout.Card title={title}>
      <Wagons>{wagons && wagons.map((item) => <Wagon key={item.number} {...item} isAnimated={isAnimated} />)}</Wagons>
    </Layout.Card>
  );
};

const Wagons = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
  overflow: hidden;
  width: 100%;
  padding: 10px;
`;
