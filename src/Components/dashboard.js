import React, { Component } from 'react';

import BarList from './barList';
import BarDetails from './barDetails';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <BarList />
        <BarDetails />
      </div>
    );
  }
}

export default Dashboard;
