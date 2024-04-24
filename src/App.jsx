import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Components/Form";
import "./App.css";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import Table from "./Components/Table";
import Profiles from "./Components/ProfilePage";

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/table" element={<Table />} />
          <Route path="/profiles" element={<Profiles />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
