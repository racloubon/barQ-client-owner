import React, { Component } from 'react';

import BarList from './barList';
import BarDetails from './barDetails';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBar: null,
    };
  }

  getOwnerData = () => {
    const { token, updateUser } = this.props;
    fetch('/owner/me',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.json())
      .then(res => updateUser(res.user));
  }

  addBar = (event, bar) => {
    const { token, updateUser } = this.props;
    event.preventDefault();
    fetch('/owner/bars',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bar),
      })
      .then(res => res.json())
      .then(res => updateUser(res.user));
  }

  deleteBar = (id) => {
    const { token, updateUser } = this.props;
    fetch(`/owner/bars/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.json())
      .then(res => updateUser(res.user));
  }

  selectBar = (barData) => {
    this.setState({ activeBar: barData });
  }

  componentDidMount = () => {
    this.getOwnerData();
  }

  render() {
    const { logout, user, token } = this.props;
    const { activeBar } = this.state;
    return (
      <div className="dashboard">
        <button type="submit" onClick={logout}>Log out</button>
        <BarList
          data={user}
          addBar={this.addBar}
          deleteBar={this.deleteBar}
          selectBar={this.selectBar}
        />
        {activeBar
          ? (
            <BarDetails
              data={activeBar}
              token={token}
            />
          )
          : null}
      </div>
    );
  }
}

export default Dashboard;
