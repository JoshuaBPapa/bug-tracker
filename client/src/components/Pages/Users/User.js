import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';
import TicketsTable from '../../Table/TicketsTable/TicketsTable';
import DeleteItemContainer from '../../DeleteItem/DeleteItemContainer';

import useAxios from '../../../hooks/useAxios';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';
import TicketChartsWrapper from '../../Charts/TicketChartsWrapper';
import TicketsStatusBarChart from '../../Charts/TicketsStatusBarChart';
import TicketsPriorityPieChart from '../../Charts/TicketsPriorityPieChart';

const User = () => {
  const { id } = useParams();
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
        <TicketChartsWrapper>
          <TicketsStatusBarChart endpoint={`/user/${id}`} />
          <TicketsPriorityPieChart endpoint={`/user/${id}`} />
        </TicketChartsWrapper>
        <TicketChartsWrapper>
          <TicketsStatusBarChart endpoint={`/user_tickets/${id}`} />
          <TicketsPriorityPieChart endpoint={`/user_tickets/${id}`} />
        </TicketChartsWrapper>
        <TicketsTable ticketsAssignment={`/user/assigned/${id}`} />
        <TicketsTable ticketsAssignment={`/user/created/${id}`} />
      </div>
    );
  }

  return user;
};

export default withAuthLevelCheck(User, 2);