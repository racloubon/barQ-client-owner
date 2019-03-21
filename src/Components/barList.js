import React, { Component } from 'react';

import BarListItem from './barListItem';
import AddBarForm from './addBarForm';

class BarList extends Component {

  render() {

    return (
      <div className="barList">
        <h1>My Bars</h1>
        {this.props.data.bars ? this.props.data.bars.map((bar, i) => <BarListItem barData={bar} deleteBar={this.props.deleteBar} key={i} />) : null}
        <AddBarForm addBar={this.props.addBar}/>
      </div>
    );
  }
}

export default BarList;




//{this.props.data.bars.map(bar => <BarListItem />)}
