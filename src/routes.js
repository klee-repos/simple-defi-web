// external
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import { initializeApp } from "firebase/app";
// internal
import Deposits from "./containers/deposits/Deposits";
import User from "./context/User";
// context
const user = new User();
//cookies
const cookies = new Cookies();

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const db = initializeApp(firebaseConfig);

const routes = (
  <Router>
    <Routes>
      <Route
        path="/"
        element={<Deposits user={user} cookies={cookies} db={db} />}
      />
    </Routes>
    <Routes>
      <Route
        path="/deposits"
        element={<Deposits user={user} cookies={cookies} db={db} />}
      />
    </Routes>
  </Router>
);

export default routes;
