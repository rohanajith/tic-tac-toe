import React from 'react';
import Game from './components/gameplay/index';
import Home from './components/title-page/index';
import { HashRouter, Route } from "react-router-dom";


function App() {
  return (
    <HashRouter>
    <div className="App">
      <Route exact path = "/" component = {Home}></Route>
      <Route path = "/game" component = {Game}></Route>
    </div>
    </HashRouter>
  );
}

export default App;
