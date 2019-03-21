import React from 'react';
import MenuListItemDetail from './menuListItemDetail';

const MenuListItem = ({ data }) => {

  return (
    <div>
      <h1>{data.name}</h1>
      {data.categories.map((cat, i) => <MenuListItemDetail key={i} data={cat} />)}
    </div>
  )
}

export default MenuListItem;


//
// {data.categories.map(category => category.items[0])}
