import React from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { BrowserRouter, Link, Route } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <BrowserRouter>
        <Route>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default LandingPage;
