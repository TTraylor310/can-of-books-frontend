import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";


class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/app" className="nav-link">Home</Link></NavItem>
        <NavItem><Link to="/about" className="nav-link">About Us</Link></NavItem>
      </Navbar>
    )
  }
}

export default Header;
