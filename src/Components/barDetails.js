import React, { Component } from 'react';
import './Styles/barDetails.css';

import MenuContainer from './menuContainer'
import StaffContainer from './staffContainer'

class BarDetails extends Component {
  render() {
    return (
      <div className="container">
        <p>BarDetails</p>
        <MenuContainer />
        <StaffContainer />
      </div>
    );
  }
}

export default BarDetails;
