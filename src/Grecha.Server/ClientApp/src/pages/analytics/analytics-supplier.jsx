import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSupplier } from "./analytics.reducer";
import { Layout, Table } from "../../components";
import { AnalyticsSupplierPhotos } from "./analytics-supplier-photos";
import styled from "styled-components";

export const AnalyticsSupplier = React.memo(() => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector(({ analytics }) => analytics.details, shallowEqual);

  useEffect(() => {
    dispatch(loadSupplier(id));
  }, [dispatch, id]);

  const total = useMemo(() => {
    return details && details.length
      ? details
          .map((x) => x.quality)
          .reduce((prev, next) => {
            return prev + next;
          }) / details.length
      : 0;
  }, [details]);

  const data = useMemo(
    () =>
      details &&
      details.map((item) => ({
        cartNumber: `Вагон ${item.number}`,
        quality: `${item.quality}%`,
        photos: <AnalyticsSupplierPhotos measures={item.measures} />,
      })),
    [details],
  );

  return (
    <Layout.Column sizes={["auto", 1]}>
      <Table head={["Вагон", "Качество", "Фото"]} data={data}>
        <Footer>
          <span>Итого по поставщику</span>
          <span>{total.toFixed(2)}%</span>
        </Footer>
      </Table>
    </Layout.Column>
  );
});

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${(p) => p.theme.colors.primary};
  padding: 8px;
  font-weight: 700;
`;
