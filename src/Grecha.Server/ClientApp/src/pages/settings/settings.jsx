import React from "react";
import { Layout } from "../../components";

export const Settings = React.memo(() => {
  return (
    <Layout.Page title="Настройки">
      <Layout.Row>
        <Layout.Card />
      </Layout.Row>
    </Layout.Page>
  );
});
