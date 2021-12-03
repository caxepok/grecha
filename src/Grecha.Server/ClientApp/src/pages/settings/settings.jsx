import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Layout, Tabs } from "../../components";
import { Title } from "../../components/layout/card.styles";
import { SettingsInput } from "./settings-input";
import { useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { saveParams } from "./settings.reducer";

export const Settings = React.memo(() => {
  const tabs = useMemo(
    () => [
      { id: "steel", label: "Сталь" },
      { id: "aluminium", label: "Алюминий" },
      { id: "copper", label: "Медь" },
      { id: "iron", label: "Чугун" },
    ],
    [],
  );

  const { tab } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(({ settings }) => settings, shallowEqual);
  const [state, setState] = useState(data);
  useEffect(() => setState(data), [data]);

  const handleChange = useCallback(
    (key, value) => {
      setState((s) => ({
        ...s,
        [tab]: {
          ...s[tab],
          [key]: value,
        },
      }));
    },
    [tab],
  );

  const handleSave = useCallback(() => dispatch(saveParams(state)), [dispatch, state]);

  return (
    <Layout.Page title="Настройки">
      <Layout.Row>
        <Layout.Card>
          <Layout.Column sizes={["auto", 1]}>
            <Tabs items={tabs} param={"tab"} />
            {tab && (
              <Layout.Column sizes={["auto", "auto", "auto", 1]}>
                <Title>Чистота сырья</Title>
                <Layout.Row sizes={["200px", "200px", "200px"]}>
                  <SettingsInput label="Высшая" name="high" value={state[tab].high} onChange={handleChange} />
                  <SettingsInput label="Средняя" name="medium" value={state[tab].medium} onChange={handleChange} />
                  <SettingsInput label="Низкая" name="low" value={state[tab].low} onChange={handleChange} />
                </Layout.Row>
                <div>
                  <br />
                  <Button onClick={handleSave}>Сохранить</Button>
                </div>
                <span />
              </Layout.Column>
            )}
          </Layout.Column>
        </Layout.Card>
      </Layout.Row>
    </Layout.Page>
  );
});
