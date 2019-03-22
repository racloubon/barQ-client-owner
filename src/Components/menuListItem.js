import React from 'react';
import MenuListItemDetail from './menuListItemDetail';

const MenuListItem = ({ data }) => (
  <div>
    <h1>{data.name}</h1>
    {data.categories.map(cat => <MenuListItemDetail key={cat.name} data={cat} />)}
  </div>
);

export default MenuListItem;


//
// {data.categories.map(category => category.items[0])}
