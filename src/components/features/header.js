import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {AmplifySignOut } from '@aws-amplify/ui-react';
import Home from '../pages/home'
import APIcomponent from '../pages/APIpage'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Header() {
    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Eric's ReactJS PLayground</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/">Home</Link>
                        <Link to="/APIcomponent">API</Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <AmplifySignOut /> 
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        <Switch>
            <Route path="/APIcomponent">
                <APIcomponent />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
        </Router>
        
    );
  }
 
export default Header