import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./navbar.css";
import { logout } from "../../reduxActions/actions";

export default function NavBar() {
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    logout(dispatch);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link className="brandNavbarLink" to="/">
            MyMedia
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="navbarLinks" to="/users">
              Users
            </Link>
          </Nav>
          <Nav>
            <Link className="navbarLinks" onClick={onLogoutClick} to="/">
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
