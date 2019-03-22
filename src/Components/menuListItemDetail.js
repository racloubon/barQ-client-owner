import React from 'react';

const MenuListItemDetail = ({ data }) => (
  <div>
    <h2>{data.name}</h2>
    {data.items ? data.items.map(item => (
      <div key={item.name}>
        <h3>
          {item.name}
          : $
          {item.price}
        </h3>

      </div>
    )) : null}
  </div>
);

export default MenuListItemDetail;
