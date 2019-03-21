import React, { Component } from 'react';
import './Styles/dashboard.css';

import BarList from './barList';
import BarDetails from './barDetails';

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <BarList />
        <BarDetails />
      </div>
    );
  }
}



export default Dashboard;
