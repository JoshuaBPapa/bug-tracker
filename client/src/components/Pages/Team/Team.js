import React from 'react';

import DeleteItem from '../../ItemTools/DeleteItem/DeleteItem';
import ItemTools from '../../ItemTools/ItemTools';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';

const Team = () => (
  <div>
    {/* id not needed for deleting a team. The server will use the JWT for the teamId */}
    <ItemTools>
      <DeleteItem itemType="team" />
    </ItemTools>
  </div>
);

export default withAuthLevelCheck(Team, 4);