import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";

import { NavLink } from "react-router-dom";

export const NavigationBar = (props) => {
  const { isLoggedIn, onLogOut } = props;
  const [isOpen, setIsOpen] = useState(false);

  const navigationLink = {
    color: "white",
    marginRight: "10px",
    textDecoration: "none",
  };

  const renderLoggedInView = () => {
    return (
      <div>
        <NavLink onClick={onLogOut} to="/" style={navigationLink}>
          Logout
        </NavLink>
        <NavLink to="/history" style={navigationLink}>
          Previous Orders
        </NavLink>
      </div>
    );
  };
  const renderNotLoggedInView = () => {
    return (
      <div>
        <NavLink to="/login" style={navigationLink}>
          Login
        </NavLink>
        <NavLink to="/signup" style={navigationLink}>
          Signup
        </NavLink>
      </div>
    );
  };

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar style={{ backgroundColor: "#00005c" }} expand="md">
        <NavbarBrand>
          <NavLink style={{ color: "white" }} to="/">
            Yummi Pizza
          </NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavLink to="/cart" style={navigationLink}>
              Cart
            </NavLink>

            {isLoggedIn ? renderLoggedInView() : renderNotLoggedInView()}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
