import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Navbar} from 'react-bootstrap';
import {AmplifySignOut } from '@aws-amplify/ui-react';
import Routes from './Routes'

import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

function Header() {
    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/APIcomponent">API</Nav.Link>
                        <Nav.Link as={Link} to="/FlightTester">Flight Tester</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <AmplifySignOut /> 
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes />
        </Router>
        
    );
  }
 
export default Header