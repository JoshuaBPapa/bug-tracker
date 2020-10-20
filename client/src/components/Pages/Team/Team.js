import React from 'react';

import DeleteItemContainer from '../../DeleteItem/DeleteItemContainer';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';

const Team = () => (
  <div>
    {/* id not needed for deleting a team. The server will use the JWT for the teamId */}
    <DeleteItemContainer itemType="team" />
  </div>
);

export default withAuthLevelCheck(Team, 4);