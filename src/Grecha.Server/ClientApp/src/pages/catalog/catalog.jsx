import React from "react";
import { Area, Layout } from "../../components";
import styled from "styled-components";

export const PageCatalog = () => {
  return (
    <Layout.Page title="Площадки">
      <Areas>
        <Area id={1} title={"Площадка №1"} />
        <Area id={2} title={"Площадка №2"} />
        <Area id={3} title={"Площадка №3"} />
      </Areas>
    </Layout.Page>
  );
};

const Areas = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  width: 100%;
`;
