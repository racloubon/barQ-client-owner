import React, { Component } from 'react';

import MenuContainer from './menuContainer';
import StaffContainer from './staffContainer';

class BarDetails extends Component {

  render() {
    return (
      <div className="barDetails">
        <div>Menu Container</div>
        <MenuContainer data={this.props.data.menus} barId={this.props.data._id} />
        <div>Staff Container</div>
        <StaffContainer data={this.props.data.staff} barId={this.props.data._id} />
      </div>
    );
  }
}

export default BarDetails;
