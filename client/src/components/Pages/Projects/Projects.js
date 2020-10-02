import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from '../../PageTitle/PageTitle';
import ProjectsTable from '../../Table/ProjectsTable/ProjectsTable';

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

export default Projects;