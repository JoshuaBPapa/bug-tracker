import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';
import TicketsTable from '../../Table/TicketsTable/TicketsTable';

import useAxios from '../../../hooks/useAxios';

const User = ({ match }) => {
  const { id } = match.params;
  const { data, error, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest('GET', `users/user/${id}`);
  }, [sendRequest, id]);

  let user = <p>Loading...</p>;
  if (error) {
    user = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    user = (
      <div>
        <Link to={`/users/user/${id}/edit`}>
          edit user
        </Link>
        <Link to={`/users/user/${id}/new_password`}>
          change user's password
        </Link>
        <TicketsTable ticketsAssignment={`/user/${id}`} />
      </div>
    );
  }

  return user;
};

export default User;