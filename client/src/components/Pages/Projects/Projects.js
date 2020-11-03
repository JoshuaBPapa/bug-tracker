import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import ProjectsTable from '../../Table/ProjectsTable/ProjectsTable';
import ItemTools from '../../ItemTools/ItemTools';
import AddLink from '../../AddLink/AddLink';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';

const Projects = () => (
  <div>
    <PageTitle>
      projects
    </PageTitle>
    <ItemTools>
      <AddLink url="/projects/create" itemType="project" />
    </ItemTools>
    <ProjectsTable />
  </div>
);

export default withAuthLevelCheck(Projects, 2);