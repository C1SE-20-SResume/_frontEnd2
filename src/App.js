import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Login } from "./auth";
import { Home, JobDetail } from "./pages";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies(["user"]);
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <Home />
        </Route>
        <Route path="/contact">
          <Home />
        </Route>
        {!cookies.user && (
          <Route path="/login">
            <Login />
          </Route>
        )}
        <Route path="/job-detail/:id">
          <JobDetail />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;