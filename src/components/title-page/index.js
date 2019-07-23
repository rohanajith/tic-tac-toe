import React, {Component} from 'react';
import {ButtonToolbar,Button} from 'react-bootstrap';
import { Link } from "react-router-dom";

import './style.css';


class Home extends Component{
render() {
  return (
    <div className="App">
     <img src = "https://i.pinimg.com/originals/f0/df/fd/f0dffdcf873936786b4ee8b518521a5a.jpg" alt="bg"/>
       <div className="centered">Tic Tac Toe
       <ButtonToolbar>
       	<Link to="/game"><Button variant="primary">Play Game</Button></Link>
       	</ButtonToolbar>
       </div>
    </div>
  );
}
}

export default Home;

