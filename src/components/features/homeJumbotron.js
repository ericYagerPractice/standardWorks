import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
import './style/home.scss';
import c2djumbo from './staticfiles/c2djumbo.png'



function Jumbo() {
    return (
        <Jumbotron fluid>
            <img
                src={c2djumbo}
                alt="Couch to Developer Jumbotron"
                style={{width:'45%', height:'auto',}}
            />
        </Jumbotron>
    );
  }
 
export default Jumbo