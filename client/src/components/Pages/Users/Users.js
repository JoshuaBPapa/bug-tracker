import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import AddLink from '../../AddLink/AddLink';
import Table from '../../Table/Table';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';
import ItemTools from '../../ItemTools/ItemTools';

const Users = () => {
  const tableHeader = [
    { 
      text: 'id',
      key: 'id'
    },
    {
      text: 'name',
      key: 'name'
    },
    {
      text: 'job title',
      key: 'jobTitle'
    },
    {
      text: 'authority level',
      key: 'authLevel'
    },
    {
      text: 'username',
      key: 'username'
    },
    {
      text: 'tickets assigned',
      key: 'tickets'
    }
  ];

  return (
    <div>
      <PageTitle>
        users
      </PageTitle>
      <ItemTools>
        <AddLink url="/users/create" itemType="user" />
      </ItemTools>
      <Table
        initOrderBy="id"
        initIsOrderAscending={true}
        endpoint="users"
        header={tableHeader} />
    </div>
  );
};

export default withAuthLevelCheck(Users, 2);