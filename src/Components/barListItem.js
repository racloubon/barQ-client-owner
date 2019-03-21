import React from 'react';

const BarListItem = ({ barData, deleteBar, selectBar }) => {

  return (
    <div>
      <h2>{barData.name}</h2>
      <p>{barData._id}</p>
      <button onClick={() => deleteBar(barData._id)}>Delete Bar</button>
      <button onClick={() => selectBar(barData.menus)}>Select Bar</button>
    </div>
  )
}

export default BarListItem;
