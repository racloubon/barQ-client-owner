import React from 'react';

const StaffContainerItem = ({ data }) => {

  return (
    <div>
      <h3>{data.name}</h3>
      <p>{data.email}</p>
      <button>Delete</button>
    </div>
  )
}

export default StaffContainerItem;
