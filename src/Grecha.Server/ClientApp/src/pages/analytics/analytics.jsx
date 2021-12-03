import React, { useMemo } from "react";
import { Route } from "react-router-dom";
import { Layout, NavList, Table, Button } from "../../components";

export const Analytics = React.memo(() => {
  const items = useMemo(
    () => [
      { id: 1, name: "Северсталь" },
      { id: 2, name: "Транснефть" },
      { id: 3, name: "РусСталь" },
    ],
    [],
  );

  const data = useMemo(
    () => [
      { cartNumber: "1123311", quality: 80, photos: [] },
      { cartNumber: "5461234", quality: 75, photos: [] },
      { cartNumber: "5421676", quality: 64, photos: [] },
      { cartNumber: "7345654", quality: 34, photos: [] },
    ],
    [],
  );

  const parser = useMemo(
    () => ({
      cartNumber: (v) => `Вагон №${v}`,
      quality: (v) => `${v}%`,
      photos: (v) => <span />,
    }),
    [],
  );

  return (
    <Layout.Page title="Аналитика">
      <Layout.Row sizes={["300px", 1]}>
        <Layout.Card>
          <Route path={"/analytics/:id?"}>
            <NavList title="Поставщики" items={items} />
          </Route>
        </Layout.Card>
        <Layout.Card>
          <Layout.Column sizes={["auto", 1]}>
            <div>
              <Button>Отчет по смене</Button>
            </div>
            <Table head={["Вагон", "Качество", "Фото"]} parser={parser} data={data} />
          </Layout.Column>
        </Layout.Card>
      </Layout.Row>
    </Layout.Page>
  );
});
