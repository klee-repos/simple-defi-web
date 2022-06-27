// external
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "universal-cookie";
// internal
import Lending from "./containers/Lending";
import User from "./context/User";
// context
const user = new User();
//cookies
const cookies = new Cookies();

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Lending user={user} cookies={cookies} />} />
    </Routes>
  </Router>
);

export default routes;
