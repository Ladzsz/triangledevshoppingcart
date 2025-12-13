import React from "react";
import "../assets/styles/headerstyles.css";
import logo from "../assets/images/bird.webp";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
        <h3>Micheal ijil</h3>
      </div>

      <div className="header-center-right">
        <nav>
          <ul className="nav-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/designs">Custom Designs</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact us</a>
            </li>
            <li>
              <a href="/contact">Projects</a>
            </li>
          </ul>
        </nav>

        <div className="header-right">
          <p>amount: {0}</p>
          <a href="/appointments" className="appointment-btn">
            Appointments
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
