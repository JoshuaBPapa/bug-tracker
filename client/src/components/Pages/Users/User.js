import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';
import TicketsTable from '../../Table/TicketsTable/TicketsTable';
import DeleteItemContainer from '../../DeleteItem/DeleteItemContainer';
import TicketChartsWrapper from '../../Charts/TicketChartsWrapper';
import TicketsStatusBarChart from '../../Charts/TicketsStatusBarChart';
import TicketsPriorityPieChart from '../../Charts/TicketsPriorityPieChart';
import AuthorisationLevel from '../../AuthorisationLevel/AuthorisationLevel';
import PageTitle from '../../PageTitle/PageTitle';

import useAxios from '../../../hooks/useAxios';

const User = () => {
  const { id } = useParams();
  const { data, error, sendRequest } = useAxios();
  const userAuthLevel = localStorage.getItem('authorisation-level');
  
  useEffect(() => {
    sendRequest('GET', `users/user/${id}`);
  }, [sendRequest, id, userAuthLevel]);
  
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
        <PageTitle>
          {data.name}
        </PageTitle>
        {data.jobTitle}
        <AuthorisationLevel value={data.authLevel} />
        {data.username}
        {data.email}
        {/* add admin tools to the page if the user is an admin */}
        {userAuthLevel > 2 ? (
          <>
            <Link to={`/users/user/${id}/edit`}>
              edit user
            </Link>
            <Link to={`/users/user/${id}/new_password`}>
              change user's password
            </Link>
            <DeleteItemContainer
              itemType="user"
              id={id} />
          </>
        ) : null}
        <TicketChartsWrapper>
          <TicketsStatusBarChart endpoint={`/user_tickets/${id}`} />
          <TicketsPriorityPieChart endpoint={`/user_tickets/${id}`} />
        </TicketChartsWrapper>
        <TicketsTable ticketsAssignment={`/user/assigned/${id}`} />
        {/* fetch and display created tickets data if the selected user's auth level is > 1 */}
        {data.authLevel > 1 ? (
          <>
            <TicketChartsWrapper>
              <TicketsStatusBarChart endpoint={`/user/${id}`} />
              <TicketsPriorityPieChart endpoint={`/user/${id}`} />
            </TicketChartsWrapper>
            <TicketsTable ticketsAssignment={`/user/created/${id}`} />
          </>
        ) : null}
      </div>
    );
  }

  return user;
};

export default User;