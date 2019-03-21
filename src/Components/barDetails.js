import React, { Component } from 'react';

import MenuContainer from './menuContainer';
import StaffContainer from './staffContainer';

class BarDetails extends Component {
  render() {
    return (
      <div className="barDetails">
        <div>Menu Container</div>
        <MenuContainer />
        <div>Staff Container</div>
        <StaffContainer />
      </div>
    );
  }
}

export default BarDetails;
