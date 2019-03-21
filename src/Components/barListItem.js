import React from 'react';

const BarListItem = ({ barData, deleteBar }) => {

  return (
    <div>
      <h2>{barData.name}</h2>
      <p>{barData._id}</p>
      <button onClick={() => deleteBar(barData._id)}>Delete Bar</button>
    </div>
  )
}

export default BarListItem;
