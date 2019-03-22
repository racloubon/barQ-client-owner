import React, { Component } from 'react';

import MenuContainer from './menuContainer';
import StaffContainer from './staffContainer';

class BarDetails extends Component {

  render() {
    console.log(this.props)
    return (
      <div className="barDetails">
        <MenuContainer data={this.props.data.menus} barId={this.props.data._id} addMenu={this.props.addMenu} deleteMenu={this.props.deleteMenu}/>
        <StaffContainer data={this.props.data.staff} barId={this.props.data._id} addStaffMember={this.props.addStaffMember} deleteStaffMember={this.props.deleteStaffMember} />
      </div>
    );
  }
}

export default BarDetails;
