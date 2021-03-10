import React from 'react';
import {
  Navbar, Nav, Button, Form,
} from 'react-bootstrap';
import { func, string } from 'prop-types';
import './NavigationBar.css';

/**
 * The application Navigation Bar.
 * It is based on the react-bootstrap NavBar component.
 */
const NavigationBar = ({ basename, theme, toggleTheme }) => (
  <Navbar id="navigation-bar" collapseOnSelect expand="lg" bg={theme} variant={theme}>
    <Navbar.Brand href={`${basename}`}>
      <img
        src={`${basename}/logo.gif`}
        width="120"
        height="40"
        className="d-inline-block align-top"
        alt="covid19dashboard"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href={`${basename}`}>Dashboard</Nav.Link>
        <Nav.Link href={`${basename}/#/vaccine`}>Vaccines</Nav.Link>
        <Nav.Link href={`${basename}/#/map`}>Map</Nav.Link>
        <Nav.Link href={`${basename}/#/about`}>About</Nav.Link>
      </Nav>
      <Form inline>
        <Button variant={(theme === 'light') ? 'dark' : 'light'} onClick={toggleTheme}>
          Switch Theme
        </Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
);

NavigationBar.propTypes = {
  basename: string.isRequired,
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default NavigationBar;
