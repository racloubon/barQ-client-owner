import React, { Component } from 'react';

import StaffContainerItem from './staffContainerItem';

// temporary stuff using Egill's token
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qY3pOVEV6T1RKRE4wTXlRMEZDTURJeE56TTVRMEU1UWpaRk5qWTROVE5FUXpSQ09EUXhNQSJ9.eyJnaXZlbl9uYW1lIjoiRWdpbGwiLCJmYW1pbHlfbmFtZSI6IkhyZWluc3NvbiIsIm5pY2tuYW1lIjoiZWdpbGxoMjEwIiwibmFtZSI6IkVnaWxsIEhyZWluc3NvbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLTVZVmVodUQ1QXRRL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFjL1R6UG1fV3duSElJL3Bob3RvLmpwZyIsImxvY2FsZSI6ImlzIiwidXBkYXRlZF9hdCI6IjIwMTktMDMtMTlUMTc6NTA6NTkuMjk2WiIsImVtYWlsIjoiZWdpbGxoMjEwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi1mNG5jNzI0ZC5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDcwNjk4Mjc2ODMzNzc5MzY0MzQiLCJhdWQiOiJQUWhzdXlTd3c3cWNBbnlMUmFWbGQxTzVmWXh6UjhCYiIsImlhdCI6MTU1MzAxNzg2MCwiZXhwIjoxNTUzMDUzODYwLCJhdF9oYXNoIjoia3RFekhacE9hRGd4NFNScVJEYmdfdyIsIm5vbmNlIjoiNzZYcm9Hdlh4dFU2Uzl6M2NmOHBUWDdJTzAwbDgyeUQifQ.4QuX5elDwvi3N23NhzONjqZ6f2rMkVsVllEsko7q5wh2CtLeAUwY8dCjxgNXXFAPFWJKoTrpcRO2U9lQFoKDvxT6aOr2NQbw4nUGoPDFTrZ7u3TstEDc-ARdYQd05-cXtisuRxeFOfOSz30-Oft5-5AOxrfoU9ZNN5wJc2UkCPDZbFyR2McDYQR6I5C8fp9FZI3AXuTsDDAS4zZPIY63fz1y-uTRoVQSHVVPVLQT88Uymns9UBj79pMZJYuS-hdOH4-wkpUdjCaHbRBkSaw495YFcKXILjc8l9sM2oKc3ngb6OgLyNPaguyiFfHM-gsU460jMszgse7lZJPwEflRiA';


class StaffContainer extends Component {

  state = {
    name: '',
    email: '',
    staffData: this.props.data,
    newStaffMember: null,
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
    fetch('http://localhost:3005/owner/bars/' + this.props.barId + '/staff', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email })
    })
      .then(response => response.json())
      .then(response => {
        const updatedStaff = response.bars.find(bar => bar._id === this.props.barId).staff;
        this.setState({ staffData: updatedStaff })
      })
  }

  render() {

  console.log('staffContainer rerendering with:', this.props.data)

    return (
      <div className="staffContainer">

      {this.props.data ? this.props.data.map((staff, i) => <StaffContainerItem data={staff} key={i}/>) : null}

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
