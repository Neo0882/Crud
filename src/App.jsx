import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./component/LoginPage/LoginPage";
import HomePage from "./component/HomePage/HomePage";
import LayoutApp from "./layout/layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LayoutApp />}>
            <Route index element={<HomePage />} />\
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
