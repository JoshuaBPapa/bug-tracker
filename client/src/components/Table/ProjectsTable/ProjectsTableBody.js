import React from 'react';
import { Link } from 'react-router-dom';

import DateTime from '../../DateTime/DateTime';

const ProjectsTableBody = ({ data }) => {
  return data.results.map(dataRow => (
    <tr key={dataRow.id}>
      <td>
        {dataRow.id}
      </td>
      <td>
        <Link to={`/projects/project/${dataRow.id}`}>
          {dataRow.title}
        </Link>
      </td>
      <td>
        {dataRow.tickets}
      </td>
      <td>
        <DateTime value={dataRow.created} />
      </td>
    </tr>
  ));
};

export default ProjectsTableBody;