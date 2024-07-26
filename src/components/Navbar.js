import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

function Navbar() {
  return (
    <div className="page-header">
      <div className="nav-container w-100 ms-2 me-2">
        <div className="nav-content">
          <Link to="/search" className="nav-item">
            <CiSearch className="me-1" />
            <span>البحث</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
