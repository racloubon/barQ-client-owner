import React, { Component } from 'react';

import BarList from './barList';
import BarDetails from './barDetails';

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qY3pOVEV6T1RKRE4wTXlRMEZDTURJeE56TTVRMEU1UWpaRk5qWTROVE5FUXpSQ09EUXhNQSJ9.eyJnaXZlbl9uYW1lIjoiRWdpbGwiLCJmYW1pbHlfbmFtZSI6IkhyZWluc3NvbiIsIm5pY2tuYW1lIjoiZWdpbGxoMjEwIiwibmFtZSI6IkVnaWxsIEhyZWluc3NvbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLTVZVmVodUQ1QXRRL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFjL1R6UG1fV3duSElJL3Bob3RvLmpwZyIsImxvY2FsZSI6ImlzIiwidXBkYXRlZF9hdCI6IjIwMTktMDMtMTlUMTc6NTA6NTkuMjk2WiIsImVtYWlsIjoiZWdpbGxoMjEwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi1mNG5jNzI0ZC5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDcwNjk4Mjc2ODMzNzc5MzY0MzQiLCJhdWQiOiJQUWhzdXlTd3c3cWNBbnlMUmFWbGQxTzVmWXh6UjhCYiIsImlhdCI6MTU1MzAxNzg2MCwiZXhwIjoxNTUzMDUzODYwLCJhdF9oYXNoIjoia3RFekhacE9hRGd4NFNScVJEYmdfdyIsIm5vbmNlIjoiNzZYcm9Hdlh4dFU2Uzl6M2NmOHBUWDdJTzAwbDgyeUQifQ.4QuX5elDwvi3N23NhzONjqZ6f2rMkVsVllEsko7q5wh2CtLeAUwY8dCjxgNXXFAPFWJKoTrpcRO2U9lQFoKDvxT6aOr2NQbw4nUGoPDFTrZ7u3TstEDc-ARdYQd05-cXtisuRxeFOfOSz30-Oft5-5AOxrfoU9ZNN5wJc2UkCPDZbFyR2McDYQR6I5C8fp9FZI3AXuTsDDAS4zZPIY63fz1y-uTRoVQSHVVPVLQT88Uymns9UBj79pMZJYuS-hdOH4-wkpUdjCaHbRBkSaw495YFcKXILjc8l9sM2oKc3ngb6OgLyNPaguyiFfHM-gsU460jMszgse7lZJPwEflRiA';


class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token: TOKEN,
      ownerData: {},
      activeBar: null
    }
  }

  getOwnerData = () => {
    fetch('http://localhost:3005/owner',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.state.token
        }
      })
      .then(res => res.json())
      .then(res => this.setState({ownerData: res}))
  }

  addBar = (event, bar) => {
    event.preventDefault();
    fetch('http://localhost:3005/owner/bars',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token
        },
        body: JSON.stringify(bar)
      })
      .then(res => res.json())
      .then(res => this.setState({ownerData: res}))
  }

  deleteBar = (id) => {
    fetch('http://localhost:3005/owner/bars/' + id,
      {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + this.state.token
        },
      })
      .then(() => {
        const tempData = {...this.state.ownerData};
        const updatedBars = tempData.bars.filter(el => el._id !== id)
        tempData.bars = updatedBars
        this.setState({ownerData: tempData})
      })
  }

  selectBar = (barData) => {
    this.setState({activeBar: barData})
  }

  componentDidMount = () => {
    this.getOwnerData()
  }

  render() {
    console.log('dashboard rerendering')
    return (
      <div className="dashboard">
        <BarList data={this.state.ownerData} addBar={this.addBar} deleteBar={this.deleteBar} selectBar={this.selectBar} />
        {this.state.activeBar ? <BarDetails data={this.state.activeBar} /> : null}
      </div>
    );
  }
}

export default Dashboard;
