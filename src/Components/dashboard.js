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
    fetch('/owner/me',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      })
      .then(res => res.json())
      .then(res => this.props.updateUser(res.user));
  }

  addBar = (event, bar) => {
    event.preventDefault();
    fetch('/owner/bars',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.props.token}`,
        },
        body: JSON.stringify(bar),
      })
      .then(res => res.json())
      .then(res => this.props.updateUser(res.user));
  }

  deleteBar = (id) => {
    fetch(`/owner/bars/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      })
      .then(res => res.json())
      .then(res => this.props.updateUser(res.user));
  }

  selectBar = (barData) => {
    this.setState({ activeBar: barData });
  }

  componentDidMount = () => {
    this.getOwnerData();
  }

  render() {
    const { logout } = this.props;
    return (
      <div className="dashboard">
        <button type="submit" onClick={logout}>Log out</button>
        <BarList
          data={this.props.user}
          addBar={this.addBar}
          deleteBar={this.deleteBar}
          selectBar={this.selectBar}
        />
        {this.state.activeBar ? <BarDetails data={this.state.activeBar} /> : null}
      </div>
    );
  }
}

export default Dashboard;
