import React from 'react';

import MenuContainer from './menuContainer';
import StaffContainer from './staffContainer';

const BarDetails = (props) => {
  const { token, data } = props;
  return (
    <div className="barDetails">
      <div>Menu Container</div>
      <MenuContainer
        token={token}
        data={data.menus}
        barId={data._id}
      />
      <div>Staff Container</div>
      <StaffContainer
        token={token}
        data={data.staff}
        barId={data._id}
      />
    </div>
  );
};

export default BarDetails;
