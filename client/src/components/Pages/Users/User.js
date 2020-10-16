import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';
import TicketsTable from '../../Table/TicketsTable/TicketsTable';
import DeleteItemContainer from '../../DeleteItem/DeleteItemContainer';

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
        <DeleteItemContainer
          itemType="user"
          id={id} />
        <TicketsTable ticketsAssignment={`/user/assigned/${id}`} />
        <TicketsTable ticketsAssignment={`/user/created/${id}`} />
      </div>
    );
  }

  return user;
};

export default User;