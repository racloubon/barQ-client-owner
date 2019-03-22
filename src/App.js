import React, { Component } from 'react';
import './App.css';

import logo from './Assets/LightSmallLogo.png'

import Dashboard from './Components/dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={logo} />
        <Dashboard />
      </div>
    );
  }
}

export default App;
