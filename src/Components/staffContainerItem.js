import React from 'react';

const StaffContainerItem = ({ data }) => (
  <div>
    <h3>{data.name}</h3>
    <p>{data.email}</p>
    <button type="submit">Delete</button>
  </div>
);

export default StaffContainerItem;
