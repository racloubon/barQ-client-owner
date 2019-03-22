import React from 'react';
import MenuListItemDetail from './menuListItemDetail';

const MenuListItem = ({ data, deleteMenu, barId }) => {

  return (
    <div>
      <h1>{data.name}</h1>
      <button onClick={() => deleteMenu(barId, data._id)}>Delete {data.name}</button>
      {data.categories.map((cat, i) => <MenuListItemDetail key={i} data={cat} />)}
    </div>
  )
}

export default MenuListItem;
