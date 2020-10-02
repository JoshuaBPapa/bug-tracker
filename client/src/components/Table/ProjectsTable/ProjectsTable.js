import React from 'react';

import TableContainer from '../TableContainer';
import ProjectsTableBody from './ProjectsTableBody';

const ProjectsTable = () => {
  const header = [
    {
      text: 'id',
      key: 'id' 
    },
    {
      text: 'title',
      key: 'title'
    },
    {
      text: 'tickets',
      key: 'tickets'
    },
    {
      text: 'created at',
      key: 'created'
    }
  ];

  return (
    <TableContainer 
      header={header}
      endpoint="projects" 
      initOrderBy="id"
      initIsOrderAscending={true}>
      <ProjectsTableBody />
    </TableContainer>
  );
};

export default ProjectsTable;