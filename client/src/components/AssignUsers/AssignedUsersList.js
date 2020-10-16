import React from 'react';

const AssignedUsersList = ({ assignedUsers }) => (
  <div>
    <ul>
      {assignedUsers.map(user => (
        <li key={user.id}>
          <div>
            {user.name}
            {user.jobTitle}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default AssignedUsersList;