import React, { Component } from 'react';

import StaffContainerItem from './staffContainerItem';

class StaffContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
    }
  }

  onChangeName = (e) => {
    const name = e.nativeEvent.target.value;
    this.setState({ name });
  }

  onChangeEmail = (e) => {
    const email = e.nativeEvent.target.value;
    this.setState({ email });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    if (name.length < 1 || email.length < 1) {
      alert('Error: Please ensure that you submit both a name and email.'); // eslint-disable-line no-alert
      return 1;
    }
    this.props.addStaffMember({name, email}, this.props.barId)
  }

  render() {
    return (
      <div className="staffContainer">

      {this.props.data ? this.props.data.map((staff, i) => <StaffContainerItem barId={this.props.barId} data={staff} key={i} deleteStaffMember={this.props.deleteStaffMember}/>) : null }

        <form>
          <input type="text" placeholder="Name" onChange={this.onChangeName} />
          <input type="text" placeholder="Email" onChange={this.onChangeEmail} />
          <input type="submit" value="Submit" onClick={this.onSubmit} />
        </form>
      </div>
    );
  }
}

export default StaffContainer;
