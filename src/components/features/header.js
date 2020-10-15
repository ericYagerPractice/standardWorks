import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Navbar} from 'react-bootstrap';
//import {AmplifySignOut} from '@aws-amplify/ui-react';
import {Auth} from 'aws-amplify';
import Routes from './Routes'
import c2dlogolight from './staticfiles/c2dlogolight.png'

import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

async function checkUser(){
    let user = await Auth.currentAuthenticatedUser();
    console.log(user);
}


function Header() {
    checkUser(); 
    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">
                    <img
                        src={c2dlogolight}
                        alt="Couch to Developer logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/">About</Nav.Link>
                        <Nav.Link as={Link} to="/">Get Started</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes />
        </Router>
        
    );
  }
 
export default Header