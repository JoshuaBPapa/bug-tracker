import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import TableContainer from '../../Table/TableContainer';

const Projects = () => (
  <div>
    <PageTitle>
      projects
    </PageTitle>
    <TableContainer 
      contentUrl="/projects/project" 
      endpoint="projects" 
      initOrderBy="id"
      initIsOrderAscending={true} />
  </div>
)

export default Projects;