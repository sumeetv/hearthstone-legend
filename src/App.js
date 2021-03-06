import React, { Component } from 'react';
import logo from './logo.svg';

import Simulator from './Simulator.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-body">
          <Simulator />
        </div>
      </div>
    );
  }
}

export default App;
