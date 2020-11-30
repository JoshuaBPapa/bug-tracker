import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import AddLink from '../../ItemTools/AddLink/AddLink';
import Table from '../../Table/Table';
import ItemTools from '../../ItemTools/ItemTools';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';

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
    <div className="Pages Users-Page">
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
        header={tableHeader} 
        itemType="user" />
    </div>
  );
};

export default withAuthLevelCheck(Users, 2);