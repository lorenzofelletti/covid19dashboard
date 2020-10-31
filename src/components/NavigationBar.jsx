import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './NavigationBar.css';

/**
 * The application Navigation Bar.
 * It is based on the react-bootstrap NavBar component.
 */
function NavigationBar(props) {

  return (
    <Navbar id="navigation-bar" collapseOnSelect sticky="top" expand="lg" bg="light" variant="light">
      <Navbar.Brand href='/covid19dashboard'>Covid19Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href='/covid19dashboard'>Dashboard</Nav.Link>
          <Nav.Link href="/covid19dashboard/about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
