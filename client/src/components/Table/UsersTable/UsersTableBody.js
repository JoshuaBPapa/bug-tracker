import React from 'react';
import { Link } from 'react-router-dom';

import AuthorisationLevel from '../../AuthorisationLevel/AuthorisationLevel';

const UsersTableBody = ({ data }) => {
  return data.results.map(dataRow => (
    <tr key={dataRow.id}>
      <td>
        {dataRow.id}
      </td>
      <td>
        {dataRow.username}
      </td>
      <td>
        <Link to={`users/user/${dataRow.id}`}>
          {dataRow.name}
        </Link>
      </td>
      <td>
        {dataRow.jobTitle}
      </td>
      <td>
        <AuthorisationLevel value={dataRow.authLevel} />
      </td>
      <td>
        {dataRow.tickets}
      </td>
    </tr>
  ));
};

export default UsersTableBody;