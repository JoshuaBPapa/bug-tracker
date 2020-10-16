import React from 'react';
import { Link } from 'react-router-dom';

import Priority from '../../Priority/Priority';
import Status from '../../Status/Status';
import DateTime from '../../DateTime/DateTime';

const TicketsTableBody = ({ data, isUserPage, isProjectPage }) => {
  return data.results.map(dataRow => (
    <tr key={dataRow.id}>
      <td>
        <Priority value={dataRow.priority} />
      </td>
      <td>
        {dataRow.id}
      </td>
      <td>
        <Link to={`/tickets/ticket/${dataRow.id}`}>
          {dataRow.title}
        </Link>
      </td>
      <td>
        <Status value={dataRow.status} />
      </td>
      {!isUserPage ? (
        <td>
          {dataRow.usersAssigned}
        </td>
      ) : null}
      <td>
        <DateTime value={dataRow.created} />
      </td>
      {!isProjectPage ? (
        <td>
          <Link to={`/projects/project/${dataRow.projectId}`}>
            {dataRow.projectTitle}
          </Link>
        </td>
      ) : null}
    </tr>
  ));
};

export default TicketsTableBody;