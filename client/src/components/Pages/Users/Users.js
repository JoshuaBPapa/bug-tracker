import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from '../../PageTitle/PageTitle';
import UsersTable from '../../Table/UsersTable/UsersTable';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';

const Users = () => (
  <div>
    <PageTitle>
      users
    </PageTitle>
    <Link to="/users/create">
      Add a new user
    </Link>
    <UsersTable />
  </div>
);

export default withAuthLevelCheck(Users, 2);