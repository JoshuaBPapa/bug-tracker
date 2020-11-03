import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import UsersTable from '../../Table/UsersTable/UsersTable';
import AddLink from '../../AddLink/AddLink';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';
import ItemTools from '../../ItemTools/ItemTools';

const Users = () => (
  <div>
    <PageTitle>
      users
    </PageTitle>
    <ItemTools>
      <AddLink url="/users/create" itemType="user" />
    </ItemTools>
    <UsersTable />
  </div>
);

export default withAuthLevelCheck(Users, 2);