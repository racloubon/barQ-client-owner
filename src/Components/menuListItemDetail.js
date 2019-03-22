import React from 'react';

const MenuListItemDetail = ({ data }) => {

  return (
    <div>
      <h3>{data.name}</h3>
      {data.items ? data.items.map((item, i) => <div key={i}><p>{item.name}: ${item.price}</p></div>) : null}
    </div>
  )
}

export default MenuListItemDetail;
