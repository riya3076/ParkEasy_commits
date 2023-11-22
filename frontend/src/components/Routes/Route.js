import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lister from "../Listers/Lister";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lister />}></Route>
      </Routes>
    </Router>
  );
};

export default Routing;
