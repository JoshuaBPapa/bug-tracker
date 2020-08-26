import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from '../../PageTitle/PageTitle';
import TableContainer from '../../Table/TableContainer';

const Projects = () => (
  <div>
    <PageTitle>
      projects
    </PageTitle>
    <Link to="/projects/create">
      Add a new project
    </Link>
    <TableContainer 
      contentUrl="/projects/project" 
      endpoint="projects" 
      initOrderBy="id"
      initIsOrderAscending={true} />
  </div>
);

export default Projects;