import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron'

function Jumbo() {
    return (
        <Jumbotron fluid>
            <h1>Hello, world!</h1>
            <p>
                This is a simple hero unit, a simple jumbotron-style component for calling
                extra attention to featured content or information.
            </p>
        </Jumbotron>
    );
  }
 
export default Jumbo