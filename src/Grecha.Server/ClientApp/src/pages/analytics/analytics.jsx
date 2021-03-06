import React, { useEffect, useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import { Layout, NavList, Tabs } from "../../components";
import { AnalyticsSupplier } from "./analytics-supplier";
import { AnalyticsCharts } from "./analytics-charts";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadSuppliers } from "./analytics.reducer";

export const Analytics = React.memo(() => {
  const dispatch = useDispatch();
  const suppliers = useSelector(({ analytics }) => analytics.suppliers, shallowEqual);
  useEffect(() => dispatch(loadSuppliers()), [dispatch]);

  const tabs = useMemo(
    () => [
      { id: "suppliers", label: "Поставщики" },
      { id: "quality", label: "Сырье" },
    ],
    [],
  );

  return (
    <Layout.Page
      title={"Аналитика"}
      tabs={
        <Route path={"/analytics/:tab?"}>
          <Tabs param="tab" items={tabs} />
        </Route>
      }>
      <Switch>
        <Route path={`/analytics/${tabs[0].id}/:id?`}>
          <Layout.Row sizes={["300px", 1]}>
            <Layout.Card title="Поставщики">
              <NavList items={suppliers} />
            </Layout.Card>
            <Layout.Card>
              <Layout.Column sizes={["auto", 1]}>
                <AnalyticsSupplier />
              </Layout.Column>
            </Layout.Card>
          </Layout.Row>
        </Route>
        <Route path={`/analytics/${tabs[1].id}/:period?`}>
          <Layout.Row>
            <AnalyticsCharts />
          </Layout.Row>
        </Route>
      </Switch>
    </Layout.Page>
  );
});
