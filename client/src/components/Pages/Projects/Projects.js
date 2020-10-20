import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from '../../PageTitle/PageTitle';
import ProjectsTable from '../../Table/ProjectsTable/ProjectsTable';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';

const Projects = () => (
  <div>
    <PageTitle>
      projects
    </PageTitle>
    <Link to="/projects/create">
      Add a new project
    </Link>
    <ProjectsTable />
  </div>
);

export default withAuthLevelCheck(Projects, 2);