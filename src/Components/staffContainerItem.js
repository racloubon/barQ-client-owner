import React from 'react';

const StaffContainerItem = ({ barId, data, deleteStaffMember }) => {

  return (
    <div>
      <h3>{data.name}</h3>
      <p>{data.email}</p>
      <button onClick={() => deleteStaffMember(barId, data._id)}>Delete</button>
    </div>
  )
}

export default StaffContainerItem;
