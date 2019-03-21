import React, { Component } from 'react';
import './App.css';

import Dashboard from './Components/dashboard'

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>App is working</p>
        <Dashboard />
      </div>
    );
  }
}

export default App;
