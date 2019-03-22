import React from 'react';

const MenuListItemDetail = ({ data }) => {

  return (
    <div>
      <h2>{data.name}</h2>
      {data.items ? data.items.map((item, i) => <div key={i}><h3>{item.name}: ${item.price}</h3></div>) : null}
    </div>
  )
}

export default MenuListItemDetail;
