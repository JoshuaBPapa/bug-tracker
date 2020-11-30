import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import AddLink from '../../ItemTools/AddLink/AddLink';
import Table from '../../Table/Table';
import ItemTools from '../../ItemTools/ItemTools';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';

const Projects = () => {
  const tableHeader = [
    {
      text: 'id',
      key: 'id' 
    },
    {
      text: 'title',
      key: 'title'
    },
    {
      text: 'created at',
      key: 'created'
    },
    {
      text: 'tickets',
      key: 'tickets'
    },
  ];

  return (
    <div className="Pages Project-Page">
      <PageTitle>
        projects
      </PageTitle>
      <ItemTools>
        <AddLink url="/projects/create" itemType="project" />
      </ItemTools>
      <Table
        initOrderBy="id"
        initIsOrderAscending="true"
        endpoint="projects"
        header={tableHeader}
        itemType="project" />
    </div>
  );
};

export default withAuthLevelCheck(Projects, 2);