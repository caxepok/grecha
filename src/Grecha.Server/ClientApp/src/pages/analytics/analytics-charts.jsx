import React, { useEffect, useMemo } from "react";
import { ChartLine, Layout, Tabs } from "../../components";
import { useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadAnalytics } from "./analytics.reducer";

export const AnalyticsCharts = React.memo(() => {
  const tabs = useMemo(
    () => [
      { id: "day", label: "День" },
      { id: "month", label: "Месяц" },
    ],
    [],
  );
  const { period } = useParams();
  const dispatch = useDispatch();

  const data = useSelector(({ analytics }) => analytics.charts && analytics.charts[period], shallowEqual);
  useEffect(() => {
    dispatch(loadAnalytics(period));
  }, [dispatch, period]);

  return (
    <Layout.Card title="Чистота сырья">
      <Layout.Column sizes={["auto", 1]}>
        <Tabs items={tabs} param={"period"} />
        <ChartLine values={data} period={period} threshold={90} />
      </Layout.Column>
    </Layout.Card>
  );
});
