import React, { useMemo } from "react";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import processReducer from "./pages/process/process.reducer";
import analyticsReducer from "./pages/analytics/analytics.reducer";
import thunk from "redux-thunk";
import theme from "./theme";
import { Layout, Navigation } from "./components";
import { Process, Analytics, Settings } from "./pages";

function App() {
  const composeEnhancers =
    process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

  const store = createStore(
    combineReducers({
      process: processReducer,
      analytics: analyticsReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );

  const sizes = useMemo(() => ["280px", 1], []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Layout>
            <Layout.Row sizes={sizes}>
              <Route path="/:page" component={Navigation} />
              <Switch>
                <Route path="/process" component={Process} />
                <Route path="/analytics" component={Analytics} />
                <Route path="/settings" component={Settings} />
                <Redirect to="/process" />
              </Switch>
            </Layout.Row>
          </Layout>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
