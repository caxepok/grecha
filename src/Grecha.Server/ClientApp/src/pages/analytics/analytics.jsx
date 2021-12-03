import React, { useMemo } from "react";
import { Route } from "react-router-dom";
import { Layout, NavList } from "../../components";

export const Analytics = React.memo(() => {
  const items = useMemo(() => [
    { id: 1, name: "Северсталь" },
    { id: 2, name: "Транснефть" },
    { id: 3, name: "РусСталь" },
  ]);
  return (
    <Layout.Page title="Аналитика">
      <Layout.Row sizes={["300px", 1]}>
        <Layout.Card>
          <Route path={"/analytics/:id?"}>
            <NavList items={items} />
          </Route>
        </Layout.Card>
        <Layout.Card />
      </Layout.Row>
    </Layout.Page>
  );
});
