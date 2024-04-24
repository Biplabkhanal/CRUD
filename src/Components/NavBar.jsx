import React from "react";
import "./Form.css";

const NavBar = () => {
  return (
    <header
      className="navbar d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        margin: 0,
        backgroundColor: "white",
      }}
    >
      <div className="container">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span
            className="fs-4"
            style={{ marginLeft: "50px", fontWeight: "bold" }}
          >
            CRUD OPERATIONS
          </span>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
