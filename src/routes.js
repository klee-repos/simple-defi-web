// external
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "universal-cookie";
// internal
import Deposits from "./containers/Deposits";
import User from "./context/User";
// context
const user = new User();
//cookies
const cookies = new Cookies();

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Deposits user={user} cookies={cookies} />} />
    </Routes>
    <Routes>
      <Route
        path="/deposits"
        element={<Deposits user={user} cookies={cookies} />}
      />
    </Routes>
  </Router>
);

export default routes;
