import React from 'react';

const AssignedUsersList = ({ assignedUsers }) => (
  <div className="Assigned-Users-List">
    <ul>
      {assignedUsers.map(user => (
        <li key={user.id}>
          <div className="Assigned-Users-name">
            {user.name}
          </div>
          <div className="Assigned-Users-job-title">
            {user.jobTitle}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default AssignedUsersList;