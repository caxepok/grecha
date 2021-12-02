import React from "react";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import catalogReducer from "./reducers/catalog";
import thunk from "redux-thunk";
import theme from "./theme";
import { Layout } from "./components";
import { PageCatalog } from "./pages"
import { Redirect } from "react-router";

function App() {
  const composeEnhancers =
    process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

  const store = createStore(
    combineReducers({
      catalog: catalogReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route path={"/catalog"} component={PageCatalog} />
              <Redirect to={"/catalog"} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
