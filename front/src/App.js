import React from "react";
import MainPage from "./components/MainPage";
import WritePage from "./components/WritePage";
import ListViewPage from "./components/ListViewPage";
import RandingPage from "./components/RandingPage";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Route exact path="/randing" component={RandingPage} />
      <Route exact path="/main" component={MainPage} />
      <Route exact path="/write" component={WritePage} />
      <Route exact path="/listview" component={ListViewPage} />
    </>
  );
}

export default App;
