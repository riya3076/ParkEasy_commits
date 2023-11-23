import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Registration";
import Support from "../Support/Support";
import Lister from "../Listers/Lister";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/lister" element={<Lister />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/support" element={<Support />}></Route>
      </Routes>
    </Router>
  );
};

export default Routing;
